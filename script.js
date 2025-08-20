// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Close nav on link click (mobile)
nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Smooth scroll is via CSS, but ensure header offset for hash links (optional)
// Here we leave default as design uses ample spacing.

// Current year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Prefer local images with fallback
// <img data-local="images/..." data-fallback="https://..."> will try local first then fallback
document.querySelectorAll('img[data-local]').forEach((img) => {
  const local = img.getAttribute('data-local');
  const fallback = img.getAttribute('data-fallback') || img.getAttribute('src');
  if (!local) return;

  // Set up fallback on error
  const onError = () => {
    if (fallback && img.src !== fallback) {
      img.src = fallback;
    }
    img.removeEventListener('error', onError);
  };
  img.addEventListener('error', onError);

  // Try local first
  img.src = local;
});

// Hero background: data-local/data-fallback on .hero-bg
(() => {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  const local = heroBg.getAttribute('data-local');
  const fallback = heroBg.getAttribute('data-fallback');
  const setBg = (url) => {
    heroBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('${url}')`;
  };
  if (!local) return;
  const testImg = new Image();
  testImg.onload = () => setBg(local);
  testImg.onerror = () => fallback && setBg(fallback);
  testImg.src = local;
})();
