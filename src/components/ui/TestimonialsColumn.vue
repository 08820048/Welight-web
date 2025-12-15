<template>
  <div :class="className">
    <div ref="animatedDiv" class="flex flex-col gap-6 pb-6 bg-transparent animate-scroll" :style="animationStyle">
      <template v-for="(_, index) in 2" :key="index">
        <div v-for="(item, i) in images" :key="`${index}-${i}`"
          class="relative rounded-2xl overflow-hidden bg-transparent dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-sm">
          <div class="absolute inset-0 pointer-events-none hidden dark:block bg-black/20"></div>
          <img :src="item" :alt="`主题截图 ${i + 1}`"
            class="w-full h-auto object-cover transition duration-300 filter dark:brightness-85 dark:contrast-115 dark:saturate-105 dark:mix-blend-multiply"
            loading="lazy" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  duration: {
    type: Number,
    default: 10
  }
})

/** 计算滚动动画持续时间样式 */
const animationStyle = computed(() => ({
  '--scroll-duration': `${props.duration}s`
}))
</script>

<style scoped>
@keyframes testimonials-scroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-50%);
  }
}

.animate-scroll {
  animation-name: testimonials-scroll;
  animation-duration: var(--scroll-duration, 20s);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
