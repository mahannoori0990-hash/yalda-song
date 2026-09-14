(() => {
  'use strict';
  const root = document.documentElement;
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.page-progress span');
  const cursor = document.querySelector('.cursor-light');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const sectionIds = ['countdown-section','story-section','map-section','songs-section','top-songs-section','event-section','faq-section'];
  sectionIds.forEach((id, index) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.dataset.chapter = String(index + 1).padStart(2, '0');
    section.classList.add('experience-section');
  });

  let ticking = false;
  function updateScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const amount = Math.min(1, Math.max(0, scrollY / max));
    root.style.setProperty('--page-progress', amount);
    if (progress) progress.style.transform = `scaleY(${amount})`;
    nav?.classList.toggle('is-scrolled', scrollY > 35);
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  updateScroll();

  if (finePointer && cursor) {
    let x = innerWidth / 2, y = innerHeight / 2;
    let tx = x, ty = y;
    addEventListener('pointermove', event => {
      tx = event.clientX;
      ty = event.clientY;
      cursor.classList.add('is-visible');
    }, { passive: true });
    addEventListener('pointerout', event => {
      if (!event.relatedTarget) cursor.classList.remove('is-visible');
    });
    const animateCursor = () => {
      x += (tx - x) * .12;
      y += (ty - y) * .12;
      cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    document.querySelectorAll('.magnetic').forEach(item => {
      item.addEventListener('pointermove', event => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty('--magnet-x', `${(event.clientX - rect.left - rect.width / 2) * .12}px`);
        item.style.setProperty('--magnet-y', `${(event.clientY - rect.top - rect.height / 2) * .12}px`);
      });
      item.addEventListener('pointerleave', () => {
        item.style.setProperty('--magnet-x', '0px');
        item.style.setProperty('--magnet-y', '0px');
      });
    });
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-inview', entry.isIntersecting));
    }, { threshold: .08, rootMargin: '-8% 0px -8% 0px' });
    document.querySelectorAll('.experience-section').forEach(section => observer.observe(section));
  } else {
    document.querySelectorAll('.experience-section').forEach(section => section.classList.add('is-inview'));
  }

  const music = document.getElementById('backgroundMusic');
  const musicButton = document.getElementById('musicToggle');
  if (music && musicButton) {
    const equalizer = document.createElement('span');
    equalizer.className = 'mini-equalizer';
    equalizer.setAttribute('aria-hidden', 'true');
    equalizer.innerHTML = '<i></i><i></i><i></i><i></i>';
    musicButton.querySelector('.music-icon')?.append(equalizer);
  }
})();
