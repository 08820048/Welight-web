<template>
  <!-- 模态框背景 -->
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <!-- 模态框内容 -->
    <div
      class="w-full max-w-md rounded-lg border border-[#d8d3c4] bg-[#f5f4ed] modal-content dark:border-[#44433f] dark:bg-[#141413]"
      @click.stop
    >
      <!-- 头部 -->
      <div class="flex items-center justify-between border-b border-[#d8d3c4] px-6 py-5 dark:border-[#44433f]">
        <h2 class="text-lg font-semibold text-[#1B365D] dark:text-[#D0DCE9]">赞助支持</h2>
        <button
          @click="closeModal"
          class="rounded-md p-1 text-[#6b6a64] transition-colors hover:text-[#141413] dark:text-[#817d72] dark:hover:text-[#f5f4ed]"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="px-6 py-6">
        <p class="mb-6 text-center text-sm leading-6 text-[#504e49] dark:text-[#d6d1c4]">
          如果您觉得我们的软件对您有帮助，欢迎通过以下方式支持我们的开发工作
        </p>

        <!-- 赞助方式选择 -->
        <div class="mb-6 flex justify-center gap-3">
          <button
            @click="activeTab = 'wechat'"
            :class="[
              'rounded-md px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'wechat'
                ? 'bg-[#1B365D] text-white dark:bg-[#D0DCE9] dark:text-[#141413]'
                : 'border border-[#d8d3c4] text-[#504e49] hover:bg-[#ebe8dc] dark:border-[#44433f] dark:text-[#d6d1c4] dark:hover:bg-[#30302e]'
            ]"
          >
            微信支付
          </button>
          <button
            @click="activeTab = 'alipay'"
            :class="[
              'rounded-md px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'alipay'
                ? 'bg-[#1B365D] text-white dark:bg-[#D0DCE9] dark:text-[#141413]'
                : 'border border-[#d8d3c4] text-[#504e49] hover:bg-[#ebe8dc] dark:border-[#44433f] dark:text-[#d6d1c4] dark:hover:bg-[#30302e]'
            ]"
          >
            支付宝
          </button>
        </div>

        <!-- 二维码显示区域 -->
        <div class="flex justify-center">
          <div class="rounded-lg border border-[#d8d3c4] bg-white p-4 dark:border-[#44433f]">
            <img
              :src="activeTab === 'wechat' ? '/wx.jpg' : '/zfb.jpg'"
              :alt="activeTab === 'wechat' ? '微信支付二维码' : '支付宝支付二维码'"
              class="h-48 w-48 object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <!-- 提示文字 -->
        <p class="mt-4 text-center text-xs text-[#6b6a64] dark:text-[#817d72]">
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
    transform: translateY(12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>