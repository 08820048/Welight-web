<template>
  <p ref="containerRef" :class="cn('flex flex-wrap leading-relaxed', containerClassName)">
    <span
      v-for="(word, i) in words"
      :key="i"
      class="mr-2 mb-2"
      :class="wordClassName"
      :style="{
        opacity: 0.2 + ((wordOpacities[i] || 0) * 0.8),
        transition: 'opacity 0.3s ease-in-out'
      }"
    >
      {{ word }}
    </span>
  </p>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  containerClassName: {
    type: String,
    default: 'p-4'
  },
  wordClassName: {
    type: String,
    default: 'text-lg md:text-xl lg:text-2xl font-medium text-gray-900'
  },
  // Scroll offset configuration
  startOffset: {
    type: String,
    default: 'start 0.9'
  },
  endOffset: {
    type: String,
    default: 'start 0.25'
  }
})

const containerRef = ref(null)
const wordOpacities = ref({})
const words = computed(() => props.text.split(' '))

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const updateOpacities = () => {
  if (!containerRef.value) return

  const container = containerRef.value
  const rect = container.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Calculate scroll progress based on element position
  // When element enters viewport (0.9) to when it reaches 0.25 of viewport
  const startPoint = windowHeight * 0.9
  const endPoint = windowHeight * 0.25
  
  const elementTop = rect.top
  
  // Calculate overall progress (0 to 1)
  let progress = 0
  if (elementTop <= startPoint && elementTop >= endPoint) {
    progress = (startPoint - elementTop) / (startPoint - endPoint)
  } else if (elementTop < endPoint) {
    progress = 1
  }

  // Update each word's opacity based on progress
  const totalWords = words.value.length
  const newOpacities = {}
  
  words.value.forEach((word, i) => {
    const wordStart = i / totalWords
    const wordEnd = wordStart + (1 / totalWords)
    
    let wordOpacity = 0
    if (progress >= wordStart && progress <= wordEnd) {
      // Word is currently being revealed
      wordOpacity = (progress - wordStart) / (wordEnd - wordStart)
    } else if (progress > wordEnd) {
      // Word has been fully revealed
      wordOpacity = 1
    }
    
    newOpacities[i] = wordOpacity
  })
  
  wordOpacities.value = newOpacities
}

onMounted(() => {
  // Initial calculation
  updateOpacities()
  
  // Add scroll listener
  window.addEventListener('scroll', updateOpacities, { passive: true })
  window.addEventListener('resize', updateOpacities, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateOpacities)
  window.removeEventListener('resize', updateOpacities)
})
</script>

<style scoped>
/* Additional styles if needed */
</style>

