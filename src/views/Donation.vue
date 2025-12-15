<template>
  <div class="relative min-h-screen bg-white dark:bg-gray-900">
    <div class="min-h-screen text-gray-200 pt-20 relative" style="position: relative; z-index: 1;">
      <div class="container-custom pb-16">
        <!-- 赞助支持 Welight（标题 + 描述 + 福利卡片，作为一个整体内容模块） -->
        <section class="relative mb-16 py-12 md:py-16 scroll-animate animate-fade-in-up delay-100">
          <div class="relative max-w-3xl mx-auto px-4 md:px-8">
            <div class="text-center mb-12">
              <AnimatedUnderlineText text="赞助支持 Welight" text-className="text-4xl md:text-5xl font-bold text-gray-900"
                underline-className="text-gray-900" />
              <MagicText text="感谢每一位支持 Welight 的你，您的赞助将用于支持软件的持续开发、服务器维护、功能优化和技术支持，让更多用户受益于优质的软件体验。"
                container-className="mt-6 justify-center max-w-3xl mx-auto" word-className="text-lg text-gray-600" />
            </div>

            <!-- 赞助者福利（黑白卡片风格） -->
            <div
              class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-soft-lg">
              <div class="flex items-center justify-center space-x-3 mb-3">
                <svg class="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7">
                  </path>
                </svg>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  赞助者福利
                </h3>
              </div>
              <p class="text-center text-lg text-gray-700 dark:text-gray-300">
                每位赞助者每月可获得 <span class="text-2xl font-bold text-gray-900 dark:text-white">500 积分</span> 奖励
              </p>
              <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                积分可用于 AI 功能消费和图片存储服务
              </p>
            </div>
          </div>
        </section>

        <!-- 致谢名单 -->
        <section class="relative mb-16 py-12 md:py-16 scroll-animate animate-fade-in-up delay-300">
          <div class="relative max-w-5xl mx-auto px-4 md:px-8">
            <div class="text-center mb-8">
              <AnimatedUnderlineText text="致谢名单"
                text-className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                underline-className="text-gray-900 dark:text-white" />
              <MagicText text="每一份赞助我们都会认真记录，并向您致以诚挚感谢。" container-className="mt-4 justify-center max-w-2xl mx-auto"
                word-className="text-sm md:text-base text-gray-500 dark:text-gray-400" />
            </div>

            <div
              class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flat-card">
              <div class="relative w-full overflow-auto">
                <table class="w-full caption-bottom text-sm">
                  <thead
                    class="text-xs text-gray-700 dark:text-gray-100 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr
                      class="border-b border-gray-200 dark:border-gray-700 [&>th:not(:last-child)]:border-r [&>th]:border-gray-200 dark:[&>th]:border-gray-700">
                      <th
                        class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        赞助者
                      </th>
                      <th
                        class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        金额
                      </th>
                      <th
                        class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        时间
                      </th>
                      <th
                        class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        渠道
                      </th>
                      <th
                        class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        留言
                      </th>
                      <th
                        class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        标识
                      </th>
                    </tr>
                  </thead>
                  <tbody class="[&_tr:last-child]:border-0">
                    <tr v-for="donation in allDonations" :key="donation.id"
                      class="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 [&>td:not(:last-child)]:border-r [&>td]:border-gray-200 dark:[&>td]:border-gray-700"
                      :class="{ 'bg-gray-50 dark:bg-gray-800/40': donation.isSpecial }">
                      <td class="px-6 py-4 whitespace-nowrap dark:bg-gray-800/40 dark:text-gray-100">
                        <div class="flex items-center">
                          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {{ donation.donorName }}
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap dark:bg-gray-800/30">
                        <div class="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {{ formatAmount(donation.amount) }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap dark:bg-gray-800/30">
                        <div class="text-sm text-gray-600 dark:text-gray-300">
                          {{ formatDate(donation.date) }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap dark:bg-gray-800/30">
                        <div class="text-sm text-gray-600 dark:text-gray-300">
                          {{ donation.channel }}
                        </div>
                      </td>
                      <td class="px-6 py-4 dark:bg-gray-800/30">
                        <div class="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate"
                          :title="donation.message">
                          {{ donation.message || '-' }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap dark:bg-gray-800/30">
                        <span v-if="donation.isSpecial"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">
                          {{ donation.specialTag }}
                        </span>
                        <span v-else class="text-gray-400 dark:text-gray-500">-</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- 特别赞助展示（黑白卡片风格） -->
        <section v-if="specialDonations.length > 0"
          class="relative mb-12 py-12 md:py-16 scroll-animate animate-fade-in-up delay-400">

          <div class="relative max-w-5xl mx-auto px-4 md:px-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              特别赞助
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="donation in specialDonations" :key="donation.id"
                class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flat-card">
                <div class="flex items-center justify-between mb-4">
                  <span
                    class="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {{ donation.specialTag }}
                  </span>
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ formatAmount(donation.amount) }}
                  </span>
                </div>
                <div class="space-y-2">
                  <div class="text-gray-700 dark:text-gray-300">
                    <span class="font-medium">赞助者：</span>{{ donation.donorName }}
                  </div>
                  <div class="text-gray-600 dark:text-gray-400 text-sm">
                    <span class="font-medium">时间：</span>{{ formatDate(donation.donationDate) }}
                  </div>
                  <div class="text-gray-600 dark:text-gray-400 text-sm">
                    <span class="font-medium">渠道：</span>{{ donation.channel }}
                  </div>
                  <div v-if="donation.message"
                    class="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div class="text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">留言：</div>
                    <div class="text-gray-800 dark:text-gray-200">{{ donation.message }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 感谢信息 -->
        <!-- 固定背景致谢文字 -->
        <div class="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div class="background-text text-6xl font-bold text-center leading-relaxed opacity-5 text-gray-900/5">
            你的每一份赞助都意义非凡！
          </div>
        </div>


      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getAllDonations, getSpecialDonations, formatAmount, formatDate } from '@/data/donations.js'
import AnimatedUnderlineText from '@/components/ui/AnimatedUnderlineText.vue'
import MagicText from '@/components/ui/MagicText.vue'
import { useSEO, seoConfigs } from '@/composables/useSEO'

// SEO配置
useSEO(seoConfigs.donation)

/**
 * 响应式数据
 */
const allDonations = ref([])
const specialDonations = ref([])














/**
 * 初始化数据
 */
function initData() {
  // 获取所有赞助数据
  const donations = getAllDonations()
  allDonations.value = donations.map(donation => ({
    ...donation,
    date: donation.donationDate // 映射日期字段
  }))

  specialDonations.value = getSpecialDonations()
}

// 防抖函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 缓存DOM元素，避免重复查询
let scrollElements = []

/**
 * 滚动动画处理（优化版本）
 */
function handleScrollAnimation() {
  // 使用缓存的元素列表
  scrollElements.forEach(element => {
    // 检查元素是否已经动画过
    if (element.classList.contains('animate-in-view')) {
      return
    }

    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

    if (isVisible) {
      element.classList.add('animate-in-view')
    }
  })
}

// 创建防抖版本的滚动处理函数
const debouncedScrollHandler = debounce(handleScrollAnimation, 16) // 约60fps

/**
 * 组件挂载时初始化数据和动画
 */
onMounted(() => {
  initData()

  // 缓存滚动动画元素
  setTimeout(() => {
    scrollElements = Array.from(document.querySelectorAll('.scroll-animate'))
    handleScrollAnimation()
  }, 100)

  // 监听滚动事件（使用防抖版本）
  window.addEventListener('scroll', debouncedScrollHandler, { passive: true })
})

/**
 * 组件卸载时清理事件监听
 */
onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScrollHandler)
  scrollElements = []
})
</script>

<style scoped>
/* 自定义样式 */
.container {
  max-width: 1200px;
}

/* 表格响应式优化 */
@media (max-width: 768px) {
  .overflow-x-auto {
    font-size: 0.875rem;
  }

  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}

/* 渐变动画（优化版本） */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 15s ease-in-out infinite;
  will-change: background-position;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* 扁平化卡片样式（优化版本） */
.flat-card {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.2s ease;
  will-change: transform;
}

.flat-card:hover {
  transform: translateY(-1px) translateZ(0);
  border-color: rgba(59, 130, 246, 0.5);
}

/* 数字字体样式 */
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}

/* 固定背景文字样式 */
.background-text {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(102, 126, 234, 0.1);
}
</style>
