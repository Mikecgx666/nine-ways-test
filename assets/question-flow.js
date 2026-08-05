(() => {
  if (window.enneagramQuestionFlow) return;

  const style = document.createElement('style');
  style.id = 'enneagram-question-flow-styles';
  style.textContent = `
    .enneagram-page--turn-out, .enneagram-page--turn-in { pointer-events:none; }
    .enneagram-page--turn-out { animation:enneagram-page-turn-out .2s ease-in both; transform-origin:100% 50%; }
    .enneagram-page--turn-in { animation:enneagram-page-turn-in .32s cubic-bezier(.2,.85,.25,1) both; transform-origin:0 50%; }
    .question-flow__screen { position:fixed; inset:0; z-index:9998; display:grid; place-items:center; padding:20px; background:rgba(247,244,237,.94); color:#17151f; font-family:"Microsoft YaHei","PingFang SC",sans-serif; }
    .question-flow__panel { position:relative; width:min(100%,620px); min-height:min(570px,calc(100vh - 40px)); display:flex; flex-direction:column; align-items:flex-start; justify-content:center; overflow:hidden; padding:clamp(30px,7vw,60px); border:3px solid #17151f; background:#fffdf7; box-shadow:9px 9px 0 #17151f; }
    .question-flow__label { display:inline-flex; align-items:center; min-height:31px; margin:0 0 18px; padding:4px 9px; border:2px solid #17151f; background:#ffd33d; font-size:13px; font-weight:800; }
    .question-flow__title { max-width:460px; margin:0; font-size:clamp(32px,7vw,56px); line-height:1.08; letter-spacing:0; }
    .question-flow__copy { max-width:430px; margin:16px 0 0; color:#5d5a67; font-size:17px; line-height:1.58; }
    .question-flow__meter { width:100%; max-width:430px; height:16px; margin:28px 0 10px; overflow:hidden; border:2px solid #17151f; background:#fff; }
    .question-flow__meter > span { display:block; height:100%; background:#39baff; transform-origin:left; animation:enneagram-meter-grow .7s cubic-bezier(.2,.85,.25,1) both; }
    .question-flow__count { margin:0; font-size:14px; font-weight:800; }
    .question-flow__button { min-height:50px; margin-top:30px; padding:10px 18px; border:3px solid #17151f; background:#ff4d5e; color:#17151f; box-shadow:4px 4px 0 #17151f; font:800 16px "Microsoft YaHei","PingFang SC",sans-serif; cursor:pointer; transition:transform .16s ease,box-shadow .16s ease; }
    .question-flow__button:hover, .question-flow__button:focus-visible { transform:translate(-2px,-2px); box-shadow:6px 6px 0 #17151f; outline:0; }
    .question-flow__trophy { position:relative; z-index:1; width:116px; margin:0 0 24px; font-size:104px; line-height:1; filter:drop-shadow(5px 5px 0 #17151f); animation:enneagram-trophy .85s cubic-bezier(.2,.9,.2,1) both; }
    .question-flow__confetti { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
    .question-flow__confetti span { position:absolute; width:13px; height:13px; border:2px solid #17151f; background:var(--confetti-color); animation:enneagram-confetti 1.2s cubic-bezier(.2,.8,.4,1) both; }
    .question-flow__confetti span:nth-child(3n) { border-radius:50%; }
    .question-flow__confetti span:nth-child(2n) { transform:rotate(45deg); }
    @keyframes enneagram-page-turn-out { to { opacity:0; transform:perspective(800px) rotateY(-15deg) translateX(-5%); } }
    @keyframes enneagram-page-turn-in { from { opacity:0; transform:perspective(800px) rotateY(15deg) translateX(5%); } to { opacity:1; transform:none; } }
    @keyframes enneagram-meter-grow { from { transform:scaleX(0); } to { transform:scaleX(1); } }
    @keyframes enneagram-trophy { 0% { opacity:0; transform:scale(.3) rotate(-16deg); } 58% { opacity:1; transform:scale(1.2) rotate(8deg); } 100% { transform:scale(1) rotate(0); } }
    @keyframes enneagram-confetti { from { opacity:0; transform:translate(0,-25px) rotate(0); } 18% { opacity:1; } to { opacity:0; transform:translate(var(--x),var(--y)) rotate(420deg); } }
    @media (prefers-reduced-motion:reduce) { .enneagram-page--turn-out, .enneagram-page--turn-in, .question-flow__meter > span, .question-flow__trophy, .question-flow__confetti span { animation:none; } .question-flow__button { transition:none; } }
    @media (max-width:560px) { .question-flow__screen { padding:12px; } .question-flow__panel { min-height:calc(100vh - 24px); padding:30px 24px; box-shadow:5px 5px 0 #17151f; } .question-flow__copy { font-size:16px; } }
  `;
  document.head.append(style);

  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const turnPage = (root, next) => {
    root.classList.add('enneagram-page--turn-out');
    window.setTimeout(() => {
      next();
      root.classList.remove('enneagram-page--turn-out');
      root.classList.add('enneagram-page--turn-in');
      window.setTimeout(() => root.classList.remove('enneagram-page--turn-in'), 350);
    }, 190);
  };

  const showScreen = ({ label, title, copy, completed, total, buttonText, finale, onContinue }) => {
    const screen = node('section', 'question-flow__screen');
    screen.setAttribute('role', 'dialog');
    screen.setAttribute('aria-modal', 'true');
    const panel = node('div', 'question-flow__panel');
    const confetti = node('div', 'question-flow__confetti');
    const colors = ['#ffd33d', '#39baff', '#ff4d5e', '#7ae36e', '#d8a8ff', '#ffad66'];
    for (let index = 0; index < 18; index += 1) {
      const piece = node('span', '');
      piece.style.setProperty('--confetti-color', colors[index % colors.length]);
      piece.style.left = `${8 + (index * 37) % 84}%`;
      piece.style.top = `${6 + (index * 23) % 36}%`;
      piece.style.setProperty('--x', `${-95 + (index * 53) % 190}px`);
      piece.style.setProperty('--y', `${210 + (index * 47) % 230}px`);
      piece.style.animationDelay = `${index * .025}s`;
      confetti.append(piece);
    }
    if (finale) panel.append(node('div', 'question-flow__trophy', '🏆'));
    panel.append(node('p', 'question-flow__label', label));
    panel.append(node('h2', 'question-flow__title', title));
    panel.append(node('p', 'question-flow__copy', copy));
    if (completed && total) {
      const meter = node('div', 'question-flow__meter');
      meter.setAttribute('aria-label', `已完成 ${completed} / ${total}`);
      const fill = node('span', '');
      fill.style.width = `${Math.round(completed / total * 100)}%`;
      meter.append(fill);
      panel.append(meter, node('p', 'question-flow__count', `${completed} / ${total}`));
    }
    const button = node('button', 'question-flow__button', buttonText);
    button.type = 'button';
    button.addEventListener('click', () => {
      screen.remove();
      onContinue();
    }, { once:true });
    panel.append(button, confetti);
    screen.append(panel);
    document.body.append(screen);
    button.focus();
  };

  window.enneagramQuestionFlow = (root, completed, total, next) => {
    if (completed === total) {
      showScreen({
        label:'全部完成',
        title:'你完成了全部情景',
        copy:'每一个选择都是理解自己的线索。现在，打开你的专属报告。',
        completed,
        total,
        buttonText:'查看结果',
        finale:true,
        onContinue:next
      });
      return;
    }
    const milestone = completed === 10 || completed === 20;
    if (milestone) {
      const stage = completed === 10 ? '第一阶段' : '第二阶段';
      const title = completed === 10 ? '你已完成三分之一' : '你已完成三分之二';
      showScreen({
        label:stage,
        title,
        copy:'保持你的第一感受，下一组情景正在等你。',
        completed,
        total,
        buttonText:'继续答题',
        onContinue:() => turnPage(root, next)
      });
      return;
    }
    turnPage(root, next);
  };
})();
