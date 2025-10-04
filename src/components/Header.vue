<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100/60 transition-all duration-300"
    :class="{ 'shadow-sm': isScrolled }"
  >
    <div class="container-custom">
      <div class="flex gap-4 md:py-4 py-3 items-center justify-between w-full">
        <!-- Logo 和品牌信息 -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 flex ring-1 ring-primary-100 bg-primary-50 bg-cover rounded-lg items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105"
          >
            <img src="/logo.png" alt="Welight Logo" class="w-full h-full object-cover" />
          </div>
          <div class="hidden sm:block">
            <div class="text-lg font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              Welight
              <sup class="text-xs text-slate-500 font-normal">v3.0.1</sup>
            </div>
            <div class="text-xs text-slate-500">智能高效的公众号编辑器</div>
          </div>
        </router-link>

        <!-- 导航菜单 - 桌面端 -->
        <nav class="hidden lg:flex items-center gap-6 text-sm text-slate-600">
          <router-link
            to="/"
            class="hover:text-slate-900 transition-colors font-medium"
            active-class="text-primary-600"
          >
            首页
          </router-link>
          <router-link
            to="/features"
            class="hover:text-slate-900 transition-colors font-medium"
            active-class="text-primary-600"
          >
            功能特性
          </router-link>
          <router-link
            to="/pricing"
            class="hover:text-slate-900 transition-colors font-medium relative"
            active-class="text-primary-600"
          >
            定价
            <span
              class="absolute -top-2 -right-3 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90"
            >
              庆
            </span>
          </router-link>
          <router-link
            to="/download"
            class="hover:text-slate-900 transition-colors font-medium"
            active-class="text-primary-600"
          >
            下载
          </router-link>
          <a
            href="https://docs.waer.ltd/"
            target="_blank"
            class="hover:text-slate-900 transition-colors font-medium flex items-center gap-1 relative"
          >
            文档
            <span
              class="text-white text-xs px-1.5 py-0.5 rounded-full font-medium bg-orange-500 scale-75"
            >
              完善中
            </span>
            <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </nav>

        <!-- 右侧按钮组 -->
        <div class="flex items-center gap-3">
          <!-- 公告按钮 -->
          <button
            @click="showAnnouncements"
            class="relative inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm text-slate-700 shadow-sm hover:bg-gray-50 transition-all duration-200"
            title="查看公告"
          >
            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <span class="hidden md:inline">公告</span>
            <div
              v-if="hasNewAnnouncements"
              class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"
            ></div>
          </button>

          <!-- 更新日志按钮 -->
          <button
            @click="showChangelog"
            class="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm text-slate-700 shadow-sm hover:bg-gray-50 transition-all duration-200"
            title="更新日志"
          >
            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="hidden lg:inline">更新日志</span>
          </button>

          <!-- 赞助按钮 -->
          <router-link
            to="/donation"
            class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-sm hover:shadow-md relative"
            title="赞助支持"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>赞助</span>
            <div
              v-if="donationCount > 0"
              class="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center shadow-sm"
            >
              +{{ donationCount }}
            </div>
          </router-link>

          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm text-slate-700 shadow-sm hover:bg-gray-50 transition"
            aria-label="菜单"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md"
      >
        <nav class="container-custom py-4 space-y-2">
          <router-link
            to="/"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            首页
          </router-link>
          <router-link
            to="/features"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            功能特性
          </router-link>
          <router-link
            to="/pricing"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            定价
          </router-link>
          <router-link
            to="/download"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            下载
          </router-link>
          <router-link
            to="/monthly-cards"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            月卡管理
          </router-link>
          <a
            href="https://docs.waer.ltd/"
            target="_blank"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            文档
          </a>
          <router-link
            to="/donation"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors font-medium"
          >
            ❤️ 赞助支持
          </router-link>
        </nav>
      </div>
    </transition>

    <!-- 更新日志模态框 -->
    <ChangelogModal :isVisible="isChangelogVisible" @close="closeChangelog" />

    <!-- 公告模态框 -->
    <AnnouncementModal :isVisible="isAnnouncementVisible" @close="closeAnnouncements" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ChangelogModal from './ChangelogModal.vue'
import AnnouncementModal from './AnnouncementModal.vue'
import {
  hasNewAnnouncements as checkNewAnnouncements,
  markLatestAnnouncementAsViewed
} from '@/data/announcements.js'
import { donations } from '@/data/donations.js'

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

  // 如果有新公告，延迟弹出
  if (hasNewAnnouncements.value) {
    setTimeout(() => {
      isAnnouncementVisible.value = true
    }, 1000)
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
</style>

