(() => {
  function addStyles() {
    if (document.getElementById('stage-meter-cat-styles')) return;
    const style = document.createElement('style');
    style.id = 'stage-meter-cat-styles';
    style.textContent = `
      .stage-meter { position:relative; height:34px; margin:16px 0 10px; }
      .stage-meter__rail { position:absolute; top:19px; right:0; left:0; height:7px; overflow:hidden; border-radius:999px; background:#dceae6; }
      .stage-meter__fill { display:block; width:0; height:100%; border-radius:inherit; background:#77beb8; transition:width .34s cubic-bezier(.3,.95,.35,1.35); }
      .stage-meter__cat { position:absolute; z-index:1; top:0; left:0; display:grid; place-items:center; width:30px; height:30px; transform:translateX(-50%); color:#183c43; font-family:"Segoe UI Emoji","Apple Color Emoji",sans-serif; font-size:24px; line-height:1; transition:left .34s cubic-bezier(.3,.95,.35,1.35); }
      .stage-meter__cat.is-hopping { animation:stage-cat-hop .34s ease-out both; }
      @keyframes stage-cat-hop { 0% { transform:translateX(-50%); } 45% { transform:translateX(-50%) translateY(-12px) rotate(-8deg); } 100% { transform:translateX(-50%); } }
      @media (prefers-reduced-motion:reduce) { .stage-meter__fill,.stage-meter__cat { transition:none; } .stage-meter__cat.is-hopping { animation:none; } }
    `;
    document.head.append(style);
  }

  window.enneagramStageMeter = (root, currentIndex, total) => {
    if (!root || !total) return;
    addStyles();
    let meter = root.querySelector('.stage-meter');
    if (!meter) {
      const progress = root.querySelector('#progress');
      if (!progress) return;
      meter = document.createElement('div');
      meter.className = 'stage-meter';
      meter.dataset.question = '';
      meter.setAttribute('aria-hidden', 'true');
      meter.innerHTML = '<span class="stage-meter__rail"><i class="stage-meter__fill"></i></span><span class="stage-meter__cat">🐱</span>';
      progress.parentElement.insertAdjacentElement('afterend', meter);
    }
    const percent = Math.max(2, Math.min(98, (currentIndex + 1) / total * 100));
    const fill = meter.querySelector('.stage-meter__fill');
    const cat = meter.querySelector('.stage-meter__cat');
    fill.style.width = `${percent}%`;
    cat.style.left = `${percent}%`;
    cat.classList.remove('is-hopping');
    void cat.offsetWidth;
    cat.classList.add('is-hopping');
  };

  function syncFromProgress(root, progress) {
    const match = progress.textContent.match(/(\d+)\s*\/\s*(\d+)/);
    if (!match) return;
    window.enneagramStageMeter(root, Number(match[1]) - 1, Number(match[2]));
  }

  function attachToProgress(progress) {
    if (progress.dataset.catMeterAttached) return;
    const root = progress.parentElement?.closest('[id]');
    if (!root) return;
    progress.dataset.catMeterAttached = 'true';
    syncFromProgress(root, progress);
    const observer = new MutationObserver(() => syncFromProgress(root, progress));
    observer.observe(progress, { childList:true, characterData:true, subtree:true });
  }

  function install() {
    document.querySelectorAll('#progress').forEach(attachToProgress);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once:true });
  else install();
})();
