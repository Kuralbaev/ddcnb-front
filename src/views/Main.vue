<script setup lang="ts">
import { onMounted } from "vue";
import { useNewsStore } from "@/stores/news";
import { storeToRefs } from "pinia";
import { formatDate } from "@/helpers/formatDate";

const newsStore = useNewsStore();
const { news } = storeToRefs(newsStore);

const initReveal = () => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0 },
  );

  requestAnimationFrame(() => {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
  });

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

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
    { threshold: 0.4 },
  );
  document
    .querySelectorAll(".number__value")
    .forEach((el) => countObserver.observe(el));
};

/* ---------- Утилита: ретина-canvas ---------- */
function getCanvasRgb(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function setupCanvas(canvas: any) {
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
  const nodes: any[] = Array.from({ length: N }, () => ({
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
        const a = nodes[i],
          b = nodes[j];
        const dx = a.x - b.x,
          dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK) {
          const line = getCanvasRgb("--canvas-line");
          ctx.strokeStyle = `rgba(${line}, ${0.16 * (1 - dist / LINK)})`;
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
      ctx.fillStyle = `rgba(${getCanvasRgb("--canvas-node")}, 0.55)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
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

  function draw(time: any) {
    ctx.clearRect(0, 0, w, h);

    // связи-«дендриты»
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const p1 = pos(nodes[i]),
          p2 = pos(nodes[j]);
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const max = R() * 0.62;
        if (dist < max) {
          const alpha = 0.34 * (1 - dist / max);
          const neuroLine = getCanvasRgb("--canvas-neuro-line");
          ctx.strokeStyle = `rgba(${neuroLine}, ${alpha})`;
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

      const neuroGlow = getCanvasRgb("--canvas-neuro-glow");
      const neuroNode = getCanvasRgb("--canvas-neuro-node");

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, n.size * 7);
      g.addColorStop(0, `rgba(${neuroGlow}, ${0.5 * glow})`);
      g.addColorStop(1, `rgba(${neuroGlow}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, n.size * 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${neuroNode}, ${0.5 + 0.5 * glow})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, n.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  window.addEventListener("resize", () => {
    ({ ctx, w, h } = setupCanvas(canvas));
  });
}

onMounted(() => {
  setTimeout(() => {
    useNewsStore().fetchNews();
    initReveal();
    initNeuroCanvas();
    initHeroCanvas();
  }, 100);
});
</script>

<template>
  <main>
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="container">
        <div class="frame reveal">
          <div class="frame__rulers" aria-hidden="true">
            <span class="ruler"><i></i>140 px</span>
            <span class="ruler"><i></i>530 px</span>
            <span class="ruler"><i></i>610 px</span>
          </div>

          <div class="hero__grid">
            <div class="hero__content">
              <p class="hero__eyebrow">
                <span class="tick" aria-hidden="true"></span>расширяя
                возможности государства
              </p>
              <h1 class="hero__title">
                <span class="hero__title-line">Digital</span>
                <span class="hero__title-line hero__title-line--shift"
                  >Development</span
                >
                <span class="hero__title-line hero__title-line--shift2"
                  >Center</span
                >
              </h1>
              <p class="hero__lead">
                Мы создаём цифровые решения для финансовой стабильности
                государства.
              </p>
              <div class="hero__actions">
                <a class="btn btn--primary" href="#services">Наши услуги</a>
                <a class="btn btn--ghost" href="#about">О центре</a>
              </div>
            </div>

            <div class="hero__visual" aria-hidden="true">
              <canvas id="heroCanvas" class="hero__canvas"></canvas>
              <div class="orbit">
                <!-- <svg class="orbit__ellipse" viewBox="0 0 560 200" fill="none">
                  <ellipse
                    cx="280"
                    cy="100"
                    rx="276"
                    ry="96"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-dasharray="4 6"
                  />
                  <path d="M8 110 L2 100 L12 98 Z" fill="currentColor" />
                  <path d="M552 90 L558 100 L548 102 Z" fill="currentColor" />
                </svg> -->
                <!-- <span class="orbit__label">данные в движении</span>
                <span class="orbit__node orbit__node--a"></span>
                <span class="orbit__node orbit__node--b"></span>
                <span class="orbit__core">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.4"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="4" cy="6" r="1.6" />
                    <circle cx="20" cy="6" r="1.6" />
                    <circle cx="4" cy="18" r="1.6" />
                    <circle cx="20" cy="18" r="1.6" />
                    <path
                      d="M9.5 10.5 5.4 7M14.5 10.5 18.6 7M9.5 13.5 5.4 17M14.5 13.5 18.6 17"
                    />
                  </svg>
                </span> -->
              </div>
            </div>
          </div>

          <div class="hero__footline" aria-hidden="true">
            <span>цифровизация</span>
            <span>информационная безопасность</span>
            <span>оператор данных</span>
            <!-- <span>контакт-центр 1477</span> -->
          </div>
        </div>
      </div>
    </section>

    <!-- ===== УСЛУГИ ===== -->
    <section class="services" id="services">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-head__index">01 / направления</p>
          <h2 class="section-head__title">
            Технологичность<br />в каждом сервисе
          </h2>
        </div>

        <div class="services__grid">
          <article class="service reveal">
            <span class="service__num">/01</span>
            <h3 class="service__title">Цифровизация</h3>
            <p class="service__text">
              Оператор портала закупок Национального Банка РК. Более 25&nbsp;лет
              на рынке — опыт, проверенный государственными сервисами.
            </p>
            <a class="service__link" href="#services">Подробнее <i>→</i></a>
          </article>
          <article class="service reveal" style="--d: 0.08s">
            <span class="service__num">/02</span>
            <h3 class="service__title">Информационная безопасность</h3>
            <p class="service__text">
              Сопровождение и администрирование ИТ-систем. Защита критической
              инфраструктуры финансового сектора.
            </p>
            <a class="service__link" href="#services">Подробнее <i>→</i></a>
          </article>
          <article class="service reveal" style="--d: 0.16s">
            <span class="service__num">/03</span>
            <h3 class="service__title">Технологический оператор данных</h3>
            <p class="service__text">
              Профессиональная обработка, хранение и управление информацией в
              защищённых дата-центрах.
            </p>
            <a class="service__link" href="#services">Подробнее <i>→</i></a>
          </article>
          <article class="service reveal" style="--d: 0.24s">
            <span class="service__num">/04</span>
            <h3 class="service__title">Контакт-центр 1477</h3>
            <p class="service__text">
              Консультационная и техническая поддержка пользователей
              государственных финансовых сервисов.
            </p>
            <a class="service__link" href="#services">Подробнее <i>→</i></a>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== О ЦЕНТРЕ (круг с нейросетью, как в референсе) ===== -->
    <section class="about" id="about">
      <div class="container about__inner">
        <div class="about__rings" aria-hidden="true"></div>

        <div class="about__col about__col--left reveal">
          <h2 class="about__statement">
            Доверие и&nbsp;точность&nbsp;— скелет нашей цифровой экосистемы
          </h2>
          <p class="about__note">
            Основы деятельности ЦЦР — доверие и удовлетворение потребностей
            заказчика. Каждое решение спроектировано как часть единой
            архитектуры.
          </p>
        </div>

        <div class="about__col about__col--circle reveal" style="--d: 0.1s">
          <div class="neuro">
            <canvas id="neuroCanvas"></canvas>
          </div>
        </div>

        <div class="about__col about__col--right reveal" style="--d: 0.2s">
          <p class="about__note about__note--em">
            Наша архитектура не проста, но при этом элегантна: строгие линии
            ведут данные
            <em>в правильном направлении</em>.
          </p>
        </div>
      </div>
    </section>

    <!-- ===== ЦИФРЫ ===== -->
    <section class="numbers" id="numbers">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-head__index">02 / в цифрах</p>
          <h2 class="section-head__title">Опыт, проверенный временем</h2>
        </div>
        <div class="numbers__grid">
          <div class="number reveal">
            <span class="number__value" data-count="25">0</span>
            <span class="number__label">лет опыта<br />с 1996 года</span>
          </div>
          <div class="number reveal" style="--d: 0.1s">
            <span class="number__value"
              ><span data-count="50">0</span>/<span data-count="24"
                >0</span
              ></span
            >
            <span class="number__label"
              >систем разработано<br />/ в эксплуатации</span
            >
          </div>
          <div class="number reveal" style="--d: 0.2s">
            <span class="number__value" data-count="2020" data-plain="true"
              >0</span
            >
            <span class="number__label"
              >запуск портала<br />в промышленной эксплуатации</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- ===== НОВОСТИ ===== -->
    <section class="news" id="news">
      <div class="container">
        <div class="section-head">
          <p class="section-head__index">03 / новости</p>
          <h2 class="section-head__title">Что происходит в центре</h2>
        </div>
        <div class="news__list">
          <template v-for="item in news.slice(0, 3)" :key="item.documentId">
            <router-link class="news-card" :to="`/news/${item.documentId}`">
              <span class="news-card__tag">{{ item.category.name_ru }}</span>
              <h3 class="news-card__title">{{ item.title_ru }}</h3>
              <span class="news-card__meta"
                >{{ formatDate(item.publishedAt) }} <i>→</i></span
              >
            </router-link>
          </template>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="cta">
      <div class="container">
        <div class="cta__box reveal">
          <h2 class="cta__title">Готовы к цифровой<br />трансформации?</h2>
          <p class="cta__text">
            Свяжитесь с нами — обсудим задачи вашего ведомства.
          </p>
          <a class="btn btn--primary btn--lg" href="/contacts">Написать нам</a>
          <span class="cta__phone">контакт-центр — <b>1477</b></span>
        </div>
      </div>
    </section>
  </main>
</template>
