(() => {
  const types = {
    1: { label: '完美型', portrait: '你会通过原则、标准与改进感获得踏实。', focus: '标准、细节与正确性' },
    2: { label: '关怀型', portrait: '你会通过照顾、连接与被需要感确认价值。', focus: '关系温度与他人的需要' },
    3: { label: '成就型', portrait: '你会通过有效行动与可见成果建立信心。', focus: '目标、成果与效率' },
    4: { label: '感受型', portrait: '你会通过真实表达与独特意义感确认自己。', focus: '真实感受与独特意义' },
    5: { label: '理智型', portrait: '你会通过观察、理解和保留边界获得安全感。', focus: '信息、边界与充分准备' },
    6: { label: '谨慎型', portrait: '你会通过可靠关系与充分准备建立安全感。', focus: '风险、承诺与可靠性' },
    7: { label: '享乐型', portrait: '你会通过选择、体验与新的可能性保持活力。', focus: '自由、新鲜感与可能性' },
    8: { label: '领导型', portrait: '你会通过直接行动与守住边界获得掌控感。', focus: '力量、边界与公平' },
    9: { label: '和平型', portrait: '你会通过稳定、和谐与舒服的节奏保持平衡。', focus: '和谐、稳定与彼此空间' }
  };

  const pairs = {
    '1-1':'针尖麦芒', '1-2':'疲惫伙伴', '1-3':'昙花一现', '1-4':'灵魂伙伴', '1-5':'理性家人', '1-6':'忠诚团队', '1-7':'AA玩家', '1-8':'冤家对头', '1-9':'沉寂家园',
    '2-2':'心照不宣', '2-3':'阴差阳错', '2-4':'和谐团队', '2-5':'幸福家人', '2-6':'忠诚伴侣', '2-7':'泡泡乐园', '2-8':'偶像粉丝', '2-9':'温暖生活',
    '3-3':'各自为政', '3-4':'阳奉阴违', '3-5':'职业团队', '3-6':'各取所需', '3-7':'激情伙伴', '3-8':'西北牛仔', '3-9':'且行且惜',
    '4-4':'切同深受', '4-5':'成长伙伴', '4-6':'安全伙伴', '4-7':'梦想世界', '4-8':'惊险刺激', '4-9':'现实生活',
    '5-5':'思想乐园', '5-6':'甜蜜伴侣', '5-7':'南辕北辙', '5-8':'潮起潮落', '5-9':'容易停在舒适区',
    '6-6':'安逸生活', '6-7':'麻烦不断', '6-8':'取长补短', '6-9':'无所适从',
    '7-7':'情趣生活', '7-8':'疯狂混乱', '7-9':'无忧无虑', '8-8':'一山二虎', '8-9':'钢铁棉花', '9-9':'和平世界'
  };

  const priorities = {
    1: { strength:[3,6], growth:[4,9], align:[7,8] }, 2: { strength:[4,6], growth:[5,9], align:[3,8] },
    3: { strength:[1,5], growth:[6,9], align:[4,8] }, 4: { strength:[5,6], growth:[1,9], align:[7,8] },
    5: { strength:[1,3], growth:[4,6], align:[7,8] }, 6: { strength:[1,5], growth:[2,8], align:[7,9] },
    7: { strength:[3,4], growth:[2,9], align:[1,6] }, 8: { strength:[3,6], growth:[2,9], align:[1,5] },
    9: { strength:[2,4], growth:[1,8], align:[3,6] }
  };

  const contexts = {
    work: { label:'职场协作', groups:['更易发挥优势','值得互补协作','需要提前对齐'], action:'先把各自重视的条件写进分工、决策期限和复盘方式。' },
    intimacy: { label:'亲密关系', groups:['更易建立连接','值得深入了解','需要主动说明'], action:'在情绪上来前说清自己的需要，不用猜测或试探代替回应。' },
    friendship: { label:'日常交往', groups:['更易自在相处','值得保持联系','需要尊重节奏'], action:'先约定彼此舒服的联系频率和边界，把误会留给直接沟通。' },
    leadership: { label:'管理带人', groups:['更易形成合力','值得培养潜力','需要明确期待'], action:'明确目标、权限与反馈节奏，让不同的做事方式各自有发挥空间。' }
  };

  const keyFor = (a, b) => [a, b].sort((left, right) => left - right).join('-');
  const pairName = (a, b) => pairs[keyFor(a, b)];
  const typeText = id => `${id}号${types[id].label}`;
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));

  function addStyles() {
    if (document.getElementById('relationship-guide-styles')) return;
    const style = document.createElement('style');
    style.id = 'relationship-guide-styles';
    style.textContent = `
      .relationship-guide { margin:28px 0; padding:20px; border:2px solid #17151f; background:#fff; box-shadow:5px 5px 0 #17151f; color:#17151f; }
      .relationship-guide__heading,.relationship-guide__list-heading,.relationship-guide__profile { display:flex; gap:14px; align-items:flex-start; justify-content:space-between; }
      .relationship-guide__kicker { margin:0 0 4px; color:#5d5a67; font-size:13px; font-weight:800; letter-spacing:.05em; }
      .relationship-guide h3 { margin:0; font-size:28px; } .relationship-guide p { font-size:16px; line-height:1.55; }
      .relationship-guide__context { display:grid; gap:4px; min-width:130px; color:#5d5a67; font-size:13px; font-weight:800; }
      .relationship-guide select { min-height:38px; padding:6px 8px; border:2px solid #17151f; background:#fff; color:#17151f; font:inherit; }
      .relationship-guide__profile { margin:16px 0; padding:14px 0; border-top:1px solid #d8d3c8; border-bottom:1px solid #d8d3c8; }
      .relationship-guide__profile p { margin:4px 0 0; } .relationship-guide__profile-meta { color:#5d5a67; font-size:14px !important; }
      .relationship-guide__priority { display:grid; grid-template-columns:110px 1fr; gap:8px; align-items:baseline; margin:8px 0; }
      .relationship-guide__priority-label { color:#5d5a67; font-size:13px; font-weight:800; }
      .relationship-guide__jump { margin:0 10px 4px 0; padding:0; border:0; background:transparent; color:#5b45be; font:inherit; font-weight:800; cursor:pointer; text-decoration:underline; text-underline-offset:3px; }
      .relationship-guide__list-heading { margin:20px 0 10px; align-items:center; }.relationship-guide__list-heading p { margin:0; font-weight:800; }
      .relationship-guide__actions { display:flex; flex-wrap:wrap; gap:7px; }.relationship-guide__actions button { padding:7px 9px; border:1px solid #17151f; background:#f7f4ed; color:#17151f; font:inherit; font-size:13px; font-weight:800; cursor:pointer; }
      .relationship-guide__item { margin:7px 0; border:1px solid #17151f; }.relationship-guide__item summary { display:grid; grid-template-columns:minmax(116px,.8fr) minmax(96px,.65fr) minmax(0,1.8fr); gap:10px; align-items:center; padding:11px; cursor:pointer; list-style:none; }.relationship-guide__item summary::-webkit-details-marker { display:none; }
      .relationship-guide__name { color:#5b45be; font-weight:800; }.relationship-guide__advice { color:#5d5a67; font-size:13px; line-height:1.4; }.relationship-guide__detail { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; padding:0 11px 14px; border-top:1px solid #d8d3c8; }.relationship-guide__detail h4 { margin:12px 0 4px; font-size:14px; }.relationship-guide__detail p { margin:0; font-size:14px; }
      @media (max-width:560px) { .relationship-guide { padding:16px; box-shadow:4px 4px 0 #17151f; }.relationship-guide__heading,.relationship-guide__list-heading,.relationship-guide__profile { flex-direction:column; }.relationship-guide__context { width:100%; }.relationship-guide__priority { grid-template-columns:1fr; gap:3px; }.relationship-guide__item summary { grid-template-columns:1fr auto; }.relationship-guide__name,.relationship-guide__advice { grid-column:1 / -1; }.relationship-guide__detail { grid-template-columns:1fr; gap:0; } }
    `;
    document.head.append(style);
  }

  window.renderRelationshipGuide = ({ container, values }) => {
    if (!container || !values) return;
    addStyles();
    container.querySelector('.relationship-guide')?.remove();
    const primary = Number(Object.keys(values).sort((a, b) => values[b] - values[a] || Number(a) - Number(b))[0]);
    const section = document.createElement('section');
    section.className = 'relationship-guide';
    section.setAttribute('aria-label', '人格关系指南');
    section.innerHTML = `
      <div class="relationship-guide__heading"><div><p class="relationship-guide__kicker">关系指南</p><h3>你适合与谁如何打交道</h3></div><label class="relationship-guide__context">场景<select><option value="work">职场协作</option><option value="intimacy">亲密关系</option><option value="friendship">日常交往</option><option value="leadership">管理带人</option></select></label></div>
      <div class="relationship-guide__profile"></div>
      <div class="relationship-guide__priorities"></div>
      <div class="relationship-guide__list-heading"><p>查看与每一类型的具体相处方式</p><div class="relationship-guide__actions"><button type="button" data-expand>展开全部</button><button type="button" data-collapse>收起全部</button></div></div>
      <div class="relationship-guide__list"></div>`;
    const profile = section.querySelector('.relationship-guide__profile');
    const priorityArea = section.querySelector('.relationship-guide__priorities');
    const list = section.querySelector('.relationship-guide__list');
    const selector = section.querySelector('select');
    const render = () => {
      const context = contexts[selector.value];
      profile.innerHTML = `<div><strong>你是 ${typeText(primary)}</strong><p>“${escapeHtml(types[primary].portrait)}”</p></div><p class="relationship-guide__profile-meta">核心关注：${escapeHtml(types[primary].focus)}</p>`;
      const groups = [['strength', context.groups[0]], ['growth', context.groups[1]], ['align', context.groups[2]]];
      priorityArea.innerHTML = groups.map(([key, label]) => `<div class="relationship-guide__priority"><span class="relationship-guide__priority-label">${label}</span><span>${priorities[primary][key].map(id => `<button class="relationship-guide__jump" type="button" data-target="${id}">${typeText(id)}</button>`).join('')}</span></div>`).join('');
      list.innerHTML = Object.keys(types).map(value => {
        const other = Number(value); const relation = pairName(primary, other);
        const why = `“${relation}”说的是：你更在意${types[primary].focus}，对方更在意${types[other].focus}。这会带来互补，也会在压力下变成彼此的误读。`;
        const difference = `你通常以“${types[primary].portrait}”回应关系；对方则以“${types[other].portrait}”回应。`;
        const advice = `${context.action} 先承认彼此关注点不同，再讨论具体安排。`;
        return `<details class="relationship-guide__item" data-type="${other}"><summary><strong>${typeText(other)}</strong><span class="relationship-guide__name">${relation}</span><span class="relationship-guide__advice">建议：${advice}</span></summary><div class="relationship-guide__detail"><div><h4>为什么叫“${relation}”</h4><p>${why}</p></div><div><h4>你们的行为差异</h4><p>${difference}</p></div><div><h4>以后怎么相处</h4><p>${advice}</p></div></div></details>`;
      }).join('');
      priorityArea.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => {
        const target = list.querySelector(`[data-type="${button.dataset.target}"]`);
        target.open = true; target.scrollIntoView({ behavior:'smooth', block:'center' });
      }));
    };
    selector.addEventListener('change', render);
    section.querySelector('[data-expand]').addEventListener('click', () => list.querySelectorAll('details').forEach(item => { item.open = true; }));
    section.querySelector('[data-collapse]').addEventListener('click', () => list.querySelectorAll('details').forEach(item => { item.open = false; }));
    render();
    container.insertBefore(section, container.querySelector('#restart') || null);
  };
})();
