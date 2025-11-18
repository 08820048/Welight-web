<template>
  <div class="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
    <div
      v-for="(card, index) in displayCards"
      :key="index"
      :class="cn(
        'relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-gray-100/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white after:to-transparent after:content-[\'\'] hover:border-gray-300 hover:bg-gray-100 [&>*]:flex [&>*]:items-center [&>*]:gap-2',
        card.className
      )">
      <div>
        <span class="relative inline-block rounded-full bg-gray-900 p-1">
          <component :is="card.icon" class="size-4 text-white" />
        </span>
        <p :class="cn('text-lg font-medium', card.titleClassName)">{{ card.title }}</p>
      </div>
      <p class="whitespace-nowrap text-lg text-gray-700">{{ card.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const defaultCards = [
  {
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
]

const displayCards = computed(() => {
  if (props.cards.length > 0) {
    return props.cards.map((card, index) => ({
      ...defaultCards[index % defaultCards.length],
      ...card
    }))
  }
  return defaultCards
})
</script>

