<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 mt-20">
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
              <span class="text-lg font-bold text-blue-700">{{ formatPrice(selectedProduct.price, selectedProduct.currency) }}</span>
              <span v-if="selectedProduct.permanent" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">永久授权</span>
            </div>
          </div>

          <div v-if="!orderInfo">
            <form @submit.prevent="submitBuy" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱 <span class="text-red-500">*</span></label>
                <input v-model="buyForm.customerEmail" required type="email" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="请输入邮箱（用于接收许可证）" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名（选填）</label>
                <input v-model="buyForm.customerName" type="text" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="可填写姓名或昵称" />
              </div>
              <button type="submit" :disabled="loading" class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow flex items-center justify-center">
                <span v-if="loading" class="animate-spin mr-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path d="M12 2v4" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M12 18v4" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>
                创建订单并获取支付二维码
              </button>
              <div v-if="errorMsg" class="text-red-600 text-sm mt-2">{{ errorMsg }}</div>
            </form>
          </div>
          <div v-else>
            <div class="mb-4 text-center">
              <div class="text-lg font-bold text-blue-700 mb-1">订单金额：¥{{ orderInfo.amount }} {{ orderInfo.currency }}</div>
              <div class="text-gray-600 mb-2">请使用微信扫码支付</div>
              <img :src="qrCodeImg" alt="支付二维码" class="mx-auto w-40 h-40 rounded shadow border border-gray-200" v-if="qrCodeImg" />
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
      <div class="text-center mb-10">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">定价与许可证购买</h1>
        <p class="text-lg text-gray-600">选择适合您的许可证类型，享受完整功能与优质服务</p>
      </div>

      <!-- 产品卡片区 -->
      <div v-if="loadingProducts" class="text-center py-12">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p class="mt-2 text-gray-600">正在加载产品信息...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 动态产品卡片 -->
        <div v-for="product in products" :key="product.id"
          class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border border-blue-100">
          <div class="mb-4">
            <span class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">许可证</span>
          </div>
          <div class="flex flex-col items-center mb-2">
            <span class="text-3xl font-bold text-blue-600">{{ formatPrice(product.price, product.currency) }}</span>
          </div>
          <div class="text-gray-500 mb-6">{{ product.description }}</div>
          <ul class="text-sm text-gray-700 space-y-2 mb-6 text-left w-full">
            <li>✔ 所有核心功能</li>
            <li>✔ 免费更新</li>
            <li>✔ 技术支持（QQ群）</li>
            <li v-if="product.permanent">✔ 永久授权</li>
            <li v-else>✔ {{ product.validityDays }}天有效期</li>
            <li>✔ 最多{{ product.maxActivations }}台设备激活</li>
          </ul>
          <button class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow"
            @click="openBuyModal(product)">
            立即购买
          </button>
        </div>

        <!-- AI服务 -->
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-blue-500 relative">
          <div class="mb-4">
            <span class="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">AI服务</span>
          </div>
          <div class="text-3xl font-bold text-green-700 mb-2">¥9.9/月</div>
          <div class="text-gray-500 mb-6">智能写作、AI绘图、模型调用</div>
          <ul class="text-sm text-gray-700 space-y-2 mb-6 text-left w-full">
            <li>✔ 多模型支持（如DeepSeek、Ollama等）</li>
            <li>✔ 高速API通道</li>
            <li>✔ 个人/团队套餐</li>
            <li>✔ 专属技术支持</li>
          </ul>
          <button class="w-full py-2 px-4 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors shadow">
            立即订阅
          </button>
          <span class="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">推荐</span>
        </div>

        <!-- 云存储 -->
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border border-blue-100">
          <div class="mb-4">
            <span class="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">云存储</span>
          </div>
          <div class="text-3xl font-bold text-purple-600 mb-2">¥19/年</div>
          <div class="text-gray-500 mb-6">图片/文件云端存储，安全可靠</div>
          <ul class="text-sm text-gray-700 space-y-2 mb-6 text-left w-full">
            <li>✔ 七牛云/阿里云等主流服务</li>
            <li>✔ 高速上传下载</li>
            <li>✔ 数据加密与备份</li>
            <li>✔ 技术支持</li>
          </ul>
          <button class="w-full py-2 px-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow">
            立即开通
          </button>
        </div>
      </div>

      <!-- 购买须知与接口说明 -->
      <div class="mt-12 bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">购买须知</h2>
        <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-6 text-sm">
          <li>购买后许可证将自动发送到您的邮箱，请妥善保存许可证密钥。</li>
          <li>每个许可证支持在指定数量的设备上使用。</li>
          <li>许可证密钥请在桌面应用中输入使用。</li>
          <li>如需发票或遇到技术问题，请通过QQ群联系客服。</li>
          <li>支持微信支付，订单有效期为30分钟。</li>
        </ul>

        <h2 class="text-xl font-bold text-gray-900 mb-4">技术支持</h2>
        <div class="bg-blue-50 rounded-lg p-4 text-sm">
          <div class="flex items-center space-x-4">
            <div>
              <span class="font-medium text-blue-800">QQ群：</span>
              <a href="https://qm.qq.com/q/UwZnWu2pu8" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                点击加入
              </a>
            </div>
            <div>
              <span class="font-medium text-blue-800">邮箱：</span>
              <span class="text-blue-600">ilikexff@163.com</span>
            </div>
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

// 响应式数据
const products = ref([])
const loadingProducts = ref(true)
const showBuyModal = ref(false)
const selectedProduct = ref(null)
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

// 生命周期钩子
onMounted(async () => {
  await loadProducts()
})

onUnmounted(() => {
  if (pollingPromise) {
    pollingPromise = null
  }
})

// 加载产品列表
async function loadProducts() {
  try {
    loadingProducts.value = true
    const productList = await getProducts()
    if (productList && productList.length > 0) {
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

    // 生成二维码图片
    if (order.qrCode) {
      qrCodeImg.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(order.qrCode)}`
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
</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}
</style>
