<template>
  <div v-if="mounted"
    class="inline-flex h-9 items-center overflow-hidden rounded-md border border-gray-300 bg-white text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 shadow-sm"
    role="radiogroup">
    <button v-for="(opt, idx) in options" :key="opt.value"
      class="relative flex h-9 w-9 cursor-pointer items-center justify-center transition-colors" :class="[
        idx > 0 ? 'border-l border-gray-200 dark:border-gray-700' : '',
        themeStore.mode === opt.value
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
      ]" role="radio" :aria-checked="themeStore.mode === opt.value" :aria-label="`Switch to ${opt.value} theme`"
      @click="setMode(opt.value)">
      <component :is="opt.icon" class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { MonitorCog, Sun, MoonStar } from 'lucide-vue-next'

const themeStore = useThemeStore()
const mounted = ref(false)

const options = [
  { icon: MonitorCog, value: 'system' },
  { icon: Sun, value: 'light' },
  { icon: MoonStar, value: 'dark' }
]

/**
 * 切换主题模式（system/light/dark），支持 View Transition 漫射动画
 */
async function setMode(value) {
  if (document.startViewTransition) {
    const transition = document.startViewTransition(async () => {
      themeStore.setThemeMode(value)
      await nextTick()
    })
    await transition.ready
    const endRadius = Math.hypot(innerWidth, innerHeight)
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at 0px 0px)`,
          `circle(${endRadius}px at 0px 0px)`
        ]
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  } else {
    themeStore.setThemeMode(value)
  }
}

/**
 * 组件挂载后再渲染，避免 SSR/水合阶段的模式不一致
 */
onMounted(() => {
  mounted.value = true
})
</script>

<style scoped></style>
