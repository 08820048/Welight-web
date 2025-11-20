// 最近购买记录服务
// 基于 docs/recent-purchases-api.md 实现

const RECENT_PURCHASES_API_URL = 'https://ilikexff.cn/api/payment/recent-purchases'

// 简单内存缓存，避免短时间内频繁请求
let lastFetchTime = 0
let lastFetchLimitKey = null
let cachedPurchases = null

const CACHE_TTL_MS = 60 * 1000 // 60 秒缓存

/**
 * 获取最近购买记录
 * @param {number} [limit=3] 返回记录数量（1-10）
 * @returns {Promise<Array>} 最近购买记录数组
 */
export async function getRecentPurchases(limit = 3) {
  const safeLimit = Math.min(Math.max(Number(limit) || 3, 1), 10)
  const cacheKey = String(safeLimit)
  const now = Date.now()

  // 命中缓存
  if (cachedPurchases && lastFetchLimitKey === cacheKey && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedPurchases
  }

  const url = `${RECENT_PURCHASES_API_URL}?limit=${safeLimit}`
  console.log('[RecentPurchases] 请求最近购买记录:', url)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('[RecentPurchases] HTTP 请求失败:', response.status, response.statusText)
      return []
    }

    const result = await response.json()
    console.log('[RecentPurchases] 接口响应:', result)

    // 实际接口返回的是 { code, message, data }，而不是文档中的 { success, message, data }
    if (result && (result.code === 200 || result.success) && Array.isArray(result.data)) {
      cachedPurchases = result.data
      lastFetchTime = now
      lastFetchLimitKey = cacheKey
      return result.data
    }

    console.error('[RecentPurchases] 接口返回异常:', result?.message || '未知错误')
    return []
  } catch (error) {
    console.error('[RecentPurchases] 获取最近购买记录失败:', error)
    return []
  }
}

export default {
  getRecentPurchases
}
