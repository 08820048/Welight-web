<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-screen pt-20 overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

      <div class="relative container-custom h-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          <!-- Left content -->
          <div class="order-2 lg:order-1">
            <!-- Main heading -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span class="block">智能高效的</span>
              <span class="block gradient-text">文档编辑体验</span>
            </h1>

            <!-- Description -->
            <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Welight 是一款类似 Typora 的文档编辑器，拥有更优的性能、智能 AI 辅助和 Git 集成。
            </p>

            <!-- CTA buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <!-- macOS Download Button -->
              <button class="download-btn-mac group relative overflow-hidden bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between flex-1 sm:flex-none sm:min-w-[200px]">
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
              <button class="download-btn-windows group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between flex-1 sm:flex-none sm:min-w-[200px]">
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
            <div class="text-sm text-gray-500 mb-4">
              其他平台请前往下载页面
            </div>

            <!-- Linux Download Button -->
            <button class="download-btn-linux group relative overflow-hidden bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-between max-w-xs">
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
            <div class="flex items-center space-x-6 mt-6">
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
          <div class="order-1 lg:order-2 flex items-center justify-center">
            <div class="relative w-full max-w-5xl">
              <!-- Premium side-by-side screenshots with overlap -->
              <div class="relative w-full h-[500px] lg:h-[600px]">
                <!-- Ambient background glow -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-transparent to-purple-100/20 rounded-3xl blur-3xl transform scale-110"></div>

                <!-- Left screenshot (Editor) -->
                <div class="screenshot-left absolute left-0 top-0 w-[60%] h-full z-10">
                  <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200/50 transform -rotate-1 hover:rotate-0 transition-all duration-700 h-full group">
                    <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center space-x-3 border-b border-gray-200/50">
                      <div class="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm"></div>
                      <div class="w-3.5 h-3.5 bg-yellow-500 rounded-full shadow-sm"></div>
                      <div class="w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"></div>
                      <div class="ml-4 text-xs text-gray-500 font-medium">Welight Editor</div>
                    </div>
                    <div class="h-full overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img
                        src="https://images.waer.ltd/notes/202508281312565.png"
                        alt="Welight 编辑器界面"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <!-- Right screenshot (Themes) - overlapping -->
                <div class="screenshot-right absolute right-0 top-4 w-[60%] h-[95%] z-20">
                  <div class="relative rounded-2xl overflow-hidden shadow-3xl bg-white border border-gray-200/50 transform rotate-1 hover:rotate-0 transition-all duration-700 h-full group">
                    <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center space-x-3 border-b border-gray-200/50">
                      <div class="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm"></div>
                      <div class="w-3.5 h-3.5 bg-yellow-500 rounded-full shadow-sm"></div>
                      <div class="w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"></div>
                      <div class="ml-4 text-xs text-gray-500 font-medium">Welight Themes</div>
                    </div>
                    <div class="h-full overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img
                        src="https://images.waer.ltd/notes/202508281311929.png"
                        alt="Welight 主题预览"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <!-- Floating elements for premium feel -->
                <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-primary-400/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional info section -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom text-center">
        <p class="text-gray-600 mb-4">
          声明：Zditor 是开源项目，欢迎在 GitHub 上查看源代码。
        </p>
        <div class="flex justify-center space-x-6">
          <a href="https://waer.ltd" class="text-primary-600 hover:text-primary-700 font-medium">
            所有版本 →
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Welight 首页
</script>
