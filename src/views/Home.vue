<template>
  <div ref="revealRoot" class="product-main home-page relative isolate min-h-screen overflow-x-hidden" :class="{ 'reveal-ready': revealMotionReady }">
    <div class="home-motion-bg" aria-hidden="true"></div>
    <div class="home-motion-wash" aria-hidden="true"></div>

    <section id="top" class="product-hero-field relative z-10 flex min-h-screen items-center justify-center bg-transparent p-3 md:p-5">
      <div class="hero-shell group relative flex h-[calc(100vh-1.5rem)] min-h-[680px] w-full max-w-[1536px] flex-col items-center overflow-hidden rounded-[1.5rem] bg-white/10 shadow-none md:h-[calc(100vh-2.5rem)] md:rounded-[3rem]">
        <div class="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(240,240,240,0.82)_0%,rgba(240,240,240,0.38)_45%,rgba(240,240,240,0.78)_100%)]"></div>
        <div class="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.74),transparent_42%),linear-gradient(90deg,rgba(240,240,240,0.32),rgba(255,255,255,0.06),rgba(240,240,240,0.42))]"></div>

        <div class="relative z-10 flex h-full w-full flex-col items-center">
          <nav class="relative z-10 flex w-full items-center justify-between px-6 py-6 md:px-10">
            <div class="hidden flex-1 md:block">
              <router-link to="/" class="inline-flex items-center gap-2 text-[rgba(30,50,90,0.9)]">
                <img src="/logo.png" alt="Welight Logo" class="h-8 w-8 rounded-lg object-cover ring-1 ring-white/40" />
                <span class="text-lg font-normal tracking-tight">Welight</span>
              </router-link>
            </div>

            <ul class="hidden items-center gap-8 text-sm font-normal text-[rgb(45,45,45)] md:flex">
              <li v-for="item in heroNavItems" :key="item.label">
                <a
                  :href="item.href"
                  class="group flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-70"
                >
                  {{ item.label }}
                  <ChevronRight v-if="item.hasDropdown" class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>

            <div class="md:hidden">
              <router-link to="/" class="font-normal text-xl tracking-tighter text-[rgba(30,50,90,0.9)]">Welight</router-link>
            </div>

            <div class="flex flex-1 justify-end">
              <button
                class="group flex items-center gap-2 rounded-full bg-[rgba(30,50,90,0.8)] py-1.5 pl-2 pr-4 text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[rgba(30,50,90,1)] active:scale-[0.98] md:gap-3 md:py-2 md:pr-6"
                @click="downloadFile(detectedDownloadPlatform)"
              >
                <span class="flex items-center justify-center rounded-full bg-white/20 p-1 md:p-1.5">
                  <svg v-if="detectedPlatform === 'windows'" class="h-4 w-4 text-white md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 4.6 10.7 3.5v7.3H3V4.6Zm8.8-1.3L21 2v8.8h-9.2V3.3ZM3 12h7.7v7.3L3 18.2V12Zm8.8 0H21v8.8l-9.2-1.3V12Z" />
                  </svg>
                  <svg v-else class="h-4 w-4 text-white md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.2 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6 0 0-2.5-1-2.5-3.3ZM14 5.6c.6-.8 1.1-1.8 1-2.9-1 .1-2.1.7-2.8 1.4-.6.7-1.1 1.7-1 2.7 1.1.1 2.1-.5 2.8-1.2Z" />
                  </svg>
                </span>
                <span class="text-xs font-normal md:text-sm">{{ heroDownloadLabel }}</span>
              </button>
            </div>
          </nav>

          <div class="flex w-full max-w-4xl flex-col items-center px-6 pt-8 text-center">
            <div data-reveal="up-xs" class="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/60 px-4 py-2 backdrop-blur-md">
              <Sparkles class="h-4 w-4 text-[rgba(30,50,90,0.8)]" />
              <span class="text-[14px] font-normal text-[rgba(30,50,90,0.9)]">Agent Publishing</span>
            </div>
            <h1 class="hero-title hero-title-glass mb-2 text-4xl font-normal leading-[1.05] tracking-tight text-[#5E6470] sm:text-5xl md:text-6xl lg:text-[80px]">
              <span
                v-for="(word, index) in heroTitleWords"
                :key="word"
                class="hero-title-word"
                :style="{ '--word-delay': `${120 + index * 80}ms` }"
              >
                {{ word }}
              </span>
            </h1>
            <p data-reveal="up-sm" style="--reveal-delay: 440ms" class="max-w-xl text-sm font-normal leading-relaxed text-[#5E6470] opacity-80 sm:text-base md:text-lg">
              把选题、资料、AI 起草、排版和发布前整理放进一个流畅工作台。
            </p>

            <div data-reveal="up-xs" style="--reveal-delay: 680ms" class="mt-7 flex flex-wrap justify-center gap-2">
              <span
                v-for="item in heroFacts"
                :key="item"
                class="rounded-full border border-white/25 bg-white/45 px-3 py-1.5 text-xs font-normal text-[rgba(30,50,90,0.72)] backdrop-blur-md"
              >
                {{ item }}
              </span>
            </div>

            <button
              data-reveal="up-xs"
              style="--reveal-delay: 800ms"
              class="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[rgba(30,50,90,0.88)] py-2 pl-2.5 pr-6 text-white shadow-[0_18px_55px_rgba(30,50,90,0.18)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[rgba(30,50,90,1)] active:scale-[0.96]"
              type="button"
              @click="downloadFile(detectedDownloadPlatform)"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/18">
                <svg v-if="detectedPlatform === 'windows'" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 4.6 10.7 3.5v7.3H3V4.6Zm8.8-1.3L21 2v8.8h-9.2V3.3ZM3 12h7.7v7.3L3 18.2V12Zm8.8 0H21v8.8l-9.2-1.3V12Z" />
                </svg>
                <svg v-else class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.2 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6 0 0-2.5-1-2.5-3.3ZM14 5.6c.6-.8 1.1-1.8 1-2.9-1 .1-2.1.7-2.8 1.4-.6.7-1.1 1.7-1 2.7 1.1.1 2.1-.5 2.8-1.2Z" />
                </svg>
              </span>
              <span class="text-sm font-normal md:text-base">{{ heroDownloadLabel }}</span>
            </button>
          </div>

          <div data-reveal="right-sm" style="--reveal-delay: 880ms" class="absolute bottom-28 left-auto right-4 flex w-fit min-w-[140px] flex-col gap-2 rounded-[1.2rem] bg-white/30 p-3 backdrop-blur-xl md:bottom-6 md:left-6 md:right-auto md:min-w-[150px] md:rounded-[1.5rem] md:p-4 lg:bottom-10 lg:left-10 lg:min-w-[180px] lg:gap-3 lg:rounded-[2.2rem] lg:p-5">
            <div class="flex flex-col">
              <span class="text-2xl font-normal tracking-tight text-[rgba(30,50,90,0.9)] md:text-3xl">{{ totalDownloadsText }}</span>
              <span class="text-[10px] font-normal uppercase tracking-wider text-[rgba(30,50,90,0.6)] md:text-[12px]">Total Downloads</span>
            </div>
            <a
              href="https://qm.qq.com/q/nNA64h5d6K"
              target="_blank"
              rel="noopener"
              class="group flex items-center gap-2 self-start rounded-full bg-white py-1.5 pl-1.5 pr-5 transition-all duration-200 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
            >
              <span class="flex items-center justify-center rounded-full bg-[rgba(30,50,90,0.1)] p-1">
                <ArrowUpRight class="h-4 w-4 text-[rgba(30,50,90,0.9)]" />
              </span>
              <span class="text-[14px] font-normal text-[rgba(30,50,90,0.9)]">加入社群</span>
            </a>
          </div>

          <div data-reveal="up-sm" style="--reveal-delay: 980ms" class="absolute bottom-0 right-0 flex items-center gap-3 rounded-tl-[1.5rem] bg-[#f0f0f0] p-3 pl-8 pt-5 sm:gap-4 sm:rounded-tl-[2rem] sm:p-4 sm:pl-10 sm:pt-6 md:gap-6 md:rounded-tl-[3.5rem] md:p-6 md:pl-14 md:pt-8">
            <div class="pointer-events-none absolute -top-[1.5rem] right-0 h-[1.5rem] w-[1.5rem] sm:-top-[2rem] sm:h-[2rem] sm:w-[2rem] md:-top-[3.5rem] md:h-[3.5rem] md:w-[3.5rem]">
              <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/></svg>
            </div>
            <div class="pointer-events-none absolute bottom-0 -left-[1.5rem] h-[1.5rem] w-[1.5rem] sm:-left-[2rem] sm:h-[2rem] sm:w-[2rem] md:-left-[3.5rem] md:h-[3.5rem] md:w-[3.5rem]">
              <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/></svg>
            </div>

            <router-link
              to="/documentation"
              aria-label="打开使用文档"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(30,50,90,0.1)] bg-[rgba(30,50,90,0.05)] md:h-14 md:w-14"
            >
              <ArrowUpRight class="h-5 w-5 text-[rgba(30,50,90,0.8)] md:h-6 md:w-6" />
            </router-link>
            <div class="pr-1">
              <h2 class="text-[16px] font-normal text-[rgba(30,50,90,0.95)] md:text-[20px]">使用文档</h2>
              <router-link to="/documentation" class="flex items-center gap-1 text-[rgba(30,50,90,0.6)] transition-colors hover:text-[rgba(30,50,90,0.8)]">
                <span class="text-[12px] font-normal md:text-[15px]">快速开始</span>
                <ChevronRight class="h-4 w-4" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="home-section scroll-mt-28">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="00" title="一个 Agent 工作台，而不是一堆按钮" description="Welight 的页面重点从单点排版能力，转向公众号创作流程里的判断、生成、预览和交付。" />
        </div>

        <div class="mt-10 grid gap-4">
          <article
            v-for="(area, index) in workspaces"
            :key="area.title"
            data-reveal="up-sm"
            class="glass-row"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
          >
            <div class="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr]">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#1B365D] dark:text-[#D0DCE9]">{{ area.kicker }}</p>
                <h3 class="mt-2 text-xl md:text-2xl font-semibold tracking-normal text-[#1B365D] dark:text-[#D0DCE9]">{{ area.title }}</h3>
              </div>
              <div>
                <p class="text-pretty text-base leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ area.description }}</p>
                <ul class="mt-4 space-y-1.5 text-sm text-[#3D3D3A] dark:text-[#d6d1c4]">
                  <li v-for="point in area.points" :key="point" class="flex gap-2">
                    <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1B365D] dark:bg-[#f5f4ed]"></span>
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="workflow" class="home-section scroll-mt-28">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="01" title="从想法到公众号后台，只走一条线" description="Agent 负责把上下文、生成步骤和工具调用串起来，你在每个关键节点做选择。" />
        </div>

        <div class="mt-10 grid gap-4">
          <article
            v-for="(step, index) in workflowSteps"
            :key="step.title"
            data-reveal="up-xs"
            class="glass-row"
            :style="{ '--reveal-delay': `${index * 70}ms` }"
          >
            <div class="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr]">
              <div>
                <span class="tabular-nums text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6a64] dark:text-[#D0DCE9]">Step 0{{ index + 1 }}</span>
                <h3 class="mt-1 text-xl md:text-2xl font-semibold tracking-normal text-[#1B365D] dark:text-[#D0DCE9]">{{ step.title }}</h3>
              </div>
              <div>
                <p class="text-pretty text-base leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ step.description }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="ai" class="home-section scroll-mt-28">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="02" title="过程透明，创作可控" description="创作过程保留可读的中间结果：会话、任务步骤、工具调用、联网搜索、记忆和工作空间。" />
        </div>

        <div class="mt-10 grid gap-4">
          <article
            v-for="(capability, index) in agentCapabilities"
            :key="capability.title"
            data-reveal="left-sm"
            class="glass-row"
            :style="{ '--reveal-delay': `${index * 75}ms` }"
          >
            <div class="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr]">
              <div>
                <h3 class="text-xl md:text-2xl font-semibold tracking-normal text-[#1B365D] dark:text-[#D0DCE9]">{{ capability.title }}</h3>
              </div>
              <div>
                <p class="text-pretty text-base leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ capability.description }}</p>
              </div>
            </div>
          </article>
        </div>

        <div data-reveal="up-xs" class="glass-panel mt-12 px-5 py-6 text-center md:px-8">
          <p class="text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#1B365D] dark:text-[#D0DCE9]">
            模型和服务可按需配置
          </p>
          <div class="mt-5 flex flex-wrap justify-center gap-3">
            <span
              v-for="(model, index) in modelSupport"
              :key="model"
              data-reveal="up-xs"
              class="rounded-full bg-white/60 px-3 py-1.5 text-sm text-[#3D3D3A] shadow-[0_0_0_1px_rgba(30,50,90,0.06)] backdrop-blur-md dark:text-[#d6d1c4]"
              :style="{ '--reveal-delay': `${index * 35}ms` }"
            >
              {{ model }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section id="principles" class="home-section scroll-mt-28">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="03" title="Welight 的产品边界" description="Agent 可以帮你推进，但不会把每一步都变成不可控的自动化。" />
        </div>
        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <article
            v-for="(principle, index) in principles"
            :key="principle.title"
            data-reveal="up-sm"
            class="glass-panel p-6 md:p-7"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
          >
            <h3 class="text-xl font-semibold text-[#1B365D] dark:text-[#D0DCE9]">{{ principle.title }}</h3>
            <p class="mt-3 text-pretty text-sm leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ principle.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="compare" class="home-section scroll-mt-28">
      <div class="mx-auto max-w-6xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="04" title="同类产品怎么选" description="公众号排版工具各有侧重。这里按公开信息整理常见选择，帮助你判断 Welight 适合放在工作流里的哪个位置。" />
        </div>

        <div data-reveal="up-sm" class="glass-panel mt-10 overflow-hidden">
          <div class="hidden md:grid md:grid-cols-[0.95fr_1.05fr_1.15fr_1.15fr_1fr] border-b border-white/35 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(30,50,90,0.62)] dark:border-white/10 dark:text-[#D0DCE9]">
            <span>产品</span>
            <span>价格/收费方式</span>
            <span>更适合</span>
            <span>主要特点</span>
            <span>与 Welight 的区别</span>
          </div>
          <article
            v-for="(item, index) in competitorComparisons"
            :key="item.name"
            data-reveal="up-xs"
            class="grid gap-4 border-b border-white/35 px-5 py-5 last:border-b-0 md:grid-cols-[0.95fr_1.05fr_1.15fr_1.15fr_1fr] md:px-6 dark:border-white/10"
            :style="{ '--reveal-delay': `${index * 65}ms` }"
          >
            <div>
              <span class="text-lg font-semibold text-[rgba(30,50,90,0.95)] dark:text-[#D0DCE9]">
                {{ item.name }}
              </span>
              <p class="mt-1 text-xs text-[#6b6a64] dark:text-[#d6d1c4]">{{ item.type }}</p>
            </div>
            <p class="text-sm leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ item.pricing }}</p>
            <p class="text-sm leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ item.bestFor }}</p>
            <p class="text-sm leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ item.strength }}</p>
            <p class="text-sm leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ item.difference }}</p>
          </article>
        </div>

        <p data-reveal="up-xs" class="mt-4 text-xs leading-6 text-[#6b6a64] dark:text-[#d6d1c4]">
          注：对比基于各产品官网公开介绍整理，价格、权益和功能会变化，最终以对应官网展示为准。
        </p>
      </div>
    </section>

    <section id="pricing" class="home-section scroll-mt-28">
      <div class="mx-auto max-w-5xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="05" title="完整授权" description="仅需 26 元，一次付费即可解锁全部功能。" />
        </div>

        <div data-reveal="up-sm" class="glass-pricing mx-auto mt-12 max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#1B365D] dark:text-[#D0DCE9]">License</p>
          <div class="mt-5 tabular-nums text-6xl font-light leading-none md:text-8xl">26 元</div>
          <a
            :href="checkoutUrl"
            class="mx-auto mt-7 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-[rgba(30,50,90,0.88)] px-6 py-3 text-base font-semibold text-[#f5f4ed] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[rgba(30,50,90,1)] active:scale-[0.96] dark:bg-[#f5f4ed] dark:text-[#142947] dark:hover:bg-[#E4ECF5]"
          >
            请作者喝一杯瑞幸美式
          </a>
          <p class="mx-auto mt-6 max-w-lg text-pretty text-sm leading-7 text-[#504e49] dark:text-[#d6d1c4]">
            固定价格 26 元。终身更新 · 2 台设备 / 许可证 · 支持银行卡、Apple Pay、<span class="font-medium text-[#08ca64]">微信</span>等。
          </p>
        </div>
      </div>
    </section>

    <section id="faq" class="home-section scroll-mt-28">
      <div class="mx-auto max-w-4xl">
        <div data-reveal="up-xs">
          <SectionHeader eyebrow="06" title="常见问题" description="尽量用短答案回答真实购买和使用前会遇到的问题。" />
        </div>
        <div data-reveal="up-sm" class="mt-10 grid gap-3">
          <details v-for="(item, index) in faqs" :key="item.question" class="glass-faq group" data-reveal="up-xs" :style="{ '--reveal-delay': `${index * 45}ms` }">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold">
              {{ item.question }}
              <span class="text-xl font-light text-[#6b6a64] transition-transform group-open:rotate-45 dark:text-[#D0DCE9]">+</span>
            </summary>
            <p class="mt-4 text-pretty text-sm leading-7 text-[#504e49] dark:text-[#d6d1c4]">{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineComponent, h, ref, computed, onMounted, onUnmounted } from 'vue'
import { handleDownload, initializeDownloadStats, getDownloadStats } from '@/services/downloadStats'
import { useSEO, seoConfigs } from '@/composables/useSEO'
import { buildDodoCheckoutUrl } from '@/services/dodoPaymentsService.js'
import { ArrowUpRight, ChevronRight, Download as DownloadIcon, Sparkles } from 'lucide-vue-next'

useSEO(seoConfigs.home)

const SectionHeader = defineComponent({
  props: {
    eyebrow: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  setup(props) {
    return () =>
      h('div', { class: 'section-heading max-w-3xl text-left' }, [
        h('p', { class: 'tabular-nums text-sm font-normal text-[rgba(30,50,90,0.62)] dark:text-[#D0DCE9]' }, props.eyebrow),
        h('h2', { class: 'mt-3 text-balance text-3xl font-normal tracking-tight text-[rgba(30,50,90,0.95)] md:text-4xl dark:text-[#D0DCE9]' }, props.title),
        h('p', { class: 'mt-5 max-w-2xl text-pretty text-base leading-7 text-[#5E6470] dark:text-[#d6d1c4]' }, props.description)
      ])
  }
})

const revealRoot = ref(null)
const revealMotionReady = ref(false)
const detectedPlatform = ref('mac')
let revealObserver = null

const checkoutUrl = buildDodoCheckoutUrl({ quantity: 1 })

const heroNavItems = [
  { href: '#features', label: '功能' },
  { href: '#workflow', label: '工作流', hasDropdown: true },
  { href: '#ai', label: 'AI 创作' },
  { href: '#compare', label: '对比' },
  { href: '#pricing', label: '定价' },
  { href: '#faq', label: 'FAQ', hasDropdown: true }
]

const heroTitleWords = ['一句话', '一篇文章', '远不止于此']

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

const competitorComparisons = [
  {
    name: 'Welight',
    type: 'AI 公众号创作工作台',
    pricing: '26 元一次性授权；AI 模型、图床等服务可自配。',
    bestFor: '把选题、资料、AI 起草、排版和发布前整理放进一个流畅工作台。',
    strength: '桌面端写作环境、Agent 工作流、主题预览、模型和服务可配置。',
    difference: '不是模板素材站，也不是后台插件，更偏发布前的完整创作工作台。'
  },
  {
    name: '秀米 XIUMI',
    type: '图文排版 / H5 设计平台',
    pricing: 'Lv1会员10元/月。',
    bestFor: '适合需要大量模板、组件和可视化样式编排的运营场景。',
    strength: '公开介绍重点覆盖公众号图文排版、H5、模板和视觉化内容制作。',
    difference: 'Welight 更偏写作前后端流程：AI 起草、Markdown、预览、素材和发布前处理。'
  },
  {
    name: '135编辑器',
    type: '公众号排版编辑器',
    pricing: '个人超级会员 75 元/月起；企业基础版 3390 元/年。',
    bestFor: '适合重度依赖公众号样式库、热点模板和运营素材的团队。',
    strength: '公开介绍强调公众号图文排版、素材模板、SVG 互动和运营相关能力。',
    difference: 'Welight 不以模板库为核心，而是把创作、AI 协作和可控工作流放在前面。'
  },
  {
    name: 'Markdown Nice',
    type: 'Markdown 排版工具',
    pricing: '高级会员 98 元/年。',
    bestFor: '适合已经用 Markdown 写作，想快速转换到公众号样式的作者。',
    strength: '公开介绍侧重 Markdown 编辑、代码块、公式、主题和多平台排版适配。',
    difference: 'Welight 同样支持 Markdown，但进一步把 AI、资料整理和桌面端工作区串起来。'
  },
  {
    name: '壹伴助手',
    type: '公众号运营浏览器插件',
    pricing: '会员 360 元/年起。',
    bestFor: '适合直接在公众号后台运营，多账号管理、数据查看和辅助发布的场景。',
    strength: '公开介绍偏向浏览器插件形态，围绕公众号后台增强和运营效率。',
    difference: 'Welight 更像发布前的独立创作工作台，而不是公众号后台插件。'
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
    question: '许可证怎么激活？',
    answer: '购买许可证后在应用内按提示激活，固定价格 26 元，最终税费与可用支付方式以支付页面展示为准。'
  },
  {
    question: 'Welight 5.0 版本注意事项',
    answer: '5.0 版本进行了非常大的改动，包括支付授权，之前购买过许可证的用户可能需要重新激活，若许可证激活失败，请通过 QQ 群联系我进行处理。'
  },
  {
    question: '新版本还支持积分吗？',
    answer: '5.0 新版本开始不再提供积分机制，用户需要自备 AI 模型所需的密钥进行配置使用。'
  }
]

const downloadStats = ref({})
const backendStats = ref(null)
const totalDownloads = computed(() => {
  if (backendStats.value?.totalDownloads !== undefined) return backendStats.value.totalDownloads
  return Object.values(downloadStats.value).reduce((sum, count) => sum + (Number(count) || 0), 0)
})
const totalDownloadsText = computed(() => {
  const value = Number(totalDownloads.value || 0)
  if (!value) return '10K+'
  if (value >= 10000) return `${(value / 10000).toFixed(value >= 100000 ? 0 : 1)}W+`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K+`
  return `${value}+`
})
const detectedPlatformLabel = computed(() => (detectedPlatform.value === 'windows' ? 'Windows' : 'Mac'))
const detectedDownloadPlatform = computed(() => (
  detectedPlatform.value === 'windows' ? 'windows-installer' : 'macos-apple'
))
const heroDownloadLabel = computed(() => `下载${detectedPlatformLabel.value}版`)

function detectUserPlatform() {
  if (typeof window === 'undefined') return

  const userAgentDataPlatform = navigator.userAgentData?.platform || ''
  const legacyPlatform = navigator.platform || ''
  const userAgent = navigator.userAgent || ''
  const platformSource = `${userAgentDataPlatform} ${legacyPlatform} ${userAgent}`.toLowerCase()

  detectedPlatform.value = platformSource.includes('win') ? 'windows' : 'mac'
}

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
  detectUserPlatform()
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
.home-page {
  background:
    radial-gradient(circle at 14% 18%, rgba(255, 255, 255, 0.95), transparent 30rem),
    radial-gradient(circle at 85% 38%, rgba(208, 220, 233, 0.5), transparent 28rem),
    #f0f0f0;
}

.home-motion-bg,
.home-motion-wash {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.home-motion-bg {
  z-index: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.86), transparent 24rem),
    radial-gradient(circle at 82% 24%, rgba(208, 220, 233, 0.54), transparent 26rem),
    radial-gradient(circle at 44% 76%, rgba(30, 50, 90, 0.13), transparent 24rem),
    linear-gradient(115deg, #f3f4f2 0%, #e8edf2 45%, #f8f7f2 100%);
}

.home-motion-bg::before,
.home-motion-bg::after {
  content: '';
  position: absolute;
  inset: -22%;
  opacity: 0.72;
  will-change: transform;
}

.home-motion-bg::before {
  background:
    radial-gradient(circle at 20% 35%, rgba(255, 255, 255, 0.92), transparent 18rem),
    radial-gradient(circle at 76% 40%, rgba(30, 50, 90, 0.12), transparent 22rem),
    radial-gradient(circle at 46% 72%, rgba(208, 220, 233, 0.52), transparent 20rem);
  animation: home-bg-drift 22s ease-in-out infinite alternate;
}

.home-motion-bg::after {
  background:
    linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.42) 28%, transparent 54%),
    radial-gradient(circle at 62% 18%, rgba(255, 255, 255, 0.5), transparent 18rem);
  mix-blend-mode: screen;
  animation: home-bg-sweep 18s ease-in-out infinite alternate;
}

.home-motion-wash {
  z-index: 1;
  background:
    radial-gradient(circle at 50% 8%, rgba(255, 255, 255, 0.76), transparent 28rem),
    linear-gradient(180deg, rgba(240, 240, 240, 0.72) 0%, rgba(240, 240, 240, 0.5) 34%, rgba(240, 240, 240, 0.82) 100%);
}

.home-section {
  position: relative;
  z-index: 10;
  padding: 5rem 1rem;
  background: transparent;
}

.home-section::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.42), transparent 24rem),
    radial-gradient(circle at 90% 45%, rgba(30, 50, 90, 0.045), transparent 26rem),
    linear-gradient(180deg, rgba(240, 240, 240, 0.08), rgba(240, 240, 240, 0.24));
  backdrop-filter: blur(1px);
}

.home-section > div {
  position: relative;
  z-index: 1;
}

.section-heading {
  border-radius: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.34),
    0 18px 60px rgba(30, 50, 90, 0.06);
  backdrop-filter: blur(18px);
}

.glass-panel,
.glass-row,
.glass-pricing,
.glass-faq {
  background: rgba(255, 255, 255, 0.52);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.45),
    0 18px 60px rgba(30, 50, 90, 0.08);
  backdrop-filter: blur(20px);
}

.glass-row {
  border-radius: 2rem;
  padding: 1.25rem;
  transition:
    transform 220ms cubic-bezier(0.2, 0, 0, 1),
    box-shadow 220ms cubic-bezier(0.2, 0, 0, 1),
    background-color 220ms cubic-bezier(0.2, 0, 0, 1);
}

.glass-row:hover {
  transform: translate3d(0, -2px, 0);
  background: rgba(255, 255, 255, 0.58);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.56),
    0 24px 70px rgba(30, 50, 90, 0.11);
}

.glass-panel {
  border-radius: 2rem;
}

.glass-pricing {
  border-radius: 2.5rem;
  padding: 2rem 1.25rem;
}

.glass-faq {
  border-radius: 1.5rem;
  padding: 1.25rem 1.5rem;
}

.hero-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  column-gap: 0.18em;
  row-gap: 0.08em;
  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', serif;
}

.hero-title-glass {
  justify-content: center;
  font-family:
    'Helvetica Neue',
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    ui-sans-serif,
    system-ui,
    sans-serif;
}

.hero-shell {
  isolation: isolate;
}

:global(.dark) .home-page {
  background: #141413;
}

:global(.dark) .home-section {
  background: transparent;
}

:global(.dark) .home-motion-wash {
  background:
    radial-gradient(circle at 50% 8%, rgba(20, 20, 19, 0.34), transparent 28rem),
    linear-gradient(180deg, rgba(20, 20, 19, 0.82) 0%, rgba(20, 20, 19, 0.62) 42%, rgba(20, 20, 19, 0.9) 100%);
}

:global(.dark) .home-section::before {
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.06), transparent 24rem),
    radial-gradient(circle at 90% 45%, rgba(208, 220, 233, 0.08), transparent 26rem);
}

:global(.dark) .section-heading,
:global(.dark) .glass-panel,
:global(.dark) .glass-row,
:global(.dark) .glass-pricing,
:global(.dark) .glass-faq {
  background: rgba(48, 48, 46, 0.62);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 22px 70px rgba(0, 0, 0, 0.28);
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
  box-shadow:
    0 0 0 1px rgba(27, 54, 93, 0.18),
    0 6px 28px rgba(20, 20, 19, 0.06);
}

:global(.dark) .motion-card:hover,
:global(.dark) .reveal-ready .motion-card.is-revealed:hover {
  box-shadow:
    0 0 0 1px rgba(245, 244, 237, 0.14),
    0 8px 28px rgba(0, 0, 0, 0.28);
}

@keyframes hero-word-rise {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
}

@keyframes home-bg-drift {
  from {
    transform: translate3d(-2%, -1%, 0) scale(1);
  }

  to {
    transform: translate3d(3%, 2%, 0) scale(1.04);
  }
}

@keyframes home-bg-sweep {
  from {
    transform: translate3d(-4%, 2%, 0) rotate(-2deg);
  }

  to {
    transform: translate3d(5%, -2%, 0) rotate(2deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-motion-bg::before,
  .home-motion-bg::after {
    animation: none;
  }

  .home-motion-wash {
    background:
      radial-gradient(circle at 16% 12%, rgba(255, 255, 255, 0.82), transparent 30rem),
      radial-gradient(circle at 86% 34%, rgba(208, 220, 233, 0.45), transparent 30rem),
      #f0f0f0;
  }

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

@media (min-width: 768px) {
  .home-section {
    padding: 7rem 1.5rem;
  }

  .section-heading {
    padding: 2rem;
  }

  .glass-row {
    padding: 1.75rem;
  }

  .glass-pricing {
    padding: 3rem;
  }
}
</style>
