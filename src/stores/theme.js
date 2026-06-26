import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const mode = ref('light')

  const persistLightTheme = () => {
    mode.value = 'light'
    isDark.value = false
    localStorage.setItem('themeMode', 'light')
    document.documentElement.classList.remove('dark')
  }

  /** 初始化主题状态：读取本地模式；官网默认不跟随系统深色模式 */
  const initTheme = () => {
    persistLightTheme()
  }

  /** 官网暂时固定浅色主题，避免未完善的深色样式降低可读性 */
  const toggleTheme = () => {
    persistLightTheme()
  }

  /** 官网暂时固定浅色主题，避免未完善的深色样式降低可读性 */
  const setTheme = (theme) => {
    persistLightTheme()
  }

  /** 官网暂时固定浅色主题；system/dark 都回落为 light */
  const setThemeMode = (nextMode) => {
    persistLightTheme()
  }

  /** 根据当前模式应用到 DOM */
  const applyThemeFromMode = () => {
    persistLightTheme()
  }

  return {
    isDark,
    mode,
    initTheme,
    toggleTheme,
    setTheme,
    setThemeMode
  }
})
