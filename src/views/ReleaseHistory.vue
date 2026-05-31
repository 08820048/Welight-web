<template>
  <div class="relative min-h-screen bg-white">
    <div class="min-h-screen text-gray-200 pt-20 relative overflow-hidden" style="position: relative; z-index: 1;">
      <!-- Hero Section -->
      <section class="section-padding relative z-10">
        <div class="container-custom text-center relative">
          <AnimatedUnderlineText text="历史版本"
            text-className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-longcang"
            underline-className="text-gray-900 dark:text-white" />
          <MagicText text="下载 Welight 的历史版本，查看每一次迭代带来的功能与改进" container-className="mt-6 justify-center max-w-3xl mx-auto"
            word-className="text-xl text-gray-600" />
          <div class="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <router-link to="/download"
              class="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 font-medium">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              前往下载最新版本 v4.1.5
            </router-link>
          </div>
        </div>
      </section>

      <!-- Release History List（线框模块：历史版本列表） -->
      <section class="section-padding relative z-10">
        <div class="container-custom max-w-4xl mx-auto relative">
          <div class="space-y-6">
            <!-- Version Item -->
            <div v-for="release in releases" :key="release.version"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div class="p-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div class="mb-4 md:mb-0">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Welight {{ release.version }}
                    </h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      发布日期：{{ release.date }}
                    </p>
                  </div>
                  <div v-if="release.isLatest"
                    class="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    最新版本
                  </div>
                </div>

                <!-- Release Notes -->
                <div v-if="release.notes && release.notes.length > 0" class="mb-6">
                  <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">更新内容：</h3>
                  <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li v-for="(note, index) in release.notes" :key="index" class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>{{ note }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Download Buttons -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Windows -->
                  <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div class="flex items-center mb-3">
                      <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                          d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z" />
                      </svg>
                      <span class="font-semibold text-gray-900 dark:text-white">Windows</span>
                    </div>
                    <div class="space-y-2">
                      <button @click="downloadRelease(release.version, 'windows-installer')"
                        class="w-full px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200">
                        下载 .exe
                      </button>
                      <button @click="downloadRelease(release.version, 'windows-msi')"
                        class="w-full px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200">
                        下载 .msi
                      </button>
                    </div>
                  </div>

                  <!-- macOS -->
                  <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div class="flex items-center mb-3">
                      <svg class="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                          d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                      </svg>
                      <span class="font-semibold text-gray-900 dark:text-white">macOS</span>
                    </div>
                    <div class="space-y-2">
                      <button @click="downloadRelease(release.version, 'macos-intel')"
                        class="w-full px-3 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors duration-200">
                        Intel 芯片
                      </button>
                      <button @click="downloadRelease(release.version, 'macos-apple')"
                        class="w-full px-3 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded transition-colors duration-200">
                        Apple Silicon
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <!-- Back to Download Page -->
          <div class="text-center mt-12">
            <router-link to="/download"
              class="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors duration-200 font-medium">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回下载页面
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script setup>
import { computed } from 'vue'
import AnimatedUnderlineText from '@/components/ui/AnimatedUnderlineText.vue'
import MagicText from '@/components/ui/MagicText.vue'
import { useSEO } from '@/composables/useSEO'
import { changelogData } from '@/data/changelog.js'

// SEO配置
useSEO({
  title: 'Welight历史版本下载 - 所有版本归档',
  description: '下载Welight微信公众号排版工具的历史版本，包括3.0.0、3.0.1、3.1.0、3.1.2、3.1.3、3.2.0等所有版本。',
  keywords: 'Welight历史版本,旧版本下载,版本归档,Welight下载',
  url: 'https://waer.ltd/release-history'
})

// 从更新日志数据中自动获取历史版本（排除最新版本，只保留 3.0.0 及之后的版本）
const releases = computed(() => {
  // 获取所有版本，跳过第一个（最新版本），并过滤出 3.0.0 及之后的版本
  const historyVersions = changelogData.slice(1).filter(item => {
    // 解析版本号，比较是否 >= 3.0.0
    const [major, minor] = item.version.split('.').map(Number)
    return major >= 3
  })

  return historyVersions.map(versionInfo => {
    // 合并所有更新内容
    const notes = []
    if (versionInfo.changes.features && versionInfo.changes.features.length > 0) {
      notes.push(...versionInfo.changes.features.slice(0, 3)) // 最多取3条新功能
    }
    if (versionInfo.changes.improvements && versionInfo.changes.improvements.length > 0) {
      notes.push(...versionInfo.changes.improvements.slice(0, 2)) // 最多取2条改进
    }
    if (versionInfo.changes.fixes && versionInfo.changes.fixes.length > 0) {
      notes.push(...versionInfo.changes.fixes.slice(0, 2)) // 最多取2条修复
    }

    return {
      version: versionInfo.version,
      date: versionInfo.date,
      isLatest: false,
      notes: notes.slice(0, 5) // 总共最多显示5条
    }
  })
})

// 下载历史版本
const downloadRelease = (version, platform) => {
  // 下载链接映射
  const downloadUrls = {
    'windows-installer': `https://waer.ltd/downloads/windows/Welight_${version}_x64-setup.exe`,
    'windows-msi': `https://waer.ltd/downloads/windows/Welight_${version}_x64_en-US.msi`,
    'macos-apple': `https://waer.ltd/downloads/mac/Welight_${version}_aarch64.dmg`,
    'macos-intel': `https://waer.ltd/downloads/mac/Welight_${version}_x64.dmg`
  }

  const downloadUrl = downloadUrls[platform]

  if (downloadUrl) {
    // 百度统计事件追踪
    if (typeof window._hmt !== 'undefined') {
      window._hmt.push(['_trackEvent', 'download-history', `${version}-${platform}`, downloadUrl])
    }

    // 执行下载
    window.open(downloadUrl, '_blank')
    console.log(`开始下载历史版本 ${version} - ${platform}: ${downloadUrl}`)
  } else {
    console.log(`${platform} 版本暂不可用`)
    alert(`该版本暂不可用，请尝试其他版本`)
  }
}
</script>
