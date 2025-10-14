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
            <div class="promo-info-item promo-rules-item">
              <h3>活动规则</h3>
              <ul>
                <li>活动期间购买的所有商品均可享受对应优惠</li>
                <li>优惠不可叠加使用，以最优惠价格为准</li>
                <li>赠送的积分将在订单完成后自动发放到账户</li>
              </ul>
            </div>
          </div>
          <div class="promo-actions">
            <a href="/pricing" class="promo-btn-main">立即抢购</a>
            <a href="/community" class="promo-btn-sub">加入社群</a>
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

export default promotions
