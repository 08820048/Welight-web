// 许可证购买服务
// 基于许可证购买接口文档实现

const API_BASE_URL = 'https://ilikexff.cn/api'

/**
 * 获取产品列表
 * @returns {Promise<Array|null>} 产品列表或null
 */
export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('获取产品列表成功:', result.data)
      return result.data
    } else {
      console.error('获取产品列表失败:', result.message)
      return null
    }
  } catch (error) {
    console.error('获取产品列表时发生错误:', error)
    return null
  }
}

/**
 * 创建支付订单
 * @param {Object} orderData - 订单数据
 * @param {string} orderData.productCode - 产品代码
 * @param {string} orderData.customerEmail - 客户邮箱
 * @param {string} orderData.paymentMethod - 支付方式，默认"WECHAT_NATIVE"
 * @param {string} orderData.customerName - 客户姓名（可选）
 * @param {string} orderData.clientInfo - 客户端信息（可选）
 * @param {string} orderData.remark - 备注信息（可选）
 * @param {number} orderData.customAmount - 自定义金额（可选）
 * @returns {Promise<Object|null>} 订单信息或null
 */
export async function createPaymentOrder(orderData) {
  try {
    // 确保包含必需的支付方式参数
    const requestData = {
      paymentMethod: 'WECHAT_NATIVE',
      ...orderData
    }

    const response = await fetch(`${API_BASE_URL}/payment/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('创建订单成功:', result.data)
      // 返回订单信息，新接口返回的是 result.data.order
      return result.data.order || result.data
    } else {
      console.error('创建订单失败:', result.message)
      throw new Error(result.message || '订单创建失败')
    }
  } catch (error) {
    console.error('创建订单时发生错误:', error)
    throw error
  }
}

/**
 * 查询订单状态
 * @param {string} orderNo - 订单号
 * @returns {Promise<Object|null>} 订单状态信息或null
 */
export async function getOrderStatus(orderNo) {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/orders/${orderNo}`)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      return result.data
    } else {
      console.error('查询订单状态失败:', result.message)
      return null
    }
  } catch (error) {
    console.error('查询订单状态时发生错误:', error)
    return null
  }
}

/**
 * 根据客户邮箱获取许可证列表
 * @param {string} customerEmail - 客户邮箱
 * @returns {Promise<Array|null>} 许可证列表或null
 */
export async function getLicensesByEmail(customerEmail) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/licenses?customerEmail=${encodeURIComponent(customerEmail)}`
    )
    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('获取许可证列表成功:', result.data)
      return result.data
    } else {
      console.error('获取许可证列表失败:', result.message)
      return null
    }
  } catch (error) {
    console.error('获取许可证列表时发生错误:', error)
    return null
  }
}

// 许可证激活验证功能已移除，仅保留购买相关功能

/**
 * 获取客户端信息
 * @returns {string} 客户端信息字符串
 */
export function getClientInfo() {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const version = 'WeLight Web v4.0.0'

  return `${version} (${platform}) - ${userAgent.substring(0, 100)}`
}

/**
 * 轮询订单状态直到支付完成
 * @param {string} orderNo - 订单号
 * @param {Function} onStatusChange - 状态变化回调
 * @param {number} interval - 轮询间隔（毫秒）
 * @param {number} maxAttempts - 最大尝试次数
 * @returns {Promise<Object>} 最终订单状态
 */
export async function pollOrderStatus(orderNo, onStatusChange, interval = 3000, maxAttempts = 200) {
  let attempts = 0

  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      attempts++

      try {
        const status = await getOrderStatus(orderNo)

        if (status) {
          onStatusChange(status)

          if (status.status === 'PAID') {
            clearInterval(timer)
            resolve(status)
          } else if (status.status === 'EXPIRED' || status.status === 'CANCELLED') {
            clearInterval(timer)
            resolve(status)
          }
        }

        if (attempts >= maxAttempts) {
          clearInterval(timer)
          reject(new Error('轮询超时'))
        }
      } catch (error) {
        // 继续轮询，忽略单次错误
        console.warn('轮询订单状态出错:', error)
      }
    }, interval)
  })
}

/**
 * 许可证续费
 * @param {Object} renewData - 续费数据
 * @param {string} renewData.licenseKey - 许可证密钥
 * @param {string} renewData.customerEmail - 客户邮箱
 * @param {number} renewData.renewYears - 续费年数（1-5）
 * @param {string} renewData.paymentMethod - 支付方式，默认"WECHAT_NATIVE"
 * @param {string} renewData.remark - 备注信息（可选）
 * @returns {Promise<Object>} 续费订单信息
 */
export async function renewLicense(renewData) {
  try {
    const requestData = {
      paymentMethod: 'WECHAT_NATIVE',
      ...renewData
    }

    const response = await fetch(`${API_BASE_URL}/licenses/renew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('创建续费订单成功:', result.data)
      return result.data
    } else {
      console.error('创建续费订单失败:', result.message)
      throw new Error(result.message || '续费订单创建失败')
    }
  } catch (error) {
    console.error('创建续费订单时发生错误:', error)
    throw error
  }
}

/**
 * 格式化价格显示
 * @param {number} price - 价格
 * @param {string} currency - 货币代码
 * @returns {string} 格式化后的价格字符串
 */
export function formatPrice(price, currency = 'CNY') {
  const currencySymbols = {
    CNY: '¥',
    USD: '$',
    EUR: '€'
  }

  const symbol = currencySymbols[currency] || currency
  return `${symbol}${price.toFixed(2)}`
}

/**
 * 获取订单状态描述
 * @param {string} status - 订单状态
 * @returns {string} 状态描述
 */
export function getOrderStatusDescription(status) {
  const statusMap = {
    PENDING: '待支付',
    PAID: '已支付',
    EXPIRED: '已过期',
    CANCELLED: '已取消'
  }

  return statusMap[status] || '未知状态'
}
