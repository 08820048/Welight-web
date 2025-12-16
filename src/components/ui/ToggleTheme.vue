<template>
  <button v-if="mounted" @click="toggleTheme"
    class="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
    :aria-label="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'">
    <Sun v-if="!themeStore.isDark" class="h-5 w-5" />
    <MoonStar v-else class="h-5 w-5" />
  </button>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { Sun, MoonStar } from 'lucide-vue-next'

const themeStore = useThemeStore()
const mounted = ref(false)

/**
 * 切换主题模式（浅色/深色），支持 View Transition 漫射动画
 */
async function toggleTheme() {
  const newMode = themeStore.isDark ? 'light' : 'dark'

  if (document.startViewTransition) {
    const transition = document.startViewTransition(async () => {
      themeStore.setThemeMode(newMode)
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
        duration: 1000,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  } else {
    themeStore.setThemeMode(newMode)
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
