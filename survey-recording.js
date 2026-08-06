import { createClient } from './supabase-lite.js';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './supabase-config.js';

const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
let saved = false;
let saving = false;

window.enneagramRecordResult = async ({ stageId, stageName, answers, scores }) => {
  if (saved || saving) return;
  saving = true;
  try {
    const { data } = await client.auth.getSession();
    const user = data.session?.user;
    if (!user) throw new Error('答题档案已失效，请返回首页重新填写姓名、年龄和性别。');
    const { error } = await client.from('assessments').insert({
      owner_id: user.id,
      stage_id: stageId,
      stage_name: stageName,
      subject_kind: 'self',
      answer_payload: { answer_indexes: answers },
      result_scores: scores,
    });
    if (error) throw new Error(error.message || '答题记录保存失败。');
    saved = true;
    window.parent.postMessage({ type: 'enneagram-record-saved', error: null }, window.location.origin);
  } catch (error) {
    window.parent.postMessage({ type: 'enneagram-record-saved', error: error.message || '答题记录保存失败。' }, window.location.origin);
  } finally {
    saving = false;
  }
};
