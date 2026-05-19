const root = document.documentElement;
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function closeNav() {
  document.body.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
}

function openNav() {
  document.body.classList.add('nav-open');
  toggle.setAttribute('aria-expanded', 'true');
}

function toggleNav() {
  if (document.body.classList.contains('nav-open')) {
    closeNav();
  } else {
    openNav();
  }
}

if (toggle && nav) {
  toggle.addEventListener('click', toggleNav);

  nav.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });
}

const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let slideInterval;

function getSlideUnit() {
  const slide = slideItems[0];
  if (!slide || !slides) return 0;
  const gap = parseFloat(getComputedStyle(slides).gap) || 0;
  return slide.getBoundingClientRect().width + gap;
}

function setSlide(index) {
  if (!slides || dots.length === 0 || slideItems.length === 0) return;
  currentSlide = index % dots.length;
  if (currentSlide < 0) currentSlide = dots.length - 1;
  const slideUnit = getSlideUnit();
  slides.style.transform = `translateX(-${currentSlide * slideUnit}px)`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
  });
}

function nextSlide() {
  setSlide(currentSlide + 1);
}

function startSlider() {
  stopSlider();
  slideInterval = window.setInterval(nextSlide, 4500);
}

function stopSlider() {
  if (slideInterval) {
    window.clearInterval(slideInterval);
  }
}

if (slides && dots.length) {
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      setSlide(Number(dot.dataset.index));
      startSlider();
    });
  });

  const slider = document.querySelector('.slider');
  slider?.addEventListener('mouseenter', stopSlider);
  slider?.addEventListener('mouseleave', startSlider);

  startSlider();
}
