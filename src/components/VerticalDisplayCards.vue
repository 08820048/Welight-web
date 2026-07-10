<template>
  <div class="grid gap-4">
    <article
      v-for="(feature, index) in features"
      :key="index"
      class="surface-soft group p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div class="flex items-start gap-4">
        <span class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-sm font-semibold text-white">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <div>
          <h3 class="text-balance text-lg font-semibold text-gray-900">{{ feature.title }}</h3>
          <p class="mt-2 text-pretty text-sm leading-6 text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true,
    validator: (value) => value.every(item => item.title && item.description)
  }
})
</script>
