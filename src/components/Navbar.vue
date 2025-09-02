<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group hover:opacity-80 transition-opacity duration-200">
          <img src="/logo.png" alt="Welight Logo" class="w-8 h-8 rounded-lg">
          <span class="text-xl font-bold relative logo-gradient-text cursor-pointer">
            Welight
          </span>
          <sup class="text-xs text-gray-500 ml-1 font-normal">v2.3.2</sup>
        </router-link>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-2">
          <!-- Documentation links -->
          <div class="hidden md:flex items-center space-x-2">
            <div
              class="flex items-center space-x-2 px-3 py-2 text-gray-400 cursor-not-allowed rounded-lg relative"
              title="文档建设中，敬请期待"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="hidden sm:inline text-sm font-medium">文档</span>
              <!-- 建设中上标 -->
              <sup class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                建设中
              </sup>
            </div>
          </div>

          <!-- 反馈菜单 -->
          <div class="relative group">
            <button class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
                    title="问题反馈与功能诉求">
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span class="hidden sm:inline text-sm font-medium">反馈</span>
              <svg class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- 下拉菜单 -->
            <div class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="py-2">
                <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file"
                   target="_blank"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>问题反馈</span>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file"
                   target="_blank"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>功能诉求</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- 更新日志按钮 -->
          <button
            @click="showChangelog"
            class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="查看更新日志"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">更新日志</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 更新日志模态框 -->
    <ChangelogModal
      :isVisible="isChangelogVisible"
      @close="closeChangelog"
    />
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import ChangelogModal from './ChangelogModal.vue'

// 更新日志模态框状态
const isChangelogVisible = ref(false)

// 显示更新日志
const showChangelog = () => {
  isChangelogVisible.value = true
}

// 关闭更新日志
const closeChangelog = () => {
  isChangelogVisible.value = false
}
</script>
