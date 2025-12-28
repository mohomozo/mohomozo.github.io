/* Interactive canvas particles + panel clusters */

// Canvas setup
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d', { alpha: false });
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

// Panels & navigation
const panels = document.querySelectorAll('.panel');
const navButtons = document.querySelectorAll('.main-nav button');
const body = document.body;

// Project grids
const portfolioGrid = document.getElementById('portfolioGrid');
const wipGrid = document.getElementById('wipGrid');

// Particles array
let particles = [];
const PARTICLE_COUNT = Math.max(40, window.myProjects.length || 10);
const GLOBAL_FORCE = 0.06;
const FRICTION = 0.88;

// Utility
function rand(min,max){ return Math.random()*(max-min)+min; }

// Create particles (always generate)
function createParticles() {
  particles = [];
  for (let i=0;i<PARTICLE_COUNT;i++){
    const proj = window.myProjects[i % (window.myProjects.length || 1)] || null;
    const hue = (i*57) % 360;
    particles.push({
      id: i,
      project: proj,
      x: rand(0,W),
      y: rand(0,H),
      vx: rand(-1,1),
      vy: rand(-1,1),
      radius: proj ? 6 : 4,
      color: proj ? `hsl(${hue},70%,60%)` : `hsl(${hue},40%,60%)`,
      targetX: rand(100,W-100),
      targetY: rand(100,H-100)
    });
  }
}

// Draw particles
function drawParticles() {
  ctx.fillStyle = 'rgba(5,7,12,0.3)';
  ctx.fillRect(0,0,W,H);

  // draw particles
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  // connect some nearby for network feeling
  ctx.globalCompositeOperation='lighter';
  for (let i=0;i<particles.length;i++){
    for (let j=i+1;j<particles.length && j<i+6;j++){
      const a=particles[i], b=particles[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.strokeStyle=`rgba(255,216,77,${1-d/120})`;
        ctx.lineWidth=0.6;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalCompositeOperation='source-over';
}

// Update physics
function updateParticles() {
  particles.forEach(p=>{
    const dx=p.targetX-p.x;
    const dy=p.targetY-p.y;
    p.vx+=(dx*GLOBAL_FORCE*0.001);
    p.vy+=(dy*GLOBAL_FORCE*0.001);
    p.vx*=FRICTION;
    p.vy*=FRICTION;
    p.x+=p.vx;
    p.y+=p.vy;
  });
}

// Main loop
function loop(){
  updateParticles();
  drawParticles();
  requestAnimationFrame(loop);
}

// Resize
window.addEventListener('resize', ()=>{
  W=canvas.width=window.innerWidth;
  H=canvas.height=window.innerHeight;
});

// Panel target positions (random cluster on screen)
function setTargetsForPanel(panelEl){
  const rect=panelEl.getBoundingClientRect();
  const cx=rect.left + rect.width/2;
  const cy=rect.top + rect.height/2;
  const padX=Math.min(200, rect.width*0.6);
  const padY=Math.min(150, rect.height*0.5);

  particles.forEach((p,i)=>{
    p.targetX = cx - padX/2 + rand(0,padX);
    p.targetY = cy - padY/2 + rand(0,padY);
  });
}

// Panel switching
function activatePanel(panelId){
  panels.forEach(p=>p.classList.remove('active'));
  const panel=document.getElementById(panelId);
  if(panel) panel.classList.add('active');
  body.className='';
  body.classList.add(`state-${panelId}`);
  setTargetsForPanel(panel);
}

// Explosion animation (particles scatter)
function explodeThenMorph(x,y,panelId){
  particles.forEach(p=>{
    const dx=p.x-x;
    const dy=p.y-y;
    const dist=Math.max(10, Math.sqrt(dx*dx+dy*dy));
    const force=6+Math.random()*3;
    p.vx=(dx/dist)*(force*(0.8+Math.random()*0.8));
    p.vy=(dy/dist)*(force*(0.8+Math.random()*0.8));
    p.targetX = p.x + p.vx*25 + rand(-60,60);
    p.targetY = p.y + p.vy*25 + rand(-60,60);
  });
  setTimeout(()=>activatePanel(panelId), 350);
}

// Nav clicks
navButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const panelId = btn.dataset.panel;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left+rect.width/2;
    const cy = rect.top+rect.height/2;
    explodeThenMorph(cx, cy, panelId);
  });
});

// Render project grids
function renderProjects(){
  portfolioGrid.innerHTML='';
  wipGrid.innerHTML='';
  (window.myProjects||[]).forEach((proj,i)=>{
    const div=document.createElement('div');
    div.className='item';
    div.dataset.index=i;
    div.innerHTML=`<img src="${proj.image}" alt="${proj.title}">
      <div style="padding:8px 6px">
        <strong style="display:block;font-size:0.95rem">${proj.title}</strong>
        <small style="opacity:.7">${proj.year||''}</small>
      </div>`;
    // click -> focus particles
    div.addEventListener('click', ()=>{
      const p = particles[i % particles.length];
      particles.forEach((pt,j)=>{
        const angle=(j/particles.length)*Math.PI*2;
        const radius=40+(j%8)*6;
        pt.targetX=p.x+Math.cos(angle)*radius+rand(-12,12);
        pt.targetY=p.y+Math.sin(angle)*radius+rand(-8,8);
      });
      const cat = proj.category==='wip'?'work':'portfolio';
      activatePanel(cat);
    });
    if(proj.category==='wip') wipGrid.appendChild(div);
    else portfolioGrid.appendChild(div);
  });
}

// INITIALIZE
createParticles();
renderProjects();
loop();