<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8 pt-24">
      <!-- 页面标题 -->
      <div class="text-center mb-12 scroll-animate animate-fade-in-up delay-100">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          捐赠支持
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          您的捐赠将用于支持软件的持续开发、服务器维护、功能优化和技术支持，让更多用户受益于优质的软件体验。
        </p>
      </div>

      <!-- 统计信息卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 scroll-animate animate-fade-in-up delay-200">
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center flat-card">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 tabular-nums">
            ¥{{ animatedTotalAmount.toLocaleString() }}
          </div>
          <div class="text-gray-600 dark:text-gray-300">总捐赠金额</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center flat-card">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 tabular-nums">
            {{ animatedTotalCount }}
          </div>
          <div class="text-gray-600 dark:text-gray-300">捐赠次数</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center flat-card">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 tabular-nums">
            {{ animatedSpecialCount }}
          </div>
          <div class="text-gray-600 dark:text-gray-300">特别捐赠</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center flat-card">
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 tabular-nums">
            ¥{{ animatedAverageAmount.toLocaleString() }}
          </div>
          <div class="text-gray-600 dark:text-gray-300">平均金额</div>
        </div>
      </div>

      <!-- 特别捐赠展示 -->
      <div v-if="specialDonations.length > 0" class="mb-12 scroll-animate animate-fade-in-up delay-300">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          特别捐赠
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="donation in specialDonations" 
            :key="donation.id"
            class="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 border-2 border-yellow-300 dark:border-yellow-600 flat-card"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ donation.specialTag }}
              </span>
              <span class="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                {{ formatAmount(donation.amount) }}
              </span>
            </div>
            <div class="space-y-2">
              <div class="text-gray-700 dark:text-gray-300">
                <span class="font-medium">捐赠者：</span>{{ donation.donorName }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 text-sm">
                <span class="font-medium">时间：</span>{{ formatDate(donation.donationDate) }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 text-sm">
                <span class="font-medium">渠道：</span>{{ donation.channel }}
              </div>
              <div v-if="donation.message" class="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div class="text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">留言：</div>
                <div class="text-gray-800 dark:text-gray-200">{{ donation.message }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 所有捐赠记录 -->
      <div class="scroll-animate animate-fade-in-up delay-400">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          捐赠记录
        </h2>
        
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flat-card">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    捐赠者
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    金额
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    时间
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    渠道
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    留言
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    标识
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                <tr 
                  v-for="donation in allDonations" 
                  :key="donation.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  :class="{ 'bg-yellow-50 dark:bg-yellow-900/20': donation.isSpecial }"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ donation.donorName }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-bold text-green-600 dark:text-green-400">
                      {{ formatAmount(donation.amount) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600 dark:text-gray-300">
                      {{ formatDate(donation.donationDate) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600 dark:text-gray-300">
                      {{ donation.channel }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" :title="donation.message">
                      {{ donation.message || '-' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      v-if="donation.isSpecial" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 animate-pulse special-glow"
                    >
                      {{ donation.specialTag }}
                    </span>
                    <span v-else class="text-gray-400 dark:text-gray-500">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 感谢信息 -->
    <!-- 固定背景致谢文字 -->
    <div class="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
      <div class="background-text text-6xl font-bold text-center leading-relaxed opacity-5">
        每一份捐赠都是对 <span class="text-green-500">Welight</span> 的支持和鼓励
      </div>
    </div>

    <!-- 弹幕留言系统 -->
    <div class="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <div 
        v-for="(barrage, index) in visibleBarrages" 
        :key="barrage.id"
        class="absolute whitespace-nowrap text-lg font-medium opacity-80 barrage-item"
        :style="{
          top: barrage.top + 'px',
          left: barrage.left + 'px',
          color: barrage.color,
          animationDuration: barrage.duration + 's',
          animationDelay: barrage.delay + 's'
        }"
      >
        {{ barrage.message }}
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getAllDonations, getSpecialDonations, getDonationStats, formatAmount, formatDate } from '@/data/donations.js'

/**
 * 响应式数据
 */
const allDonations = ref([])
const specialDonations = ref([])
const stats = ref({
  totalAmount: 0,
  totalCount: 0,
  specialCount: 0,
  averageAmount: 0
})

/**
 * 动画数据
 */
const animatedTotalAmount = ref(0)
const animatedTotalCount = ref(0)
const animatedSpecialCount = ref(0)
const animatedAverageAmount = ref(0)

/**
 * 弹幕系统数据
 */
const visibleBarrages = ref([])
const barrageColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']
const maxVisibleBarrages = 8 // 最大同时显示的弹幕数量
let barrageInterval = null
let barrageIdCounter = 0

/**
 * 数字递增动画函数
 */
function animateNumber(from, to, duration, callback) {
  const fromNum = Number(from) || 0
  const toNum = Number(to) || 0
  const durationNum = Number(duration) || 1000

  const startTime = Date.now()
  const difference = toNum - fromNum

  const step = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / durationNum, 1)

    // 使用缓动函数，让动画更自然
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(fromNum + difference * easeOutQuart)

    callback(current)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      callback(toNum) // 确保最终值准确
    }
  }

  requestAnimationFrame(step)
}

/**
 * 启动统计数据动画
 */
function startStatsAnimation() {
  // 总捐赠金额动画
  animateNumber(0, stats.value.totalAmount, 2000, (value) => {
    animatedTotalAmount.value = value
  })

  // 捐赠次数动画
  animateNumber(0, stats.value.totalCount, 1800, (value) => {
    animatedTotalCount.value = value
  })

  // 特别捐赠动画
  animateNumber(0, stats.value.specialCount, 1600, (value) => {
    animatedSpecialCount.value = value
  })

  // 平均金额动画
  animateNumber(0, stats.value.averageAmount, 1400, (value) => {
    animatedAverageAmount.value = value
  })
}

/**
 * 获取所有有效留言
 */
function getValidMessages() {
  const messages = []
  allDonations.value.forEach(donation => {
    if (donation.message && donation.message.trim()) {
      messages.push({
        text: donation.message.trim(),
        donor: donation.donorName || '匿名'
      })
    }
  })
  return messages
}

/**
 * 创建新弹幕
 */
function createBarrage() {
  const messages = getValidMessages()
  if (messages.length === 0) return

  // 随机选择一条留言
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  
  // 生成弹幕对象
  const barrage = {
    id: ++barrageIdCounter,
    message: `${randomMessage.donor}: ${randomMessage.text}`,
    top: Math.random() * (window.innerHeight - 200) + 100, // 避免太靠近顶部和底部
    left: window.innerWidth, // 从右侧开始
    color: barrageColors[Math.floor(Math.random() * barrageColors.length)],
    duration: Math.random() * 5 + 8, // 8-13秒的动画时长
    delay: 0
  }

  // 添加到可见弹幕列表
  visibleBarrages.value.push(barrage)

  // 性能优化：限制最大弹幕数量
  if (visibleBarrages.value.length > maxVisibleBarrages) {
    visibleBarrages.value.shift() // 移除最早的弹幕
  }

  // 设置定时器移除弹幕
  setTimeout(() => {
    const index = visibleBarrages.value.findIndex(b => b.id === barrage.id)
    if (index > -1) {
      visibleBarrages.value.splice(index, 1)
    }
  }, barrage.duration * 1000 + 1000) // 动画结束后1秒移除
}

/**
 * 启动弹幕系统
 */
function startBarrageSystem() {
  const messages = getValidMessages()
  if (messages.length === 0) return

  // 每3-6秒创建一个新弹幕
  const createNextBarrage = () => {
    createBarrage()
    const nextDelay = Math.random() * 3000 + 3000 // 3-6秒
    barrageInterval = setTimeout(createNextBarrage, nextDelay)
  }

  createNextBarrage()
}

/**
 * 停止弹幕系统
 */
function stopBarrageSystem() {
  if (barrageInterval) {
    clearTimeout(barrageInterval)
    barrageInterval = null
  }
  visibleBarrages.value = []
}

/**
 * 初始化数据
 */
function initData() {
  allDonations.value = getAllDonations()
  specialDonations.value = getSpecialDonations()
  stats.value = getDonationStats()
  
  // 数据加载完成后启动动画
  setTimeout(() => {
    startStatsAnimation()
  }, 500)
}

/**
 * 滚动动画处理
 */
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.scroll-animate')
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
    
    if (isVisible) {
      element.classList.add('animate-in-view')
    }
  })
}

/**
 * 组件挂载时初始化数据和动画
 */
onMounted(() => {
  initData()
  
  // 初始检查可见元素
  setTimeout(() => {
    handleScrollAnimation()
  }, 100)
  
  // 启动弹幕系统
  setTimeout(() => {
    startBarrageSystem()
  }, 2000) // 延迟2秒启动，让页面先加载完成
  
  // 监听滚动事件
  window.addEventListener('scroll', handleScrollAnimation)
})

/**
 * 组件卸载时清理事件监听
 */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollAnimation)
  stopBarrageSystem() // 停止弹幕系统
})
</script>

<style scoped>
/* 自定义样式 */
.container {
  max-width: 1200px;
}

/* 表格响应式优化 */
@media (max-width: 768px) {
  .overflow-x-auto {
    font-size: 0.875rem;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}

/* 渐变动画 */
.bg-gradient-to-br {
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 扁平化卡片样式 */
.flat-card {
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.dark .flat-card {
  background: rgba(31, 41, 55, 0.8);
}

.flat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(255, 255, 255, 0.95);
}

.dark .flat-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(31, 41, 55, 0.95);
}

/* 数字字体样式 */
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}

/* 固定背景文字样式 */
.background-text {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(102, 126, 234, 0.1);
}

/* 弹幕动画样式 */
.barrage-item {
  animation: barrageMove linear forwards;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-weight: 600;
  border-radius: 20px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes barrageMove {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(-120vw);
    opacity: 0;
  }
}
</style>