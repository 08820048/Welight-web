const API_BASE_URL = 'https://ilikexff.cn/api'

export async function getActiveProductActivities() {
  try {
    const response = await fetch(`${API_BASE_URL}/product-activities/active`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    if (result.code === 200) {
      return result.data || []
    }
    throw new Error(result.message || '获取进行中的活动失败')
  } catch (error) {
    console.error('获取进行中的活动失败:', error)
    return []
  }
}

/**
 * 将入参安全转换为字符串数组
 * @param {unknown} val 字段值（数组/JSON字符串/逗号分隔字符串）
 * @returns {string[]} 数组
 */
function toArray(val) {
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val)
      return Array.isArray(parsed) ? parsed : [val]
    } catch {
      return val
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }
  return []
}

/**
 * 从活动对象中解析“折扣率”（统一转换为 0~1 小数）
 * @param {object} act 活动对象
 * @returns {number|null} 折扣率
 */
function getDiscountRate(act) {
  if (typeof act.discountRate === 'number') return act.discountRate
  if (Array.isArray(act.rules) && act.rules.length > 0) {
    const rule = act.rules.find((r) => r && r.enabled !== false) || act.rules[0]
    if (typeof rule?.discountRate === 'number') return rule.discountRate
    if (typeof rule?.discountPercentage === 'number') {
      const d = rule.discountPercentage
      if (d <= 1) return d
      return Math.max(0, (100 - d) / 100)
    }
    if (typeof rule?.discountPercent === 'number') {
      const d = rule.discountPercent
      if (d <= 1) return d
      return Math.max(0, (100 - d) / 100)
    }
  }
  if (typeof act.discountPercentage === 'number') {
    const d = act.discountPercentage
    if (d <= 1) return d
    return Math.max(0, (100 - d) / 100)
  }
  if (typeof act.discountPercent === 'number') {
    const d = act.discountPercent
    if (d <= 1) return d
    return Math.max(0, (100 - d) / 100)
  }
  return null
}

function isLikelyHtml(str) {
  if (typeof str !== 'string') return false
  return /<\/?[a-z][\s\S]*>/i.test(str)
}

/**
 * 基于活动对象生成菜单徽标文案
 * @param {object} act 活动对象
 * @returns {string} 徽标
 */
function getMenuBadge(act) {
  if (typeof act.fixedPrice === 'number') return `特惠¥${act.fixedPrice}`
  const rate = getDiscountRate(act)
  if (typeof rate === 'number') {
    const zhe = Math.round(rate * 100) / 10
    return `${zhe}折`
  }
  const off = act.amountOff || act.discountAmount
  if (typeof off === 'number') return `直降${off}`
  return ''
}

/**
 * 从后端活动接口生成前端 Promotion 结构（用于页头/底部条幅）
 * @returns {Promise<Array<Object>>} 前端 Promotion 列表
 */
export async function getActivePromotionsFromBackend() {
  const acts = await getActiveProductActivities()
  const now = new Date()
  return acts
    .map((act) => {
      const id = act?.id ?? act?.code
      if (id == null) return null
      const start =
        act.activityStartDate ||
        act.startDate ||
        act.preheatStartDate ||
        act.startAt ||
        act.preheatStartAt
      const end = act.endDate || act.finishDate || act.endAt || act.activityEndDate || act.finishAt
      if (!start || !end) return null
      const preheat = act.preheatStartDate || act.preheatStartAt || start
      const productCodes = toArray(act.productCodes || act.targetProductCodes || act.targetProducts)

      return {
        id,
        cards: [],
        name: act.name || act.title || act.displayName,
        displayName: act.displayName || act.title || act.name,
        description: act.description || act.content,
        details: act.details || act.content,
        rules: Array.isArray(act.rules) ? act.rules : [],
        enabled: act.enabled !== false,
        preheatStartDate: preheat,
        activityStartDate: start,
        endDate: end,
        showInMenu: act.showInMenu !== false,
        menuBadge: getMenuBadge(act),
        menuBadgeText: act.menuBadgeText || '',
        banner: {
          title: act.banner?.title || act.title || act.name || act.displayName,
          subtitle: act.banner?.subtitle || act.subtitle,
          bgColor: act.banner?.bgColor,
          bgGradient: act.banner?.bgGradient,
          content: act.banner?.content || (isLikelyHtml(act.content) ? act.content : undefined)
        },
        productCodes
      }
    })
    .filter(Boolean)
    .filter((promo) => {
      const preheatStart = new Date(promo.preheatStartDate)
      preheatStart.setHours(0, 0, 0, 0)
      const end = new Date(promo.endDate)
      end.setHours(23, 59, 59, 999)
      return now >= preheatStart && now <= end
    })
}

export default {
  getActiveProductActivities,
  getActivePromotionsFromBackend
}
