/**
 * 活动配置文件
 */

const promotions = [
  {
    id: 'double-11-2025',
    name: '11·11',
    displayName: 'Welight双十一特惠',
    enabled: true,
    preheatStartDate: '2025-10-14',
    activityStartDate: '2025-10-20',
    endDate: '2025-11-14',
    showInMenu: true,
    menuBadge: '',
    menuBadgeText: '',
    banner: {
      title: 'Welight双十一特惠活动',
      subtitle: '限时优惠，错过再等一年！',
      bgColor: '#ff4444',
      content: `
        <div class="promo-clean-layout">
          <div class="promo-info-grid-new">
            <div class="promo-info-item">
              <h3>购买永久许可证</h3>
              <p>附赠 <strong>300积分</strong></p>
              <span>原100积分，活动期间3倍赠送</span>
            </div>
            <div class="promo-info-item">
              <h3>积分套餐优惠</h3>
              <p>全场 <strong>8.8折</strong></p>
              <span>所有积分套餐享受特别折扣</span>
            </div>
            <div class="promo-info-item">
              <h3>许可证限时特惠中</h3>
              <p>特惠现价 <strong>14.99元/永久</strong></p>
              <span>活动结束后恢复原价 <strong>49.99元/每年</strong></span>
            </div>
          </div>
          <div class="promo-actions">
            <a href="/pricing" class="promo-btn-main">立即抢购</a>
            <a href="https://qm.qq.com/q/nNA64h5d6K" class="promo-btn-sub">加入社群，享更多福利</a>
          </div>
        </div>
      `
    }
  },
  {
    id: 'christmas-2025',
    name: '圣诞节',
    displayName: '圣诞节限时活动',
    enabled: true,
    preheatStartDate: '2025-12-20',
    activityStartDate: '2025-12-24',
    endDate: '2025-12-27',
    showInMenu: true,
    menuBadge: '直降9.9',
    menuBadgeText: '',
    banner: {
      title: '圣诞节活动 · 许可证直降9.9元',
      subtitle: '所有许可证套餐直降 9.9 元！',
      bgColor: '#dc2626',
      bgGradient: 'linear-gradient(90deg, #ef4444 0%, #22c55e 100%)',
      content: `
        <div class="promo-clean-layout">
          <div class="promo-info-grid-new">
            <div class="promo-info-item">
              <h3>许可证限时直降</h3>
              <p>所有许可证套餐 <strong>立减 9.9 元</strong></p>
              <span>节日限定直降优惠，仅限活动期</span>
            </div>
            <div class="promo-info-item">
              <h3>买断更划算</h3>
              <p>买断版享受同等直降优惠</p>
              <span>活动结束后恢复原价</span>
            </div>
          </div>
          <div class="promo-actions">
            <a href="/pricing" class="promo-btn-main">立即抢购</a>
            <a href="https://qm.qq.com/q/nNA64h5d6K" class="promo-btn-sub">加入社群，享更多福利</a>
          </div>
        </div>
      `
    }
  },
  {
    id: 'new-year-2026',
    name: '跨年',
    displayName: '跨年限时活动',
    enabled: true,
    preheatStartDate: '2025-12-28',
    activityStartDate: '2025-12-29',
    endDate: '2026-01-01',
    showInMenu: false,
    menuBadge: '',
    menuBadgeText: '',
    banner: {
      title: '跨年限时活动 · 新年焕新',
      subtitle: '许可证全部6.5折，积分套餐全系8折',
      bgColor: '#f97316',
      bgGradient: 'linear-gradient(90deg, #60A5FA 0%, #6366F1 50%, #A78BFA 100%)',
      content: `
        <div class="promo-clean-layout">
          <div class="promo-info-grid-new">
            <div class="promo-info-item">
              <h3>许可证全系折扣</h3>
              <p>全场 <strong>6.5折</strong></p>
              <span>限时优惠，迎新焕新</span>
            </div>
            <div class="promo-info-item">
              <h3>积分套餐优惠</h3>
              <p>全系 <strong>8折</strong></p>
              <span>多档位套餐均享折扣</span>
            </div>
          </div>
          <div class="promo-actions">
            <a href="/pricing" class="promo-btn-main">立即抢购</a>
            <a href="https://qm.qq.com/q/nNA64h5d6K" class="promo-btn-sub">加入社群，享更多福利</a>
          </div>
        </div>
      `
    }
  },
  {
    id: 'dongzhi-2025',
    name: '冬至',
    displayName: '冬至特惠',
    enabled: true,
    preheatStartDate: '2025-12-20',
    activityStartDate: '2025-12-21',
    endDate: '2025-12-22',
    showInMenu: false,
    menuBadge: '',
    menuBadgeText: '',
    banner: {
      title: '冬至特惠 · 暖冬同行',
      subtitle: '许可证全部8折',
      bgColor: '#3b82f6',
      bgGradient: 'linear-gradient(90deg, #2563EB 0%, #22D3EE 50%, #2DD4BF 100%)',
      content: `
        <div class="promo-clean-layout">
          <div class="promo-info-grid-new">
            <div class="promo-info-item">
              <h3>许可证限时折扣</h3>
              <p>全场 <strong style="color:#ff4444">8折</strong></p>
              <span>冬至限定优惠，仅限活动期</span>
            </div>
          </div>
          <div class="promo-actions">
            <a href="/pricing" class="promo-btn-main">立即抢购</a>
            <a href="https://qm.qq.com/q/nNA64h5d6K" class="promo-btn-sub">加入社群，享更多福利</a>
          </div>
        </div>
      `
    }
  }
]

export function getActivePromotions() {
  const now = new Date()
  return promotions.filter((promo) => {
    if (!promo.enabled) return false
    const preheatStart = new Date(promo.preheatStartDate)
    preheatStart.setHours(0, 0, 0, 0)
    const end = new Date(promo.endDate)
    end.setHours(23, 59, 59, 999)
    return now >= preheatStart && now <= end
  })
}

export function getMenuPromotions() {
  return getActivePromotions().filter((promo) => promo.showInMenu)
}

// 检查是否有新活动（用户未查看过的）
export const hasNewPromotions = () => {
  const lastViewedId = localStorage.getItem('welight_last_viewed_promotion')
  const activePromotions = getMenuPromotions()

  if (activePromotions.length === 0) return false
  if (!lastViewedId) return true

  // 获取最新的活动
  const latestPromotion = activePromotions[0]
  return latestPromotion && latestPromotion.id !== lastViewedId
}

// 标记活动为已查看
export const markPromotionAsViewed = (promotionId) => {
  localStorage.setItem('welight_last_viewed_promotion', promotionId)
}

// 标记最新活动为已查看
export const markLatestPromotionAsViewed = () => {
  const activePromotions = getMenuPromotions()
  if (activePromotions.length > 0) {
    markPromotionAsViewed(activePromotions[0].id)
  }
}

export default promotions
