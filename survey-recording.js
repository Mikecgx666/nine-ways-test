import { createClient } from './supabase-lite.js';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './supabase-config.js';

const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
let saved = false;

window.enneagramRecordResult = async ({ stageId, stageName, answers, scores }) => {
  if (saved) return;
  const { data } = await client.auth.getSession();
  const user = data.session?.user;
  if (!user) return;
  saved = true;
  const { error } = await client.from('assessments').insert({
    owner_id: user.id,
    stage_id: stageId,
    stage_name: stageName,
    subject_kind: 'self',
    answer_payload: { answer_indexes: answers },
    result_scores: scores,
  });
  window.parent.postMessage({ type: 'enneagram-record-saved', error: error?.message || null }, window.location.origin);
};
