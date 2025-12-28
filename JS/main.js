console.log("FINAL JS LOADED");

const buttons = document.querySelectorAll('.main-nav button');
const panels = document.querySelectorAll('.panel');
const body = document.body;
const heroVideo = document.getElementById('heroVideo');

function activatePanel(id) {
  panels.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  body.className = '';
  body.classList.add(`state-${id}`);

  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    activatePanel(btn.dataset.panel);
  });
});

/* UNSTABLE HERO MOTION */
let t = 0;
setInterval(() => {
  t += 0.04;
  heroVideo.style.transform = `
    scale(${1.05 + Math.sin(t) * 0.02})
    translate(${Math.sin(t) * 10}px, ${Math.cos(t) * 10}px)
  `;
}, 120);