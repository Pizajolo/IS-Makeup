function toggleReel(el) {
  const video = el.querySelector('video');
  if (video.paused) {
    document.querySelectorAll('.reel video').forEach(v => {
      v.pause();
      v.closest('.reel').classList.remove('playing');
    });
    video.play();
    el.classList.add('playing');
  } else {
    video.pause();
    el.classList.remove('playing');
  }
}

function startAutoplayReels() {
  document.querySelectorAll('.reel[data-autoplay] video').forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    const reel = v.closest('.reel');
    v.addEventListener('playing', () => reel.classList.add('playing'));
    v.addEventListener('pause', () => reel.classList.remove('playing'));
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    };
    tryPlay();
    v.addEventListener('loadeddata', tryPlay, { once: true });
    v.addEventListener('canplay', tryPlay, { once: true });
  });
}

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.main-nav a').forEach(a =>
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

function init() {
  startAutoplayReels();
  initNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Autoplay fallback: some mobile browsers block programmatic play until the
// first user interaction.
['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, function once() {
    startAutoplayReels();
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(e =>
      window.removeEventListener(e, once)
    );
  }, { passive: true });
});
