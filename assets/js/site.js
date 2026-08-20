/* =========================================================================
   WAVE GODS STUDIO — site.js   ·   vanilla, sin dependencias
   ========================================================================= */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const html = document.documentElement;
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ------------------------------------------------------------- loader */
  const loader = $('#loader');
  let done = false;
  function ready() {
    if (done) return;
    done = true;
    html.classList.add('ready');
    if (loader) { loader.classList.add('done'); setTimeout(() => loader.remove(), 700); }
  }
  if (REDUCED) ready();
  else {
    setTimeout(ready, 450);                       // apenas se nota
    addEventListener('load', () => setTimeout(ready, 150), { once: true });
    setTimeout(ready, 4000);                      // red de seguridad
  }

  /* ------------------------------------- titular: reveal palabra a palabra */
  let wi = 0;
  $$('[data-split]').forEach((line) => {
    line.innerHTML = line.textContent.trim().split(/\s+/)
      .map((w) => `<span class="w" style="--wi:${wi++}"><i>${w}</i></span>`).join(' ');
  });

  /* ------------------------------------------------------------- reveals */
  const rev = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !REDUCED) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    rev.forEach((el) => io.observe(el));
  } else rev.forEach((el) => el.classList.add('in'));

  /* ----------------------------------------------- nav, progreso, wa float */
  const nav = $('#nav'), bar = $('.progress i'), waF = $('.wa-float');
  let tick = false;
  const onScroll = () => {
    const y = scrollY;
    const max = document.body.scrollHeight - innerHeight;
    nav && nav.classList.toggle('solid', y > 30);
    bar && (bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`);
    waF && waF.classList.toggle('show', y > 600);
    tick = false;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  const links = $$('[data-nav]');
  if (links.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((l) => l.classList.toggle('on', l.dataset.nav === e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((l) => { const s = document.getElementById(l.dataset.nav); if (s) so.observe(s); });
  }

  /* ---------------------------------------------------------- menú móvil */
  const burger = $('.burger'), menu = $('#menu');
  let menuOpen = false;
  function setMenu(v) {
    menuOpen = v;
    if (!menu || !burger) return;
    if (v) menu.hidden = false;
    requestAnimationFrame(() => menu.classList.toggle('open', v));
    burger.setAttribute('aria-expanded', String(v));
    document.body.classList.toggle('lock', v);
    if (!v) setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 650);
  }
  burger && burger.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  /* ------------------------------------------- scroll suave y controlado */
  const navH = () => (nav ? nav.offsetHeight : 0) + 10;
  let anim = null;
  function smoothTo(top) {
    if (REDUCED) { window.scrollTo(0, top); return; }
    const from = scrollY;
    const dist = top - from;
    if (Math.abs(dist) < 4) return;
    const dur = Math.min(1100, Math.max(420, Math.abs(dist) * 0.55));
    const t0 = performance.now();
    cancelAnimationFrame(anim);
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;   // easeInOutCubic
      window.scrollTo(0, from + dist * e);
      if (p < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }
  const stop = () => cancelAnimationFrame(anim);
  addEventListener('wheel', stop, { passive: true });
  addEventListener('touchstart', stop, { passive: true });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"], a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || url.origin !== location.origin) return;
    const id = url.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (menuOpen) setMenu(false);
    const y = el.getBoundingClientRect().top + scrollY - (id === 'top' ? 0 : navH());
    smoothTo(Math.max(0, y));
    history.replaceState(null, '', id === 'top' ? location.pathname : '#' + id);
  });

  /* ------------------------------------------ vista previa de servicios */
  const prev = $('.svc-preview'), prevImg = prev && $('img', prev);
  if (prev && prevImg && FINE && !REDUCED) {
    let px = 0, py = 0, cx = 0, cy = 0, run = false;
    const loop = () => {
      cx += (px - cx) * 0.16; cy += (py - cy) * 0.16;
      prev.style.translate = `${cx}px ${cy}px`;
      if (run) requestAnimationFrame(loop);
    };
    $$('.svc').forEach((row) => {
      row.addEventListener('pointerenter', (e) => {
        const src = row.dataset.img;
        if (prevImg.getAttribute('src') !== src) prevImg.src = src;
        px = cx = e.clientX; py = cy = e.clientY;
        prev.classList.add('on');
        if (!run) { run = true; requestAnimationFrame(loop); }
      });
      row.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; });
      row.addEventListener('pointerleave', () => {
        prev.classList.remove('on');
        setTimeout(() => { if (!prev.classList.contains('on')) run = false; }, 400);
      });
    });
  }

  /* ------------------------------------------- onda de audio del hero */
  /* Tres lineas finas superpuestas que fluyen y respiran con un pulso lento.
     Sin barras: la marca del logo ya es una onda de barras.                 */
  const cv = document.querySelector('.hero-wave');
  if (cv) {
    const ctx = cv.getContext('2d', { alpha: true });
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const BPM = 84;
    const LAYERS = [
      { amp: 1.00, freq: 4.6,  speed: 0.55, phase: 0.0, off: 0.00, alpha: 0.58, lw: 1.5, blur: 8 },
      { amp: 0.66, freq: 7.2,  speed: -0.38, phase: 2.1, off: -0.07, alpha: 0.24, lw: 1.1, blur: 4 },
      { amp: 0.40, freq: 10.4, speed: 0.27, phase: 4.3, off: 0.06, alpha: 0.13, lw: 0.9, blur: 0 }
    ];
    let w = 0, h = 0, t = 0, last = 0, pulse = 0, visible = true;

    const size = () => {
      const r = cv.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const curve = (L, base) => {
      const mid = h * (0.5 + L.off);
      const amp = base * L.amp;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const p = x / w;
        const env = Math.pow(Math.sin(p * Math.PI), 0.55);
        const y = mid + (
          Math.sin(p * L.freq + t * L.speed + L.phase) * 0.58 +
          Math.sin(p * L.freq * 2.3 - t * L.speed * 0.7 + L.phase) * 0.26 +
          Math.sin(p * L.freq * 0.42 + t * L.speed * 0.4) * 0.34
        ) * amp * env;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255,56,48,${L.alpha})`;
      ctx.lineWidth = L.lw;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = L.blur ? 'rgba(255,49,49,.4)' : 'transparent';
      ctx.shadowBlur = L.blur;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const base = h * 0.46 * (0.80 + 0.36 * pulse);   // respira con el pulso
      for (let i = LAYERS.length - 1; i >= 0; i--) curve(LAYERS[i], base);
    };

    const frame = (now) => {
      requestAnimationFrame(frame);
      if (!visible) { last = now; return; }
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      t += dt;
      // pulso suave: sube rapido en cada tiempo y baja despacio, sin saltos
      const kick = Math.pow(1 - ((t * BPM / 60) % 1), 3);
      const k = 1 - Math.pow(1 - (kick > pulse ? 0.14 : 0.03), dt * 60);
      pulse += (kick - pulse) * k;
      draw();
    };

    size();
    draw();
    addEventListener('resize', () => { size(); draw(); }, { passive: true });
    if (!REDUCED) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(cv);
      }
      document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
      requestAnimationFrame(frame);
    }
  }

  /* --------------------------------------- tarjetas de Instagram en 3D */
  if (FINE && !REDUCED) {
    $$('.reel').forEach((card) => {
      const inner = $('.reel-in', card);
      if (!inner) return;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.setProperty('--ry', (x * 15).toFixed(2) + 'deg');
        inner.style.setProperty('--rx', (-y * 17).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => {
        inner.style.setProperty('--ry', '0deg');
        inner.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ------------------- Spotify: el reproductor se monta al llegar a la altura */
  const spBox = $('.sp-frame');
  if (spBox && spBox.dataset.sp) {
    const mount = () => {
      if (spBox.querySelector('iframe')) return;
      const f = document.createElement('iframe');
      f.src = spBox.dataset.sp;
      f.title = spBox.dataset.spTitle || 'Spotify';
      f.loading = 'lazy';
      f.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
      f.setAttribute('allowfullscreen', '');
      spBox.appendChild(f);
      spBox.classList.add('on');
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { mount(); io.disconnect(); } }, { rootMargin: '400px' });
      io.observe(spBox);
    } else mount();
  }

  /* --------------- YouTube: el vídeo se carga solo cuando se pulsa play */
  const ytBox = $('.yt-player');
  if (ytBox) {
    const now = $('.yt-now');
    const play = (id, title) => {
      ytBox.innerHTML = '';
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      f.title = title || 'YouTube';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.setAttribute('allowfullscreen', '');
      ytBox.appendChild(f);
      if (now && title) {
        const b = $('b', now);
        if (b) b.textContent = title;
      }
    };
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-yt-id]');
      if (!btn || btn.tagName !== 'BUTTON') return;
      e.preventDefault();
      play(btn.dataset.ytId, btn.dataset.ytTitle);
      if (!ytBox.contains(btn)) ytBox.scrollIntoView({ block: 'nearest', behavior: REDUCED ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------- reseñas del hero: se van alternando */
  const qBox = $('[data-quotes]');
  if (qBox && !REDUCED) {
    const items = $$('.hr-i', qBox);
    if (items.length > 1) {
      let i = 0, live = true;
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => { live = e.isIntersecting; }, { threshold: 0 }).observe(qBox);
      }
      setInterval(() => {
        if (!live || document.hidden) return;
        const prev = items[i];
        prev.classList.remove('on');
        prev.classList.add('out');
        i = (i + 1) % items.length;
        const next = items[i];
        setTimeout(() => { prev.classList.remove('out'); next.classList.add('on'); }, 340);
      }, 4200);
    }
  }

  /* ------------------------------ la pared se puede arrastrar con el ratón */
  $$('[data-drag]').forEach((box) => {
    let down = false, startX = 0, startL = 0, moved = 0;
    box.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      down = true; moved = 0; startX = e.clientX; startL = box.scrollLeft;
      box.classList.add('dragging');
      box.setPointerCapture(e.pointerId);
    });
    box.addEventListener('pointermove', (e) => {
      if (!down) return;
      const d = e.clientX - startX;
      moved = Math.abs(d);
      box.scrollLeft = startL - d;
    });
    const up = () => { down = false; box.classList.remove('dragging'); };
    box.addEventListener('pointerup', up);
    box.addEventListener('pointercancel', up);
    box.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
  });

  /* --------------- la caja de reseñas se alinea con la fila de botones */
  const ctaRow = $('.hero-cta'), rateBox = $('.hero-rate');
  if (ctaRow && rateBox) {
    const fit = () => {
      const kids = $$('.btn', ctaRow);
      if (kids.length < 2) return;
      const a = kids[0].getBoundingClientRect();
      const b = kids[kids.length - 1].getBoundingClientRect();
      const sameLine = Math.abs(b.top - a.top) < 4;
      rateBox.style.setProperty('--cta-w', sameLine ? `${Math.round(b.right - a.left)}px` : '100%');
    };
    fit();
    addEventListener('resize', () => requestAnimationFrame(fit), { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }

  /* ------------------------------------------------------------ contador */
  const c = $('[data-count]');
  if (c && 'IntersectionObserver' in window && !REDUCED) {
    const co = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      co.unobserve(e.target);
      const target = parseFloat(e.target.dataset.count);
      if (isNaN(target)) return;
      const dec = (e.target.dataset.count.split('.')[1] || '').length;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 1200);
        const v = target * (1 - Math.pow(1 - p, 3));
        e.target.textContent = dec ? v.toFixed(dec) : Math.round(v);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    co.observe(c);
  }

  /* ------------------------------------------------- formulario → WhatsApp */
  const form = $('#wa-form');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = $('#f-name', form);
    const name = (nameEl.value || '').trim();
    if (!name) { nameEl.focus(); nameEl.reportValidity && nameEl.reportValidity(); return; }
    const project = $('#f-project', form).value || '';
    const msg = ($('#f-msg', form).value || '').trim();
    const es = html.lang.slice(0, 2) === 'es';
    const text = es
      ? `Hola Wave Gods Studio! Soy ${name}.\nMe interesa: ${project}.${msg ? `\n\n${msg}` : ''}`
      : `Hi Wave Gods Studio! I'm ${name}.\nI'm interested in: ${project}.${msg ? `\n\n${msg}` : ''}`;
    window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  /* ------------------------------------------------------------- varios */
  $$('[data-lang-switch]').forEach((a) => a.addEventListener('click', () => {
    try { localStorage.setItem('wg-lang', a.dataset.langSwitch); } catch (_) {}
  }));
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
