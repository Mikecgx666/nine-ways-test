(() => {
  const style = document.createElement('style');
  style.id = 'enneagram-choice-polish';
  style.textContent = `
    .compact-choice { position:relative; display:grid; grid-template-columns:34px minmax(0,1fr); align-items:center; gap:10px; min-height:62px !important; overflow:hidden; padding:10px 42px 10px 12px !important; line-height:1.32; transition:transform .16s ease,box-shadow .16s ease,background .16s ease; }
    .compact-choice::before { content:attr(data-choice-mark); display:grid; place-items:center; width:28px; height:28px; border:2px solid #17151f; background:var(--choice-color); color:#17151f; font-size:13px; font-weight:900; }
    .compact-choice::after { content:'✓'; position:absolute; right:14px; top:50%; display:grid; place-items:center; width:25px; height:25px; border:2px solid #17151f; background:#fff; font-size:16px; font-weight:900; opacity:0; transform:translateY(-50%) scale(.6); transition:opacity .16s ease,transform .16s ease; }
    .compact-choice:hover, .compact-choice:focus-visible { transform:translate(-2px,-2px); box-shadow:4px 4px 0 #17151f; outline:0; }
    .compact-choice[aria-pressed="true"]::after { opacity:1; transform:translateY(-50%) scale(1); }
    .compact-choice__line { min-width:0; color:#17151f; font-size:14px; font-weight:800; line-height:1.45; }
    @media (prefers-reduced-motion:reduce) { .compact-choice, .compact-choice::after { transition:none; } }
  `;
  document.head.append(style);

  const colors = ['#ffd33d', '#39baff', '#d8a8ff'];
  window.prepareCompactChoice = (button, original, index, weights) => {
    button.classList.add('compact-choice');
    button.dataset.choiceMark = ['A', 'B', 'C'][index] || '•';
    button.style.setProperty('--choice-color', colors[index % colors.length]);
    const copy = typeof original === 'object' && original !== null ? original.copy : original;
    const line = document.createElement('span');
    line.className = 'compact-choice__line';
    line.textContent = copy;
    button.replaceChildren(line);
    button.title = copy;
    button.setAttribute('aria-label', copy);
  };
})();
