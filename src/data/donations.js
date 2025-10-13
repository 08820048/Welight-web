/**
 * 赞助数据管理
 * 包含致谢名单的数据结构和模拟数据
 */

// 致谢名单数据结构
export const donationSchema = {
  id: 'string', // 唯一标识
  amount: 'number', // 赞助金额
  donorName: 'string', // 赞助者昵称
  donationDate: 'string', // 赞助日期 (ISO格式)
  message: 'string', // 赞助留言
  channel: 'string', // 赞助渠道
  specialTag: 'string|null', // 特别赞助标识
  isSpecial: 'boolean' // 是否为特别赞助
}

// 致谢名单数据
export const donations = [
  {
    id: '20250919220014551014119092',
    amount: 5.0,
    donorName: '*洋',
    donationDate: '2025-09-19T18:05:14+08:00',
    message: '支持大佬，一点小心意',
    channel: '收钱码收款',
    specialTag: '首位赞助者',
    isSpecial: true
  },
  {
    id: '20250920220014923814456883',
    amount: 5.0,
    donorName: '余无名',
    donationDate: '2025-09-20T13:23:19+08:00',
    message: '感谢为爱发电',
    channel: '收钱码收款',
    specialTag: null,
    isSpecial: false
  },
  {
    id: '20250928220014923814456884',
    amount: 50.0,
    donorName: '君卓',
    donationDate: '2025-09-28T17:38:37+08:00',
    message: '聊表心意，希望做大做强',
    channel: '收钱码收款',
    specialTag: '先行者',
    isSpecial: true
  },
  {
    id: '20251013081920',
    amount: 20.0,
    donorName: '哥布林医生',
    donationDate: '2025-10-13T08:19:20+08:00',
    message: '支持一下',
    channel: '微信转账',
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
  return [...donations].sort((a, b) => b.amount - a.amount)
}

/**
 * 获取特别致谢记录
 * @returns {Array} 特别致谢记录数组
 */
export function getSpecialDonations() {
  return donations.filter((donation) => donation.isSpecial)
}

/**
 * 获取赞助统计信息
 * @returns {Object} 统计信息对象
 */
export function getDonationStats() {
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const totalCount = donations.length
  const specialCount = donations.filter((d) => d.isSpecial).length

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
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return dateString
  }
}

// 头衔等级配置（基础模板）
export const titleTemplates = [
  { name: '白金赞助者', icon: '1', color: '#E5E4E2', level: 15 },
  { name: '钻石赞助者', icon: '2', color: '#B9F2FF', level: 14 },
  { name: '黄金赞助者', icon: '3', color: '#FFD700', level: 13 },
  { name: '银牌赞助者', icon: '🥈', color: '#C0C0C0', level: 12 },
  { name: '铜牌赞助者', icon: '🥉', color: '#CD7F32', level: 11 },
  { name: '核心支持者', icon: '💙', color: '#4169E1', level: 10 },
  { name: '热心支持者', icon: '💚', color: '#32CD32', level: 9 },
  { name: '先锋贡献者', icon: '🔥', color: '#FF4500', level: 8 },
  { name: '活跃贡献者', icon: '🚩', color: '#FF8C00', level: 7 },
  { name: '社区助力者', icon: '🟣', color: '#8A2BE2', level: 6 },
  { name: '友好支持者', icon: '🔵', color: '#87CEEB', level: 5 },
  { name: '初级赞助者', icon: '🟡', color: '#FFD700', level: 4 },
  { name: '感谢参与者', icon: '⚪', color: '#808080', level: 3 },
  { name: '爱心支持者', icon: '💗', color: '#FF69B4', level: 2 },
  { name: '微光支持者', icon: '✨', color: '#F5F5F5', level: 1 }
]

/**
 * 基于现有赞助数据动态生成头衔配置
 * @returns {Array} 动态头衔配置数组
 */
function generateDynamicTitleConfig() {
  // 获取所有赞助金额并排序
  const amounts = donations.map((d) => d.amount).sort((a, b) => b - a)
  const uniqueAmounts = [...new Set(amounts)]

  // 如果数据太少，使用基础配置
  if (uniqueAmounts.length <= 1) {
    return titleTemplates.slice(0, 3).map((template, index) => ({
      ...template,
      minAmount: index === 0 ? Math.max(...amounts) : Math.min(...amounts),
      maxAmount: index === 0 ? Infinity : Math.max(...amounts) - 0.01
    }))
  }

  // 动态分配头衔
  const titleConfig = []
  const maxAmount = Math.max(...amounts)
  const minAmount = Math.min(...amounts)

  // 为每个独特的金额分配头衔
  uniqueAmounts.forEach((amount, index) => {
    const templateIndex = Math.min(index, titleTemplates.length - 1)
    const template = titleTemplates[templateIndex]

    titleConfig.push({
      ...template,
      minAmount: amount,
      maxAmount: amount,
      level: titleTemplates.length - index
    })
  })

  return titleConfig
}

/**
 * 根据赞助金额获取头衔信息（动态版本）
 * @param {number} amount 赞助金额
 * @returns {Object|null} 头衔信息
 */
export function getTitleByAmount(amount) {
  const numAmount = Number(amount) || 0
  const dynamicConfig = generateDynamicTitleConfig()

  // 查找匹配的头衔
  const title = dynamicConfig.find(
    (config) => numAmount >= config.minAmount && numAmount <= config.maxAmount
  )

  if (title) {
    return title
  }

  // 如果没有精确匹配，根据金额大小分配合适的头衔
  const amounts = donations.map((d) => d.amount).sort((a, b) => b - a)
  const maxAmount = Math.max(...amounts)
  const minAmount = Math.min(...amounts)

  if (numAmount >= maxAmount) {
    // 最高金额或更高，给予最高头衔
    return { ...titleTemplates[0], level: titleTemplates.length }
  } else if (numAmount <= minAmount) {
    // 最低金额或更低，给予基础头衔
    return { ...titleTemplates[titleTemplates.length - 1], level: 1 }
  } else {
    // 中间金额，根据比例分配
    const ratio = (numAmount - minAmount) / (maxAmount - minAmount)
    const levelIndex = Math.floor(ratio * (titleTemplates.length - 1))
    return { ...titleTemplates[levelIndex], level: titleTemplates.length - levelIndex }
  }
}

/**
 * 按头衔等级排序获取赞助列表
 * @returns {Array} 按头衔等级排序的赞助列表
 */
export function getDonationsByTitleLevel() {
  const allDonations = getAllDonations()

  // 首先按金额和时间排序，确定排名
  const sortedDonations = allDonations.sort((a, b) => {
    // 首先按金额排序（金额高的在前）
    if (a.amount !== b.amount) {
      return b.amount - a.amount
    }

    // 金额相同时，按时间排序（最新赞助的在前）
    return new Date(b.donationDate) - new Date(a.donationDate)
  })

  // 按排名分配头衔，前三名使用勋章图标
  return sortedDonations.map((donation, index) => {
    let title

    if (index === 0) {
      // 第1名：白金赞助者 (xz3.png)
      title = { ...titleTemplates[0] }
    } else if (index === 1) {
      // 第2名：钻石赞助者 (xz2.png)
      title = { ...titleTemplates[1] }
    } else if (index === 2) {
      // 第3名：黄金赞助者 (xz.png)
      title = { ...titleTemplates[2] }
    } else {
      // 其他名次：按原有逻辑分配头衔
      title = getTitleByAmount(donation.amount)
    }

    return {
      ...donation,
      title
    }
  })
}

/**
 * 获取头衔统计信息
 * @returns {Object} 头衔统计数据
 */
export function getTitleStats() {
  const allDonations = getAllDonations()
  const titleStats = {}

  allDonations.forEach((donation) => {
    const title = getTitleByAmount(donation.amount)
    const titleName = title.name

    if (!titleStats[titleName]) {
      titleStats[titleName] = {
        count: 0,
        totalAmount: 0,
        icon: title.icon,
        color: title.color,
        level: title.level,
        amounts: []
      }
    }

    titleStats[titleName].count++
    titleStats[titleName].totalAmount += donation.amount
    titleStats[titleName].amounts.push(donation.amount)
  })

  // 按金额排序（金额高的头衔在前）
  return Object.entries(titleStats)
    .sort(([, a], [, b]) => {
      // 按最高金额排序
      const maxAmountA = Math.max(...a.amounts)
      const maxAmountB = Math.max(...b.amounts)
      return maxAmountB - maxAmountA
    })
    .reduce((acc, [name, data]) => {
      acc[name] = data
      return acc
    }, {})
}
