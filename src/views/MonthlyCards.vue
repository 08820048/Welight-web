<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 mt-20">
    <div class="max-w-4xl mx-auto">
      <!-- 标题区 -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">我的月卡服务</h1>
        <p class="text-lg text-gray-600">管理您的AI服务和云存储月卡</p>
      </div>

      <!-- 查询表单 -->
      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
            <input 
              v-model="queryForm.customerEmail" 
              type="email" 
              placeholder="输入购买时使用的邮箱"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">服务类型</label>
            <select 
              v-model="queryForm.serviceType" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部</option>
              <option value="AI_SERVICE">AI服务</option>
              <option value="CLOUD_STORAGE">云存储服务</option>
            </select>
          </div>
          <div class="md:w-32 flex items-end">
            <button 
              @click="queryCards"
              :disabled="loading || !queryForm.customerEmail"
              class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
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
        <div 
          v-for="card in monthlyCards" 
          :key="card.id"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
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
            <button 
              v-if="card.status === 'INACTIVE'"
              @click="activateCard(card)"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              激活月卡
            </button>
            <button 
              @click="validateCard(card)"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              验证状态
            </button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && monthlyCards.length === 0 && queryForm.customerEmail" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无月卡记录</h3>
        <p class="text-gray-500 mb-4">该邮箱下没有找到月卡记录</p>
        <router-link 
          to="/pricing" 
          class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          去购买月卡
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
      alert('月卡激活成功！')
    }
  } catch (error) {
    alert(`激活失败：${error.message}`)
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
      alert('月卡验证成功，状态已更新！')
    } else {
      alert(`验证失败：${result.failureReason || '月卡无效'}`)
    }
  } catch (error) {
    alert(`验证失败：${error.message}`)
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
</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}
</style>
