/* ============================================
   Mohamed Hashim — Data Analyst Portfolio
   script.js
   ============================================ */

/* ── 1. NAVBAR ──────────────────────────────────────────── */
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

/* ── 2. MOBILE MENU ─────────────────────────────────────── */
var mobileBtn = document.getElementById('mobile-menu-btn');
var mobileNav = document.getElementById('mobile-nav');

mobileBtn.addEventListener('click', function () {
  var open = mobileNav.classList.toggle('active');
  mobileBtn.classList.toggle('active', open);
  mobileBtn.setAttribute('aria-expanded', open);
  mobileNav.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileNav.classList.remove('active');
    mobileBtn.classList.remove('active');
  });
});

/* ── 3. SMOOTH SCROLL ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── 4. SCROLL REVEAL ───────────────────────────────────── */
var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) {
      en.target.style.opacity = '1';
      en.target.style.transform = 'translateY(0)';
      revealObs.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .contact-card, .finding-card').forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObs.observe(el);
});

/* ── 5. SKILL BARS ──────────────────────────────────────── */
var barObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) {
      en.target.querySelectorAll('.skill-bar-fill').forEach(function (bar) {
        bar.style.width = getComputedStyle(bar).getPropertyValue('--fill-width');
      });
      barObs.unobserve(en.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(function (c) { barObs.observe(c); });

/* ── 6. SLIDER ──────────────────────────────────────────── */
var slideItems  = [];
var dotBtns     = [];
var currentIdx  = 0;
var sliderTimer = null;

function initSlider() {
  slideItems = Array.from(document.querySelectorAll('.slide-item'));
  dotBtns    = Array.from(document.querySelectorAll('.slider-dot'));

  if (!slideItems.length) return;

  var prevBtn = document.getElementById('slidePrev');
  var nextBtn = document.getElementById('slideNext');
  if (prevBtn) prevBtn.addEventListener('click', function () { moveSlide(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { moveSlide(1); });

  dotBtns.forEach(function (dot) {
    dot.addEventListener('click', function () {
      jumpSlide(parseInt(dot.getAttribute('data-idx'), 10));
    });
  });

  var touchX = 0;
  var outer  = document.querySelector('.slider-outer');
  if (outer) {
    outer.addEventListener('touchstart', function (e) {
      touchX = e.changedTouches[0].screenX;
    }, { passive: true });
    outer.addEventListener('touchend', function (e) {
      var diff = touchX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) moveSlide(diff > 0 ? 1 : -1);
    }, { passive: true });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  moveSlide(-1);
    if (e.key === 'ArrowRight') moveSlide(1);
  });

  startAuto();
  showSlide(0);
}

function showSlide(idx) {
  slideItems.forEach(function (el, i) {
    el.classList.toggle('active', i === idx);
  });
  dotBtns.forEach(function (dot, i) {
    dot.classList.toggle('active', i === idx);
    dot.style.width       = i === idx ? '24px' : '8px';
    dot.style.background  = i === idx ? '#14A9A8' : '';
    dot.style.borderColor = i === idx ? '#14A9A8' : '';
  });
  currentIdx = idx;
}

function moveSlide(dir) {
  var next = (currentIdx + dir + slideItems.length) % slideItems.length;
  showSlide(next);
  restartAuto();
}

function jumpSlide(idx) {
  showSlide(idx);
  restartAuto();
}

function startAuto() {
  sliderTimer = setInterval(function () { moveSlide(1); }, 5000);
}

function restartAuto() {
  clearInterval(sliderTimer);
  startAuto();
}

/* ── 7. INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initSlider();
});
