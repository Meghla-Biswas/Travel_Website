/* Robust slider: preserves all original functionality, fixes full card sliding */
(function () {
  const track = document.querySelector('.carousel-track');
  const cards = Array.from(track.querySelectorAll('.card'));
  const prevBtn = document.querySelector('.nav.prev');
  const nextBtn = document.querySelector('.nav.next');

  let index = 0;
  let perView = computePerView();
  let slideWidth = computeSlideWidth();

  // compute visible cards based on breakpoints
  function computePerView() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 992) return 2;
    return 3;
  }

  // compute width of a slide (ignore CSS gap to avoid misalignment)
  function computeSlideWidth() {
    return track.offsetWidth / perView;
  }

  // translate the track to the current index
  function updateTrack(animate = true) {
    perView = computePerView();
    slideWidth = computeSlideWidth();

    const maxIndex = Math.max(0, cards.length - perView);
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    track.style.transition = animate
      ? 'transform 450ms cubic-bezier(.22,.9,.35,1)'
      : 'none';

    const translateX = index * slideWidth;
    track.style.transform = `translateX(-${translateX}px)`;

    updateButtons();
  }

  function updateButtons() {
    const maxIndex = Math.max(0, cards.length - perView);
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;

    if (cards.length <= perView) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = '';
      nextBtn.style.display = '';
    }
  }

  // click handlers
  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    updateTrack(true);
  });
  nextBtn.addEventListener('click', () => {
    index = Math.min(cards.length - perView, index + 1);
    updateTrack(true);
  });

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // recalc on resize with debounce
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => updateTrack(false), 120);
  });

  // run on DOMContentLoaded and window load
  document.addEventListener('DOMContentLoaded', () => updateTrack(false));
  window.addEventListener('load', () => updateTrack(false));

  // Package Overview buttons
  track.addEventListener('click', (e) => {
    const btn = e.target.closest('.overview-btn');
    if (!btn) return;

    e.preventDefault();
    const card = btn.closest('.card');
    if (!card) return;

    const city = card.getAttribute('data-city') || 'Unknown';
    const price = card.getAttribute('data-price') || '0';
    const days = card.getAttribute('data-days') || '1';

    const url = `package-details.html?city=${encodeURIComponent(city)}&price=${encodeURIComponent(price)}&days=${encodeURIComponent(days)}`;
    window.location.href = url;
  });

  // expose update function
  window.myCarouselUpdate = updateTrack;
})();
