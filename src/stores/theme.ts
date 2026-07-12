import { ref } from 'vue'
import { defineStore } from 'pinia'

export type AppTheme = 'default' | 'brand'

const STORAGE_KEY = 'ddc-theme'

function isAppTheme(value: string | null): value is AppTheme {
  return value === 'default' || value === 'brand'
}

export function applyTheme(theme: AppTheme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function getSavedTheme(): AppTheme {
  const saved = localStorage.getItem(STORAGE_KEY)
  return isAppTheme(saved) ? saved : 'default'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<AppTheme>(getSavedTheme())

  const setTheme = (next: AppTheme) => {
    theme.value = next
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const init = () => {
    const saved = getSavedTheme()
    theme.value = saved
    applyTheme(saved)
  }

  return { theme, setTheme, init }
})
