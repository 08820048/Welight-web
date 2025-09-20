<template>
  <!-- 悬浮捐赠按钮 -->
  <div class="fixed bottom-6 right-6 z-40">
    <button
      @click="openDonationModal"
      class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
      title="支持我们"
    >
      <!-- 爱心图标 -->
      <svg 
        class="w-6 h-6 group-hover:animate-pulse" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      
      <!-- 文字标签 -->
      <span class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        捐赠支持
        <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </span>
    </button>
  </div>

  <!-- 捐赠模态框 -->
  <DonationModal 
    :isVisible="showDonationModal" 
    @close="closeDonationModal" 
  />
</template>

<script setup>
import { ref } from 'vue'
import DonationModal from './DonationModal.vue'

// 控制模态框显示
const showDonationModal = ref(false)

/**
 * 打开捐赠模态框
 */
const openDonationModal = () => {
  showDonationModal.value = true
}

/**
 * 关闭捐赠模态框
 */
const closeDonationModal = () => {
  showDonationModal.value = false
}
</script>

<style scoped>
/* 悬浮按钮的脉冲动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 按钮悬停时的发光效果 */
button:hover {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}
</style>