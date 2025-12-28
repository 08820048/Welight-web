<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-backdrop"
    style="z-index: 9999;">
    <div class="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto modal-content"
      style="min-height: 400px;">
      <!-- 弹窗头部 -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">积分套餐购买</h2>
        <button @click="$emit('close')"
          class="bg-gray-100 dark:bg-gray-800 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 购买表单 -->
      <div v-if="!orderInfo && !paymentInfo" class="mb-6">

        <!-- 预选套餐信息显示（直接购买模式） -->
        <div v-if="isDirectPurchaseMode && selectedPackage"
          class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-gray-900 dark:text-gray-100">{{ selectedPackage.packageName }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ selectedPackage.credits }}积分 · 永久有效</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900 dark:text-gray-100">¥{{ selectedPackage.currentPrice }}</div>
              <button @click="clearPreselection" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                选择其他套餐
              </button>
            </div>
          </div>
        </div>

        <!-- 套餐选择列表（仅在非直接购买模式时显示） -->
        <div v-if="!isDirectPurchaseMode && creditPackages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="pkg in creditPackages" :key="pkg.id"
            class="group relative bg-white dark:bg-gray-800 border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:border-gray-700"
            :class="{
              'border-gray-900 ring-2 ring-gray-200': selectedPackage?.id === pkg.id,
              'border-gray-200 dark:border-gray-700': selectedPackage?.id !== pkg.id
            }">

            <!-- 推荐标签 -->
            <div v-if="pkg.isPopular"
              class="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12">
              推荐
            </div>

            <!-- 产品名称标签 -->
            <div class="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100">
              {{ pkg.packageName }}
            </div>

            <!-- 价格显示 -->
            <div class="mb-4">
              <div v-if="pkg.packageType === 'CUSTOM'" class="text-center">
                <div class="text-sm text-gray-800 mb-2">自定义积分套餐</div>
                <div class="text-lg text-gray-900">¥0.05/积分</div>
                <div class="text-xs text-gray-700 mt-1">最低100积分起购</div>
              </div>
              <div v-else>
                <div class="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">{{ pkg.credits }}积分 ¥{{ pkg.currentPrice }}/永久
                </div>
                <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">¥{{ pkg.currentPrice }}</div>
                <div v-if="pkg.originalPrice > pkg.currentPrice" class="text-sm text-gray-400 line-through">
                  原价 ¥{{ pkg.originalPrice }}
                </div>
              </div>
            </div>

            <!-- 永久有效标签 -->
            <div class="inline-block bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded mb-4">
              永久有效
            </div>

            <!-- 功能列表 -->
            <ul class="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
              <li v-for="feature in pkg.features" :key="feature">
                <span class="text-gray-900 dark:text-gray-100">✔</span> {{ feature }}
              </li>
            </ul>

            <!-- 选择按钮 -->
            <button @click="selectPackage(pkg)"
              class="w-full py-2 px-4 rounded-lg font-semibold shadow transition-colors duration-200" :class="{
                'bg-gray-900 hover:bg-gray-800 text-white': selectedPackage?.id !== pkg.id,
                'bg-gray-800 text-white': selectedPackage?.id === pkg.id
              }">
              {{ selectedPackage?.id === pkg.id ? '已选择' : '选择套餐' }}
            </button>
          </div>
        </div>

        <!-- 加载状态（仅在非直接购买模式时显示） -->
        <div v-else-if="!isDirectPurchaseMode && loading" class="text-center py-12">
          <div class="animate-spin inline-block w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full">
          </div>
          <p class="mt-4 text-gray-600">加载积分套餐中...</p>
        </div>

        <!-- 无数据状态（仅在非直接购买模式时显示） -->
        <div v-else-if="!isDirectPurchaseMode" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5">
              </path>
            </svg>
          </div>
          <p class="text-gray-600 text-lg">暂无可用的积分套餐</p>
          <p class="text-gray-500 text-sm mt-2">请稍后重试或联系客服</p>
          <button @click="loadCreditPackages"
            class="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            重新加载
          </button>
        </div>

        <!-- 自定义积分输入 -->
        <div v-if="selectedPackage?.packageType === PACKAGE_TYPES.CUSTOM" class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">自定义积分数量</h3>
          <div class="flex items-center space-x-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">积分数量</label>
              <input v-model.number="customCredits" type="number" min="100" max="10000" step="100"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="请输入积分数量（最少100积分）">
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-600">总价格</div>
              <div class="text-xl font-bold text-gray-900">¥{{ calculateCustomPrice() }}</div>
            </div>
          </div>
        </div>

        <!-- 用户信息表单 -->
        <div v-if="selectedPackage" class="mt-6 p-4 bg-gray-50 rounded-lg purchase-info-section">
          <h3 class="text-lg font-semibold mb-4 text-gray-900">购买信息</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">姓名</label>
              <input v-model="purchaseForm.customerName" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-900"
                placeholder="请输入您的姓名">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">邮箱 <span class="text-red-500">*</span></label>
              <input v-model="purchaseForm.customerEmail" type="email" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-900"
                placeholder="请输入您购买许可证时绑定的邮箱">
            </div>
          </div>

          <!-- 支付方式选择 -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-900 mb-2">支付方式</label>
            <div class="flex space-x-4">
              <label class="flex items-center text-gray-900">
                <input v-model="purchaseForm.paymentMethod" type="radio" :value="PAYMENT_METHODS.WECHAT_NATIVE"
                  class="mr-2">
                <span>微信支付</span>
              </label>
              <!-- <label class="flex items-center text-gray-900">
                <input v-model="purchaseForm.paymentMethod" type="radio" :value="PAYMENT_METHODS.ALIPAY" class="mr-2">
                <span>支付宝</span>
              </label> -->
            </div>
          </div>

          <!-- 购买按钮 -->
          <div class="mt-6">
            <button @click="handlePurchase" :disabled="!canPurchase || purchasing || checkingLicense"
              class="w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white rounded-lg font-semibold shadow transition-colors duration-200">
              <span v-if="checkingLicense" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                正在验证许可证...
              </span>
              <span v-else-if="purchasing" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                处理中...
              </span>
              <span v-else>
                确认支付 - ¥{{ getFinalPrice() }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- 支付界面 -->
      <div v-if="paymentInfo" class="text-center">
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">扫码支付</h3>
          <div class="bg-gray-50 rounded-lg p-6 mb-4">
            <div class="text-sm text-gray-600 mb-2">订单号：{{ orderInfo?.orderNo }}</div>
            <div class="text-lg font-semibold mb-4">支付金额：¥{{ paymentInfo.amount }}</div>

            <!-- 二维码 -->
            <div v-if="paymentInfo.qrCodeUrl" class="flex justify-center mb-4">
              <img :src="paymentInfo.qrCodeUrl" alt="支付二维码" class="w-48 h-48 border rounded-lg">
            </div>

            <!-- 支付状态 -->
            <div class="mt-4 p-3 rounded-lg" :class="getStatusClass()">
              {{ getStatusText() }}
            </div>
          </div>
        </div>
      </div>

      <!-- 错误信息 -->
      <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="text-red-700">{{ errorMessage }}</div>
      </div>

      <!-- 积分购买确认对话框 -->
      <div v-if="showConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        style="z-index: 10000;">
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
          <!-- 标题 -->
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">购买须知</h3>
          </div>

          <!-- 内容 -->
          <div class="mb-6 text-gray-700 text-sm leading-relaxed">
            <p class="mb-3">
              由于积分需要和购买许可证的邮箱进行绑定使用，因此<span class="font-semibold text-red-600">试用期期间无法购买积分</span>。
            </p>
            <p class="mb-3">
              请确保您已购买了许可证并正常激活后再购买积分套餐。
            </p>
            <p class="text-red-600 font-semibold">
              ⚠️ 积分购买后不支持退款，请务必确认后再进行购买。
            </p>
          </div>

          <!-- 按钮 -->
          <div class="flex space-x-3">
            <button @click="cancelPurchase"
              class="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200">
              取消
            </button>
            <button @click="confirmPurchase"
              class="flex-1 py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200">
              我已了解，继续购买
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
  getCreditPackages,
  createCreditPackageOrder,
  pollPaymentStatus,
  calculateCustomCreditsPrice
} from '../services/creditsService.js'
import {
  PACKAGE_TYPES,
  PAYMENT_METHODS,
  ORDER_STATUS,
  validatePurchaseOrder,
  formatOrderStatus
} from '../types/credits.js'

// Props
const props = defineProps({
  preselectedPackage: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['close', 'success'])

// 响应式数据
const creditPackages = ref([])
const selectedPackage = ref(props.preselectedPackage)
const customCredits = ref(100)
const loading = ref(true)
const purchasing = ref(false)
const errorMessage = ref('')
const orderInfo = ref(null)
const paymentInfo = ref(null)
const paymentStatus = ref('')
let pollingInterval = null

const purchaseForm = ref({
  customerName: '',
  customerEmail: '',
  paymentMethod: PAYMENT_METHODS.WECHAT_NATIVE
})

// 确认对话框相关
const showConfirmDialog = ref(false)
let confirmDialogResolve = null

// 许可证检查相关
const checkingLicense = ref(false)

// 计算属性
const canPurchase = computed(() => {
  if (!selectedPackage.value) return false

  const orderData = {
    packageCode: selectedPackage.value.packageCode,
    customerName: purchaseForm.value.customerName.trim(),
    customerEmail: purchaseForm.value.customerEmail.trim(),
    paymentMethod: purchaseForm.value.paymentMethod
  }

  // 如果是自定义套餐，添加自定义积分数量
  if (selectedPackage.value.packageType === PACKAGE_TYPES.CUSTOM) {
    orderData.customCredits = customCredits.value
  }

  return validatePurchaseOrder(orderData)
})

// 是否处于直接购买模式（有预选套餐且未清除）
const isDirectPurchaseMode = ref(!!props.preselectedPackage)

// 清除预选，显示所有套餐
function clearPreselection() {
  isDirectPurchaseMode.value = false
  selectedPackage.value = null
}

// 方法
async function loadCreditPackages() {
  try {
    loading.value = true
    const result = await getCreditPackages()

    if (result.success && result.data) {
      // 转换API数据格式为组件期望的格式
      const convertedPackages = result.data.map(pkg => ({
        id: pkg.id,
        packageCode: pkg.code,
        packageName: pkg.name,
        packageDescription: pkg.description || '',
        credits: pkg.credits,
        originalPrice: pkg.price,
        currentPrice: pkg.currentPrice || pkg.price,
        discount: pkg.discountPercentage || 0,
        packageType: (pkg.isCustom === true || pkg.code === 'CREDITS_CUSTOM') ? 'CUSTOM' : 'STANDARD',
        isActive: pkg.isActive,
        displayOrder: pkg.sortOrder || 0,
        features: [
          `${pkg.credits}积分`,
          pkg.description || '适用于所有AI服务',
          '永不过期'
        ],
        costPerCredit: pkg.pricePerCredit,
        recommendedFor: pkg.recommendTag || '用户',
        isPopular: pkg.recommendTag === '热门选择'
      }))

      // 对积分套餐进行排序：按金额从小到大，自定义套餐放在最后
      const sortedPackages = [...convertedPackages].sort((a, b) => {
        // 自定义套餐始终排在最后
        if (a.packageType === 'CUSTOM' && b.packageType !== 'CUSTOM') {
          return 1
        }
        if (b.packageType === 'CUSTOM' && a.packageType !== 'CUSTOM') {
          return -1
        }
        if (a.packageType === 'CUSTOM' && b.packageType === 'CUSTOM') {
          return 0 // 如果都是自定义套餐，保持原顺序
        }

        // 标准套餐按价格从小到大排序
        return a.currentPrice - b.currentPrice
      })

      creditPackages.value = sortedPackages
    } else {
      // 使用降级数据（模拟数据已经是正确格式）
      const mockData = result.data || []

      // 对模拟数据也进行同样的排序
      const sortedMockData = [...mockData].sort((a, b) => {
        // 自定义套餐始终排在最后
        if (a.packageType === 'CUSTOM' && b.packageType !== 'CUSTOM') {
          return 1
        }
        if (b.packageType === 'CUSTOM' && a.packageType !== 'CUSTOM') {
          return -1
        }
        if (a.packageType === 'CUSTOM' && b.packageType === 'CUSTOM') {
          return 0
        }

        // 标准套餐按价格从小到大排序
        return a.currentPrice - b.currentPrice
      })

      creditPackages.value = sortedMockData
      if (result.error) {
        console.warn('使用模拟数据:', result.error)
      }
    }
  } catch (error) {
    console.error('加载积分套餐失败:', error)
    errorMessage.value = '加载套餐失败，请刷新重试'
  } finally {
    loading.value = false
  }
}

function selectPackage(pkg) {
  selectedPackage.value = pkg
  errorMessage.value = ''

  // 选择套餐后自动滚动到购买信息区域
  nextTick(() => {
    const purchaseInfoElement = document.querySelector('.purchase-info-section')
    if (purchaseInfoElement) {
      purchaseInfoElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
}

function calculateCustomPrice() {
  if (!customCredits.value || customCredits.value < 100) return 0
  return calculateCustomCreditsPrice(customCredits.value)
}

function getFinalPrice() {
  if (!selectedPackage.value) return 0

  if (selectedPackage.value.packageType === PACKAGE_TYPES.CUSTOM) {
    return calculateCustomPrice()
  }

  return selectedPackage.value.currentPrice
}

// 显示积分购买确认对话框
function showCreditsConfirmDialog() {
  return new Promise((resolve) => {
    confirmDialogResolve = resolve
    showConfirmDialog.value = true
  })
}

// 确认购买
function confirmPurchase() {
  showConfirmDialog.value = false
  if (confirmDialogResolve) {
    confirmDialogResolve(true)
    confirmDialogResolve = null
  }
}

// 取消购买
function cancelPurchase() {
  showConfirmDialog.value = false
  if (confirmDialogResolve) {
    confirmDialogResolve(false)
    confirmDialogResolve = null
  }
}

// 检查用户邮箱是否绑定有效许可证
async function checkLicenseStatus(email) {
  try {
    checkingLicense.value = true
    const response = await fetch(`https://ilikexff.cn/api/credits/check-license/${encodeURIComponent(email)}`)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      return {
        success: true,
        hasValidLicense: result.data.hasValidLicense,
        statusMessage: result.data.statusMessage,
        suggestion: result.data.suggestion
      }
    } else {
      return {
        success: false,
        hasValidLicense: false,
        statusMessage: result.message || '许可证状态检查失败',
        suggestion: '请稍后重试或联系客服'
      }
    }
  } catch (error) {
    console.error('检查许可证状态失败:', error)
    return {
      success: false,
      hasValidLicense: false,
      statusMessage: '网络错误，无法检查许可证状态',
      suggestion: '请检查网络连接后重试'
    }
  } finally {
    checkingLicense.value = false
  }
}

async function handlePurchase() {
  if (!canPurchase.value) return

  // 显示确认框，提醒用户积分需要绑定许可证邮箱使用
  const confirmed = await showCreditsConfirmDialog()
  if (!confirmed) {
    return // 用户点击取消，直接返回
  }

  const customerEmail = purchaseForm.value.customerEmail.trim()

  // 检查用户邮箱是否绑定有效许可证
  const licenseCheck = await checkLicenseStatus(customerEmail)
  if (!licenseCheck.hasValidLicense) {
    errorMessage.value = `${licenseCheck.statusMessage}${licenseCheck.suggestion ? '。' + licenseCheck.suggestion : ''}`
    return
  }

  try {
    purchasing.value = true
    errorMessage.value = ''

    const orderData = {
      packageCode: selectedPackage.value.packageCode,
      customerName: purchaseForm.value.customerName.trim(),
      customerEmail: customerEmail,
      paymentMethod: purchaseForm.value.paymentMethod
    }

    // 如果是自定义套餐，添加自定义积分数量
    if (selectedPackage.value.packageType === PACKAGE_TYPES.CUSTOM) {
      orderData.customCredits = customCredits.value
    }

    const result = await createCreditPackageOrder(orderData)

    if (result.success && result.data) {
      // API返回的数据结构：{ qrCode, packageCode, paymentUrl, order }
      orderInfo.value = result.data.order
      paymentInfo.value = {
        qrCode: result.data.qrCode,
        qrCodeUrl: `https://ilikexff.cn/api/payment/orders/${result.data.order.orderNo}/qrcode-image`,
        paymentUrl: result.data.paymentUrl,
        paymentMethod: result.data.order.paymentMethod,
        amount: result.data.order.amount,
        currency: result.data.order.currency
      }
      paymentStatus.value = result.data.order.status || 'PENDING'

      // 开始轮询支付状态
      startPaymentPolling(result.data.order.orderNo)
    } else {
      throw new Error(result.error || '创建订单失败')
    }
  } catch (error) {
    console.error('购买失败:', error)
    errorMessage.value = error.message || '购买失败，请重试'
  } finally {
    purchasing.value = false
  }
}

function startPaymentPolling(orderNo) {
  if (pollingInterval) {
    clearInterval(pollingInterval)
  }

  pollingInterval = setInterval(async () => {
    try {
      // 使用许可证服务的订单状态查询接口
      const response = await fetch(`https://ilikexff.cn/api/payment/orders/${orderNo}`)
      const result = await response.json()

      if (result.code === 200 && result.data) {
        paymentStatus.value = result.data.status

        if (result.data.status === 'PAID') {
          clearInterval(pollingInterval)
          pollingInterval = null
          emit('success', {
            orderNo,
            credits: selectedPackage.value.credits,
            creditsAmount: selectedPackage.value.credits,
            package: selectedPackage.value
          })
        } else if (result.data.status === 'EXPIRED' || result.data.status === 'CANCELLED') {
          clearInterval(pollingInterval)
          pollingInterval = null
          errorMessage.value = `支付${result.data.status === 'EXPIRED' ? '超时' : '失败'}，请重新购买`
        }
      }
    } catch (error) {
      console.error('查询支付状态失败:', error)
    }
  }, 3000) // 每3秒查询一次
}

function getStatusClass() {
  switch (paymentStatus.value) {
    case 'PAID':
      return 'bg-green-100 text-green-700'
    case 'EXPIRED':
    case 'CANCELLED':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-blue-100 text-blue-700'
  }
}

function getStatusText() {
  switch (paymentStatus.value) {
    case 'PAID':
      return '✅ 支付成功！积分已到账'
    case 'EXPIRED':
      return '⏰ 订单过期，请重新下单'
    case 'CANCELLED':
      return '❌ 订单已取消'
    case 'PENDING':
      return '⏳ 等待支付中...'
    default:
      return '⏳ 处理中...'
  }
}

// 生命周期
onMounted(() => {
  loadCreditPackages()
})

onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
  }
})
</script>

<style scoped>
.modal-backdrop {
  backdrop-filter: blur(4px);
}

/* 模态框动画 */
.modal-backdrop {
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  animation: slideUp 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
