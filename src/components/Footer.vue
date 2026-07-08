<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="logo__mark">DDC</span>
        <p>
          АО «Центр цифрового развития»<br />Национальный Банк Республики
          Казахстан
        </p>
      </div>
      <nav class="footer__nav" aria-label="Навигация в подвале">
        <nuxt-link to="/services">Услуги</nuxt-link>
        <nuxt-link to="/about">О нас</nuxt-link>
        <nuxt-link to="/mission">Миссия</nuxt-link>
        <nuxt-link to="/news">Новости</nuxt-link>
        <nuxt-link to="/contacts">Контакты</nuxt-link>
      </nav>
      <div class="footer__meta">
        <p>© 1996–2026 DDC. Все права защищены.</p>
        <p>Разработано DDC</p>
      </div>
    </div>
  </footer>
</template>
