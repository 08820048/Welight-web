<template>
  <div class="relative min-h-screen bg-white">
    <AnimatedGridPattern
      :num-squares="20"
      :max-opacity="0.15"
      :duration="4"
    />
    <div class="min-h-screen text-gray-200 relative overflow-hidden" style="position: relative; z-index: 1;">
      <!-- 顶部横幅通知 -->
      <div v-if="showBanner" class="fixed top-16 left-0 right-0 z-40 overflow-hidden">
        <div
          class="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform transition-all duration-700 ease-out"
          :class="bannerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'">
          <div class="container-custom">
            <div class="flex items-center justify-between py-4 px-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="text-lg font-bold">🎉 Welight v4.0.0 已发布！</span>
                    <span class="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full font-medium">最新版本</span>
                  </div>
                  <p class="text-sm text-primary-100">
                    全新幼圆字体设计，优化电路板背景效果，提升视觉体验！
                    <!--                  <span class="hidden sm:inline">建议更新</span>-->
                    <span class="font-medium text-white">建议下载更新！</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <button @click="closeBanner"
                  class="text-primary-100 hover:text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200 p-2 rounded-full group"
                  title="关闭通知">
                  <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="relative pt-24 overflow-hidden">
        <div class="mx-auto max-w-5xl px-6">
          <div class="sm:mx-auto lg:mr-auto">
            <!-- Animated content group -->
            <div class="space-y-8">
              <!-- Main heading -->
              <div
                v-motion
                :initial="{ opacity: 0, filter: 'blur(12px)', y: 12 }"
                :visible="{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.5, delay: 0.8 } }"
                class="mt-8 lg:mt-16">
                <AnimatedUnderlineText
                  text="智能高效的公众号文章创作&排版体验"
                  text-className="text-5xl font-medium md:text-6xl text-gray-900 whitespace-nowrap"
                  underline-className="text-gray-900"
                />
              </div>

              <!-- Description -->
              <div
                v-motion
                :initial="{ opacity: 0, filter: 'blur(12px)', y: 12 }"
                :visible="{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.5, delay: 0.85 } }"
                class="mt-8">
                <MagicText
                  text="专为微信公众号创作者打造的智能排版应用，拥有更优性能、更快捷的操作体验。"
                  container-className="max-w-2xl justify-center"
                  word-className="text-lg text-gray-600"
                />
              </div>

              <!-- Download buttons and statistics -->
              <div
                v-motion
                :initial="{ opacity: 0, filter: 'blur(12px)', y: 12 }"
                :visible="{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.5, delay: 0.9 } }"
                class="mt-12 flex flex-wrap items-center gap-3">
                <!-- macOS Download Button -->
                <button @click="downloadFile('macos-apple')" class="group">
                  <div class="relative overflow-hidden bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2">
                    <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                    <span class="text-sm">下载 macOS 版</span>
                    <svg class="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <!-- Windows Download Button -->
                <button @click="downloadFile('windows-installer')" class="group">
                  <div class="relative overflow-hidden bg-white hover:bg-gray-50 text-gray-900 font-medium px-6 py-3 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 inline-flex items-center gap-2">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z" />
                    </svg>
                    <span class="text-sm">下载 Windows 版</span>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <!-- Download statistics -->
                <div
                  v-motion
                  :initial="{ opacity: 0, filter: 'blur(12px)', y: 12 }"
                  :visible="{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.5, delay: 0.95 } }"
                  class="flex items-center gap-4 text-sm text-gray-500 ml-6">
                  <span>{{ animatedTotalDownloads.toLocaleString() }} 次下载</span>
                  <span>·</span>
                  <router-link to="/download" class="text-gray-900 hover:text-gray-600 transition-colors">
                    查看所有版本 →
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Image -->
        <div
          v-motion
          :initial="{ opacity: 0, filter: 'blur(12px)', y: 12 }"
          :visible="{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.5, delay: 1.0 } }"
          class="relative mt-8 px-2 sm:mt-12 md:mt-20">
          <TripleImageDisplayCard
            image1="https://images.waer.ltd/notes/202511181320742.png"
            image2="https://images.waer.ltd/notes/202511181307147.png"
            image3="https://images.waer.ltd/notes/202511181717594.png"
            alt1="Welight 编辑界面"
            alt2="Welight 产品展示"
            alt3="Welight 功能展示"
          />
        </div>
      </section>

      <!-- Features Section -->
      <section class="relative py-32 overflow-hidden">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="mb-20 scroll-animate">
            <AnimatedUnderlineText
              text="快捷高效的编辑体验"
              text-className="text-4xl md:text-5xl font-bold text-gray-900"
              underline-className="text-gray-900"
            />
            <MagicText
              text="从划词工具栏到智能排版，每一个功能都经过精心设计"
              container-className="mt-6 justify-center"
              word-className="text-xl text-gray-500"
            />
          </div>

          <!-- Hero Image with DisplayCard Style -->
          <div class="mb-24 scroll-animate">
            <ImageDisplayCard
              image-url="https://images.waer.ltd/notes/202510241638251.png"
              alt="Welight 核心特性展示"
            />
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

      <!-- Themes Section -->
      <section class="relative py-32 overflow-hidden">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="mb-20 scroll-animate">
            <AnimatedUnderlineText
              text="丰富多样的排版主题"
              text-className="text-4xl md:text-5xl font-bold text-gray-900"
              underline-className="text-gray-900"
            />
            <MagicText
              text="精心设计的多种主题风格，让你的推文呈现更加专业和美观的视觉效果"
              container-className="mt-6 justify-center"
              word-className="text-xl text-gray-500"
            />
          </div>

          <!-- Themes showcase - Focus Cards style (基于 DisplayCards + FocusCards 视觉) -->
          <div class="scroll-animate">
            <ThemeFocusCards />
          </div>
        </div>
      </section>

      <!-- AI Integration Section -->
      <section class="relative py-32 overflow-hidden">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="mb-20 scroll-animate">
            <AnimatedUnderlineText
              text="一站式智能体验"
              text-className="text-4xl md:text-5xl font-bold text-gray-900"
              underline-className="text-gray-900"
            />
            <MagicText
              text="集成多个主流 AI 模型，为你的写作提供智能辅助"
              container-className="mt-6 justify-center"
              word-className="text-xl text-gray-500"
            />
          </div>

          <!-- AI Models showcase -->
          <div class="mb-20">
            <!-- Models grid -->
            <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <!-- DeepSeek -->
              <div class="group scroll-animate">
                <div class="flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="w-16 h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                    <img src="https://images.waer.ltd/notes/202508281524593.png" alt="DeepSeek Logo"
                      class="w-full h-full object-contain"
                      loading="lazy" />
                  </div>
                  <h4 class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">DeepSeek</h4>
                </div>
              </div>

              <!-- 智谱 -->
              <div class="group scroll-animate">
                <div class="flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="w-16 h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                    <img src="/智谱.png" alt="智谱 Logo"
                      class="w-full h-full object-contain"
                      loading="lazy" />
                  </div>
                  <h4 class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">智谱</h4>
                </div>
              </div>

              <!-- Qwen -->
              <div class="group scroll-animate">
                <div class="flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="w-16 h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                    <img src="/qwen.png" alt="Qwen Logo"
                      class="w-full h-full object-contain"
                      loading="lazy" />
                  </div>
                  <h4 class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Qwen</h4>
                </div>
              </div>

              <!-- Kimi -->
              <div class="group scroll-animate">
                <div class="flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="w-16 h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                    <img src="/kimi.png" alt="Kimi Logo"
                      class="w-full h-full object-contain"
                      loading="lazy" />
                  </div>
                  <h4 class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Kimi</h4>
                </div>
              </div>

              <!-- Ollama -->
              <div class="group scroll-animate">
                <div class="flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="w-16 h-16 flex items-center justify-center relative grayscale group-hover:grayscale-0 transition-all">
                    <img src="https://images.waer.ltd/notes/202509050835689.png" alt="Ollama Logo"
                      class="w-full h-full object-contain"
                      loading="lazy" />
                    <!-- 本地模型标签 -->
                    <span class="absolute -top-1 -right-1 text-[10px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full font-medium">本地</span>
                  </div>
                  <h4 class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Ollama</h4>
                </div>
              </div>
            </div>
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

      <!-- Markdown Support Section -->
      <section class="relative min-h-screen py-20 overflow-hidden">
        <div class="relative container-custom">
          <!-- Section header -->
          <div class="text-center mb-16 scroll-animate" style="transition-delay: 0.1s;">
            <AnimatedUnderlineText
              text="强大的Markdown语法标准"
              text-className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
              underline-className="text-gray-900"
            />
            <MagicText
              text="全面支持标准Markdown语法及扩展功能，让你的文档编写更加高效和专业"
              container-className="mt-6 justify-center max-w-3xl mx-auto"
              word-className="text-lg md:text-xl text-gray-600"
            />
          </div>

          <!-- Markdown features grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <!-- Basic Syntax -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.4s;">
              <MarkdownFeatureCard
                :icon="FileText"
                title="基础语法"
                :features="['标题 (H1-H6)', '粗体、斜体、删除线', '有序、无序列表', '链接和图片', '引用块']"
              />
            </div>

            <!-- Code Support -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.5s;">
              <MarkdownFeatureCard
                :icon="Code"
                title="代码支持"
                :features="['行内代码', '代码块', '语法高亮', '多语言支持', '代码行号']"
              />
            </div>

            <!-- Tables -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.6s;">
              <MarkdownFeatureCard
                :icon="Table"
                title="表格功能"
                :features="['标准表格语法', '列对齐控制', '表格样式美化', '可视化编辑', '导入导出支持']"
              />
            </div>

            <!-- Math & Formulas -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.7s;">
              <MarkdownFeatureCard
                :icon="Calculator"
                title="数学公式"
                :features="['LaTeX 数学公式', '行内公式', '块级公式', '公式编号', '实时预览']"
              />
            </div>

            <!-- Extended Features -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.8s;">
              <MarkdownFeatureCard
                :icon="Puzzle"
                title="扩展功能"
                :features="['任务列表', '脚注支持', '定义列表', '缩略语', '高亮标记']"
              />
            </div>

            <!-- Diagrams -->
            <div class="scroll-animate scale-up" style="transition-delay: 0.9s;">
              <MarkdownFeatureCard
                :icon="BarChart"
                title="图表支持"
                :features="['Mermaid 图表', '流程图', '时序图', '甘特图', '思维导图']"
              />
            </div>
          </div>

          <!-- Markdown advantages -->
          <div class="text-center scroll-animate" style="transition-delay: 1.0s;">
            <div class="max-w-4xl mx-auto">
              <AnimatedUnderlineText
                text="为什么选择Markdown？"
                text-className="text-2xl md:text-3xl font-bold text-gray-900"
                underline-className="text-gray-900"
              />

              <div class="grid md:grid-cols-3 gap-8 mt-12">
                <!-- Advantage 1 -->
                <div class="scroll-animate fade-up text-center" style="transition-delay: 1.1s;">
                  <h4 class="text-xl font-bold text-gray-900 mb-3">简单高效</h4>
                  <MagicText
                    text="轻量级标记语言，学习成本低，书写效率高，专注内容创作"
                    container-className="justify-center"
                    word-className="text-base text-gray-600"
                  />
                </div>

                <!-- Advantage 2 -->
                <div class="scroll-animate fade-up text-center" style="transition-delay: 1.2s;">
                  <h4 class="text-xl font-bold text-gray-900 mb-3">跨平台兼容</h4>
                  <MagicText
                    text="标准化格式，在任何平台和设备上都能完美显示和编辑"
                    container-className="justify-center"
                    word-className="text-base text-gray-600"
                  />
                </div>

                <!-- Advantage 3 -->
                <div class="scroll-animate fade-up text-center" style="transition-delay: 1.3s;">
                  <h4 class="text-xl font-bold text-gray-900 mb-3">版本控制友好</h4>
                  <MagicText
                    text="纯文本格式，完美支持Git等版本控制系统，协作更便捷"
                    container-className="justify-center"
                    word-className="text-base text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom text -->
          <div class="text-center mt-16 scroll-animate" style="transition-delay: 1.4s;">
            <MagicText
              text="让Welight成为你高效写作的得力助手"
              container-className="justify-center"
              word-className="text-xl md:text-2xl font-medium text-gray-600"
            />
          </div>


        </div>
      </section>



    </div>

    <!-- 底部右上角购买通知滚动 -->
    <PurchaseNotificationTicker />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { handleDownload, initializeDownloadStats, startStatsSync, getDownloadStats } from '@/services/downloadStats'
import { useSEO, seoConfigs } from '@/composables/useSEO'
import ThemeFocusCards from '@/components/ThemeFocusCards.vue'
import AnimatedGridPattern from '@/components/AnimatedGridPattern.vue'
import DisplayCards from '@/components/DisplayCards.vue'
import ImageDisplayCard from '@/components/ImageDisplayCard.vue'
import DualImageDisplayCard from '@/components/DualImageDisplayCard.vue'
import TripleImageDisplayCard from '@/components/TripleImageDisplayCard.vue'
import MarkdownFeatureCard from '@/components/MarkdownFeatureCard.vue'
import VerticalDisplayCards from '@/components/VerticalDisplayCards.vue'
import AnimatedUnderlineText from '@/components/ui/AnimatedUnderlineText.vue'
import MagicText from '@/components/ui/MagicText.vue'
import PurchaseNotificationTicker from '@/components/PurchaseNotificationTicker.vue'
import { Wand2, Command, Copy, BarChart3, Palette, Sparkles, FileText, Code, Table, Calculator, Puzzle, BarChart } from 'lucide-vue-next'

// SEO配置
useSEO(seoConfigs.home)

// Features Display Cards Data
const featuresGroup1 = [
  {
    icon: Wand2,
    title: '划词工具栏',
    description: '选中文本即可显示划词工具栏，快速应用格式、预设的 AI 快捷功能',
    titleClassName: 'text-gray-900',
  },
  {
    icon: Command,
    title: 'Slash 命令菜单',
    description: '输入斜杠即可打开命令菜单，快速插入语法、操作功能',
    titleClassName: 'text-gray-900',
  },
  {
    icon: Copy,
    title: '预览一键复制',
    description: '满意的排版风格一键复制，粘贴微信编辑器即可发布，所见即所得',
    titleClassName: 'text-gray-900',
  },
]

const featuresGroup2 = [
  {
    icon: BarChart3,
    title: '智能图表转换',
    description: '采用 ChartJs 图表渲染集成，图表格式自动转码，数据转表弹指可得',
    titleClassName: 'text-gray-900',
  },
  {
    icon: Palette,
    title: '丰富主题样式',
    description: '精心设计的多种主题风格，让你的推文呈现更加专业和美观的视觉效果',
    titleClassName: 'text-gray-900',
  },
  {
    icon: Sparkles,
    title: 'AI 智能助手',
    description: '集成多个主流 AI 模型，为你的写作提供智能辅助，让创作更加高效',
    titleClassName: 'text-gray-900',
  },
]

// AI Features Data - Left side
const aiLeftFeatures = [
  {
    title: '划词搜图',
    description: '根据选中的关键词文本，一键搜索相关图片资源'
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
    title: '快捷转换',
    description: '内置 AI 文本格式智能转换，TXT 一键转写 Markdown，没有语法门槛'
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
    if (typeof confetti !== 'undefined') {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js'
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
    confetti({
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

// 横幅通知状态
const showBanner = ref(false)
const bannerVisible = ref(false)

// 当前版本号
const currentVersion = '4.0.0'

// 检查是否应该显示版本横幅
const shouldShowVersionBanner = () => {
  const lastDismissedVersion = localStorage.getItem('welight_dismissed_version_banner')
  return !lastDismissedVersion || lastDismissedVersion !== currentVersion
}

// 开发测试函数：重置横幅状态（仅在开发环境使用）
const resetBannerForTesting = () => {
  localStorage.removeItem('welight_dismissed_version_banner')
  showBanner.value = true
  bannerVisible.value = true
  console.log('横幅状态已重置，用于测试')
}

// 在开发环境下暴露测试函数到全局
if (import.meta.env.DEV) {
  window.resetBannerForTesting = resetBannerForTesting
}

// 下载统计数据 - 从后端API获取真实统计
const downloadStats = ref({
  'windows-installer': 0,
  'windows-msi': 0,
  'macos-apple': 0,
  'macos-intel': 0,
  'linux-appimage': 0,
  'linux-deb': 0,
  'linux-rpm': 0
})

// 后端原始统计数据
const backendStats = ref(null)

// 动画数字状态
const animatedTotalDownloads = ref(0)
const animatedMacDownloads = ref(0)
const animatedWindowsDownloads = ref(0)
const animatedLinuxDownloads = ref(0)

// 计算总下载量 - 优先使用后端数据
const totalDownloads = computed(() => {
  if (backendStats.value && backendStats.value.totalDownloads !== undefined) {
    return backendStats.value.totalDownloads
  }
  return Object.values(downloadStats.value).reduce((total, count) => total + count, 0)
})

// 数字递增动画函数
const animateNumber = (from, to, duration, callback) => {
  // 确保输入值是有效数字
  const fromNum = Number(from) || 0
  const toNum = Number(to) || 0
  const durationNum = Number(duration) || 1000

  const startTime = Date.now()
  const difference = toNum - fromNum

  const step = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / durationNum, 1)

    // 使用缓动函数，让动画更自然
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(fromNum + difference * easeOutQuart)

    callback(current)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      callback(toNum) // 确保最终值准确
    }
  }

  requestAnimationFrame(step)
}

// 计算各平台总下载量
const getPlatformDownloads = () => {
  const stats = downloadStats.value
  return {
    windows: (stats['windows-installer'] || 0) + (stats['windows-msi'] || 0),
    macos: (stats['macos-apple'] || 0) + (stats['macos-intel'] || 0),
    linux: (stats['linux-appimage'] || 0) + (stats['linux-deb'] || 0) + (stats['linux-rpm'] || 0)
  }
}

// 从后端数据获取平台下载量
const getPlatformDownloadsFromBackend = () => {
  if (backendStats.value && backendStats.value.platformDownloads) {
    return {
      windows: backendStats.value.platformDownloads.windows || 0,
      macos: backendStats.value.platformDownloads.mac || 0, // 注意：API返回的是'mac'不是'macos'
      linux: backendStats.value.platformDownloads.linux || 0
    }
  }
  return getPlatformDownloads() // 回退到本地计算
}

// 启动下载数据动画
const startDownloadAnimation = () => {
  const platformStats = getPlatformDownloadsFromBackend()

  // 总下载量动画
  animateNumber(0, totalDownloads.value, 2000, (value) => {
    animatedTotalDownloads.value = value
  })

  // macOS下载量动画（两种安装包总和）
  animateNumber(0, platformStats.macos, 1800, (value) => {
    animatedMacDownloads.value = value
  })

  // Windows下载量动画（两种安装包总和）
  animateNumber(0, platformStats.windows, 1600, (value) => {
    animatedWindowsDownloads.value = value
  })

  // Linux下载量动画（三种安装包总和）
  animateNumber(0, platformStats.linux, 1400, (value) => {
    animatedLinuxDownloads.value = value
  })
}

// 横幅通知相关函数
const closeBanner = () => {
  // 先播放收起动画
  bannerVisible.value = false
  // 记录用户已关闭当前版本的横幅
  localStorage.setItem('welight_dismissed_version_banner', currentVersion)
  // 延迟隐藏横幅
  setTimeout(() => {
    showBanner.value = false
  }, 700) // 与动画时长一致
}

// 下载文件函数
const downloadFile = async (platform) => {
  try {
    // 触发彩虹撒花特效
    triggerRainbowConfetti()

    // 实际下载链接映射
    const downloadUrls = {
      'windows-installer': 'https://waer.ltd/downloads/windows/Welight_4.0.0_x64-setup.exe',
      'windows-msi': 'https://waer.ltd/downloads/windows/Welight_4.0.0_x64_en-US.msi',
      'macos-apple': 'https://waer.ltd/downloads/mac/Welight_4.0.0_aarch64.dmg',
      'macos-intel': 'https://waer.ltd/downloads/mac/Welight_4.0.0_x64.dmg',
      'linux-appimage': 'https://waer.ltd/downloads/linux/Welight_4.0.0_amd64.AppImage',
      'linux-deb': 'https://waer.ltd/downloads/linux/Welight_4.0.0_amd64.deb'
    }

    const downloadUrl = downloadUrls[platform]

    if (downloadUrl) {
      // 使用新的下载处理服务，传入更新本地统计的回调
      const updateLocalStats = async (downloadedPlatform) => {
        try {
          // 更新本地统计数据
          const currentStats = { ...downloadStats.value }
          if (currentStats[downloadedPlatform] !== undefined) {
            currentStats[downloadedPlatform] += 1
          }
          downloadStats.value = currentStats

          // 同时刷新后端原始数据
          const rawData = await getDownloadStats()
          if (rawData) {
            backendStats.value = rawData
          }
          console.log('本地统计已更新:', currentStats, '后端数据:', rawData)

          // 数据更新后重新启动动画
          setTimeout(() => {
            startDownloadAnimation()
          }, 300)
        } catch (error) {
          console.error('更新本地统计失败:', error)
        }
      }

      await handleDownload(platform, downloadUrl, updateLocalStats)
    } else {
      console.log(`${platform} 版本暂不可用`)
      alert(`${platform} 版本即将推出，敬请期待！`)
    }
  } catch (error) {
    console.error('下载处理失败:', error)
    // 下载失败也不应该影响页面状态
  }
}

// 初始化下载统计数据
const loadDownloadStats = async () => {
  try {
    // 先获取后端原始数据
    const rawData = await getDownloadStats()
    if (rawData) {
      backendStats.value = rawData
      console.log('后端原始数据:', rawData)
    }

    // 再获取映射后的数据
    const stats = await initializeDownloadStats()
    downloadStats.value = stats
    console.log('映射后的统计数据:', stats)

    // 数据加载完成后，延迟启动动画
    setTimeout(() => {
      startDownloadAnimation()
    }, 1000) // 延迟1秒，让页面元素先渲染
  } catch (error) {
    console.error('初始化下载统计数据失败:', error)
  }
}

// 滚动触发动画
let observer = null
let statsCleanup = null
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
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当元素进入视口时，添加动画类
            entry.target.classList.add('animate-in-view')
          } else {
            // 当元素离开视口时，移除动画类，以便下次进入时重新触发
            entry.target.classList.remove('animate-in-view')
          }
        })
      }, {
        threshold: 0.3, // 当元素30%可见时触发
        rootMargin: '0px 0px -100px 0px' // 提前100px触发
      })

      // 观察所有需要动画的元素
      const animatedElements = document.querySelectorAll('.scroll-animate')
      console.log(`找到 ${animatedElements.length} 个滚动动画元素`)
      animatedElements.forEach((el) => {
        if (observer) observer.observe(el)
      })

      // 为首页元素也添加滚动监听
      const firstPageElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in')
      console.log(`找到 ${firstPageElements.length} 个首页动画元素`)
      firstPageElements.forEach((el) => {
        // 给首页元素添加scroll-animate类
        el.classList.add('scroll-animate-first')
        if (observer) observer.observe(el)
      })

      // 强制触发首屏动画
      setTimeout(() => {
        const heroElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in')
        heroElements.forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('animate-in-view')
          }
        })
      }, 100)

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

  // 检查是否应该显示版本横幅
  if (shouldShowVersionBanner()) {
    showBanner.value = true
    // 延迟显示横幅动画，给页面加载一些时间
    setTimeout(() => {
      bannerVisible.value = true
    }, 1000)
  }

  try {
    // 初始化下载统计数据
    await loadDownloadStats()

    // 启动统计数据同步（每5分钟同步一次）
    statsCleanup = startStatsSync(async (newStats) => {
      downloadStats.value = newStats
      // 同时更新后端原始数据
      const rawData = await getDownloadStats()
      if (rawData) {
        backendStats.value = rawData
      }

      // 定期同步时也重新启动动画
      setTimeout(() => {
        startDownloadAnimation()
      }, 300)
    }, 5 * 60 * 1000)

    // 预加载撒花特效库
    loadConfettiLibrary().catch(console.error)

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
watch(() => route.path, (newPath, oldPath) => {
  if (newPath === '/' && oldPath !== '/') {
    console.log('返回首页，重新初始化...')
    // 延迟一点时间确保页面完全加载
    setTimeout(() => {
      resetPageState()
      initializeAnimations()
    }, 100)
  }
}, { immediate: false })

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

  // 清理统计数据同步
  if (statsCleanup) {
    statsCleanup()
    statsCleanup = null
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
  transition: all 500ms ease-in-out, box-shadow 200ms ease-in-out;
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
  content: "";
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
