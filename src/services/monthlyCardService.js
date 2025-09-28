// 月卡购买服务
// 基于月卡购买服务接口文档实现

const API_BASE_URL = 'https://ilikexff.cn/api'

/**
 * 服务类型枚举
 */
export const SERVICE_TYPES = {
  AI_SERVICE: 'AI_SERVICE',
  CLOUD_STORAGE: 'CLOUD_STORAGE'
}

/**
 * 服务类型描述映射
 */
export const SERVICE_TYPE_DESCRIPTIONS = {
  AI_SERVICE: 'AI服务',
  CLOUD_STORAGE: '云存储服务'
}

/**
 * 月卡产品信息（基于API接口真实数据）
 */
export const MONTHLY_CARD_PRODUCTS = [
  {
    id: 6,
    code: 'AI_SERVICE_MONTHLY',
    serviceType: 'AI_SERVICE',
    name: 'AI服务月卡',
    description: 'WeLight AI服务月卡，包含应用内文章转换、翻译、润色等所有AI功能，有效期30天',
    price: 0.5,
    currency: 'CNY',
    validityDays: 30,
    maxActivations: 1,
    permanent: false,
    features: [
      '支持应用内所有的AI功能',
      '每日1000次请求限制',
      '每月30000次请求限制',
      '30天有效期',
      '技术支持'
    ],
    recommended: true
  },
  {
    id: 7,
    code: 'CLOUD_STORAGE_MONTHLY',
    serviceType: 'CLOUD_STORAGE',
    name: '云存储服务月卡',
    description: 'WeLight云存储服务月卡，提供安全可靠的云端存储服务，有效期30天',
    price: 0.2,
    currency: 'CNY',
    validityDays: 30,
    maxActivations: 1,
    permanent: false,
    features: [
      '应用内文章图片上传与存储',
      '默认采用七牛云',
      '100GB存储空间',
      '最大500MB单文件',
      '多设备访问',
      '安全加密传输',
      '30天有效期'
    ],
    recommended: false
  }
]

/**
 * 月卡状态枚举
 */
export const CARD_STATUS = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  SUSPENDED: 'SUSPENDED',
  REVOKED: 'REVOKED'
}

/**
 * 获取月卡产品列表（从API获取）
 * @returns {Promise<Array>} 月卡产品列表
 */
export async function getMonthlyCardProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      // 过滤出月卡产品（非永久许可证的产品）
      const monthlyCardProducts = result.data.filter((product) => !product.permanent)

      // 为每个产品添加serviceType字段以便匹配
      const productsWithServiceType = monthlyCardProducts.map((product) => {
        let serviceType = null
        if (product.code.includes('AI_SERVICE')) {
          serviceType = 'AI_SERVICE'
        } else if (product.code.includes('CLOUD_STORAGE')) {
          serviceType = 'CLOUD_STORAGE'
        }
        return {
          ...product,
          serviceType
        }
      })

      console.log('获取月卡产品列表成功:', productsWithServiceType)
      return productsWithServiceType
    } else {
      console.error('获取月卡产品列表失败:', result.message)
      // 如果API失败，返回本地数据作为备用
      return MONTHLY_CARD_PRODUCTS
    }
  } catch (error) {
    console.error('获取月卡产品列表时发生错误:', error)
    // 如果API失败，返回本地数据作为备用
    return MONTHLY_CARD_PRODUCTS
  }
}

/**
 * 根据服务类型获取产品信息
 * @param {string} serviceType - 服务类型
 * @returns {Promise<Object|null>} 产品信息或null
 */
export async function getMonthlyCardProduct(serviceType) {
  try {
    const products = await getMonthlyCardProducts()
    return products.find((product) => product.serviceType === serviceType) || null
  } catch (error) {
    console.error('获取月卡产品信息失败:', error)
    return MONTHLY_CARD_PRODUCTS.find((product) => product.serviceType === serviceType) || null
  }
}

/**
 * 购买月卡
 * @param {Object} purchaseData - 购买数据
 * @param {string} purchaseData.serviceType - 服务类型 (AI_SERVICE 或 CLOUD_STORAGE)
 * @param {string} purchaseData.customerEmail - 客户邮箱
 * @param {string} purchaseData.customerName - 客户姓名（可选）
 * @param {string} purchaseData.clientInfo - 客户端信息（可选）
 * @param {string} purchaseData.paymentMethod - 支付方式，默认"WECHAT_NATIVE"
 * @param {string} purchaseData.remark - 备注信息（可选）
 * @returns {Promise<Object|null>} 订单信息或null
 */
export async function purchaseMonthlyCard(purchaseData) {
  try {
    // 确保包含必需的支付方式参数
    const requestData = {
      paymentMethod: 'WECHAT_NATIVE',
      ...purchaseData
    }

    const response = await fetch(`${API_BASE_URL}/monthly-cards/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('月卡购买订单创建成功:', result.data)
      return result.data
    } else {
      console.error('月卡购买失败:', result.message)
      throw new Error(result.message || '月卡购买失败')
    }
  } catch (error) {
    console.error('月卡购买时发生错误:', error)
    throw error
  }
}

/**
 * 激活月卡
 * @param {Object} activateData - 激活数据
 * @param {string} activateData.cardCode - 月卡编码
 * @param {string} activateData.customerEmail - 客户邮箱
 * @param {string} activateData.clientInfo - 客户端信息（可选）
 * @returns {Promise<Object|null>} 激活结果或null
 */
export async function activateMonthlyCard(activateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/monthly-cards/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activateData)
    })

    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('月卡激活成功:', result.data)
      return result.data
    } else {
      console.error('月卡激活失败:', result.message)
      throw new Error(result.message || '月卡激活失败')
    }
  } catch (error) {
    console.error('月卡激活时发生错误:', error)
    throw error
  }
}

/**
 * 验证月卡
 * @param {Object} validateData - 验证数据
 * @param {string} validateData.cardCode - 月卡编码
 * @param {string} validateData.customerEmail - 客户邮箱
 * @param {string} validateData.serviceType - 服务类型（可选）
 * @returns {Promise<Object|null>} 验证结果或null
 */
export async function validateMonthlyCard(validateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/monthly-cards/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateData)
    })

    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('月卡验证成功:', result.data)
      return result.data
    } else {
      console.error('月卡验证失败:', result.message)
      throw new Error(result.message || '月卡验证失败')
    }
  } catch (error) {
    console.error('月卡验证时发生错误:', error)
    throw error
  }
}

/**
 * 查询月卡信息
 * @param {string} cardCode - 月卡编码
 * @returns {Promise<Object|null>} 月卡信息或null
 */
export async function getMonthlyCardInfo(cardCode) {
  try {
    const response = await fetch(`${API_BASE_URL}/monthly-cards/${cardCode}`)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('获取月卡信息成功:', result.data)
      return result.data
    } else {
      console.error('获取月卡信息失败:', result.message)
      return null
    }
  } catch (error) {
    console.error('获取月卡信息时发生错误:', error)
    return null
  }
}

/**
 * 查询客户月卡列表
 * @param {string} customerEmail - 客户邮箱
 * @param {string} serviceType - 服务类型（可选）
 * @returns {Promise<Array|null>} 月卡列表或null
 */
export async function getMonthlyCardsByEmail(customerEmail, serviceType = null) {
  try {
    let url = `${API_BASE_URL}/monthly-cards?customerEmail=${encodeURIComponent(customerEmail)}`
    if (serviceType) {
      url += `&serviceType=${serviceType}`
    }

    const response = await fetch(url)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('获取月卡列表成功:', result.data)
      return result.data
    } else {
      console.error('获取月卡列表失败:', result.message)
      return null
    }
  } catch (error) {
    console.error('获取月卡列表时发生错误:', error)
    return null
  }
}

/**
 * 检查有效月卡
 * @param {string} customerEmail - 客户邮箱
 * @param {string} serviceType - 服务类型
 * @returns {Promise<boolean>} 是否有有效月卡
 */
export async function checkValidMonthlyCard(customerEmail, serviceType) {
  try {
    const url = `${API_BASE_URL}/monthly-cards/check-valid?customerEmail=${encodeURIComponent(customerEmail)}&serviceType=${serviceType}`
    const response = await fetch(url)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      return result.data.hasValidCard || false
    } else {
      console.error('检查有效月卡失败:', result.message)
      return false
    }
  } catch (error) {
    console.error('检查有效月卡时发生错误:', error)
    return false
  }
}

/**
 * 获取服务类型描述
 * @param {string} serviceType - 服务类型
 * @returns {string} 服务类型描述
 */
export function getServiceTypeDescription(serviceType) {
  return SERVICE_TYPE_DESCRIPTIONS[serviceType] || serviceType
}

/**
 * 查询订单支付状态
 * @param {string} orderNo - 订单号
 * @returns {Promise<boolean>} 是否已支付
 */
export async function checkOrderStatus(orderNo) {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/orders/${orderNo}`)
    const result = await response.json()

    if (result.code === 200 && result.data) {
      console.log('订单状态查询成功:', result.data)
      return result.data.paid || false
    } else {
      console.error('订单状态查询失败:', result.message)
      return false
    }
  } catch (error) {
    console.error('订单状态查询时发生错误:', error)
    return false
  }
}

/**
 * 格式化剩余时间
 * @param {number} remainingDays - 剩余天数
 * @param {number} remainingHours - 剩余小时数
 * @returns {string} 格式化的剩余时间
 */
export function formatRemainingTime(remainingDays, remainingHours) {
  if (remainingDays > 0) {
    return `${remainingDays}天`
  } else if (remainingHours > 0) {
    return `${remainingHours}小时`
  } else {
    return '已过期'
  }
}

/**
 * 获取月卡状态描述
 * @param {string} status - 月卡状态
 * @returns {string} 状态描述
 */
export function getCardStatusDescription(status) {
  const statusMap = {
    INACTIVE: '未激活',
    ACTIVE: '已激活',
    EXPIRED: '已过期',
    SUSPENDED: '已暂停',
    REVOKED: '已撤销'
  }

  return statusMap[status] || '未知状态'
}

/**
 * 获取客户端信息
 * @returns {string} 客户端信息字符串
 */
export function getClientInfo() {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const version = 'WeLight Web v3.0.0'

  return `${version} (${platform}) - ${userAgent.substring(0, 100)}`
}
