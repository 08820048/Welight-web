<template>
  <footer class="bg-gray-50/80 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100">
    <div class="container-custom px-4 py-12 md:py-16">
      <!-- 品牌信息 -->
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Welight Logo" class="h-10 w-10 rounded-lg" />
          <span class="text-xl font-bold">Welight</span>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-400 text-center">
          © 2025 Welight. Made with love by
          <a
            href="https://github.com/08820048"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 underline underline-offset-2 transition-colors"
            >Ornata</a
          >
        </p>
      </div>

      <!-- 底部链接 -->
      <div class="mt-8 pt-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <router-link
              to="/terms"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >服务条款</router-link
            >
            <router-link
              to="/privacy"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >隐私政策</router-link
            >
            <router-link
              to="/disclaimer"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >免责声明</router-link
            >
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[11px] text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 transition-colors"
            >
              黔ICP备2021010295号-1
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=52052402000190"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-[11px] text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 transition-colors"
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
    </div>
  </footer>
</template>
