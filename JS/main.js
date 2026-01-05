/* PANEL SWITCH */
function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.remove('active');
  });

  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

/* HERO VIDEO FADE */
const heroVideo = document.getElementById('heroVideo');
const originalShowPanel = window.showPanel;

window.showPanel = function (id) {
  originalShowPanel(id);

  if (!heroVideo) return;

  if (id === 'home' || !id) {
    heroVideo.style.opacity = '1';
    heroVideo.style.filter = 'none';
  } else {
    heroVideo.style.opacity = '0.15';
    heroVideo.style.filter = 'grayscale(100%)';
  }
};

/* DOT SHADER EFFECT */
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');

let w, h;
let mouse = { x: -9999, y: -9999 };

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, w, h);
  const spacing = 24;

  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const strength = Math.max(0, 1 - dist / 160);

      ctx.beginPath();
      ctx.arc(
        x + dx * strength * 0.15,
        y + dy * strength * 0.15,
        1.2 + strength * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255,255,255,${0.08 + strength * 0.25})`;
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

draw();
