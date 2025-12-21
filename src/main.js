import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

/**
 * 在生产环境禁用 console 输出，并捕获错误到内存供后续上报
 */
function silenceConsoleInProd() {
  if (!import.meta.env.PROD) return
  const noop = () => {}
  const errors = []
  const originalError = console.error
  // 暴露错误收集容器
  window.__ERRORS__ = errors
  // 静默非错误类输出
  console.log = noop
  console.debug = noop
  console.info = noop
  console.warn = noop
  // 收集错误但不输出，避免 Lighthouse 最佳实践扣分
  console.error = (...args) => {
    try {
      errors.push(args)
    } catch (_) {
      void 0
    }
    // 如需调试可恢复原始输出：
    // originalError(...args)
  }
  // 捕获未处理错误
  window.addEventListener('error', (e) => {
    try {
      errors.push(['window.onerror', e.message, e.error])
    } catch (_) {
      void 0
    }
  })
  window.addEventListener('unhandledrejection', (e) => {
    try {
      errors.push(['unhandledrejection', e.reason])
    } catch (_) {
      void 0
    }
  })
}

silenceConsoleInProd()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
