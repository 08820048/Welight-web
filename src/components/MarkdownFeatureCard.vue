<template>
  <div class="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 h-full">
    <!-- Card 1 - Back -->
    <div
      class="relative w-full h-full -skew-y-[4deg] select-none rounded-xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-6 transition-all duration-700 [grid-area:stack] hover:-translate-y-4 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0">
      <div class="flex flex-col h-full">
        <div class="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 shrink-0">
          <component :is="icon" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ title }}</h3>
        <ul class="space-y-2 text-gray-600 flex-1">
          <li v-for="(item, index) in features" :key="index" class="flex items-center">
            <span class="w-2 h-2 bg-gray-900 rounded-full mr-3 shrink-0"></span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Card 2 - Middle -->
    <div
      class="relative w-full h-full -skew-y-[4deg] select-none rounded-xl border-2 border-gray-200 bg-gray-100/70 backdrop-blur-sm p-6 transition-all duration-700 [grid-area:stack] translate-x-4 translate-y-3 hover:translate-y-0 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0">
      <div class="flex flex-col h-full">
        <div class="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 shrink-0">
          <component :is="icon" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ title }}</h3>
        <ul class="space-y-2 text-gray-600 flex-1">
          <li v-for="(item, index) in features" :key="index" class="flex items-center">
            <span class="w-2 h-2 bg-gray-900 rounded-full mr-3 shrink-0"></span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Card 3 - Front -->
    <div
      class="relative w-full h-full -skew-y-[4deg] select-none rounded-xl border-2 border-gray-200 bg-white backdrop-blur-sm p-6 transition-all duration-700 [grid-area:stack] translate-x-8 translate-y-6 hover:translate-y-3">
      <div class="flex flex-col h-full">
        <div class="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 shrink-0">
          <component :is="icon" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ title }}</h3>
        <ul class="space-y-2 text-gray-600 flex-1">
          <li v-for="(item, index) in features" :key="index" class="flex items-center">
            <span class="w-2 h-2 bg-gray-900 rounded-full mr-3 shrink-0"></span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    required: true
  }
})
</script>

