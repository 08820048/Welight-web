<template>
  <!-- 模态框背景 -->
  <div 
    v-if="isVisible" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <!-- 模态框内容 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full modal-content"
      @click.stop
    >
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">支持我们</h2>
        </div>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="p-6">
        <p class="text-gray-600 dark:text-gray-300 mb-6 text-center">
          如果您觉得我们的软件对您有帮助，欢迎通过以下方式支持我们的开发工作
        </p>
        
        <!-- 赞助方式选择 -->
        <div class="flex justify-center space-x-4 mb-6">
          <button
            @click="activeTab = 'wechat'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === 'wechat' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            微信支付
          </button>
          <button
            @click="activeTab = 'alipay'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === 'alipay' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            支付宝
          </button>
        </div>

        <!-- 二维码显示区域 -->
        <div class="flex justify-center">
          <div class="bg-white p-4 rounded-lg shadow-inner">
            <img 
              :src="activeTab === 'wechat' ? '/wx.jpg' : '/zfb.jpg'"
              :alt="activeTab === 'wechat' ? '微信支付二维码' : '支付宝支付二维码'"
              class="w-48 h-48 object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <!-- 提示文字 -->
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
          {{ activeTab === 'wechat' ? '使用微信扫描上方二维码进行赞助' : '使用支付宝扫描上方二维码进行赞助' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// 当前激活的标签页
const activeTab = ref('wechat')

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 键盘事件处理
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isVisible) {
    closeModal()
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* 模态框动画 */
.modal-content {
  animation: modalFadeInUp 0.3s ease-out forwards;
}

@keyframes modalFadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>