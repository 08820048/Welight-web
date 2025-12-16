<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-white">
    <div class="w-full px-6 md:px-16">
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
              v4.1.6
            </span>
          </router-link>
        </div>

        <!-- Center: Desktop Menu (移除，统一到右侧文本菜单) -->
        <div class="hidden"></div>

        <!-- Right: 文本菜单 + 主题切换 -->
        <div class="flex items-center gap-6">
          <router-link to="/"
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            active-class="text-gray-900 dark:text-gray-100">
            首页
          </router-link>
          <router-link to="/pricing"
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            active-class="text-gray-900 dark:text-gray-100">
            定价
          </router-link>
          <router-link to="/donation"
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            active-class="text-gray-900 dark:text-gray-100">
            赞助
          </router-link>
          <router-link to="/download"
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            active-class="text-gray-900 dark:text-gray-100">
            下载
          </router-link>
          <router-link to="/documentation" @click="markDocsUpdateViewed"
            class="relative text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            active-class="text-gray-900 dark:text-gray-100">
            文档
          </router-link>
          <div class="relative group">
            <button
              class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center gap-1.5">
              交流反馈
              <svg class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="absolute top-full right-0 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg border border-white/30 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="py-2">
                <a href="https://qm.qq.com/q/nNA64h5d6K" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <span>交流讨论</span>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>问题反馈</span>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 transition-colors duration-200">
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
          <ToggleTheme class="ml-1" />
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
        class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden overflow-y-auto">
        <div class="p-6">
          <!-- Mobile Menu Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <img src="/logo.png" alt="Welight Logo" class="w-8 h-8 rounded-lg" />
              <span class="text-lg font-semibold">Welight</span>
            </div>
            <div class="flex items-center gap-2">
              <button @click="toggleTheme"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors dark:text-gray-600">
                <Sun v-if="themeStore.isDark" class="h-5 w-5" />
                <Moon v-else class="h-5 w-5" />
              </button>
              <button @click="closeMobileMenu"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Menu Items -->
          <nav class="space-y-1">
            <router-link to="/" @click="closeMobileMenu"
              class="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              首页
            </router-link>

            <router-link to="/pricing" @click="closeMobileMenu"
              class="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              定价
            </router-link>

            <router-link to="/donation" @click="closeMobileMenu"
              class="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              赞助
            </router-link>

            <button @click="showAnnouncements(); closeMobileMenu()"
              class="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between">
              <span>公告</span>
              <div v-if="hasNewAnnouncements" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            <button @click="showChangelog(); closeMobileMenu()"
              class="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
              更新日志
            </button>

            <!-- 微光学堂（暂时隐藏）
            <router-link to="/academy" @click="closeMobileMenu"
              class="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
              微光学堂
            </router-link>
            -->

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
            <a href="https://download.upgrade.toolsetlink.com/download?appKey=2fO2OcSAKXFQ9Gf7F3IooA&versionCode=4001005"
              target="_blank" @click="closeMobileMenu"
              class="block w-full text-center px-4 py-3 text-sm font-medium border border-gray-300 bg-white text-gray-900 rounded-xl transition-colors hover:bg-gray-50">
              前往下载
            </a>

            <router-link to="/documentation" @click="markDocsUpdateViewed(); closeMobileMenu()"
              class="relative block w-full text-center px-4 py-3 text-sm font-medium bg-gray-900 text-white rounded-xl transition-colors hover:bg-gray-800">
              文档
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import ChangelogModal from './ChangelogModal.vue'
import AnnouncementModal from './AnnouncementModal.vue'
import PromotionBanner from './PromotionBanner.vue'
import { hasNewAnnouncements as checkNewAnnouncements } from '@/data/announcements.js'
import { getMenuPromotions, markLatestPromotionAsViewed } from '@/data/promotions.js'
import { getLatestVersion } from '@/data/changelog.js'
import { useThemeStore } from '@/stores/theme'
import { Sun, Moon } from 'lucide-vue-next'
import ToggleTheme from '@/components/ui/ToggleTheme.vue'

const themeStore = useThemeStore()

// 切换主题（带 View Transition 动画）
const toggleTheme = async (event) => {
  const isDark = themeStore.isDark

  // 降级方案：不支持 View Transition API
  if (!document.startViewTransition) {
    themeStore.toggleTheme()
    return
  }

  // 获取点击位置
  const x = 0
  const y = 0
  const endRadius = Math.hypot(innerWidth, innerHeight)

  const transition = document.startViewTransition(async () => {
    themeStore.toggleTheme()
    await nextTick()
  })

  // 等待伪元素创建完成
  await transition.ready

  // 执行动画
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]
    },
    {
      duration: 1000,
      easing: 'ease-in-out',
      // 指定动画作用于新视图的伪元素
      pseudoElement: '::view-transition-new(root)'
    }
  )
}

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

const latestVersion = getLatestVersion()

// 标记文档已查看
const markDocsUpdateViewed = () => {
  localStorage.setItem('welight_docs_last_viewed_version', latestVersion.version)
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

  // 文档更新提示标识已移除
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
