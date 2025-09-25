<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />

    <!-- 悬浮捐赠按钮 - 在定价页面隐藏 -->
    <FloatingDonationButton v-if="!isPricingPage" />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import FloatingDonationButton from './components/FloatingDonationButton.vue'

const route = useRoute()

// 检查是否为定价页面
const isPricingPage = computed(() => {
  return route.name === 'pricing' || route.path === '/pricing'
})
</script>

<style>
/* 全局样式已在 style.css 中定义 */
</style>
