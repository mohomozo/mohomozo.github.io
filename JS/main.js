/* Interactive particles + panels with connecting lines */

const canvas=document.getElementById('mainCanvas');
const ctx=canvas.getContext('2d');
let W=canvas.width=window.innerWidth;
let H=canvas.height=window.innerHeight;

const panels=document.querySelectorAll('.panel');
const navButtons=document.querySelectorAll('.main-nav button');
const portfolioGrid=document.getElementById('portfolioGrid');
const wipGrid=document.getElementById('wipGrid');
const body=document.body;

let particles=[];
const PARTICLE_COUNT=Math.max(50,window.myProjects.length||10);
const FRICTION=0.88;

function rand(min,max){return Math.random()*(max-min)+min;}

function createParticles(){
  particles=[];
  for(let i=0;i<PARTICLE_COUNT;i++){
    const proj=window.myProjects[i%(window.myProjects.length||1)]||null;
    const hue=(i*57)%360;
    particles.push({
      x:rand(0,W),y:rand(0,H),
      vx:rand(-1,1),vy:rand(-1,1),
      radius:proj?6:4,
      color:proj?`hsl(${hue},70%,60%)`:`hsl(${hue},40%,60%)`,
      targetX:rand(100,W-100),targetY:rand(100,H-100)
    });
  }
}

function drawParticles(){
  ctx.fillStyle='rgba(5,7,12,0.3)';
  ctx.fillRect(0,0,W,H);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.fill();
  });
  // connecting lines
  ctx.globalCompositeOperation='lighter';
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length&&j<i+6;j++){
      const a=particles[i],b=particles[j];
      const dx=a.x-b.x,dy=a.y-b.y;
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

function updateParticles(){
  particles.forEach(p=>{
    const dx=p.targetX-p.x,dy=p.targetY-p.y;
    p.vx+=dx*0.001;
    p.vy+=dy*0.001;
    p.vx*=FRICTION;
    p.vy*=FRICTION;
    p.x+=p.vx;
    p.y+=p.vy;
  });
}

function loop(){updateParticles();drawParticles();requestAnimationFrame(loop);}

window.addEventListener('resize',()=>{
  W=canvas.width=window.innerWidth;
  H=canvas.height=window.innerHeight;
});

function setTargets(panelEl){
  const rect=panelEl.getBoundingClientRect();
  const cx=rect.left+rect.width/2;
  const cy=rect.top+rect.height/2;
  const padX=Math.min(200,rect.width*0.6);
  const padY=Math.min(150,rect.height*0.5);
  particles.forEach((p,i)=>{
    p.targetX=cx-padX/2+rand(0,padX);
    p.targetY=cy-padY/2+rand(0,padY);
  });
}

// draw a temporary curved line between two points
function drawCurveLine(x1,y1,x2,y2,color){
  ctx.strokeStyle=color;
  ctx.lineWidth=2;
  ctx.beginPath();
  const cpX=(x1+x2)/2+rand(-60,60);
  const cpY=(y1+y2)/2+rand(-40,40);
  ctx.moveTo(x1,y1);
  ctx.quadraticCurveTo(cpX,cpY,x2,y2);
  ctx.stroke();
}

let lastPanel=null;
function activatePanel(panelId){
  const panel=document.getElementById(panelId);
  if(!panel) return;
  if(lastPanel){
    const rect1=lastPanel.getBoundingClientRect();
    const rect2=panel.getBoundingClientRect();
    drawCurveLine(rect1.left+rect1.width/2,rect1.top+rect1.height/2,
                  rect2.left+rect2.width/2,rect2.top+rect2.height/2,
                  `hsl(${rand(0,360)},80%,60%)`);
  }
  panels.forEach(p=>p.classList.remove('active'));
  panel.classList.add('active');
  setTargets(panel);
  lastPanel=panel;
}

// nav click
navButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const rect=btn.getBoundingClientRect();
    particles.forEach(p=>{
      const dx=p.x-(rect.left+rect.width/2);
      const dy=p.y-(rect.top+rect.height/2);
      const dist=Math.max(10,Math.sqrt(dx*dx+dy*dy));
      const force=6+Math.random()*3;
      p.vx=(dx/dist)*(force*(0.8+Math.random()*0.8));
      p.vy=(dy/dist)*(force*(0.8+Math.random()*0.8));
      p.targetX=p.x+p.vx*25+rand(-60,60);
      p.targetY=p.y+p.vy*25+rand(-60,60);
    });
    setTimeout(()=>activatePanel(btn.dataset.panel),300);
  });
});

// render projects
function renderProjects(){
  portfolioGrid.innerHTML='';wipGrid.innerHTML='';
  (window.myProjects||[]).forEach((proj,i)=>{
    const div=document.createElement('div');
    div.className='item';div.dataset.index=i;
    div.innerHTML=`<img src="${proj.image}" alt="${proj.title}">
      <div style="padding:8px 6px">
        <strong style="display:block;font-size:0.95rem">${proj.title}</strong>
        <small style="opacity:.7">${proj.year||''}</small>
      </div>`;
    div.addEventListener('click',()=>{
      const p=particles[i%particles.length];
      particles.forEach((pt,j)=>{
        const angle=(j/particles.length)*Math.PI*2;
        const radius=40+(j%8)*6;
        pt.targetX=p.x+Math.cos(angle)*radius+rand(-12,12);
        pt.targetY=p.y+Math.sin(angle)*radius+rand(-8,8);
      });
      const cat=proj.category==='wip'?'work':'portfolio';
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