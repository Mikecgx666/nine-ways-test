(() => {
  const stages = {
    college: { src: 'youth-workplace-collaboration.html?module=college&v=20260805-unified-seven-v5', name: '大学生开学', title: '大学生开学' },
    research: { src: 'youth-workplace-collaboration.html?module=research&v=20260805-unified-seven-v5', name: '研究生入组', title: '研究生入组' },
    workplace: { src: 'youth-workplace-collaboration.html?module=workplace&v=20260805-unified-seven-v5', name: '新人入职', title: '新人入职' },
    journey: { src: 'youth-workplace-collaboration.html?module=journey&v=20260805-unified-seven-v5', name: '西游记 · 三阶段情境测试', title: '西游记 · 三阶段情境测试' },
    child: { src: 'youth-workplace-collaboration.html?module=child&v=20260805-unified-seven-v5', name: '儿童探索 / 7 - 12 岁', title: '儿童探索测试' },
    teen: { src: 'youth-workplace-collaboration.html?module=teen&v=20260805-unified-seven-v5', name: '少年自省 / 13 - 18 岁', title: '少年自省测试' },
    adult: { src: 'youth-workplace-collaboration.html?module=adult&v=20260805-unified-seven-v5', name: '青年抉择 / 19 - 35 岁', title: '青年抉择测试' },
    integration: { src: 'youth-workplace-collaboration.html?module=integration&v=20260805-unified-seven-v5', name: '人生整合 / 36+ 岁', title: '人生整合测试' },
  };

  const landing = document.querySelector('#landing');
  const albumView = document.querySelector('#album-view');
  const ageView = document.querySelector('#age-view');
  const storyAlbumView = document.querySelector('#story-album-view');
  const testView = document.querySelector('#test-view');
  const frame = document.querySelector('#test-frame');
  const testName = document.querySelector('#test-name');
  const saveStatus = document.querySelector('#save-status');
  const backHome = document.querySelector('#back-home');
  const testTop = document.querySelector('.test-top');
  let testOrigin = 'home';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function enterView(view) {
    if (reduceMotion) return;
    view.classList.remove('view-enter');
    window.requestAnimationFrame(() => view.classList.add('view-enter'));
  }

  function setUpScrollReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.hub-launch').forEach((card) => {
      card.classList.add('motion-enter');
      observer.observe(card);
    });
  }

  function revealCollectionCards(view, selector) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const cards = Array.from(view.querySelectorAll(selector));
    if (!cards.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    cards.forEach((card, index) => {
      card.classList.remove('is-visible');
      card.classList.add('scroll-reveal');
      card.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 60}ms`);
    });
    window.requestAnimationFrame(() => cards.forEach((card) => observer.observe(card)));
  }

  function connectTestHeader() {
    const innerWindow = frame.contentWindow;
    if (!innerWindow) return;
    const updateHeader = () => testTop.classList.toggle('is-condensed', innerWindow.scrollY > 18);
    innerWindow.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  function closeCollections() {
    albumView.classList.remove('is-open');
    ageView.classList.remove('is-open');
    storyAlbumView.classList.remove('is-open');
  }

  function openStage(id, origin = 'home') {
    const stage = stages[id];
    if (!stage) return;
    testOrigin = origin;
    frame.src = stage.src;
    frame.title = stage.title;
    testName.textContent = stage.name;
    saveStatus.textContent = '本次结果仅在当前页面查看';
    landing.style.display = 'none';
    closeCollections();
    testView.style.display = 'block';
    enterView(testView);
    testTop.classList.remove('is-condensed');
    backHome.textContent = origin === 'album' ? '返回青年专辑' : origin === 'age' ? '返回人生阶段' : origin === 'stories' ? '返回故事专辑' : '返回首页';
    window.scrollTo(0, 0);
  }

  function openAlbum() {
    landing.style.display = 'none';
    testView.style.display = 'none';
    closeCollections();
    albumView.classList.add('is-open');
    enterView(albumView);
    revealCollectionCards(albumView, '.album-card');
    window.scrollTo(0, 0);
  }

  function openAgeStages() {
    landing.style.display = 'none';
    testView.style.display = 'none';
    closeCollections();
    ageView.classList.add('is-open');
    enterView(ageView);
    revealCollectionCards(ageView, '.age-card');
    window.scrollTo(0, 0);
  }

  function openStoryAlbums() {
    landing.style.display = 'none';
    testView.style.display = 'none';
    closeCollections();
    storyAlbumView.classList.add('is-open');
    enterView(storyAlbumView);
    revealCollectionCards(storyAlbumView, '.quest-launch');
    window.scrollTo(0, 0);
  }

  function openHome() {
    closeCollections();
    testView.style.display = 'none';
    testTop.classList.remove('is-condensed');
    landing.style.display = 'block';
    enterView(landing);
    window.scrollTo(0, 0);
  }

  document.querySelector('#open-age-stages').addEventListener('click', openAgeStages);
  document.querySelector('#open-story-albums').addEventListener('click', openStoryAlbums);
  document.querySelector('#open-youth-album').addEventListener('click', openAlbum);
  document.querySelector('#back-from-age').addEventListener('click', openHome);
  document.querySelector('#back-from-stories').addEventListener('click', openHome);
  document.querySelector('#back-to-home').addEventListener('click', openHome);
  document.querySelectorAll('[data-age-stage]').forEach((button) => {
    button.addEventListener('click', () => openStage(button.dataset.ageStage, 'age'));
  });
  document.querySelectorAll('[data-album-stage]').forEach((button) => {
    button.addEventListener('click', () => openStage(button.dataset.albumStage, 'album'));
  });
  ['journey'].forEach((id) => {
    const button = document.querySelector(`#start-${id}`);
    if (button) button.addEventListener('click', () => openStage(id, 'stories'));
  });

  backHome.addEventListener('click', () => {
    if (testOrigin === 'album') openAlbum();
    else if (testOrigin === 'age') openAgeStages();
    else if (testOrigin === 'stories') openStoryAlbums();
    else openHome();
  });

  frame.addEventListener('load', connectTestHeader);

  setUpScrollReveal();
})();
