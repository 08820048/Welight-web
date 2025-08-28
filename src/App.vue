<template>
  <div id="app">
    <Navbar />
    <main class="min-h-screen bg-white">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
/* 全局样式已在 style.css 中定义 */
</style>
