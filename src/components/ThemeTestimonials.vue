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
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/15fa1a0c33414c5594a4abaed44a02ec.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/e2fa7b5bbe3642df883c0c60a1f3389a.png',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/cb54db848cbb4737888c4fba39bd14ca.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/98052d7ebfdc4b46a173beb3b7b2d8de.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/1a31b939243e4a8182d234279eb9d7d6.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/4ac074d6c85547d5bde4d6260735a6de.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/9647f3f552b94b709d886f5159b7c5cf.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/077626d247d34882a3fd70a42c2a0aa4.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/4dcb6003db6f48b889cf891d14d76f11.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/9dcd30f44f7d4c2d865eed2aa5ec4942.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/8d297d8d33c449c78e83e1ff661e90a1.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/c459587b7f3a4942886c8ded2367f42d.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/4269862d0f834460a947de7c0c751cc6.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/92543acc37ce4f8ebbb8564daacd4e2c.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/ad22967840644f7eb98a2594fc0871aa.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/f0c6d931fa0c42c7b855be3a8dc4427b.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/7081a518862e49cf81c014056fd9452d.PNG',
  'https://ultimate-img.oss-cn-beijing.aliyuncs.com/welight/ilikexff@gmail.com/20251215/871305be317445e3839ccd492706be8f.PNG',
]

// 自动按列分配图片：任何长度的 themeImages 都可以，按索引 % 3 分到三列
const firstColumn = computed(() => themeImages.filter((_, index) => index % 3 === 0))
const secondColumn = computed(() => themeImages.filter((_, index) => index % 3 === 1))
const thirdColumn = computed(() => themeImages.filter((_, index) => index % 3 === 2))
</script>
