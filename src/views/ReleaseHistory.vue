<template>
  <div class="relative min-h-screen bg-white">
    <!-- 渐隐网格背景，统一全站视觉 -->
    <AnimatedGridPattern />
    <div class="min-h-screen text-gray-200 pt-20 relative overflow-hidden" style="position: relative; z-index: 1;">
      <!-- Hero Section -->
      <section class="section-padding relative z-10">
        <WireframeOverlay class="wireframe-section-relaxed" />
        <div class="container-custom text-center relative">
          <AnimatedUnderlineText text="历史版本" text-className="text-4xl md:text-5xl font-bold text-gray-900"
            underline-className="text-gray-900" />
          <MagicText text="下载 Welight 的历史版本，查看每一次迭代带来的功能与改进" container-className="mt-6 justify-center max-w-3xl mx-auto"
            word-className="text-xl text-gray-600" />
          <div class="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <router-link to="/download"
              class="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 font-medium">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              前往下载最新版本 v4.1.2
            </router-link>
          </div>
        </div>
      </section>

      <!-- Release History List（线框模块：历史版本列表） -->
      <section class="section-padding relative z-10">
        <WireframeOverlay class="wireframe-section-relaxed" />
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
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                  <!-- Linux -->
                  <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div class="flex items-center mb-3">
                      <svg class="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                          d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268-.4-.051-.811-.03-1.206-.125-.365-.086-.718-.224-1.05-.479-.297-.239-.543-.527-.708-.815-.194-.328-.353-.66-.401-1.058-.035-.31-.008-.579.15-.849.135-.23.355-.406.608-.523.404-.187.818-.131 1.259-.199v-.016h-.073zm-2.452 7.407h.016c.442.02.72.199 1.004.284.336.099.672.198 1.062.201.435-.006.81-.118 1.18-.284.06-.03.135-.044.195-.09.225-.136.405-.334.558-.538.404-.534.67-1.126.972-1.67.17-.3.346-.3.521-.06.299.404.413.842.477 1.314.037.279.017.558-.031.818-.064.434-.23.747-.475 1.005-.154.15-.346.3-.504.465-.225.24-.42.48-.668.671-.537.434-1.108.747-1.764.925-.612.15-1.238.12-1.854.06-.292-.03-.584-.06-.87-.135-.255-.06-.51-.135-.725-.27-.154-.09-.293-.225-.417-.375-.109-.135-.199-.284-.25-.465-.047-.181-.016-.378.031-.553.064-.24.209-.464.403-.629.226-.181.478-.284.751-.329.399-.06.818.044 1.207-.105.06-.023.12-.06.18-.104h-.011z" />
                      </svg>
                      <span class="font-semibold text-gray-900 dark:text-white">Linux</span>
                    </div>
                    <div class="space-y-2">
                      <button @click="downloadRelease(release.version, 'linux-deb')"
                        class="w-full px-3 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors duration-200">
                        下载 .deb
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
import AnimatedGridPattern from '@/components/AnimatedGridPattern.vue'
import WireframeOverlay from '@/components/WireframeOverlay.vue'
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
    'macos-intel': `https://waer.ltd/downloads/mac/Welight_${version}_x64.dmg`,
    'linux-deb': `https://waer.ltd/downloads/linux/Welight_${version}_amd64.deb`
  }

  const downloadUrl = downloadUrls[platform]

  if (downloadUrl) {
    // 百度统计事件追踪
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackEvent', 'download-history', `${version}-${platform}`, downloadUrl])
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
