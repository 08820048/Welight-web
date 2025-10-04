<template>
  <div id="app">
    <!-- Spline 3D 背景 - 懒加载 -->
    <div class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <iframe v-if="shouldLoadSpline"
        src="https://my.spline.design/celestialflowabstractdigitalform-ObUlVgj70g2y4bbx5vBKSfxN/" frameborder="0"
        width="100%" height="100%" class="w-full h-full pointer-events-none" id="aura-spline">
      </iframe>
      <!-- 加载前的占位背景 -->
      <div v-else
        class="w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      </div>
    </div>

    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />

    <!-- 悬浮赞助按钮 - 只在赞助页面显示 -->
    <FloatingDonationButton v-if="isDonationPage" />

    <!-- 回到顶部按钮 - 全站可用 -->
    <BackToTop />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FloatingDonationButton from './components/FloatingDonationButton.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()

// 检查是否为赞助页面
const isDonationPage = computed(() => {
  return route.name === 'donation' || route.path === '/donation'
})

// 懒加载 Spline
const shouldLoadSpline = ref(false)

onMounted(() => {
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
})
</script>

<style>
/* 全局样式已在 style.css 中定义 */
</style>
