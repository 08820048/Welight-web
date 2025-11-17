<template>
  <svg
    ref="containerRef"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 h-full w-full"
    style="z-index: 0;"
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
          stroke="rgba(156, 163, 175, 0.2)"
          :stroke-dasharray="strokeDasharray"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
    <g>
      <rect
        v-for="(square, index) in squares"
        :key="`${square.pos[0]}-${square.pos[1]}-${index}`"
        :width="width - 1"
        :height="height - 1"
        :x="square.pos[0] * width + 1"
        :y="square.pos[1] * height + 1"
        fill="rgba(59, 130, 246, 0.5)"
        stroke-width="0"
        class="animated-square"
        :style="{
          animation: `fadeInOut ${duration}s ease-in-out ${index * 0.1}s infinite`
        }"
        @animationiteration="updateSquarePosition(square.id)"
      />
    </g>
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
  maxOpacity: {
    type: Number,
    default: 0.3
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
  // 初始化尺寸
  if (containerRef.value) {
    dimensions.value = {
      width: containerRef.value.clientWidth,
      height: containerRef.value.clientHeight
    }
  }

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
