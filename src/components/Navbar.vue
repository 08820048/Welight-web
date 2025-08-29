<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group hover:opacity-80 transition-opacity duration-200">
          <img src="/logo.png" alt="Welight Logo" class="w-8 h-8 rounded-lg">
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
          </div>

          <!-- 更新日志按钮 -->
          <button
            @click="showChangelog"
            class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="查看更新日志"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">更新日志</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 更新日志模态框 -->
    <ChangelogModal
      :isVisible="isChangelogVisible"
      @close="closeChangelog"
    />
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import ChangelogModal from './ChangelogModal.vue'

// 更新日志模态框状态
const isChangelogVisible = ref(false)

// 显示更新日志
const showChangelog = () => {
  isChangelogVisible.value = true
}

// 关闭更新日志
const closeChangelog = () => {
  isChangelogVisible.value = false
}
</script>
