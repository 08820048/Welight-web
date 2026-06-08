<template>
  <footer class="border-t border-[#d8d3c4] bg-[#f5f4ed] px-4 py-12 md:px-6 md:py-16 dark:border-[#44433f] dark:bg-[#141413]">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Welight Logo" class="h-10 w-10 rounded-lg" />
          <span class="text-xl font-semibold text-[#1B365D] dark:text-[#D0DCE9]">Welight</span>
        </div>
        <p class="text-xs text-[#504e49] dark:text-[#d6d1c4]">
          © 2025 Welight. Made with love by
          <a
            href="https://xuyi.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 transition-colors hover:text-[#141413] dark:hover:text-[#f5f4ed]"
            >XuYi</a
          >
        </p>
      </div>

      <div class="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div class="flex flex-wrap items-center gap-4 text-xs text-[#504e49] dark:text-[#d6d1c4]">
          <router-link to="/terms" class="transition-colors hover:text-[#141413] dark:hover:text-[#f5f4ed]">服务条款</router-link>
          <router-link to="/privacy" class="transition-colors hover:text-[#141413] dark:hover:text-[#f5f4ed]">隐私政策</router-link>
          <router-link to="/disclaimer" class="transition-colors hover:text-[#141413] dark:hover:text-[#f5f4ed]">免责声明</router-link>
          <router-link to="/donation" class="transition-colors hover:text-[#141413] dark:hover:text-[#f5f4ed]">致谢</router-link>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11px] text-[#504e49] transition-colors hover:text-[#141413] dark:text-[#d6d1c4] dark:hover:text-[#f5f4ed]"
          >
            黔ICP备2021010295号-1
          </a>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=52052402000190"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-[11px] text-[#504e49] transition-colors hover:text-[#141413] dark:text-[#d6d1c4] dark:hover:text-[#f5f4ed]"
          >
            <img
              src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
              alt="公安备案"
              class="h-4 w-4"
            />
            贵公网安备52052402000190号
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
