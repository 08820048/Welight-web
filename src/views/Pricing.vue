<template>
  <div class="min-h-screen text-gray-200 py-12 px-4 pt-24 relative overflow-hidden">
    <div class="max-w-4xl mx-auto">
      <!-- 购买弹窗 -->
      <div v-if="showBuyModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 modal-backdrop animate-fade-in">
        <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative modal-content animate-scale-in">
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
              <!-- 服务条款和隐私政策提示 -->
              <div class="text-xs text-gray-500 text-center mb-3">
                购买表示您已同意我们的
                <button @click="showTermsModal = true"
                  class="text-green-600 hover:text-green-700 underline">《服务条款》</button>
                和
                <button @click="showPrivacyModal = true"
                  class="text-green-600 hover:text-green-700 underline">《隐私政策》</button>
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
      <div class="text-center mb-10 animate-fade-in-up delay-100">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2 animate-fade-in-up delay-200">定价与服务购买</h1>
        <p class="text-lg text-gray-600 mb-4 animate-fade-in-up delay-300">
          选择适合您的许可证或月卡服务，享受完整功能与优质服务</p>
        <div class="flex justify-center animate-scale-in delay-400">
          <button @click="showMonthlyCardActivationModal = true"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm transform hover:scale-105 animate-enhanced-bounce delay-500">
            已有月卡？点击激活
          </button>
        </div>
      </div>

      <!-- 月卡购买弹窗 -->
      <div v-if="showMonthlyCardModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 modal-backdrop animate-fade-in">
        <MonthlyCardPurchase ref="monthlyCardPurchaseRef" :preselected-service-type="selectedServiceType"
          @close="closeMonthlyCardModal" class="animate-scale-in" />
      </div>

      <!-- 月卡激活弹窗 -->
      <div v-if="showMonthlyCardActivationModal"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 modal-backdrop animate-fade-in">
        <div class="relative max-w-lg w-full mx-4 modal-content animate-scale-in">
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
      <div v-if="loadingProducts" class="text-center py-12 animate-fade-in-up delay-600">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p class="mt-2 text-gray-600 animate-fade-in-up delay-700">正在加载产品信息...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <!-- 所有产品卡片（基于API数据） -->
        <div v-for="(product, index) in products" :key="product.id"
          class="bg-white rounded-xl shadow-lg flex flex-col items-center relative overflow-hidden product-card animate-scale-in border-2 border-white group"
          :class="[
            `delay-${600 + index * 100}`,
            product.permanent ? 'p-10 recommended-card' : 'p-8'
          ]">
          <!-- 内部渐隐效果层 -->
          <div class="absolute inset-0 pointer-events-none rounded" :class="{
            'ai-service-gradient-overlay': product.code.includes('AI_SERVICE'),
            'cloud-storage-gradient-overlay': product.code.includes('CLOUD_STORAGE'),
            'monthly-card-gradient-overlay': product.code.includes('CREDITS'),
            'permanent-gradient-overlay': product.permanent && !product.code.includes('CREDITS')
          }"></div>

          <!-- 产品名称标签 -->
          <span class="inline-block text-xs font-semibold px-3 py-1 rounded-full" :class="{
            'bg-orange-100 text-orange-700': product.code.includes('AI_SERVICE'),
            'bg-purple-100 text-purple-700': product.code.includes('CLOUD_STORAGE'),
            'bg-blue-100 text-blue-700': product.code.includes('CREDITS'),
            'text-white': product.permanent && !product.code.includes('CREDITS')
          }" :style="product.permanent && !product.code.includes('CREDITS') ? 'background-color: #3498db;' : ''">
            {{ product.code.includes('CREDITS') ? (product.packageName || product.name) : product.name }}
          </span>
          <div class="flex flex-col items-center mb-2 transform transition-all duration-200 group-hover:scale-101">
            <!-- 原价显示 -->
            <div v-if="getOriginalPrice(product)"
              class="text-sm text-gray-400 line-through mb-1 transition-colors duration-200 group-hover:text-gray-500">
              原价 ¥{{ getOriginalPrice(product) }}{{ product.permanent ? '' : '/月' }}
            </div>
            <!-- 现价显示 -->
            <div class="text-center">
              <!-- 月卡产品显示折合天价格 -->
              <div v-if="product.code.includes('MONTHLY')" class="flex items-baseline justify-center space-x-1">
                <span class="text-lg font-light" style="color: #737a87;">月卡低至</span>
                <span class="text-lg font-light" style="color: #737a87;">¥</span>
                <span class="text-3xl font-bold text-black">{{ getDailyPrice(product) }}</span>
                <span class="text-lg font-light" style="color: #737a87;">/天</span>
              </div>
              <!-- 积分套餐显示月卡风格价格 -->
              <div v-else-if="product.code.includes('CREDITS')" class="flex items-baseline justify-center space-x-1">
                <span class="text-lg font-light text-gray-700">积分套餐</span>
                <span class="text-lg font-light" style="color: #737a87;">¥</span>
                <span class="text-3xl font-bold text-gray-900">{{ product.price }}</span>
                <span class="text-lg font-light" style="color: #737a87;">/永久</span>
              </div>
              <!-- 其他产品显示原价格 -->
              <div v-else class="flex items-baseline justify-center space-x-1">
                <span class="text-lg font-light" style="color: #737a87;">¥</span>
                <span class="text-3xl font-bold text-black">{{ product.price }}</span>
                <span class="text-lg font-light" style="color: #737a87;">{{ product.permanent ? '/永久' : '/月' }}</span>
              </div>
            </div>
            <!-- 折扣标签 -->
            <div v-if="getDiscountPercent(product)" class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full mt-1">
              {{ getDiscountPercent(product) }}折
            </div>
            <!-- 积分套餐永久有效标签 -->
            <div v-if="product.code.includes('CREDITS')"
              class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mt-1">
              永久有效
            </div>
          </div>
          <div class="text-gray-500 mb-6">{{ product.description }}</div>
          <ul class="text-sm text-gray-700 space-y-2 mb-6 text-left w-full">
            <!-- 积分套餐功能列表 -->
            <template v-if="product.code.includes('CREDITS')">
              <li><span class="text-green-600">✔</span> {{ getCreditsAmountLocal(product) }}积分</li>
              <li><span class="text-green-600">✔</span> 支持AI功能使用</li>
              <li><span class="text-green-600">✔</span> 永久有效</li>
              <li><span class="text-green-600">✔</span> 灵活消费</li>
              <li><span class="text-green-600">✔</span> 按需使用</li>
              <li><span class="text-green-600">✔</span> 免费更新</li>
              <li><span class="text-green-600">✔</span> 技术支持</li>
            </template>
            <!-- 其他产品功能列表 -->
            <template v-else>
              <li v-if="product.permanent"><span class="text-green-600">✔</span> 永久授权</li>
              <li v-else><span class="text-green-600">✔</span> {{ product.validityDays }}天有效期</li>
              <li v-if="product.permanent"><span class="text-green-600">✔</span> 7天免费试用</li>
              <li v-if="product.permanent"><span class="text-green-600">✔</span> 支持 3 台设备激活</li>
              <li v-if="product.code.includes('AI_SERVICE')"><span class="text-green-600">✔</span> 支持应用内所有AI功能</li>
              <li v-if="product.code.includes('CLOUD_STORAGE')"><span class="text-green-600">✔</span> 云端存储服务</li>
              <li v-if="product.permanent"><span class="text-green-600">✔</span> 所有核心功能</li>
              <li><span class="text-green-600">✔</span> 免费更新</li>
              <li><span class="text-green-600">✔</span> 技术支持</li>
            </template>
          </ul>
          <!-- 云存储服务敬请期待 -->
          <button v-if="product.code.includes('CLOUD_STORAGE')"
            class="w-full py-2 px-4 bg-gray-400 text-white rounded-lg font-semibold cursor-not-allowed shadow" disabled>
            即将推出
          </button>
          <!-- 积分套餐购买 -->
          <div v-else-if="product.code.includes('CREDITS')" class="space-y-2">
            <button @click="purchaseProduct(product)"
              class="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition-colors duration-200">
              立即购买
            </button>
            <button @click="showCreditsModal = true"
              class="w-full py-2 px-4 bg-green-50 text-green-600 border border-green-200 rounded-lg font-medium hover:bg-green-100 transition-colors duration-200">
              更多套餐
            </button>
          </div>
          <!-- 其他产品正常购买按钮 -->
          <button v-else
            class="w-full py-2 px-4 text-white rounded-lg font-semibold shadow transform transition-all duration-200 hover:shadow-lg purchase-button"
            :class="{
              'bg-orange-600 hover:bg-orange-700': product.code.includes('AI_SERVICE'),
              'bg-blue-500 hover:bg-blue-600': product.permanent
            }" @click="handleProductPurchase(product)">
            立即购买
          </button>
          <!-- 右上角条状标签 - 参考源码实现 -->
          <div v-if="!product.code.includes('MONTHLY')"
            class="absolute top-4 -right-10 text-white text-xs font-bold px-12 py-1 transform rotate-45 shadow-lg transition-all duration-200 group-hover:scale-105"
            :style="{ 'background-color': product.code.includes('CREDITS') ? '#31c891' : '#3498db' }">
            {{ product.permanent && !product.code.includes('CREDITS') ? '最受欢迎' : '热门' }}
          </div>
        </div>
      </div>

      <!-- 购买须知与接口说明 -->
      <div class="mt-12 bg-white rounded-xl shadow-lg p-6 animate-fade-in-up delay-1000">
        <h2 class="text-xl font-bold text-gray-900 mb-4 animate-fade-in-left delay-1100">购买须知
        </h2>
        <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-6 text-sm">
          <li class="animate-fade-in-up delay-1700">请在应用使用过程中确保网络通畅，关闭VPN，避免状态检测异常，影响你的使用体验</li>
          <li class="animate-fade-in-up delay-1200">购买后许可证将自动发送到您的邮箱，请妥善保存许可证密钥。</li>
          <li class="animate-fade-in-up delay-1300">每个许可证支持在指定数量的设备上使用。</li>
          <li class="animate-fade-in-up delay-1400">许可证密钥请在桌面应用中输入使用。</li>
          <li class="animate-fade-in-up delay-1500">反馈交流请通过QQ群联系开发者。</li>
          <li class="animate-fade-in-up delay-1600">支持微信支付，订单有效期为30分钟。</li>
          <li class="animate-fade-in-up delay-1700">产品为一次性购买，不支持退款。</li>
        </ul>

        <h2 class="text-xl font-bold text-gray-900 mb-4 animate-fade-in-left delay-1800">交流反馈
        </h2>
        <div class="bg-blue-50 rounded-lg p-4 text-sm animate-scale-in delay-1900">
          <div class="flex items-center space-x-4">
            <div>
              <span class="font-medium text-blue-800">QQ群：</span>
              <a href="https://qm.qq.com/q/UwZnWu2pu8" target="_blank"
                class="text-blue-600 hover:text-blue-800 underline">
                点击加入
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 定价说明悬浮按钮 -->
    <FloatingPricingInfoButton />

    <!-- 服务条款模态框 -->
    <TermsOfServiceModal :isVisible="showTermsModal" @close="showTermsModal = false" />

    <!-- 隐私政策模态框 -->
    <PrivacyPolicyModal :isVisible="showPrivacyModal" @close="showPrivacyModal = false" />

    <!-- 积分套餐购买组件 -->
    <CreditsPurchase v-if="showCreditsModal" @close="showCreditsModal = false"
      @success="handleCreditsPurchaseSuccess" />

    <!-- 成功提示Toast -->
    <div v-if="showToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>{{ toastMessage }}</span>
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
import {
  getCreditPackages
} from '../services/creditsService.js'
import MonthlyCardPurchase from '../components/MonthlyCardPurchase.vue'
import MonthlyCardActivation from '../components/MonthlyCardActivation.vue'
import CreditsPurchase from '../components/CreditsPurchase.vue'
import FloatingPricingInfoButton from '../components/FloatingPricingInfoButton.vue'
import TermsOfServiceModal from '../components/TermsOfServiceModal.vue'
import PrivacyPolicyModal from '../components/PrivacyPolicyModal.vue'

/**
 * 动态加载撒花特效库
 */
function loadConfettiLibrary() {
  return new Promise((resolve, reject) => {
    console.log('🔍 检查confetti库状态，当前类型:', typeof confetti)
    if (typeof confetti !== 'undefined') {
      console.log('✅ confetti库已存在，无需重复加载')
      resolve()
      return
    }

    console.log('📦 开始动态加载confetti库...')
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js'
    script.onload = () => {
      console.log('✅ confetti库加载成功，类型:', typeof confetti)
      resolve()
    }
    script.onerror = (error) => {
      console.error('❌ confetti库加载失败:', error)
      reject(new Error('Failed to load confetti library'))
    }
    document.head.appendChild(script)
    console.log('📡 script标签已添加到head')
  })
}

/**
 * 触发支付成功撒花特效
 */
async function triggerPaymentSuccessConfetti() {
  try {
    console.log('🎯 开始触发支付成功撒花特效...')
    await loadConfettiLibrary()
    console.log('📦 撒花库加载完成，confetti类型:', typeof confetti)

    if (typeof confetti === 'undefined') {
      throw new Error('confetti库未正确加载')
    }

    console.log('🎊 执行撒花特效...')
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22C55E', '#4ADE80', '#BBF7D0', '#F1F5F9', '#10B981']
    })
    console.log('✅ 撒花特效执行完成')
  } catch (error) {
    console.error('❌ 撒花特效加载失败:', error)
    // 显示用户友好的错误提示
    alert('撒花特效加载失败，但支付已成功完成！')
  }
}

// 响应式数据
const products = ref([])
const allCreditsProducts = ref([])
const loadingProducts = ref(true)
const showBuyModal = ref(false)
const showMonthlyCardModal = ref(false)
const showMonthlyCardActivationModal = ref(false)
const showTermsModal = ref(false)
const showPrivacyModal = ref(false)
const showCreditsModal = ref(false)
const selectedProduct = ref(null)
const toastMessage = ref('')
const showToast = ref(false)
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
  // 预加载撒花特效库
  loadConfettiLibrary().catch(console.error)
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

    // 获取所有产品（包括许可证和积分套餐）
    const allProducts = await getProducts()

    console.log('获取到的所有产品:', allProducts)

    // 重新排序：AI服务、积分套餐（中间推荐位置）、许可证、云存储
    const sortedProducts = []
    let licenseProduct = null

    // 1. AI服务产品
    if (allProducts && allProducts.length > 0) {
      const aiProducts = allProducts.filter(p =>
        (p.code && p.code.includes('AI_SERVICE')) ||
        (p.productCode && p.productCode.includes('AI_SERVICE'))
      )
      sortedProducts.push(...aiProducts)
    }

    // 2. 先保存许可证产品，稍后添加
    if (allProducts && allProducts.length > 0) {
      licenseProduct = allProducts.find(p =>
        p.permanent &&
        !(p.code && p.code.includes('CREDITS')) &&
        !(p.productCode && p.productCode.includes('CREDITS'))
      )
    }

    // 3. 积分套餐产品（使用新的API获取）
    try {
      const creditPackagesResult = await getCreditPackages()
      if (creditPackagesResult.success && creditPackagesResult.data) {
        const creditPackages = creditPackagesResult.data

        // 转换API数据格式为组件期望的格式
        const convertedPackages = creditPackages
          .filter(pkg => pkg.isActive !== false) // 只显示激活的套餐
          .map(pkg => ({
            id: pkg.id,
            packageCode: pkg.code,
            packageName: pkg.name,
            packageDescription: pkg.description || '',
            credits: pkg.credits,
            originalPrice: pkg.price,
            currentPrice: pkg.price,
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
            isPopular: pkg.recommendTag === '热门选择',
            // 保留原始API字段以便兼容
            code: pkg.code,
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            permanent: false
          }))

        // 保存所有积分套餐到弹窗使用
        allCreditsProducts.value = convertedPackages
        console.log('保存的积分套餐数据:', convertedPackages)

        // 选择一个标准积分套餐作为热门套餐展示
        // 优先选择有推荐标签的，其次选择中等价位的标准套餐
        let selectedPackage = null

        // 1. 优先选择有"热门"或"推荐"标签的套餐
        selectedPackage = convertedPackages.find(p =>
          p.isActive &&
          p.packageType === 'STANDARD' &&
          (p.recommendedFor?.includes('热门') || p.isPopular || p.recommendTag?.includes('热门'))
        )

        // 2. 如果没有热门套餐，选择中等价位的标准套餐（500-1000积分范围）
        if (!selectedPackage) {
          selectedPackage = convertedPackages.find(p =>
            p.isActive &&
            p.packageType === 'STANDARD' &&
            p.credits >= 500 &&
            p.credits <= 1000
          )
        }

        // 3. 如果还没有，就选择第一个标准套餐
        if (!selectedPackage) {
          selectedPackage = convertedPackages.find(p =>
            p.isActive &&
            p.packageType === 'STANDARD'
          )
        }

        // 4. 最后兜底，选择任意一个激活的套餐
        if (!selectedPackage && convertedPackages.length > 0) {
          selectedPackage = convertedPackages.find(p => p.isActive) || convertedPackages[0]
        }

        if (selectedPackage) {
          // 积分套餐放在中间位置（第2位）
          sortedProducts.push(selectedPackage)
          console.log('选择的热门积分套餐:', selectedPackage.name, selectedPackage.credits + '积分')
        }
      } else {
        console.warn('获取积分套餐失败，使用降级数据:', creditPackagesResult.error)
        // 使用降级数据（模拟数据已经是正确格式）
        if (creditPackagesResult.data) {
          allCreditsProducts.value = creditPackagesResult.data
          const recommendedCredits = creditPackagesResult.data.filter(p =>
            p.packageCode === 'CREDITS_500' || p.isPopular
          )
          if (recommendedCredits.length > 0) {
            const convertedPackage = {
              ...recommendedCredits[0],
              code: recommendedCredits[0].packageCode,
              name: recommendedCredits[0].packageName,
              description: recommendedCredits[0].packageDescription,
              price: recommendedCredits[0].currentPrice,
              permanent: false
            }
            sortedProducts.push(convertedPackage)
          }
        }
      }
    } catch (error) {
      console.error('加载积分套餐时发生错误:', error)
    }

    // 3. 许可证产品（放在积分套餐后面）
    if (licenseProduct) {
      sortedProducts.push(licenseProduct)
    }

    // 4. 云存储产品
    if (allProducts && allProducts.length > 0) {
      const storageProducts = allProducts.filter(p =>
        (p.code && p.code.includes('CLOUD_STORAGE')) ||
        (p.productCode && p.productCode.includes('CLOUD_STORAGE'))
      )
      sortedProducts.push(...storageProducts)
    }

    products.value = sortedProducts
    console.log('最终产品列表:', sortedProducts)

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
    console.log('🔍 开始获取许可证信息，邮箱:', customerEmail)
    const licenses = await getLicensesByEmail(customerEmail)
    console.log('📄 获取到的许可证数量:', licenses ? licenses.length : 0)

    if (licenses && licenses.length > 0) {
      // 获取最新的许可证（按创建时间排序，取第一个）
      const latestLicense = licenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      licenseInfo.value = latestLicense
      console.log('✅ 许可证信息已更新:', latestLicense.licenseKey)

      // 支付成功，触发撒花特效
      console.log('⏰ 500ms后将触发撒花特效...')
      setTimeout(() => {
        console.log('🎊 开始执行撒花特效')
        triggerPaymentSuccessConfetti()
      }, 500) // 延迟500ms让用户看到许可证信息后再撒花
    } else {
      console.log('⚠️ 未找到有效的许可证')
    }
  } catch (error) {
    console.error('❌ 获取许可证信息失败:', error)
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

// 计算月卡折合天价格
function getDailyPrice(product) {
  if (!product.code.includes('MONTHLY')) {
    return null
  }
  // 按30天计算
  const dailyPrice = (product.price / 30).toFixed(2)
  return dailyPrice
}

// 获取积分套餐的积分数量
function getCreditsAmountLocal(product) {
  if (!product) return 0

  // 如果产品直接有credits字段（新的积分套餐数据结构）
  if (product.credits) {
    return product.credits
  }

  // 兼容旧的数据结构
  if (!product.code.includes('CREDITS') || !product.metadata) {
    return 0
  }

  try {
    const metadata = JSON.parse(product.metadata)
    return metadata.credits || 0
  } catch (error) {
    console.error('解析积分套餐metadata失败:', error)
    return 0
  }
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
    // 观察 scroll-animate 元素
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate')
    scrollAnimateElements.forEach((el) => {
      scrollObserver.observe(el)
    })

    // 观察新的动画类名元素
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in, .animate-fade-in-left, .animate-enhanced-bounce')
    animateElements.forEach((el) => {
      scrollObserver.observe(el)
    })
  }, 100)
}

// 统一的产品购买方法
async function purchaseProduct(product) {
  try {
    if (product.code.includes('CREDITS')) {
      // 积分套餐购买流程 - 直接打开积分套餐购买组件
      showCreditsModal.value = true
    } else if (product.code.includes('MONTHLY')) {
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
  } catch (error) {
    console.error('购买失败:', error)
    alert(`购买失败：${error.message}`)
  }
}



// 处理积分套餐购买成功
function handleCreditsPurchaseSuccess(result) {
  showCreditsModal.value = false

  // 显示成功消息
  const message = `🎉 积分购买成功！获得 ${result.credits || 0} 积分`

  // 显示撒花特效
  loadConfettiLibrary().then(() => {
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }).catch(error => {
    console.warn('撒花特效加载失败:', error)
  })

  // 显示现代化的成功提示
  showSuccessToast(message)
}

// 显示成功提示toast
function showSuccessToast(message) {
  toastMessage.value = message
  showToast.value = true

  // 3秒后自动隐藏
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}








</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}

/* Toast动画 */
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
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

/* 新的动画类名触发机制 */
.animate-fade-in-up.animate-in-view {
  opacity: 1;
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-scale-in.animate-in-view {
  opacity: 1;
  animation: scaleIn 0.8s ease-out forwards;
}

.animate-fade-in-left.animate-in-view {
  opacity: 1;
  animation: fadeInLeft 0.8s ease-out forwards;
}

.animate-enhanced-bounce.animate-in-view {
  opacity: 1;
  animation: enhanced-bounce 1.5s ease-in-out;
}

/* 动画关键帧定义 */
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enhanced-bounce {

  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }

  70% {
    transform: translate3d(0, -4px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* 卡片内部渐隐效果 */
.ai-service-gradient-overlay {
  background: linear-gradient(to bottom, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.08) 40%, transparent 70%);
}

.cloud-storage-gradient-overlay {
  background: linear-gradient(to bottom, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%);
}

.monthly-card-gradient-overlay {
  background: linear-gradient(to bottom, rgba(49, 200, 145, 0.15) 0%, rgba(49, 200, 145, 0.08) 40%, transparent 70%);
}

.permanent-gradient-overlay {
  background: linear-gradient(to bottom, rgba(52, 152, 219, 0.15) 0%, rgba(52, 152, 219, 0.08) 40%, transparent 70%);
}

/* 产品卡片丝滑悬停效果 */
.product-card {
  transform: translateY(0) scale(1);
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    filter 0.3s ease-out;
  will-change: transform, box-shadow, filter;
  backface-visibility: hidden;
}

.product-card:hover {
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 10px 20px -5px rgba(0, 0, 0, 0.1),
    0 4px 6px -1px rgba(0, 0, 0, 0.1);
  filter: brightness(1.01);
}





/* 渐隐效果层的hover增强 */
.product-card:hover .ai-service-gradient-overlay {
  background: linear-gradient(to bottom, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.1) 40%, transparent 70%);
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-card:hover .cloud-storage-gradient-overlay {
  background: linear-gradient(to bottom, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%);
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-card:hover .monthly-card-gradient-overlay {
  background: linear-gradient(to bottom, rgba(49, 200, 145, 0.2) 0%, rgba(49, 200, 145, 0.1) 40%, transparent 70%);
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-card:hover .permanent-gradient-overlay {
  background: linear-gradient(to bottom, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0.1) 40%, transparent 70%);
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 为渐隐效果层添加基础过渡 */
.ai-service-gradient-overlay,
.cloud-storage-gradient-overlay,
.monthly-card-gradient-overlay,
.permanent-gradient-overlay {
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 购买按钮简洁动效 */
.purchase-button {
  transition: all 0.2s ease-out;
}

.purchase-button:hover {
  transform: translateY(-1px);
}

.purchase-button:active {
  transform: translateY(0);
}

/* 自定义微缩放效果 */
.group-hover\:scale-102:hover {
  transform: scale(1.02);
}

.group-hover\:scale-101:hover {
  transform: scale(1.01);
}



/* 购买弹窗动画 */
.modal-backdrop {
  animation: modalBackdropFadeIn 0.3s ease-out forwards;
}

.modal-content {
  animation: modalContentSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes modalBackdropFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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
