<template>
  <footer
    class="bg-gray-50/80 dark:bg-gray-900/90 border-t border-gray-200/60 dark:border-gray-800/80 text-gray-900 dark:text-gray-100">
    <div class="container-custom px-4 py-12 md:py-16">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <!-- 品牌信息 -->
        <div class="flex flex-col items-start gap-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Welight Logo" class="h-10 w-10 rounded-lg" />
            <span class="text-xl font-bold">Welight</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            关注 Welight 的最新功能更新、使用技巧和排版灵感，让你的创作体验更加高效、顺滑。
          </p>
          <div class="mt-4">
            <p class="text-xs text-gray-500 dark:text-gray-500 mb-2">扫码关注微信公众号，获取最新使用技巧和更新通知</p>
            <div class="flex items-center gap-3">
              <img src="https://images.waer.ltd/notes/202510141839217.jpg" alt="微信公众号二维码"
                class="w-20 h-20 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" loading="lazy"
                decoding="async" width="80" height="80" />
              <img src="https://images.waer.ltd/notes/202511201425342.jpg" alt="备用二维码"
                class="w-20 h-20 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" loading="lazy"
                decoding="async" width="80" height="80" />
            </div>
          </div>
        </div>

        <!-- 导航链接 -->
        <div class="md:justify-self-center">
          <h3 class="mb-4 text-base font-semibold">导航</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <router-link to="/download"
                class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">下载</router-link>
            </li>
            <li>
              <router-link to="/pricing"
                class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">定价与赞助</router-link>
            </li>
            <li>
              <a href="https://waer.ltd/wl/" target="_blank"
                class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">网页版</a>
            </li>
            <li>
              <a href="https://waer.ltd/wl/themes" target="_blank"
                class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">主题预览</a>
            </li>
            <li>
              <router-link to="/documentation"
                class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">文档</router-link>
            </li>
            <li>
              <router-link to="/release-history"
                class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">历史版本</router-link>
            </li>
            <li>
              <router-link to="/changelog"
                class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">更新日志</router-link>
            </li>
          </ul>
        </div>

        <!-- 社区 & 支持 -->
        <div class="md:justify-self-center">
          <h3 class="mb-4 text-base font-semibold">社区 & 支持</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="https://qm.qq.com/q/nNA64h5d6K" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">Q</span>
                <span>QQ 群</span>
              </a>
            </li>
            <li>
              <a href="https://ilikexff.cn" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">B</span>
                <span>博客</span>
              </a>
            </li>
            <li>
              <a href="https://weibo.com/u/2104492377" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">微</span>
                <span>微博</span>
              </a>
            </li>
            <li>
              <a href="https://x.com/_peter_you?s=21" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">X</span>
                <span>X</span>
              </a>
            </li>
            <li>
              <a href="https://b23.tv/W7L12nZ" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">哔</span>
                <span>哔哩哔哩</span>
              </a>
            </li>
            <li>
              <a href="https://blog.csdn.net/2302_76401343?type=blog" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">C</span>
                <span>CSDN</span>
              </a>
            </li>

          </ul>
        </div>

        <!-- 推广链接 -->
        <div>
          <h3 class="mb-4 text-base font-semibold">推广链接</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="https://qoder.com/referral?referral_code=Ul7Io8v0RUWys2cUwypuhhYW8uGIY5To" target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">
                  Qd
                </span>
                <span>Qoder - 智能体编程平台</span>
              </a>
            </li>
            <li>
              <a href="https://plugins.jetbrains.com/plugin/27300-codepins--code-bookmarks" target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">
                  CP
                </span>
                <span>Codepins - Code Bookmarks</span>
              </a>
            </li>
            <li>
              <a href="https://s.qiniu.com/6JNjmy" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">
                  QN
                </span>
                <span>七牛云 - 值得信赖的云存储</span>
              </a>
            </li>
            <li>
              <a href="https://www.niubistar.com/list" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">
                  NB
                </span>
                <span>牛逼 star - GitHub互赞平台</span>
              </a>
            </li>
            <li>
              <a href="https://s.qiniu.com/JbAbea" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">
                  QN
                </span>
                <span>七牛云AI模型</span>
              </a>
            </li>
          </ul>
          <p class="mt-3 text-xs text-gray-500 dark:text-gray-500">
            欢迎与 Welight 互换友链，可通过文档页或社区渠道联系作者。
          </p>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-gray-600 dark:text-gray-400">
            © 2025 Welight. Made with love by
            <a href="https://github.com/08820048" target="_blank" rel="noopener noreferrer"
              class="text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 underline underline-offset-2 transition-colors">ornata</a>
          </p>
          <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <router-link to="/terms"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">服务条款</router-link>
            <router-link to="/privacy"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">隐私政策</router-link>
            <router-link to="/disclaimer"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">免责声明</router-link>
          </div>
        </div>
        <div class="mt-3 text-center">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"
            class="text-[11px] text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 transition-colors">
            黔ICP备2021010295号-1
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
