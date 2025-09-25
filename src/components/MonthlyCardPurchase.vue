<template>
  <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative modal-content">
    <!-- 关闭按钮 -->
    <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="$emit('close')">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <h2 class="text-2xl font-bold mb-4 text-blue-700">购买月卡服务</h2>

    <!-- 产品信息 -->
    <div v-if="selectedProduct && !orderInfo" class="mb-4 p-4 bg-blue-50 rounded-lg">
      <h3 class="font-bold text-blue-800">{{ selectedProduct.name }}</h3>
      <p class="text-sm text-blue-600 mb-2">{{ selectedProduct.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-blue-700">¥{{ selectedProduct.price }}/月</span>
        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">30天有效期</span>
      </div>
    </div>

    <!-- 购买表单 -->
    <form v-if="!orderInfo" @submit.prevent="submitPurchase" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址 *</label>
        <input v-model="form.customerEmail" type="email" required placeholder="用于接收月卡编码"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
        <input v-model="form.customerName" type="text" placeholder="可选"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- 服务条款和隐私政策提示 -->
      <div class="text-xs text-gray-500 text-center mb-3">
        购买表示您已同意我们的
        <button @click="showTermsModal = true" class="text-green-600 hover:text-green-700 underline">《服务条款》</button>
        和
        <button @click="showPrivacyModal = true" class="text-green-600 hover:text-green-700 underline">《隐私政策》</button>
      </div>

      <button type="submit" :disabled="loading || !form.serviceType"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
        <span v-if="loading" class="animate-spin mr-2 inline-block">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path d="M12 2v4" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          </svg>
        </span>
        确认购买
      </button>

      <div v-if="errorMsg" class="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
        {{ errorMsg }}
      </div>
    </form>

    <!-- 简化说明 -->
    <div v-if="!orderInfo" class="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
      💡 支付成功后，月卡编码将发送到您的邮箱，请在官网激活后在应用中使用
    </div>

    <!-- 支付信息区域 -->
    <div v-if="orderInfo" class="mt-4 text-center space-y-4">
      <div class="text-lg font-bold text-blue-700">订单金额：¥{{ orderInfo.amount }} {{ orderInfo.currency }}</div>
      <div class="text-gray-600">请使用微信扫码支付</div>
      <img :src="qrCodeImg" alt="支付二维码" class="w-40 h-40 rounded shadow border border-gray-200 mx-auto"
        v-if="qrCodeImg" />
      <div class="text-xs text-gray-400">订单号：{{ orderInfo.orderNo }}</div>

      <!-- 支付成功状态 - 紧凑横向布局 -->
      <div v-if="orderStatus === 'PAID' || paymentSuccess"
        class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="font-medium text-green-800">支付成功！</span>
          </div>
          <span class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">已完成</span>
        </div>
        <div class="mt-2 text-sm text-green-700">
          <div class="flex items-center justify-between">
            <span>月卡编码已发送到：<span class="font-mono">{{ form.customerEmail }}</span></span>
            <span class="text-xs text-green-600">💡 检查垃圾邮件</span>
          </div>
          <div class="mt-1 text-xs text-green-600">请在官网激活月卡，然后在应用中使用</div>
        </div>
      </div>
      <div v-else-if="orderStatus === 'EXPIRED'" class="mt-3 p-2 rounded text-sm font-medium bg-red-100 text-red-700">
        ⏰ 订单已过期，请重新下单
      </div>
      <div v-else-if="orderStatus === 'CANCELLED'" class="mt-3 p-2 rounded text-sm font-medium bg-red-100 text-red-700">
        ❌ 订单已取消
      </div>
      <div v-else-if="orderInfo" class="mt-3 p-2 rounded text-sm font-medium bg-blue-100 text-blue-700">
        ⏳ 等待支付 - 支付后月卡编码将发送到您的邮箱
      </div>
    </div>

    <!-- 服务条款模态框 -->
    <TermsOfServiceModal :isVisible="showTermsModal" @close="showTermsModal = false" />

    <!-- 隐私政策模态框 -->
    <PrivacyPolicyModal :isVisible="showPrivacyModal" @close="showPrivacyModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  getServiceTypeDescription,
  getClientInfo,
  getMonthlyCardProducts,
  SERVICE_TYPES,
  purchaseMonthlyCard,
  checkOrderStatus
} from '../services/monthlyCardService.js'
import TermsOfServiceModal from './TermsOfServiceModal.vue'
import PrivacyPolicyModal from './PrivacyPolicyModal.vue'

// Props
const props = defineProps({
  preselectedServiceType: {
    type: String,
    default: ''
  }
})

// 响应式数据
const form = ref({
  serviceType: props.preselectedServiceType || '',
  customerEmail: '',
  customerName: ''
})

const loading = ref(false)
const errorMsg = ref('')
const orderInfo = ref(null)
const qrCodeImg = ref('')
const orderStatus = ref('')
const paymentSuccess = ref(false)
let pollingInterval = null
const monthlyCardProducts = ref([])
const showTermsModal = ref(false)
const showPrivacyModal = ref(false)

// 异步加载月卡产品数据
async function loadMonthlyCardProducts() {
  try {
    monthlyCardProducts.value = await getMonthlyCardProducts()
  } catch (error) {
    console.error('加载月卡产品数据失败:', error)
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadMonthlyCardProducts()
})

// 计算属性
const selectedProduct = computed(() => {
  return monthlyCardProducts.value.find(p => p.serviceType === form.value.serviceType) || null
})

const selectedServiceDescription = computed(() => {
  return form.value.serviceType ? getServiceTypeDescription(form.value.serviceType) : ''
})

// 组件销毁时的清理
onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
    pollingInterval = null
  }
})

// 提交购买
async function submitPurchase() {
  loading.value = true
  errorMsg.value = ''
  orderInfo.value = null
  qrCodeImg.value = ''

  try {
    // 使用月卡购买API
    const purchaseData = {
      serviceType: form.value.serviceType,
      customerEmail: form.value.customerEmail.trim(),
      customerName: form.value.customerName.trim(),
      clientInfo: getClientInfo(),
      paymentMethod: 'WECHAT_NATIVE',
      remark: `${getServiceTypeDescription(form.value.serviceType)}月卡购买`
    }

    const result = await purchaseMonthlyCard(purchaseData)
    orderInfo.value = result.order
    orderStatus.value = result.order.status

    // 使用后端提供的二维码图片接口
    if (result.order && result.order.orderNo) {
      qrCodeImg.value = `https://ilikexff.cn/api/payment/orders/${result.order.orderNo}/qrcode-image`
    } else {
      console.warn('未找到订单号:', result)
    }

    // 开始轮询支付状态
    startPaymentPolling(result.order.orderNo)

  } catch (error) {
    errorMsg.value = error.message || '购买失败，请检查网络连接或联系技术支持'
  } finally {
    loading.value = false
  }
}

// 开始支付状态轮询
function startPaymentPolling(orderNo) {
  // 清除之前的轮询
  if (pollingInterval) {
    clearInterval(pollingInterval)
  }

  console.log('开始轮询支付状态:', orderNo)

  pollingInterval = setInterval(async () => {
    try {
      const isPaid = await checkOrderStatus(orderNo)
      if (isPaid) {
        // 支付成功
        clearInterval(pollingInterval)
        pollingInterval = null
        orderStatus.value = 'PAID'
        paymentSuccess.value = true
        console.log('支付成功！月卡编码已发送到邮箱')
      }
    } catch (error) {
      console.error('查询订单状态失败:', error)
    }
  }, 5000) // 每5秒检查一次

  // 30分钟后停止轮询
  setTimeout(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval)
      pollingInterval = null
      console.log('支付轮询已停止')
    }
  }, 30 * 60 * 1000)
}

// 暴露方法给父组件
defineExpose({
  submitPurchase,
  form,
  orderInfo
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

/* 弹窗动画 */
.modal-content {
  animation: modalContentSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes modalContentSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
