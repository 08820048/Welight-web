<template>
  <header
    class="fixed top-0 left-0 right-0 z-50">
    <div class="w-full px-6 md:px-16">
      <!-- Desktop Navbar -->
      <nav class="hidden lg:flex items-center justify-between h-16">
        <router-link to="/" class="text-lg font-semibold">Welight</router-link>
        <a href="https://checkout.dodopayments.com/buy/pdt_0NfwDna4ZjtnAan2fCf7T?quantity=1&redirect_url=https://waer.ltd/success"
          class="inline-flex h-9 items-center rounded-lg bg-[#1B365D] px-4 text-sm font-semibold text-[#faf9f5] transition-colors hover:bg-[#142947] dark:bg-[#D0DCE9] dark:text-[#141413] dark:hover:bg-[#E4ECF5]">
          购买许可证
        </a>
      </nav>

      <!-- Mobile Navbar -->
      <nav class="flex lg:hidden items-center justify-between h-16">
        <router-link to="/" class="text-lg font-semibold">Welight</router-link>
        <a href="https://checkout.dodopayments.com/buy/pdt_0NfwDna4ZjtnAan2fCf7T?quantity=1&redirect_url=https://waer.ltd/success"
          class="inline-flex h-9 items-center rounded-lg bg-[#1B365D] px-4 text-sm font-semibold text-[#faf9f5] transition-colors hover:bg-[#142947] dark:bg-[#D0DCE9] dark:text-[#141413] dark:hover:bg-[#E4ECF5]">
          购买许可证
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ChangelogModal from './ChangelogModal.vue'
import AnnouncementModal from './AnnouncementModal.vue'
import DocumentationNoticeModal from './DocumentationNoticeModal.vue'
import PromotionBanner from './PromotionBanner.vue'
import { hasNewAnnouncements as checkNewAnnouncements } from '@/data/announcements.js'
import { getActivePromotionsFromBackend } from '@/services/campaignService.js'
import { getLatestVersion } from '@/data/changelog.js'
import { useThemeStore } from '@/stores/theme'
import {
  Sun,
  Moon,
  Megaphone,
  History,
  Download as DownloadIcon,
  Gift
} from 'lucide-vue-next'
import ToggleTheme from '@/components/ui/ToggleTheme.vue'

const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()

/**
 * 判断是否处于圣诞节期间
 * @param {Date} [date=new Date()] 传入日期，默认当前时间
 * @returns {boolean} 是否在 12 月 20-27 日之间
 */
function isInChristmasSeason(date = new Date()) {
  const month = date.getMonth() // 0-11
  const day = date.getDate()
  return month === 11 && day >= 20 && day <= 27
}

const isChristmasSeason = computed(() => isInChristmasSeason())

// 切换主题（带 View Transition 动画）
const toggleTheme = async (event) => {
  const isDark = themeStore.isDark

  // 降级方案：不支持 View Transition API
  if (!document.startViewTransition) {
    themeStore.toggleTheme()
    return
  }

  // 获取动画起点：右上角
  const x = innerWidth
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
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
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
const isDocumentationNoticeVisible = ref(false)
const shouldCloseDocumentationMobileMenu = ref(false)

// 活动相关状态
const isPromotionBannerVisible = ref(false)
const currentPromotion = ref(null)
const menuPromotions = ref([])

const latestVersion = getLatestVersion()
const anchorLinks = [
  { href: '/#features', label: '功能' },
  { href: '/#workflow', label: '工作流' },
  { href: '/#ai', label: 'AI 创作' },
  { href: '/#pricing', label: '定价' },
  { href: '/#faq', label: 'FAQ' }
]

// 标记文档已查看
const markDocsUpdateViewed = () => {
  localStorage.setItem('welight_docs_last_viewed_version', latestVersion.version)
}

const openDocumentationWithNotice = (shouldCloseMobileMenu = false) => {
  if (route.path === '/documentation' || route.name === 'documentation') {
    markDocsUpdateViewed()
    if (shouldCloseMobileMenu) {
      closeMobileMenu()
    }
    window.location.reload()
    return
  }

  shouldCloseDocumentationMobileMenu.value = shouldCloseMobileMenu
  isDocumentationNoticeVisible.value = true
}

const closeDocumentationNotice = () => {
  isDocumentationNoticeVisible.value = false
  shouldCloseDocumentationMobileMenu.value = false
}

const confirmDocumentationNotice = () => {
  markDocsUpdateViewed()

  if (shouldCloseDocumentationMobileMenu.value) {
    closeMobileMenu()
  }

  isDocumentationNoticeVisible.value = false
  shouldCloseDocumentationMobileMenu.value = false
  router.push('/documentation')
}

// 获取菜单中的活动
const loadMenuPromotions = async () => {
  try {
    const promos = await getActivePromotionsFromBackend()
    menuPromotions.value = (promos || []).filter(p => p.showInMenu)
  } catch {
    menuPromotions.value = []
  }
}

// 显示活动条幅
const showPromotionBanner = (promotion) => {
  currentPromotion.value = promotion
  isPromotionBannerVisible.value = true
}

// 关闭活动条幅
const closePromotionBanner = () => {
  isPromotionBannerVisible.value = false
  try {
    const id = currentPromotion.value?.id || ''
    if (id) {
      localStorage.setItem('welight_last_viewed_promotion', id)
    }
  } catch {
    // ignore
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
