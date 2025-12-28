/* -------- PANEL SWITCH -------- */

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.remove('active');
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* -------- HERO VIDEO INSTABILITY -------- */

const heroVideo = document.getElementById('heroVideo');

let drift = 0;
setInterval(() => {
  drift += (Math.random() - 0.5) * 0.2;
  heroVideo.style.transform = `
    scale(${1.02 + Math.sin(drift) * 0.02})
    translate(${Math.sin(drift) * 4}px, ${Math.cos(drift) * 4}px)
  `;
}, 120);

/* -------- PORTFOLIO FILTER -------- */

function filterPortfolio(type) {
  const buttons = document.querySelectorAll('.portfolio-menu button');
  buttons.forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  const items = document.querySelectorAll('.portfolio-item');
  items.forEach(item => {
    if (type === 'all' || item.dataset.type === type) {
      item.style.display = 'block';
      item.style.animation = 'panelIn 0.6s ease';
    } else {
      item.style.display = 'none';
    }
  });
}

/* -------- LIGHTBOX -------- */

function openLightbox(content) {
  const box = document.getElementById('lightbox');
  const container = document.getElementById('lightbox-media-container');
  container.innerHTML = '';
  container.appendChild(content.cloneNode(true));
  box.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

/* -------- NAV AUTO FADE (anti UX) -------- */

let nav = document.querySelector('.main-nav');
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScroll) {
    nav.style.opacity = '0';
  } else {
    nav.style.opacity = '1';
  }
  lastScroll = window.scrollY;
});