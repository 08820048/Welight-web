<template>
  <article class="surface-soft group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
    <div class="flex h-full flex-col">
      <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white">
        <component :is="icon" class="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 class="text-balance text-xl font-bold text-gray-900">{{ title }}</h3>
      <ul class="mt-4 flex-1 space-y-2.5 text-sm leading-6 text-gray-600">
        <li v-for="(item, index) in features" :key="index" class="flex items-start gap-3">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
defineProps({
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  features: { type: Array, required: true }
})
</script>
