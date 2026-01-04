window.currentFilter = 'all';

function showPanel(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  const panel = document.getElementById(id);
  if(panel) panel.classList.add('active');

  if(id === 'portfolio') renderPortfolio();
  if(id === 'work') renderWip();
}

function renderPortfolio(){
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = '';

  window.myProjects
    .filter(p => p.category !== 'wip')
    .filter(p => window.currentFilter === 'all' || p.category === window.currentFilter)
    .forEach(p=>{
      const el = document.createElement('div');
      el.className = 'project-card';
      el.innerHTML = `
        <img src="${p.image}">
        <div class="card-overlay">
          <span>${p.title}</span>
          <p>${p.concept || ''}</p>
        </div>`;
      el.onclick = ()=>openLightbox(p);
      grid.appendChild(el);
    });
}

function renderWip(){
  const grid = document.getElementById('wip-grid');
  grid.innerHTML = '';

  window.myProjects
    .filter(p=>p.category==='wip')
    .forEach(p=>{
      const el = document.createElement('div');
      el.className = 'project-card';
      el.innerHTML = `
        <img src="${p.image}">
        <div class="card-overlay">
          <span>${p.title}</span>
        </div>`;
      el.onclick = ()=>openLightbox(p);
      grid.appendChild(el);
    });
}

function filterPortfolio(cat){
  window.currentFilter = cat;
  document.querySelectorAll('.portfolio-menu button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  renderPortfolio();
}

function openLightbox(p){
  const lb = document.getElementById('lightbox');
  const c = document.getElementById('lightbox-media-container');
  c.innerHTML = '';

  if(p.videoUrl){
    c.innerHTML += `
      <iframe src="${p.videoUrl}" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`;
  }

  c.innerHTML += `
    <h3>${p.title}</h3>
    <p>${p.concept || ''}</p>`;

  lb.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  document.getElementById('lightbox').style.display='none';
  document.body.style.overflow='auto';
}

document.addEventListener('DOMContentLoaded',()=>{
  showPanel('home');
});
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
  const radius = 1.2;

  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {

      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let strength = Math.max(0, 1 - dist / 160);

      ctx.beginPath();
      ctx.arc(
        x + dx * strength * 0.15,
        y + dy * strength * 0.15,
        radius + strength * 1.5,
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

