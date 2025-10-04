<template>
  <!-- 模态框背景 -->
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4"
    @click="closeModal">
    <!-- 模态框内容 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden modal-content"
      @click.stop>
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">公告通知</h2>
        </div>
        <button @click="closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <!-- 公告列表 -->
        <div class="space-y-8">
          <!-- 动态渲染公告 -->
          <template v-for="(announcement, index) in announcementData" :key="announcement.id">
            <div class="relative">
              <!-- 公告标题 -->
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-3 h-3 rounded-full" :class="getStatusDotClass(announcement.type)"></div>
                <div class="flex items-center space-x-2">
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ announcement.title }}</span>
                  <span class="px-2 py-1 text-xs rounded-full border" :class="getBadgeClass(announcement.badgeColor)">
                    {{ announcement.badge }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(announcement.date) }}</span>
              </div>

              <!-- 公告内容 -->
              <div class="ml-6">
                <div class="prose prose-sm max-w-none dark:prose-invert">
                  <div v-html="renderMarkdown(announcement.content)" class="text-gray-600 dark:text-gray-300"></div>
                </div>
              </div>
            </div>

            <!-- 分割线 (除了最后一个公告) -->
            <div v-if="index < announcementData.length - 1"
              class="border-l-2 border-gray-200 dark:border-gray-700 ml-1.5 h-8"></div>
          </template>
        </div>
      </div>

      <!-- 底部 -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <!--          <div class="text-sm text-gray-500 dark:text-gray-400">-->
          <!--            想要了解更多？访问我们的 -->
          <!--            <a href="https://github.com/08820048/Welight-web" target="_blank" class="text-primary-600 hover:text-primary-700 underline">GitHub 仓库</a>-->
          <!--          </div>-->
          <button @click="closeModal"
            class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
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

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 深色模式滚动条 */
.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
