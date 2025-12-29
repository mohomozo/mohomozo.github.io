const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
const svg = document.getElementById("connections");
const overlay = document.getElementById("overlay");
const panels = document.querySelectorAll(".panel");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ---------- BACKGROUND LOOP ---------- */
let stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 0.5,
  a: Math.random()
}));

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.a += (Math.random() - 0.5) * 0.02;
    s.a = Math.max(0.1, Math.min(1, s.a));
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(loop);
}
loop();

/* ---------- CONNECTION LINE ---------- */
function drawLine(from, to) {
  svg.innerHTML = "";
  const f = from.getBoundingClientRect();
  const t = to.getBoundingClientRect();

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const x1 = f.left + f.width / 2;
  const y1 = f.top + f.height / 2;
  const x2 = t.left + t.width / 2;
  const y2 = t.top + t.height / 2;

  const d = `M ${x1} ${y1} Q ${(x1+x2)/2} ${y1-120} ${x2} ${y2}`;
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "rgba(255,255,255,0.6)");
  path.setAttribute("stroke-width", "2");

  svg.appendChild(path);

  setTimeout(() => svg.innerHTML = "", 700);
}

/* ---------- PIXEL EXPLOSION ---------- */
function explode(x, y) {
  overlay.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const p = document.createElement("div");
    p.style.position = "absolute";
    p.style.width = "6px";
    p.style.height = "6px";
    p.style.background = "white";
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.opacity = Math.random();
    overlay.appendChild(p);

    const dx = (Math.random() - 0.5) * 300;
    const dy = (Math.random() - 0.5) * 300;

    p.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }
    ], {
      duration: 700 + Math.random()*400,
      easing: "ease-out",
      fill: "forwards"
    });
  }
}

/* ---------- PANEL INTERACTION ---------- */
let lastPanel = null;

panels.forEach(panel => {
  panel.addEventListener("click", e => {
    const rect = panel.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    explode(x, y);

    if (lastPanel && lastPanel !== panel) {
      drawLine(lastPanel, panel);
    }

    lastPanel = panel;

    canvas.style.filter = "grayscale(1)";
    setTimeout(() => canvas.style.filter = "none", 600);
  });
});
