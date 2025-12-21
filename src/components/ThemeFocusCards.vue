<template>
  <div class="max-w-5xl mx-auto w-full">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
      <div
        v-for="(card, index) in cardsToRender"
        :key="card.title || index"
        @mouseenter="setHovered(index)"
        @mouseleave="setHovered(null)"
        :class="cardClass(index)"
      >
        <!-- 背景图片 -->
        <img
          :src="card.src"
          :alt="card.title"
          class="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />

        <!-- 渐变遮罩 & 文本 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="absolute inset-x-4 bottom-4">
          <p class="text-base md:text-lg font-semibold text-white drop-shadow-sm">
            {{ card.title }}
          </p>
          <p v-if="card.description" class="mt-1 text-xs md:text-sm text-gray-200/90 line-clamp-2">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
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

const hovered = ref(null)

const defaultCards = [
  {
    title: '橙心橙意',
    description: '温暖明亮的橙色主题，充满活力与热情',
    src: 'https://images.waer.ltd/notes/202510192006088.jpg'
  },
  {
    title: '浮云山居',
    description: '清新自然的绿色主题，宁静致远',
    src: 'https://images.waer.ltd/notes/202510192005728.jpg'
  },
  {
    title: '极简序列',
    description: '简约现代的灰色主题，专业大气',
    src: 'https://images.waer.ltd/notes/202510192005760.jpg'
  },
  {
    title: '诗意简约',
    description: '优雅文艺的主题，诗意盎然',
    src: 'https://images.waer.ltd/notes/202510192005773.jpg'
  },
  {
    title: '赤焰丹心',
    description: '热烈奔放的红色主题，激情四溢',
    src: 'https://images.waer.ltd/notes/202510192005663.jpg'
  },
  {
    title: '童趣彩虹',
    description: '活泼可爱的彩色主题，童趣满满',
    src: 'https://images.waer.ltd/notes/202510192005700.jpg'
  }
]

const cardsToRender = computed(() => {
  return props.cards.length ? props.cards : defaultCards
})

const cn = (...classes) => classes.filter(Boolean).join(' ')

const setHovered = (index) => {
  hovered.value = index
}

const cardClass = (index) => {
  const base =
    'group relative rounded-2xl overflow-hidden border border-gray-200/80 bg-gray-100/70 backdrop-blur-sm h-60 md:h-80 w-full shadow-md transition-all duration-500 ease-out'
  const blurred = hovered.value !== null && hovered.value !== index
    ? 'opacity-60 scale-[0.98] blur-[1px]'
    : ''
  const active = hovered.value === index ? '-translate-y-1 shadow-xl' : ''
  return cn(base, blurred, active)
}
</script>

