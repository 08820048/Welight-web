/**
 * 捐赠数据管理
 * 包含致谢名单的数据结构和模拟数据
 */

// 致谢名单数据结构
export const donationSchema = {
  id: 'string', // 唯一标识
  amount: 'number', // 捐赠金额
  donorName: 'string', // 捐赠者昵称
  donationDate: 'string', // 捐赠日期 (ISO格式)
  message: 'string', // 捐赠留言
  channel: 'string', // 捐赠渠道
  specialTag: 'string|null', // 特别捐赠标识
  isSpecial: 'boolean' // 是否为特别捐赠
}

// 致谢名单数据
export const donations = [
  {
    id: '20250919220014551014119092',
    amount: 5.00,
    donorName: '*洋',
    donationDate: '2025-09-19T18:05:14+08:00',
    message: '支持大佬，一点小心意',
    channel: '收钱码收款',
    specialTag: '首位捐赠者',
    isSpecial: true
  },
  {
    id: '20250920220014923814456883',
    amount: 5.00,
    donorName: '余无名',
    donationDate: '2025-09-20T13:23:19+08:00',
    message: '感谢为爱发电',
    channel: '收钱码收款',
    specialTag: null,
    isSpecial: false
  }
  // 可以在这里添加更多致谢记录
]

/**
 * 获取所有致谢名单
 * @returns {Array} 致谢名单数组
 */
export function getAllDonations() {
  return donations.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
}

/**
 * 获取特别致谢记录
 * @returns {Array} 特别致谢记录数组
 */
export function getSpecialDonations() {
  return donations.filter(donation => donation.isSpecial)
}

/**
 * 获取捐赠统计信息
 * @returns {Object} 统计信息对象
 */
export function getDonationStats() {
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const totalCount = donations.length
  const specialCount = donations.filter(d => d.isSpecial).length
  
  return {
    totalAmount,
    totalCount,
    specialCount,
    averageAmount: totalCount > 0 ? (totalAmount / totalCount).toFixed(2) : 0
  }
}

/**
 * 格式化金额显示
 * @param {number} amount 金额
 * @returns {string} 格式化后的金额字符串
 */
export function formatAmount(amount) {
  const numAmount = Number(amount) || 0
  return `¥${numAmount.toFixed(2)}`
}

/**
 * 格式化日期显示
 * @param {string} dateString 日期字符串
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}