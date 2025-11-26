<template>
  <section class="bg-transparent relative">
    <div class="container z-10 mx-auto">
      <div
        class="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
        <TestimonialsColumn :images="firstColumn" :duration="15" />
        <TestimonialsColumn :images="secondColumn" :duration="19" class-name="hidden md:block" />
        <TestimonialsColumn :images="thirdColumn" :duration="17" class-name="hidden lg:block" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import TestimonialsColumn from '@/components/ui/TestimonialsColumn.vue'

// 主题截图URL - 使用真实的主题预览图
const themeImages = [
  'https://images.waer.ltd/notes/202510192006088.jpg', // 橙心橙意
  'https://images.waer.ltd/notes/202510192005728.jpg', // 浮云山居
  'https://images.waer.ltd/notes/202510192005760.jpg', // 极简序列
  'https://images.waer.ltd/notes/202510192005773.jpg', // 诗意简约
  'https://images.waer.ltd/notes/202510192005663.jpg', // 赤焰丹心
  'https://images.waer.ltd/notes/202510192005700.jpg'  // 童趣彩虹
]

// 自动按列分配图片：任何长度的 themeImages 都可以，按索引 % 3 分到三列
const firstColumn = computed(() => themeImages.filter((_, index) => index % 3 === 0))
const secondColumn = computed(() => themeImages.filter((_, index) => index % 3 === 1))
const thirdColumn = computed(() => themeImages.filter((_, index) => index % 3 === 2))
</script>
