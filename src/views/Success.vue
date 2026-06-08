<template>
  <div class="min-h-screen bg-white px-4 pb-16 pt-28 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <div class="mx-auto max-w-3xl">
      <div class="surface-soft p-6 md:p-8">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Dodo Payments</p>
            <h1 class="mt-2 text-3xl font-extrabold tracking-tight">
              {{ paymentSucceeded ? '购买完成' : '支付状态待确认' }}
            </h1>
          </div>
          <span
            class="rounded-full px-3 py-1 text-sm font-semibold"
            :class="paymentSucceeded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'"
          >
            {{ paymentStatusText }}
          </span>
        </div>

        <div v-if="returnParams.licenseKey" class="surface-soft-inner surface-soft-outline rounded-2xl p-4">
          <div class="mb-3 flex items-center justify-between gap-3">
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">许可证密钥</div>
              <div class="mt-1 break-all font-mono text-sm font-semibold md:text-base">
                {{ returnParams.licenseKey }}
              </div>
            </div>
            <button
              class="shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              @click="copyLicenseKey"
            >
              {{ copied ? '已复制' : '复制' }}
            </button>
          </div>

          <div class="grid gap-3 border-t border-gray-200 pt-4 text-sm dark:border-gray-700 md:grid-cols-2">
            <div v-if="returnParams.email">
              <span class="text-gray-500 dark:text-gray-400">邮箱：</span>
              <span class="font-medium">{{ returnParams.email }}</span>
            </div>
            <div v-if="returnParams.paymentId">
              <span class="text-gray-500 dark:text-gray-400">支付 ID：</span>
              <span class="font-mono text-xs">{{ returnParams.paymentId }}</span>
            </div>
            <div v-if="returnParams.subscriptionId">
              <span class="text-gray-500 dark:text-gray-400">订阅 ID：</span>
              <span class="font-mono text-xs">{{ returnParams.subscriptionId }}</span>
            </div>
            <div v-if="returnParams.productId">
              <span class="text-gray-500 dark:text-gray-400">产品 ID：</span>
              <span class="font-mono text-xs">{{ returnParams.productId }}</span>
            </div>
          </div>
        </div>

        <div v-else class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          当前回跳链接里没有读取到许可证密钥。若已经扣款成功，请检查 Dodo 邮件，或联系支持并附上支付 ID。
        </div>

        <div v-if="returnParams.licenseKey" class="mt-6 rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
          <h2 class="text-lg font-bold">授权验证</h2>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Dodo 的授权验证和激活端点是公开接口，可直接在网页或桌面端调用。
          </p>

          <div class="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              :disabled="validating"
              @click="validateLicense"
            >
              {{ validating ? '验证中...' : '验证许可证' }}
            </button>
            <button
              class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              :disabled="activating"
              @click="activateLicense"
            >
              {{ activating ? '激活中...' : '激活当前浏览器' }}
            </button>
          </div>

          <div
            v-if="licenseMessage"
            class="mt-4 rounded-xl p-3 text-sm"
            :class="licenseMessageType === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'"
          >
            {{ licenseMessage }}
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <router-link
            to="/download"
            class="rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            下载 Welight
          </router-link>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NfwDna4ZjtnAan2fCf7T?quantity=1&redirect_url=https://waer.ltd/success"
            target="_blank"
            class="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            再次购买
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  activateDodoLicense,
  clearPendingDodoCheckout,
  getPendingDodoCheckout,
  isDodoPaymentSuccessful,
  parseDodoReturnParams,
  saveDodoLicense,
  validateDodoLicense
} from '@/services/dodoPaymentsService.js'

const returnParams = ref(parseDodoReturnParams())
const pendingCheckout = ref(getPendingDodoCheckout())
const copied = ref(false)
const validating = ref(false)
const activating = ref(false)
const licenseMessage = ref('')
const licenseMessageType = ref('success')

const paymentSucceeded = computed(() => isDodoPaymentSuccessful(returnParams.value.status))
const paymentStatusText = computed(() => {
  if (!returnParams.value.status) return '等待回跳'
  if (paymentSucceeded.value) return '支付成功'
  return returnParams.value.status
})

onMounted(() => {
  if (returnParams.value.licenseKey) {
    saveDodoLicense({
      ...returnParams.value,
      productName: pendingCheckout.value?.productName || ''
    })
    clearPendingDodoCheckout()
  }
})

async function copyLicenseKey() {
  if (!returnParams.value.licenseKey) return
  await navigator.clipboard.writeText(returnParams.value.licenseKey)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1800)
}

function setLicenseMessage(message, type = 'success') {
  licenseMessage.value = message
  licenseMessageType.value = type
}

async function validateLicense() {
  validating.value = true
  setLicenseMessage('')
  try {
    const result = await validateDodoLicense(returnParams.value.licenseKey)
    setLicenseMessage(result.valid ? '许可证验证通过。' : '许可证无效。', result.valid ? 'success' : 'error')
  } catch (error) {
    setLicenseMessage(error.message || '许可证验证失败。', 'error')
  } finally {
    validating.value = false
  }
}

async function activateLicense() {
  activating.value = true
  setLicenseMessage('')
  try {
    const name = `Welight Web - ${navigator.platform || 'Browser'}`
    const result = await activateDodoLicense({
      licenseKey: returnParams.value.licenseKey,
      name
    })
    saveDodoLicense({
      ...returnParams.value,
      licenseKeyInstanceId: result.id,
      activationName: result.name,
      activatedAt: result.created_at
    })
    setLicenseMessage('当前浏览器已激活。')
  } catch (error) {
    setLicenseMessage(error.message || '许可证激活失败。', 'error')
  } finally {
    activating.value = false
  }
}
</script>
