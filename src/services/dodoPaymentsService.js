const DODO_API_BASE_URL = 'https://live.dodopayments.com'
const DODO_CHECKOUT_BASE_URL = 'https://checkout.dodopayments.com/buy/pdt_0NfwDna4ZjtnAan2fCf7T'
const DODO_RETURN_URL = 'https://waer.ltd/success'
const PENDING_CHECKOUT_STORAGE_KEY = 'welight_dodo_pending_checkout'
const LICENSE_STORAGE_KEY = 'welight_dodo_license'

export const dodoCheckoutConfig = {
  checkoutUrl: DODO_CHECKOUT_BASE_URL,
  returnUrl: DODO_RETURN_URL,
  productId: 'pdt_0NfwDna4ZjtnAan2fCf7T'
}

export function buildDodoCheckoutUrl({ quantity = 1 } = {}) {
  const url = new URL(DODO_CHECKOUT_BASE_URL)
  url.searchParams.set('quantity', String(quantity || 1))
  url.searchParams.set('redirect_url', DODO_RETURN_URL)
  return url.toString()
}

export function storePendingDodoCheckout(payload = {}) {
  try {
    localStorage.setItem(
      PENDING_CHECKOUT_STORAGE_KEY,
      JSON.stringify({
        ...payload,
        createdAt: new Date().toISOString()
      })
    )
  } catch (error) {
    console.warn('保存 Dodo 结账上下文失败:', error)
  }
}

export function getPendingDodoCheckout() {
  try {
    const raw = localStorage.getItem(PENDING_CHECKOUT_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn('读取 Dodo 结账上下文失败:', error)
    return null
  }
}

export function clearPendingDodoCheckout() {
  try {
    localStorage.removeItem(PENDING_CHECKOUT_STORAGE_KEY)
  } catch (error) {
    console.warn('清理 Dodo 结账上下文失败:', error)
  }
}

export function parseDodoReturnParams(search = window.location.search) {
  const params = new URLSearchParams(search)
  const get = (...keys) => {
    for (const key of keys) {
      const value = params.get(key)
      if (value) return value
    }
    return ''
  }

  return {
    paymentId: get('payment_id', 'paymentId'),
    subscriptionId: get('subscription_id', 'subscriptionId'),
    status: get('status'),
    licenseKey: get('license_key', 'licenseKey'),
    email: get('email', 'customer_email', 'customerEmail'),
    customerId: get('customer_id', 'customerId'),
    productId: get('product_id', 'productId')
  }
}

export function isDodoPaymentSuccessful(status) {
  if (!status) return false
  return ['succeeded', 'success', 'paid', 'completed', 'active'].includes(String(status).toLowerCase())
}

export async function validateDodoLicense(licenseKey) {
  const key = (licenseKey || '').trim()
  if (!key) {
    throw new Error('请输入许可证密钥')
  }

  const response = await fetch(`${DODO_API_BASE_URL}/licenses/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      license_key: key
    })
  })

  if (!response.ok) {
    throw new Error(`许可证验证失败（HTTP ${response.status}）`)
  }

  return response.json()
}

export async function activateDodoLicense({ licenseKey, name }) {
  const key = (licenseKey || '').trim()
  const instanceName = (name || '').trim()
  if (!key) {
    throw new Error('请输入许可证密钥')
  }
  if (!instanceName) {
    throw new Error('请输入设备或实例名称')
  }

  const response = await fetch(`${DODO_API_BASE_URL}/licenses/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      license_key: key,
      name: instanceName
    })
  })

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('许可证当前不可激活')
    }
    if (response.status === 404) {
      throw new Error('未找到该许可证')
    }
    if (response.status === 422) {
      throw new Error('许可证激活次数已达上限')
    }
    throw new Error(`许可证激活失败（HTTP ${response.status}）`)
  }

  return response.json()
}

export function saveDodoLicense(payload) {
  try {
    localStorage.setItem(
      LICENSE_STORAGE_KEY,
      JSON.stringify({
        ...payload,
        savedAt: new Date().toISOString()
      })
    )
  } catch (error) {
    console.warn('保存 Dodo 许可证失败:', error)
  }
}

export function getSavedDodoLicense() {
  try {
    const raw = localStorage.getItem(LICENSE_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn('读取 Dodo 许可证失败:', error)
    return null
  }
}
