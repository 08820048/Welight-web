<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8 pt-24">
      <!-- 页面描述 -->
      <div class="text-center mb-12 scroll-animate animate-fade-in-up delay-100">
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

      <!-- 致谢名单 -->
      <div class="scroll-animate animate-fade-in-up delay-400">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          致谢名单
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
                      {{ formatDate(donation.date) }}
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
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
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
        你的每一份捐赠都意义非凡！ <span class="text-green-500"></span> 
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
 * 初始化数据
 */
function initData() {
  // 获取所有捐赠数据
  const donations = getAllDonations()
  allDonations.value = donations.map(donation => ({
    ...donation,
    date: donation.donationDate // 映射日期字段
  }))
  
  specialDonations.value = getSpecialDonations()
  stats.value = getDonationStats()
  
  // 数据加载完成后启动动画
  setTimeout(() => {
    startStatsAnimation()
  }, 500)
}

// 防抖函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 缓存DOM元素，避免重复查询
let scrollElements = []

/**
 * 滚动动画处理（优化版本）
 */
function handleScrollAnimation() {
  // 使用缓存的元素列表
  scrollElements.forEach(element => {
    // 检查元素是否已经动画过
    if (element.classList.contains('animate-in-view')) {
      return
    }
    
    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
    
    if (isVisible) {
      element.classList.add('animate-in-view')
    }
  })
}

// 创建防抖版本的滚动处理函数
const debouncedScrollHandler = debounce(handleScrollAnimation, 16) // 约60fps

/**
 * 组件挂载时初始化数据和动画
 */
onMounted(() => {
  initData()
  
  // 缓存滚动动画元素
  setTimeout(() => {
    scrollElements = Array.from(document.querySelectorAll('.scroll-animate'))
    handleScrollAnimation()
  }, 100)
  
  // 监听滚动事件（使用防抖版本）
  window.addEventListener('scroll', debouncedScrollHandler, { passive: true })
})

/**
 * 组件卸载时清理事件监听
 */
onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScrollHandler)
  scrollElements = []
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

/* 渐变动画（优化版本） */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 15s ease-in-out infinite;
  will-change: background-position;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 扁平化卡片样式（优化版本） */
.flat-card {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.2s ease, 
              background-color 0.2s ease;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  will-change: transform;
}

.dark .flat-card {
  background: rgba(31, 41, 55, 0.8);
}

.flat-card:hover {
  transform: translateY(-1px) translateZ(0);
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






</style>