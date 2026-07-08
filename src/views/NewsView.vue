<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { initDDC } from "../assets/main";
import { useNewsStore } from "../stores/news";
import { storeToRefs } from "pinia";
import { formatDate } from "@/helpers/formatDate";
import { BASE_URL } from "@/var";

const route = useRoute();

const newsStore = useNewsStore();
const { currentNews } = storeToRefs(newsStore);

const article = computed(() => currentNews.value);

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
  newsStore.fetchNewsById(route.params.id as string);
  initDDC();
  initReveal();
});
</script>

<template>
  <main v-if="currentNews">
    <section class="hero hero--page">
      <div class="container">
        <div class="frame">
          <div class="frame__rulers" aria-hidden="true">
            <span class="ruler"><i></i>140 px</span>
            <span class="ruler"><i></i>530 px</span>
            <span class="ruler"><i></i>610 px</span>
          </div>

          <div class="mission">
            <p class="hero__eyebrow">
              <span class="tick" aria-hidden="true"></span
              >{{ currentNews.category.name_ru }} ·
              {{ formatDate(currentNews.publishedAt) }}
            </p>
            <h1 class="mission__title">{{ currentNews.title_ru }}</h1>
            <p class="mission__sub">— {{ currentNews.sub_description_ru }}</p>
          </div>

          <div class="hero__footline" aria-hidden="true">
            <span>новости</span>
            <span>ddc</span>
            <span>{{ currentNews.category.name_ru }}</span>
            <span>{{ formatDate(currentNews.publishedAt) }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="news-article">
      <div class="container news-article__grid">
        <article class="news-article__body">
          <img
            :src="BASE_URL + currentNews.image?.url"
            :alt="currentNews.title_ru"
            class="news-article__img"
            v-if="currentNews.image?.url"
          />
          <div
            v-html="currentNews.description_ru"
            class="news-article__p"
          ></div>

          <template v-if="currentNews?.files?.length > 0">
            <a
              v-for="file in currentNews.files"
              :key="file.id"
              class="btn btn--ghost news-article__pdf"
              :href="file.url"
              download
            >
              Скачать {{ file.url.split("/").pop() }}
            </a>
          </template>
        </article>

        <aside class="news-article__aside" style="--d: 0.1s">
          <div class="news-article__meta-box">
            <span class="news-article__meta-label">Категория</span>
            <span class="news-article__meta-value">{{
              currentNews.category.name_ru
            }}</span>
          </div>
          <div class="news-article__meta-box">
            <span class="news-article__meta-label">Дата публикации</span>
            <span class="news-article__meta-value">{{
              formatDate(currentNews.publishedAt)
            }}</span>
          </div>
          <RouterLink class="btn btn--ghost news-article__back" to="/news">
            ← Все новости
          </RouterLink>
        </aside>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta__box">
          <h2 class="cta__title">Нужен комментарий<br />для СМИ?</h2>
          <p class="cta__text">
            Пресс-служба DDC ответит на запросы журналистов и партнёров.
          </p>
          <RouterLink class="btn btn--primary btn--lg" to="/contacts"
            >Связаться с нами</RouterLink
          >
          <span class="cta__phone">контакт-центр — <b>1477</b></span>
        </div>
      </div>
    </section>
  </main>

  <main v-else class="news-article news-article--empty">
    <div class="container">
      <div class="cta__box">
        <h1 class="cta__title">Новость не найдена</h1>
        <p class="cta__text">
          Возможно, материал был удалён или ссылка указана неверно.
        </p>
        <RouterLink class="btn btn--primary btn--lg" to="/news"
          >К списку новостей</RouterLink
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
.news-article {
  padding: clamp(48px, 8vh, 96px) 0 clamp(24px, 4vh, 48px);
  position: relative;
  z-index: 1;
}

.news-article__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}

.news-article__body {
  border: 1px solid var(--line);
  background: var(--surface);
  backdrop-filter: blur(6px);
  padding: clamp(28px, 4vw, 56px);
}

.news-article__p {
  font-size: 15px;
  line-height: 1.85;
  color: var(--ink-soft);
  margin-bottom: 1.4em;
}

.news-article__img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 1.4em;
}

.news-article__p:last-of-type {
  margin-bottom: 0;
}

.news-article__pdf {
  margin-top: clamp(8px, 2vh, 16px);
}

.news-article__aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 100px;
}

.news-article__meta-box {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.55);
  padding: 18px 20px;
}

.news-article__meta-label {
  display: block;
  font: 500 10px var(--font-display);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 8px;
}

.news-article__meta-value {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.news-article__back {
  width: 100%;
  margin-top: 8px;
}

.news-article--empty {
  padding: clamp(80px, 12vh, 160px) 0;
}

@media (max-width: 900px) {
  .news-article__grid {
    grid-template-columns: 1fr;
  }

  .news-article__aside {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .news-article__meta-box {
    flex: 1 1 200px;
  }

  .news-article__back {
    flex: 1 1 100%;
  }
}
</style>
