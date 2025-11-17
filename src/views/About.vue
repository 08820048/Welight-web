<template>
  <div class="relative min-h-screen bg-white">
    <AnimatedGridPattern
      :num-squares="30"
      :max-opacity="0.1"
      :duration="3"
      :repeat-delay="1"
      class-name="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
    />
    <div class="min-h-screen text-gray-200 pt-20 relative overflow-hidden" style="position: relative; z-index: 1;">
    <!-- Hero Section -->
    <section class="section-padding">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          关于我们
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          我们致力于打造最智能、最高效的文档编辑体验，让每个人都能轻松创作出色的内容
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              我们的使命
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              在数字化时代，文档编辑是每个人日常工作中不可或缺的一部分。我们相信，优秀的工具应该让创作变得更加简单、高效和愉悦。
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              我们的目标是结合最新的 AI 技术和现代化的用户界面设计，为用户提供一个既强大又易用的文档编辑平台。
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">10万+</div>
                <div class="text-gray-600 dark:text-gray-300">活跃用户</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.9%</div>
                <div class="text-gray-600 dark:text-gray-300">稳定性</div>
              </div>
            </div>
          </div>
          <div class="card p-8">
            <div class="bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 class="text-2xl font-bold mb-4">我们的愿景</h3>
              <p class="text-primary-100 mb-6">
                成为全球领先的智能文档编辑平台，让每个人都能轻松创作出专业、美观的文档。
              </p>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-primary-100">智能化编辑体验</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-primary-100">跨平台无缝协作</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-primary-100">持续创新发展</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            我们的价值观
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            这些核心价值观指导着我们的每一个决策和行动
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">创新</h3>
            <p class="text-gray-600 dark:text-gray-300">持续探索新技术，为用户带来更好的体验</p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">用户至上</h3>
            <p class="text-gray-600 dark:text-gray-300">始终以用户需求为中心，提供最佳解决方案</p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">高效</h3>
            <p class="text-gray-600 dark:text-gray-300">追求极致性能，让每一次操作都快速响应</p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">安全</h3>
            <p class="text-gray-600 dark:text-gray-300">保护用户数据安全，建立可信赖的平台</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            我们的团队
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            由经验丰富的工程师和设计师组成的专业团队
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-6 text-center">
            <div
              class="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-xl font-bold">张</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">张三</h3>
            <p class="text-primary-600 dark:text-primary-400 mb-3">创始人 & CEO</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              10年软件开发经验，专注于用户体验和产品创新
            </p>
          </div>

          <div class="card p-6 text-center">
            <div
              class="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-xl font-bold">李</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">李四</h3>
            <p class="text-primary-600 dark:text-primary-400 mb-3">技术总监</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              AI技术专家，负责产品的核心技术架构和算法优化
            </p>
          </div>

          <div class="card p-6 text-center">
            <div
              class="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-xl font-bold">王</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">王五</h3>
            <p class="text-primary-600 dark:text-primary-400 mb-3">设计总监</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              资深UI/UX设计师，致力于打造直观美观的用户界面
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            联系我们
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            有任何问题或建议？我们很乐意听到您的声音
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">邮箱</h3>
            <p class="text-gray-600 dark:text-gray-300">contact@yourapp.com</p>
          </div>

          <div class="text-center">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">地址</h3>
            <p class="text-gray-600 dark:text-gray-300">北京市朝阳区科技园</p>
          </div>

          <div class="text-center">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">电话</h3>
            <p class="text-gray-600 dark:text-gray-300">+86 400-123-4567</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <a href="mailto:contact@yourapp.com" class="btn-primary">
            发送邮件
          </a>
        </div>
      </div>
    </section>
  </div>
  </div>

</template>

<script setup>
import { useSEO, seoConfigs } from '@/composables/useSEO'

// SEO配置
useSEO(seoConfigs.about)
</script>

<style scoped>

</style>
