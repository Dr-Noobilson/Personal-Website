/* ============================================================
   NAVBAR — scroll detection + mobile toggle
   ============================================================ */
(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
})();

/* ============================================================
   TYPEWRITER — hero subtitle
   ============================================================ */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'PhD Research Scholar @ HRI, Prayagraj',
    'Quantum Information Theorist',
    'Quantum Foundations Enthusiast',
    'ML & Deep Learning Researcher',
    'Conformal Field Theory Explorer',
    'Physics · Code · Curiosity',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 65);
  }

  setTimeout(tick, 1200);
})();

/* ============================================================
   THREE.JS QUANTUM PARTICLE HERO
   ============================================================ */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  /* Load Three.js dynamically from CDN */
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.min.js';
  script.onload = initThree;
  document.head.appendChild(script);

  function initThree() {
    const THREE = window.THREE;
    const W = canvas.clientWidth, H = canvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000);
    camera.position.z = 600;

    /* ---- Particles ---- */
    const N = 1800;
    const positions = new Float32Array(N * 3);
    const colors    = new Float32Array(N * 3);

    const colBlue   = new THREE.Color('#3b82f6');
    const colMaroon = new THREE.Color('#9b1c1c');
    const colGold   = new THREE.Color('#d97706');

    for (let i = 0; i < N; i++) {
      positions[i*3]     = (Math.random() - 0.5) * 1400;
      positions[i*3 + 1] = (Math.random() - 0.5) * 900;
      positions[i*3 + 2] = (Math.random() - 0.5) * 600;

      const pick = Math.random();
      const c    = pick < 0.6 ? colBlue : pick < 0.85 ? colMaroon : colGold;
      colors[i*3]     = c.r;
      colors[i*3 + 1] = c.g;
      colors[i*3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ---- Connection lines (quantum entanglement effect) ---- */
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.08,
    });

    /* Build a sparse set of connections */
    const lineGeos = [];
    const THRESHOLD = 140;
    const MAX_LINES = 250;
    let lineCount = 0;

    for (let i = 0; i < N && lineCount < MAX_LINES; i++) {
      for (let j = i + 1; j < N && lineCount < MAX_LINES; j++) {
        const dx = positions[i*3]   - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (d < THRESHOLD) {
          const lg = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2]),
            new THREE.Vector3(positions[j*3], positions[j*3+1], positions[j*3+2]),
          ]);
          scene.add(new THREE.Line(lg, lineMat));
          lineCount++;
        }
      }
    }

    /* ---- Mouse parallax ---- */
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    }, { passive: true });

    /* ---- Resize ---- */
    window.addEventListener('resize', () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    /* ---- Animate ---- */
    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.0008;

      points.rotation.y = t * 0.12 + mouseX * 0.08;
      points.rotation.x = mouseY * 0.05;
      points.rotation.z = t * 0.04;

      camera.position.x += (mouseX * 60 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 40 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  const els = document.querySelectorAll('.reveal, .timeline-item');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start    = performance.now();

      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * end);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ============================================================
   FILTER BUTTONS (research / projects pages)
   ============================================================ */
(function () {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;

  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('[data-category]').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
      }
    });
  });
})();

/* ============================================================
   GITHUB REPO STATS (live fetch)
   ============================================================ */
(function () {
  const cards = document.querySelectorAll('[data-repo]');
  if (!cards.length) return;

  cards.forEach(async card => {
    const repo = card.dataset.repo;
    try {
      const res  = await fetch(`https://api.github.com/repos/Dr-Noobilson/${repo}`);
      if (!res.ok) return;
      const data = await res.json();
      const starsEl = card.querySelector('.js-stars');
      if (starsEl) starsEl.textContent = data.stargazers_count ?? '0';
      const forksEl = card.querySelector('.js-forks');
      if (forksEl) forksEl.textContent = data.forks_count ?? '0';
    } catch (_) {}
  });
})();

/* ============================================================
   KaTeX AUTO-RENDER (blog posts)
   ============================================================ */
(function () {
  if (typeof renderMathInElement === 'undefined') return;
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true  },
      { left: '$',  right: '$',  display: false },
    ],
    throwOnError: false,
  });
})();

/* ============================================================
   CONTACT FORM — mailto fallback
   ============================================================ */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('#f-name').value;
    const email   = form.querySelector('#f-email').value;
    const message = form.querySelector('#f-message').value;
    const subject = encodeURIComponent(`Message from ${name} via deependra.dev`);
    const body    = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:jitendradeeependra1003@gmail.com?subject=${subject}&body=${body}`;
  });
})();
