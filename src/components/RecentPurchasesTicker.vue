<template>
  <!-- 有数据时显示滚动条 -->
  <div
    v-if="hasData"
    class="mb-8 flex items-center gap-4 overflow-hidden"
  >
    <div class="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
      <span class="text-gray-600">最近购买</span>
    </div>

    <div class="relative flex-1 min-h-[1.5rem]">
      <transition name="recent-fade" mode="out-in">
        <div
          v-if="currentPurchase"
          :key="currentKey"
          class="absolute inset-0 flex items-center text-sm text-gray-700 whitespace-nowrap overflow-hidden"
        >
          <span class="font-medium text-gray-900 mr-2">{{ currentPurchase.customerName }}</span>
          <span class="mr-2 text-gray-500">{{ currentPurchase.purchaseTypeDescription }}</span>
          <span class="mr-2 text-gray-900">{{ currentPurchase.productName }}</span>
          <span v-if="amountText" class="mr-2 text-gray-700">{{ amountText }}</span>
          <span class="ml-auto text-xs text-gray-500">{{ currentPurchase.relativeTime }}</span>
        </div>
      </transition>
    </div>
  </div>

  <!-- 加载中时可选占位，不显示具体内容，避免版式跳动 -->
  <div
    v-else-if="isLoading"
    class="mb-8 flex items-center justify-center gap-2 text-xs text-gray-400"
  >
    <span
      class="h-3 w-3 rounded-full border border-gray-300 border-t-transparent animate-spin"
    ></span>
    <span>正在加载最近购买...</span>
  </div>

  <!-- 空数据或错误时也给一个轻量提示，避免组件完全消失 -->
  <div
    v-else
    class="mb-8 flex items-center gap-2 text-xs text-gray-400"
  >
    <span>{{ hasError ? '最近购买数据暂不可用' : '暂无最近购买记录' }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getRecentPurchases } from '@/services/recentPurchasesService.js'

const props = defineProps({
  // 请求的最大记录条数
  limit: {
    type: Number,
    default: 5
  },
  // 轮播间隔（毫秒）
  interval: {
    type: Number,
    default: 5000
  }
})

const purchases = ref([])
const isLoading = ref(true)
const hasError = ref(false)
const currentIndex = ref(0)

let timer = null

const hasData = computed(() => purchases.value.length > 0)

const currentPurchase = computed(() => {
  if (!purchases.value.length) return null
  return purchases.value[currentIndex.value] || null
})

const currentKey = computed(() => {
  const item = currentPurchase.value
  if (!item) return 'empty'
  return `${currentIndex.value}-${item.purchaseTime || ''}`
})

const amountText = computed(() => {
  const item = currentPurchase.value
  if (!item || typeof item.amount !== 'number') return ''
  const symbol = item.currency === 'CNY' ? '¥' : item.currency || ''
  return `${symbol}${item.amount.toFixed(2)}`
})

async function loadPurchases() {
  isLoading.value = true
  hasError.value = false

  try {
    const data = await getRecentPurchases(props.limit)
    if (Array.isArray(data) && data.length > 0) {
      purchases.value = data
      currentIndex.value = 0
      startRotation()
    } else {
      purchases.value = []
    }
  } catch (error) {
    console.error('[RecentPurchasesTicker] 加载最近购买记录失败:', error)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

function startRotation() {
  stopRotation()
  if (purchases.value.length <= 1) return

  timer = setInterval(() => {
    if (!purchases.value.length) return
    currentIndex.value = (currentIndex.value + 1) % purchases.value.length
  }, props.interval)
}

function stopRotation() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  loadPurchases()
})

onUnmounted(() => {
  stopRotation()
})
</script>

<style scoped>
.recent-fade-enter-active,
.recent-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.recent-fade-enter-from,
.recent-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>

