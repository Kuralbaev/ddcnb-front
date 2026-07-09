<script setup lang="ts">
import { onMounted } from "vue";

const quickLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/services" },
  { label: "О нас", to: "/about" },
  { label: "Новости", to: "/news" },
  { label: "Контакты", to: "/contacts" },
];

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
};

onMounted(() => {
  initReveal();
});
</script>

<template>
  <main>
    <section class="hero hero--page">
      <div class="container">
        <div class="frame reveal">
          <div class="frame__rulers" aria-hidden="true">
            <span class="ruler"><i></i>140 px</span>
            <span class="ruler"><i></i>530 px</span>
            <span class="ruler"><i></i>610 px</span>
          </div>

          <div class="mission not-found__hero">
            <p class="hero__eyebrow">
              <span class="tick" aria-hidden="true"></span>ошибка 404
            </p>
            <p class="not-found__code" aria-hidden="true">404</p>
            <h1 class="mission__title">
              Страница <span class="mission__stroke">не найдена</span>
            </h1>
            <p class="mission__sub">
              — возможно, ссылка устарела, страница была перемещена
              или&nbsp;адрес введён с&nbsp;ошибкой
            </p>
          </div>

          <div class="hero__footline" aria-hidden="true">
            <span>главная</span>
            <span>услуги</span>
            <span>новости</span>
            <span>контакты</span>
          </div>
        </div>
      </div>
    </section>

    <section class="not-found">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-head__index">01 / навигация</p>
          <h2 class="section-head__title">Куда перейти дальше</h2>
        </div>

        <nav class="not-found__links reveal" aria-label="Быстрые ссылки">
          <RouterLink
            v-for="(link, index) in quickLinks"
            :key="link.to"
            class="not-found__link"
            :to="link.to"
            :style="index ? { '--d': `${index * 0.06}s` } : undefined"
          >
            <span class="not-found__link-label">{{ link.label }}</span>
            <span class="not-found__link-arrow" aria-hidden="true">→</span>
          </RouterLink>
        </nav>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta__box reveal">
          <h2 class="cta__title">Вернуться<br />на главную</h2>
          <p class="cta__text">
            Или свяжитесь с контакт-центром — мы поможем найти нужный раздел.
          </p>
          <RouterLink class="btn btn--primary btn--lg" to="/"
            >На главную</RouterLink
          >
          <span class="cta__phone">контакт-центр — <b>1477</b></span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.not-found {
  padding: clamp(48px, 8vh, 96px) 0;
  position: relative;
  z-index: 1;
}

.not-found__hero {
  position: relative;
}

.not-found__code {
  position: absolute;
  top: -0.2em;
  right: 0;
  font-family: var(--font-display);
  font-size: clamp(72px, 14vw, 180px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(22, 32, 58, 0.1);
  pointer-events: none;
  user-select: none;
}

.not-found__links {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line-strong);
}

.not-found__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: clamp(22px, 3vh, 36px) 4px;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  color: inherit;
  transition: padding-left 0.35s ease, background 0.35s ease;
}

.not-found__link:hover {
  padding-left: 20px;
  background: rgba(255, 255, 255, 0.6);
}

.not-found__link-label {
  font-family: var(--font-display);
  font-size: clamp(16px, 1.8vw, 22px);
  font-weight: 600;
  line-height: 1.3;
}

.not-found__link-arrow {
  font-size: 18px;
  color: var(--ink-faint);
  transition: transform 0.3s ease, color 0.3s ease;
}

.not-found__link:hover .not-found__link-arrow {
  transform: translateX(5px);
  color: var(--accent);
}

@media (max-width: 760px) {
  .not-found__code {
    position: static;
    margin-bottom: 12px;
  }
}
</style>
