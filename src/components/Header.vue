<template>
  <div class="noise" aria-hidden="true"></div>

  <!-- ===== Дизайнерская сетка (как в референсе) ===== -->
  <div class="blueprint" aria-hidden="true">
    <div class="blueprint__inner">
      <span class="blueprint__line"></span>
      <span class="blueprint__line"></span>
      <span class="blueprint__line"></span>
      <span class="blueprint__line"></span>
    </div>
  </div>

  <header class="topbar">
    <div class="container topbar__inner">
      <RouterLink class="logo" to="/" aria-label="DDC — главная">
        <span class="logo__mark">DDC</span>
        <span class="logo__caption"
          >Digital Development Center<br />National Bank of Kazakhstan</span
        >
      </RouterLink>
      <nav class="nav" aria-label="Основная навигация">
        <RouterLink
          class="nav__link"
          :active-class="'is-current'"
          to="/services"
          >Услуги</RouterLink
        >
        <RouterLink class="nav__link" :active-class="'is-current'" to="/about"
          >О нас</RouterLink
        >
        <RouterLink class="nav__link" :active-class="'is-current'" to="/mission"
          >Миссия</RouterLink
        >
        <RouterLink class="nav__link" :active-class="'is-current'" to="/news"
          >Новости</RouterLink
        >
        <RouterLink
          class="nav__link"
          :active-class="'is-current'"
          to="/contacts"
          >Контакты</RouterLink
        >
        <RouterLink
          class="nav__link nav__link--cta"
          :to="'https://portal.ddcnb.kz'"
          target="_blank"
          rel="noopener"
          >Портал закупок ↗
        </RouterLink>
      </nav>
      <div class="theme" role="group" aria-label="Тема оформления">
        <button
          class="theme__btn"
          type="button"
          :class="{ 'is-active': theme === 'default' }"
          :aria-pressed="theme === 'default'"
          title="Текущая тема"
          @click="setTheme('default')"
        >
          <span class="theme__swatch theme__swatch--default" aria-hidden="true"></span>
        </button>
        <button
          class="theme__btn"
          type="button"
          :class="{ 'is-active': theme === 'brand' }"
          :aria-pressed="theme === 'brand'"
          title="Бренд"
          @click="setTheme('brand')"
        >
          <span class="theme__swatch theme__swatch--brand" aria-hidden="true"></span>
        </button>
      </div>
      <div class="lang">
        <button class="lang__btn is-active" type="button">Ru</button>
        <button class="lang__btn" type="button">Kz</button>
        <button class="lang__btn" type="button">En</button>
      </div>
      <button
        class="burger"
        type="button"
        aria-label="Открыть меню"
        aria-expanded="false"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useThemeStore, type AppTheme } from "@/stores/theme";

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);

const setTheme = (next: AppTheme) => {
  themeStore.setTheme(next);
};

onMounted(() => {
  /* ---------- Мобильное меню ---------- */
  const topbar = document.querySelector(".topbar");
  const burger = document.querySelector(".burger");
  if (burger && topbar) {
    burger.addEventListener("click", () => {
      const open = topbar.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document
      .querySelectorAll(".nav__link")
      .forEach((link) =>
        link.addEventListener("click", () =>
          topbar.classList.remove("is-open"),
        ),
      );
  }
});
</script>

<style scoped>
.theme {
  display: flex;
  align-items: center;
  gap: 6px;
}

.theme__btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.theme__btn:hover,
.theme__btn.is-active {
  border-color: var(--line-strong);
}

.theme__btn.is-active {
  transform: translateY(-1px);
}

.theme__swatch {
  width: 14px;
  height: 14px;
  border: 1px solid var(--line-strong);
}

.theme__swatch--default {
  background: linear-gradient(135deg, #2547e0 50%, #9db8e8 50%);
}

.theme__swatch--brand {
  background: #01471c;
}
</style>
