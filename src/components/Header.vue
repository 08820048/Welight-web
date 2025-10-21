<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div class="container-custom">
      <div class="flex gap-4 md:py-4 py-3 items-center justify-between w-full">
        <!-- Logo 和品牌信息 -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 flex ring-1 ring-primary-100 bg-primary-50 bg-cover rounded-lg items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img src="/logo.png" alt="Welight Logo" class="w-full h-full object-cover" />
          </div>
          <div class="hidden sm:block">
            <div class="text-lg font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              Welight
              <sup class="text-xs text-slate-500 font-normal">v3.2.5</sup>
            </div>
            <div class="text-xs text-slate-500">智能高效的公众号编辑器</div>
          </div>
        </router-link>

        <!-- 导航菜单 - 桌面端 -->
        <nav class="hidden lg:flex items-center gap-8 text-sm text-slate-600">
          <router-link to="/" class="hover:text-slate-900 transition-colors font-medium"
            active-class="text-primary-600">
            首页
          </router-link>
          <button @click="showAnnouncements"
            class="relative hover:text-slate-900 transition-colors font-medium flex items-center gap-1.5">
            公告
            <div v-if="hasNewAnnouncements" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          <router-link to="/pricing" class="hover:text-slate-900 transition-colors font-medium relative"
            active-class="text-primary-600">
            定价
            <!-- <span
              class="absolute -top-2 -right-3 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90">
              庆
            </span> -->
          </router-link>
          <router-link to="/donation"
            class="hover:text-slate-900 transition-colors font-medium relative flex items-center gap-1.5"
            active-class="text-primary-600">
            赞助
            <!-- <div v-if="donationCount > 0"
              class="bg-yellow-400 text-slate-900 text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center shadow-sm scale-75">
              +{{ donationCount }}
            </div> -->
          </router-link>

          <!-- 交流反馈下拉菜单 -->
          <div class="relative group">
            <button class="hover:text-slate-900 transition-colors font-medium flex items-center gap-1.5"
              title="交流讨论与问题反馈">
              交流反馈
              <svg class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- 下拉菜单 -->
            <div
              class="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
              <div class="py-2">
                <a href="https://qm.qq.com/q/nNA64h5d6K" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <span>交流讨论</span>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>问题反馈</span>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>功能诉求</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- 活动菜单项 -->
          <button v-for="promo in menuPromotions" :key="promo.id" @click="showPromotionBanner(promo)"
            class="relative font-bold flex items-center gap-1.5 group/promo promotion-menu-item">
            <!-- 迷你倒计时 - 放在上方 -->
            <MiniCountdown :promotion="promo" @click.stop="showPromotionBanner(promo)" class="absolute -top-5"
              style="left: 65px;" />
            <span class="promotion-text">{{ promo.name }}</span>
            <span v-if="promo.menuBadge" class="promotion-flame">{{ promo.menuBadge }}</span>
            <span v-if="promo.menuBadgeText"
              class="absolute -top-2 -right-3 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90 animate-pulse">
              {{ promo.menuBadgeText }}
            </span>
          </button>
        </nav>

        <!-- 右侧按钮组 -->
        <div class="flex items-center gap-3">
          <!-- 更新日志按钮 -->
          <button @click="showChangelog"
            class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/30 text-sm text-slate-700 shadow-sm hover:bg-white/70 transition-all duration-200 backdrop-blur-sm"
            title="查看更新日志">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>更新日志</span>
          </button>

          <!-- 文档按钮 -->
          <router-link to="/documentation"
            class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/30 text-sm text-slate-700 shadow-sm hover:bg-white/70 transition-all duration-200 backdrop-blur-sm"
            title="查看文档">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>文档</span>
          </router-link>

          <!-- 移动端菜单按钮 -->
          <button @click="toggleMobileMenu"
            class="lg:hidden inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-slate-900 transition"
            aria-label="菜单">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
        <nav class="container-custom py-4 space-y-2">
          <router-link to="/" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            首页
          </router-link>
          <router-link to="/features" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            功能特性
          </router-link>
          <router-link to="/pricing" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            定价
          </router-link>
          <router-link to="/download" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            下载
          </router-link>
          <router-link to="/monthly-cards" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            月卡管理
          </router-link>
          <router-link to="/documentation" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            文档
          </router-link>
          <router-link to="/community" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            交流讨论
          </router-link>
          <!-- 移动端活动菜单项 -->
          <button v-for="promo in menuPromotions" :key="promo.id" @click="showPromotionBanner(promo); closeMobileMenu()"
            class="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition-all font-bold flex items-center justify-between promotion-menu-item-mobile">
            <span class="flex items-center gap-2">
              <span v-if="promo.menuBadge" class="promotion-flame">{{ promo.menuBadge }}</span>
              <span class="promotion-text">{{ promo.name }}</span>
            </span>
            <span v-if="promo.menuBadgeText"
              class="text-white text-xs px-2 py-0.5 rounded-full font-bold bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
              {{ promo.menuBadgeText }}
            </span>
          </button>
          <router-link to="/donation" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            ❤️ 赞助支持
          </router-link>
        </nav>
      </div>
    </transition>

    <!-- 更新日志模态框 -->
    <ChangelogModal :isVisible="isChangelogVisible" @close="closeChangelog" />

    <!-- 公告模态框 -->
    <AnnouncementModal :isVisible="isAnnouncementVisible" @close="closeAnnouncements" />

    <!-- 活动条幅 -->
    <PromotionBanner v-model="isPromotionBannerVisible" :promotion="currentPromotion" @close="closePromotionBanner" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ChangelogModal from './ChangelogModal.vue'
import AnnouncementModal from './AnnouncementModal.vue'
import PromotionBanner from './PromotionBanner.vue'
import MiniCountdown from './MiniCountdown.vue'
import { hasNewAnnouncements as checkNewAnnouncements } from '@/data/announcements.js'
import { donations } from '@/data/donations.js'
import { getMenuPromotions, hasNewPromotions, markLatestPromotionAsViewed } from '@/data/promotions.js'

// 滚动状态
const isScrolled = ref(false)

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 更新日志模态框状态
const isChangelogVisible = ref(false)

// 公告模态框状态
const isAnnouncementVisible = ref(false)

// 是否有新公告
const hasNewAnnouncements = ref(false)

// 计算赞助次数
const donationCount = computed(() => donations.length)

// 活动相关状态
const isPromotionBannerVisible = ref(false)
const currentPromotion = ref(null)
const menuPromotions = ref([])

// 获取菜单中的活动
const loadMenuPromotions = () => {
  menuPromotions.value = getMenuPromotions()
}

// 显示活动条幅
const showPromotionBanner = (promotion) => {
  currentPromotion.value = promotion
  isPromotionBannerVisible.value = true
}

// 关闭活动条幅
const closePromotionBanner = () => {
  isPromotionBannerVisible.value = false
  // 标记活动为已查看
  if (currentPromotion.value) {
    markLatestPromotionAsViewed()
  }
  currentPromotion.value = null
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 显示更新日志
const showChangelog = () => {
  isChangelogVisible.value = true
}

// 关闭更新日志
const closeChangelog = () => {
  isChangelogVisible.value = false
}

// 显示公告
const showAnnouncements = () => {
  isAnnouncementVisible.value = true
}

// 关闭公告
const closeAnnouncements = () => {
  isAnnouncementVisible.value = false
  hasNewAnnouncements.value = checkNewAnnouncements()
}

// 处理滚动
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// 组件挂载
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  hasNewAnnouncements.value = checkNewAnnouncements()

  // 加载活动菜单
  loadMenuPromotions()

  // 检查是否有新活动需要自动弹出
  const hasNewPromo = hasNewPromotions()

  // 如果有新公告，延迟弹出
  if (hasNewAnnouncements.value) {
    setTimeout(() => {
      isAnnouncementVisible.value = true
    }, 1000)
  }
  // 如果没有新公告但有新活动，延迟弹出活动条幅
  else if (hasNewPromo && menuPromotions.value.length > 0) {
    setTimeout(() => {
      showPromotionBanner(menuPromotions.value[0])
    }, 1500) // 延迟1.5秒，避免与公告冲突
  }
})

// 组件卸载
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 活动菜单项样式 */
.promotion-menu-item {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.promotion-menu-item:hover {
  transform: translateY(-2px);
}

/* 活动文字渐变和动画 */
.promotion-text {
  background: #ff4444;
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'Noto Serif SC', 'STKaiti', 'KaiTi', serif;
  font-size: 1.5rem;
  /* 24px */
  font-weight: 900;
  letter-spacing: 0.08em;
}



/* 火焰图标动画 */
.promotion-flame {
  display: inline-block;
  animation: flame-flicker 1.5s ease-in-out infinite, flame-float 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.6)) drop-shadow(0 0 12px rgba(255, 142, 83, 0.4));
}

/* 火焰闪烁动画 */
@keyframes flame-flicker {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }

  25% {
    transform: scale(1.1) rotate(-5deg);
    opacity: 0.9;
  }

  50% {
    transform: scale(0.95) rotate(5deg);
    opacity: 1;
  }

  75% {
    transform: scale(1.05) rotate(-3deg);
    opacity: 0.95;
  }
}

/* 火焰上下浮动 */
@keyframes flame-float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-3px);
  }
}

/* 悬停时增强效果 */
.promotion-menu-item:hover .promotion-flame {
  animation: flame-flicker 0.8s ease-in-out infinite, flame-float 1s ease-in-out infinite;
  filter: drop-shadow(0 0 12px rgba(255, 107, 107, 0.8)) drop-shadow(0 0 16px rgba(255, 142, 83, 0.6));
}

.promotion-menu-item:hover .promotion-text {
  transform: scale(1.05);
}
</style>
