<template>
  <Transition name="back-to-top">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-24 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="回到顶部"
    >
      <!-- 向上箭头图标 -->
      <svg
        class="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 回到顶部组件
 * 功能：
 * 1. 监听页面滚动，当滚动距离超过300px时显示按钮
 * 2. 点击按钮平滑滚动到页面顶部
 * 3. 包含淡入淡出动画效果
 */

// 按钮是否可见
const isVisible = ref(false)

/**
 * 处理页面滚动事件
 * 当滚动距离超过300px时显示按钮
 */
const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

/**
 * 平滑滚动到页面顶部
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 组件挂载时添加滚动监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始检查滚动位置
  handleScroll()
})

// 组件卸载时移除滚动监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 回到顶部按钮的进入/离开动画 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-enter-to,
.back-to-top-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>