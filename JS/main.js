/* main.js — Canvas particles + explosion -> morph + project rendering
   Assumes JS/data.js defines window.myProjects array
*/

console.log("Interactive main.js loaded");

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d', { alpha: false });
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

const panels = document.querySelectorAll('.panel');
const navButtons = document.querySelectorAll('.main-nav button');
const portfolioGrid = document.getElementById('portfolioGrid');
const wipGrid = document.getElementById('wipGrid');
const body = document.body;

/* PARTICLE SYSTEM */
let particles = [];
const PARTICLE_COUNT = Math.max(30, (window.myProjects ? window.myProjects.length : 8)); // fallback
const GLOBAL_FORCE = 0.06; // attraction strength
const FRICTION = 0.86;

function rand(min, max){ return Math.random()*(max-min) + min; }

function createParticles() {
  particles = [];
  const projects = window.myProjects || [];
  const n = Math.max(projects.length, PARTICLE_COUNT);
  for (let i=0;i<n;i++){
    const proj = projects[i % projects.length] || null;
    const hue = (i * 47) % 360;
    particles.push({
      id: i,
      project: proj,
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-1,1),
      vy: rand(-1,1),
      radius: proj ? 6 : 4,
      color: proj ? `hsl(${hue},70%,60%)` : `hsl(${hue},40%,60%)`,
      targetX: W/2 + rand(-80,80),
      targetY: H/2 + rand(-80,80),
      stuck: false
    });
  }
}

/* RENDER */
function clear() {
  ctx.fillStyle = '#05070c';
  ctx.fillRect(0,0,W,H);
}

function drawParticles() {
  // gentle subtle trails: draw with composite
  ctx.globalCompositeOperation = 'source-over';
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
    ctx.fill();
  });

  // connect some nearby particles for network feel
  ctx.globalCompositeOperation = 'lighter';
  for (let i=0;i<particles.length;i++){
    for (let j=i+1;j<particles.length && j < i+6; j++){ // limit checks for perf
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120){
        ctx.strokeStyle = `rgba(255,216,77,${1 - d/120})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalCompositeOperation = 'source-over';
}

/* UPDATE physics */
function updateParticles() {
  particles.forEach(p=>{
    // attract to target
    const dx = p.targetX - p.x;
    const dy = p.targetY - p.y;
    p.vx += dx * GLOBAL_FORCE * 0.001;
    p.vy += dy * GLOBAL_FORCE * 0.001;

    p.vx *= FRICTION;
    p.vy *= FRICTION;

    p.x += p.vx;
    p.y += p.vy;
  });
}

/* main loop */
function loop() {
  clear();
  updateParticles();
  drawParticles();
  requestAnimationFrame(loop);
}

/* handle resize */
window.addEventListener('resize', () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  // recompute some targets to keep clusters centered
  setTargetsForActivePanel();
});

/* utility: compute center of a panel element (in canvas coordinates) */
function getPanelCenter(panelEl) {
  const r = panelEl.getBoundingClientRect();
  const cx = r.left + r.width/2;
  const cy = r.top + r.height/2;
  return {x: cx, y: cy};
}

/* morph particles into cluster around a panel */
function setTargetsForPanel(panelEl) {
  const center = getPanelCenter(panelEl);
  const padX = Math.min(180, panelEl.offsetWidth * 0.4);
  const padY = Math.min(140, panelEl.offsetHeight * 0.45);

  particles.forEach((p,i)=>{
    // distribute targets around center in a loose grid
    const cols = Math.max(3, Math.round(Math.sqrt(particles.length)));
    const row = Math.floor(i/cols);
    const col = i % cols;
    const gapX = padX / Math.max(1, cols-1);
    const gapY = padY / Math.max(1, Math.ceil(particles.length/cols));
    const tx = center.x - padX/2 + col * gapX + rand(-12,12);
    const ty = center.y - padY/2 + row * gapY + rand(-8,8);
    p.targetX = tx;
    p.targetY = ty;
  });
}

/* set targets based on current active panel */
function setTargetsForActivePanel() {
  const active = document.querySelector('.panel.active');
  if (active) setTargetsForPanel(active);
}

/* explosion animation at (x,y) then morph to panel after short delay */
function explodeThenMorph(x,y, panelId) {
  // explosion: set velocities away from (x,y)
  particles.forEach(p=>{
    const dx = p.x - x;
    const dy = p.y - y;
    const dist = Math.max(10, Math.sqrt(dx*dx + dy*dy));
    const force = 6 + Math.random()*3;
    p.vx = (dx/dist) * (force * (0.8 + Math.random()*0.8));
    p.vy = (dy/dist) * (force * (0.8 + Math.random()*0.8));
    // temporarily set target far away so they fly
    p.targetX = p.x + p.vx * 30 + rand(-60,60);
    p.targetY = p.y + p.vy * 30 + rand(-60,60);
  });

  // after short delay, morph toward panel cluster
  setTimeout(()=>{
    const panel = document.getElementById(panelId);
    if (panel) setTargetsForPanel(panel);
  }, 380);
}

/* NAV logic */
navButtons.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const panelId = btn.dataset.panel;
    // explosion originates from button center
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;

    // visual state class on body
    body.className = '';
    body.classList.add(`state-${panelId}`);

    // start explosion then morph into chosen panel
    explodeThenMorph(cx, cy, panelId);

    // set panel active in DOM after slight delay for perception
    panels.forEach(p => p.classList.remove('active'));
    setTimeout(()=>{
      const panelEl = document.getElementById(panelId);
      if (panelEl) panelEl.classList.add('active');
      // ensure particles target the panel
      setTargetsForPanel(panelEl);
      // scroll a bit so user sees panel (optional)
      window.scrollTo({ top: window.innerHeight * 0.05, behavior: 'smooth' });
    }, 380);
  });
});

/* RENDER project tiles into grids; clicking a tile triggers particle focus */
function renderProjects() {
  portfolioGrid.innerHTML = '';
  wipGrid.innerHTML = '';
  const projects = window.myProjects || [];

  projects.forEach((proj, idx) => {
    const el = document.createElement('div');
    el.className = 'item';
    el.dataset.index = idx;
    el.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}">
      <div style="padding:8px 6px"><strong style="display:block;font-size:0.95rem">${proj.title}</strong>
      <small style="opacity:.7">${proj.year ? proj.year : ''}</small></div>
    `;

    // click -> focus particles on this project's representative particle
    el.addEventListener('click', (ev)=>{
      const i = Number(el.dataset.index);
      focusOnProject(i);
      // also switch to portfolio or work if needed
      const category = proj.category === 'wip' ? 'work' : 'portfolio';
      // simulate nav click explosion from click pos
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      explodeThenMorph(cx, cy, category);
      // set body state & panels
      body.className = '';
      body.classList.add(`state-${category}`);
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(category).classList.add('active');
    });

    if (proj.category === 'wip' || proj.type && proj.type.startsWith('featured')) {
      wipGrid.appendChild(el);
    } else {
      portfolioGrid.appendChild(el);
    }
  });
}

/* focus particles toward the particle representing project index */
function focusOnProject(index) {
  // pick a particle correlated to project index if exists
  const projects = window.myProjects || [];
  if (!projects.length) return;
  const idx = index % particles.length;
  const target = particles[idx];
  // set all particles to orbit around that target point
  particles.forEach((p,i)=>{
    const angle = (i/particles.length) * Math.PI*2;
    const radius = 40 + (i % 8) * 6;
    p.targetX = target.x + Math.cos(angle) * radius + rand(-12,12);
    p.targetY = target.y + Math.sin(angle) * radius + rand(-8,8);
  });
}

/* initial setup */
createParticles();
renderProjects();
setTargetsForActivePanel();
loop();