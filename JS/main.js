console.log("MAIN JS RUNNING");

/* ---------- PANEL SWITCH ---------- */

const navButtons = document.querySelectorAll('.main-nav button');
const panels = document.querySelectorAll('.panel');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.panel;

    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

/* ---------- HERO VIDEO DRIFT ---------- */

const heroVideo = document.getElementById('heroVideo');
let t = 0;

setInterval(() => {
  t += 0.02;
  heroVideo.style.transform =
    `scale(${1.03 + Math.sin(t) * 0.01}) translate(${Math.sin(t)*6}px, ${Math.cos(t)*6}px)`;
}, 120);

/* ---------- PORTFOLIO FILTER ---------- */

const filterButtons = document.querySelectorAll('.portfolio-menu button');
const items = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const type = btn.dataset.filter;

    items.forEach(item => {
      if (type === 'all' || item.dataset.type === type) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});