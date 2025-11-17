<template>
  <div class="relative min-h-screen bg-white">
    <AnimatedGridPattern
      :num-squares="20"
      :max-opacity="0.15"
      :duration="4"
    />
    <div class="min-h-screen text-gray-200 pt-20 relative overflow-hidden" style="position: relative; z-index: 1;">
      <!-- Hero Section -->
      <section class="section-padding">
        <div class="container-custom text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            强大的功能特性
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            探索我们为您精心打造的每一个功能，让文档编辑变得更加智能、高效和愉悦
          </p>
        </div>
      </section>

      <!-- AI Features Section -->
      <section class="section-padding bg-white dark:bg-gray-900">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                AI 智能集成
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                无缝对接主流AI模型，释放您的创作潜能。支持 OpenAI、Claude、Gemini 等多种模型，提供智能写作辅助。
              </p>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">划词工具栏 AI</h3>
                    <p class="text-gray-600 dark:text-gray-300">选中文本即可触发智能工具栏，快速执行翻译、摘要、扩写等操作</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">对话式 AI 助手</h3>
                    <p class="text-gray-600 dark:text-gray-300">完整的聊天界面，支持多轮对话和文档交互</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">智能修订系统</h3>
                    <p class="text-gray-600 dark:text-gray-300">类似 Grammarly 的智能修订，支持语法检查和风格优化</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card p-8">
              <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 class="text-xl font-semibold mb-4">AI 工作流程</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1
                    </div>
                    <span>选择 AI 模型</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2
                    </div>
                    <span>设置生成参数</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3
                    </div>
                    <span>即时生成内容</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Performance Section -->
      <section class="section-padding bg-gray-50 dark:bg-gray-800">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <div class="card p-8">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">性能对比</h3>
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-gray-600 dark:text-gray-300">文件加载速度 (100万字符)</span>
                    </div>
                    <div class="space-y-2">
                      <div class="flex items-center space-x-3">
                        <span class="w-16 text-sm text-gray-500">Typora</span>
                        <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div class="bg-red-500 h-2 rounded-full" style="width: 75%"></div>
                        </div>
                        <span class="text-sm text-gray-600 dark:text-gray-300">7.5s</span>
                      </div>
                      <div class="flex items-center space-x-3">
                        <span class="w-16 text-sm text-primary-600 font-medium">您的应用</span>
                        <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div class="bg-primary-500 h-2 rounded-full" style="width: 20%"></div>
                        </div>
                        <span class="text-sm text-primary-600 font-medium">2s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                极致性能优化
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                专为大型文档设计，解决传统编辑器的性能瓶颈。采用 Rust 保存引擎和虚拟 DOM 技术，确保流畅的编辑体验。
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Rust 保存引擎</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">高性能和线程安全</p>
                </div>
                <div class="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">虚拟 DOM</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">只渲染可见区域</p>
                </div>
                <div class="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">智能渲染</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">动态加载内容</p>
                </div>
                <div class="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">实时保存</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">自动保存机制</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- WYSIWYG Section -->
      <section class="section-padding bg-white dark:bg-gray-900">
        <div class="container-custom">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              所见即所得编辑
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              轻松创建结构化文档，所见即所得，不需要记忆复杂的 Markdown 语法
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="card p-6 text-center">
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">划词工具栏</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">选中文本即可显示格式化工具栏</p>
            </div>

            <div class="card p-6 text-center">
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Slash 命令</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">输入 / 即可打开命令菜单</p>
            </div>

            <div class="card p-6 text-center">
              <div
                class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">表情符号</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">快速插入表情符号</p>
            </div>

            <div class="card p-6 text-center">
              <div
                class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">快捷键</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">使用 # 创建标题，* 创建列表</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-padding bg-gradient-to-r from-primary-600 to-purple-600">
        <div class="container-custom text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            体验这些强大功能
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            立即下载，开始您的智能文档编辑之旅
          </p>
          <router-link to="/download"
            class="inline-flex items-center bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            免费下载
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import AnimatedGridPattern from '@/components/AnimatedGridPattern.vue'
// 功能特性页面逻辑
</script>

<style scoped>
</style>
