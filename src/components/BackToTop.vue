<template>
  <Transition name="back-to-top">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="back-to-top-button fixed bottom-24 right-6 z-50"
      aria-label="回到顶部"
    >
      <svg viewBox="0 0 384 512" class="svgIcon">
        <path
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
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
/* 回到顶部按钮样式 */
.back-to-top-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.back-to-top-button .svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.back-to-top-button .svgIcon path {
  fill: white;
}

.back-to-top-button:hover {
  width: 140px;
  border-radius: 50px;
  background-color: rgb(181, 160, 255);
}

.back-to-top-button:hover .svgIcon {
  transition-duration: 0.3s;
  transform: translateY(-200%);
}

.back-to-top-button::before {
  position: absolute;
  content: "回到顶部";
  color: white;
  font-size: 0px;
  white-space: nowrap;
}

.back-to-top-button:hover::before {
  font-size: 13px;
  opacity: 1;
  transition-duration: 0.3s;
}

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