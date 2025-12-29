const canvas = document.getElementById('fx');
const ctx = canvas.getContext('2d');
const video = document.getElementById('bgVideo');

canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

function burst(x, y) {
  for (let i = 0; i < 120; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random()})`;
    ctx.fillRect(
      x + Math.random() * 120 - 60,
      y + Math.random() * 120 - 60,
      2, 2
    );
  }
}

document.querySelectorAll('.panels button').forEach(btn => {
  btn.onclick = e => {
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    burst(x, y);

    video.style.filter = 'grayscale(1) brightness(0.6)';
    setTimeout(() => video.style.filter = '', 600);
  };
});
