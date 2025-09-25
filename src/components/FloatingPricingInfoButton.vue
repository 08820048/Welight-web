<template>
  <!-- 悬浮定价说明按钮 -->
  <div class="fixed bottom-6 right-6 z-40">
    <button
      @click="openPricingInfoModal"
      class="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
      title="定价说明"
    >
      <!-- 信息图标 -->
      <svg 
        class="w-6 h-6 group-hover:animate-pulse" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      <!-- 文字标签 -->
      <span class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        定价说明
        <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </span>
    </button>
  </div>

  <!-- 定价说明模态框 -->
  <PricingInfoModal 
    :isVisible="showPricingInfoModal" 
    @close="closePricingInfoModal" 
  />
</template>

<script setup>
import { ref } from 'vue'
import PricingInfoModal from './PricingInfoModal.vue'

// 控制模态框显示
const showPricingInfoModal = ref(false)

/**
 * 打开定价说明模态框
 */
const openPricingInfoModal = () => {
  showPricingInfoModal.value = true
}

/**
 * 关闭定价说明模态框
 */
const closePricingInfoModal = () => {
  showPricingInfoModal.value = false
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
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}
</style>
