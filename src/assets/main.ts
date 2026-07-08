// @ts-nocheck
/* ============================================
   DDC — интерактив: reveal, счётчики, canvas
   ============================================ */

let initialized = false;

export function initDDC() {
  if (initialized) return;
  initialized = true;

  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Мобильное меню ---------- */
  const topbar = document.querySelector(".topbar");
  const burger = document.querySelector(".burger");
  if (burger && topbar) {
    burger.addEventListener("click", () => {
      const open = topbar.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav__link").forEach((link) =>
      link.addEventListener("click", () => topbar.classList.remove("is-open"))
    );
  }


  /* ---------- Счётчики ---------- */
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const isPlain = el.dataset.plain === "true";

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = isPlain ? String(value) : value.toLocaleString("ru-RU");
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counters = entry.target.querySelectorAll("[data-count]");
        const selfCount = entry.target.dataset.count ? [entry.target] : [];
        [...selfCount, ...counters].forEach((el) => {
          if (reducedMotion) {
            el.textContent = el.dataset.count;
          } else {
            animateCount(el);
          }
        });
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".number__value").forEach((el) => countObserver.observe(el));

  /* ---------- Вкладки услуг ---------- */
  const svcTabs = document.querySelectorAll(".svc-tab");
  if (svcTabs.length) {
    svcTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        svcTabs.forEach((t) => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".svc-panel").forEach((p) => {
          p.classList.remove("is-active");
          p.hidden = true;
        });

        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        const panel = document.getElementById(tab.getAttribute("aria-controls"));
        panel.hidden = false;
        // перезапуск анимации появления панели
        panel.classList.remove("is-active");
        void panel.offsetWidth;
        panel.classList.add("is-active");
      });
    });

    // открытие вкладки по хэшу: services.html#svc-2
    const hashMatch = location.hash.match(/^#svc-(\d)$/);
    if (hashMatch) {
      const tab = document.getElementById("svc-tab-" + hashMatch[1]);
      if (tab) tab.click();
    }
  }

  /* ---------- Форма обратной связи ---------- */
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      // здесь должен быть запрос к бэкенду; пока показываем подтверждение
      contactForm.querySelector(".contact-form__success").hidden = false;
      contactForm.querySelector("[type='submit']").disabled = true;
      contactForm.reset();
    });
  }

  /* ---------- Утилита: ретина-canvas ---------- */
  function setupCanvas(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
  }

  /* ---------- Hero: дрейфующая сеть точек ---------- */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;

    let { ctx, w, h } = setupCanvas(canvas);
    const N = 42;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 1.8,
    }));
    const LINK = 110;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(60, 86, 160, ${0.16 * (1 - dist / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.fillStyle = "rgba(37, 71, 224, 0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reducedMotion) requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", () => {
      ({ ctx, w, h } = setupCanvas(canvas));
    });
  }

  /* ---------- О центре: «нейроны» в круге ---------- */
  function initNeuroCanvas() {
    const canvas = document.getElementById("neuroCanvas");
    if (!canvas) return;

    let { ctx, w, h } = setupCanvas(canvas);
    const cx = () => w / 2;
    const cy = () => h / 2;
    const R = () => Math.min(w, h) / 2;

    const N = 34;
    const nodes = Array.from({ length: N }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * 0.86;
      return {
        a: angle,
        r: radius,
        speed: (Math.random() - 0.5) * 0.0016,
        size: 1.2 + Math.random() * 2.4,
        phase: Math.random() * Math.PI * 2,
      };
    });

    function pos(n) {
      return {
        x: cx() + Math.cos(n.a) * n.r * R(),
        y: cy() + Math.sin(n.a) * n.r * R(),
      };
    }

    function draw(time) {
      ctx.clearRect(0, 0, w, h);

      // связи-«дендриты»
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const p1 = pos(nodes[i]), p2 = pos(nodes[j]);
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          const max = R() * 0.62;
          if (dist < max) {
            const alpha = 0.34 * (1 - dist / max);
            ctx.strokeStyle = `rgba(96, 156, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            const mx = (p1.x + p2.x) / 2 + Math.sin(time / 1700 + i) * 7;
            const my = (p1.y + p2.y) / 2 + Math.cos(time / 1900 + j) * 7;
            ctx.quadraticCurveTo(mx, my, p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // светящиеся узлы
      nodes.forEach((n) => {
        n.a += n.speed;
        const p = pos(n);
        const glow = 0.55 + 0.45 * Math.sin(time / 800 + n.phase);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, n.size * 7);
        g.addColorStop(0, `rgba(140, 190, 255, ${0.5 * glow})`);
        g.addColorStop(1, "rgba(140, 190, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.size * 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(210, 230, 255, ${0.5 + 0.5 * glow})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reducedMotion) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
      ({ ctx, w, h } = setupCanvas(canvas));
    });
  }

  // canvas инициализируем после того, как layout рассчитан
  window.addEventListener("load", () => {
    initHeroCanvas();
    initNeuroCanvas();
  });
}
