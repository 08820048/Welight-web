<template>
  <!-- 纯装饰性：内容模块四角线框 + 菱形节点 + 向外延伸的线条 -->
  <div class="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen" aria-hidden="true">

    <!-- 背景斜线填充区域：只在线框矩形内部用浅蓝色细斜线做填充 -->
    <div class="absolute inset-y-4 md:inset-y-6 inset-x-6 md:inset-x-16">
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
    <div class="absolute inset-y-4 md:inset-y-6 inset-x-6 md:inset-x-16">
      <!-- 模块内部的一圈细线，包裹内容区域 -->
      <div class="absolute inset-x-0 top-0 h-px bg-[#cbdcfb]"></div>
      <div class="absolute inset-x-0 bottom-0 h-px bg-[#cbdcfb]"></div>
      <div class="absolute inset-y-0 left-0 w-px bg-[#cbdcfb]"></div>
      <div class="absolute inset-y-0 right-0 w-px bg-[#cbdcfb]"></div>

      <!-- 四个拐角菱形节点：作为线条交点，内部中空（不让线穿过） -->
      <!-- 左上 -->
      <div class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] bg-transparent
                 shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>
      <!-- 右上 -->
      <div class="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] bg-transparent
                 shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>
      <!-- 左下 -->
      <div class="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 flex items-center justify-center">
        <div class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] bg-transparent
                 shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>
      <!-- 右下 -->
      <div class="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 z-10 flex items-center justify-center">
        <div class="h-3 w-3 md:h-3.5 md:w-3.5 rotate-45 border border-[#9bbcff] bg-transparent
                 shadow-[0_0_0_1px_rgba(147,197,253,0.35)] flex items-center justify-center">
          <div class="h-[55%] w-[55%] bg-[#fbfbf7]"></div>
        </div>
      </div>

      <!-- 向浏览器边缘方向延伸出去的线条，让菱形四个方向都有线条 -->
      <!-- 左上角：向上、向左 -->
      <div class="absolute left-0 top-0 w-px h-24 md:h-32 -translate-y-full bg-[#cbdcfb]"></div>
      <div class="absolute left-0 top-0 h-px w-24 md:w-32 -translate-x-full bg-[#cbdcfb]"></div>

      <!-- 右上角：向上、向右 -->
      <div class="absolute right-0 top-0 w-px h-24 md:h-32 -translate-y-full bg-[#cbdcfb]"></div>
      <div class="absolute right-0 top-0 h-px w-24 md:w-32 translate-x-full bg-[#cbdcfb]"></div>

      <!-- 左下角：向下、向左 -->
      <div class="absolute left-0 bottom-0 w-px h-24 md:h-32 translate-y-full bg-[#cbdcfb]"></div>
      <div class="absolute left-0 bottom-0 h-px w-24 md:w-32 -translate-x-full bg-[#cbdcfb]"></div>

      <!-- 右下角：向下、向右 -->
      <div class="absolute right-0 bottom-0 w-px h-24 md:h-32 translate-y-full bg-[#cbdcfb]"></div>
      <div class="absolute right-0 bottom-0 h-px w-24 md:w-32 translate-x-full bg-[#cbdcfb]"></div>
    </div>
  </div>
</template>

<script setup>
// 无状态纯展示组件：依赖父级容器的 relative + padding 控制可见内容区域
</script>
