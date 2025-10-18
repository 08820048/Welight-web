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
          <div class="promo-info-grid">
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
              <h3>许可证限制特惠中</h3>
              <p>特惠现价<strong>14.99元</strong></p>
              <span>活动结束后恢复原价<strong>49.99元</strong></span>
            </div>
            <div class="promo-info-item promo-rules-item">
              <h3>活动规则</h3>
              <ul>
                <li>活动时间：10月20日 - 11月14日</li>
                <li>活动期间购买的所有商品均可享受对应优惠</li>
                <li>优惠不可叠加使用，以最优惠价格为准</li>
                <li>赠送的积分将在订单完成后自动发放到账户</li>
              </ul>
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
