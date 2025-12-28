<template>
  <div id="app">
    <!-- 文档页禁用 3D 背景，其他页面可再启用 -->

    <ModernHeader />
    <main
      class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <RouterView />
    </main>
    <FooterPromotionBar v-if="showFooter" />
    <Footer v-if="showFooter" />

    <!-- 悬浮赞助按钮 - 只在赞助页面显示 -->
    <FloatingDonationButton v-if="isDonationPage" />

    <!-- 回到顶部按钮 - 全站可用 -->
    <BackToTop />

    <!-- 圣诞节活动期间：全站飞雪效果（Canvas 性能优化版） -->
    <div v-if="isChristmasPromoActive" class="snow-overlay" aria-hidden="true">
      <canvas ref="snowCanvas" class="snow-canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useThemeStore } from './stores/theme'
import ModernHeader from './components/ModernHeader.vue'
import Footer from './components/Footer.vue'
import FooterPromotionBar from './components/FooterPromotionBar.vue'
import FloatingDonationButton from './components/FloatingDonationButton.vue'
import BackToTop from './components/BackToTop.vue'
import { getActivePromotionsFromBackend } from '@/services/campaignService.js'

const route = useRoute()
const themeStore = useThemeStore()

// 检查是否为赞助页面
const isDonationPage = computed(() => {
  return route.name === 'donation' || route.path === '/donation'
})

// 文档页不显示 Footer，避免双滚动条
const showFooter = computed(() => route.name !== 'documentation' && route.path !== '/documentation')

// 懒加载 Spline
const shouldLoadSpline = ref(false)

const activePromotions = ref([])

/**
 * 加载活动列表（用于全局视觉效果开关）
 * @returns {Promise<void>}
 */
async function loadActivePromotionsForEffects() {
  try {
    activePromotions.value = await getActivePromotionsFromBackend()
  } catch {
    activePromotions.value = []
  }
}

onMounted(() => {
  // 初始化主题
  themeStore.initTheme()

  // 使用 requestIdleCallback 在浏览器空闲时加载
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      shouldLoadSpline.value = true
    }, { timeout: 2000 })
  } else {
    // 降级方案：延迟 2 秒后加载
    setTimeout(() => {
      shouldLoadSpline.value = true
    }, 2000)
  }

  loadActivePromotionsForEffects()
})

const isChristmasPromoActive = computed(() => {
  const list = activePromotions.value || []
  return list.some((p) => {
    const haystack = [
      p?.name,
      p?.displayName,
      p?.banner?.title,
      p?.banner?.subtitle
    ]
      .filter(Boolean)
      .join(' ')
    return /圣诞|christmas/i.test(haystack)
  })
})

// Canvas 雪花实现
const snowCanvas = ref(null)
let ctx = null
let flakes = []
let rafId = null
let running = false
let width = 0
let height = 0
let lastTs = 0

/**
 * 计算雪花数量（根据设备性能和用户偏好适配）
 * @returns {number} 雪花数量
 */
function getSnowflakeCount() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const deviceMemory = navigator.deviceMemory || 4
  if (prefersReduced) return 40
  if (deviceMemory <= 4) return 70
  return 100
}

/**
 * 生成雪花数组（Canvas 版本）
 * @param {number} count 雪花数量
 * @returns {Array<Object>} 雪花对象列表
 */
function generateCanvasFlakes(count) {
  const arr = []
  for (let i = 0; i < count; i++) {
    const radius = Math.round(Math.random() * 3) + 2 // 2-5px
    arr.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: radius,
      // 垂直速度（像素/帧）
      vy: 0.6 + Math.random() * 1.6,
      // 水平摆动幅度与速度
      sway: 8 + Math.random() * 16,
      vx: 0.5 + Math.random() * 1.0,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.75 + Math.random() * 0.25
    })
  }
  return arr
}

/**
 * 重置 Canvas 尺寸并重新生成雪花
 */
function resizeCanvas() {
  const canvas = snowCanvas.value
  if (!canvas) return
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
  // 保持雪花数量与性能平衡
  flakes = generateCanvasFlakes(getSnowflakeCount())
}

/**
 * 绘制所有雪花
 */
function drawFlakes() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  for (const f of flakes) {
    ctx.globalAlpha = f.opacity
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

/**
 * 更新雪花位置
 * @param {number} dt 帧间时间系数（约等于 1）
 */
function updateFlakes(dt) {
  for (const f of flakes) {
    f.phase += 0.02 * f.vx
    f.x += Math.sin(f.phase) * (f.sway / 60) // 减小每帧水平位移，保持平滑
    f.y += f.vy * dt
    if (f.y - f.r > height) {
      // 重新从顶部落下
      f.y = -f.r
      f.x = Math.random() * width
      f.r = Math.round(Math.random() * 3) + 2
      f.vy = 0.6 + Math.random() * 1.6
      f.sway = 8 + Math.random() * 16
      f.vx = 0.5 + Math.random() * 1.0
      f.opacity = 0.75 + Math.random() * 0.25
    }
    // 水平越界处理
    if (f.x < -20) f.x = width + 20
    if (f.x > width + 20) f.x = -20
  }
}

/**
 * 启动雪花动画循环
 */
function startSnow() {
  if (running) return
  const canvas = snowCanvas.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  if (!ctx) return
  running = true
  lastTs = performance.now()
  const loop = (ts) => {
    if (!running) return
    const dt = Math.max(0.5, Math.min(2, (ts - lastTs) / 16))
    lastTs = ts
    updateFlakes(dt)
    drawFlakes()
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
}

/**
 * 停止动画并清理资源
 */
function stopSnow() {
  running = false
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  flakes = []
  if (ctx) {
    ctx.clearRect(0, 0, width, height)
  }
}

/**
 * 初始化并监听窗口/可见性变化
 */
function initSnowIfNeeded() {
  if (!isChristmasPromoActive.value) return
  resizeCanvas()
  startSnow()
}

onMounted(() => {
  if (isChristmasPromoActive.value) {
    initSnowIfNeeded()
  }
  window.addEventListener('resize', resizeCanvas, { passive: true })
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSnow()
    } else {
      initSnowIfNeeded()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  stopSnow()
})

watch(isChristmasPromoActive, (active) => {
  if (active) {
    initSnowIfNeeded()
  } else {
    stopSnow()
  }
})
</script>

<style>
/* 全局样式已在 style.css 中定义 */

/* 圣诞节活动期间：全站飞雪效果样式 */
.snow-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 500;
}

.snow-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
