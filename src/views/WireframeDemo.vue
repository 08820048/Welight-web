<template>
  <div class="min-h-screen bg-[#f9fafb] py-20">
    <div class="container-custom px-6">
      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          线框效果预览
        </h1>
        <p class="text-sm md:text-base text-gray-500 max-w-2xl">
          这是一个专门用于调试线框/分隔线视觉效果的页面。后续可以将这里确定下来的线条颜色、粗细、交点菱形样式，应用到首页和其他页面的内容模块之间。
        </p>
      </div>

      <!-- Preview Card -->
      <div class="rounded-2xl bg-[#fbfbf7] border border-gray-200/70 shadow-sm p-10 md:p-14">
        <p class="text-xs md:text-sm text-gray-500 mb-6">
          示例：模拟 Zed 官网那种模块分隔线，在网格交点处带有浅蓝色菱形节点。
        </p>

        <div class="flex flex-col items-center justify-center gap-10 md:gap-16">
          <!-- Single intersection demo -->
          <div class="relative w-full max-w-xl h-48 md:h-56 wireframe-grid">
            <!-- 背景填充块，模拟上下左右不同模块的底色差异 -->
            <div class="absolute inset-0 grid grid-cols-2 grid-rows-2">
              <div class="bg-[#fdfdf8]"></div>
              <div class="bg-[#fafaf5]"></div>
              <div class="bg-[#f7f7f2]"></div>
              <div class="bg-[#fbfbf6]"></div>
            </div>

            <!-- 十字分隔线 -->
            <div class="absolute inset-0 pointer-events-none">
              <!-- 垂直线 -->
              <div class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#cbdcfb]"></div>
              <!-- 水平线 -->
              <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#cbdcfb]"></div>
            </div>

            <!-- 中心菱形节点 -->
            <div
              class="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#9bbcff] bg-[#fbfbf7] shadow-[0_0_0_1px_rgba(147,197,253,0.35)]">
            </div>

            <!-- 轻微内阴影，增加层次感 -->
            <div class="absolute inset-[1px] rounded-xl shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)] pointer-events-none"></div>
          </div>

          <!-- 文字说明模块，未来可以抽象为通用内容块 -->
          <div class="max-w-xl text-center text-xs md:text-sm text-gray-500 leading-relaxed">
            <p class="mb-2">
              线条颜色建议使用非常浅的冷色（例如 Tailwind 中的 <code>blue-200 ~ blue-300</code>），
              粗细为 1px，保持克制，不喧宾夺主。
            </p>
            <p>
              菱形节点可以作为多个内容块交汇处的视觉锚点。后续在首页/定价/下载等页面中，
              可以把每个模块当成一个网格单元，用这套线框把模块“连”在一起。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里只是展示静态效果，不需要逻辑
</script>

<style scoped>
.wireframe-grid {
  /* 保证在高分屏下线条依旧清晰 */
  image-rendering: -webkit-optimize-contrast;
}
</style>

