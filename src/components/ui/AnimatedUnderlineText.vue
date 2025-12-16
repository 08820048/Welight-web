<template>
  <div :class="cn('flex flex-col items-center justify-center gap-2', $attrs.class)">
    <div class="relative inline-block">
      <component :is="headingTag"
        :class="cn('text-4xl md:text-5xl font-bold text-center transition-all duration-700 ease-out', titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5', textClassName)"
        @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        {{ text }}
      </component>

      <svg width="100%" height="20" viewBox="0 0 300 20" :class="cn('absolute -bottom-4 left-0', underlineClassName)"
        preserveAspectRatio="none">
        <path ref="pathRef" :d="currentPath" stroke="currentColor" stroke-width="2" fill="none" :style="{
          strokeDasharray: pathLength,
          strokeDashoffset: pathOffset,
          transition: `stroke-dashoffset ${underlineDuration}s ease-in-out, d 0.8s ease-in-out`
        }" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  textClassName: {
    type: String,
    default: ''
  },
  underlineClassName: {
    type: String,
    default: ''
  },
  underlinePath: {
    type: String,
    default: 'M 0,10 Q 75,0 150,10 Q 225,20 300,10'
  },
  underlineHoverPath: {
    type: String,
    default: 'M 0,10 Q 75,20 150,10 Q 225,0 300,10'
  },
  underlineDuration: {
    type: Number,
    default: 1.5
  },
  level: {
    type: Number,
    default: 2,
    validator: (value) => [1, 2, 3, 4, 5, 6].includes(value)
  }
})

const isHovered = ref(false)
const titleVisible = ref(false)
const pathRef = ref(null)
const pathLength = ref(0)
const pathOffset = ref(0)

const currentPath = computed(() => {
  return isHovered.value ? props.underlineHoverPath : props.underlinePath
})

// Utility function for class names (similar to cn from shadcn)
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

/**
 * 计算标题标签名称（h1-h6）
 */
const headingTag = computed(() => {
  return `h${props.level}`
})

/** 启动标题淡入动画 */
function startTitleFadeIn() {
  titleVisible.value = true
}

onMounted(() => {
  if (pathRef.value) {
    const length = pathRef.value.getTotalLength()
    pathLength.value = length
    pathOffset.value = length

    // Animate the path drawing
    setTimeout(() => {
      pathOffset.value = 0
    }, 100)
  }
  // 触发标题淡入
  setTimeout(startTitleFadeIn, 100)
})
</script>

<style scoped>
/* Additional styles if needed */
</style>
