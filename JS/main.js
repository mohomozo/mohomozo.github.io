/* PANEL SWITCH */
function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.remove('active');
  });

  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  handleHeroState(id);
}

/* HERO FADE BASED ON PANEL */
function handleHeroState(id) {
  const hero = document.querySelector('.video-container video');
  if (!hero) return;

  if (id === 'home' || id === 'about') {
    hero.style.opacity = '1';
    hero.style.filter = 'none';
  } else {
    hero.style.opacity = '0.12';
    hero.style.filter = 'blur(2px) grayscale(100%)';
  }
}

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

/* LIGHTBOX OPEN/CLOSE */
function openProject(contentHTML) {
  const box = document.getElementById('lightbox');
  const container = document.getElementById('lightbox-media-container');

  container.innerHTML = contentHTML;
  box.style.display = 'block';
}

function closeLightbox() {
  const box = document.getElementById('lightbox');
  box.style.display = 'none';
  document.getElementById('lightbox-media-container').innerHTML = '';
}
