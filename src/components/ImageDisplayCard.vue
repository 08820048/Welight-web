<template>
  <div class="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
    <!-- Card 1 - Back -->
    <div
      class="relative w-full max-w-4xl -skew-y-[4deg] select-none rounded-2xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-6 transition-all duration-700 [grid-area:stack] hover:-translate-y-8 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 before:z-0 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 after:absolute after:-right-2 after:top-0 after:h-[100%] after:w-full after:bg-gradient-to-l after:from-white after:to-transparent after:content-[''] after:z-0">
      <div class="relative z-10 rounded-xl overflow-hidden shadow-lg">
        <img :src="imageUrl" :alt="alt" class="w-full h-auto" loading="lazy" />
      </div>
    </div>

    <!-- Card 2 - Middle -->
    <div
      class="relative w-full max-w-4xl -skew-y-[4deg] select-none rounded-2xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-6 transition-all duration-700 [grid-area:stack] translate-x-12 translate-y-8 hover:translate-y-0 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 before:z-0 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 after:absolute after:-right-2 after:top-0 after:h-[100%] after:w-full after:bg-gradient-to-l after:from-white after:to-transparent after:content-[''] after:z-0">
      <div class="relative z-10 rounded-xl overflow-hidden shadow-lg">
        <img :src="imageUrl" :alt="alt" class="w-full h-auto" loading="lazy" />
      </div>
    </div>

    <!-- Card 3 - Front -->
    <div
      class="relative w-full max-w-4xl -skew-y-[4deg] select-none rounded-2xl border-2 border-gray-200 bg-white backdrop-blur-sm p-6 transition-all duration-700 [grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-8 after:absolute after:-right-2 after:top-0 after:h-[100%] after:w-full after:bg-gradient-to-l after:from-white after:to-transparent after:content-[''] after:z-0">
      <div class="relative z-10 rounded-xl overflow-hidden shadow-lg">
        <img :src="imageUrl" :alt="alt" class="w-full h-auto" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Feature Image'
  }
})
</script>

