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
              <div v-if="orderStatus === 'PAID'" class="text-green-600 font-bold mt-2">支付成功！正在获取许可证...</div>
              <div v-else-if="orderStatus === 'EXPIRED'" class="text-red-600 font-bold mt-2">订单已过期，请重新下单</div>
              <div v-else class="text-blue-600 mt-2">支付后自动获取许可证，无需手动刷新</div>
            </div>
            <div v-if="licenseInfo" class="bg-green-50 border border-green-200 rounded p-4 mt-4 text-green-700">
              <div class="font-bold mb-2">许可证信息</div>
              <div>许可证密钥：<span class="font-mono text-blue-700">{{ licenseInfo.licenseKey }}</span></div>
              <div>产品：{{ licenseInfo.productCode }}</div>
              <div>邮箱：{{ licenseInfo.customerEmail }}</div>
              <div>状态：{{ licenseInfo.statusDescription }}</div>
              <div v-if="licenseInfo.permanent">有效期：永久</div>
              <div v-else>有效期至：{{ licenseInfo.expiredAt }}</div>
              <div>最大激活数：{{ licenseInfo.maxActivations }}</div>
              <div>当前激活数：{{ licenseInfo.currentActivations }}</div>
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 许可证 -->
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border border-blue-100">
          <div class="mb-4">
            <span class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">许可证</span>
          </div>
          <div class="flex flex-col items-center mb-2">
            <span class="text-3xl font-bold text-blue-600">¥14.99</span>
            <span class="text-sm text-gray-400 line-through mt-1">原价 ¥29.99</span>
          </div>
          <div class="text-gray-500 mb-6">终身授权，个人/团队可选</div>
          <ul class="text-sm text-gray-700 space-y-2 mb-6 text-left w-full">
            <li>✔ 所有核心功能</li>
            <li>✔ 免费更新</li>
            <li>✔ 技术支持（QQ群）</li>
            <li>✔ 个人/团队/企业多种授权</li>
          </ul>
          <button class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow"
            @click="showBuyModal = true">
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
        <h2 class="text-xl font-bold text-gray-900 mb-2">购买须知</h2>
        <ul class="list-disc pl-6 text-gray-700 space-y-1 mb-4 text-sm">
          <li>购买后请妥善保存许可证信息，勿泄露给他人。</li>
          <li>如需发票，请在购买后联系客服。</li>
          <li>如遇支付或授权问题，可通过QQ群或技术支持渠道联系开发者。</li>
        </ul>
        <h2 class="text-xl font-bold text-gray-900 mb-2">许可证购买接口说明</h2>
        <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
          <p>接口地址：<span class="font-mono text-blue-600">https://welight.fun/api/license/buy</span></p>
          <p>请求方式：<span class="font-mono">POST</span></p>
          <p>参数示例：</p>
          <pre class="bg-gray-100 rounded p-2 overflow-x-auto text-xs">
{
  "type": "personal | team | custom",
  "user": "邮箱或QQ号",
  "device": "设备唯一标识（可选）"
}
          </pre>
          <p>返回结果：</p>
          <pre class="bg-gray-100 rounded p-2 overflow-x-auto text-xs">
{
  "success": true,
  "license_key": "XXXX-XXXX-XXXX-XXXX",
  "expire": "永久",
  "type": "personal"
}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showBuyModal = ref(false)
const buyForm = ref({
  customerEmail: '',
  customerName: ''
})
const loading = ref(false)
const errorMsg = ref('')
const orderInfo = ref(null)
const orderStatus = ref('')
const licenseInfo = ref(null)
let pollingTimer = null

const qrCodeImg = ref('')

// 关闭弹窗时清理状态
function closeBuyModal() {
  showBuyModal.value = false
  buyForm.value = {
    customerEmail: '',
    customerName: '',
    clientInfo: ''
  }
  loading.value = false
  errorMsg.value = ''
  orderInfo.value = null
  orderStatus.value = ''
  licenseInfo.value = null
  qrCodeImg.value = ''
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
  }
}

// 创建订单
const submitBuy = async () => {
  loading.value = true
  errorMsg.value = ''
  orderInfo.value = null
  orderStatus.value = ''
  licenseInfo.value = null
  qrCodeImg.value = ''
  try {
    const res = await fetch('https://ilikexff.cn/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productCode: 'WELIGHT_STANDARD',
        customerEmail: buyForm.value.customerEmail,
        customerName: buyForm.value.customerName,
        clientInfo: buyForm.value.clientInfo,
        remark: '桌面应用购买'
      })
    })
    const data = await res.json()
    if (data.code === 200 && data.data) {
      orderInfo.value = data.data
      orderStatus.value = data.data.status
      // 生成二维码图片
      qrCodeImg.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.data.qrCode)}`
      // 开始轮询订单状态
      pollingTimer = setInterval(checkOrderStatus, 3500)
    } else {
      errorMsg.value = data.message || '订单创建失败，请稍后重试'
    }
  } catch (e) {
    errorMsg.value = '网络错误，请稍后重试'
  }
  loading.value = false
}

// 轮询订单状态
const checkOrderStatus = async () => {
  if (!orderInfo.value) return
  try {
    const res = await fetch(`https://ilikexff.cn/api/payment/order-status/${orderInfo.value.orderNo}`)
    const data = await res.json()
    if (data.code === 200 && data.data) {
      orderStatus.value = data.data.status
      if (orderStatus.value === 'PAID') {
        clearInterval(pollingTimer)
        pollingTimer = null
        // 获取许可证信息
        fetchLicenseInfo()
      }
      if (orderStatus.value === 'EXPIRED' || orderStatus.value === 'CANCELLED') {
        clearInterval(pollingTimer)
        pollingTimer = null
      }
    }
  } catch (e) {
    // 网络错误忽略，继续轮询
  }
}

// 获取许可证信息
const fetchLicenseInfo = async () => {
  try {
    const res = await fetch(`https://ilikexff.cn/api/licenses/by-order/${orderInfo.value.orderNo}`)
    const data = await res.json()
    if (data.code === 200 && data.data) {
      licenseInfo.value = data.data
    }
  } catch (e) {
    // 忽略错误
  }
}
</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}
</style>
