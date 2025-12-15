<template>
  <teleport to="body">
    <!-- 模态框背景 -->
    <div v-if="isVisible" class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 pt-20 animate-fade-in"
      @click="closeModal">
      <!-- 模态框内容 -->
      <div
        class="bg-white border border-gray-200 rounded-lg shadow-lg max-w-4xl w-full max-h-[85vh] overflow-hidden modal-content"
        @click.stop>
        <!-- 头部 -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex flex-col space-y-2">
            <h2 class="text-lg font-semibold text-gray-900">公告通知</h2>
            <p class="text-sm text-gray-500">Welight 重要公告和通知</p>
          </div>
          <button @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 内容区域 -->
        <div class="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          <!-- 公告列表 -->
          <div class="space-y-6">
            <!-- 动态渲染公告 -->
            <template v-for="announcement in announcementData" :key="announcement.id">
              <div class="relative pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <!-- 公告标题 -->
                <div class="flex items-start space-x-3 mb-3">
                  <div class="flex items-center space-x-2 flex-1">
                    <span class="text-base font-semibold text-gray-900">{{ announcement.title }}</span>
                    <span class="px-2 py-0.5 text-xs rounded-md bg-gray-900 text-white">
                      {{ announcement.badge }}
                    </span>
                  </div>
                  <span class="text-xs text-gray-500">{{ formatDate(announcement.date) }}</span>
                </div>

                <!-- 公告内容 -->
                <div>
                  <div class="prose prose-sm max-w-none">
                    <div v-html="renderMarkdown(announcement.content)" class="text-sm text-gray-600"></div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- 底部 -->
        <div class="border-t border-gray-200 p-4 flex justify-end">
          <button @click="closeModal"
            class="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-md transition-colors">
            关闭
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  announcementData,
  formatDate,
  getBadgeClass,
  getStatusDotClass,
  markLatestAnnouncementAsViewed
} from '@/data/announcements.js'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// 简单的 Markdown 渲染函数
const renderMarkdown = (content) => {
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-base font-medium mb-2 text-gray-700 dark:text-gray-300">$1</h3>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md my-4 mx-auto block" loading="lazy" />')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br>')
    .replace(/^(.*)$/gm, '<p class="mb-4">$1</p>')
}

// 关闭模态框
const closeModal = () => {
  // 标记最新公告为已查看
  markLatestAnnouncementAsViewed()
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
/* 淡入动画 */
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 模态框动画 */
.modal-content {
  animation: modalZoomIn 0.2s ease-out;
}

@keyframes modalZoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
