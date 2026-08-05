export function createClient(baseUrl, publishableKey) {
  const storageKey = 'enneagram.supabase.session';
  let session = readSession();
  const listeners = new Set();

  function readSession() {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { return null; }
  }

  function writeSession(nextSession) {
    session = nextSession;
    if (nextSession) localStorage.setItem(storageKey, JSON.stringify(nextSession));
    else localStorage.removeItem(storageKey);
  }

  function notify(event) {
    listeners.forEach((listener) => listener(event, session));
  }

  function messageFrom(payload, fallback) {
    return payload?.msg || payload?.message || payload?.error_description || payload?.error || fallback;
  }

  async function request(path, options = {}) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
          apikey: publishableKey,
          'content-type': 'application/json',
          ...(options.headers || {}),
        },
      });
      const text = await response.text();
      let payload = null;
      try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
      if (!response.ok) return { data: null, error: { message: messageFrom(payload, `请求失败 (${response.status})`) } };
      return { data: payload, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message || '网络连接失败。' } };
    }
  }

  function normalizeSession(payload) {
    if (!payload?.access_token) return null;
    return {
      ...payload,
      expires_at: payload.expires_at || Math.floor(Date.now() / 1000) + (payload.expires_in || 3600),
    };
  }

  async function refreshIfNeeded() {
    if (!session?.access_token) return null;
    if (!session.expires_at || session.expires_at > Math.floor(Date.now() / 1000) + 30) return session;
    if (!session.refresh_token) { writeSession(null); return null; }
    const { data, error } = await request('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    if (error) { writeSession(null); notify('SIGNED_OUT'); return null; }
    writeSession(normalizeSession(data));
    notify('TOKEN_REFRESHED');
    return session;
  }

  function from(table) {
    const query = new URLSearchParams();
    const spec = { method: 'GET', body: undefined, returning: false, resolution: false };
    const builder = {
      select(columns = '*') { query.set('select', columns); if (spec.method !== 'GET') spec.returning = true; return builder; },
      eq(column, value) { query.set(column, `eq.${value}`); return builder; },
      order(column, options = {}) { query.set('order', `${column}.${options.ascending === false ? 'desc' : 'asc'}`); return builder; },
      limit(value) { query.set('limit', String(value)); return builder; },
      insert(value) { spec.method = 'POST'; spec.body = value; spec.returning = true; return builder; },
      upsert(value) { spec.method = 'POST'; spec.body = value; spec.returning = true; spec.resolution = true; return builder; },
      update(value) { spec.method = 'PATCH'; spec.body = value; spec.returning = true; return builder; },
      delete() { spec.method = 'DELETE'; spec.returning = true; return builder; },
      maybeSingle() { return execute(true); },
      single() { return execute(true); },
      then(resolve, reject) { return execute(false).then(resolve, reject); },
    };

    async function execute(single) {
      const activeSession = await refreshIfNeeded();
      if (!activeSession?.access_token) return { data: null, error: { message: '请先登录。' } };
      const headers = { authorization: `Bearer ${activeSession.access_token}` };
      if (spec.returning) headers.prefer = `return=representation${spec.resolution ? ',resolution=merge-duplicates' : ''}`;
      const suffix = query.toString();
      const { data, error } = await request(`/rest/v1/${table}${suffix ? `?${suffix}` : ''}`, {
        method: spec.method,
        headers,
        body: spec.body === undefined ? undefined : JSON.stringify(spec.body),
      });
      if (error) return { data: null, error };
      if (!single) return { data, error: null };
      const row = Array.isArray(data) ? data[0] || null : data;
      return { data: row, error: null };
    }

    return builder;
  }

  return {
    auth: {
      async getSession() { return { data: { session: await refreshIfNeeded() }, error: null }; },
      onAuthStateChange(callback) { listeners.add(callback); return { data: { subscription: { unsubscribe: () => listeners.delete(callback) } } }; },
      async signUp({ email, password, options = {} }) {
        const { data, error } = await request('/auth/v1/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password, data: options.data, options: { emailRedirectTo: options.emailRedirectTo } }),
        });
        if (error) return { data: null, error };
        const nextSession = normalizeSession(data);
        if (nextSession) { writeSession(nextSession); notify('SIGNED_IN'); }
        return { data: { user: data?.user || null, session: nextSession }, error: null };
      },
      async signInWithPassword({ email, password }) {
        const { data, error } = await request('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email, password }) });
        if (error) return { data: null, error };
        const nextSession = normalizeSession(data);
        writeSession(nextSession);
        notify('SIGNED_IN');
        return { data: { user: nextSession.user, session: nextSession }, error: null };
      },
      async signInAnonymously({ options = {} } = {}) {
        const { data, error } = await request('/auth/v1/signup', {
          method: 'POST',
          body: JSON.stringify({ data: options.data || {} }),
        });
        if (error) return { data: null, error };
        const nextSession = normalizeSession(data);
        if (!nextSession) return { data: null, error: { message: 'Unable to create an anonymous session.' } };
        writeSession(nextSession);
        notify('SIGNED_IN');
        return { data: { user: nextSession.user, session: nextSession }, error: null };
      },
      async signOut() {
        const token = session?.access_token;
        if (token) await request('/auth/v1/logout', { method: 'POST', headers: { authorization: `Bearer ${token}` } });
        writeSession(null);
        notify('SIGNED_OUT');
        return { error: null };
      },
    },
    from,
  };
}
