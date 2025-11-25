<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <WireframeOverlay class="wireframe-header" />
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop Navbar -->
      <nav class="hidden lg:flex items-center justify-between h-16">
        <!-- Left: Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-2 relative">
            <img src="/logo.png" alt="Welight Logo" class="w-8 h-8 rounded-lg" />
            <span class="text-lg font-semibold">Welight</span>
            <!-- 版本角标 -->
            <span
              class="absolute -top-2 -right-16 px-2 py-0.5 bg-gray-900 text-white text-[10px] font-medium rounded-full whitespace-nowrap">
              v4.0.1
            </span>
          </router-link>
        </div>

        <!-- Center: Desktop Menu -->
        <div class="flex items-center gap-1">
          <router-link to="/"
            class="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900">
            首页
          </router-link>

          <router-link to="/pricing"
            class="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900">
            购买许可
          </router-link>

          <router-link to="/donation"
            class="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900">
            赞助支持
          </router-link>

          <button @click="showAnnouncements"
            class="relative inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900">
            公告通知
            <div v-if="hasNewAnnouncements"
              class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </button>

          <button @click="showChangelog"
            class="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900">
            更新日志
          </button>

          <!-- 交流反馈下拉菜单，移动到最后 -->
          <div class="relative group">
            <button
              class="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900">
              交流反馈
              <svg class="ml-1 h-3 w-3 transition-transform duration-200 group-hover:rotate-180" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              class="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
              <div class="p-3">
                <a href="https://qm.qq.com/q/nNA64h5d6K" target="_blank"
                  class="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                  <svg class="w-5 h-5 text-gray-600 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">交流讨论</div>
                    <p class="text-sm text-gray-500 mt-0.5">加入 QQ 群与其他用户交流</p>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                  <svg class="w-5 h-5 text-gray-600 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">问题反馈</div>
                    <p class="text-sm text-gray-500 mt-0.5">报告 Bug 或提出建议</p>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                  <svg class="w-5 h-5 text-gray-600 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">功能诉求</div>
                    <p class="text-sm text-gray-500 mt-0.5">提出新功能需求</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Action Buttons + Activity Menu -->
        <div class="flex items-center gap-2">
          <!-- 活动菜单项 -->
          <button v-for="promo in menuPromotions" :key="promo.id" @click="showPromotionBanner(promo)"
            class="relative inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-colors bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600">
            {{ promo.name }}
            <span v-if="promo.menuBadge" class="ml-1">{{ promo.menuBadge }}</span>
          </button>

          <router-link to="/download"
            class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-900 transition-colors hover:bg-gray-50">
            前往下载
          </router-link>

          <router-link to="/documentation" @click="markDocsUpdateViewed"
            class="relative inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-gray-900 text-white transition-colors hover:bg-gray-800">
            阅读文档
            <span v-if="hasDocsUpdate"
              class="absolute -top-1 -right-1 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90 animate-pulse">
              NEW
            </span>
          </router-link>
        </div>
      </nav>

      <!-- Mobile Navbar -->
      <div class="flex lg:hidden items-center justify-between h-16">
        <router-link to="/" class="flex items-center gap-2">
          <img src="/logo.png" alt="Welight Logo" class="w-8 h-8 rounded-lg" />
          <span class="text-lg font-semibold">Welight</span>
        </router-link>

        <button @click="toggleMobileMenu"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="mobile-overlay">
      <div v-if="isMobileMenuOpen" @click="closeMobileMenu"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"></div>
    </transition>

    <!-- Mobile Menu Drawer -->
    <transition name="mobile-drawer">
      <div v-if="isMobileMenuOpen"
        class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
        <div class="p-6">
          <!-- Mobile Menu Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <img src="/logo.png" alt="Welight Logo" class="w-8 h-8 rounded-lg" />
              <span class="text-lg font-semibold">Welight</span>
            </div>
            <button @click="closeMobileMenu"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Mobile Menu Items -->
          <nav class="space-y-1">
            <router-link to="/" @click="closeMobileMenu"
              class="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
              首页
            </router-link>

            <router-link to="/pricing" @click="closeMobileMenu"
              class="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
              购买许可
            </router-link>

            <router-link to="/donation" @click="closeMobileMenu"
              class="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
              赞助支持
            </router-link>

            <button @click="showAnnouncements(); closeMobileMenu()"
              class="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-between">
              <span>公告</span>
              <div v-if="hasNewAnnouncements" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            <button @click="showChangelog(); closeMobileMenu()"
              class="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
              更新日志
            </button>

            <!-- 交流反馈，移动到最后 -->
            <div class="border-t border-gray-200 pt-4 mt-4">
              <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">交流反馈</div>
              <a href="https://qm.qq.com/q/nNA64h5d6K" target="_blank" @click="closeMobileMenu"
                class="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                交流讨论
              </a>
              <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file" target="_blank"
                @click="closeMobileMenu"
                class="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                问题反馈
              </a>
              <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file" target="_blank"
                @click="closeMobileMenu"
                class="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                功能诉求
              </a>
            </div>

            <!-- 活动菜单项 -->
            <button v-for="promo in menuPromotions" :key="promo.id"
              @click="showPromotionBanner(promo); closeMobileMenu()"
              class="w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-colors bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 flex items-center justify-between">
              <span>{{ promo.name }}</span>
              <span v-if="promo.menuBadge">{{ promo.menuBadge }}</span>
            </button>
          </nav>

          <!-- Mobile Action Buttons -->
          <div class="mt-6 space-y-3 border-t border-gray-200 pt-6">
            <router-link to="/download" @click="closeMobileMenu"
              class="block w-full text-center px-4 py-3 text-sm font-medium border border-gray-300 bg-white text-gray-900 rounded-xl transition-colors hover:bg-gray-50">
              前往下载
            </router-link>

            <router-link to="/documentation" @click="markDocsUpdateViewed(); closeMobileMenu()"
              class="relative block w-full text-center px-4 py-3 text-sm font-medium bg-gray-900 text-white rounded-xl transition-colors hover:bg-gray-800">
              阅读文档
              <span v-if="hasDocsUpdate"
                class="absolute -top-1 -right-1 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90 animate-pulse">
                NEW
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modals -->
    <ChangelogModal :isVisible="isChangelogVisible" @close="closeChangelog" />
    <AnnouncementModal :isVisible="isAnnouncementVisible" @close="closeAnnouncements" />
    <PromotionBanner v-model="isPromotionBannerVisible" :promotion="currentPromotion" @close="closePromotionBanner" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WireframeOverlay from '@/components/WireframeOverlay.vue'
import ChangelogModal from './ChangelogModal.vue'
import AnnouncementModal from './AnnouncementModal.vue'
import PromotionBanner from './PromotionBanner.vue'
import { hasNewAnnouncements as checkNewAnnouncements } from '@/data/announcements.js'
import { getMenuPromotions, markLatestPromotionAsViewed } from '@/data/promotions.js'
import { getLatestVersion } from '@/data/changelog.js'

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 更新日志模态框状态
const isChangelogVisible = ref(false)

// 公告模态框状态
const isAnnouncementVisible = ref(false)

// 是否有新公告
const hasNewAnnouncements = ref(false)

// 活动相关状态
const isPromotionBannerVisible = ref(false)
const currentPromotion = ref(null)
const menuPromotions = ref([])

// 文档更新提示
const hasDocsUpdate = ref(false)
const latestVersion = getLatestVersion()

// 标记文档已查看
const markDocsUpdateViewed = () => {
  localStorage.setItem('welight_docs_last_viewed_version', latestVersion.version)
  hasDocsUpdate.value = false
}

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
  if (currentPromotion.value) {
    markLatestPromotionAsViewed()
  }
  currentPromotion.value = null
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // 切换时控制 body 滚动
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
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

// 组件挂载
onMounted(() => {
  hasNewAnnouncements.value = checkNewAnnouncements()
  loadMenuPromotions()

  // 检查文档是否有更新
  const lastViewedDocs = localStorage.getItem('welight_docs_last_viewed_version')
  hasDocsUpdate.value = !lastViewedDocs || lastViewedDocs !== latestVersion.version
})

// 组件卸载
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Mobile Overlay Transitions */
.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

/* Mobile Drawer Transitions */
.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
  transition: transform 0.3s ease;
}

.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  transform: translateX(100%);
}
</style>
