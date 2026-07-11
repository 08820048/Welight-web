<template>
  <div class="relative min-h-screen bg-white dark:bg-gray-900">
    <div class="min-h-screen text-gray-800 dark:text-gray-200 relative overflow-hidden"
      style="position: relative; z-index: 1">
      <!-- Hero Section -->
      <section class="relative z-10 overflow-hidden pt-24 pb-24">
        <video class="hero-video-background" autoplay muted loop playsinline preload="metadata"
          aria-hidden="true">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_133010_cb9c806d-bc9d-47f1-ac4c-b1759134ec8b.mp4"
            type="video/mp4" />
        </video>
        <div class="hero-video-overlay" aria-hidden="true"></div>

        <div class="relative z-10 mx-auto max-w-5xl px-6">
          <div class="mx-auto">
            <!-- Animated content group -->
            <div class="space-y-8">
              <!-- Main heading -->
              <div class="mt-12 lg:mt-20 transition-all duration-[1500ms] ease-out" :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 blur-[12px]'
                ">
                <AnimatedUnderlineText text="好看的排版，从来简约。" :level="1"
                  text-className="hero-title text-5xl font-semibold md:text-6xl text-gray-950 dark:text-gray-100 whitespace-nowrap font-longcang"
                  underline-className="hero-title text-gray-950 dark:text-gray-100" />
              </div>

              <!-- Description -->
              <!-- <div v-motion :initial="{ opacity: 0, filter: 'blur(12px)', y: 12 }"
                :visible="{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.5, delay: 0.85 } }"
                class="mt-8">
                <MagicText text="专为微信公众号创作者打造的智能排版应用，拥有更优性能、更快捷的操作体验。" container-className="max-w-2xl justify-center"
                  word-className="text-lg text-gray-600" />
              </div> -->

              <!-- Download CTA Row -->
              <div class="mt-16 w-full flex items-center justify-center gap-3 transition-all duration-[1500ms] ease-out"
                :class="ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 blur-[12px]'
                  ">
                <!-- macOS button (black pill) -->
                <button
                  class="hero-cta inline-flex items-center px-5 py-2.5 rounded-full bg-black text-white hover:bg-gray-900 transition-colors shadow-[0_12px_28px_rgba(0,0,0,0.24)] ring-1 ring-black/10"
                  @click="downloadFile('macos-apple')">
                  <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  下载 macOS 版
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <!-- Windows button (white pill) -->
                <button
                  class="hero-cta inline-flex items-center px-5 py-2.5 rounded-full bg-white/95 text-gray-950 border border-black/15 hover:bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 transition-colors shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
                  @click="downloadFile('windows-installer')">
                  <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z" />
                  </svg>
                  下载 Windows 版
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

              </div>

            </div>
          </div>
        </div>

        <!-- Product Preview -->
        <div class="relative z-10 mt-2 px-2 sm:mt-4 md:mt-8 transition-all duration-[1500ms] ease-out" :class="videoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 blur-[12px]'
          ">
          <img src="/assert/hero.png" alt="Welight 预览"
            class="mx-auto block h-auto w-full max-w-5xl" loading="eager" decoding="async"
            fetchpriority="high" width="1200" height="675" />
        </div>
      </section>

      <!-- Themes Section -->
      <section class="relative py-32 content-auto">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="mb-20 scroll-animate">
            <AnimatedUnderlineText text="丰富多样的排版主题"
              text-className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 font-longcang"
              underline-className="text-gray-900 dark:text-gray-100" />
            <MagicText text="精心设计的多种主题风格，让你的推文呈现更加专业和美观的视觉效果" container-className="mt-6 justify-center"
              word-className="text-xl text-gray-500" />
          </div>

          <!-- Themes showcase - Testimonials Column style -->
          <div class="scroll-animate">
            <ThemeTestimonials />
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="relative py-32 content-auto">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="mb-20 scroll-animate">
            <AnimatedUnderlineText text="快捷高效的编辑体验"
              text-className="text-4xl md:text-5xl font-bold text-gray-900 font-longcang"
              underline-className="text-gray-900" />
            <MagicText text="从划词工具栏到智能排版，每一个功能都经过精心设计" container-className="mt-6 justify-center"
              word-className="text-xl text-gray-500" />
          </div>

          <!-- Features Display Cards -->
          <div class="grid md:grid-cols-2 gap-16 lg:gap-24">
            <!-- First Group -->
            <div class="scroll-animate flex justify-center">
              <DisplayCards :cards="featuresGroup1" />
            </div>

            <!-- Second Group -->
            <div class="scroll-animate flex justify-center">
              <DisplayCards :cards="featuresGroup2" />
            </div>
          </div>
        </div>
      </section>

      <!-- AI Integration Section -->
      <section class="relative py-32 content-auto">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="mb-20 scroll-animate">
            <AnimatedUnderlineText text="一站式智能体验"
              text-className="text-4xl md:text-5xl font-bold text-gray-900 font-longcang"
              underline-className="text-gray-900" />
            <MagicText text="集成多个主流 AI 模型，为你的写作提供智能辅助" container-className="mt-6 justify-center max-w-2xl mx-auto"
              word-className="text-lg md:text-xl text-gray-600" />
          </div>

          <!-- AI Models Glass Logo Carousel -->
          <div class="relative mb-16 scroll-animate" style="transition-delay: 0.15s">
            <LogoCarousel :logos="aiModelLogos" :column-count="aiModelLogos.length" />
          </div>

          <!-- AI Features showcase -->
          <div class="grid lg:grid-cols-2 gap-16 items-start">
            <!-- Left side - AI Tools Features -->
            <div class="order-2 lg:order-1 scroll-animate">
              <VerticalDisplayCards :features="aiLeftFeatures" />
            </div>

            <!-- Right side - AI Writing Features -->
            <div class="order-1 lg:order-2 scroll-animate">
              <VerticalDisplayCards :features="aiRightFeatures" />
            </div>
          </div>
        </div>
      </section>

      <!-- Secure Publish Support Section -->
      <section class="relative py-32 content-auto">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="mb-20 scroll-animate">
            <AnimatedUnderlineText text="安全便捷的发布支持"
              text-className="text-4xl md:text-5xl font-bold text-gray-900 font-longcang"
              underline-className="text-gray-900" />
            <MagicText text="支持应用内将排版后的文章一键发布到公众号草稿，服务号支持一键发布草稿，免去手动复制粘贴的繁琐。"
              container-className="mt-6 justify-center max-w-2xl mx-auto"
              word-className="text-lg md:text-xl text-gray-600" />
          </div>

          <div class="grid lg:grid-cols-2 gap-16 items-stretch">
            <!-- Left: Description -->
            <div class="order-2 lg:order-1 scroll-animate h-full">
              <div class="flex flex-col h-full gap-6">
                <!-- Top: tjydexp preview -->
                <div class="flex-1 min-h-[240px] lg:min-h-[280px]">
                  <div
                    class="relative w-full h-full max-w-3xl mx-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm p-2 shadow-xl transition-all duration-500 hover:shadow-2xl">
                    <div
                      class="relative h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-100 dark:bg-gray-800">
                      <img src="/assert/tjydexp.webp" alt="推荐阅读扩展预览" class="w-full h-full object-contain"
                        loading="lazy" decoding="async" />
                    </div>
                  </div>
                </div>

                <!-- Middle: description text -->
                <MagicText text="文末[推荐阅读]板块一键插入，文章标题自动读取、支持多模板配置。" container-className="justify-start max-w-2xl"
                  word-className="text-lg md:text-xl text-gray-600" />

                <!-- Bottom: tjyd preview -->
                <div class="flex-1 min-h-[240px] lg:min-h-[280px]">
                  <div
                    class="relative w-full h-full max-w-3xl mx-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm p-2 shadow-xl transition-all duration-500 hover:shadow-2xl">
                    <div
                      class="relative h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-100 dark:bg-gray-800">
                      <img src="/assert/tjyd.webp" alt="推荐阅读预览" class="w-full h-full object-contain" loading="lazy"
                        decoding="async" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Preview Image -->
            <div class="order-1 lg:order-2 scroll-animate h-full">
              <div
                class="relative w-full h-full max-w-3xl mx-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm p-2 shadow-xl transition-all duration-500 hover:shadow-2xl">
                <div
                  class="relative h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-100 dark:bg-gray-800">
                  <img src="/assert/fbcg.webp" alt="发布支持预览" class="w-full h-full object-contain" loading="lazy"
                    decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Markdown Support Section -->
      <section class="relative min-h-screen py-20 content-auto">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="text-center mb-16 scroll-animate" style="transition-delay: 0.1s">
            <AnimatedUnderlineText text="是排版工具，也是强大的Markdown编辑器"
              text-className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 font-longcang"
              underline-className="text-gray-900 dark:text-gray-100" />
            <MagicText text="全面支持标准Markdown语法及扩展功能，让你的文档编写更加高效和专业"
              container-className="mt-6 justify-center max-w-3xl mx-auto"
              word-className="text-lg md:text-xl text-gray-600 dark:text-gray-300" />
          </div>

          <!-- Markdown features grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <!-- Basic Syntax -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.4s">
              <MarkdownFeatureCard :icon="FileText" title="基础语法" :features="[
                '标题 (H1-H6)',
                '粗体、斜体、删除线',
                '有序、无序列表',
                '链接和图片',
                '引用块'
              ]" />
            </div>

            <!-- Code Support -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.5s">
              <MarkdownFeatureCard :icon="Code" title="代码支持" :features="['行内代码', '代码块', '语法高亮', '多语言支持', '代码行号']" />
            </div>

            <!-- Tables -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.6s">
              <MarkdownFeatureCard :icon="Table" title="表格功能" :features="[
                '标准表格语法',
                '列对齐控制',
                '表格样式美化',
                '可视化编辑',
                '导入导出支持'
              ]" />
            </div>

            <!-- Math & Formulas -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.7s">
              <MarkdownFeatureCard :icon="Calculator" title="数学公式"
                :features="['LaTeX 数学公式', '行内公式', '块级公式', '公式编号', '实时预览']" />
            </div>

            <!-- Extended Features -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.8s">
              <MarkdownFeatureCard :icon="Puzzle" title="扩展功能" :features="['任务列表', '脚注支持', '定义列表', '缩略语', '高亮标记']" />
            </div>

            <!-- Diagrams -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.9s">
              <MarkdownFeatureCard :icon="BarChart" title="图表支持"
                :features="['Mermaid 图表', '流程图', '时序图', '甘特图', '思维导图']" />
            </div>
          </div>

          <!-- AI Agent 智能创作 -->
          <section class="mt-28 scroll-animate" aria-labelledby="ai-agent-title">
            <div class="mx-auto max-w-5xl">
              <div class="text-center">
                <AnimatedUnderlineText text="AI Agent智能创作" :level="2"
                  text-className="text-3xl md:text-4xl font-bold text-gray-900 font-longcang"
                  underline-className="text-gray-900" />
                <MagicText text="从一个想法开始，让 Agent 协助你完成一篇文章的创作与发布准备"
                  container-className="mt-6 justify-center"
                  word-className="text-base md:text-lg text-gray-600" />
              </div>

              <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <article v-for="(step, index) in [
                  { icon: Sparkles, number: '01', title: '明确选题', description: '梳理创作目标，提炼文章主题与受众。' },
                  { icon: FileText, number: '02', title: '整理资料', description: '聚合参考内容，保留上下文与关键依据。' },
                  { icon: Wand2, number: '03', title: 'Agent 起草', description: '根据你的要求生成结构、段落与可编辑草稿。' },
                  { icon: Copy, number: '04', title: '排版交付', description: '预览、调整并复制，完成发布前的最后整理。' }
                ]" :key="step.number"
                  class="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-400 hover:shadow-md">
                  <div class="flex items-center justify-between">
                    <component :is="step.icon" class="h-6 w-6 text-gray-900" aria-hidden="true" />
                    <span class="font-mono text-xs tracking-[0.18em] text-gray-400">{{ step.number }}</span>
                  </div>
                  <h3 class="mt-8 text-lg font-bold text-gray-900">{{ step.title }}</h3>
                  <p class="mt-3 text-sm leading-6 text-gray-600">{{ step.description }}</p>
                </article>
              </div>

              <div class="mt-8 text-center">
                <p class="text-sm leading-7 text-gray-700 md:text-base">
                  你手动能做的，Agent 都可以帮你完成，包括检查和配置所有相关设置信息等。
                </p>
              </div>
            </div>
          </section>

          <!-- Pricing Section -->
          <section id="pricing" class="relative scroll-mt-24 py-24 md:py-32 content-auto" aria-labelledby="pricing-title">
            <div class="mx-auto max-w-5xl">
              <div class="text-center">
                <AnimatedUnderlineText text="Welight 授权" :level="2"
                  text-className="text-3xl md:text-4xl font-bold text-gray-900 font-longcang"
                  underline-className="text-gray-900" />
                <MagicText text="一次购买，终身授权"
                  container-className="mt-6 justify-center"
                  word-className="text-base md:text-lg text-gray-600" />
              </div>

              <div class="mt-12 grid overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.07)] md:grid-cols-[1.1fr_0.9fr]">
                <div class="p-8 md:p-12">
                  <p id="pricing-title" class="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">License</p>
                  <div class="mt-5 flex items-baseline gap-2 text-gray-950">
                    <span class="text-6xl font-semibold tracking-[-0.06em] md:text-7xl">59</span>
                    <span class="text-xl font-medium text-gray-500">元</span>
                  </div>
                  <p class="mt-5 max-w-md text-sm leading-7 text-gray-600 md:text-base">
                    支持银行卡、Apple Pay、微信等支付方式
                  </p>
                  <button type="button" @click="goToCheckout"
                    class="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-gray-950 px-7 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:bg-gray-800 active:scale-[0.96]">
                    立即购买
                    <span class="ml-2" aria-hidden="true">↗</span>
                  </button>
                </div>

                <div class="border-t border-gray-200 bg-gray-50/70 p-8 md:border-l md:border-t-0 md:p-12">
                  <p class="text-sm font-semibold text-gray-900">包含内容</p>
                  <ul class="mt-6 space-y-4 text-sm leading-6 text-gray-600">
                    <li v-for="item in ['终身更新', '3 台设备激活', '全部主题使用', 'Obsidian 插件支持（开发中）', '自动拥有后续所有新增权益']" :key="item" class="flex items-start gap-3">
                      <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" aria-hidden="true"></span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Markdown advantages -->
          <div class="mt-32 text-center scroll-animate" style="transition-delay: 1s">
            <div class="max-w-4xl mx-auto">
              <AnimatedUnderlineText text="为什么选择Welight？"
                text-className="text-2xl md:text-3xl font-bold text-gray-900 font-longcang"
                underline-className="text-gray-900" />

              <div class="grid md:grid-cols-3 gap-8 mt-12">
                <!-- Advantage 1 -->
                <div class="scroll-animate fade-up text-center" style="transition-delay: 1.1s">
                  <h4 class="text-xl font-bold text-gray-900 mb-3 font-longcang">简单高效</h4>
                  <MagicText text="轻量级编辑器，学习成本低，书写效率高，专注内容创作" container-className="justify-center"
                    word-className="text-base text-gray-600" />
                </div>

                <!-- Advantage 2 -->
                <div class="scroll-animate fade-up text-center" style="transition-delay: 1.2s">
                  <h4 class="text-xl font-bold text-gray-900 mb-3 font-longcang">极简审美</h4>
                  <MagicText text="回归创作 初衷，所见即所得，拒绝花里胡哨的图案堆叠。" container-className="justify-center"
                    word-className="text-base text-gray-600" />
                </div>

                <!-- Advantage 3 -->
                <div class="scroll-animate fade-up text-center" style="transition-delay: 1.3s">
                  <h4 class="text-xl font-bold text-gray-900 mb-3 font-longcang">一杯星巴克</h4>
                  <MagicText text="为了斗争那些动辄上千的同类产品，我们收取的仅仅是软件本身的构建费用！" container-className="justify-center"
                    word-className="text-base text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom text -->
          <div class="text-center mt-16 scroll-animate" style="transition-delay: 1.4s">
            <MagicText text="让Welight成为你高效写作的得力助手" container-className="justify-center"
              word-className="text-xl md:text-2xl font-medium text-gray-600" />
          </div>
        </div>
      </section>
    </div>

    <!-- 底部右上角购买通知滚动 -->
    <!-- <PurchaseNotificationTicker /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { buildDodoCheckoutUrl, storePendingDodoCheckout } from '@/services/dodoPaymentsService.js'
import { useSEO, seoConfigs } from '@/composables/useSEO'
import ThemeTestimonials from '@/components/ThemeTestimonials.vue'
import DisplayCards from '@/components/DisplayCards.vue'
import ImageDisplayCard from '@/components/ImageDisplayCard.vue'
import DualImageDisplayCard from '@/components/DualImageDisplayCard.vue'
import MarkdownFeatureCard from '@/components/MarkdownFeatureCard.vue'
import VerticalDisplayCards from '@/components/VerticalDisplayCards.vue'
import AnimatedUnderlineText from '@/components/ui/AnimatedUnderlineText.vue'
import MagicText from '@/components/ui/MagicText.vue'
// import PurchaseNotificationTicker from '@/components/PurchaseNotificationTicker.vue'
import LogoCarousel from '@/components/LogoCarousel.vue'
import {
  Wand2,
  Command,
  Copy,
  BarChart3,
  Palette,
  Sparkles,
  FileText,
  Code,
  Table,
  Calculator,
  Puzzle,
  BarChart
} from 'lucide-vue-next'

// SEO配置
useSEO(seoConfigs.home)

// 首屏淡入动画状态
const heroVisible = ref(true)
const ctaVisible = ref(true)
const videoVisible = ref(true)

function goToCheckout() {
  storePendingDodoCheckout({
    productCode: 'WELIGHT_DODO_LICENSE',
    productName: 'Welight 标准授权',
    source: 'home-pricing'
  })
  window.location.href = buildDodoCheckoutUrl({ quantity: 1 })
}

function downloadFile(platform) {
  const downloadUrls = {
    'macos-apple': 'https://releases.waer.ltd/Welight_5.0.2_aarch64.dmg?v=5.0.2',
    'windows-installer': 'https://releases.waer.ltd/Welight_5.0.2_x64-setup.exe?v=5.0.2'
  }

  const downloadUrl = downloadUrls[platform]
  if (downloadUrl) {
    window.location.href = downloadUrl
  }
}

/** 显示首屏标题淡入 */
function revealHero() {
  heroVisible.value = true
}

/** 显示CTA区域淡入 */
function revealCta() {
  ctaVisible.value = true
}

/** 显示产品预览淡入 */
function revealVideo() {
  videoVisible.value = true
}

// Features Display Cards Data
const featuresGroup1 = [
  {
    icon: Wand2,
    title: '划词工具栏',
    description: '选中文本即可显示划词工具栏，快速应用格式、预设的 AI 快捷功能',
    titleClassName: 'text-gray-900'
  },
  {
    icon: Command,
    title: 'AI快捷文生图',
    description: '集成阿里千文系统、快手kolors文生图模型,一句话即可参加自己的佳作',
    titleClassName: 'text-gray-900'
  },
  {
    icon: Copy,
    title: '预览一键复制',
    description: '满意的排版风格一键复制，粘贴微信编辑器即可发布，所见即所得',
    titleClassName: 'text-gray-900'
  }
]

const featuresGroup2 = [
  {
    icon: BarChart3,
    title: '智能图表转换',
    description: '采用 ChartJs 图表渲染集成，图表格式自动转码，数据转表弹指可得',
    titleClassName: 'text-gray-900'
  },
  {
    icon: Palette,
    title: '丰富主题样式',
    description: '精心设计的多种主题风格，让你的推文呈现更加专业和美观的视觉效果',
    titleClassName: 'text-gray-900'
  },
  {
    icon: Sparkles,
    title: 'AI 智能助手',
    description: '集成多个主流 AI 模型，为你的写作提供智能辅助，让创作更加高效',
    titleClassName: 'text-gray-900'
  }
]

// AI Features Data - Left side
const aiLeftFeatures = [
  {
    title: '转微信外链',
    description: '根据引用的链接自动生成微信外链引用'
  },
  {
    title: 'AI 图表',
    description: '智能分析提供的文本数据，转为合适的 Mermaid 图表'
  },
  {
    title: 'AI 创作',
    description: '结合 10 余种实时新闻资讯，掌握创作热点，一键快速完成文章创作'
  },
  {
    title: '图库系统',
    description: '集成各大图片平台，超上万张图片资源免费使用，内置图床一键上传复用'
  }
]

// AI Models logos for glass carousel
const aiModelLogos = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    src: '/llm/deepseek-color.svg'
  },
  {
    id: 'zhipu',
    name: '智谱',
    src: '/llm/zhipu-color.svg'
  },
  {
    id: 'qwen',
    name: 'Qwen',
    src: '/llm/qwen-color.svg'
  },
  {
    id: 'kimi',
    name: 'Kimi',
    src: '/llm/kimi-color.svg'
  },
  {
    id: 'ollama',
    name: 'Ollama',
    src: '/llm/ollama.svg'
  },
  {
    id: '豆包',
    name: '豆包',
    src: '/llm/doubao-color.svg'
  },
  {
    id: 'kolors',
    name: 'Kolors',
    src: '/llm/kolors-color.svg'
  }
]

// AI Features Data - Right side
const aiRightFeatures = [
  {
    title: '智能续写',
    description: 'AI 根据上下文智能续写内容，保持文章风格一致性'
  },
  {
    title: '多语言翻译',
    description: '内置 13 种不同语言的 AI 翻译支持，跨语言沟通无障碍'
  },
  {
    title: '代码生成',
    description: '根据文本语语意,一键生成对应的代码,技术文章高效创作'
  },
  {
    title: '内容润色',
    description: '划词选中内容，AI 一键润色，让文字更加精彩'
  }
]

// Hero卡片自动切换
const heroCard1 = ref(null)
const heroCard2 = ref(null)
const heroCard3 = ref(null)
let autoSwitchTimer = null
let isAutoSwitchPaused = false

// 自动切换卡片
const startAutoSwitch = () => {
  if (autoSwitchTimer) {
    clearInterval(autoSwitchTimer)
  }

  let currentIndex = 0
  const cards = [heroCard1, heroCard2, heroCard3]

  autoSwitchTimer = setInterval(() => {
    if (!isAutoSwitchPaused && cards[0].value) {
      currentIndex = (currentIndex + 1) % 3
      cards[currentIndex].value.checked = true
    }
  }, 4000) // 每4秒切换一次
}

// 暂停自动切换（鼠标悬停时）
const pauseAutoSwitch = () => {
  isAutoSwitchPaused = true
}

// 恢复自动切换（鼠标离开时）
const resumeAutoSwitch = () => {
  isAutoSwitchPaused = false
}

// 停止自动切换
const stopAutoSwitch = () => {
  if (autoSwitchTimer) {
    clearInterval(autoSwitchTimer)
    autoSwitchTimer = null
  }
}

/**
 * 动态加载撒花特效库
 */
function loadConfettiLibrary() {
  return new Promise((resolve, reject) => {
    if (typeof window.confetti !== 'undefined') {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src =
      'https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js'

    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load confetti library'))
    document.head.appendChild(script)
  })
}

/**
 * 触发彩虹撒花特效
 */
async function triggerRainbowConfetti() {
  try {
    await loadConfettiLibrary()
    window.confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
    })
  } catch (error) {
    console.error('彩虹撒花特效加载失败:', error)
  }
}

// 开发模式检测
const isDev = import.meta.env.DEV

// 路由实例
const route = useRoute()

// 滚动触发动画
let observer = null
const isInitialized = ref(false)

// 重置页面状态
const resetPageState = () => {
  // 清理之前的observer
  if (observer) {
    observer.disconnect()
    observer = null
  }

  // 重置动画状态
  const allAnimatedElements = document.querySelectorAll('.animate-in-view, .scroll-animate-first')
  allAnimatedElements.forEach((el) => {
    el.classList.remove('animate-in-view', 'scroll-animate-first')
  })

  isInitialized.value = false
}

// 初始化页面动画
const initializeAnimations = () => {
  if (isInitialized.value) return

  // 使用 nextTick 确保 DOM 已完全渲染
  nextTick(() => {
    try {
      // 确保页面滚动到顶部
      window.scrollTo(0, 0)

      // 创建 Intersection Observer 来监听元素进入视口
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 当元素进入视口时，添加动画类
              entry.target.classList.add('animate-in-view')
            } else {
              // 当元素离开视口时，移除动画类，以便下次进入时重新触发
              entry.target.classList.remove('animate-in-view')
            }
          })
        },
        {
          threshold: 0.3, // 当元素30%可见时触发
          rootMargin: '0px 0px -100px 0px' // 提前100px触发
        }
      )

      // 观察所有需要动画的元素
      const animatedElements = document.querySelectorAll('.scroll-animate')
      console.log(`找到 ${animatedElements.length} 个滚动动画元素`)
      animatedElements.forEach((el) => {
        if (observer) observer.observe(el)
      })

      // 为首页元素也添加滚动监听
      const firstPageElements = document.querySelectorAll(
        '.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in'
      )
      console.log(`找到 ${firstPageElements.length} 个首页动画元素`)
      firstPageElements.forEach((el) => {
        // 给首页元素添加scroll-animate类
        el.classList.add('scroll-animate-first')
        if (observer) observer.observe(el)
      })

      isInitialized.value = true
      console.log('页面动画初始化完成')
    } catch (error) {
      console.error('动画初始化失败:', error)
      isInitialized.value = true // 即使失败也标记为已初始化，避免重复尝试
    }
  })
}

onMounted(async () => {
  // 重置页面状态
  resetPageState()

  // 首屏入场动画

  try {
    // 初始化动画
    initializeAnimations()

    // 启动Hero卡片自动切换（延迟启动，等待页面加载完成）
    setTimeout(() => {
      startAutoSwitch()
    }, 2000)
  } catch (error) {
    console.error('页面初始化失败:', error)
    // 即使数据加载失败，也要初始化动画
    initializeAnimations()

    // 启动Hero卡片自动切换
    setTimeout(() => {
      startAutoSwitch()
    }, 2000)
  }
})

// 监听路由变化，确保每次回到首页都能正确初始化
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath === '/' && oldPath !== '/') {
      console.log('返回首页，重新初始化...')
      // 延迟一点时间确保页面完全加载
      setTimeout(() => {
        resetPageState()
        initializeAnimations()
      }, 100)
    }
  },
  { immediate: false }
)

// 监听页面可见性变化
const handleVisibilityChange = () => {
  if (!document.hidden && route.path === '/') {
    console.log('页面重新可见，检查初始化状态...')
    // 如果页面重新可见且在首页，确保动画正常
    if (!isInitialized.value) {
      setTimeout(() => {
        initializeAnimations()
      }, 200)
    }
  }
}

// 添加页面可见性监听
document.addEventListener('visibilitychange', handleVisibilityChange)

onUnmounted(() => {
  // 清理 Intersection Observer
  if (observer) {
    observer.disconnect()
    observer = null
  }


  // 清理页面可见性监听
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  // 停止Hero卡片自动切换
  stopAutoSwitch()

  // 重置状态
  isInitialized.value = false

  console.log('首页组件已卸载，清理完成')
})
</script>

<style scoped>
.hero-video-background,
.hero-video-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-title {
  text-shadow: 0 2px 18px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.18);
}

.hero-cta {
  position: relative;
  z-index: 1;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  transition-property: background-color, box-shadow, transform;
  transition-duration: 180ms;
}

.hero-cta:active {
  transform: scale(0.96);
}

.hero-video-background {
  z-index: 0;
  object-fit: cover;
  opacity: 0.62;
}

.hero-video-overlay {
  z-index: 1;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.16) 48%, rgba(255, 255, 255, 0.48));
}

/* Hero 卡片堆叠效果样式 */
.hero-card-stack-section {
  /* 默认值 */
  --_offset-steps: 1.5rem;
  --_scale-steps: 3;
  --_opacity-steps: 12;
  --_ani-duration: 300ms;

  /* 计算值 - 负值让卡片向上偏移 */
  --_offset-steps-two: calc(var(--_offset-steps) * -1);
  --_offset-steps-three: calc(var(--_offset-steps) * -2);

  --scale-steps-two: calc(1 - var(--_scale-steps) * 0.01);
  --scale-steps-three: calc(1 - var(--_scale-steps) * 0.02);

  --opacity-steps-two: calc(1 - var(--_opacity-steps) * 0.01);
  --opacity-steps-three: calc(1 - var(--_opacity-steps) * 0.02);

  position: relative;
  width: 100%;
  min-height: calc(350px + var(--_offset-steps) * 2);
  margin-top: 60px;
}

@media (min-width: 600px) {
  .hero-card-stack-section {
    --_offset-steps: 2rem;
    margin-top: 80px;
  }
}

@media (min-width: 768px) {
  .hero-card-stack-section {
    min-height: calc(400px + var(--_offset-steps) * 2);
    margin-top: 100px;
  }
}

@media (min-width: 1024px) {
  .hero-card-stack-section {
    --_offset-steps: 2.5rem;
    min-height: calc(460px + var(--_offset-steps) * 2);
    margin-top: 120px;
  }
}

.hero-card {
  --_bg-alpha: 0.5;
  --_border-radius: 12px;
  --_bg-dot-offset: 20px;
  --_bg-dot-color: var(--_bg-clr);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  isolation: isolate;
  background-color: white;
  transition:
    all 500ms ease-in-out,
    box-shadow 200ms ease-in-out;
  border-radius: var(--_border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  transform: translateY(var(--_offset, 0)) scale(var(--_scale, 1));
  transform-origin: top center;
  order: var(--_order);
  z-index: var(--_order);
  opacity: var(--_opacity);
  pointer-events: var(--_pointer-event, auto);
}

.hero-card::before,
.hero-card::after {
  content: '';
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
}

.hero-card::before {
  z-index: -2;
  inset: calc(var(--_bg-dot-offset) * -1);
  background-image: radial-gradient(var(--_bg-dot-color) 1px, transparent 0px);
  background-repeat: repeat;
  background-size: 5px 5px;
  background-position: center;
  border-radius: calc(var(--_border-radius) + var(--_bg-dot-offset));
}

.hero-card::after {
  background-color: white;
  inset: 0;
  z-index: -1;
}

/* 卡片标签 - 让整个卡片可点击 */
.hero-card-label {
  display: block;
  cursor: var(--_pointer-cursor, pointer);
  width: 100%;
  height: 100%;
  pointer-events: var(--_pointer-event, auto);
}

/* 当前激活的卡片悬停效果 */
.hero-card-stack-section:has(input:nth-child(1):checked) .hero-card:nth-of-type(1):hover,
.hero-card-stack-section:has(input:nth-child(2):checked) .hero-card:nth-of-type(2):hover,
.hero-card-stack-section:has(input:nth-child(3):checked) .hero-card:nth-of-type(3):hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.hero-card-label>header {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--_bg-clr);
  transition: background-color var(--_ani-duration) ease-in-out;
  border-radius: var(--_border-radius) var(--_border-radius) 0 0;
}

.hero-next-arrow {
  display: inline-block;
  pointer-events: auto;
}

.hero-next-arrow>label {
  padding: 0;
  color: white;
  font-size: 1.5rem;
  transition: rotate 300ms ease-in-out;
  cursor: pointer;
  user-select: none;
  display: inline-block;
}

.hero-next-arrow>label:hover {
  rotate: 90deg;
}

.hero-card-label>header>h3 {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
  color: white;
  transition: translate var(--_ani-duration) ease-in-out;
}

.hero-card-content {
  position: relative;
  padding: 0;
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 0 0 var(--_border-radius) var(--_border-radius);
}

@media (min-width: 768px) {
  .hero-card-content {
    height: 320px;
  }
}

@media (min-width: 1024px) {
  .hero-card-content {
    height: 380px;
  }
}

.hero-card-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--_ani-duration) ease-in-out;
  display: block;
}

/* 定义每张卡片的样式 */
.hero-card:nth-of-type(1) {
  --_bg-clr: #07c160;
  --_order: var(--_1-order, 3);
  --_scale: var(--_1-scale, 1);
  --_opacity: var(--_1-opacity, 1);
  --_offset: var(--_1-offset, 0);
  --_pointer-event: var(--_1-pointer-event, auto);
  --_pointer-cursor: var(--_1-pointer-cursor, pointer);
}

.hero-card:nth-of-type(2) {
  --_bg-clr: #2c69eb;
  --_order: var(--_2-order, 2);
  --_scale: var(--_2-scale, var(--scale-steps-two));
  --_opacity: var(--_2-opacity, var(--opacity-steps-two));
  --_offset: var(--_2-offset, var(--_offset-steps-two));
  --_pointer-event: var(--_2-pointer-event, none);
  --_pointer-cursor: var(--_2-pointer-cursor, default);
}

.hero-card:nth-of-type(3) {
  --_bg-clr: #ed5d0e;
  --_order: var(--_3-order, 1);
  --_scale: var(--_3-scale, var(--scale-steps-three));
  --_opacity: var(--_3-opacity, var(--opacity-steps-three));
  --_offset: var(--_3-offset, var(--_offset-steps-three));
  --_pointer-event: var(--_3-pointer-event, none);
  --_pointer-cursor: var(--_3-pointer-cursor, default);
}

/* 卡片 1 选中 */
.hero-card-stack-section:has(input:nth-child(1):checked) {
  --_1-order: 3;
  --_1-scale: 1;
  --_1-opacity: 1;
  --_1-offset: 0;
  --_1-pointer-event: auto;
  --_1-pointer-cursor: pointer;

  --_2-order: 2;
  --_2-scale: var(--scale-steps-two);
  --_2-opacity: var(--opacity-steps-two);
  --_2-offset: var(--_offset-steps-two);

  --_3-order: 1;
  --_3-scale: var(--scale-steps-three);
  --_3-opacity: var(--opacity-steps-three);
  --_3-offset: var(--_offset-steps-three);
}

/* 卡片 2 选中 */
.hero-card-stack-section:has(input:nth-child(2):checked) {
  --_2-order: 3;
  --_2-scale: 1;
  --_2-opacity: 1;
  --_2-offset: 0;
  --_2-pointer-event: auto;
  --_2-pointer-cursor: pointer;

  --_3-order: 2;
  --_3-scale: var(--scale-steps-two);
  --_3-opacity: var(--opacity-steps-two);
  --_3-offset: var(--_offset-steps-two);

  --_1-order: 1;
  --_1-scale: var(--scale-steps-three);
  --_1-opacity: var(--opacity-steps-three);
  --_1-offset: var(--_offset-steps-three);
}

/* 卡片 3 选中 */
.hero-card-stack-section:has(input:nth-child(3):checked) {
  --_3-order: 3;
  --_3-scale: 1;
  --_3-opacity: 1;
  --_3-offset: 0;
  --_3-pointer-event: auto;
  --_3-pointer-cursor: pointer;

  --_1-order: 2;
  --_1-scale: var(--scale-steps-two);
  --_1-opacity: var(--opacity-steps-two);
  --_1-offset: var(--_offset-steps-two);

  --_2-order: 1;
  --_2-scale: var(--scale-steps-three);
  --_2-opacity: var(--opacity-steps-three);
  --_2-offset: var(--_offset-steps-three);
}

/* 工具类 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
