<template>
  <!-- 模态框背景 -->
  <div 
    v-if="isVisible" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <!-- 模态框内容 -->
    <div 
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in-up"
      @click.stop
    >
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">更新日志</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Welight 版本更新记录</p>
          </div>
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
      <div class="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
        <!-- 版本列表 -->
        <div class="space-y-8">
          <!-- 动态渲染版本 -->
          <template v-for="(version, index) in changelogData" :key="version.version">
            <div class="relative">
              <!-- 版本标题 -->
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-3 h-3 rounded-full" :class="getStatusDotClass(version.type)"></div>
                <div class="flex items-center space-x-2">
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">v{{ version.version }}</span>
                  <span class="px-2 py-1 text-xs rounded-full" :class="getBadgeClass(version.badgeColor)">
                    {{ version.badge }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(version.date) }}</span>
              </div>

              <!-- 更新内容 -->
              <div class="ml-6 space-y-4">
                <!-- 动态渲染更新类型 -->
                <template v-for="(changes, changeType) in version.changes" :key="changeType">
                  <div v-if="changes && changes.length > 0">
                    <h4 class="text-sm font-medium mb-2" :class="getChangeTypeConfig(changeType).color">
                      {{ getChangeTypeConfig(changeType).icon }} {{ getChangeTypeConfig(changeType).title }}
                    </h4>
                    <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li v-for="change in changes" :key="change" class="flex items-start space-x-2">
                        <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{{ change }}</span>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </div>

            <!-- 分割线 (除了最后一个版本) -->
            <div v-if="index < changelogData.length - 1" class="border-l-2 border-gray-200 dark:border-gray-700 ml-1.5 h-8"></div>
          </template>
        </div>
      </div>

      <!-- 底部 -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            想要了解更多？访问我们的 
            <a href="https://github.com/08820048/Welight-web" target="_blank" class="text-primary-600 hover:text-primary-700 underline">GitHub 仓库</a>
          </div>
          <button 
            @click="closeModal"
            class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
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
  changelogData,
  formatDate,
  getBadgeClass,
  getStatusDotClass,
  getChangeTypeConfig
} from '@/data/changelog.js'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

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
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* 深色模式滚动条 */
.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.7);
}
</style>
