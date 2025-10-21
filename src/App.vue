<template>
  <div id="app">
    <!-- 文档页禁用 3D 背景，其他页面可再启用 -->

    <Header />
    <main>
      <RouterView />
    </main>
    <Footer v-if="showFooter" />

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

// 文档页不显示 Footer，避免双滚动条
const showFooter = computed(() => route.name !== 'documentation' && route.path !== '/documentation')

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
