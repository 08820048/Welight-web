<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Hero Section -->
    <section class="relative min-h-screen pt-20 overflow-hidden">
      <div class="relative container-custom h-full">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center min-h-[calc(100vh-5rem)]">
          <!-- Left content -->
          <div class="order-2 lg:order-1 lg:col-span-2">
            <!-- Main heading -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up delay-100">
              <span class="block animate-fade-in-left delay-200">智能高效的</span>
              <span class="block gradient-text animate-fade-in-left delay-300">公众号推文编辑排版美化体验</span>
            </h1>

            <!-- Description -->
            <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up delay-400">
              Welight 是一款专业为微信公众号创作者打造的一款拥有更优性能、智能、快捷轻量的免费排版工具，排版与编辑，亦可兼得。
            </p>

            <!-- CTA buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up delay-500">
              <!-- macOS Download Button -->
              <button class="download-btn-mac group relative overflow-hidden bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between flex-1 sm:flex-none sm:min-w-[200px] animate-scale-in delay-600">
                <!-- Apple Logo -->
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                <span class="text-base mx-2">下载最新版</span>
                <!-- Animated Download Icon -->
                <svg class="w-4 h-4 text-white animate-enhanced-bounce group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              <!-- Windows Download Button -->
              <button class="download-btn-windows group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between flex-1 sm:flex-none sm:min-w-[200px] animate-scale-in delay-700">
                <!-- Windows Logo -->
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z"/>
                </svg>
                <span class="text-base mx-2">Windows 版本</span>
                <!-- Animated Download Icon -->
                <svg class="w-4 h-4 text-white animate-enhanced-bounce group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>

            <!-- Platform support info -->
            <div class="text-sm text-gray-500 mb-4 animate-fade-in-up delay-600">
              其他平台请前往下载页面
            </div>

            <!-- Linux Download Button -->
            <button class="download-btn-linux group relative overflow-hidden bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between max-w-xs animate-scale-in delay-800">
              <!-- Linux Logo -->
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268-.4-.051-.811-.03-1.206-.125-.365-.086-.718-.224-1.05-.479-.297-.239-.543-.527-.708-.815-.194-.328-.353-.66-.401-1.058-.035-.31-.008-.579.15-.849.135-.23.355-.406.608-.523.404-.187.818-.131 1.259-.199v-.016h-.073zm-2.452 7.407h.016c.442.02.72.199 1.004.284.336.099.672.198 1.062.201.435-.006.81-.118 1.18-.284.06-.03.135-.044.195-.09.225-.136.405-.334.558-.538.404-.534.67-1.126.972-1.67.17-.3.346-.3.521-.06.299.404.413.842.477 1.314.037.279.017.558-.031.818-.064.434-.23.747-.475 1.005-.154.15-.346.3-.504.465-.225.24-.42.48-.668.671-.537.434-1.108.747-1.764.925-.612.15-1.238.12-1.854.06-.292-.03-.584-.06-.87-.135-.255-.06-.51-.135-.725-.27-.154-.09-.293-.225-.417-.375-.109-.135-.199-.284-.25-.465-.047-.181-.016-.378.031-.553.064-.24.209-.464.403-.629.226-.181.478-.284.751-.329.399-.06.818.044 1.207-.105.06-.023.12-.06.18-.104h-.011z"/>
              </svg>
              <span class="text-base mx-2">Linux 版本</span>
              <!-- Animated Download Icon -->
              <svg class="w-4 h-4 text-white animate-enhanced-bounce group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            <!-- Platform icons -->
            <div class="flex items-center space-x-6 mt-6 animate-fade-in-up delay-700">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z"/>
                  </svg>
                </div>
                <span class="text-sm text-gray-600">Windows MSI</span>
              </div>

              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                </div>
                <span class="text-sm text-gray-600">ARM64</span>
              </div>

              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268-.4-.051-.811-.03-1.206-.125-.365-.086-.718-.224-1.05-.479-.297-.239-.543-.527-.708-.815-.194-.328-.353-.66-.401-1.058-.035-.31-.008-.579.15-.849.135-.23.355-.406.608-.523.404-.187.818-.131 1.259-.199v-.016h-.073zm-2.452 7.407h.016c.442.02.72.199 1.004.284.336.099.672.198 1.062.201.435-.006.81-.118 1.18-.284.06-.03.135-.044.195-.09.225-.136.405-.334.558-.538.404-.534.67-1.126.972-1.67.17-.3.346-.3.521-.06.299.404.413.842.477 1.314.037.279.017.558-.031.818-.064.434-.23.747-.475 1.005-.154.15-.346.3-.504.465-.225.24-.42.48-.668.671-.537.434-1.108.747-1.764.925-.612.15-1.238.12-1.854.06-.292-.03-.584-.06-.87-.135-.255-.06-.51-.135-.725-.27-.154-.09-.293-.225-.417-.375-.109-.135-.199-.284-.25-.465-.047-.181-.016-.378.031-.553.064-.24.209-.464.403-.629.226-.181.478-.284.751-.329.399-.06.818.044 1.207-.105.06-.023.12-.06.18-.104h-.011z"/>
                  </svg>
                </div>
                <span class="text-sm text-gray-600">Linux DEB</span>
              </div>
            </div>
          </div>

          <!-- Right image -->
          <div class="order-1 lg:order-2 lg:col-span-3 flex items-center justify-end relative pl-8 lg:pl-12 animate-fade-in-right delay-300">
            <!-- Background glow effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary-200/20 via-blue-200/10 to-purple-200/20 rounded-3xl blur-3xl"></div>

            <!-- Main screenshot container -->
            <div class="relative w-full max-w-3xl ml-auto animate-scale-in delay-500">
              <div class="relative transform rotate-3 hover:rotate-1 transition-all duration-700 group perspective-1000">
                <!-- Screenshot with enhanced styling -->
                <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 hero-screenshot-container">
                  <!-- Subtle inner glow -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                  <!-- Main image -->
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.waer.ltd/notes/202508281311929.png"
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
                      src="https://images.waer.ltd/notes/202508281313370.png"
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
          <!-- Theme 1 - 经典白色 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.4s;">
            <div class="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508281311929.png"
                  alt="经典白色主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">经典白色</h3>
                <p class="text-gray-600 text-sm mb-4">简洁优雅的白色主题，适合正式文档和学术写作</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">默认主题</span>
                  <div class="w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 2 - 深色模式 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.5s;">
            <div class="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508281311929.png"
                  alt="深色模式主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-75"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2">深色模式</h3>
                <p class="text-gray-300 text-sm mb-4">护眼的深色主题，减少视觉疲劳，适合长时间写作</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">护眼模式</span>
                  <div class="w-6 h-6 bg-gray-800 border-2 border-gray-600 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 3 - 温暖米色 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.6s;">
            <div class="relative overflow-hidden rounded-2xl bg-amber-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508281311929.png"
                  alt="温暖米色主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter sepia-[0.3]"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-amber-900 mb-2">温暖米色</h3>
                <p class="text-amber-700 text-sm mb-4">温馨舒适的米色调，营造温暖的阅读氛围</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-amber-600 bg-amber-100 px-3 py-1 rounded-full">舒适阅读</span>
                  <div class="w-6 h-6 bg-amber-200 border-2 border-amber-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 4 - 清新绿色 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.7s;">
            <div class="relative overflow-hidden rounded-2xl bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508281311929.png"
                  alt="清新绿色主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter hue-rotate-90"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-emerald-900 mb-2">清新绿色</h3>
                <p class="text-emerald-700 text-sm mb-4">自然清新的绿色调，带来宁静的写作体验</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">自然护眼</span>
                  <div class="w-6 h-6 bg-emerald-200 border-2 border-emerald-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 5 - 优雅紫色 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.8s;">
            <div class="relative overflow-hidden rounded-2xl bg-purple-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508281311929.png"
                  alt="优雅紫色主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter hue-rotate-[270deg]"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-purple-900 mb-2">优雅紫色</h3>
                <p class="text-purple-700 text-sm mb-4">神秘优雅的紫色调，激发创意灵感</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full">创意灵感</span>
                  <div class="w-6 h-6 bg-purple-200 border-2 border-purple-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Theme 6 - 科技蓝色 -->
          <div class="group scroll-animate scale-up" style="transition-delay: 0.9s;">
            <div class="relative overflow-hidden rounded-2xl bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <!-- Theme preview image -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.waer.ltd/notes/202508281311929.png"
                  alt="科技蓝色主题"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter hue-rotate-[200deg]"
                  loading="lazy"
                />
              </div>
              <!-- Theme info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-blue-900 mb-2">科技蓝色</h3>
                <p class="text-blue-700 text-sm mb-4">现代科技感的蓝色调，适合技术文档</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">科技感</span>
                  <div class="w-6 h-6 bg-blue-200 border-2 border-blue-400 rounded-full"></div>
                </div>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        <!-- Bottom CTA section -->
        <div class="text-center scroll-animate" style="transition-delay: 1.0s;">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">更多主题持续更新</h3>
            <p class="text-gray-600 mb-6">我们不断推出新的主题设计，让你的文档始终保持新鲜感</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                立即体验主题
              </button>
              <button class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:border-primary-300 hover:bg-gray-50 transition-all duration-300">
                查看更多主题
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// 滚动触发动画
let observer = null

onMounted(() => {
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
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // 为首页元素也添加滚动监听
  const firstPageElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in')
  firstPageElements.forEach((el) => {
    // 给首页元素添加scroll-animate类
    el.classList.add('scroll-animate-first')
    observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
