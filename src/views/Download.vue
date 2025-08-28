<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="section-padding bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          下载您的应用
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          选择适合您操作系统的版本，开始智能高效的文档编辑体验
        </p>
        <div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          最新版本：v1.0.0
        </div>
      </div>
    </section>

    <!-- Download Options -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Windows -->
          <div class="card p-8 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Windows</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">适用于 Windows 10/11</p>
            <div class="space-y-3">
              <button class="btn-primary w-full" @click="downloadFile('windows-installer')">
                下载安装包 (.exe)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button class="btn-secondary w-full" @click="downloadFile('windows-portable')">
                便携版 (.zip)
              </button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">大小：~85 MB</p>
          </div>

          <!-- macOS -->
          <div class="card p-8 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">macOS</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">适用于 macOS 10.15+</p>
            <div class="space-y-3">
              <button class="btn-primary w-full" @click="downloadFile('macos-intel')">
                Intel 芯片 (.dmg)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button class="btn-primary w-full" @click="downloadFile('macos-apple')">
                Apple Silicon (.dmg)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">大小：~90 MB</p>
          </div>

          <!-- Linux -->
          <div class="card p-8 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268-.4-.051-.811-.03-1.206-.125-.365-.086-.718-.224-1.05-.479-.297-.239-.543-.527-.708-.815-.194-.328-.353-.66-.401-1.058-.035-.31-.008-.579.15-.849.135-.23.355-.406.608-.523.404-.187.818-.131 1.259-.199v-.016h-.073zm-2.452 7.407h.016c.442.02.72.199 1.004.284.336.099.672.198 1.062.201.435-.006.81-.118 1.18-.284.06-.03.135-.044.195-.09.225-.136.405-.334.558-.538.404-.534.67-1.126.972-1.67.17-.3.346-.3.521-.06.299.404.413.842.477 1.314.037.279.017.558-.031.818-.064.434-.23.747-.475 1.005-.154.15-.346.3-.504.465-.225.24-.42.48-.668.671-.537.434-1.108.747-1.764.925-.612.15-1.238.12-1.854.06-.292-.03-.584-.06-.87-.135-.255-.06-.51-.135-.725-.27-.154-.09-.293-.225-.417-.375-.109-.135-.199-.284-.25-.465-.047-.181-.016-.378.031-.553.064-.24.209-.464.403-.629.226-.181.478-.284.751-.329.399-.06.818.044 1.207-.105.06-.023.12-.06.18-.104h-.011z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Linux</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">适用于主流 Linux 发行版</p>
            <div class="space-y-3">
              <button class="btn-primary w-full" @click="downloadFile('linux-appimage')">
                AppImage
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button class="btn-secondary w-full" @click="downloadFile('linux-deb')">
                Debian (.deb)
              </button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">大小：~88 MB</p>
          </div>
        </div>
      </div>
    </section>

    <!-- System Requirements -->
    <section class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            系统要求
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            确保您的系统满足以下最低要求
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Windows</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Windows 10 或更高版本</li>
              <li>• 4GB RAM (推荐 8GB)</li>
              <li>• 500MB 可用磁盘空间</li>
              <li>• 支持 DirectX 11</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">macOS</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• macOS 10.15 或更高版本</li>
              <li>• 4GB RAM (推荐 8GB)</li>
              <li>• 500MB 可用磁盘空间</li>
              <li>• Intel 或 Apple Silicon</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Linux</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Ubuntu 18.04+ / 等效发行版</li>
              <li>• 4GB RAM (推荐 8GB)</li>
              <li>• 500MB 可用磁盘空间</li>
              <li>• X11 或 Wayland</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Installation Guide -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            安装指南
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            简单几步，快速开始使用
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">下载安装包</h3>
                <p class="text-gray-600 dark:text-gray-300">选择适合您操作系统的版本并下载</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">运行安装程序</h3>
                <p class="text-gray-600 dark:text-gray-300">双击下载的文件，按照提示完成安装</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">开始使用</h3>
                <p class="text-gray-600 dark:text-gray-300">启动应用，开始您的智能文档编辑之旅</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Section -->
    <section class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          需要帮助？
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          如果您在安装或使用过程中遇到问题，我们随时为您提供支持
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" class="btn-secondary">
            查看文档
          </a>
          <router-link to="/about" class="btn-primary">
            联系支持
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const downloadFile = (platform) => {
  // 模拟下载功能
  console.log(`下载 ${platform} 版本`)
  
  // 这里可以添加实际的下载逻辑
  // 例如：window.open(downloadUrl) 或触发文件下载
  
  // 显示下载提示
  alert(`正在下载 ${platform} 版本...`)
}
</script>
