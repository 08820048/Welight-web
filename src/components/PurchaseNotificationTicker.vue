<template>
  <!-- 弹幕容器 - 固定在页面顶部 -->
  <div class="fixed top-20 left-0 right-0 z-20 pointer-events-none overflow-hidden h-32">
    <transition-group name="danmaku" tag="div" class="relative w-full h-full">
      <div v-for="item in activeDanmaku" :key="item.id" :style="{
        top: `${item.lane * 36}px`,
        animationDuration: `${item.duration}s`
      }" class="absolute right-0 danmaku-item whitespace-nowrap">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 text-xs text-gray-600">
          <span class="text-pink-500 font-medium">恭喜</span>
          <span class="font-medium text-gray-900">{{ item.purchase.customerName }}</span>
          <span class="text-gray-400">购买了</span>
          <span class="font-medium text-gray-900">{{ getDisplayProductName(item.purchase) }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getRecentPurchases } from '@/services/recentPurchasesService.js'

const props = defineProps({
  // 请求的最大记录条数
  limit: {
    type: Number,
    default: 10
  },
  // 弹幕发射间隔（毫秒）
  interval: {
    type: Number,
    default: 5000
  },
  // 弹幕轨道数量
  lanes: {
    type: Number,
    default: 3
  }
})

const purchases = ref([])
const isLoading = ref(true)
const activeDanmaku = ref([])
const currentIndex = ref(0)
let danmakuIdCounter = 0

let timer = null

const hasData = computed(() => purchases.value.length > 0)

// 生成随机弹幕持续时间（8-12秒）
function getRandomDuration() {
  return 8 + Math.random() * 4
}

// 获取可用的轨道（避免碰撞）
function getAvailableLane() {
  // 简单策略：随机选择一个轨道
  return Math.floor(Math.random() * props.lanes)
}

function getDisplayProductName(purchase) {
  if (!purchase) return ''
  const name = purchase.productName || ''
  if (!name) return ''
  // 包含“许可证”的都认为是许可证产品，不追加“积分套餐”
  if (name.includes('许可证')) {
    return name
  }
  // 非许可证产品：如果已经带有“积分套餐”字样，避免重复；否则补上
  if (name.includes('积分套餐')) {
    return name
  }
  return `${name}积分套餐`
}

// 发射一条弹幕
function shootDanmaku() {
  if (!purchases.value.length) return

  const purchase = purchases.value[currentIndex.value]
  const duration = getRandomDuration()
  const lane = getAvailableLane()

  const danmaku = {
    id: `danmaku-${danmakuIdCounter++}-${Date.now()}`,
    purchase,
    duration,
    lane
  }

  console.log('[PurchaseNotificationTicker] 发射弹幕:', danmaku.purchase.customerName, danmaku.purchase.productName, '轨道:', lane, '时长:', duration)
  activeDanmaku.value.push(danmaku)

  // 动画结束后移除
  setTimeout(() => {
    const index = activeDanmaku.value.findIndex(d => d.id === danmaku.id)
    if (index > -1) {
      activeDanmaku.value.splice(index, 1)
    }
  }, duration * 1000)

  // 移动到下一条记录
  currentIndex.value = (currentIndex.value + 1) % purchases.value.length
}

async function loadPurchases() {
  isLoading.value = true

  try {
    const data = await getRecentPurchases(props.limit)
    console.log('[PurchaseNotificationTicker] 获取到购买数据:', data)
    if (Array.isArray(data) && data.length > 0) {
      purchases.value = data
      currentIndex.value = 0
      console.log('[PurchaseNotificationTicker] 开始启动弹幕，共', data.length, '条记录')
      startDanmaku()
    } else {
      purchases.value = []
      console.log('[PurchaseNotificationTicker] 没有购买数据')
    }
  } catch (error) {
    console.error('[PurchaseNotificationTicker] 加载最近购买记录失败:', error)
  } finally {
    isLoading.value = false
  }
}

function startDanmaku() {
  stopDanmaku()
  if (purchases.value.length === 0) return

  // 立即发射第一条
  shootDanmaku()

  // 定时发射后续弹幕
  timer = setInterval(() => {
    shootDanmaku()
  }, props.interval)
}

function stopDanmaku() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  activeDanmaku.value = []
}

onMounted(() => {
  loadPurchases()
})

onUnmounted(() => {
  stopDanmaku()
})
</script>

<style scoped>
/* 弹幕动画 - 从右到左 */
.danmaku-item {
  animation: danmaku-move linear forwards;
}

@keyframes danmaku-move {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(calc(-100vw - 100%));
    opacity: 1;
  }
}

/* 进入和离开动画 */
.danmaku-enter-active {
  transition: opacity 0.3s ease;
}

.danmaku-leave-active {
  transition: opacity 0.3s ease;
}

.danmaku-enter-from,
.danmaku-leave-to {
  opacity: 0;
}
</style>
