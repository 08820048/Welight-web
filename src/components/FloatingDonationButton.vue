<template>
  <!-- 悬浮赞助按钮 -->
  <div class="fixed bottom-6 right-6 z-40">
    <button
      @click="openDonationModal"
      class="flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#ffffff] px-4 py-2 text-sm font-semibold text-[#1B365D] transition-colors hover:bg-[#f0f0f0] dark:border-[#44433f] dark:bg-[#1B365D] dark:text-[#D0DCE9] dark:hover:bg-[#2D5A8A]"
      title="支持我们"
    >
      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      赞助支持
    </button>
  </div>

  <!-- 赞助模态框 -->
  <DonationModal
    :isVisible="showDonationModal"
    @close="closeDonationModal"
  />
</template>

<script setup>
import { ref } from 'vue'
import DonationModal from './DonationModal.vue'

// 控制模态框显示
const showDonationModal = ref(false)

/**
   * 打开赞助模态框
   */
const openDonationModal = () => {
  showDonationModal.value = true
}

/**
   * 关闭赞助模态框
   */
const closeDonationModal = () => {
  showDonationModal.value = false
}
</script>
