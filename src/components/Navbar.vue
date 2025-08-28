<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group hover:opacity-80 transition-opacity duration-200">
          <span class="text-xl font-bold relative logo-gradient-text cursor-pointer">
            Welight
          </span>
          <sup class="text-xs text-gray-500 ml-1 font-normal">v2.0.0</sup>
        </router-link>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-4">
          <!-- Documentation links -->
          <div class="hidden md:flex items-center space-x-6">
            <a href="https://ilikexff.cn" class="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              文档
            </a>
            <a href="/download" class="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              下载
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 简化的导航栏，只保留基本功能
</script>
