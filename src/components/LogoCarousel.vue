<template>
  <div class="flex justify-center">
    <div class="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10 px-2 md:px-0">
      <div v-for="(logo, index) in visibleLogos" :key="logo.id || index"
        class="flex flex-col items-center gap-1 text-center logo-wave" :style="{ animationDelay: `${index * 0.18}s` }">
        <!-- 图片阶段：只显示 logo -->
        <div v-if="phases[index] === 'image'"
          class="relative h-10 w-20 md:h-12 md:w-28 flex items-center justify-center overflow-hidden">
          <Transition mode="out-in" enter-active-class="transition-opacity duration-400 ease-out"
            enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-in" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <img :key="logo.id || index" :src="logo.src" :alt="logo.name"
              class="h-full w-full max-h-[80%] max-w-[80%] object-contain" loading="lazy" />
          </Transition>
        </div>
        <!-- 文本阶段：只显示模型名称 -->
        <p v-else-if="phases[index] === 'text'"
          class="text-[11px] md:text-xs text-gray-500 min-h-[1.25rem] flex items-center justify-center">
          {{ logo.name }}
        </p>
        <!-- 占位，防止高度跳动 -->
        <div v-else class="h-10 md:h-12" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  logos: {
    type: Array,
    default: () => []
  },
  columnCount: {
    type: Number,
    default: 3
  }
})

const currentTime = ref(0)
const phases = ref([])
let timer = null


// 显示所有传入的 logo
const visibleLogos = computed(() => {
  if (!props.logos.length) return []
  return props.logos
})

const cycleInterval = 2600

onMounted(() => {
  // 初始化：所有列都从图片状态开始
  phases.value = visibleLogos.value.map(() => 'image')


  timer = setInterval(() => {
    // 
    currentTime.value += 100

    // 
    phases.value = visibleLogos.value.map((_, index) => {
      const offset = index * (cycleInterval / 2)
      const total = (currentTime.value + offset) % (cycleInterval * 2)
      return total < cycleInterval ? 'image' : 'text'
    })
  }, 100)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})


</script>

<style scoped>
@keyframes logo-wave-bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-6px);
  }

  75% {
    transform: translateY(4px);
  }
}

.logo-wave {
  animation: logo-wave-bounce 2.4s ease-in-out infinite;
}
</style>
