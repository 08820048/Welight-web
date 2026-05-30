<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[110] flex items-center justify-center bg-black/55 p-4 pt-20 backdrop-blur-sm animate-fade-in"
      @click="closeModal"
    >
      <div
        class="surface-soft modal-content w-full max-w-xl overflow-hidden rounded-[28px]"
        @click.stop
      >
        <div class="sections-enter is-visible flex items-start justify-between border-b border-gray-200/80 p-6">
          <div class="flex items-start gap-4">
            <div
              class="surface-stat inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl"
              aria-hidden="true"
            >
              📘
            </div>
            <div class="space-y-2">
              <h2 class="text-lg font-semibold text-gray-900">文档提示</h2>
              <p class="text-sm leading-6 text-gray-500">
                我们正在积极对产品进行改版优化，您当前的文档内容可能会和实际界面有所差异，感谢理解！
              </p>
            </div>
          </div>
          <button
            @click="closeModal"
            class="inline-flex h-10 w-10 items-center justify-center p-1 text-gray-400 transition-colors hover:text-gray-700"
            aria-label="关闭提示"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="border-t border-gray-200/80 p-4">
          <div class="flex justify-end gap-3">
            <button
              @click="closeModal"
              class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              取消
            </button>
            <button
              @click="confirmModal"
              class="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              我知道了
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => {
  emit('close')
}

const confirmModal = () => {
  emit('confirm')
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isVisible) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
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

.modal-content {
  animation: modalZoomIn 0.24s ease-out;
}

@keyframes modalZoomIn {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
