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
            <h2 class="text-lg font-semibold text-gray-900">更新日志</h2>
            <p class="text-sm text-gray-500">Welight 版本更新记录</p>
          </div>
          <button @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 内容区域 -->
        <div class="overflow-y-auto max-h-[calc(85vh-120px)] p-6">
          <!-- 调试信息 -->
          <div v-if="!changelogData || changelogData.length === 0" class="text-center py-8">
            <p class="text-gray-500">正在加载更新日志...</p>
          </div>

          <!-- 版本列表 -->
          <div v-else class="space-y-6">
            <!-- 动态渲染版本 -->
            <template v-for="version in changelogData" :key="version.version">
              <div class="relative pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <!-- 版本标题 -->
                <div class="flex items-start space-x-3 mb-3">
                  <div class="flex items-center space-x-2 flex-1">
                    <span class="text-base font-semibold text-gray-900">v{{ version.version }}</span>
                    <span class="px-2 py-0.5 text-xs rounded-md bg-gray-900 text-white">
                      {{ version.badge }}
                    </span>
                  </div>
                  <span class="text-xs text-gray-500">{{ formatDate(version.date) }}</span>
                </div>

                <!-- 更新内容 -->
                <div class="space-y-3">
                  <!-- 动态渲染更新类型 -->
                  <template v-for="(changes, changeType) in version.changes" :key="changeType">
                    <div v-if="changes && changes.length > 0">
                      <h4 class="text-xs font-medium mb-1.5 text-gray-900">
                        {{ getChangeTypeConfig(changeType).icon }} {{ getChangeTypeConfig(changeType).title }}
                      </h4>
                      <ul class="space-y-1 text-sm text-gray-600">
                        <li v-for="change in changes" :key="change" class="flex items-start space-x-2">
                          <span class="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{{ change }}</span>
                        </li>
                      </ul>
                    </div>
                  </template>
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

/* 自定义滚动条 */
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
