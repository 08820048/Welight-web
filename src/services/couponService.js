const API_BASE_URL = 'https://ilikexff.cn/api'

async function parseJsonSafe(response) {
  const contentType = response.headers.get('content-type') || ''
  // 优先走原生 json 解析
  if (contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch (e) {
      // 回退：尝试按文本解析
    }
  }
  const text = await response.text()
  if (!text || text.trim().length === 0) {
    return null
  }
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export async function previewCoupon({ couponCode, productCode, customerEmail }) {
  try {
    const body = {
      couponCode,
      productCode,
      customerEmail
    }
    const response = await fetch(`${API_BASE_URL}/coupons/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body)
    })
    // 处理非200响应
    if (!response.ok) {
      const payload = await parseJsonSafe(response)
      const message = payload?.message || `试算失败（HTTP ${response.status}）`
      throw new Error(message)
    }
    const result = await parseJsonSafe(response)
    if (result && result.code === 200) {
      return result.data
    }
    throw new Error((result && result.message) || '优惠券试算失败：服务器返回空响应')
  } catch (error) {
    console.error('优惠券试算失败:', error)
    throw error
  }
}

export async function lotteryCoupon({ customerEmail }) {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons/lottery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ customerEmail })
    })
    if (!response.ok) {
      const payload = await parseJsonSafe(response)
      const message = payload?.message || `抽奖发券失败（HTTP ${response.status}）`
      throw new Error(message)
    }
    const result = await parseJsonSafe(response)
    if (result && result.code === 200) {
      return result.data
    }
    throw new Error((result && result.message) || '抽奖发券失败：服务器返回空响应')
  } catch (error) {
    console.error('抽奖发券失败:', error)
    throw error
  }
}

export default {
  previewCoupon,
  lotteryCoupon
}
