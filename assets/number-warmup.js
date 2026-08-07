(() => {
  const roots = [document.getElementById('workplace-collaboration')].filter(Boolean);

  if (!roots.length) return;

  const style = document.createElement('style');
  style.textContent = `
    .number-warmup { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; padding:20px; background:rgba(247,244,237,.94); color:#17151f; font-family:"Microsoft YaHei","PingFang SC",sans-serif; }
    .number-warmup__panel { width:min(100%,620px); min-height:min(620px,calc(100vh - 40px)); display:flex; flex-direction:column; border:3px solid #17151f; background:#fffdf7; box-shadow:9px 9px 0 #17151f; overflow:hidden; }
    .number-warmup__topline { display:flex; justify-content:space-between; gap:12px; align-items:center; min-height:54px; padding:10px 16px; border-bottom:3px solid #17151f; background:#ffd33d; font-size:13px; font-weight:800; }
    .number-warmup__body { display:flex; flex:1; flex-direction:column; padding:clamp(22px,5vw,42px); }
    .number-warmup__title { max-width:430px; margin:0; font-size:clamp(31px,7vw,54px); line-height:1.08; letter-spacing:0; }
    .number-warmup__copy { max-width:410px; margin:15px 0 0; color:#5d5a67; font-size:17px; line-height:1.5; }
    .number-warmup__stage { position:relative; flex:1; min-height:270px; margin:26px 0 16px; border:2px dashed #17151f; overflow:hidden; background:linear-gradient(90deg,rgba(57,186,255,.12) 1px,transparent 1px),linear-gradient(rgba(57,186,255,.12) 1px,transparent 1px),#f7f4ed; background-size:34px 34px; }
    .number-warmup__number { position:absolute; display:grid; place-items:center; width:clamp(55px,13vw,76px); aspect-ratio:1; padding:0; border:3px solid #17151f; border-radius:50%; background:var(--number-color); color:#17151f; box-shadow:4px 4px 0 #17151f; font:800 clamp(27px,7vw,39px)/1 inherit; cursor:pointer; transform:translate(-50%,-50%) rotate(var(--number-angle)); transition:transform .16s ease,box-shadow .16s ease; }
    .number-warmup__number:hover, .number-warmup__number:focus-visible { transform:translate(-50%,-50%) rotate(var(--number-angle)) scale(1.08); box-shadow:6px 6px 0 #17151f; outline:0; }
    .number-warmup__number.is-wrong { animation:number-warmup-shake .28s linear; background:#ff4d5e; }
    .number-warmup__number.is-found { animation:number-warmup-pop .25s ease forwards; pointer-events:none; }
    .number-warmup__footer { display:flex; justify-content:space-between; align-items:center; gap:16px; min-height:28px; }
    .number-warmup__hint { min-height:24px; margin:0; font-size:14px; font-weight:700; }
    .number-warmup__skip { padding:4px 0; border:0; background:transparent; color:#365f63; font-size:14px; font-weight:900; text-decoration:underline; text-underline-offset:4px; cursor:pointer; }
    .number-warmup__skip:hover,.number-warmup__skip:focus-visible { color:#17151f; outline:0; }
    .number-warmup.is-complete .number-warmup__stage { border-style:solid; background:#7ae36e; animation:number-warmup-flash .45s ease; }
    @keyframes number-warmup-shake { 25% { margin-left:-7px; } 75% { margin-left:7px; } }
    @keyframes number-warmup-pop { to { opacity:0; transform:translate(-50%,-50%) rotate(var(--number-angle)) scale(1.7); } }
    @keyframes number-warmup-flash { 50% { transform:scale(1.02); } }
    @media (max-width:560px) { .number-warmup { padding:12px; } .number-warmup__panel { min-height:calc(100vh - 24px); box-shadow:5px 5px 0 #17151f; } .number-warmup__body { padding:24px; } .number-warmup__stage { min-height:240px; } }
    @media (prefers-reduced-motion:reduce) { .number-warmup__number { transition:none; } }
  `;
  document.head.append(style);

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  roots.forEach(root => {
    const overlay = create('section', 'number-warmup');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'number-warmup-title');
    const panel = create('div', 'number-warmup__panel');
    const topline = create('div', 'number-warmup__topline');
    const label = create('span', '', '答题前热身');
    topline.append(label);
    const body = create('div', 'number-warmup__body');
    const title = create('h1', 'number-warmup__title', '找出 3、2、1');
    title.id = 'number-warmup-title';
    const copy = create('p', 'number-warmup__copy', '请按顺序点 3、2、1。完成后进入答题。');
    const stage = create('div', 'number-warmup__stage');
    const hint = create('p', 'number-warmup__hint', '先找到 3。');
    hint.setAttribute('aria-live', 'polite');
    const footer = create('div', 'number-warmup__footer');
    const skip = create('button', 'number-warmup__skip', '直接跳过');
    skip.type = 'button';
    footer.append(hint, skip);
    body.append(title, copy, stage, footer);
    panel.append(topline, body);
    overlay.append(panel);
    document.body.append(overlay);

    let expected = 3;
    let done = false;

    const leave = () => {
      overlay.remove();
      root.removeAttribute('aria-hidden');
    };

    skip.addEventListener('click', leave);

    const placeNumbers = () => {
      const colors = ['#ffd33d', '#39baff', '#ff4d5e', '#7ae36e', '#d8a8ff', '#ffad66', '#d7df61', '#95d4d0', '#fff'];
      const sequence = [3, 2, 1];
      const distractors = [4, 5, 6, 7, 8, 9];
      const values = [...sequence, ...distractors].sort(() => Math.random() - .5);
      values.forEach((value, index) => {
        const button = create('button', 'number-warmup__number', String(value));
        button.type = 'button';
        button.style.setProperty('--number-color', colors[index]);
        button.style.setProperty('--number-angle', `${Math.round(Math.random() * 16 - 8)}deg`);
        button.style.left = `${[17, 50, 83][index % 3] + Math.random() * 8 - 4}%`;
        button.style.top = `${[20, 50, 80][Math.floor(index / 3)] + Math.random() * 8 - 4}%`;
        button.addEventListener('click', () => {
          if (done) return;
          if (value !== expected) {
            button.classList.remove('is-wrong');
            void button.offsetWidth;
            button.classList.add('is-wrong');
            hint.textContent = `先找 ${expected}。`;
            return;
          }
          button.classList.add('is-found');
          expected -= 1;
          if (expected > 0) {
            hint.textContent = `找得好，再找 ${expected}。`;
          } else {
            done = true;
            overlay.classList.add('is-complete');
            hint.textContent = '热身完成，进入测试。';
            setTimeout(leave, 600);
          }
        });
        stage.append(button);
      });
    };

    root.setAttribute('aria-hidden', 'true');
    placeNumbers();
    stage.querySelector('.number-warmup__number')?.focus();
  });
})();
