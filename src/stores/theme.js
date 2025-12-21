import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const mode = ref('system') // 'light' | 'dark' | 'system'
  let mediaQuery = null

  /** 初始化主题状态：读取本地模式并附加系统偏好监听 */
  const initTheme = () => {
    const savedMode = localStorage.getItem('themeMode')
    mode.value = savedMode || 'system'
    mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
    applyThemeFromMode()
    attachModeWatchers()
  }

  /** 交替切换浅色/深色 */
  const toggleTheme = () => {
    mode.value = isDark.value ? 'light' : 'dark'
    localStorage.setItem('themeMode', mode.value)
    clearModeWatchers()
    applyThemeFromMode()
  }

  /** 显式设置浅色或深色 */
  const setTheme = (theme) => {
    mode.value = theme === 'dark' ? 'dark' : 'light'
    localStorage.setItem('themeMode', mode.value)
    clearModeWatchers()
    applyThemeFromMode()
  }

  /** 设置主题模式：light/dark/system */
  const setThemeMode = (nextMode) => {
    mode.value = nextMode
    localStorage.setItem('themeMode', nextMode)
    clearModeWatchers()
    applyThemeFromMode()
    attachModeWatchers()
  }

  /** 根据当前模式应用到 DOM */
  const applyThemeFromMode = () => {
    const html = document.documentElement
    const nextIsDark = computeIsDark(mode.value)
    isDark.value = nextIsDark
    if (nextIsDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  /** 计算是否为暗色 */
  const computeIsDark = (m) => {
    if (m === 'dark') return true
    if (m === 'light') return false
    if (m === 'system') return mediaQuery ? mediaQuery.matches : false
    return false
  }

  /** 附加系统偏好监听（仅 system 模式） */
  const attachModeWatchers = () => {
    if (mode.value === 'system' && mediaQuery) {
      mediaQuery.addEventListener('change', handleSystemChange)
    }
  }

  /** 清理系统偏好监听 */
  const clearModeWatchers = () => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleSystemChange)
    }
  }

  /** 系统偏好变化时应用主题 */
  const handleSystemChange = () => {
    applyThemeFromMode()
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
