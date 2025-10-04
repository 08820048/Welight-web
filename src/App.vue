<template>
  <div id="app">
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
import { computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FloatingDonationButton from './components/FloatingDonationButton.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()

// 检查是否为赞助页面
const isDonationPage = computed(() => {
  return route.name === 'donation' || route.path === '/donation'
})
</script>

<style>
/* 全局样式已在 style.css 中定义 */
</style>
