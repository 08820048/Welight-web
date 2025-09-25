<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 mt-20">
    <div class="max-w-4xl mx-auto">
      <!-- 购买弹窗 -->
      <div v-if="showBuyModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
          <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="showBuyModal = false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 class="text-2xl font-bold mb-4 text-blue-700">购买许可证</h2>
          <form @submit.prevent="submitBuy" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱或QQ号</label>
              <input v-model="buyForm.user" required type="text" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="请输入邮箱或QQ号" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">设备唯一标识（可选）</label>
              <input v-model="buyForm.device" type="text" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="如有请填写" />
            </div>
            <button type="submit" :disabled="loading" class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow flex items-center justify-center">
              <span v-if="loading" class="animate-spin mr-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path d="M12 2v4" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M12 18v4" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>
              提交购买
            </button>
            <div v-if="errorMsg" class="text-red-600 text-sm mt-2">{{ errorMsg }}</div>
            <div v-if="result" class="bg-green-50 border border-green-200 rounded p-4 mt-4 text-green-700">
              <div class="font-bold mb-2">购买成功！</div>
              <div>许可证密钥：<span class="font-mono text-blue-700">{{ result.license_key }}</span></div>
              <div>授权类型：{{ result.type }}</div>
              <div>有效期：{{ result.expire }}</div>
            </div>
          </form>
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
  user: '',
  device: ''
})
const loading = ref(false)
const result = ref(null)
const errorMsg = ref('')

const submitBuy = async () => {
  loading.value = true
  errorMsg.value = ''
  result.value = null
  try {
    const res = await fetch('https://welight.fun/api/license/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'personal',
        user: buyForm.value.user,
        device: buyForm.value.device
      })
    })
    const data = await res.json()
    if (data.success) {
      result.value = data
    } else {
      errorMsg.value = data.message || '购买失败，请稍后重试'
    }
  } catch (e) {
    errorMsg.value = '网络错误，请稍后重试'
  }
  loading.value = false
}
</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}
</style>
