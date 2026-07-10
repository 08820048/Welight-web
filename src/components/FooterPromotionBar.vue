<template>
  <transition name="footer-promo-fade">
    <div v-if="isVisible && !isMinimized" class="fixed bottom-0 left-0 right-0 z-[90]">
      <div class="mx-auto max-w-7xl px-4 py-3 md:py-4">
        <div class="relative overflow-hidden rounded-lg border border-[#e5e5e5] bg-[#1B365D] dark:border-[#44433f]">
          <div class="relative flex items-center justify-between gap-3 px-3 py-2.5 md:gap-6 md:px-5 md:py-3.5">
            <!-- 左侧：活动信息与倒计时 -->
            <div class="flex items-center gap-3 md:gap-4 min-w-0">
              <span class="hidden text-xl leading-none md:inline" aria-hidden="true">🎉</span>
              <div class="flex flex-col md:flex-row md:items-center md:gap-3 min-w-0">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="truncate text-[#ffffff] font-bold">
                    {{ currentPromotionTitle }}
                  </span>
                  <span v-if="currentPromotion?.banner?.subtitle"
                    class="hidden md:inline-block text-[#f0f0f0] text-sm truncate">
                    · {{ currentPromotion.banner.subtitle }}
                  </span>
                </div>
                <MiniCountdown v-if="currentPromotion" :promotion="currentPromotion" @click="openBanner" />
              </div>
            </div>
            <!-- 右侧：操作按钮（恢复原来同一行右侧布局） -->
            <div class="flex items-center gap-2 md:gap-3 shrink-0">
              <a href="https://checkout.dodopayments.com/buy/pdt_0NfwDna4ZjtnAan2fCf7T?quantity=1&price=59&redirect_url=https://waer.ltd/success"
                target="_blank"
                class="rounded-lg bg-[#ffffff] px-3 py-1.5 text-sm font-semibold text-[#141413] transition-all hover:bg-[#f0f0f0] md:px-4 md:py-2 md:text-base">
                立即抢购
              </a>
              <button @click="openBanner"
                class="rounded-lg bg-[#2D5A8A]/60 px-3 py-1.5 text-sm font-semibold text-[#ffffff] transition-all hover:bg-[#2D5A8A]/80 md:px-4 md:py-2 md:text-base">
                查看详情
              </button>
              <button @click="minimizeBar"
                class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#2D5A8A]/60 transition-all hover:bg-[#2D5A8A]/80 md:h-9 md:w-9"
                aria-label="关闭活动条幅">
                <svg class="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- 左下角最小化圆形按钮 -->
  <transition name="footer-promo-fade">
    <button v-if="isVisible && isMinimized" @click="restoreBar"
      class="fixed bottom-6 left-6 z-[90] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#e5e5e5] bg-[#1B365D] transition-transform hover:scale-105 dark:border-[#44433f]"
      aria-label="展开活动条幅" title="展开活动条幅">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1V8h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  </transition>

  <!-- 顶部活动详情条幅（复用现有组件） -->
  <PromotionBanner v-if="currentPromotion" v-model="isPromotionBannerVisible" :promotion="currentPromotion"
    @close="handleBannerClosed" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import PromotionBanner from './PromotionBanner.vue'
import MiniCountdown from './MiniCountdown.vue'

/**
 * 读取最近一次关闭的促销条幅ID
 */
function getLastClosedPromotionId() {
  try {
    return localStorage.getItem('welight_footer_promo_closed_id') || ''
  } catch {
    return ''
  }
}

/**
 * 读取最小化的促销条幅ID
 */
function getMinimizedPromotionId() {
  try {
    return localStorage.getItem('welight_footer_promo_minimized_id') || ''
  } catch {
    return ''
  }
}

/**
 * 记录当前促销条幅已关闭
 * @param {string} promotionId 活动ID
 */
function setLastClosedPromotionId(promotionId) {
  try {
    localStorage.setItem('welight_footer_promo_closed_id', promotionId)
  } catch {
    // ignore
  }
}

/**
 * 设置最小化的促销条幅ID
 * @param {string} promotionId 活动ID
 */
function setMinimizedPromotionId(promotionId) {
  try {
    localStorage.setItem('welight_footer_promo_minimized_id', promotionId)
  } catch {
    // ignore
  }
}

const activePromotions = ref([])
const isPromotionBannerVisible = ref(false)
const isMinimized = ref(false)

/**
 * 安全获取有效活动列表
 * @returns {Array<Object>}
 */
function getActivePromitionsSafe() {
  return activePromotions.value || []
}

/**
 * 当前展示的活动（取最新一个）
 */
const currentPromotion = computed(() => {
  const list = Array.isArray(activePromotions.value) ? activePromotions.value : []
  const valid = list.filter((p) => {
    const title = p?.displayName || p?.name || p?.banner?.title
    return !!title
  })
  valid.sort((a, b) => {
    const aTs = new Date(a?.activityStartDate || a?.preheatStartDate || 0).getTime()
    const bTs = new Date(b?.activityStartDate || b?.preheatStartDate || 0).getTime()
    return bTs - aTs
  })
  return valid.length > 0 ? valid[0] : null
})

const currentPromotionTitle = computed(() => {
  const p = currentPromotion.value
  return p?.displayName || p?.name || p?.banner?.title || ''
})

/**
 * 底部条幅是否显示
 */
const isVisible = computed(() => {
  return !!currentPromotion.value && !!currentPromotionTitle.value
})

// 根据本地存储同步最小化状态
watch(currentPromotion, () => {
  const minimizedId = getMinimizedPromotionId()
  isMinimized.value = !!currentPromotion.value && minimizedId === currentPromotion.value.id
}, { immediate: true })

/**
 * 打开顶部活动详情条幅
 */
function openBanner() {
  if (!currentPromotion.value) return
  isPromotionBannerVisible.value = true
}

/**
 * 顶部活动详情关闭回调
 */
function handleBannerClosed() {
  isPromotionBannerVisible.value = false
  try {
    const id = currentPromotion.value?.id || ''
    if (id) {
      localStorage.setItem('welight_last_viewed_promotion', id)
    }
  } catch {
    // ignore
  }
}

/**
 * 关闭底部促销条幅
 */
function minimizeBar() {
  if (!currentPromotion.value?.id) return
  setMinimizedPromotionId(currentPromotion.value.id)
  isMinimized.value = true
}

/**
 * 从最小化状态恢复底部条幅
 */
function restoreBar() {
  if (!currentPromotion.value?.id) return
  setMinimizedPromotionId('')
  isMinimized.value = false
}

</script>

<style scoped>
.footer-promo-fade-enter-active,
.footer-promo-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.footer-promo-fade-enter-from,
.footer-promo-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
