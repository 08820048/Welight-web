<template>
  <div class="grid [grid-template-areas:'stack'] opacity-100 animate-in fade-in-0 duration-700" :class="centered ? 'place-items-center' : ''">
    <!-- Card 1 - Back -->
    <div
      :class="['relative w-full select-none rounded-2xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-4 transition-all duration-700 [grid-area:stack] z-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0', maxWidthClass]"
      style="transform: rotateX(4deg) rotateY(-2deg) rotateZ(-5deg) translateY(0);"
      @mouseenter="card1Hover = true"
      @mouseleave="card1Hover = false"
      :style="{ transform: card1Hover ? 'rotateX(4deg) rotateY(-2deg) rotateZ(-5deg) translateY(-1.5rem)' : 'rotateX(4deg) rotateY(-2deg) rotateZ(-5deg) translateY(0)' }">
      <div class="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200">
        <img :src="image1" :alt="alt1" class="w-full h-auto aspect-[15/8]" loading="lazy" />
      </div>
    </div>

    <!-- Card 2 - Middle -->
    <div
      :class="['relative w-full select-none rounded-2xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-4 transition-all duration-700 [grid-area:stack] z-20 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0', maxWidthClass]"
      @mouseenter="card2Hover = true"
      @mouseleave="card2Hover = false"
      :style="{ transform: card2Hover ? 'rotateX(4deg) rotateY(-2deg) rotateZ(-5deg) translateX(2rem) translateY(1rem)' : 'rotateX(4deg) rotateY(-2deg) rotateZ(-5deg) translateX(2rem) translateY(1.5rem)' }">
      <div class="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200">
        <img :src="image2" :alt="alt2" class="w-full h-auto aspect-[15/8]" loading="lazy" />
      </div>
    </div>

    <!-- Card 3 - Front -->
    <div
      :class="['relative w-full select-none rounded-2xl border-2 border-gray-200 bg-white backdrop-blur-sm p-4 transition-all duration-700 [grid-area:stack] z-30', maxWidthClass]"
      @mouseenter="card3Hover = true"
      @mouseleave="card3Hover = false"
      :style="{ transform: card3Hover ? 'rotateX(4deg) rotateY(-2deg) rotateZ(-5deg) translateX(4rem) translateY(2.5rem)' : 'rotateX(4deg) rotateY(-2deg) rotateZ(-5deg) translateX(4rem) translateY(3rem)' }">
      <div class="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200">
        <img :src="image3" :alt="alt3" class="w-full h-auto aspect-[15/8]" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  image3: {
    type: String,
    required: true
  },
  alt1: {
    type: String,
    default: 'Product Image 1'
  },
  alt2: {
    type: String,
    default: 'Product Image 2'
  },
  alt3: {
    type: String,
    default: 'Product Image 3'
  },
  maxWidth: {
    type: String,
    default: '5xl'
  },
  centered: {
    type: Boolean,
    default: true
  }
})

const maxWidthClass = computed(() => {
  return `max-w-${props.maxWidth}`
})

const card1Hover = ref(false)
const card2Hover = ref(false)
const card3Hover = ref(false)
</script>

