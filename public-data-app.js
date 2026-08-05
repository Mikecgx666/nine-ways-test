import { createClient } from './supabase-lite.js';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './supabase-config.js';

const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const gate = document.querySelector('#auth-gate');
const form = document.querySelector('#profile-form');
const notice = document.querySelector('#profile-notice');
const modal = document.querySelector('#app-modal');
const modalContent = document.querySelector('#modal-content');
const accountBar = document.querySelector('#visitor-bar');
const visitorName = document.querySelector('#visitor-name');
const recordsButton = accountBar.querySelector('#show-records');
let activeProfile = null;

function showNotice(message, kind = 'error') {
  notice.textContent = message;
  notice.dataset.kind = kind;
}

function sessionUser(session) {
  return session?.user || null;
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function openModal(title) {
  modalContent.replaceChildren();
  const heading = document.createElement('div');
  heading.className = 'modal-heading';
  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  heading.append(titleElement);
  modalContent.append(heading);
  modal.hidden = false;
  document.body.classList.add('modal-open');
  return modalContent;
}

function showProfile(profile) {
  activeProfile = profile;
  visitorName.textContent = profile.display_name;
  accountBar.hidden = false;
  gate.hidden = true;
}

async function loadProfile(session) {
  const user = sessionUser(session);
  if (!user) return null;
  const { data, error } = await client.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) throw error;
  return data;
}

async function openRecords() {
  const panel = openModal('我的答题记录');
  const status = document.createElement('p');
  status.className = 'form-note';
  status.textContent = '正在读取记录...';
  panel.append(status);
  const { data, error } = await client.from('assessments').select('id,stage_name,result_scores,created_at').order('created_at', { ascending: false }).limit(100);
  if (error) {
    status.textContent = '暂时无法读取记录，请稍后重试。';
    return;
  }
  if (!data.length) {
    status.textContent = '还没有已完成的答题记录。完成一次测试后，结果会自动保存在这里。';
    return;
  }
  status.remove();
  const list = document.createElement('div');
  list.className = 'record-list';
  data.forEach((record) => {
    const row = document.createElement('div');
    row.className = 'record-row';
    const details = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = record.stage_name;
    const date = document.createElement('small');
    date.textContent = new Date(record.created_at).toLocaleString('zh-CN');
    details.append(name, date);
    const score = document.createElement('span');
    const entries = Object.entries(record.result_scores || {}).sort((a, b) => Number(b[1]) - Number(a[1]));
    score.textContent = entries.length ? `最高分：${entries[0][1]}` : '已保存';
    row.append(details, score);
    list.append(row);
  });
  panel.append(list);
}

async function initialize() {
  document.querySelector('#close-modal').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  recordsButton.addEventListener('click', openRecords);
  const { data } = await client.auth.getSession();
  if (!data.session) {
    gate.hidden = false;
    return;
  }
  try {
    const profile = await loadProfile(data.session);
    if (profile) showProfile(profile);
    else gate.hidden = false;
  } catch {
    gate.hidden = false;
    showNotice('无法连接资料服务，请检查网络后重试。');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const displayName = String(formData.get('display_name') || '').trim();
  const age = Number(formData.get('age'));
  const gender = String(formData.get('gender') || 'prefer_not_to_say');
  if (!displayName || !Number.isInteger(age) || age < 7 || age > 120) {
    showNotice('请填写姓名，并输入 7 到 120 之间的年龄。');
    return;
  }
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  showNotice('正在建立你的答题档案...', 'success');
  const { data, error } = await client.auth.signInAnonymously({ options: { data: { display_name: displayName } } });
  if (error) {
    submit.disabled = false;
    showNotice('无法建立匿名档案。请先在 Supabase 后台开启 Anonymous sign-ins。');
    return;
  }
  const user = sessionUser(data.session);
  const { data: profile, error: profileError } = await client.from('profiles').upsert({
    id: user.id,
    display_name: displayName,
    age,
    gender,
  }).select().single();
  submit.disabled = false;
  if (profileError) {
    showNotice('档案创建失败，请稍后重试。');
    return;
  }
  showProfile(profile);
});

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin || event.data?.type !== 'enneagram-record-saved') return;
  if (event.data.error) return;
});

initialize();
