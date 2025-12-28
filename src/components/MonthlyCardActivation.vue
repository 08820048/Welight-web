<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-900 dark:text-gray-100">
    <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">激活月卡服务</h2>
    
    <form @submit.prevent="activateCard" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">月卡编码 *</label>
        <input 
          v-model="form.cardCode" 
          type="text" 
          required
          placeholder="AI-1727251200001-ABC12345"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址 *</label>
        <input 
          v-model="form.customerEmail" 
          type="email" 
          required
          placeholder="购买时使用的邮箱地址"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      
      <button 
        type="submit" 
        :disabled="loading"
        class="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        <span v-if="loading" class="animate-spin mr-2 inline-block">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path d="M12 2v4" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </span>
        激活月卡
      </button>
      
      <div v-if="errorMsg" class="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
        {{ errorMsg }}
      </div>
    </form>
    
    <!-- 激活结果 -->
    <div v-if="activationResult" class="mt-6 p-4 rounded-lg" :class="{
      'bg-green-50 border border-green-200': activationResult.valid,
      'bg-red-50 border border-red-200': !activationResult.valid
    }">
      <div class="flex items-center mb-2">
        <span v-if="activationResult.valid" class="text-green-600 mr-2">✅</span>
        <span v-else class="text-red-600 mr-2">❌</span>
        <span class="font-medium" :class="{
          'text-green-800': activationResult.valid,
          'text-red-800': !activationResult.valid
        }">
          {{ activationResult.valid ? '月卡激活成功' : '月卡激活失败' }}
        </span>
      </div>
      
      <div v-if="activationResult.valid && activationResult.cardInfo" class="text-sm space-y-1">
        <div><strong>月卡编码：</strong>{{ activationResult.cardInfo.cardCode }}</div>
        <div><strong>服务类型：</strong>{{ activationResult.cardInfo.serviceTypeDescription }}</div>
        <div><strong>状态：</strong>{{ activationResult.cardInfo.statusDescription }}</div>
        <div><strong>激活时间：</strong>{{ formatDateTime(activationResult.cardInfo.activatedAt) }}</div>
        <div><strong>到期时间：</strong>{{ formatDateTime(activationResult.cardInfo.expiredAt) }}</div>
        <div><strong>剩余时间：</strong>{{ formatRemainingTime(activationResult.cardInfo.remainingDays, activationResult.cardInfo.remainingHours) }}</div>
      </div>
      
      <div v-if="!activationResult.valid && activationResult.failureReason" class="text-sm text-red-700">
        <strong>失败原因：</strong>{{ activationResult.failureReason }}
      </div>
    </div>
    
    <!-- 使用说明 -->
    <div class="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
      <h4 class="font-medium mb-2">💡 激活说明：</h4>
      <ul class="space-y-1 text-xs">
        <li>• 请输入购买后收到的月卡编码</li>
        <li>• 邮箱地址必须与购买时使用的邮箱一致</li>
        <li>• 激活后立即开始30天倒计时</li>
        <li>• 每个月卡只能激活一次，请确认后再激活</li>
        <li>• 激活成功后可在桌面应用中使用相关服务</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  activateMonthlyCard, 
  formatRemainingTime,
  getClientInfo 
} from '../services/monthlyCardService.js'

// 响应式数据
const form = ref({
  cardCode: '',
  customerEmail: ''
})

const loading = ref(false)
const errorMsg = ref('')
const activationResult = ref(null)

// 激活月卡
async function activateCard() {
  loading.value = true
  errorMsg.value = ''
  activationResult.value = null
  
  try {
    const activateData = {
      cardCode: form.value.cardCode.trim(),
      customerEmail: form.value.customerEmail.trim(),
      clientInfo: getClientInfo()
    }
    
    const result = await activateMonthlyCard(activateData)
    activationResult.value = result
    
    if (result.valid) {
      // 激活成功，可以保存月卡信息到本地存储
      localStorage.setItem('welight_monthly_card', JSON.stringify({
        cardCode: form.value.cardCode,
        customerEmail: form.value.customerEmail,
        activatedAt: new Date().toISOString(),
        cardInfo: result.cardInfo
      }))
    }
    
  } catch (error) {
    errorMsg.value = error.message || '激活失败，请检查网络连接或联系技术支持'
  } finally {
    loading.value = false
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

// 暴露方法给父组件
defineExpose({
  activateCard,
  form,
  activationResult
})
</script>

<style scoped>
/* 组件样式 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
