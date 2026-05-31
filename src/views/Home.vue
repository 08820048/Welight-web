<template>
  <div ref="revealRoot" class="min-h-screen bg-[#fbfbfa] text-gray-950 dark:bg-gray-950 dark:text-gray-50" :class="{ 'reveal-ready': revealMotionReady }">
    <section id="top" class="px-4 pt-24 md:px-6 md:pt-28">
      <div class="mx-auto max-w-6xl">
        <div class="mx-auto max-w-4xl text-center">
          <p data-reveal="up-xs" class="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            Agent-led publishing workspace
          </p>
          <h1 class="hero-title mt-5 text-balance text-4xl font-semibold tracking-normal text-gray-950 md:text-6xl dark:text-white">
            <span
              v-for="(word, index) in heroTitleWords"
              :key="word"
              class="hero-title-word"
              :style="{ '--word-delay': `${120 + index * 80}ms` }"
            >
              {{ word }}
            </span>
          </h1>
          <p data-reveal="up-sm" style="--reveal-delay: 440ms" class="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-gray-600 md:text-xl dark:text-gray-300">
            素材搜索、文章其稿、审校、配图和创作发布
          </p>

          <div class="mt-7 flex flex-wrap justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span
              v-for="(item, index) in heroFacts"
              :key="item"
              data-reveal="up-xs"
              class="rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-gray-800 dark:bg-gray-900"
              :style="{ '--reveal-delay': `${560 + index * 55}ms` }"
            >
              {{ item }}
            </span>
          </div>

          <div data-reveal="up-xs" style="--reveal-delay: 800ms" class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              class="inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_-26px_rgba(15,23,42,0.8)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.96] dark:bg-white dark:text-gray-950"
              @click="downloadFile('macos-apple')"
            >
              下载试用
            </button>
            <router-link
              to="/pricing"
              class="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              $9.9买断
            </router-link>
          </div>
        </div>

        <div data-reveal="up-sm" style="--reveal-delay: 980ms" class="mt-12">
          <picture>
            <source :srcset="themeStore.isDark ? '/assert/hero-dark.png' : '/assert/hero-light.png'" type="image/png" />
            <img
              :src="themeStore.isDark ? '/assert/hero-dark.png' : '/assert/hero-light.png'"
              alt="Welight 桌面应用界面，包含编辑区、预览区和 AI 创作入口"
              class="h-auto w-full"
              width="1508"
              height="918"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>

    <section id="features" class="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="00" title="一个 Agent 工作台，而不是一堆按钮" description="Welight 的页面重点从单点排版能力，转向公众号创作流程里的判断、生成、预览和交付。" />
        </div>

        <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(area, index) in workspaces"
            :key="area.title"
            data-reveal="up-sm"
            class="motion-card rounded-lg bg-white p-5 ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/10"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
          >
            <p class="text-sm font-semibold text-gray-500 dark:text-gray-400">{{ area.kicker }}</p>
            <h3 class="mt-3 text-xl font-semibold tracking-normal">{{ area.title }}</h3>
            <p class="mt-3 text-pretty text-sm leading-6 text-gray-600 dark:text-gray-300">{{ area.description }}</p>
            <ul class="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li v-for="point in area.points" :key="point" class="flex gap-2">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900 dark:bg-gray-100"></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section id="workflow" class="scroll-mt-28 border-y border-gray-200 bg-white px-4 py-20 md:px-6 md:py-28 dark:border-gray-800 dark:bg-gray-900/45">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="01" title="从想法到公众号后台，只走一条线" description="Agent 负责把上下文、生成步骤和工具调用串起来，你在每个关键节点做选择。" />
        </div>

        <div class="mt-12 grid gap-3 lg:grid-cols-5">
          <article
            v-for="(step, index) in workflowSteps"
            :key="step.title"
            data-reveal="up-xs"
            class="motion-card rounded-lg bg-[#fbfbfa] p-5 ring-1 ring-black/10 dark:bg-gray-950 dark:ring-white/10"
            :style="{ '--reveal-delay': `${index * 70}ms` }"
          >
            <div class="flex items-center justify-between">
              <span class="tabular-nums text-sm font-semibold text-gray-400">0{{ index + 1 }}</span>
              <span v-if="index < workflowSteps.length - 1" class="hidden text-gray-300 lg:inline">→</span>
            </div>
            <h3 class="mt-5 text-lg font-semibold">{{ step.title }}</h3>
            <p class="mt-3 text-pretty text-sm leading-6 text-gray-600 dark:text-gray-300">{{ step.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="ai" class="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="02" title="Agent 不是黑盒，它把过程摊开给你看" description="创作过程保留可读的中间结果：会话、任务步骤、工具调用、联网搜索、记忆和工作空间。" />
        </div>

        <div class="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div data-reveal="right-sm" class="overflow-hidden rounded-lg bg-white p-2 ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/10">
            <picture>
              <source :srcset="themeStore.isDark ? '/assert/fbcg-dark.webp' : '/assert/fbcg.webp'" type="image/webp" />
              <img
                :src="themeStore.isDark ? '/assert/fbcg-dark.webp' : '/assert/fbcg.webp'"
                alt="Welight 发布前处理和预览界面"
                class="aspect-[4/3] w-full rounded-md object-contain"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div class="grid gap-3">
            <article
              v-for="(capability, index) in agentCapabilities"
              :key="capability.title"
              data-reveal="left-sm"
              class="motion-card rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              :style="{ '--reveal-delay': `${index * 75}ms` }"
            >
              <h3 class="text-lg font-semibold">{{ capability.title }}</h3>
              <p class="mt-2 text-pretty text-sm leading-6 text-gray-600 dark:text-gray-300">{{ capability.description }}</p>
            </article>
          </div>
        </div>

        <div data-reveal="up-xs" class="mt-12">
          <p class="text-center text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            模型和服务可按需配置
          </p>
          <div class="mt-5 flex flex-wrap justify-center gap-3">
            <span
              v-for="(model, index) in modelSupport"
              :key="model"
              data-reveal="up-xs"
              class="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              :style="{ '--reveal-delay': `${index * 35}ms` }"
            >
              {{ model }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section id="principles" class="scroll-mt-28 border-y border-gray-200 bg-white px-4 py-20 md:px-6 md:py-28 dark:border-gray-800 dark:bg-gray-900/45">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="03" title="Welight 的产品边界" description="Agent 可以帮你推进，但不会把每一步都变成不可控的自动化。" />
        </div>
        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <article
            v-for="(principle, index) in principles"
            :key="principle.title"
            data-reveal="up-sm"
            class="motion-card rounded-lg bg-[#fbfbfa] p-6 ring-1 ring-black/10 dark:bg-gray-950 dark:ring-white/10"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
          >
            <h3 class="text-xl font-semibold">{{ principle.title }}</h3>
            <p class="mt-3 text-pretty text-sm leading-7 text-gray-600 dark:text-gray-300">{{ principle.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="pricing" class="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div class="mx-auto max-w-5xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="04" title="价格直接讲清楚" description="不把过期积分套餐作为主要售卖项。当前官网以买断许可证为主，AI 服务和模型配置按实际使用方式处理。" />
        </div>

        <div data-reveal="up-sm" class="motion-card mx-auto mt-12 max-w-2xl rounded-lg bg-white p-8 text-center shadow-[0_26px_80px_-55px_rgba(15,23,42,0.55)] ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/10">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Personal License</p>
          <div class="mt-5 tabular-nums text-7xl font-light leading-none md:text-8xl">$9.9</div>
          <router-link
            to="/pricing"
            class="mx-auto mt-7 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-gray-950 px-6 py-3 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.96] dark:bg-white dark:text-gray-950"
          >
            $9.9买断
          </router-link>
          <p class="mx-auto mt-6 max-w-lg text-pretty text-sm leading-7 text-gray-600 dark:text-gray-300">
            终身更新 · 2 台 Mac / 许可证 · 3天试用 · 支持银行卡、Apple Pay、微信等。最终税费与可用支付方式以支付页面展示为准。
          </p>
        </div>
      </div>
    </section>

    <section id="faq" class="scroll-mt-28 border-t border-gray-200 bg-white px-4 py-20 md:px-6 md:py-28 dark:border-gray-800 dark:bg-gray-900/45">
      <div class="mx-auto max-w-4xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="05" title="常见问题" description="尽量用短答案回答真实购买和使用前会遇到的问题。" />
        </div>
        <div data-reveal="up-sm" class="mt-10 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-[#fbfbfa] dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950">
          <details v-for="(item, index) in faqs" :key="item.question" class="group p-5" data-reveal="up-xs" :style="{ '--reveal-delay': `${index * 45}ms` }">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold">
              {{ item.question }}
              <span class="text-xl font-light text-gray-400 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p class="mt-4 text-pretty text-sm leading-7 text-gray-600 dark:text-gray-300">{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineComponent, h, ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { handleDownload, initializeDownloadStats, getDownloadStats } from '@/services/downloadStats'
import { useSEO, seoConfigs } from '@/composables/useSEO'

useSEO(seoConfigs.home)

const SectionHeader = defineComponent({
  props: {
    eyebrow: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  setup(props) {
    return () =>
      h('div', { class: 'mx-auto max-w-3xl text-center' }, [
        h('p', { class: 'tabular-nums text-sm font-semibold text-gray-400' }, props.eyebrow),
        h('h2', { class: 'mt-3 text-balance text-3xl font-semibold tracking-normal md:text-5xl' }, props.title),
        h('p', { class: 'mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-gray-600 dark:text-gray-300' }, props.description)
      ])
  }
})

const themeStore = useThemeStore()
const revealRoot = ref(null)
const revealMotionReady = ref(false)
let revealObserver = null

const heroTitleWords = ['一句话、一篇文章、远不止于此']

const heroFacts = [
  'Agent 主导创作',
  'Markdown + 公众号预览',
  '一键复制/发布公众号',
  '支持自配 AI 模型'
]

const workspaces = [
  {
    kicker: 'Research',
    title: '选题和资料',
    description: '把联网搜索、上下文整理、素材摘录放进同一个会话里，减少在浏览器、文档和聊天窗口之间来回切换。',
    points: ['联网搜索', '上下文整理', '资料转大纲']
  },
  {
    kicker: 'Write',
    title: '写作和改稿',
    description: '从初稿、扩写、润色到摘要解释，Agent 保留步骤和中间结果，你可以随时接管文本。',
    points: ['流式输出', '任务步骤', '检查点']
  },
  {
    kicker: 'Format',
    title: '预览和排版',
    description: 'Markdown、公式、图表、代码和注音可以在预览区直接看到公众号图文效果，再决定是否复制。',
    points: ['实时预览', '主题切换', '自定义 CSS']
  },
  {
    kicker: 'Publish',
    title: '发布前处理',
    description: '图片上传、封面配图、推荐阅读、导入导出和公众号复制都放在发布前最后一段流程里处理。',
    points: ['图床配置', '素材整理', '一键复制']
  }
]

const workflowSteps = [
  {
    title: '写下初稿',
    description: '先把观点、素材或零散笔记放进编辑区，不需要一开始就处理格式。'
  },
  {
    title: 'Agent 补全结构',
    description: '让 Agent 根据上下文补齐标题、段落层级、摘要、示例和过渡。'
  },
  {
    title: '选择主题预览',
    description: '在公众号样式预览里检查标题、引用、代码、表格和图片显示。'
  },
  {
    title: '处理图片和封面',
    description: '按需要搜索配图、生成图片、上传图床或整理公众号素材。'
  },
  {
    title: '复制/发布公众号',
    description: '确认无误后一键复制/发布公众号，减少发布前反复调样式。'
  }
]

const agentCapabilities = [
  {
    title: '会话侧边栏和工作空间',
    description: '同一篇文章里的资料、生成结果和修改记录可以归在一个上下文里，不必每次从零解释。'
  },
  {
    title: '工具调用和任务步骤',
    description: '搜索、生成、润色、配图等动作有明确过程，方便你判断 Agent 做了什么。'
  },
  {
    title: 'MCP和Skill支持',
    description: '通过 MCP 接入外部工具和数据源，用 Skill 固化常用创作流程，让 Agent 可以按你的工作习惯扩展能力。'
  },
  {
    title: '模型和服务可替换',
    description: '支持多家模型与图床配置，尽量把选择权交给创作者自己。'
  }
]

const modelSupport = [
  'DeepSeek',
  'OpenAI',
  '通义千问',
  '豆包',
  'Kimi',
  '智谱',
  'Ollama',
  'SiliconFlow',
  'OpenRouter',
  '可灵'
]

const principles = [
  {
    title: '本地写作优先',
    description: '桌面应用提供独立写作环境，文章不必先塞进公众号后台再调格式。'
  },
  {
    title: '先预览，再发布',
    description: '复制前先看公众号图文效果，尤其是图片、代码、表格和复杂 Markdown 内容。'
  },
  {
    title: 'AI 是协作者，不是黑盒',
    description: '流式输出、工具调用、任务步骤和检查点都应该可见，方便创作者判断和修改。'
  },
  {
    title: '能自配，就不锁死',
    description: '模型、图床和服务尽量提供可配置选项，避免把创作流程绑定在单一服务上。'
  }
]

const faqs = [
  {
    question: 'Welight 和公众号后台编辑器有什么区别？',
    answer: '公众号后台适合最终发布，Welight 更适合写作、AI 协作、主题预览和发布前整理。你可以在 Welight 里完成大部分准备工作，再复制到后台。'
  },
  {
    question: '现在的 Welight 为什么强调 Agent？',
    answer: '因为创作流程不只是排版。选题、查资料、扩写、润色、配图、预览和复制都有上下文，Agent 更适合把这些步骤串起来。'
  },
  {
    question: '我不会 Markdown 能用吗？',
    answer: '可以。Markdown 是高效入口，不是使用门槛。普通文本、快捷菜单、智能排版和预览也能覆盖日常公众号写作。'
  },
  {
    question: 'AI 功能必须购买官方服务吗？',
    answer: '不是。Welight 支持多家模型和服务配置，具体可用能力取决于你配置的模型、密钥和当前版本支持。'
  },
  {
    question: '能不能一键复制/发布公众号？',
    answer: '可以。核心目标就是把预览后的图文排版一键复制/发布公众号，减少最后发布前的手动调整。'
  },
  {
    question: '支持哪些系统？',
    answer: '官网提供 macOS 和 Windows 下载入口；不同平台的安装包和更新节奏以下载页为准。'
  },
  {
    question: '图片和文章内容会上传到哪里？',
    answer: '写作内容默认在你的本地工作流里处理。图片是否上传取决于你配置的图床或使用的服务，发布前建议检查对应配置。'
  },
  {
    question: '试用和许可证怎么激活？',
    answer: '先下载试用确认工作流是否合适。购买许可证后在应用内按提示激活，当前官网价格和支付方式以支付页面展示为准。'
  }
]

const downloadStats = ref({})
const backendStats = ref(null)
const totalDownloads = computed(() => {
  if (backendStats.value?.totalDownloads !== undefined) return backendStats.value.totalDownloads
  return Object.values(downloadStats.value).reduce((sum, count) => sum + (Number(count) || 0), 0)
})

async function downloadFile(platform) {
  const downloadUrls = {
    'macos-apple': 'https://download.upgrade.toolsetlink.com/download?appKey=2fO2OcSAKXFQ9Gf7F3IooA',
    'windows-installer': 'https://download.upgrade.toolsetlink.com/download?appKey=2fO2OcSAKXFQ9Gf7F3IooA'
  }

  const downloadUrl = downloadUrls[platform] || downloadUrls['macos-apple']
  await handleDownload(platform, downloadUrl, async (downloadedPlatform) => {
    downloadStats.value = {
      ...downloadStats.value,
      [downloadedPlatform]: (downloadStats.value[downloadedPlatform] || 0) + 1
    }
  })
}

function initializeRevealMotion() {
  if (typeof window === 'undefined' || !revealRoot.value) return

  const targets = Array.from(revealRoot.value.querySelectorAll('[data-reveal]'))
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!targets.length || reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-revealed'))
    return
  }

  revealMotionReady.value = true
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        revealObserver?.unobserve(entry.target)
      })
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.16
    }
  )

  requestAnimationFrame(() => {
    targets.forEach((target) => revealObserver?.observe(target))
  })
}

onMounted(async () => {
  initializeRevealMotion()

  try {
    const [stats, rawData] = await Promise.all([initializeDownloadStats(), getDownloadStats()])
    downloadStats.value = stats || {}
    backendStats.value = rawData || null
  } catch (error) {
    console.warn('下载统计加载失败:', error)
  }
})

onUnmounted(() => {
  revealObserver?.disconnect()
})
</script>

<style scoped>
.hero-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.18em;
  row-gap: 0.08em;
}

.hero-title-word {
  display: inline-block;
  opacity: 0;
  transform: translate3d(0, 0.28em, 0);
  filter: blur(8px);
  animation: hero-word-rise 720ms cubic-bezier(0.2, 0, 0, 1) forwards;
  animation-delay: var(--word-delay, 0ms);
}

.reveal-ready [data-reveal] {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  filter: blur(8px);
  transition-property: opacity, transform, filter;
  transition-duration: 700ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform, filter;
}

.reveal-ready [data-reveal='up-xs'] {
  transform: translate3d(0, 12px, 0);
}

.reveal-ready [data-reveal='up-sm'] {
  transform: translate3d(0, 24px, 0);
}

.reveal-ready [data-reveal='left-sm'] {
  transform: translate3d(24px, 0, 0);
}

.reveal-ready [data-reveal='right-sm'] {
  transform: translate3d(-24px, 0, 0);
}

.reveal-ready [data-reveal].is-revealed {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  filter: blur(0);
  will-change: auto;
}

.motion-card {
  transition-property: transform, box-shadow, border-color;
  transition-duration: 220ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
}

.motion-card:hover,
.reveal-ready .motion-card.is-revealed:hover {
  transform: translate3d(0, -4px, 0);
  box-shadow: 0 22px 55px -42px rgba(15, 23, 42, 0.72);
}

@keyframes hero-word-rise {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-title-word {
    opacity: 1;
    transform: none;
    filter: none;
    animation: none;
  }

  .reveal-ready [data-reveal],
  .reveal-ready [data-reveal].is-revealed,
  .motion-card,
  .motion-card:hover {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
    box-shadow: none;
  }
}
</style>
