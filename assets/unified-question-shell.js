(() => {
  if (window.unifiedQuestionShell) return;

  const addStyles = () => {
    if (document.getElementById('unified-question-shell-styles')) return;
    const style = document.createElement('style');
    style.id = 'unified-question-shell-styles';
    style.textContent = `
      .unified-question-shell { width:min(100%,1200px) !important; max-width:none !important; padding:clamp(32px,6vw,86px) clamp(20px,4vw,58px) !important; margin:0 auto; color:#183c43; font-family:"Microsoft YaHei","PingFang SC",sans-serif; }
      .unified-question-shell .unified-story-intro[hidden],.unified-question-shell .unified-result-preview[hidden] { display:none !important; }
      .unified-story-intro { display:grid; grid-template-columns:minmax(0,1.02fr) minmax(330px,.98fr); grid-template-rows:auto auto 1fr auto; column-gap:clamp(34px,6vw,86px); align-items:start; min-height:620px; }
      .unified-story-kicker { grid-column:1; margin:8px 0 18px; color:#407a86; font-size:13px; font-weight:900; letter-spacing:0; }.unified-story-intro h1 { grid-column:1; max-width:550px; margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(48px,6vw,86px); line-height:1.04; letter-spacing:0; }.unified-story-copy { grid-column:1; max-width:500px; margin:28px 0 0; color:#647c7f; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(17px,1.8vw,21px); font-weight:600; line-height:1.75; }
      .unified-route { grid-column:2; grid-row:1 / span 4; align-self:stretch; display:flex; flex-direction:column; justify-content:center; min-width:0; padding:18px 0 0; border-top:1px solid #b8d7d1; border-bottom:1px solid #b8d7d1; }.unified-route > p { margin:0; padding:0 18px 20px; color:#407a86; font-size:12px; font-weight:900; }.unified-route svg { display:block; width:100%; min-width:0; }.unified-route path { fill:none; stroke:#3c777d; stroke-width:3; }.unified-route circle { fill:#fff; stroke:#3c777d; stroke-width:2.5; }.unified-route text { fill:#183c43; font-size:13px; font-weight:850; text-anchor:middle; dominant-baseline:middle; }.unified-route-labels { display:flex; justify-content:space-between; gap:10px; padding:4px 18px 20px; color:#647c7f; font-size:11px; font-weight:800; }.unified-route-labels span:nth-child(2) { text-align:center; }.unified-route-labels span:last-child { text-align:right; }
      .unified-start { grid-column:1; align-self:end; min-width:min(100%,420px); min-height:50px; margin-top:42px; padding:10px 18px; cursor:pointer; border:1px solid #183c43; background:#183c43; color:#fff; font:850 16px "Microsoft YaHei","PingFang SC",sans-serif; }.unified-start:hover { background:#285e65; transform:translateY(-2px); }
      .unified-question-shell .unified-question-head { display:grid; grid-template-columns:minmax(0,1fr) max-content; gap:20px; align-items:end; margin:0; padding-bottom:24px; border-bottom:1px solid #b8d7d1; }.unified-question-shell .unified-question-head h1 { margin:5px 0 0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:0; }.unified-question-shell .unified-question-head p { margin:0; color:#407a86; font-size:12px; font-weight:900; letter-spacing:0; }.unified-question-shell .unified-question-head strong { display:block; min-width:76px; padding:10px; border:1px solid #183c43; background:#dff3ee; text-align:center; font-size:13px; }
      .unified-question-shell .unified-progress-row { display:grid; grid-template-columns:minmax(0,1fr) max-content; gap:14px; align-items:center; margin-top:24px; color:#647c7f; font-size:14px; font-weight:800; }.unified-question-shell .viz-badge { padding:0 !important; border:0 !important; background:transparent !important; color:#183c43; font-size:14px; }.unified-question-shell .unified-progress-row .text-muted { margin:0; color:#647c7f; font-size:13px; }.unified-meter { height:9px; margin-top:10px; overflow:hidden; border:1px solid #8fb8b3; background:#fff; }.unified-meter span { display:block; width:0; height:100%; background:#407a86; transition:width .22s ease; }
      .unified-question-shell .unified-scene-main { margin-top:34px; padding:0 0 26px; border-bottom:1px solid #b8d7d1; }.unified-question-shell .unified-scene-main h2 { margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(32px,5vw,56px); line-height:1.12; letter-spacing:0; }.unified-question-shell .unified-scene-main p { max-width:780px; margin:14px 0 0; color:#315c61; font-size:18px; font-weight:650; line-height:1.75; }
      .unified-question-shell .unified-choice-section h3 { margin:22px 0 12px; color:#407a86; font-size:13px; font-weight:900; }.unified-question-shell #choices { display:grid; gap:12px; }.unified-question-shell #choices .btn,.unified-question-shell #choices .choice { position:relative; min-height:76px; width:100%; padding:17px 20px 17px 54px; cursor:pointer; border:1px solid #8fb8b3; background:#fff; color:#183c43; box-shadow:none; text-align:left; font:700 17px "Microsoft YaHei","PingFang SC",sans-serif; transition:background .16s ease,border-color .16s ease,transform .16s ease; }.unified-question-shell #choices .btn::before,.unified-question-shell #choices .choice::before { content:attr(data-letter); position:absolute; left:18px; top:50%; display:grid; place-items:center; width:22px; height:22px; border:1px solid #5a8582; border-radius:50%; color:#407a86; font-size:12px; font-weight:900; transform:translateY(-50%); }.unified-question-shell #choices .btn:hover,.unified-question-shell #choices .choice:hover { border-color:#183c43; background:#f1faf7; }.unified-question-shell #choices .btn[aria-pressed="true"],.unified-question-shell #choices .choice[aria-pressed="true"] { border-color:#183c43; background:#dff3ee; transform:translateX(4px); }.unified-question-shell #choices .btn[aria-pressed="true"]::before,.unified-question-shell #choices .choice[aria-pressed="true"]::before { background:#183c43; color:#fff; }.unified-question-shell #choices small { display:block; margin-top:6px; color:#647c7f; font-size:13px; font-weight:650; line-height:1.5; }
      .unified-question-shell .unified-actions { display:flex; justify-content:space-between; gap:14px; margin-top:26px; }.unified-question-shell .unified-actions .btn { min-height:46px; flex:0 1 190px; padding:10px 16px; cursor:pointer; border:1px solid #183c43; background:#fff; color:#183c43; text-align:center; font:800 15px "Microsoft YaHei","PingFang SC",sans-serif; }.unified-question-shell .unified-actions .btn-primary { flex-basis:min(100%,420px); background:#183c43; color:#fff; }.unified-question-shell .unified-actions .btn:disabled { opacity:.4; cursor:not-allowed; }
      .unified-result-preview { display:grid; place-items:start; align-content:center; min-height:min(720px,calc(100vh - 120px)); max-width:760px; margin:0 auto; padding:clamp(36px,7vw,86px) 0; }.unified-result-preview p { max-width:520px; margin:26px 0 0; color:#647c7f; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:18px; font-weight:600; line-height:1.75; }.unified-result-preview .unified-preview-kicker { margin:0 0 16px; color:#407a86; font-family:"Microsoft YaHei","PingFang SC",sans-serif; font-size:12px; font-weight:900; }.unified-result-preview h1 { max-width:600px; margin:0; font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif; font-size:clamp(46px,7vw,78px); line-height:1.08; letter-spacing:0; }.unified-preview-track { display:flex; gap:9px; margin:40px 0; }.unified-preview-track span { width:14px; height:14px; border:1px solid #4e8e91; border-radius:50%; background:#cdece5; }.unified-preview-track span:nth-child(3n) { background:#f2c86a; }.unified-result-preview button { min-width:min(100%,360px); min-height:50px; padding:10px 18px; cursor:pointer; border:1px solid #183c43; background:#183c43; color:#fff; font:850 16px "Microsoft YaHei","PingFang SC",sans-serif; }
      @media (max-width:720px) { .unified-question-shell { padding:24px 18px !important; }.unified-story-intro { display:block; min-height:0; }.unified-route { margin-top:34px; }.unified-story-copy { font-size:17px; }.unified-start { width:100%; margin-top:28px; }.unified-question-shell .unified-question-head,.unified-question-shell .unified-progress-row { grid-template-columns:1fr; }.unified-question-shell .unified-question-head strong { justify-self:start; }.unified-question-shell .unified-progress-row .text-muted { display:none; }.unified-question-shell .unified-scene-main h2 { font-size:34px; }.unified-question-shell .unified-scene-main p { font-size:16px; }.unified-question-shell #choices .btn,.unified-question-shell #choices .choice { font-size:16px; }.unified-question-shell .unified-actions { display:grid; grid-template-columns:1fr; }.unified-question-shell .unified-actions .btn { width:100%; max-width:none; } }
    `;
    document.head.append(style);
  };

  const routeMarkup = () => '<div class="unified-route"><p>JOURNEY / YOUR STORY IN STEPS</p><svg viewBox="0 0 520 160" aria-hidden="true"><path d="M32 112 C106 32 162 36 226 87 S364 144 486 50"></path><g><circle cx="32" cy="112" r="14"></circle><text x="32" y="112">1</text><circle cx="138" cy="50" r="14"></circle><text x="138" y="50">2</text><circle cx="252" cy="92" r="14"></circle><text x="252" y="92">3</text><circle cx="370" cy="112" r="14"></circle><text x="370" y="112">4</text><circle cx="486" cy="50" r="14"></circle><text x="486" y="50">5</text></g></svg><div class="unified-route-labels"><span>开始观察</span><span>进入情境</span><span>完成回看</span></div></div>';

  const mount = (root, options) => {
    if (!root || root.dataset.unifiedQuestionShellMounted === 'true') return;
    addStyles();
    root.dataset.unifiedQuestionShellMounted = 'true';
    root.classList.add('unified-question-shell');
    const questionNodes = [...root.querySelectorAll('[data-question]')];
    const progress = root.querySelector('#progress');
    const scene = root.querySelector('#scene-title')?.closest('[data-question]');
    const choice = root.querySelector('#choices')?.closest('[data-question]');
    const actions = root.querySelector('#back')?.closest('[data-question]');
    progress?.parentElement.classList.add('unified-progress-row');
    scene?.classList.add('unified-scene-main');
    choice?.classList.add('unified-choice-section');
    actions?.classList.add('unified-actions');
    const questionHead = document.createElement('header');
    questionHead.className = 'unified-question-head';
    questionHead.innerHTML = `<div><p>${options.kicker}</p><h1>${options.title}</h1></div><strong>${options.total} 个情境</strong>`;
    root.insertBefore(questionHead, progress?.parentElement || root.firstChild);
    const meter = document.createElement('div');
    meter.className = 'unified-meter';
    meter.innerHTML = '<span></span>';
    progress?.parentElement.insertAdjacentElement('afterend', meter);
    const updateMeter = () => {
      const match = progress?.textContent.match(/(\d+)\s*\/\s*(\d+)/);
      if (match) meter.firstElementChild.style.width = `${Math.max(0, Math.min(100, Number(match[1]) / Number(match[2]) * 100))}%`;
      root.querySelectorAll('#choices > button').forEach((button, index) => button.dataset.letter = String.fromCharCode(65 + index));
    };
    new MutationObserver(updateMeter).observe(progress, { childList:true, characterData:true, subtree:true });
    updateMeter();
    const intro = document.createElement('section');
    intro.className = 'unified-story-intro';
    intro.innerHTML = `<p class="unified-story-kicker">${options.kicker}</p><h1>${options.title}</h1><p class="unified-story-copy">${options.intro}</p>${routeMarkup()}<button class="unified-start" type="button">开始这次测试</button>`;
    root.insertBefore(intro, root.firstChild);
    const showQuestions = () => { intro.hidden = true; questionHead.hidden = false; progress?.parentElement && (progress.parentElement.hidden = false); meter.hidden = false; questionNodes.forEach(node => { node.hidden = false; }); window.scrollTo(0, 0); };
    const hideQuestions = () => { questionHead.hidden = true; progress?.parentElement && (progress.parentElement.hidden = true); meter.hidden = true; questionNodes.forEach(node => { node.hidden = true; }); };
    intro.querySelector('button').addEventListener('click', showQuestions);
    root.addEventListener('click', event => {
      if (event.target.closest('#restart')) window.setTimeout(showQuestions, 0);
    });
    hideQuestions();
    root._unifiedQuestionShell = { hideQuestions, showQuestions, intro, questionHead, meter, options };
  };

  const showResultPreview = (root, onOpen) => {
    const shell = root?._unifiedQuestionShell;
    if (!root || !shell) return onOpen();
    shell.hideQuestions();
    root.querySelector('#result')?.setAttribute('hidden', '');
    let preview = root.querySelector('.unified-result-preview');
    if (!preview) { preview = document.createElement('section'); preview.className = 'unified-result-preview'; root.append(preview); }
    preview.innerHTML = `<p class="unified-preview-kicker">ALL SCENES COMPLETE</p><h1>${shell.options.total} 个选择，已经走完</h1><p>你的测试档案已经整理好。现在打开，看看这次情境里最常出现的第一反应。</p><div class="unified-preview-track" aria-hidden="true">${'<span></span>'.repeat(9)}</div><button type="button">查看我的结果</button>`;
    preview.hidden = false;
    preview.querySelector('button').addEventListener('click', () => { preview.hidden = true; onOpen(); window.scrollTo(0, 0); }, { once:true });
    window.scrollTo(0, 0);
  };

  window.unifiedQuestionShell = { mount, showResultPreview };
})();
