/**
 * 积分套餐服务
 * 提供积分套餐查询、购买、订单状态查询等功能
 */

// API基础配置
const API_BASE_URL = 'https://ilikexff.cn/api'

/**
 * 获取所有积分套餐（硬编码）
 * 返回本地静态数据，避免依赖后端接口与缓存问题
 * @returns {Promise<Object>} 积分套餐列表响应对象
 */
export async function getCreditPackages() {
  try {
    console.log('正在获取积分套餐列表...')
    const response = await fetch(`${API_BASE_URL}/credits/packages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('积分套餐列表响应:', data)

    if (data.code === 200) {
      return {
        success: true,
        data: data.data,
        message: data.message
      }
    } else {
      throw new Error(data.message || '获取积分套餐列表失败')
    }
  } catch (error) {
    console.error('获取积分套餐列表失败:', error)

    // 返回模拟数据作为降级方案
    return {
      success: false,
      error: error.message,
      data: getMockCreditPackages()
    }
  }
}

/**
 * 获取单个积分套餐详情
 * @param {string} packageCode 套餐代码
 * @returns {Promise<Object>} 积分套餐详情响应对象
 */
export async function getCreditPackageByCode(packageCode) {
  try {
    if (!packageCode) {
      throw new Error('套餐代码不能为空')
    }

    console.log(`正在获取积分套餐详情: ${packageCode}`)
    const response = await fetch(`${API_BASE_URL}/credits/packages/${packageCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('套餐不存在')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('积分套餐详情响应:', data)

    if (data.code === 200) {
      return {
        success: true,
        data: data.data,
        message: data.message
      }
    } else {
      throw new Error(data.message || '获取积分套餐详情失败')
    }
  } catch (error) {
    console.error('获取积分套餐详情失败:', error)
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
}

/**
 * 模拟积分套餐数据（降级方案）
 * @returns {Array} 模拟的积分套餐数据
 */
function getMockCreditPackages() {
  return [
    {
      id: 1,
      packageCode: 'CREDITS_200',
      packageName: '基础套餐',
      packageDescription: '适合轻度使用的用户',
      credits: 200,
      originalPrice: 10.0,
      currentPrice: 10.0,
      discount: 0,
      packageType: 'STANDARD',
      isActive: true,
      displayOrder: 1,
      features: ['200积分', '适用于所有AI服务', '永不过期'],
      costPerCredit: 0.05,
      recommendedFor: '轻度使用用户'
    },
    {
      id: 2,
      packageCode: 'CREDITS_500',
      packageName: '标准套餐',
      packageDescription: '最受欢迎的选择',
      credits: 500,
      originalPrice: 25.0,
      currentPrice: 25.0,
      discount: 0,
      packageType: 'STANDARD',
      isActive: true,
      displayOrder: 2,
      features: ['500积分', '适用于所有AI服务', '永不过期', '性价比最高'],
      costPerCredit: 0.05,
      recommendedFor: '中度使用用户',
      isPopular: true
    },
    {
      id: 3,
      packageCode: 'CREDITS_1000',
      packageName: '高级套餐',
      packageDescription: '重度用户的最佳选择',
      credits: 1000,
      originalPrice: 49.0,
      currentPrice: 49.0,
      discount: 0,
      packageType: 'STANDARD',
      isActive: true,
      displayOrder: 3,
      features: ['1000积分', '适用于所有AI服务', '永不过期', '大容量优惠'],
      costPerCredit: 0.049,
      recommendedFor: '重度使用用户'
    },
    {
      id: 4,
      packageCode: 'CREDITS_CUSTOM',
      packageName: '自定义积分',
      packageDescription: '按需购买，灵活选择',
      credits: 0,
      originalPrice: 0.0,
      currentPrice: 0.0,
      discount: 0,
      packageType: 'CUSTOM',
      isActive: true,
      displayOrder: 4,
      features: ['自定义积分数量', '最低100积分起购', '按0.05元/积分计费', '适用于所有AI服务'],
      costPerCredit: 0.05,
      minCredits: 100,
      maxCredits: 10000,
      recommendedFor: '有特定需求的用户'
    }
  ]
}

/**
 * 创建积分套餐购买订单
 * @param {Object} orderData 订单数据
 * @param {string} orderData.packageCode 套餐代码
 * @param {string} orderData.customerEmail 客户邮箱
 * @param {string} orderData.customerName 客户姓名
 * @param {string} orderData.paymentMethod 支付方式 (WECHAT_PAY, ALIPAY, BANK_CARD)
 * @param {number} [orderData.customCredits] 自定义积分数量（仅当packageCode为CREDITS_CUSTOM时需要）
 * @param {Object} [orderData.clientInfo] 客户端信息
 * @returns {Promise<Object>} 订单创建响应对象
 */
export async function createCreditPackageOrder(orderData) {
  try {
    // 验证必填字段
    if (!orderData.packageCode) {
      throw new Error('套餐代码不能为空')
    }
    if (!orderData.customerEmail) {
      throw new Error('客户邮箱不能为空')
    }
    if (!orderData.customerName) {
      throw new Error('客户姓名不能为空')
    }
    if (!orderData.paymentMethod) {
      throw new Error('支付方式不能为空')
    }

    // 验证自定义积分
    if (orderData.packageCode === 'CREDITS_CUSTOM') {
      if (
        !orderData.customCredits ||
        orderData.customCredits < 100 ||
        orderData.customCredits > 10000
      ) {
        throw new Error('自定义积分数量必须在100-10000之间')
      }
    }

    // 构建请求体
    const requestBody = {
      packageCode: orderData.packageCode,
      customerEmail: orderData.customerEmail,
      customerName: orderData.customerName,
      paymentMethod: orderData.paymentMethod,
      customCredits: orderData.packageCode === 'CREDITS_CUSTOM' ? orderData.customCredits : null,
      clientInfo: orderData.clientInfo || {
        userAgent: navigator.userAgent,
        deviceType: 'WEB'
      }
    }

    console.log('正在创建积分套餐订单:', requestBody)
    console.log('购买API地址:', `${API_BASE_URL}/credits/purchase`)

    const response = await fetch(`${API_BASE_URL}/credits/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('订单创建响应:', data)

    if (data.code === 200) {
      return {
        success: true,
        data: data.data,
        message: data.message
      }
    } else {
      throw new Error(data.message || '创建订单失败')
    }
  } catch (error) {
    console.error('创建积分套餐订单失败:', error)
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
}

/**
 * 查询订单支付状态
 * @param {string} orderId 订单ID
 * @returns {Promise<Object>} 订单状态响应对象
 */
export async function checkOrderPaymentStatus(orderId) {
  try {
    if (!orderId) {
      throw new Error('订单ID不能为空')
    }

    console.log(`正在查询订单状态: ${orderId}`)
    const response = await fetch(`${API_BASE_URL}/payment-orders/${orderId}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('订单状态查询响应:', data)

    if (data.code === 200) {
      return {
        success: true,
        data: data.data,
        message: data.message
      }
    } else {
      throw new Error(data.message || '查询订单状态失败')
    }
  } catch (error) {
    console.error('查询订单状态失败:', error)
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
}

/**
 * 获取用户订单历史
 * @param {string} email 用户邮箱
 * @param {Object} [options] 查询选项
 * @param {number} [options.page=0] 页码
 * @param {number} [options.size=10] 页大小
 * @param {string} [options.status] 订单状态筛选
 * @returns {Promise<Object>} 订单历史响应对象
 */
export async function getUserOrderHistory(email, options = {}) {
  try {
    if (!email) {
      throw new Error('用户邮箱不能为空')
    }

    const { page = 0, size = 10, status } = options

    // 构建查询参数
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    })

    if (status) {
      queryParams.append('status', status)
    }

    const url = `${API_BASE_URL}/payment-orders/user/${encodeURIComponent(email)}?${queryParams}`
    console.log(`正在获取用户订单历史: ${url}`)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        // 用户没有订单历史，返回空数据
        return {
          success: true,
          data: {
            content: [],
            totalElements: 0,
            totalPages: 0
          },
          message: '暂无订单历史'
        }
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('用户订单历史响应:', data)

    if (data.code === 200) {
      return {
        success: true,
        data: data.data,
        message: data.message
      }
    } else {
      throw new Error(data.message || '获取订单历史失败')
    }
  } catch (error) {
    console.error('获取用户订单历史失败:', error)

    // 返回模拟数据作为降级方案
    return {
      success: false,
      error: error.message,
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0
      }
    }
  }
}

/**
 * 支付状态轮询
 * @param {string} orderId 订单ID
 * @param {Object} [options] 轮询选项
 * @param {number} [options.interval=2000] 轮询间隔（毫秒）
 * @param {number} [options.maxAttempts=150] 最大轮询次数（默认5分钟）
 * @param {Function} [options.onStatusChange] 状态变化回调
 * @returns {Promise<Object>} 最终支付结果
 */
export async function pollPaymentStatus(orderId, options = {}) {
  const { interval = 2000, maxAttempts = 150, onStatusChange } = options

  return new Promise((resolve, reject) => {
    let attempts = 0
    let pollInterval

    const checkStatus = async () => {
      attempts++

      try {
        const statusResponse = await checkOrderPaymentStatus(orderId)

        if (!statusResponse.success) {
          if (attempts >= maxAttempts) {
            clearInterval(pollInterval)
            reject(new Error('查询订单状态失败: ' + statusResponse.error))
            return
          }
          return // 继续轮询
        }

        const status = statusResponse.data.status

        // 调用状态变化回调
        if (onStatusChange) {
          onStatusChange(status, statusResponse.data)
        }

        if (status === 'PAID') {
          clearInterval(pollInterval)
          resolve({
            success: true,
            status: 'PAID',
            orderId,
            data: statusResponse.data,
            message: '支付成功，积分已到账！'
          })
        } else if (status === 'EXPIRED') {
          clearInterval(pollInterval)
          reject(new Error('订单已过期，请重新购买'))
        } else if (status === 'FAILED') {
          clearInterval(pollInterval)
          reject(new Error('支付失败，请重试'))
        } else if (status === 'CANCELLED') {
          clearInterval(pollInterval)
          reject(new Error('订单已取消'))
        } else if (attempts >= maxAttempts) {
          clearInterval(pollInterval)
          reject(new Error('支付超时，请检查支付状态或联系客服'))
        }
        // 其他状态（如PENDING_PAYMENT）继续轮询
      } catch (error) {
        console.error('轮询支付状态时发生错误:', error)
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval)
          reject(error)
        }
      }
    }

    // 立即执行一次检查
    checkStatus()

    // 设置定时轮询
    pollInterval = setInterval(checkStatus, interval)
  })
}

/**
 * 计算自定义积分价格
 * @param {number} credits 积分数量
 * @param {number} [costPerCredit=0.05] 每积分价格
 * @returns {number} 总价格
 */
export function calculateCustomCreditsPrice(credits, costPerCredit = 0.05) {
  if (!credits || credits < 100) {
    return 0
  }
  return Math.round(credits * costPerCredit * 100) / 100 // 保留两位小数
}

/**
 * 验证支付方式
 * @param {string} paymentMethod 支付方式
 * @returns {boolean} 是否有效
 */
export function validatePaymentMethod(paymentMethod) {
  const validMethods = ['WECHAT_PAY', 'ALIPAY', 'BANK_CARD']
  return validMethods.includes(paymentMethod)
}

/**
 * 格式化订单状态显示文本
 * @param {string} status 订单状态
 * @returns {string} 格式化后的状态文本
 */
export function formatOrderStatus(status) {
  const statusMap = {
    PENDING_PAYMENT: '等待支付',
    PAID: '支付成功',
    CANCELLED: '订单取消',
    EXPIRED: '订单过期',
    FAILED: '支付失败'
  }
  return statusMap[status] || status
}

// 导出默认对象，包含所有方法
export default {
  getCreditPackages,
  getCreditPackageByCode,
  createCreditPackageOrder,
  checkOrderPaymentStatus,
  getUserOrderHistory,
  pollPaymentStatus,
  calculateCustomCreditsPrice,
  validatePaymentMethod,
  formatOrderStatus
}
