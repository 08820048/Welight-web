<template>
  <svg
    ref="containerRef"
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30', className)"
    v-bind="$attrs"
  >
    <defs>
      <pattern
        :id="patternId"
        :width="width"
        :height="height"
        patternUnits="userSpaceOnUse"
        :x="x"
        :y="y"
      >
        <path
          :d="`M.5 ${height}V.5H${width}`"
          fill="none"
          :stroke-dasharray="strokeDasharray"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
    <svg :x="x" :y="y" class="overflow-visible">
      <rect
        v-for="(square, index) in squares"
        :key="`${square.pos[0]}-${square.pos[1]}-${index}`"
        :width="width - 1"
        :height="height - 1"
        :x="square.pos[0] * width + 1"
        :y="square.pos[1] * height + 1"
        fill="currentColor"
        stroke-width="0"
        :style="{
          opacity: 0,
          animation: `fadeInOut ${duration}s ease-in-out ${index * 0.1}s infinite`
        }"
        @animationiteration="updateSquarePosition(square.id)"
      />
    </svg>
  </svg>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 40
  },
  height: {
    type: Number,
    default: 40
  },
  x: {
    type: Number,
    default: -1
  },
  y: {
    type: Number,
    default: -1
  },
  strokeDasharray: {
    type: [Number, String],
    default: 0
  },
  numSquares: {
    type: Number,
    default: 50
  },
  className: {
    type: String,
    default: ''
  },
  maxOpacity: {
    type: Number,
    default: 0.5
  },
  duration: {
    type: Number,
    default: 4
  },
  repeatDelay: {
    type: Number,
    default: 0.5
  }
})

const containerRef = ref(null)
const dimensions = ref({ width: 0, height: 0 })
const squares = ref([])
const patternId = ref(`pattern-${Math.random().toString(36).substr(2, 9)}`)

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const getPos = () => {
  return [
    Math.floor((Math.random() * dimensions.value.width) / props.width),
    Math.floor((Math.random() * dimensions.value.height) / props.height)
  ]
}

const generateSquares = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    pos: getPos()
  }))
}

const updateSquarePosition = (id) => {
  const squareIndex = squares.value.findIndex(sq => sq.id === id)
  if (squareIndex !== -1) {
    squares.value[squareIndex] = {
      ...squares.value[squareIndex],
      pos: getPos()
    }
  }
}

let resizeObserver = null

onMounted(() => {
  // 初始化 ResizeObserver
  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      dimensions.value = {
        width: entry.contentRect.width,
        height: entry.contentRect.height
      }
    }
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value)
  }
})

// 当尺寸变化时重新生成方块
watch(dimensions, (newDimensions) => {
  if (newDimensions.width && newDimensions.height) {
    squares.value = generateSquares(props.numSquares)
  }
}, { deep: true })
</script>

<style scoped>
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: v-bind(maxOpacity);
  }
  100% {
    opacity: 0;
  }
}
</style>
