<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 pt-24">
    <div class="max-w-4xl mx-auto">
      <!-- 购买弹窗 -->
      <div v-if="showBuyModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
          <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeBuyModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 class="text-2xl font-bold mb-4 text-blue-700">购买许可证</h2>

          <!-- 产品信息 -->
          <div v-if="selectedProduct && !orderInfo" class="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 class="font-bold text-blue-800">{{ selectedProduct.name }}</h3>
            <p class="text-sm text-blue-600 mb-2">{{ selectedProduct.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-blue-700">{{ formatPrice(selectedProduct.price,
                selectedProduct.currency) }}</span>
              <span v-if="selectedProduct.permanent"
                class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">永久授权</span>
            </div>
          </div>

          <div v-if="!orderInfo">
            <form @submit.prevent="submitBuy" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱 <span
                    class="text-red-500">*</span></label>
                <input v-model="buyForm.customerEmail" required type="email"
                  class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="请输入邮箱（用于接收许可证）" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名（选填）</label>
                <input v-model="buyForm.customerName" type="text"
                  class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="可填写姓名或昵称" />
              </div>
              <button type="submit" :disabled="loading"
                class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow flex items-center justify-center">
                <span v-if="loading" class="animate-spin mr-2"><svg class="w-5 h-5" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                    <path d="M12 2v4" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                    <path d="M12 18v4" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                  </svg></span>
                确认购买
              </button>
              <div v-if="errorMsg" class="text-red-600 text-sm mt-2">{{ errorMsg }}</div>
            </form>
          </div>
          <div v-else>
            <div class="mb-4 text-center">
              <div class="text-lg font-bold text-blue-700 mb-1">订单金额：¥{{ orderInfo.amount }} {{ orderInfo.currency }}
              </div>
              <div class="text-gray-600 mb-2">请使用微信扫码支付</div>
              <img :src="qrCodeImg" alt="支付二维码" class="mx-auto w-40 h-40 rounded shadow border border-gray-200"
                v-if="qrCodeImg" />
              <div class="text-xs text-gray-400 mt-2">订单号：{{ orderInfo.orderNo }}</div>
              <div class="mt-3 p-2 rounded text-sm font-medium" :class="{
                'bg-green-100 text-green-700': orderStatus === 'PAID',
                'bg-red-100 text-red-700': orderStatus === 'EXPIRED' || orderStatus === 'CANCELLED',
                'bg-blue-100 text-blue-700': orderStatus === 'PENDING'
              }">
                <div v-if="orderStatus === 'PAID'">✅ 支付成功！正在获取许可证...</div>
                <div v-else-if="orderStatus === 'EXPIRED'">⏰ 订单已过期，请重新下单</div>
                <div v-else-if="orderStatus === 'CANCELLED'">❌ 订单已取消</div>
                <div v-else>⏳ {{ getOrderStatusDescription(orderStatus) }} - 支付后自动获取许可证</div>
              </div>
            </div>
            <div v-if="licenseInfo" class="bg-green-50 border border-green-200 rounded p-4 mt-4 text-green-700">
              <div class="font-bold mb-3 flex items-center justify-between">
                <span>许可证信息</span>
                <span class="text-xs bg-green-200 px-2 py-1 rounded">购买成功</span>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between bg-white p-2 rounded">
                  <span>许可证密钥：</span>
                  <div class="flex items-center">
                    <span class="font-mono text-blue-700 mr-2">{{ licenseInfo.licenseKey }}</span>
                    <button @click="copyLicenseKey" class="text-blue-600 hover:text-blue-800 text-xs">
                      复制
                    </button>
                  </div>
                </div>
                <div>产品：{{ licenseInfo.productCode }}</div>
                <div>邮箱：{{ licenseInfo.customerEmail }}</div>
                <div>状态：{{ licenseInfo.statusDescription }}</div>
                <div v-if="licenseInfo.permanent">有效期：永久</div>
                <div v-else>有效期至：{{ licenseInfo.expiredAt }}</div>
                <div>最大激活数：{{ licenseInfo.maxActivations }}</div>
                <div>当前激活数：{{ licenseInfo.currentActivations }}</div>
              </div>
              <div class="mt-3 p-2 bg-blue-50 rounded text-blue-700 text-xs">
                💡 提示：许可证已发送到您的邮箱，请在桌面应用中输入许可证密钥使用
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 标题区 -->
      <div class="text-center mb-10 scroll-animate fade-in-up" style="transition-delay: 0.1s;">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2 scroll-animate fade-in-up"
          style="transition-delay: 0.2s;">定价与服务购买</h1>
        <p class="text-lg text-gray-600 mb-4 scroll-animate fade-in-up" style="transition-delay: 0.3s;">
          选择适合您的许可证或月卡服务，享受完整功能与优质服务</p>
        <div class="flex justify-center space-x-4 scroll-animate fade-in-up" style="transition-delay: 0.4s;">
          <button @click="showMonthlyCardActivationModal = true"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm transform hover:scale-105">
            已有月卡？点击激活
          </button>
        </div>
      </div>

      <!-- 月卡购买弹窗 -->
      <div v-if="showMonthlyCardModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <MonthlyCardPurchase ref="monthlyCardPurchaseRef" :preselected-service-type="selectedServiceType"
          @close="closeMonthlyCardModal" />
      </div>

      <!-- 月卡激活弹窗 -->
      <div v-if="showMonthlyCardActivationModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="relative max-w-lg w-full mx-4">
          <button @click="showMonthlyCardActivationModal = false"
            class="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <MonthlyCardActivation />
        </div>
      </div>

      <!-- 产品卡片区 -->
      <div v-if="loadingProducts" class="text-center py-12">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p class="mt-2 text-gray-600">正在加载产品信息...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 所有产品卡片（基于API数据） -->
        <div v-for="(product, index) in products" :key="product.id"
          class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-all duration-500 relative scroll-animate scale-up"
          :style="`transition-delay: ${0.5 + index * 0.1}s;`" :class="{
            'border-2 border-green-500': product.code.includes('AI_SERVICE'),
            'border-2 border-purple-500': product.code.includes('CLOUD_STORAGE'),
            'border-2 border-blue-500': product.permanent,
            'border border-gray-200': !product.code.includes('AI_SERVICE') && !product.code.includes('CLOUD_STORAGE') && !product.permanent
          }">
          <div class="mb-4">
            <span class="inline-block text-xs font-semibold px-3 py-1 rounded-full" :class="{
              'bg-green-100 text-green-700': product.code.includes('AI_SERVICE'),
              'bg-purple-100 text-purple-700': product.code.includes('CLOUD_STORAGE'),
              'bg-blue-100 text-blue-700': product.permanent
            }">
              {{ product.name }}
            </span>
          </div>
          <div class="flex flex-col items-center mb-2">
            <!-- 原价显示 -->
            <div v-if="getOriginalPrice(product)" class="text-sm text-gray-400 line-through mb-1">
              原价 ¥{{ getOriginalPrice(product) }}{{ product.permanent ? '' : '/月' }}
            </div>
            <!-- 现价显示 -->
            <span class="text-3xl font-bold" :class="{
              'text-green-700': product.code.includes('AI_SERVICE'),
              'text-purple-600': product.code.includes('CLOUD_STORAGE'),
              'text-blue-600': product.permanent
            }">
              {{ formatPrice(product.price, product.currency) }}{{ product.permanent ? '' : '/月' }}
            </span>
            <!-- 折扣标签 -->
            <div v-if="getDiscountPercent(product)" class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full mt-1">
              {{ getDiscountPercent(product) }}折
            </div>
          </div>
          <div class="text-gray-500 mb-6">{{ product.description }}</div>
          <ul class="text-sm text-gray-700 space-y-2 mb-6 text-left w-full">
            <li v-if="product.permanent">✔ 永久授权</li>
            <li v-else>✔ {{ product.validityDays }}天有效期</li>
            <li v-if="product.permanent">✔ 支持 3 台设备激活</li>
            <li v-if="product.code.includes('AI_SERVICE')">✔ 支持应用内所有AI功能</li>
            <li v-if="product.code.includes('CLOUD_STORAGE')">✔ 云端存储服务</li>
            <li v-if="product.permanent">✔ 所有核心功能</li>
            <li>✔ 免费更新</li>
            <li>✔ 技术支持</li>
          </ul>
          <!-- 云存储服务敬请期待 -->
          <button v-if="product.code.includes('CLOUD_STORAGE')"
            class="w-full py-2 px-4 bg-gray-400 text-white rounded-lg font-semibold cursor-not-allowed shadow" disabled>
            敬请期待
          </button>
          <!-- 其他产品正常购买按钮 -->
          <button v-else class="w-full py-2 px-4 text-white rounded-lg font-semibold transition-colors shadow" :class="{
            'bg-green-700 hover:bg-green-800': product.code.includes('AI_SERVICE'),
            'bg-blue-600 hover:bg-blue-700': product.permanent
          }" @click="handleProductPurchase(product)">
            立即购买
          </button>
          <span v-if="product.permanent"
            class="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
            推荐
          </span>
        </div>
      </div>

      <!-- 购买须知与接口说明 -->
      <div class="mt-12 bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">购买须知</h2>
        <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-6 text-sm">
          <li>购买后许可证将自动发送到您的邮箱，请妥善保存许可证密钥。</li>
          <li>每个许可证支持在指定数量的设备上使用。</li>
          <li>许可证密钥请在桌面应用中输入使用。</li>
          <li>反馈交流请通过QQ群联系开发者。</li>
          <li>支持微信支付，订单有效期为30分钟。</li>
          <li>产品为一次性购买，不支持退款。</li>
        </ul>

        <h2 class="text-xl font-bold text-gray-900 mb-4">技术支持</h2>
        <div class="bg-blue-50 rounded-lg p-4 text-sm">
          <div class="flex items-center space-x-4">
            <div>
              <span class="font-medium text-blue-800">QQ群：</span>
              <a href="https://qm.qq.com/q/UwZnWu2pu8" target="_blank"
                class="text-blue-600 hover:text-blue-800 underline">
                点击加入
              </a>
            </div>
            <!-- <div>
              <span class="font-medium text-blue-800">邮箱：</span>
              <span class="text-blue-600">ilikexff@163.com</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  getProducts,
  createPaymentOrder,
  pollOrderStatus,
  getLicensesByEmail,
  formatPrice,
  getOrderStatusDescription,
  getClientInfo
} from '../services/licenseService.js'
import MonthlyCardPurchase from '../components/MonthlyCardPurchase.vue'
import MonthlyCardActivation from '../components/MonthlyCardActivation.vue'

// 响应式数据
const products = ref([])
const loadingProducts = ref(true)
const showBuyModal = ref(false)
const showMonthlyCardModal = ref(false)
const showMonthlyCardActivationModal = ref(false)
const selectedProduct = ref(null)
const selectedServiceType = ref('')
const buyForm = ref({
  customerEmail: '',
  customerName: ''
})
const loading = ref(false)
const errorMsg = ref('')
const orderInfo = ref(null)
const orderStatus = ref('')
const licenseInfo = ref(null)
let pollingPromise = null

const qrCodeImg = ref('')
const monthlyCardPurchaseRef = ref(null)

// 滚动动画相关
let scrollObserver = null

// 生命周期钩子
onMounted(async () => {
  await loadProducts()
  // 初始化滚动动画
  initScrollAnimations()
})

onUnmounted(() => {
  if (pollingPromise) {
    pollingPromise = null
  }
  // 清理滚动监听器
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
})

// 加载产品列表
async function loadProducts() {
  try {
    loadingProducts.value = true
    const productList = await getProducts()
    if (productList && productList.length > 0) {
      // 使用API返回的所有产品，不进行过滤
      products.value = productList
    }
  } catch (error) {
    console.error('加载产品列表失败:', error)
  } finally {
    loadingProducts.value = false
  }
}



// 打开购买弹窗
function openBuyModal(product = null) {
  selectedProduct.value = product || products.value[0] // 默认选择第一个产品
  showBuyModal.value = true
}

// 打开月卡购买弹窗
function openMonthlyCardModal(serviceType) {
  selectedServiceType.value = serviceType
  showMonthlyCardModal.value = true
}

// 关闭月卡购买弹窗
function closeMonthlyCardModal() {
  showMonthlyCardModal.value = false
  selectedServiceType.value = ''
}

// 统一的产品购买处理
function handleProductPurchase(product) {
  if (product.code.includes('MONTHLY')) {
    // 月卡产品，使用月卡购买流程
    let serviceType = ''
    if (product.code.includes('AI_SERVICE')) {
      serviceType = 'AI_SERVICE'
    } else if (product.code.includes('CLOUD_STORAGE')) {
      serviceType = 'CLOUD_STORAGE'
    }
    openMonthlyCardModal(serviceType)
  } else {
    // 许可证产品，使用许可证购买流程
    openBuyModal(product)
  }
}

// 关闭弹窗时清理状态
function closeBuyModal() {
  showBuyModal.value = false
  selectedProduct.value = null
  buyForm.value = {
    customerEmail: '',
    customerName: ''
  }
  loading.value = false
  errorMsg.value = ''
  orderInfo.value = null
  orderStatus.value = ''
  licenseInfo.value = null
  qrCodeImg.value = ''
  if (pollingPromise) {
    pollingPromise = null
  }
}

// 创建订单
const submitBuy = async () => {
  if (!selectedProduct.value) {
    errorMsg.value = '请选择要购买的产品'
    return
  }

  loading.value = true
  errorMsg.value = ''
  orderInfo.value = null
  orderStatus.value = ''
  licenseInfo.value = null
  qrCodeImg.value = ''

  try {
    const orderData = {
      productCode: selectedProduct.value.code,
      customerEmail: buyForm.value.customerEmail,
      customerName: buyForm.value.customerName,
      clientInfo: getClientInfo(),
      remark: `Web端购买 - ${selectedProduct.value.name}`
    }

    const order = await createPaymentOrder(orderData)
    orderInfo.value = order
    orderStatus.value = order.status

    // 使用后端提供的二维码图片接口
    if (order.orderNo) {
      qrCodeImg.value = `https://ilikexff.cn/api/payment/orders/${order.orderNo}/qrcode-image`
    }

    // 开始轮询订单状态
    startPollingOrderStatus(order.orderNo)

  } catch (error) {
    errorMsg.value = error.message || '订单创建失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 开始轮询订单状态
async function startPollingOrderStatus(orderNo) {
  try {
    pollingPromise = pollOrderStatus(
      orderNo,
      (status) => {
        orderStatus.value = status.status
        // 更新订单信息
        if (orderInfo.value) {
          Object.assign(orderInfo.value, status)
        }
      },
      3000, // 3秒轮询一次
      200   // 最多轮询200次（10分钟）
    )

    const finalStatus = await pollingPromise

    if (finalStatus.status === 'PAID') {
      // 支付成功，获取许可证信息
      await fetchLicenseInfo(buyForm.value.customerEmail)
    }

  } catch (error) {
    console.error('轮询订单状态失败:', error)
    errorMsg.value = '订单状态查询超时，请手动刷新页面查看'
  } finally {
    pollingPromise = null
  }
}

// 获取许可证信息
async function fetchLicenseInfo(customerEmail) {
  try {
    const licenses = await getLicensesByEmail(customerEmail)
    if (licenses && licenses.length > 0) {
      // 获取最新的许可证（按创建时间排序，取第一个）
      const latestLicense = licenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      licenseInfo.value = latestLicense
    }
  } catch (error) {
    console.error('获取许可证信息失败:', error)
  }
}

// 复制许可证密钥
function copyLicenseKey() {
  if (licenseInfo.value && licenseInfo.value.licenseKey) {
    navigator.clipboard.writeText(licenseInfo.value.licenseKey).then(() => {
      // 可以添加一个提示
      console.log('许可证密钥已复制到剪贴板')
    }).catch(err => {
      console.error('复制失败:', err)
    })
  }
}

// 获取产品原价
function getOriginalPrice(product) {
  // 根据产品代码返回原价
  if (product.permanent) {
    return 30 // 许可证原价
  } else if (product.code.includes('AI_SERVICE')) {
    return 9.9 // AI服务原价
  } else if (product.code.includes('CLOUD_STORAGE')) {
    return 19.9 // 云存储服务原价
  }
  return null
}

// 计算折扣百分比
function getDiscountPercent(product) {
  const originalPrice = getOriginalPrice(product)
  if (!originalPrice || originalPrice <= product.price) {
    return null
  }
  const discount = Math.round((1 - product.price / originalPrice) * 10) / 10
  return discount
}

// 初始化滚动动画
function initScrollAnimations() {
  // 创建 Intersection Observer
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in-view')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // 观察所有需要动画的元素
  setTimeout(() => {
    const animateElements = document.querySelectorAll('.scroll-animate')
    animateElements.forEach((el) => {
      scrollObserver.observe(el)
    })
  }, 100)
}
</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}

/* 渐进式动画样式 */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scroll-animate.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
}

.scroll-animate.scale-up {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.scroll-animate.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 悬停效果增强 */
.hover\:scale-105:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
