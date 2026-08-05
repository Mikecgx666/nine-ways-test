(() => {
  const typeNames = { 1: '完美型', 2: '助人型', 3: '成就型', 4: '自我型', 5: '观察型', 6: '忠诚型', 7: '活跃型', 8: '领袖型', 9: '和平型' };
  const actionCopy = {
    1: '把一件想反复修正的事，先定下“做到够好”的标准。',
    2: '帮忙之前，先用一句话确认：我现在有多少余力？',
    3: '推进一件事时，留出十分钟说清自己的真实困难。',
    4: '情绪很满时，先写下发生了什么，再决定怎么回应。',
    5: '准备到七成时，做一个小范围尝试，把想法带到现实里。',
    6: '把一个担心分成：事实、猜测、今天能做的一步。',
    7: '从正在进行的事里选一件，连续投入一小段不切换的时间。',
    8: '表达立场前，先问一个澄清问题，再说自己的判断。',
    9: '今天主动说出一个具体偏好，不用等别人先来问。'
  };
  const stageCopy = {
    preschool: { evidence: '观察线索', action: '成人可尝试的支持', note: '这份结果来自成人对孩子当下行为的观察，不给孩子贴人格标签；“盲区、隐私、共识”也不是对孩子的判断。' },
    child: { evidence: '选择线索', action: '可以一起练习', note: '这是一份当下情境中的自我观察，不是固定人格，也不能替代成人的了解与沟通。' },
    teen: { evidence: '选择线索', action: '下一次可以试试', note: '这是一份当下情境中的自我观察，不是固定人格，也不能替代与身边人的真实对话。' },
    adult: { evidence: '选择依据', action: '3 天微行动', note: '周哈里窗中的“共识区、盲区”通常需要他人反馈共同形成。本页只有自我报告，因此它们是值得讨论的假设，不是结论。' },
    integration: { evidence: '选择依据', action: '3 天微行动', note: '周哈里窗中的“共识区、盲区”通常需要他人反馈共同形成。本页只有自我报告，因此它们是值得讨论的假设，不是结论。' }
  };

  function addStyles() {
    if (document.getElementById('result-insight-layer-styles')) return;
    const style = document.createElement('style');
    style.id = 'result-insight-layer-styles';
    style.textContent = `
      .result-insight-layer { margin:32px 0 20px; color:#183c43; font-family:"Microsoft YaHei","PingFang SC",sans-serif; }
      .result-insight-layer[hidden], .ril-evidence[hidden] { display:none !important; }
      .ril-kicker { margin:0 0 8px; color:#407a86; font-size:12px; font-weight:900; letter-spacing:.04em; }
      .ril-title { margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(28px,4vw,42px); line-height:1.16; }
      .ril-intro { max-width:710px; margin:12px 0 0; color:#476b6f; font-size:15px; font-weight:650; line-height:1.75; }
      .ril-ranking { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; margin-top:22px; border:1px solid #b8d7d1; background:#b8d7d1; }
      .ril-rank { min-height:76px; padding:12px 14px; background:#fbfffd; }
      .ril-rank:nth-child(1) { background:#dff3ee; } .ril-rank:nth-child(2) { background:#f7edd1; }
      .ril-rank span { display:block; color:#69858a; font-size:11px; font-weight:850; }
      .ril-rank strong { display:block; margin-top:5px; font-size:16px; }
      .ril-nine { display:flex; flex-wrap:wrap; gap:7px; margin-top:12px; }
      .ril-nine span { padding:5px 8px; border:1px solid #c6ddda; background:#fff; color:#517277; font-size:12px; font-weight:750; }
      .ril-nine span:first-child { border-color:#d7aa42; background:#fff7dc; color:#183c43; }
      .ril-evidence { margin-top:30px; padding:22px; border-top:1px solid #b8d7d1; background:#f7fbfa; }
      .ril-section-head { display:flex; align-items:end; justify-content:space-between; gap:18px; }
      .ril-section-head h3, .ril-johari h3, .ril-action h3 { margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(22px,3vw,32px); line-height:1.2; }
      .ril-section-head p { margin:7px 0 0; color:#647c7f; font-size:13px; font-weight:650; line-height:1.55; }
      .ril-toggle, .ril-practice { min-height:42px; padding:8px 15px; cursor:pointer; border:1px solid #183c43; background:#fff; color:#183c43; font:inherit; font-size:13px; font-weight:850; }
      .ril-toggle:hover, .ril-practice:hover { background:#dff3ee; }
      .ril-evidence-list { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:13px; margin-top:18px; }
      .ril-evidence-group { padding:15px; border:1px solid #c7ddda; background:#fff; }
      .ril-evidence-group h4 { margin:0 0 11px; font-size:16px; }
      .ril-record { margin-top:10px; padding-left:10px; border-left:3px solid #8bcfc7; }
      .ril-record span { display:inline-block; color:#44756f; font-size:11px; font-weight:900; }
      .ril-record strong { display:block; margin-top:3px; font-size:13px; line-height:1.45; }
      .ril-record p { margin:5px 0 0; color:#557478; font-size:12px; font-weight:600; line-height:1.6; }
      .ril-johari { margin-top:30px; padding:24px; border-top:1px solid #b8d7d1; background:#fbfffd; }
      .ril-johari > p { max-width:760px; margin:9px 0 18px; color:#647c7f; font-size:13px; font-weight:650; line-height:1.65; }
      .ril-window { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); overflow:hidden; border:1px solid #183c43; }
      .ril-quadrant { min-height:168px; padding:16px; border-right:1px solid #183c43; border-bottom:1px solid #183c43; }
      .ril-quadrant:nth-child(2n) { border-right:0; } .ril-quadrant:nth-child(n+3) { border-bottom:0; }
      .ril-quadrant:nth-child(1) { background:#dff3ee; } .ril-quadrant:nth-child(2) { background:#f7edd1; } .ril-quadrant:nth-child(3) { background:#e7f0f0; } .ril-quadrant:nth-child(4) { background:#f7f8f6; }
      .ril-quadrant h4 { margin:0; font-size:18px; } .ril-quadrant p { margin:7px 0 0; color:#315c61; font-size:13px; font-weight:650; line-height:1.65; }
      .ril-action { display:grid; grid-template-columns:minmax(190px,.75fr) minmax(0,1.25fr); gap:26px; align-items:start; margin-top:30px; padding:26px 0; border-top:1px solid #b8d7d1; }
      .ril-action > p { margin:10px 0 0; color:#647c7f; font-size:13px; font-weight:650; line-height:1.65; }
      .ril-action-card { padding:20px; border:1px solid #b8d7d1; background:#fbfffd; }
      .ril-action-card strong { display:block; font-size:17px; line-height:1.5; } .ril-action-card p { margin:11px 0 16px; color:#315c61; font-size:13px; font-weight:650; line-height:1.65; }
      .ril-status { display:block; margin-top:9px; color:#407a86; font-size:12px; font-weight:800; }
      @media (max-width:680px) { .ril-ranking,.ril-evidence-list,.ril-window,.ril-action { grid-template-columns:1fr; } .ril-quadrant,.ril-quadrant:nth-child(2n),.ril-quadrant:nth-child(n+3) { min-height:0; border-right:0; border-bottom:1px solid #183c43; } .ril-quadrant:last-child { border-bottom:0; } .ril-section-head { display:grid; align-items:start; } }
    `;
    document.head.append(style);
  }

  function selectedChoice(scene, answer) {
    const index = typeof answer === 'object' && answer !== null ? answer.choice : answer;
    const choices = scene?.choices || scene?.c;
    return Number.isInteger(index) && choices ? { index, value: choices[index] } : null;
  }

  function actionForType(type, stageKey) {
    if (stageKey === 'preschool') return {
      1: '遇到做得不完全一样时，先肯定尝试，再陪孩子做一次小小的调整。',
      2: '孩子总想照顾别人时，也主动问一次：你现在想要什么？',
      3: '孩子主动展示或带头时，多肯定过程，而不只夸结果。',
      4: '情绪冒出来时，先帮孩子说出感受，不急着要求停止。',
      5: '进入新活动前，给一点观察时间，再邀请孩子走近一步。',
      6: '遇到变化时，提前说清谁会来、什么时候发生、谁会陪着。',
      7: '把新鲜感变成一个能完成的小任务，一起看到收尾。',
      8: '给孩子清楚边界和有限选择，让力量有安全的出口。',
      9: '在温和的时刻多等几秒，邀请孩子说出自己的想法。'
    }[type] || actionCopy[type];
    return actionCopy[type];
  }

  window.renderResultInsightLayer = ({ container, values, scenes, answers, stageKey, labels = typeNames }) => {
    if (!container || !values || !scenes || !answers) return;
    addStyles();
    container.querySelector('.result-insight-layer')?.remove();
    const stage = stageCopy[stageKey] || stageCopy.adult;
    const ordered = Object.entries(values).sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]));
    const top = ordered.slice(0, 3);
    const typeName = id => labels[id] || typeNames[id] || `类型${id}`;
    const evidence = top.map(([id]) => {
      return scenes.map((scene, sceneIndex) => {
        const selected = selectedChoice(scene, answers[sceneIndex]);
        if (!selected || !selected.value) return null;
        const [choiceText, weights] = selected.value;
        const weight = Number(weights?.[id] || 0);
        return weight ? { scene, sceneIndex, choiceText, weight } : null;
      }).filter(Boolean).sort((a, b) => b.weight - a.weight).slice(0, 2);
    });
    const first = top[0]?.[0] || '9';
    const second = top[1]?.[0] || first;
    const third = top[2]?.[0] || second;
    const section = document.createElement('section');
    section.className = 'result-insight-layer';
    section.innerHTML = `<p class="ril-kicker">本次情境中的反应排序</p><h3 class="ril-title">先看你的选择，再谈倾向</h3><p class="ril-intro">本页呈现的是这次答题里较常被调用的应对方式，不是给你定型。前两项接近时，更值得把它们一起理解。</p>`;
    const ranking = document.createElement('div'); ranking.className = 'ril-ranking';
    top.forEach(([id], index) => { const item = document.createElement('div'); item.className = 'ril-rank'; item.innerHTML = `<span>${['最常出现的反应', '紧随其后的反应', '第三个线索'][index]}</span><strong>${typeName(id)}</strong>`; ranking.append(item); });
    const allRanks = document.createElement('div'); allRanks.className = 'ril-nine';
    ordered.forEach(([id], index) => { const item = document.createElement('span'); item.textContent = `${index + 1}. ${typeName(id)}`; allRanks.append(item); });
    section.append(ranking, allRanks);

    const evidenceSection = document.createElement('section'); evidenceSection.className = 'ril-evidence';
    const evidenceHead = document.createElement('div'); evidenceHead.className = 'ril-section-head';
    evidenceHead.innerHTML = `<div><h3>${stage.evidence}</h3><p>这些内容直接来自本次已选情境；“主动作”指该选择对该倾向的主要支持。</p></div>`;
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'ril-toggle'; toggle.textContent = `查看${stage.evidence}`; toggle.setAttribute('aria-expanded', 'false'); evidenceHead.append(toggle);
    const evidenceList = document.createElement('div'); evidenceList.className = 'ril-evidence-list'; evidenceList.hidden = true;
    top.forEach(([id], index) => {
      const group = document.createElement('article'); group.className = 'ril-evidence-group';
      group.innerHTML = `<h4>${index + 1}. ${typeName(id)}</h4>`;
      evidence[index].forEach(entry => {
        const record = document.createElement('div'); record.className = 'ril-record';
        const title = entry.scene.title || entry.scene.t || entry.scene.domain || entry.scene.d || '已选情境';
        const primary = entry.weight >= 2 ? '主动作' : '辅助动作';
        record.innerHTML = `<span>${primary}</span><strong>${title}</strong><p>${entry.choiceText}</p>`; group.append(record);
      });
      if (!evidence[index].length) { const empty = document.createElement('p'); empty.textContent = '本次没有足够的直接选择线索。'; group.append(empty); }
      evidenceList.append(group);
    });
    toggle.addEventListener('click', () => { const willOpen = evidenceList.hidden; evidenceList.hidden = !willOpen; toggle.setAttribute('aria-expanded', String(willOpen)); toggle.textContent = willOpen ? `收起${stage.evidence}` : `查看${stage.evidence}`; });
    evidenceSection.append(evidenceHead, evidenceList); section.append(evidenceSection);

    const johari = document.createElement('section'); johari.className = 'ril-johari';
    johari.innerHTML = `<h3>用周哈里窗继续看自己</h3><p>${stage.note}</p>`;
    const windowGrid = document.createElement('div'); windowGrid.className = 'ril-window';
    const johariItems = [
      ['共识区', `本次选择反复显示你会优先调用“${typeName(first)}”式的应对。这是可以带进真实关系中和他人核对的部分。`],
      ['盲区', `当你快速使用“${typeName(first)}”的方式时，可能忽略它给别人带来的感受或代价。找一位熟悉你的人，问问他实际看见了什么。`],
      ['隐私区', `“${typeName(second)}”也在本次排序靠前。你在意的需要、界限或担心，未必会自动被他人看见，值得用一句具体的话说出来。`],
      ['潜能区', `把“${typeName(third)}”当作尚可练习的另一种回应。在下一次类似情境中，先试一次小的不同做法。`]
    ];
    johariItems.forEach(([heading, copy]) => { const card = document.createElement('article'); card.className = 'ril-quadrant'; card.innerHTML = `<h4>${heading}</h4><p>${copy}</p>`; windowGrid.append(card); });
    johari.append(windowGrid); section.append(johari);

    const action = document.createElement('section'); action.className = 'ril-action';
    action.innerHTML = `<div><p class="ril-kicker">${stage.action}</p><h3>让结果落到一次真实选择里</h3><p>不需要改变成另一种人。只练习在惯性出现时，多留出一个选择。</p></div>`;
    const actionCard = document.createElement('div'); actionCard.className = 'ril-action-card';
    const practice = document.createElement('button'); practice.type = 'button'; practice.className = 'ril-practice'; practice.textContent = '设为 3 天练习';
    const status = document.createElement('span'); status.className = 'ril-status';
    actionCard.innerHTML = `<strong>${actionForType(Number(first), stageKey)}</strong><p>把这句话留到下一次遇见相似情境时再看。</p>`;
    practice.addEventListener('click', () => { try { localStorage.setItem(`enneagram-${stageKey}-practice`, JSON.stringify({ savedAt: new Date().toISOString(), tendency: typeName(first), action: actionForType(Number(first), stageKey) })); practice.textContent = '已设为 3 天练习'; status.textContent = '已保存在这台设备上。'; } catch { status.textContent = '当前浏览器未允许本地保存。'; } });
    actionCard.append(practice, status); action.append(actionCard); section.append(action);
    const restart = container.querySelector('#restart'); container.insertBefore(section, restart || null);
  };

  // The shared report chrome is intentionally separate from the Journey audit.
  window.renderUnifiedResultReport = ({ container, values, stageKey, labels = typeNames, moduleTitle, includeRanking = true }) => {
    if (!container || !values) return;
    const existingStyle = document.getElementById('unified-result-report-styles');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'unified-result-report-styles';
      style.textContent = `
        .unified-result-report-head { margin:32px 0 0; padding:0 0 20px; border-bottom:2px solid #183c43; color:#183c43; }
        .unified-result-report-head p { margin:0; color:#407a86; font-size:12px; font-weight:900; letter-spacing:.04em; }
        .unified-result-report-head h2 { margin:5px 0 0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(36px,5vw,56px); line-height:1.08; }
        .unified-result-report-photo { height:clamp(170px,18vw,220px); margin:18px 0 0; overflow:hidden; border:1px solid #a9c2c2; background:#e7efed; }
        .unified-result-report-photo img { display:block; width:100%; height:100%; object-fit:cover; object-position:center 42%; }
        .unified-result-preference { margin:32px 0 18px; padding-bottom:12px; border-bottom:1px solid #b8d7d1; }
        .unified-result-preference h3 { margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(26px,3.6vw,40px); line-height:1.12; }
        .unified-result-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; align-items:start; }.unified-result-grid > section { min-width:0; padding:20px; border:1px solid #b9d9d4; background:#fbfffd; }.unified-result-grid h3 { margin:0; color:#183c43; font-size:20px; line-height:1.3; }.unified-result-grid #radar { width:100%; max-width:530px; margin:12px auto 0; }.unified-result-grid .unified-result-ranking { margin:16px 0 0; }
        .unified-result-ranking { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; margin:18px 0 24px; border:1px solid #b8d7d1; background:#b8d7d1; }
        .unified-result-ranking article { min-height:76px; padding:12px 14px; background:#fbfffd; }
        .unified-result-ranking article:first-child { background:#dff3ee; }.unified-result-ranking article:nth-child(2) { background:#f7edd1; }
        .unified-result-ranking span { display:block; color:#69858a; font-size:11px; font-weight:850; }.unified-result-ranking strong { display:block; margin-top:5px; font-size:16px; }
        .unified-result-panel { margin:28px 0 0; padding:20px; border:1px solid #b8d7d1; background:#fbfffd; color:#183c43; }.unified-result-panel > header h3 { margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:22px; line-height:1.25; }.unified-result-panel > header p { margin:7px 0 0; color:#527a7d; font-size:13px; font-weight:650; line-height:1.6; }
        .unified-center-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-top:16px; }.unified-center-card { padding:15px; border:1px solid #a9cfc9; background:#fff; }.unified-center-card strong { display:block; font-size:17px; }.unified-center-card span { display:block; margin-top:8px; color:#407a86; font-size:24px; font-weight:850; }.unified-center-card p { margin:7px 0 0; color:#557478; font-size:13px; font-weight:650; line-height:1.55; }
        .unified-result-insights { margin:32px 0 20px; padding-top:26px; border-top:2px solid #183c43; color:#183c43; }
        .unified-result-insights h3 { margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(26px,3.6vw,40px); line-height:1.12; }.unified-result-insights > p { max-width:760px; margin:10px 0 18px; color:#476b6f; font-size:14px; font-weight:650; line-height:1.7; }
        .unified-gap-flow { display:grid; gap:20px; margin-top:16px; }.unified-gap-profile { padding-top:20px; border-top:1px solid #b8d7d1; }.unified-gap-profile:first-child { padding-top:0; border-top:0; }.unified-gap-profile > header { display:flex; justify-content:space-between; gap:12px; align-items:start; }.unified-gap-profile h4 { margin:0; font-size:20px; }.unified-gap-profile header b { padding:5px 8px; color:#24494c; font-size:14px; background:#e0f1f1; }.unified-gap-profile > p { margin:10px 0 0; padding:9px 10px; border-left:3px solid #d7aa42; color:#365f63; font-size:14px; font-weight:650; line-height:1.6; background:#fffaf0; }.unified-gap-pair { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; margin-top:12px; }.unified-gap-step { padding:16px; border:1px solid #183c43; }.unified-gap-step.is-blind { background:#f7e5e7; }.unified-gap-step.is-potential { background:#e0f1f1; }.unified-gap-step span { font-size:12px; font-weight:850; }.unified-gap-step p { margin:8px 0 0; color:#315c61; font-size:14px; font-weight:650; line-height:1.6; }
        .unified-result-window { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); overflow:hidden; border:1px solid #183c43; }.unified-result-window article { min-height:145px; padding:16px; border-right:1px solid #183c43; border-bottom:1px solid #183c43; }.unified-result-window article:nth-child(2n) { border-right:0; }.unified-result-window article:nth-child(n+3) { border-bottom:0; }.unified-result-window article:nth-child(1) { background:#dff3ee; }.unified-result-window article:nth-child(2) { background:#f7edd1; }.unified-result-window article:nth-child(3) { background:#e7f0f0; }.unified-result-window article:nth-child(4) { background:#f7f8f6; }.unified-result-window h4 { margin:0; font-size:18px; }.unified-result-window p { margin:7px 0 0; color:#315c61; font-size:13px; font-weight:650; line-height:1.65; }
        .unified-result-action { display:grid; grid-template-columns:minmax(190px,.75fr) minmax(0,1.25fr); gap:26px; align-items:start; margin-top:30px; padding:26px 0 0; border-top:1px solid #b8d7d1; }.unified-result-action h3 { margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(26px,3.6vw,40px); line-height:1.12; }.unified-result-action > div > p { margin:10px 0 0; color:#647c7f; font-size:13px; font-weight:650; line-height:1.65; }.unified-result-action-card { padding:20px; border:1px solid #b8d7d1; background:#fbfffd; }.unified-result-action-card strong { display:block; font-size:17px; line-height:1.5; }.unified-result-action-card p { margin:11px 0 0; color:#315c61; font-size:13px; font-weight:650; line-height:1.65; }
        @media (max-width:680px) { .unified-result-grid,.unified-result-ranking,.unified-result-window,.unified-result-action,.unified-center-grid,.unified-gap-pair { grid-template-columns:1fr; }.unified-result-window article,.unified-result-window article:nth-child(2n),.unified-result-window article:nth-child(n+3) { min-height:0; border-right:0; border-bottom:1px solid #183c43; }.unified-result-window article:last-child { border-bottom:0; } }
      `;
      document.head.append(style);
    }
    const oldGrid = container.querySelector('.unified-result-grid');
    if (oldGrid) { const oldRadar = oldGrid.querySelector('#radar'); if (oldRadar) container.insertBefore(oldRadar, oldGrid); oldGrid.remove(); }
    container.querySelector('.result-insight-layer')?.remove();
    container.querySelector('.unified-result-report-head')?.remove();
    container.querySelector('.unified-result-report-photo')?.remove();
    container.querySelector('.unified-result-preference')?.remove();
    container.querySelector('.unified-result-ranking')?.remove();
    container.querySelector('.unified-result-insights')?.remove();
    const titleNode = container.querySelector('#result-title');
    if (titleNode) titleNode.hidden = true;
    const ordered = Object.entries(values).sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]));
    const top = ordered.slice(0, 3);
    const typeName = id => labels[id] || typeNames[id] || `类型${id}`;
    const first = top[0]?.[0] || '9';
    const second = top[1]?.[0] || first;
    const third = top[2]?.[0] || second;
    const radar = container.querySelector('#radar');
    let insertAt = radar || container.firstChild;
    while (insertAt?.parentElement && insertAt.parentElement !== container) insertAt = insertAt.parentElement;
    const reportHead = document.createElement('header');
    reportHead.className = 'unified-result-report-head';
    reportHead.innerHTML = `<p>${moduleTitle || '九型人格结果'}</p><h2>分析报告</h2>`;
    const photo = document.createElement('figure');
    photo.className = 'unified-result-report-photo';
    photo.innerHTML = '<img src="assets/result-friends-selfie.jpg" alt="几位朋友在户外开心自拍" decoding="async">';
    const preference = document.createElement('header');
    preference.className = 'unified-result-preference';
    preference.innerHTML = '<h3>一、偏好结果</h3>';
    container.insertBefore(reportHead, insertAt);
    container.insertBefore(photo, insertAt);
    container.insertBefore(preference, insertAt);
    const ranking = document.createElement('section');
    ranking.className = 'unified-result-ranking';
    top.forEach(([id], index) => {
      const item = document.createElement('article');
      item.innerHTML = `<span>${['最常出现的反应', '紧随其后的反应', '第三个线索'][index]}</span><strong>${typeName(id)}</strong>`;
      ranking.append(item);
    });
    const heatmap = container.querySelector('#heatmap');
    if (heatmap) { heatmap.hidden = true; const heatmapHeading = heatmap.previousElementSibling; if (heatmapHeading?.tagName === 'H3') heatmapHeading.hidden = true; const resultHint = heatmap.nextElementSibling; if (resultHint?.tagName === 'P') resultHint.hidden = true; }
    const resultGrid = document.createElement('section');
    resultGrid.className = 'unified-result-grid';
    const radarPanel = document.createElement('section');
    radarPanel.innerHTML = '<h3>1. 九型人格偏好</h3>';
    const rankPanel = document.createElement('section');
    rankPanel.innerHTML = '<h3>排名与占比</h3>';
    container.insertBefore(resultGrid, radar);
    if (radar) radarPanel.append(radar);
    if (includeRanking) rankPanel.append(ranking);
    resultGrid.append(radarPanel, rankPanel);
    const stage = stageCopy[stageKey] || stageCopy.adult;
    const centerRows = [
      { name:'腹（肝）中心', ids:['8','9','1'], copy:'行动、本能与边界' },
      { name:'心中心', ids:['2','3','4'], copy:'情感、关系与自我形象' },
      { name:'脑中心', ids:['5','6','7'], copy:'思维、风险与可能性' }
    ].map(center => ({ ...center, score:center.ids.reduce((sum, id) => sum + Number(values[id] || 0), 0) }));
    const centerPanel = document.createElement('section');
    centerPanel.className = 'unified-result-panel';
    centerPanel.innerHTML = '<header><h3>2. 三中心偏好</h3><p>由本次九型倾向直接汇总，用来观察你更常从行动、关系还是思维进入情境。</p></header>';
    const centerGrid = document.createElement('div');
    centerGrid.className = 'unified-center-grid';
    centerRows.forEach(center => { const card = document.createElement('article'); card.className = 'unified-center-card'; card.innerHTML = `<strong>${center.name}</strong><span>${center.score.toFixed(1)}%</span><p>${center.copy}</p>`; centerGrid.append(card); });
    centerPanel.append(centerGrid);
    const restart = container.querySelector('#restart');
    container.insertBefore(centerPanel, restart || null);

    const profileCopy = {
      1:{ constraint:'标准一松就不踏实', bottleneck:'容易把修正当成唯一答案，忽略眼前已经做到的部分。', leverage:'先定下“做到够好”的底线，再决定要不要继续优化。' },
      2:{ constraint:'照顾别人时忘了自己', bottleneck:'容易用付出来换关系，自己的需要反而没有说出口。', leverage:'帮忙前先确认自己的余量，把需要说成具体请求。' },
      3:{ constraint:'结果成了唯一证明', bottleneck:'为了推进和表现压住真实困难，关系会只剩效率。', leverage:'保留一个能说真实困难的时刻，让目标与感受同时被看见。' },
      4:{ constraint:'感受太满时被情绪带走', bottleneck:'容易把当下感受等同于全部事实，难以留出回应空间。', leverage:'先区分发生了什么与感受到什么，再决定如何表达。' },
      5:{ constraint:'准备很久，行动很晚', bottleneck:'信息还不够时持续退回观察，想法难以进入现实。', leverage:'准备到七成就做一次小范围尝试，用反馈补足判断。' },
      6:{ constraint:'担心先占满空间', bottleneck:'把猜测也当作风险，会让行动被反复确认卡住。', leverage:'分开事实、猜测和今天能做的一步，再往前推进。' },
      7:{ constraint:'可能性太多，难以收束', bottleneck:'不断切换新选项，会稀释对正在进行的事的投入。', leverage:'从手上的事里选一件，留出一段不切换的完成时间。' },
      8:{ constraint:'力量先行，细节滞后', bottleneck:'立场表达过快时，别人可能只听见压力而不是意图。', leverage:'说判断前先问一个澄清问题，再把边界讲清楚。' },
      9:{ constraint:'为了平稳而把自己放后面', bottleneck:'回避冲突会让偏好和不满被拖延，最后更难处理。', leverage:'在关系还平稳时主动说出一个具体偏好。' }
    };
    const isClose = Number(top[0]?.[1] || 0) - Number(top[1]?.[1] || 0) <= 2;
    const candidates = (isClose ? top.slice(0, 2) : top.slice(0, 1));
    const insight = document.createElement('section');
    insight.className = 'unified-result-insights';
    insight.innerHTML = `<h3>二、看见偏差</h3><p>${stage.note}</p>`;
    const gapFlow = document.createElement('div');
    gapFlow.className = 'unified-gap-flow';
    candidates.forEach(([id, share]) => {
      const profile = profileCopy[id];
      const card = document.createElement('section');
      card.className = 'unified-gap-profile';
      card.innerHTML = `<header><h4>${typeName(id)}</h4><b>${Number(share).toFixed(1)}%</b></header><p>当前卡点：${profile.constraint}</p><div class="unified-gap-pair"><article class="unified-gap-step is-blind"><span>盲区 · 作为瓶颈</span><p>${profile.bottleneck}</p></article><article class="unified-gap-step is-potential"><span>潜能 · 作为支点</span><p>${profile.leverage}</p></article></div>`;
      gapFlow.append(card);
    });
    insight.append(gapFlow);
    const action = document.createElement('section');
    action.className = 'unified-result-action';
    action.innerHTML = '<div><h3>三、行动建议</h3><p>不需要改变成另一种人。只练习在惯性出现时，多留出一个选择。</p></div>';
    const actionList = document.createElement('div');
    candidates.forEach(([id]) => { const card = document.createElement('article'); card.className = 'unified-result-action-card'; card.innerHTML = `<strong>${typeName(id)}</strong><p>${actionForType(Number(id), stageKey)}</p>`; actionList.append(card); });
    action.append(actionList);
    insight.append(action);
    container.insertBefore(insight, restart || null);
  };
})();
