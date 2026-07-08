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
        <router-link to="/services">Услуги</router-link>
        <router-link to="/about">О нас</router-link>
        <router-link to="/mission">Миссия</router-link>
        <router-link to="/news">Новости</router-link>
        <router-link to="/contacts">Контакты</router-link>
      </nav>
      <div class="footer__meta">
        <p>© 1996–2026 DDC. Все права защищены.</p>
        <p>Разработано DDC</p>
      </div>
    </div>
  </footer>
</template>
