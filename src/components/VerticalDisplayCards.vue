<template>
  <div class="space-y-6">
    <div
      v-for="(feature, index) in features"
      :key="index"
      class="relative group">
      <!-- 叠加卡片容器 -->
      <div class="grid [grid-template-areas:'stack'] relative">
        <!-- Card 1 - Back -->
        <div
          class="relative w-full -skew-y-[2deg] select-none rounded-xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-5 transition-all duration-700 [grid-area:stack] group-hover:-translate-y-3 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] group-hover:before:opacity-0 before:transition-opacity before:duration-700 group-hover:grayscale-0 before:left-0 before:top-0">
          <h4 class="text-base font-semibold text-gray-900 mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-gray-600 leading-relaxed">{{ feature.description }}</p>
        </div>

        <!-- Card 2 - Middle -->
        <div
          class="relative w-full -skew-y-[2deg] select-none rounded-xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-5 transition-all duration-700 [grid-area:stack] translate-x-2 translate-y-2 group-hover:translate-y-0 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] group-hover:before:opacity-0 before:transition-opacity before:duration-700 group-hover:grayscale-0 before:left-0 before:top-0">
          <h4 class="text-base font-semibold text-gray-900 mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-gray-600 leading-relaxed">{{ feature.description }}</p>
        </div>

        <!-- Card 3 - Front -->
        <div
          class="relative w-full -skew-y-[2deg] select-none rounded-xl border-2 border-gray-200 bg-white backdrop-blur-sm p-5 transition-all duration-700 [grid-area:stack] translate-x-4 translate-y-4 group-hover:translate-y-2 z-10">
          <h4 class="text-base font-semibold text-gray-900 mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-gray-600 leading-relaxed">{{ feature.description }}</p>
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

