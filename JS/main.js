const panels = document.querySelectorAll('.panel');
const buttons = document.querySelectorAll('.main-nav button');
const body = document.body;

/* PANEL SWITCH */
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

/* RENDER PROJECTS */
const portfolioGrid = document.getElementById('portfolioGrid');
const wipGrid = document.getElementById('wipGrid');

window.myProjects.forEach(project => {
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    <img src="${project.image}" alt="">
    <h4>${project.title}</h4>
  `;

  if (project.category === 'wip') {
    wipGrid.appendChild(div);
  } else {
    portfolioGrid.appendChild(div);
  }
});

/* HERO MOTION */
const heroVideo = document.getElementById('heroVideo');
let t = 0;
setInterval(() => {
  t += 0.03;
  heroVideo.style.transform =
    `scale(${1.04 + Math.sin(t)*0.02}) translate(${Math.sin(t)*8}px,${Math.cos(t)*8}px)`;
}, 120);