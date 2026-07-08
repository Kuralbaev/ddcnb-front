<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { initDDC } from "../assets/main";
import { useNewsStore } from "../stores/news";
import { storeToRefs } from "pinia";
import { formatDate } from "@/helpers/formatDate";

const activeFilter = ref("all");

const newsStore = useNewsStore();
const { news, categories, pagination } = storeToRefs(newsStore);

const visiblePages = computed(() => {
  const { page, totalPages } = pagination.value;
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  return [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
});

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

const loadNews = async () => {
  await newsStore.fetchNews(activeFilter.value);
  initReveal();
};

const setFilter = async (filterId: string) => {
  if (activeFilter.value === filterId) return;
  activeFilter.value = filterId;
  newsStore.resetPage();
  await loadNews();
};

const goToPage = async (page: number) => {
  if (page < 1 || page > pagination.value.totalPages) return;
  await newsStore.setPage(page, activeFilter.value);
  document.querySelector(".news")?.scrollIntoView({ behavior: "smooth" });
  initReveal();
};

const showEllipsisBefore = (page: number, index: number) => {
  const prevPage = visiblePages.value[index - 1];
  return index > 0 && prevPage !== undefined && page - prevPage > 1;
};

onMounted(() => {
  newsStore.fetchCategories();
  loadNews();
  initDDC();
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

          <div class="mission">
            <p class="hero__eyebrow">
              <span class="tick" aria-hidden="true"></span>медиацентр
            </p>
            <h1 class="mission__title">
              Что происходит в&nbsp;<span class="mission__stroke">центре</span>
            </h1>
            <p class="mission__sub">
              — новости о проектах, событиях и&nbsp;ключевых решениях
              в&nbsp;цифровой трансформации Национального Банка
            </p>
          </div>

          <div class="hero__footline" aria-hidden="true">
            <span>проекты</span>
            <span>отчётность</span>
            <span>события</span>
            <span>анонсы</span>
          </div>
        </div>
      </div>
    </section>

    <section class="news">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-head__index">01 / лента</p>
          <h2 class="section-head__title">Все новости</h2>
        </div>
        <div
          class="news-page__filters reveal"
          role="group"
          aria-label="Фильтр новостей"
        >
          <button
            v-for="filter in categories"
            :key="filter.id"
            type="button"
            class="news-page__filter"
            :class="{ 'is-active': activeFilter === filter.id }"
            :aria-pressed="activeFilter === filter.id"
            @click="setFilter(filter.id)"
          >
            {{ filter.name_ru }}
          </button>
        </div>
        <div class="news__list">
          <RouterLink
            v-for="(item, index) in news"
            :key="item.documentId"
            class="news-card"
            :to="`/news/${item.documentId}`"
            :style="index ? { '--d': `${index * 0.06}s` } : undefined"
          >
            <span class="news-card__tag">{{ item.category.name_ru }}</span>
            <h3 class="news-card__title">{{ item.title_ru }}</h3>
            <span class="news-card__meta"
              >{{ formatDate(item.publishedAt) }} <i>→</i></span
            >
          </RouterLink>
        </div>

        <nav
          v-if="pagination.totalPages > 1"
          class="news-pagination reveal"
          aria-label="Пагинация новостей"
        >
          <button
            type="button"
            class="news-pagination__btn"
            :disabled="pagination.page === 1"
            aria-label="Предыдущая страница"
            @click="goToPage(pagination.page - 1)"
          >
            ←
          </button>

          <template v-for="(page, index) in visiblePages" :key="page">
            <span
              v-if="showEllipsisBefore(page, index)"
              class="news-pagination__ellipsis"
              aria-hidden="true"
            >
              …
            </span>
            <button
              type="button"
              class="news-pagination__btn"
              :class="{ 'is-active': pagination.page === page }"
              :aria-current="pagination.page === page ? 'page' : undefined"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </template>

          <button
            type="button"
            class="news-pagination__btn"
            :disabled="pagination.page === pagination.totalPages"
            aria-label="Следующая страница"
            @click="goToPage(pagination.page + 1)"
          >
            →
          </button>
        </nav>

        <p v-if="!news.length" class="news-page__empty reveal">
          В этой категории пока нет публикаций.
        </p>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta__box reveal">
          <h2 class="cta__title">Остались вопросы<br />по новостям?</h2>
          <p class="cta__text">
            Свяжитесь с пресс-службой или контакт-центром — мы на связи.
          </p>
          <RouterLink class="btn btn--primary btn--lg" to="/contacts"
            >Написать нам</RouterLink
          >
          <span class="cta__phone">контакт-центр — <b>1477</b></span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.news-page__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: clamp(28px, 4vh, 48px);
}

.news-page__filter {
  font: 600 12px var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
  background: none;
  border: 1px solid var(--line);
  padding: 10px 16px;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.news-page__filter:hover,
.news-page__filter.is-active {
  color: var(--ink);
  border-color: var(--line-strong);
  background: rgba(255, 255, 255, 0.55);
}

.news-page__filter.is-active {
  border-color: var(--accent);
  color: var(--accent);
}

.news-page__empty {
  padding: clamp(32px, 5vh, 56px) 0;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-faint);
  text-align: center;
}

.news-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: clamp(32px, 5vh, 56px);
}

.news-pagination__btn {
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  font: 600 12px var(--font-display);
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--line);
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.news-pagination__btn:hover:not(:disabled),
.news-pagination__btn.is-active {
  color: var(--ink);
  border-color: var(--line-strong);
  background: rgba(255, 255, 255, 0.85);
}

.news-pagination__btn.is-active {
  border-color: var(--accent);
  color: var(--accent);
}

.news-pagination__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.news-pagination__ellipsis {
  min-width: 24px;
  text-align: center;
  color: var(--ink-faint);
  font-family: var(--font-display);
}
</style>
