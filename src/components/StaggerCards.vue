<template>
  <div class="relative w-full overflow-hidden bg-transparent" :style="{ height: '600px' }">
    <!-- Cards -->
    <div
      v-for="(theme, index) in themesList"
      :key="theme.tempId"
      @click="handleMove(getPosition(index))"
      :class="[
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out',
        getPosition(index) === 0
          ? 'z-10 bg-primary-600 text-white border-primary-600'
          : 'z-0 bg-white text-gray-900 border-gray-200 hover:border-primary-400'
      ]"
      :style="getCardStyle(index)"
    >
      <!-- 右上角装饰线 -->
      <span
        class="absolute block origin-top-right rotate-45 bg-gray-200"
        :style="{
          right: '-2px',
          top: '48px',
          width: `${SQRT_5000}px`,
          height: '2px'
        }"
      />

      <!-- 主题预览图 -->
      <img
        :src="theme.imgSrc"
        :alt="theme.name"
        class="mb-4 w-full h-32 sm:h-40 object-cover"
        :style="{ boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.1)' }"
        loading="lazy"
      />

      <!-- 主题名称 -->
      <h3
        :class="[
          'text-lg sm:text-xl font-bold mb-2',
          getPosition(index) === 0 ? 'text-white' : 'text-gray-900'
        ]"
      >
        {{ theme.name }}
      </h3>

      <!-- 主题描述 -->
      <p
        :class="[
          'text-sm',
          getPosition(index) === 0 ? 'text-white/90' : 'text-gray-600'
        ]"
      >
        {{ theme.description }}
      </p>
    </div>

    <!-- 导航按钮 -->
    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
      <button
        @click="handleMove(-1)"
        class="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-2xl transition-colors bg-white border-2 border-gray-200 hover:bg-primary-600 hover:text-white hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="上一个主题"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="handleMove(1)"
        class="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-2xl transition-colors bg-white border-2 border-gray-200 hover:bg-primary-600 hover:text-white hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="下一个主题"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const SQRT_5000 = Math.sqrt(5000)

const themes = [
  {
    tempId: 0,
    name: '橙心橙意',
    description: '温暖明亮的橙色主题，充满活力与热情',
    imgSrc: 'https://images.waer.ltd/notes/202510192006088.jpg'
  },
  {
    tempId: 1,
    name: '浮云山居',
    description: '清新自然的绿色主题，宁静致远',
    imgSrc: 'https://images.waer.ltd/notes/202510192005728.jpg'
  },
  {
    tempId: 2,
    name: '极简序列',
    description: '简约现代的灰色主题，专业大气',
    imgSrc: 'https://images.waer.ltd/notes/202510192005760.jpg'
  },
  {
    tempId: 3,
    name: '诗意简约',
    description: '优雅文艺的主题，诗意盎然',
    imgSrc: 'https://images.waer.ltd/notes/202510192005773.jpg'
  },
  {
    tempId: 4,
    name: '赤焰丹心',
    description: '热烈奔放的红色主题，激情四溢',
    imgSrc: 'https://images.waer.ltd/notes/202510192005663.jpg'
  },
  {
    tempId: 5,
    name: '童趣彩虹',
    description: '活泼可爱的彩色主题，童趣满满',
    imgSrc: 'https://images.waer.ltd/notes/202510192005700.jpg'
  }
]

const cardSize = ref(365)
const themesList = ref([...themes])

const getPosition = (index) => {
  const length = themesList.value.length
  return length % 2
    ? index - (length + 1) / 2
    : index - length / 2
}

const getCardStyle = (index) => {
  const position = getPosition(index)
  const isCenter = position === 0
  const size = cardSize.value

  return {
    width: `${size}px`,
    height: `${size}px`,
    clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
    transform: `
      translate(-50%, -50%)
      translateX(${(size / 1.5) * position}px)
      translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
      rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
    `,
    boxShadow: isCenter ? '0px 8px 0px 4px rgba(0, 0, 0, 0.1)' : '0px 0px 0px 0px transparent'
  }
}

const handleMove = (steps) => {
  const newList = [...themesList.value]
  if (steps > 0) {
    for (let i = steps; i > 0; i--) {
      const item = newList.shift()
      if (!item) return
      newList.push({ ...item, tempId: Math.random() })
    }
  } else {
    for (let i = steps; i < 0; i++) {
      const item = newList.pop()
      if (!item) return
      newList.unshift({ ...item, tempId: Math.random() })
    }
  }
  themesList.value = newList
}

const updateSize = () => {
  const matches = window.matchMedia('(min-width: 640px)').matches
  cardSize.value = matches ? 365 : 290
}

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})



