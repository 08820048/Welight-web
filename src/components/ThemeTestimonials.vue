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

/**
 * 主题截图（浅色）
 * 使用 public/themes 下的静态资源路径
 */
const themeImages = [
  '/themes/IMG_1387 2.PNG',
  '/themes/IMG_1388 2.PNG',
  '/themes/IMG_1389 2.PNG',
  '/themes/IMG_1390 2.PNG',
  '/themes/IMG_1391 2.PNG',
  '/themes/IMG_1392 3.PNG',
  '/themes/IMG_1393 3.PNG',
  '/themes/IMG_1394 2.PNG',
  '/themes/IMG_1395 2.PNG',
  '/themes/IMG_1396 2.PNG',
  '/themes/IMG_1397 2.PNG',
  '/themes/IMG_1398 2.PNG',
  '/themes/IMG_1400 2.PNG',
  '/themes/IMG_1418 2.PNG',
  '/themes/IMG_1419 2.PNG',
  '/themes/IMG_1420 2.PNG',
  '/themes/IMG_1421 2.PNG',
  '/themes/w020.png',
]

/**
 * 将图片按列分配（索引 % 3）
 * 使任意长度的主题截图均可滚动显示
 */
const firstColumn = computed(() => themeImages.filter((_, index) => index % 3 === 0))
const secondColumn = computed(() => themeImages.filter((_, index) => index % 3 === 1))
const thirdColumn = computed(() => themeImages.filter((_, index) => index % 3 === 2))
</script>
