<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- 顶部横幅通知 -->
    <div
      v-if="showBanner"
      class="fixed top-16 left-0 right-0 z-40 overflow-hidden"
    >
      <div
        class="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform transition-all duration-700 ease-out"
        :class="bannerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
      >
        <div class="container-custom">
          <div class="flex items-center justify-between py-4 px-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-lg font-bold">🎉 Welight v2.4.1 已发布！</span>
                  <span class="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full font-medium">最新版本</span>
                </div>
                <p class="text-sm text-primary-100">
                  全新的UI设计，扁平轻量化的清爽体验
<!--                  <span class="hidden sm:inline">建议更新</span>-->
                  <span class="font-medium text-white">建议下载更新！</span>
                </p>
              </div>
            </div>
            <div class="flex items-center">
              <button
                @click="closeBanner"
                class="text-primary-100 hover:text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200 p-2 rounded-full group"
                title="关闭通知"
              >
                <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="relative min-h-screen overflow-hidden pt-32">
      <div class="relative container-custom h-full">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center min-h-[calc(100vh-5rem)]">
          <!-- Left content -->
          <div class="order-2 lg:order-1 lg:col-span-2">
            <!-- Main heading -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up delay-100">
              <span class="block animate-fade-in-left delay-200">智能高效的</span>
              <span class="block gradient-text animate-fade-in-left delay-300">公众号推文&排版美化体验</span>
            </h1>

            <!-- Description -->
            <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up delay-400">
              Welight 是一款专为微信公众号创作者打造的拥有更优性能、智能、快捷轻量的免费排版工具，排版与编辑，亦可兼得。
            </p>

            <!-- CTA buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up delay-500">
              <!-- macOS Download Button -->
              <button @click="downloadFile('macos-apple')" class="download-btn-mac group relative overflow-hidden bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between flex-1 sm:flex-none sm:min-w-[200px] animate-scale-in delay-600">
                <!-- Apple Logo -->
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                <div class="flex flex-col items-center mx-2">
                  <div class="flex items-center space-x-1">
                    <span class="text-base">下载最新版</span>
                    <sup class="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full font-medium">Apple Silicon</sup>
                  </div>
                  <span class="text-xs opacity-75"><span class="font-semibold text-white tabular-nums inline-block min-w-[1rem]">{{ animatedMacDownloads.toLocaleString() }}</span> 次下载</span>
                </div>
                <!-- Animated Download Icon -->
                <svg class="w-4 h-4 text-white animate-enhanced-bounce group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              <!-- Windows Download Button -->
              <button @click="downloadFile('windows-installer')" class="download-btn-windows group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between flex-1 sm:flex-none sm:min-w-[200px] animate-scale-in delay-700">
                <!-- Windows Logo -->
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z"/>
                </svg>
                <div class="flex flex-col items-center mx-2">
                  <div class="flex items-center space-x-1">
                    <span class="text-base">Windows 版本</span>
                    <sup class="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full font-medium">EXE</sup>
                  </div>
                  <span class="text-xs opacity-75"><span class="font-semibold text-white tabular-nums inline-block min-w-[1rem]">{{ animatedWindowsDownloads.toLocaleString() }}</span> 次下载</span>
                </div>
                <!-- Animated Download Icon -->
                <svg class="w-4 h-4 text-white animate-enhanced-bounce group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>

            <!-- Linux Download Button -->
            <button class="download-btn-linux group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-between max-w-xs animate-scale-in delay-800 mb-6" @click="downloadFile('linux-appimage')">
              <!-- Linux Logo -->
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268-.4-.051-.811-.03-1.206-.125-.365-.086-.718-.224-1.05-.479-.297-.239-.543-.527-.708-.815-.194-.328-.353-.66-.401-1.058-.035-.31-.008-.579.15-.849.135-.23.355-.406.608-.523.404-.187.818-.131 1.259-.199v-.016h-.073zm-2.452 7.407h.016c.442.02.72.199 1.004.284.336.099.672.198 1.062.201.435-.006.81-.118 1.18-.284.06-.03.135-.044.195-.09.225-.136.405-.334.558-.538.404-.534.67-1.126.972-1.67.17-.3.346-.3.521-.06.299.404.413.842.477 1.314.037.279.017.558-.031.818-.064.434-.23.747-.475 1.005-.154.15-.346.3-.504.465-.225.24-.42.48-.668.671-.537.434-1.108.747-1.764.925-.612.15-1.238.12-1.854.06-.292-.03-.584-.06-.87-.135-.255-.06-.51-.135-.725-.27-.154-.09-.293-.225-.417-.375-.109-.135-.199-.284-.25-.465-.047-.181-.016-.378.031-.553.064-.24.209-.464.403-.629.226-.181.478-.284.751-.329.399-.06.818.044 1.207-.105.06-.023.12-.06.18-.104h-.011z"/>
              </svg>
              <div class="flex flex-col items-center mx-2">
                <div class="flex items-center space-x-1">
                  <span class="text-base">Linux 版本</span>
                  <sup class="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full font-medium">AppImage</sup>
                </div>
                <span class="text-xs opacity-75"><span class="font-semibold text-white tabular-nums inline-block min-w-[1rem]">{{ animatedLinuxDownloads.toLocaleString() }}</span> 次下载</span>
              </div>
            </button>

            <!-- Download statistics and additional info -->
            <div class="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-600">
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>总下载量：<span class="text-lg font-bold text-primary-600 tabular-nums inline-block min-w-[3rem]">{{ animatedTotalDownloads.toLocaleString() }}</span>次</span>
              </div>
              <!-- 开发模式下显示调试信息 -->
              <div v-if="isDev" class="text-xs text-gray-500 mt-2">
                <div>后端总数: {{ backendStats?.totalDownloads || 0 }}</div>
                <div>映射总数: {{ Object.values(downloadStats).reduce((a,b) => a+b, 0) }}</div>
              </div>
              <div class="text-sm text-gray-500">
                更多版本下载请前往
                <router-link to="/download" class="text-primary-600 hover:text-primary-700 underline">下载页面</router-link>
              </div>
            </div>


          </div>

          <!-- Right image -->
          <div class="order-1 lg:order-2 lg:col-span-3 flex items-center justify-end relative pl-8 lg:pl-12 animate-fade-in-right delay-300">
            <!-- Background glow effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary-200/20 via-blue-200/10 to-purple-200/20 rounded-3xl blur-3xl"></div>

            <!-- Main screenshot container -->
            <div class="relative w-full max-w-3xl ml-auto animate-scale-in delay-500">
              <div class="relative transform transition-all duration-700 group perspective-1000">
                <!-- Screenshot with enhanced styling -->
                <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 hero-screenshot-container">
                  <!-- Subtle inner glow -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                  <!-- Main image -->
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.waer.ltd/notes/202509052129898.png"
                      alt="Welight 主题预览界面"
                      class="w-full h-auto transform group-hover:scale-105 transition-all duration-700 hero-screenshot"
                      loading="lazy"
                    />
                  </div>

                  <!-- Enhanced shadow layers -->
                  <div class="absolute -inset-4 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-3xl blur-xl -z-10"></div>
                  <div class="absolute -inset-8 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl blur-2xl -z-20"></div>
                </div>

                <!-- Floating accent elements -->
                <div class="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-400/30 to-blue-400/30 rounded-full blur-xl animate-pulse"></div>
                <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional info section -->
    <!-- Features Section -->
    <section class="relative min-h-screen py-20 overflow-hidden">
      <div class="relative container-custom">
        <!-- Section header -->
        <div class="text-center mb-16 scroll-animate" style="transition-delay: 0.1s;">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 scroll-animate" style="transition-delay: 0.2s;">
            快捷高效的编辑体验
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto scroll-animate" style="transition-delay: 0.3s;">
            快捷 Markdown 语法提示与TXT文本转换支持。轻松创建结构化文档，所见即所得，不需要记忆复杂的 Markdown 语法。
          </p>
        </div>

        <!-- Main content grid -->
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left side - Screenshot -->
          <div class="order-2 lg:order-1 scroll-animate fade-left" style="transition-delay: 0.4s;">
            <div class="relative">
              <!-- Background glow -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-200/20 via-blue-200/10 to-purple-200/20 rounded-3xl blur-3xl"></div>

              <!-- Screenshot container -->
              <div class="relative transform hover:scale-105 transition-all duration-700 group">
                <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <!-- Inner glow -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                  <!-- Main screenshot -->
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.waer.ltd/notes/202508301851082.png"
                      alt="Welight 核心特性展示"
                      class="w-full h-auto transform group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>

                  <!-- Enhanced shadows -->
                  <div class="absolute -inset-4 bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-3xl blur-xl -z-10"></div>
                  <div class="absolute -inset-8 bg-gradient-to-br from-primary-500/5 to-purple-500/5 rounded-3xl blur-2xl -z-20"></div>
                </div>

                <!-- Floating accents -->
                <div class="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-400/30 to-blue-400/30 rounded-full blur-xl animate-pulse"></div>
                <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>

          <!-- Right side - Features -->
          <div class="order-1 lg:order-2 space-y-8">
            <!-- Main feature title -->
            <div class="scroll-animate fade-right" style="transition-delay: 0.5s;">
              <h3 class="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
                直观的编辑体验
              </h3>
              <p class="text-lg text-gray-600 leading-relaxed">
                Welight将 Notion 的快捷辅助与经典的分屏编辑预览模式相结合,大幅提升编辑效率，让您专注内容创作，无视复杂的语法困扰。
              </p>
            </div>

            <!-- Feature grid -->
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Feature 1 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-primary-300/50 transition-all duration-300 hover:shadow-lg scroll-animate scale-up" style="transition-delay: 0.6s;">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">划词工具栏</h4>
                <p class="text-gray-600 text-sm">
                  选中文本即可显示划词工具栏，快速应用格式、预设的 AI 快捷功能。
                </p>
              </div>

              <!-- Feature 2 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-lg scroll-animate scale-up" style="transition-delay: 0.7s;">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Slash 命令菜单</h4>
                <p class="text-gray-600 text-sm">
                  输入斜杠即可打开命令菜单，快速插入语法、操作功能。
                </p>
              </div>

              <!-- Feature 3 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-purple-300/50 transition-all duration-300 hover:shadow-lg scroll-animate scale-up" style="transition-delay: 0.8s;">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">预览一键复制</h4>
                <p class="text-gray-600 text-sm">
                  满意的排版风格一键复制，粘贴微信编辑器即可发布，所见即所得。
                </p>
              </div>

              <!-- Feature 4 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-indigo-300/50 transition-all duration-300 hover:shadow-lg scroll-animate scale-up" style="transition-delay: 0.9s;">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">智能图表转换</h4>
                <p class="text-gray-600 text-sm">
                  采用ChartJs图表渲染集成，图表格式自动转码，数据转表弹指可得。
                </p>
              </div>
            </div>

            <!-- Bottom description -->
            <div class="pt-6 scroll-animate" style="transition-delay: 1.0s;">
              <p class="text-gray-600 leading-relaxed">
                Welight 将直观的内容创作与强大的功能完美结合，让每个创作者都能轻松创建结构化的优美排版效果。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Themes Section -->
    <section class="relative min-h-screen py-20 overflow-hidden">
      <div class="relative container-custom">
        <!-- Section header -->
        <div class="text-center mb-16 scroll-animate" style="transition-delay: 0.1s;">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 scroll-animate" style="transition-delay: 0.2s;">
            丰富多样的排版主题
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto scroll-animate" style="transition-delay: 0.3s;">
            精心设计的多种主题风格，让你的推文呈现更加专业和美观的视觉效果，高级感满满。
          </p>
        </div>

        <!-- Themes showcase grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <!-- Theme 1 - 纸质纹理 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.4s;">
            <div class="relative overflow-hidden rounded-2xl bg-amber-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508291005187.png"
                  alt="纸质纹理主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-amber-900 mb-2">纸质纹理</h3>
                <p class="text-amber-700 text-sm mb-4">仿真纸质质感，营造传统书写的温馨体验，适合文学创作</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-amber-600 bg-amber-100 px-3 py-1 rounded-full">经典质感</span>
                  <div class="w-6 h-6 bg-amber-200 border-2 border-amber-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 2 - 森林物语 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.5s;">
            <div class="relative overflow-hidden rounded-2xl bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508291005215.png"
                  alt="森林物语主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-emerald-900 mb-2">森林物语</h3>
                <p class="text-emerald-700 text-sm mb-4">自然清新的绿色调，仿佛置身森林，带来宁静的写作氛围</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">自然护眼</span>
                  <div class="w-6 h-6 bg-emerald-200 border-2 border-emerald-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 3 - 粉色佳人 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.6s;">
            <div class="relative overflow-hidden rounded-2xl bg-pink-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508291005282.png"
                  alt="粉色佳人主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-pink-900 mb-2">粉色佳人</h3>
                <p class="text-pink-700 text-sm mb-4">温柔浪漫的粉色调，充满少女心，适合生活分享和情感表达</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-pink-600 bg-pink-100 px-3 py-1 rounded-full">浪漫温馨</span>
                  <div class="w-6 h-6 bg-pink-200 border-2 border-pink-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 4 - 商务简约 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.7s;">
            <div class="relative overflow-hidden rounded-2xl bg-slate-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508291005260.png"
                  alt="商务简约主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-slate-900 mb-2">商务简约</h3>
                <p class="text-slate-700 text-sm mb-4">专业简洁的设计风格，适合商务报告和正式文档</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full">专业商务</span>
                  <div class="w-6 h-6 bg-slate-200 border-2 border-slate-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 5 - 科技蓝调 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.8s;">
            <div class="relative overflow-hidden rounded-2xl bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508291005228.png"
                  alt="科技蓝调主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-blue-900 mb-2">科技蓝调</h3>
                <p class="text-blue-700 text-sm mb-4">现代科技感的蓝色调，充满未来感，适合技术文档和创新内容</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">科技未来</span>
                  <div class="w-6 h-6 bg-blue-200 border-2 border-blue-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 6 - 温暖橙光 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.9s;">
            <div class="relative overflow-hidden rounded-2xl bg-orange-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508291005271.png"
                  alt="温暖橙光主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-orange-900 mb-2">温暖橙光</h3>
                <p class="text-orange-700 text-sm mb-4">温暖活力的橙色调，充满阳光感，激发创作热情和积极情绪</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full">活力阳光</span>
                  <div class="w-6 h-6 bg-orange-200 border-2 border-orange-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        <!-- Bottom text section -->
        <div class="text-center scroll-animate" style="transition-delay: 1.0s;">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">更多主题持续更新</h3>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">我们不断推出新的主题设计，让你的文档始终保持新鲜感</p>
        </div>
      </div>
    </section>

    <!-- AI Integration Section -->
    <section class="relative min-h-screen py-20 overflow-hidden">
      <div class="relative container-custom">
        <!-- Section header -->
        <div class="text-center mb-16 scroll-animate" style="transition-delay: 0.1s;">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 scroll-animate" style="transition-delay: 0.2s;">
            一站式智能体验
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto scroll-animate" style="transition-delay: 0.3s;">
            Welight目前已集成多个主流AI模型，为你的写作提供智能辅助，让创作更加高效和灵感无限
          </p>
        </div>

        <!-- AI Models showcase -->
        <div class="mb-16">

          <!-- Models grid -->
          <div class="flex flex-wrap justify-center items-center gap-12 mb-12">
            <!-- DeepSeek -->
            <div class="group scroll-animate scale-up" style="transition-delay: 0.5s;">
              <div class="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-white/50 transition-all duration-300">
                <div class="w-20 h-20 flex items-center justify-center">
                  <img
                    src="https://images.waer.ltd/notes/202508281524593.png"
                    alt="DeepSeek Logo"
                    class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h4 class="text-lg font-bold text-gray-900">DeepSeek</h4>
              </div>
            </div>

            <!-- Gemini -->
            <div class="group scroll-animate scale-up" style="transition-delay: 0.6s;">
              <div class="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-white/50 transition-all duration-300">
                <div class="w-20 h-20 flex items-center justify-center">
                  <img
                    src="https://images.waer.ltd/notes/202508281524560.png"
                    alt="Gemini Logo"
                    class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h4 class="text-lg font-bold text-gray-900">Gemini</h4>
              </div>
            </div>

            <!-- Grok -->
            <div class="group scroll-animate scale-up" style="transition-delay: 0.7s;">
              <div class="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-white/50 transition-all duration-300">
                <div class="w-20 h-20 flex items-center justify-center">
                  <img
                    src="https://images.waer.ltd/notes/202508281524601.png"
                    alt="Grok Logo"
                    class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h4 class="text-lg font-bold text-gray-900">Grok</h4>
              </div>
            </div>

            <!-- Ollama -->
            <div class="group scroll-animate scale-up" style="transition-delay: 0.8s;">
              <div class="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-white/50 transition-all duration-300">
                <div class="w-20 h-20 flex items-center justify-center relative">
                  <img
                    src="https://images.waer.ltd/notes/202509050835689.png"
                    alt="Ollama Logo"
                    class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <!-- 本地模型标签 -->
                  <span class="absolute -top-1 -right-1 text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full font-medium border border-white shadow-sm">本地模型</span>
                </div>
                <h4 class="text-lg font-bold text-gray-900">Ollama</h4>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Features showcase with images -->
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left side - AI Writing Assistant -->
          <div class="order-2 lg:order-1 scroll-animate fade-left" style="transition-delay: 0.9s;">
            <div class="relative">
              <!-- Background glow -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-200/20 via-blue-200/10 to-purple-200/20 rounded-3xl blur-3xl"></div>

              <!-- Screenshot container -->
              <div class="relative transform hover:scale-105 transition-all duration-700 group">
                <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <!-- Inner glow -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                  <!-- AI Writing screenshot -->
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.waer.ltd/notes/202508302311016.png"
                      alt="AI写作助手功能展示"
                      class="w-full h-auto transform group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>

                  <!-- Enhanced shadows -->
                  <div class="absolute -inset-4 bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-3xl blur-xl -z-10"></div>
                  <div class="absolute -inset-8 bg-gradient-to-br from-primary-500/5 to-purple-500/5 rounded-3xl blur-2xl -z-20"></div>
                </div>

                <!-- Floating AI indicator -->
                <div class="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Right side - AI Features -->
          <div class="order-1 lg:order-2 space-y-8">
            <!-- Main feature title -->
            <div class="scroll-animate fade-right" style="transition-delay: 1.0s;">
              <h3 class="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
                智能写作助手
              </h3>
              <p class="text-lg text-gray-600 leading-relaxed">
                AI深度集成到编辑器中，提供智能化的协作辅助、内容优化和创意灵感，让你的写作更加高效和专业。
              </p>
            </div>

            <!-- Feature list -->
            <div class="space-y-6">
              <!-- Feature 1 -->
              <div class="flex items-start space-x-4 scroll-animate fade-right" style="transition-delay: 1.1s;">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">智能续写</h4>
                  <p class="text-gray-600">AI根据上下文智能续写内容，保持文章风格一致性</p>
                </div>
              </div>

              <!-- Feature 2 -->
              <div class="flex items-start space-x-4 scroll-animate fade-right" style="transition-delay: 1.2s;">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">多语言翻译</h4>
                  <p class="text-gray-600">内置13中不同语言的的AI翻译支持,黑哥们儿语言是通的。</p>
                </div>
              </div>

              <!-- Feature 3 -->
              <div class="flex items-start space-x-4 scroll-animate fade-right" style="transition-delay: 1.3s;">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">快捷转换</h4>
                  <p class="text-gray-600">内置AI文本格式智能转换,TXT一键转写Markdown,没有语法门槛。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Second AI feature section -->
        <div class="grid lg:grid-cols-2 gap-16 items-center mt-20">
          <!-- Left side - AI Features -->
          <div class="space-y-8">
            <!-- Main feature title -->
            <div class="scroll-animate fade-left" style="transition-delay: 1.4s;">
              <h3 class="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
                智能内容生成
              </h3>
              <p class="text-lg text-gray-600 leading-relaxed">
                基于强大的AI模型，快速创作高质量内容，包括文章、段落扩展、摘要提取等多种创作辅助功能。
              </p>
            </div>

            <!-- Feature list -->
            <div class="space-y-6">
              <!-- Feature 1 -->
              <div class="flex items-start space-x-4 scroll-animate fade-left" style="transition-delay: 1.5s;">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">内容润色</h4>
                  <p class="text-gray-600">划词选中内容,AI一键润色，搬砖的牛马，也有文采飞扬。</p>
                </div>
              </div>

              <!-- Feature 2 -->
              <div class="flex items-start space-x-4 scroll-animate fade-left" style="transition-delay: 1.6s;">
                <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">摘要提取</h4>
                  <p class="text-gray-600">自动提取文章指定内容关键信息，生成精准摘要,一键取舍。</p>
                </div>
              </div>

              <!-- Feature 3 -->
              <div class="flex items-start space-x-4 scroll-animate fade-left" style="transition-delay: 1.7s;">
                <div class="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">图表创作</h4>
                  <p class="text-gray-600">智能化将文章数据转为丰富专业的数据图和表,推文逼格满满。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right side - AI Content Generation -->
          <div class="scroll-animate fade-right" style="transition-delay: 1.8s;">
            <div class="relative">
              <!-- Background glow -->
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-200/20 via-purple-200/10 to-pink-200/20 rounded-3xl blur-3xl"></div>

              <!-- Screenshot container -->
              <div class="relative transform hover:scale-105 transition-all duration-700 group">
                <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <!-- Inner glow -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                  <!-- AI Content Generation screenshot -->
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.waer.ltd/notes/202508302306766.png"
                      alt="AI内容生成功能展示"
                      class="w-full h-auto transform group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>

                  <!-- Enhanced shadows -->
                  <div class="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl -z-10"></div>
                  <div class="absolute -inset-8 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl blur-2xl -z-20"></div>
                </div>

                <!-- Floating AI indicator -->
                <div class="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom teaser text -->
        <div class="text-center mt-16 scroll-animate" style="transition-delay: 1.9s;">
          <p class="text-xl md:text-2xl font-medium text-gray-600 italic">
            更多AI功能等你来撩....
          </p>
        </div>
      </div>
    </section>

    <!-- Markdown Support Section -->
    <section class="relative min-h-screen py-20 overflow-hidden">
      <div class="relative container-custom">
        <!-- Section header -->
        <div class="text-center mb-16 scroll-animate" style="transition-delay: 0.1s;">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 scroll-animate" style="transition-delay: 0.2s;">
            强大的Markdown语法标准
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto scroll-animate" style="transition-delay: 0.3s;">
            全面支持标准Markdown语法及扩展功能，让你的文档编写更加高效和专业
          </p>
        </div>

        <!-- Markdown features grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <!-- Basic Syntax -->
          <div class="scroll-animate scale-up" style="transition-delay: 0.4s;">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-primary-300/50 transition-all duration-300 hover:shadow-lg h-full">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">基础语法</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  标题 (H1-H6)
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  粗体、斜体、删除线
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  有序、无序列表
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  链接和图片
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  引用块
                </li>
              </ul>
            </div>
          </div>

          <!-- Code Support -->
          <div class="scroll-animate scale-up" style="transition-delay: 0.5s;">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-lg h-full">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">代码支持</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  行内代码
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  代码块
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  语法高亮
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  多语言支持
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  代码行号
                </li>
              </ul>
            </div>
          </div>

          <!-- Tables -->
          <div class="scroll-animate scale-up" style="transition-delay: 0.6s;">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-green-300/50 transition-all duration-300 hover:shadow-lg h-full">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">表格功能</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  标准表格语法
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  列对齐控制
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  表格样式美化
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  可视化编辑
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  导入导出支持
                </li>
              </ul>
            </div>
          </div>

          <!-- Math & Formulas -->
          <div class="scroll-animate scale-up" style="transition-delay: 0.7s;">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-purple-300/50 transition-all duration-300 hover:shadow-lg h-full">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">数学公式</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  LaTeX 数学公式
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  行内公式
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  块级公式
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  公式编号
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  实时预览
                </li>
              </ul>
            </div>
          </div>

          <!-- Extended Features -->
          <div class="scroll-animate scale-up" style="transition-delay: 0.8s;">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-orange-300/50 transition-all duration-300 hover:shadow-lg h-full">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">扩展功能</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  任务列表
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  脚注支持
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  定义列表
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  缩略语
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  高亮标记
                </li>
              </ul>
            </div>
          </div>

          <!-- Diagrams -->
          <div class="scroll-animate scale-up" style="transition-delay: 0.9s;">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-indigo-300/50 transition-all duration-300 hover:shadow-lg h-full">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">图表支持</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Mermaid 图表
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  流程图
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  时序图
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  甘特图
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  思维导图
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Markdown advantages -->
        <div class="text-center scroll-animate" style="transition-delay: 1.0s;">
          <div class="max-w-4xl mx-auto">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">为什么选择Markdown？</h3>

            <div class="grid md:grid-cols-3 gap-8">
              <!-- Advantage 1 -->
              <div class="scroll-animate fade-up text-center" style="transition-delay: 1.1s;">
                <h4 class="text-xl font-bold text-gray-900 mb-3">简单高效</h4>
                <p class="text-gray-600">轻量级标记语言，学习成本低，书写效率高，专注内容创作</p>
              </div>

              <!-- Advantage 2 -->
              <div class="scroll-animate fade-up text-center" style="transition-delay: 1.2s;">
                <h4 class="text-xl font-bold text-gray-900 mb-3">跨平台兼容</h4>
                <p class="text-gray-600">标准化格式，在任何平台和设备上都能完美显示和编辑</p>
              </div>

              <!-- Advantage 3 -->
              <div class="scroll-animate fade-up text-center" style="transition-delay: 1.3s;">
                <h4 class="text-xl font-bold text-gray-900 mb-3">版本控制友好</h4>
                <p class="text-gray-600">纯文本格式，完美支持Git等版本控制系统，协作更便捷</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom text -->
        <div class="text-center mt-16 scroll-animate" style="transition-delay: 1.4s;">
          <p class="text-xl md:text-2xl font-medium text-gray-600">
            让Welight成为你高效写作的得力助手
          </p>
        </div>

        <!-- 反馈链接区域 -->
        <div class="text-center mt-12 scroll-animate" style="transition-delay: 1.6s;">
          <div class="inline-flex items-center space-x-6 px-6 py-4 bg-gray-50 rounded-xl">
            <div class="flex items-center space-x-2 text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span class="font-medium">遇到问题或有建议？</span>
            </div>
            <div class="flex items-center space-x-4">
              <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file"
                 target="_blank"
                 class="inline-flex items-center space-x-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>问题反馈</span>
              </a>
              <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file"
                 target="_blank"
                 class="inline-flex items-center space-x-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>功能诉求</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- 开发模式下的API测试组件 -->
    <div v-if="isDev" class="fixed bottom-4 right-4 z-50">
      <DownloadStatsTest />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { handleDownload, initializeDownloadStats, startStatsSync, getDownloadStats } from '@/services/downloadStats'
import DownloadStatsTest from '@/components/DownloadStatsTest.vue'
import { useSEO, seoConfigs } from '@/composables/useSEO'

// SEO配置
useSEO(seoConfigs.home)

// 开发模式检测
const isDev = import.meta.env.DEV

// 路由实例
const route = useRoute()

// 横幅通知状态
const showBanner = ref(true)
const bannerVisible = ref(true) // 初始就显示，避免闪动

// 下载统计数据 - 从后端API获取真实统计
const downloadStats = ref({
  'windows-installer': 0,
  'windows-msi': 0,
  'macos-apple': 0,
  'macos-intel': 0,
  'linux-appimage': 0,
  'linux-deb': 0,
  'linux-rpm': 0
})

// 后端原始统计数据
const backendStats = ref(null)

// 动画数字状态
const animatedTotalDownloads = ref(0)
const animatedMacDownloads = ref(0)
const animatedWindowsDownloads = ref(0)
const animatedLinuxDownloads = ref(0)

// 计算总下载量 - 优先使用后端数据
const totalDownloads = computed(() => {
  if (backendStats.value && backendStats.value.totalDownloads !== undefined) {
    return backendStats.value.totalDownloads
  }
  return Object.values(downloadStats.value).reduce((total, count) => total + count, 0)
})

// 数字递增动画函数
const animateNumber = (from, to, duration, callback) => {
  // 确保输入值是有效数字
  const fromNum = Number(from) || 0
  const toNum = Number(to) || 0
  const durationNum = Number(duration) || 1000

  const startTime = Date.now()
  const difference = toNum - fromNum

  const step = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / durationNum, 1)

    // 使用缓动函数，让动画更自然
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(fromNum + difference * easeOutQuart)

    callback(current)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      callback(toNum) // 确保最终值准确
    }
  }

  requestAnimationFrame(step)
}

// 计算各平台总下载量
const getPlatformDownloads = () => {
  const stats = downloadStats.value
  return {
    windows: (stats['windows-installer'] || 0) + (stats['windows-msi'] || 0),
    macos: (stats['macos-apple'] || 0) + (stats['macos-intel'] || 0),
    linux: (stats['linux-appimage'] || 0) + (stats['linux-deb'] || 0) + (stats['linux-rpm'] || 0)
  }
}

// 从后端数据获取平台下载量
const getPlatformDownloadsFromBackend = () => {
  if (backendStats.value && backendStats.value.platformDownloads) {
    return {
      windows: backendStats.value.platformDownloads.windows || 0,
      macos: backendStats.value.platformDownloads.mac || 0, // 注意：API返回的是'mac'不是'macos'
      linux: backendStats.value.platformDownloads.linux || 0
    }
  }
  return getPlatformDownloads() // 回退到本地计算
}

// 启动下载数据动画
const startDownloadAnimation = () => {
  const platformStats = getPlatformDownloadsFromBackend()

  // 总下载量动画
  animateNumber(0, totalDownloads.value, 2000, (value) => {
    animatedTotalDownloads.value = value
  })

  // macOS下载量动画（两种安装包总和）
  animateNumber(0, platformStats.macos, 1800, (value) => {
    animatedMacDownloads.value = value
  })

  // Windows下载量动画（两种安装包总和）
  animateNumber(0, platformStats.windows, 1600, (value) => {
    animatedWindowsDownloads.value = value
  })

  // Linux下载量动画（三种安装包总和）
  animateNumber(0, platformStats.linux, 1400, (value) => {
    animatedLinuxDownloads.value = value
  })
}

// 横幅通知相关函数
const closeBanner = () => {
  // 先播放收起动画
  bannerVisible.value = false
  // 延迟隐藏横幅
  setTimeout(() => {
    showBanner.value = false
  }, 700) // 与动画时长一致
}

// 下载文件函数
const downloadFile = async (platform) => {
  try {
    // 实际下载链接映射
    const downloadUrls = {
      'windows-installer': 'https://waer.ltd/downloads/windows/Welight_2.4.1_x64-setup.exe',
      'windows-msi': 'https://waer.ltd/downloads/windows/Welight_2.4.1_x64_en-US.msi',
      'macos-apple': 'https://waer.ltd/downloads/mac/Welight_2.4.1_aarch64.dmg',
      'macos-intel': 'https://waer.ltd/downloads/mac/Welight_2.4.1_x64.dmg',
      'linux-appimage': 'https://waer.ltd/downloads/linux/Welight_2.4.1_amd64.AppImage'
    }

    const downloadUrl = downloadUrls[platform]

    if (downloadUrl) {
      // 使用新的下载处理服务，传入更新本地统计的回调
      const updateLocalStats = async (downloadedPlatform) => {
        try {
          // 更新本地统计数据
          const currentStats = { ...downloadStats.value }
          if (currentStats[downloadedPlatform] !== undefined) {
            currentStats[downloadedPlatform] += 1
          }
          downloadStats.value = currentStats

          // 同时刷新后端原始数据
          const rawData = await getDownloadStats()
          if (rawData) {
            backendStats.value = rawData
          }
          console.log('本地统计已更新:', currentStats, '后端数据:', rawData)

          // 数据更新后重新启动动画
          setTimeout(() => {
            startDownloadAnimation()
          }, 300)
        } catch (error) {
          console.error('更新本地统计失败:', error)
        }
      }

      await handleDownload(platform, downloadUrl, updateLocalStats)
    } else {
      console.log(`${platform} 版本暂不可用`)
      alert(`${platform} 版本即将推出，敬请期待！`)
    }
  } catch (error) {
    console.error('下载处理失败:', error)
    // 下载失败也不应该影响页面状态
  }
}

// 初始化下载统计数据
const loadDownloadStats = async () => {
  try {
    // 先获取后端原始数据
    const rawData = await getDownloadStats()
    if (rawData) {
      backendStats.value = rawData
      console.log('后端原始数据:', rawData)
    }

    // 再获取映射后的数据
    const stats = await initializeDownloadStats()
    downloadStats.value = stats
    console.log('映射后的统计数据:', stats)

    // 数据加载完成后，延迟启动动画
    setTimeout(() => {
      startDownloadAnimation()
    }, 1000) // 延迟1秒，让页面元素先渲染
  } catch (error) {
    console.error('初始化下载统计数据失败:', error)
  }
}

// 滚动触发动画
let observer = null
let statsCleanup = null
const isInitialized = ref(false)

// 重置页面状态
const resetPageState = () => {
  // 清理之前的observer
  if (observer) {
    observer.disconnect()
    observer = null
  }

  // 重置动画状态
  const allAnimatedElements = document.querySelectorAll('.animate-in-view, .scroll-animate-first')
  allAnimatedElements.forEach((el) => {
    el.classList.remove('animate-in-view', 'scroll-animate-first')
  })

  isInitialized.value = false
}

// 初始化页面动画
const initializeAnimations = () => {
  if (isInitialized.value) return

  // 使用 nextTick 确保 DOM 已完全渲染
  nextTick(() => {
    try {
      // 确保页面滚动到顶部
      window.scrollTo(0, 0)

      // 创建 Intersection Observer 来监听元素进入视口
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当元素进入视口时，添加动画类
            entry.target.classList.add('animate-in-view')
          } else {
            // 当元素离开视口时，移除动画类，以便下次进入时重新触发
            entry.target.classList.remove('animate-in-view')
          }
        })
      }, {
        threshold: 0.3, // 当元素30%可见时触发
        rootMargin: '0px 0px -100px 0px' // 提前100px触发
      })

      // 观察所有需要动画的元素
      const animatedElements = document.querySelectorAll('.scroll-animate')
      console.log(`找到 ${animatedElements.length} 个滚动动画元素`)
      animatedElements.forEach((el) => {
        if (observer) observer.observe(el)
      })

      // 为首页元素也添加滚动监听
      const firstPageElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in')
      console.log(`找到 ${firstPageElements.length} 个首页动画元素`)
      firstPageElements.forEach((el) => {
        // 给首页元素添加scroll-animate类
        el.classList.add('scroll-animate-first')
        if (observer) observer.observe(el)
      })

      // 强制触发首屏动画
      setTimeout(() => {
        const heroElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in')
        heroElements.forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('animate-in-view')
          }
        })
      }, 100)

      isInitialized.value = true
      console.log('页面动画初始化完成')
    } catch (error) {
      console.error('动画初始化失败:', error)
      isInitialized.value = true // 即使失败也标记为已初始化，避免重复尝试
    }
  })
}

onMounted(async () => {
  // 重置页面状态
  resetPageState()

  // 横幅初始就显示，无需延迟

  try {
    // 初始化下载统计数据
    await loadDownloadStats()

    // 启动统计数据同步（每5分钟同步一次）
    statsCleanup = startStatsSync(async (newStats) => {
      downloadStats.value = newStats
      // 同时更新后端原始数据
      const rawData = await getDownloadStats()
      if (rawData) {
        backendStats.value = rawData
      }

      // 定期同步时也重新启动动画
      setTimeout(() => {
        startDownloadAnimation()
      }, 300)
    }, 5 * 60 * 1000)

    // 初始化动画
    initializeAnimations()
  } catch (error) {
    console.error('页面初始化失败:', error)
    // 即使数据加载失败，也要初始化动画
    initializeAnimations()
  }
})

// 监听路由变化，确保每次回到首页都能正确初始化
watch(() => route.path, (newPath, oldPath) => {
  if (newPath === '/' && oldPath !== '/') {
    console.log('返回首页，重新初始化...')
    // 延迟一点时间确保页面完全加载
    setTimeout(() => {
      resetPageState()
      initializeAnimations()
    }, 100)
  }
}, { immediate: false })

// 监听页面可见性变化
const handleVisibilityChange = () => {
  if (!document.hidden && route.path === '/') {
    console.log('页面重新可见，检查初始化状态...')
    // 如果页面重新可见且在首页，确保动画正常
    if (!isInitialized.value) {
      setTimeout(() => {
        initializeAnimations()
      }, 200)
    }
  }
}

// 添加页面可见性监听
document.addEventListener('visibilitychange', handleVisibilityChange)

onUnmounted(() => {
  // 清理 Intersection Observer
  if (observer) {
    observer.disconnect()
    observer = null
  }

  // 清理统计数据同步
  if (statsCleanup) {
    statsCleanup()
    statsCleanup = null
  }

  // 清理页面可见性监听
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  // 重置状态
  isInitialized.value = false

  console.log('首页组件已卸载，清理完成')
})
</script>
