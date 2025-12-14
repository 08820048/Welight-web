<template>
  <div class="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
    <div
      v-for="(card, index) in displayCards"
      :key="index"
      :class="cn(
        'relative flex min-h-[10rem] w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-100/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white after:to-transparent dark:after:from-gray-900 after:content-[\'\'] hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
        card.className
      )">
      <!-- 玻璃风格的加号图标（带圆形外圈） -->
      <button
        @click.stop="toggleDetail(index)"
        class="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 shadow-sm text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white hover:shadow-md transition-all duration-200 w-8 h-8 group z-20">
        <!-- 圆形外圈 -->
        <span class="absolute inset-[3px] rounded-full border border-white/80 dark:border-white/30 opacity-80"></span>
        <!-- 加号图标 -->
        <svg
          class="relative z-10 w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <div class="flex items-center gap-2">
        <span class="relative inline-block rounded-full bg-gray-900 dark:bg-gray-700 p-1 shrink-0">
          <component :is="card.icon" class="size-4 text-white" />
        </span>
        <p :class="cn('text-lg font-medium text-gray-900 dark:text-gray-100', card.titleClassName)">{{ card.title }}</p>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{{ card.description }}</p>

    </div>

    <!-- 全屏居中模态框 -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div
          v-if="expandedCard !== null"
          @click="toggleDetail(null)"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <!-- 详情卡片 -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-90 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-2">
            <!-- 浮窗里的卡片：板正展示，不带斜角 -->
            <div
              v-if="expandedCard !== null"
              @click.stop
              class="relative flex min-h-[10rem] w-[26rem] select-none flex-col justify-between
                     rounded-2xl border border-white/15 bg-white/10 px-6 py-5
                     shadow-[0_30px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl
                     before:pointer-events-none before:absolute before:inset-0 before:rounded-[1.1rem]
                     before:border before:border-white/20 before:bg-gradient-to-br
                     before:from-white/15 before:to-transparent before:opacity-80
                     before:[mask-image:radial-gradient(circle_at_top,_white,_transparent_65%)]">
              <!-- 关闭按钮 -->
              <button
                @click.stop="closeDetail()"
                class="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full
                       bg-black/70 text-white/70 hover:text-white hover:bg-black/80 text-xs transition-colors">
                ×
              </button>

              <!-- 顶部：圆形图标 + 标题（和主卡片同款排布） -->
              <div class="flex items-center gap-2">
                <span class="relative inline-block rounded-full bg-black/80 p-1 shrink-0">
                  <component :is="displayCards[expandedCard]?.icon" class="size-4 text-white" />
                </span>
                <p
                  :class="cn(
                    'text-lg md:text-xl font-medium text-white',
                    displayCards[expandedCard]?.titleClassName
                  )">
                  {{ displayCards[expandedCard]?.title }}
                </p>
              </div>

              <!-- 中间：完整描述文案（不再截断，保留换行），高对比白字 -->
              <p class="text-sm md:text-base leading-relaxed text-slate-200 whitespace-pre-line">
                {{ displayCards[expandedCard]?.description }}
              </p>

              <!-- 底部：可选的副标题/时间，略淡一点的白字 -->
              <p v-if="displayCards[expandedCard]?.date" class="text-xs text-slate-300/80">
                {{ displayCards[expandedCard]?.date }}
              </p>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})

const expandedCard = ref(null)

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const toggleDetail = (index) => {
  expandedCard.value = index
}

const closeDetail = () => {
  expandedCard.value = null
}

const defaultCards = [
  {
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
]

const displayCards = computed(() => {
  if (props.cards.length > 0) {
    return props.cards.map((card, index) => ({
      ...defaultCards[index % defaultCards.length],
      ...card
    }))
  }
  return defaultCards
})
</script>
