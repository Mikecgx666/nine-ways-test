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

const typeNames = {
  1: '1号·完美型', 2: '2号·助人型', 3: '3号·成就型',
  4: '4号·自我型', 5: '5号·理智型', 6: '6号·忠诚型',
  7: '7号·活跃型', 8: '8号·领袖型', 9: '9号·和平型',
};

function rankedTypes(scores, limit = 3) {
  return Object.entries(scores || {})
    .filter(([id, score]) => typeNames[id] && Number.isFinite(Number(score)))
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, limit);
}

function resultSummary(scores) {
  const entries = rankedTypes(scores);
  if (!entries.length) return '结果已保存';
  return entries.map(([id, score]) => `${typeNames[id]} ${Number(score).toFixed(1)}%`).join(' · ');
}

function downloadWordReport(record) {
  const rows = rankedTypes(record.result_scores)
    .map(([id, score], index) => `<tr><td>${index + 1}</td><td>${typeNames[id]}</td><td>${Number(score).toFixed(1)}%</td></tr>`)
    .join('');
  const createdAt = new Date(record.created_at).toLocaleString('zh-CN');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>九型人格测试报告</title><style>body{font-family:"Microsoft YaHei",sans-serif;color:#173940;line-height:1.6;padding:32px}h1{font-size:28px}table{width:100%;border-collapse:collapse;margin-top:18px}th,td{border:1px solid #789;padding:10px;text-align:left}th{background:#dceef4}</style></head><body><h1>九型人格测试报告</h1><p><strong>测试：</strong>${record.stage_name}</p><p><strong>完成时间：</strong>${createdAt}</p><h2>本次人格倾向</h2><table><thead><tr><th>排名</th><th>人格类型</th><th>占比</th></tr></thead><tbody>${rows || '<tr><td colspan="3">暂无可用结果</td></tr>'}</tbody></table><p>说明：结果描述本次情境下的应对倾向，不做永久人格定型。</p></body></html>`;
  const blob = new Blob([html], { type: 'application/msword;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `九型人格报告-${new Date(record.created_at).toISOString().slice(0, 10)}.doc`;
  link.click();
  URL.revokeObjectURL(link.href);
}

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
    const result = document.createElement('span');
    result.className = 'record-result';
    result.textContent = `本次倾向：${resultSummary(record.result_scores)}`;
    const download = document.createElement('button');
    download.type = 'button';
    download.className = 'record-download';
    download.textContent = '下载 Word 报告';
    download.addEventListener('click', () => downloadWordReport(record));
    details.append(result, download);
    row.append(details);
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
