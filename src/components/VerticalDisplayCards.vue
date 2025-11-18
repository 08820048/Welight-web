<template>
  <div class="space-y-8">
    <div
      v-for="(feature, index) in features"
      :key="index"
      class="relative group">
      <!-- 叠加卡片容器 -->
      <div class="grid [grid-template-areas:'stack'] relative">
        <!-- Card 1 - Back -->
        <div
          class="relative w-full -skew-y-[8deg] select-none rounded-xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 [grid-area:stack] group-hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] group-hover:before:opacity-0 before:transition-opacity before:duration-700 group-hover:grayscale-0 before:left-0 before:top-0 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
          <h4 class="text-lg font-medium text-gray-900 mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">{{ feature.description }}</p>
        </div>

        <!-- Card 2 - Middle -->
        <div
          class="relative w-full -skew-y-[8deg] select-none rounded-xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 [grid-area:stack] translate-x-8 translate-y-5 group-hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] group-hover:before:opacity-0 before:transition-opacity before:duration-700 group-hover:grayscale-0 before:left-0 before:top-0 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
          <h4 class="text-lg font-medium text-gray-900 mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">{{ feature.description }}</p>
        </div>

        <!-- Card 3 - Front -->
        <div
          class="relative w-full -skew-y-[8deg] select-none rounded-xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 [grid-area:stack] translate-x-16 translate-y-10 group-hover:translate-y-5 z-10 hover:border-gray-300 hover:bg-gray-100 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
          <h4 class="text-lg font-medium text-gray-900 mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => item.title && item.description)
    }
  }
})
</script>

