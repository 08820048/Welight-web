<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />

    <!-- 悬浮捐赠按钮 - 只在捐赠页面显示 -->
    <FloatingDonationButton v-if="isDonationPage" />
    
    <!-- 回到顶部按钮 - 全站可用 -->
    <BackToTop />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import FloatingDonationButton from './components/FloatingDonationButton.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()

// 检查是否为捐赠页面
const isDonationPage = computed(() => {
  return route.name === 'donation' || route.path === '/donation'
})
</script>

<style>
/* 全局样式已在 style.css 中定义 */
</style>
