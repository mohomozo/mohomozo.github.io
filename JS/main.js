const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const panels = document.querySelectorAll('.panel');
const buttons = document.querySelectorAll('.main-nav button');
const body = document.body;
const portfolioGrid = document.getElementById('portfolioGrid');
const wipGrid = document.getElementById('wipGrid');

let particles = [];

// INIT PARTICLES
function initParticles() {
  particles = [];
  window.myProjects.forEach((proj, i) => {
    particles.push({
      x: Math.random()*width,
      y: Math.random()*height,
      size: 6,
      color: `hsl(${Math.random()*360},70%,60%)`,
      targetX: width/2,
      targetY: height/2,
      project: proj
    });
  });
}

// DRAW LOOP
function draw() {
  ctx.fillStyle = 'rgba(5,7,12,0.3)';
  ctx.fillRect(0,0,width,height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

// MORPH PARTICLES
function morphParticles(panel) {
  particles.forEach(p => {
    // target random position around center of panel
    const rect = panel.getBoundingClientRect();
    p.targetX = rect.left + rect.width/2 + (Math.random()-0.5)*100;
    p.targetY = rect.top + rect.height/2 + (Math.random()-0.5)*100;
  });
}

// ANIMATE PARTICLES
function animateParticles() {
  particles.forEach(p => {
    p.x += (p.targetX - p.x) * 0.05;
    p.y += (p.targetY - p.y) * 0.05;
  });
  requestAnimationFrame(animateParticles);
}

// PANEL SWITCH
function activatePanel(id) {
  panels.forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(id);
  panel.classList.add('active');

  body.className = '';
  body.classList.add(`state-${id}`);

  morphParticles(panel);
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => activatePanel(btn.dataset.panel));
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// INITIALIZE
initParticles();
draw();
animateParticles();

// RENDER PROJECTS
window.myProjects.forEach(project => {
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `<img src="${project.image}" alt=""><h4>${project.title}</h4>`;

  if(project.category === 'wip') wipGrid.appendChild(div);
  else portfolioGrid.appendChild(div);
});