<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="col-span-1 md:col-span-2">
          <div class="mb-4">
            <span class="text-xl font-bold text-gray-900">Welight</span>
          </div>
          <p class="text-gray-600 mb-4 max-w-md">
            专业的公众号推文美化助手，功能强大的 Markdown 编辑器，专为微信公众号内容创作而设计。
          </p>
          <div class="flex space-x-4">
            <a href="https://waer.ltd" class="text-gray-400 hover:text-primary-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://ilikexff.cn" class="text-gray-400 hover:text-primary-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 产品链接 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">产品</h3>
          <ul class="space-y-3">
            <li><router-link to="/download" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">下载</router-link></li>
            <li><a href="https://waer.ltd" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">官方网站</a></li>
            <li><a href="https://ilikexff.cn" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">开发者博客</a></li>
          </ul>
        </div>

        <!-- 支持链接 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">功能特色</h3>
          <ul class="space-y-3">
            <li><span class="text-gray-600">17种精美主题</span></li>
            <li><span class="text-gray-600">AI智能助手</span></li>
            <li><span class="text-gray-600">实时预览</span></li>
            <li><span class="text-gray-600">云存储支持</span></li>
          </ul>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm">
            © {{ currentYear }} Welight。保留所有权利。
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="https://waer.ltd" class="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200">官方网站</a>
            <a href="https://ilikexff.cn" class="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200">开发者博客</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
