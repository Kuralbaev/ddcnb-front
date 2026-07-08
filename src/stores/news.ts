import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../api'
import type { NewsArticle, NewsCategory } from '../dto/news'

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsArticle[]>([])
  const currentNews = ref<NewsArticle | null>(null)
  const categories = ref<NewsCategory[]>([])
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchNews = async (categoryId = 'all') => {
    const params: Record<string, string | number> = {
      'pagination[page]': pagination.value.page,
      'pagination[pageSize]': pagination.value.pageSize,
    }

    const url =
      categoryId === 'all'
        ? '/news?populate=*&sort[publishedAt]=desc'
        : `/news?filters[category][id][$eq]=${categoryId}&populate=*&sort[publishedAt]=desc`

    const response = await api.get(url, { params })
    news.value = response.data.data
    pagination.value.total = response.data.meta.pagination.total
    pagination.value.totalPages = response.data.meta.pagination.pageCount
  }

  const fetchNewsByCategory = async (categoryId: string) => {
    await fetchNews(categoryId)
  }

  const setPage = async (page: number, categoryId = 'all') => {
    pagination.value.page = page
    await fetchNews(categoryId)
  }

  const resetPage = () => {
    pagination.value.page = 1
  }

  const fetchNewsById = async (documentId: string) => {
    const response = await api.get(`/news/${documentId}?populate=*`)
    currentNews.value = response.data.data
  }

  const fetchCategories = async () => {
    const response = await api.get('/news-categories')
    categories.value = [{
      id: 'all',
      name_ru: 'Все',
      name_kk: 'Барлық',
      name_en: 'All',
    }, ...response.data.data]
  }

  return {
    news,
    currentNews,
    categories,
    pagination,
    fetchNews,
    fetchNewsByCategory,
    fetchNewsById,
    fetchCategories,
    setPage,
    resetPage,
  }
})
