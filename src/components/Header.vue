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
