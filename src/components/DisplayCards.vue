<template>
  <div class="grid w-full gap-4 sm:grid-cols-2">
    <article
      v-for="(card, index) in cards"
      :key="index"
      class="surface-soft group relative flex min-h-[10rem] flex-col justify-between p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      <button
        type="button"
        @click.stop="toggleDetail(index)"
        class="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-gray-700 shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-gray-50 active:scale-[0.96]"
        :aria-label="`查看${card.title}详情`"
      >
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <div class="pr-9">
        <div class="flex items-center gap-3">
          <span class="inline-flex shrink-0 rounded-full bg-gray-900 p-2 text-white">
            <component :is="card.icon" class="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 :class="['text-balance text-lg font-semibold text-gray-900', card.titleClassName]">
            {{ card.title }}
          </h3>
        </div>
        <p class="mt-5 text-pretty text-sm leading-6 text-gray-600">{{ card.description }}</p>
      </div>
    </article>
  </div>

  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="expandedCard !== null" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" @click="closeDetail">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" @click.stop>
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="inline-flex rounded-full bg-gray-900 p-2 text-white">
                <component :is="cards[expandedCard]?.icon" class="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 class="text-xl font-semibold text-gray-900">{{ cards[expandedCard]?.title }}</h3>
            </div>
            <button type="button" class="text-2xl leading-none text-gray-400 hover:text-gray-900" @click="closeDetail" aria-label="关闭">×</button>
          </div>
          <p class="mt-6 text-base leading-7 text-gray-600">{{ cards[expandedCard]?.description }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  cards: { type: Array, default: () => [] }
})

const expandedCard = ref(null)
const toggleDetail = (index) => { expandedCard.value = index }
const closeDetail = () => { expandedCard.value = null }
</script>
