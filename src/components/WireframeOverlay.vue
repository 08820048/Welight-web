<template>
  <!-- 纯装饰性：内容模块四角线框 + 菱形节点 + 可选的向外延伸线条 -->
  <div :class="outerWrapperClass" aria-hidden="true">
    <!-- 背景斜线填充区域 -->
    <div :class="innerInsetClass">
      <div class="absolute inset-0" style="
          background-image: repeating-linear-gradient(
            135deg,
            rgba(147, 197, 253, 0.14) 0,
            rgba(147, 197, 253, 0.14) 1px,
            rgba(147, 197, 253, 0) 1px,
            rgba(147, 197, 253, 0) 7px
          );
        "></div>
    </div>
    <div :class="innerInsetClass">
      <!-- 模块内部的一圈细线，包裹内容区域 -->
      <div class="absolute inset-x-0 top-0 h-px bg-[#cbdcfb] dark:bg-white"></div>
      <div class="absolute inset-x-0 bottom-0 h-px bg-[#cbdcfb] dark:bg-white"></div>
      <div class="absolute inset-y-0 left-0 w-px bg-[#cbdcfb] dark:bg-white"></div>
      <div class="absolute inset-y-0 right-0 w-px bg-[#cbdcfb] dark:bg-white"></div>

      <!-- 四个拐角菱形节点 -->
      <div class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div
          class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] dark:border-white bg-transparent shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>
      <div class="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div
          class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] dark:border-white bg-transparent shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>
      <div class="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 flex items-center justify-center">
        <div
          class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] dark:border-white bg-transparent shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>
      <div class="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 z-10 flex items-center justify-center">
        <div
          class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] dark:border-white bg-transparent shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>

      <!-- 向外延伸的线条（可关闭） -->
      <template v-if="!compact">
        <div class="absolute left-0 top-0 w-px h-24 md:h-32 -translate-y-full bg-[#cbdcfb] dark:bg-white"></div>
        <div class="absolute left-0 top-0 h-px w-24 md:w-32 -translate-x-full bg-[#cbdcfb] dark:bg-white"></div>

        <div class="absolute right-0 top-0 w-px h-24 md:h-32 -translate-y-full bg-[#cbdcfb] dark:bg-white"></div>
        <div class="absolute right-0 top-0 h-px w-24 md:w-32 translate-x-full bg-[#cbdcfb] dark:bg-white"></div>

        <div class="absolute left-0 bottom-0 w-px h-24 md:h-32 translate-y-full bg-[#cbdcfb] dark:bg-white"></div>
        <div class="absolute left-0 bottom-0 h-px w-24 md:w-32 -translate-x-full bg-[#cbdcfb] dark:bg-white"></div>

        <div class="absolute right-0 bottom-0 w-px h-24 md:h-32 translate-y-full bg-[#cbdcfb] dark:bg-white"></div>
        <div class="absolute right-0 bottom-0 h-px w-24 md:w-32 translate-x-full bg-[#cbdcfb] dark:bg-white"></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  compact: { type: Boolean, default: false },
  insetClass: { type: String, default: 'inset-x-6 md:inset-x-16' }
})

/**
 * 计算外层容器样式：固定于页面中线，宽度覆盖视口
 */
const outerWrapperClass = computed(() =>
  props.compact
    ? 'pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen'
    : 'pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen'
)

/**
 * 计算内部 inset 区域：根据 props.insetClass 控制左右内边距
 */
const innerInsetClass = computed(() => (
  props.compact
    ? `absolute inset-y-0 ${props.insetClass}`
    : `absolute wireframe-inset ${props.insetClass}`
))
</script>
