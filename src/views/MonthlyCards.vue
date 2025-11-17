<template>
  <div class="relative min-h-screen bg-white">
    <AnimatedGridPattern
      :num-squares="50"
      :max-opacity="0.15"
      :duration="4"
    />
    <div class="min-h-screen text-gray-200 pt-32 pb-12 px-4 relative overflow-hidden" style="position: relative; z-index: 1;">
    <div class="max-w-4xl mx-auto">
      <!-- 标题区 -->
      <div class="text-center mb-12 scroll-animate fade-in-up" style="transition-delay: 0.1s;">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in-up delay-100">我的月卡服务</h1>
        <p class="text-xl text-gray-600 animate-fade-in-up delay-200">管理您的AI服务和云存储月卡</p>
      </div>

      <!-- 查询表单 -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-8 scroll-animate scale-up"
        style="transition-delay: 0.3s;">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
            <input v-model="queryForm.customerEmail" type="email" placeholder="输入购买时使用的邮箱"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">服务类型</label>
            <select v-model="queryForm.serviceType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">全部</option>
              <option value="AI_SERVICE">AI服务</option>
              <option value="CLOUD_STORAGE">云存储服务</option>
            </select>
          </div>
          <div class="md:w-32 flex items-end">
            <button @click="queryCards" :disabled="loading || !queryForm.customerEmail"
              class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
              查询
            </button>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p class="mt-2 text-gray-600">正在查询月卡信息...</p>
      </div>

      <!-- 错误信息 -->
      <div v-if="errorMsg" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="text-red-700">{{ errorMsg }}</div>
      </div>

      <!-- 月卡列表 -->
      <div v-if="!loading && monthlyCards.length > 0" class="space-y-6">
        <div v-for="(card, index) in monthlyCards" :key="card.id"
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:bg-white/90 transition-all duration-300 scroll-animate fade-in-up"
          :style="`transition-delay: ${0.5 + index * 0.1}s;`">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ card.serviceTypeDescription }}</h3>
              <p class="text-sm text-gray-500 font-mono">{{ card.cardCode }}</p>
            </div>
            <div class="text-right">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-medium" :class="{
                'bg-green-100 text-green-800': card.status === 'ACTIVE',
                'bg-gray-100 text-gray-800': card.status === 'INACTIVE',
                'bg-red-100 text-red-800': card.status === 'EXPIRED',
                'bg-yellow-100 text-yellow-800': card.status === 'SUSPENDED',
                'bg-red-100 text-red-800': card.status === 'REVOKED'
              }">
                {{ card.statusDescription }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-500">创建时间：</span>
              <div class="font-medium">{{ formatDateTime(card.createdAt) }}</div>
            </div>
            <div v-if="card.activatedAt">
              <span class="text-gray-500">激活时间：</span>
              <div class="font-medium">{{ formatDateTime(card.activatedAt) }}</div>
            </div>
            <div v-if="card.expiredAt">
              <span class="text-gray-500">到期时间：</span>
              <div class="font-medium">{{ formatDateTime(card.expiredAt) }}</div>
            </div>
            <div>
              <span class="text-gray-500">剩余时间：</span>
              <div class="font-medium" :class="getRemainingTimeClass(card)">
                {{ getRemainingTimeText(card) }}
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="mt-4 flex space-x-2">
            <button v-if="card.status === 'INACTIVE'" @click="activateCard(card)"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              激活月卡
            </button>
            <button @click="validateCard(card)"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              验证状态
            </button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && monthlyCards.length === 0 && queryForm.customerEmail"
        class="text-center py-12 scroll-animate fade-in-up" style="transition-delay: 0.5s;">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无月卡记录</h3>
        <p class="text-gray-500 mb-4">该邮箱下没有找到月卡记录</p>
        <router-link to="/pricing"
          class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          去购买月卡
        </router-link>
      </div>
    </div>

  </div>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import $message from '../utils/message.js'
import {
  getMonthlyCardsByEmail,
  activateMonthlyCard,
  validateMonthlyCard,
  getClientInfo
} from '../services/monthlyCardService.js'

// 响应式数据
const queryForm = ref({
  customerEmail: '',
  serviceType: ''
})

const loading = ref(false)
const errorMsg = ref('')
const monthlyCards = ref([])

// 查询月卡
async function queryCards() {
  if (!queryForm.value.customerEmail.trim()) {
    errorMsg.value = '请输入邮箱地址'
    return
  }

  loading.value = true
  errorMsg.value = ''
  monthlyCards.value = []

  try {
    const cards = await getMonthlyCardsByEmail(
      queryForm.value.customerEmail.trim(),
      queryForm.value.serviceType || null
    )

    if (cards && cards.length > 0) {
      monthlyCards.value = cards
      // 数据加载完成后重新初始化动画
      nextTick(() => {
        initializeAnimations()
      })
    }
  } catch (error) {
    errorMsg.value = error.message || '查询失败，请检查网络连接'
  } finally {
    loading.value = false
  }
}

// 激活月卡
async function activateCard(card) {
  try {
    const activateData = {
      cardCode: card.cardCode,
      customerEmail: queryForm.value.customerEmail,
      clientInfo: getClientInfo()
    }

    const result = await activateMonthlyCard(activateData)

    if (result.valid) {
      // 更新卡片状态
      Object.assign(card, result.cardInfo)
      $message.success('月卡已成功激活，您现在可以使用相关服务了！')
    }
  } catch (error) {
    $message.error(`激活过程中出现错误：${error.message}`)
  }
}

// 验证月卡
async function validateCard(card) {
  try {
    const validateData = {
      cardCode: card.cardCode,
      customerEmail: queryForm.value.customerEmail,
      serviceType: card.serviceType
    }

    const result = await validateMonthlyCard(validateData)

    if (result.valid) {
      // 更新卡片状态
      Object.assign(card, result.cardInfo)
      $message.success('月卡验证通过，状态信息已更新！')
    } else {
      $message.warning(`验证未通过：${result.failureReason || '月卡状态无效或已过期'}`)
    }
  } catch (error) {
    $message.error(`验证过程中出现错误：${error.message}`)
  }
}

// 格式化日期时间
function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return '未知'

  try {
    const date = new Date(dateTimeStr)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return dateTimeStr
  }
}

// 获取剩余时间文本
function getRemainingTimeText(card) {
  // 根据月卡状态智能显示剩余时间
  switch (card.status) {
    case 'INACTIVE':
      return '未激活'
    case 'ACTIVE':
      if (card.remainingDays > 0) {
        return `${card.remainingDays}天`
      } else if (card.remainingHours > 0) {
        return `${card.remainingHours}小时`
      } else {
        return '已过期'
      }
    case 'EXPIRED':
      return '已过期'
    case 'SUSPENDED':
      return '已暂停'
    case 'REVOKED':
      return '已撤销'
    default:
      return '-'
  }
}

// 获取剩余时间样式类
function getRemainingTimeClass(card) {
  switch (card.status) {
    case 'INACTIVE':
      return 'text-gray-600'
    case 'ACTIVE':
      if (card.remainingDays > 7) {
        return 'text-green-600'
      } else if (card.remainingDays > 0) {
        return 'text-yellow-600'
      } else {
        return 'text-red-600'
      }
    case 'EXPIRED':
    case 'REVOKED':
      return 'text-red-600'
    case 'SUSPENDED':
      return 'text-orange-600'
    default:
      return 'text-gray-600'
  }
}

// 动画相关逻辑
let observer = null
const isInitialized = ref(false)

// 重置页面状态
const resetPageState = () => {
  // 清理之前的observer
  if (observer) {
    observer.disconnect()
    observer = null
  }

  // 重置动画状态
  const allAnimatedElements = document.querySelectorAll('.animate-in-view, .scroll-animate')
  allAnimatedElements.forEach((el) => {
    el.classList.remove('animate-in-view')
  })

  isInitialized.value = false
}

// 初始化页面动画
const initializeAnimations = () => {
  // 使用 nextTick 确保 DOM 已完全渲染
  nextTick(() => {
    try {
      // 清理之前的observer
      if (observer) {
        observer.disconnect()
        observer = null
      }

      // 创建 Intersection Observer 来监听元素进入视口
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当元素进入视口时，添加动画类
            entry.target.classList.add('animate-in-view')
          } else {
            // 当元素离开视口时，移除动画类，以便下次进入时重新触发
            entry.target.classList.remove('animate-in-view')
          }
        })
      }, {
        threshold: 0.3, // 当元素30%可见时触发
        rootMargin: '0px 0px -100px 0px' // 提前100px触发
      })

      // 观察所有需要动画的元素
      const animatedElements = document.querySelectorAll('.scroll-animate, .animate-fade-in-up')
      console.log(`找到 ${animatedElements.length} 个动画元素`)
      animatedElements.forEach((el) => {
        if (observer) observer.observe(el)
      })

      // 强制触发首屏动画
      setTimeout(() => {
        const heroElements = document.querySelectorAll('.animate-fade-in-up')
        heroElements.forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('animate-in-view')
          }
        })
      }, 100)

      isInitialized.value = true
      console.log('月卡页面动画初始化完成')
    } catch (error) {
      console.error('动画初始化失败:', error)
      isInitialized.value = true // 即使失败也标记为已初始化，避免重复尝试
    }
  })
}

onMounted(() => {
  // 重置页面状态
  resetPageState()

  // 初始化动画
  initializeAnimations()
})

onUnmounted(() => {
  // 清理 Intersection Observer
  if (observer) {
    observer.disconnect()
    observer = null
  }

  // 重置状态
  isInitialized.value = false

  console.log('月卡页面组件已卸载，清理完成')
})
</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}

/* 滚动触发动画 */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.scroll-animate.animate-in-view {
  opacity: 1;
  transform: translateY(0);
}

.scroll-animate.fade-in-up {
  transform: translateY(30px);
}

.scroll-animate.fade-in-up.animate-in-view {
  transform: translateY(0);
}

.scroll-animate.scale-up {
  transform: scale(0.9);
}

.scroll-animate.scale-up.animate-in-view {
  transform: scale(1);
}

/* 首屏动画 */
.animate-fade-in-up {
  opacity: 0;
}

.animate-fade-in-up.animate-in-view {
  opacity: 1;
  animation: fadeInUp 0.8s ease-out forwards;
}

/* 动画关键帧 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
