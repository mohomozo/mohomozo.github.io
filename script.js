/* script.js — final interactive logic
   - background organic stars + subtle noise
   - hand-drawn organic SVG connections
   - particle pixel explosion & morph
   - overlay panel expansion from click point
   - uses window.myProjects if present for portfolio grid
*/

(() => {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  const svg = document.getElementById('svgLayer');
  const video = document.getElementById('loopVid');
  const nodes = Array.from(document.querySelectorAll('.node'));
  const overlay = document.getElementById('panelOverlay');
  const contentEl = document.getElementById('panelContent');
  const closeBtn = document.getElementById('closeOverlay');

  // sizing
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---------------- background loop (stars + soft blobs) -------------- */
  const stars = [];
  for (let i = 0; i < 140; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random() * 0.9 + 0.1,
      pulse: Math.random() * 0.02 + 0.005
    });
  }

  const blobs = [];
  for (let i = 0; i < 6; i++) {
    blobs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 200 + 120,
      hue: Math.random() * 360,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2
    });
  }

  function bgLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // soft color blobs (maximal, human touch)
    blobs.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      // wrap
      if (b.x < -b.r) b.x = canvas.width + b.r;
      if (b.x > canvas.width + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = canvas.height + b.r;
      if (b.y > canvas.height + b.r) b.y = -b.r;

      const g = ctx.createRadialGradient(b.x, b.y, b.r * 0.1, b.x, b.y, b.r);
      g.addColorStop(0, `hsla(${b.hue}, 80%, 65%, 0.08)`);
      g.addColorStop(0.6, `hsla(${(b.hue + 30) % 360}, 60%, 45%, 0.035)`);
      g.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // stars
    stars.forEach(s => {
      s.a += (Math.random() - 0.5) * s.pulse;
      if (s.a < 0.05) s.a = 0.05;
      if (s.a > 1) s.a = 1;
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(bgLoop);
  }
  bgLoop();

  /* --------------- organic SVG connection (hand-drawn) --------------- */

  // helper to compute control point with "hand" jitter
  function controlPoint(x1, y1, x2, y2) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const offX = (Math.random() - 0.5) * 160; // wide jitter for hand-drawn feel
    const offY = (Math.random() - 0.5) * 120;
    return { x: mx + offX, y: my + offY };
  }

  function drawOrganicCurve(fromEl, toEl, color = 'rgba(255,216,77,0.95)') {
    // clear small previous (we keep svg but create ephemeral path)
    const f = fromEl.getBoundingClientRect();
    const t = toEl.getBoundingClientRect();
    const x1 = f.left + f.width / 2;
    const y1 = f.top + f.height / 2;
    const x2 = t.left + t.width / 2;
    const y2 = t.top + t.height / 2;

    const cp = controlPoint(x1, y1, x2, y2);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${x1} ${y1} Q ${cp.x} ${cp.y} ${x2} ${y2}`;
    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.style.opacity = '0';
    svg.appendChild(path);

    // animate draw using stroke-dasharray trick
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect(); // force layout

    // transition to draw
    path.style.transition = 'stroke-dashoffset 520ms cubic-bezier(.2,.9,.2,1), opacity 520ms ease';
    path.style.opacity = '1';
    path.style.strokeDashoffset = '0';

    // fade out slowly
    setTimeout(() => {
      path.style.transition = 'opacity 800ms ease';
      path.style.opacity = '0';
    }, 700);

    // remove after fade
    setTimeout(() => {
      try { svg.removeChild(path); } catch (e) { /* ignore */ }
    }, 1600);
  }

  /* ---------------- particle pixel explosion ----------------- */
  function pixelExplosion(x, y, color = '255,255,255') {
    const count = 90;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'px';
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      const size = Math.round(Math.random() * 8) + 2;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `rgba(${color},${(Math.random()*0.8+0.2).toFixed(2)})`;
      el.style.borderRadius = Math.random() > 0.7 ? '3px' : '0';
      el.style.zIndex = 60;
      el.style.pointerEvents = 'none';
      el.style.transform = `translate(-50%,-50%)`;
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 360 + 120;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      el.animate([
        { transform: `translate(-50%,-50%) translate(0px,0px) scale(1)`, opacity: 1 },
        { transform: `translate(-50%,-50%) translate(${dx}px,${dy}px) scale(0.6)`, opacity: 0 }
      ], {
        duration: 700 + Math.random() * 600,
        easing: 'cubic-bezier(.14,.8,.22,1)',
        fill: 'forwards'
      });

      // cleanup
      setTimeout(() => { try { el.remove(); } catch (e) {} }, 1600);
    }
  }

  /* -------------- overlay panel content logic (expanding from click) -------------- */
  function openOverlayFrom(x, y, id) {
    // darken video and blur background slightly - human touch
    if (video && video.tagName && !video.paused) {
      video.style.transition = 'filter .36s ease, opacity .36s ease';
      video.style.filter = 'grayscale(1) brightness(.6) blur(1px)';
      video.style.opacity = '0.25';
    }

    // create small reveal circle effect using radial-gradient on overlay
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
    overlay.style.pointerEvents = 'auto';

    // position animation: scale from small point near click to center
    const panel = contentEl;
    panel.style.transform = `translate(${x - window.innerWidth/2}px, ${y - window.innerHeight/2}px) scale(.02)`;
    panel.style.opacity = '0';
    panel.style.transition = 'transform 520ms cubic-bezier(.2,.9,.2,1), opacity 380ms ease';
    // fill content base on id
    fillPanelContent(id);

    // next frame expand
    requestAnimationFrame(() => {
      panel.style.transform = 'translate(0,0) scale(1)';
      panel.style.opacity = '1';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function closeOverlay() {
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
    contentEl.style.transform = '';
    contentEl.style.opacity = '';
    overlay.style.pointerEvents = 'none';
    if (video && video.tagName) {
      video.style.filter = '';
      video.style.opacity = '';
    }
  }

  closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  /* ------------- connect + explosion on node click --------------- */
  let lastNode = null;
  nodes.forEach(node => {
    node.addEventListener('click', (ev) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // pixel explosion
      pixelExplosion(cx, cy, '255,255,255');

      // draw organic connection from lastNode to this
      if (lastNode && lastNode !== node) {
        drawOrganicCurve(lastNode, node, `hsla(${Math.floor(Math.random()*360)},85%,60%,0.95)`);
      }

      // morph background (subtle)
      // shift blobs gently towards node
      blobs.forEach(b=>{
        b.vx += (cx - b.x) * 0.000015;
        b.vy += (cy - b.y) * 0.000015;
      });

      // expand overlay from click
      const targetPanelId = node.dataset.target;
      setTimeout(()=> openOverlayFrom(cx, cy, targetPanelId), 220);

      lastNode = node;
    });
  });

  /* --------------- fill content for each panel --------------- */
  function fillPanelContent(id) {
    contentEl.innerHTML = ''; // clear
    if (id === 'home') {
      contentEl.innerHTML = `
        <h2>HOME</h2>
        <p>Welcome. This surface is alive — it breathes, remembers, and tangles. Touch nodes to travel.</p>
        <p style="opacity:.8;margin-top:12px;font-family:var(--hand)">Maximal layers, human traces, and animated memory.</p>
      `;
    } else if (id === 'about') {
      contentEl.innerHTML = `
        <h2>ABOUT</h2>
        <p>I am Mohammad — an experimental multimedia artist exploring deformation, image and motion as living processes.</p>
        <p style="opacity:.85;margin-top:10px">This site is an artifact: not a résumé but a surface to explore.</p>
      `;
    } else if (id === 'portfolio') {
      // try to use window.myProjects if present
      const projects = window.myProjects && window.myProjects.length ? window.myProjects : null;
      if (projects) {
        let html = `<h2>PORTFOLIO</h2><div class="grid">`;
        projects.slice(0,12).forEach(p=>{
          const img = p.image ? p.image : 'https://via.placeholder.com/400x300?text=Artwork';
          html += `<div class="tile"><img src="${img}" alt="${p.title||''}"><div style="padding:8px"><strong>${p.title||''}</strong><div style="opacity:.7;font-size:.85rem">${p.year||''}</div></div></div>`;
        });
        html += `</div>`;
        contentEl.innerHTML = html;
      } else {
        // fallback demo gallery
        contentEl.innerHTML = `
          <h2>PORTFOLIO</h2>
          <p>No project data found locally. Example previews:</p>
          <div class="grid">
            <div class="tile"><img src="https://via.placeholder.com/640x400?text=Work+1"></div>
            <div class="tile"><img src="https://via.placeholder.com/640x400?text=Work+2"></div>
            <div class="tile"><img src="https://via.placeholder.com/640x400?text=Work+3"></div>
          </div>
        `;
      }
    } else if (id === 'wip') {
      contentEl.innerHTML = `
        <h2>W.I.P</h2>
        <p>Current experiments: morphing bodies, noisy transforms, ritual motion.</p>
        <p style="opacity:.8;margin-top:8px">These pieces are intentionally raw — expect artifacts.</p>
      `;
    } else {
      contentEl.innerHTML = `<h2>${id}</h2>`;
    }
  }

  /* --------------- small guard: if no video file, reduce opacity gracefully --------------- */
  video.addEventListener && video.addEventListener('error', () => {
    video.style.display = 'none';
  });
  // if video not present (no source loaded), hide it
  setTimeout(()=> {
    if (!video || !video.currentSrc) {
      if (video) video.style.display = 'none';
    }
  }, 400);

  // initial subtle draw between nodes to show network (very light)
  function initialSketch() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        // make sketch only for a few pairs to avoid clutter
        if (Math.random() > 0.6) drawOrganicCurve(a,b, `rgba(255,216,77,0.12)`);
      }
    }
  }
  initialSketch();

  // friendly hint: if window.myProjects exists, you can call fillPanelContent('portfolio') to pre-render

})();
