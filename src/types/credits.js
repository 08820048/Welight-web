/**
 * 积分套餐相关的数据模型和类型定义
 */

/**
 * 积分套餐类型枚举
 */
export const PACKAGE_TYPES = {
  STANDARD: 'STANDARD', // 标准套餐
  CUSTOM: 'CUSTOM' // 自定义套餐
}

/**
 * 支付方式枚举
 */
export const PAYMENT_METHODS = {
  WECHAT_NATIVE: 'WECHAT_NATIVE', // 微信扫码支付
  ALIPAY: 'ALIPAY', // 支付宝
  BANK_CARD: 'BANK_CARD' // 银行卡支付
}

/**
 * 订单状态枚举
 */
export const ORDER_STATUS = {
  PENDING_PAYMENT: 'PENDING_PAYMENT', // 等待支付
  PAID: 'PAID', // 支付成功
  CANCELLED: 'CANCELLED', // 订单取消
  EXPIRED: 'EXPIRED', // 订单过期
  FAILED: 'FAILED' // 支付失败
}

/**
 * 积分套餐数据结构
 * @typedef {Object} CreditPackage
 * @property {number} id - 套餐ID
 * @property {string} packageCode - 套餐代码
 * @property {string} packageName - 套餐名称
 * @property {string} packageDescription - 套餐描述
 * @property {number} credits - 积分数量
 * @property {number} originalPrice - 原价
 * @property {number} currentPrice - 现价
 * @property {number} discount - 折扣
 * @property {string} packageType - 套餐类型 (STANDARD|CUSTOM)
 * @property {boolean} isActive - 是否激活
 * @property {number} displayOrder - 显示顺序
 * @property {string[]} features - 功能特性列表
 * @property {number} costPerCredit - 每积分价格
 * @property {string} recommendedFor - 推荐用户类型
 * @property {boolean} [isPopular] - 是否为热门套餐
 * @property {number} [minCredits] - 最小积分数量（自定义套餐）
 * @property {number} [maxCredits] - 最大积分数量（自定义套餐）
 */

/**
 * 购买订单数据结构
 * @typedef {Object} PurchaseOrderData
 * @property {string} packageCode - 套餐代码
 * @property {string} customerEmail - 客户邮箱
 * @property {string} customerName - 客户姓名
 * @property {string} paymentMethod - 支付方式
 * @property {number} [customCredits] - 自定义积分数量
 * @property {Object} [clientInfo] - 客户端信息
 * @property {string} [clientInfo.userAgent] - 用户代理
 * @property {string} [clientInfo.ipAddress] - IP地址
 * @property {string} [clientInfo.deviceType] - 设备类型
 */

/**
 * 订单响应数据结构
 * @typedef {Object} OrderResponse
 * @property {string} orderId - 订单ID
 * @property {Object} packageInfo - 套餐信息
 * @property {string} packageInfo.packageCode - 套餐代码
 * @property {string} packageInfo.packageName - 套餐名称
 * @property {number} packageInfo.credits - 积分数量
 * @property {number} packageInfo.price - 价格
 * @property {Object} customerInfo - 客户信息
 * @property {string} customerInfo.email - 客户邮箱
 * @property {string} customerInfo.name - 客户姓名
 * @property {Object} paymentInfo - 支付信息
 * @property {string} paymentInfo.paymentMethod - 支付方式
 * @property {number} paymentInfo.amount - 支付金额
 * @property {string} paymentInfo.currency - 货币类型
 * @property {string} [paymentInfo.paymentUrl] - 支付链接
 * @property {string} [paymentInfo.qrCodeUrl] - 二维码链接
 * @property {string} [paymentInfo.expireTime] - 过期时间
 * @property {string} orderStatus - 订单状态
 * @property {string} createdAt - 创建时间
 * @property {string} expireAt - 过期时间
 */

/**
 * 订单状态查询响应数据结构
 * @typedef {Object} OrderStatusResponse
 * @property {string} orderId - 订单ID
 * @property {string} status - 订单状态
 * @property {number} amount - 支付金额
 * @property {string} [paidAt] - 支付时间
 * @property {boolean} [creditsGranted] - 积分是否已发放
 * @property {number} [creditsAmount] - 积分数量
 */

/**
 * 用户订单历史数据结构
 * @typedef {Object} UserOrderHistory
 * @property {Object[]} content - 订单列表
 * @property {string} content[].orderId - 订单ID
 * @property {string} content[].packageName - 套餐名称
 * @property {number} content[].credits - 积分数量
 * @property {number} content[].amount - 支付金额
 * @property {string} content[].status - 订单状态
 * @property {string} content[].paymentMethod - 支付方式
 * @property {string} content[].createdAt - 创建时间
 * @property {string} [content[].paidAt] - 支付时间
 * @property {number} totalElements - 总元素数量
 * @property {number} totalPages - 总页数
 */

/**
 * API响应基础结构
 * @typedef {Object} ApiResponse
 * @property {boolean} success - 是否成功
 * @property {*} data - 响应数据
 * @property {string} [message] - 响应消息
 * @property {string} [error] - 错误信息
 */

/**
 * 创建标准积分套餐数据
 * @param {Object} options - 套餐选项
 * @param {string} options.packageCode - 套餐代码
 * @param {string} options.packageName - 套餐名称
 * @param {string} options.packageDescription - 套餐描述
 * @param {number} options.credits - 积分数量
 * @param {number} options.price - 价格
 * @param {string[]} [options.features] - 功能特性
 * @param {boolean} [options.isPopular] - 是否热门
 * @returns {CreditPackage} 积分套餐对象
 */
export function createStandardPackage(options) {
  return {
    id: Date.now(), // 临时ID，实际应由后端生成
    packageCode: options.packageCode,
    packageName: options.packageName,
    packageDescription: options.packageDescription,
    credits: options.credits,
    originalPrice: options.price,
    currentPrice: options.price,
    discount: 0,
    packageType: PACKAGE_TYPES.STANDARD,
    isActive: true,
    displayOrder: 1,
    features: options.features || [`${options.credits}积分`, '适用于所有AI服务', '永不过期'],
    costPerCredit: options.price / options.credits,
    recommendedFor: '用户',
    isPopular: options.isPopular || false
  }
}

/**
 * 创建自定义积分套餐数据
 * @param {Object} options - 套餐选项
 * @param {number} [options.minCredits=100] - 最小积分数量
 * @param {number} [options.maxCredits=10000] - 最大积分数量
 * @param {number} [options.costPerCredit=0.05] - 每积分价格
 * @returns {CreditPackage} 积分套餐对象
 */
export function createCustomPackage(options = {}) {
  const minCredits = options.minCredits || 100
  const maxCredits = options.maxCredits || 10000
  const costPerCredit = options.costPerCredit || 0.05

  return {
    id: Date.now() + 1, // 临时ID，实际应由后端生成
    packageCode: 'CREDITS_CUSTOM',
    packageName: '自定义积分',
    packageDescription: '按需购买，灵活选择',
    credits: 0,
    originalPrice: 0.0,
    currentPrice: 0.0,
    discount: 0,
    packageType: PACKAGE_TYPES.CUSTOM,
    isActive: true,
    displayOrder: 999,
    features: [
      '自定义积分数量',
      `最低${minCredits}积分起购`,
      `按${costPerCredit}元/积分计费`,
      '适用于所有AI服务'
    ],
    costPerCredit,
    minCredits,
    maxCredits,
    recommendedFor: '有特定需求的用户'
  }
}

/**
 * 验证积分套餐数据
 * @param {CreditPackage} packageData - 套餐数据
 * @returns {boolean} 是否有效
 */
export function validateCreditPackage(packageData) {
  if (!packageData) return false

  const requiredFields = [
    'packageCode',
    'packageName',
    'packageDescription',
    'packageType',
    'costPerCredit'
  ]

  for (const field of requiredFields) {
    if (!packageData[field]) return false
  }

  if (packageData.packageType === PACKAGE_TYPES.STANDARD) {
    return packageData.credits > 0 && packageData.currentPrice > 0
  }

  if (packageData.packageType === PACKAGE_TYPES.CUSTOM) {
    return (
      packageData.minCredits > 0 &&
      packageData.maxCredits > packageData.minCredits &&
      packageData.costPerCredit > 0
    )
  }

  return false
}

/**
 * 验证购买订单数据
 * @param {PurchaseOrderData} orderData - 订单数据
 * @returns {boolean} 是否有效
 */
export function validatePurchaseOrder(orderData) {
  if (!orderData) return false

  const requiredFields = ['packageCode', 'customerEmail', 'paymentMethod']

  for (const field of requiredFields) {
    if (!orderData[field]) return false
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(orderData.customerEmail)) return false

  // 验证支付方式
  if (!Object.values(PAYMENT_METHODS).includes(orderData.paymentMethod)) return false

  // 如果是自定义套餐，验证积分数量
  if (orderData.packageCode === 'CREDITS_CUSTOM') {
    if (
      !orderData.customCredits ||
      orderData.customCredits < 100 ||
      orderData.customCredits > 10000
    ) {
      return false
    }
  }

  return true
}

/**
 * 格式化订单状态显示文本
 * @param {string} status - 订单状态
 * @returns {string} 格式化后的状态文本
 */
export function formatOrderStatus(status) {
  const statusMap = {
    [ORDER_STATUS.PENDING_PAYMENT]: '等待支付',
    [ORDER_STATUS.PAID]: '支付成功',
    [ORDER_STATUS.CANCELLED]: '订单取消',
    [ORDER_STATUS.EXPIRED]: '订单过期',
    [ORDER_STATUS.FAILED]: '支付失败'
  }
  return statusMap[status] || status
}

/**
 * 计算自定义积分价格
 * @param {number} credits - 积分数量
 * @param {number} [costPerCredit=0.05] - 每积分价格
 * @returns {number} 总价格
 */
export function calculateCustomCreditsPrice(credits, costPerCredit = 0.05) {
  if (!credits || credits < 100) return 0
  return Math.round(credits * costPerCredit * 100) / 100 // 保留两位小数
}
