<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />

    <!-- 悬浮捐赠按钮 -->
    <FloatingDonationButton />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import FloatingDonationButton from './components/FloatingDonationButton.vue'
</script>

<style>
/* 全局样式已在 style.css 中定义 */
</style>
