<template>
  <div class="relative min-h-screen bg-white">
    <AnimatedGridPattern
      :num-squares="50"
      :max-opacity="0.15"
      :duration="4"
    />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" style="position: relative; z-index: 1;">
    <!-- Header Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-100/30 to-purple-100/30"></div>
      
      <div class="relative container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            交流讨论
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            加入 Welight 社区，与其他创作者交流经验、分享技巧、获取帮助
          </p>
        </div>
      </div>
    </section>

    <!-- Community Groups Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <!-- QQ Group Card -->
          <div class="group">
            <div class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              <!-- Card Header -->
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div class="flex items-center space-x-3 mb-2">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <h2 class="text-2xl font-bold">QQ 交流群</h2>
                </div>
                <p class="text-blue-100">扫码加入 QQ 群，实时交流讨论</p>
              </div>

              <!-- QR Code -->
              <div class="p-8">
                <div class="bg-gray-50 rounded-xl p-6 mb-6">
                  <img 
                    src="https://images.waer.ltd/notes/202510131855546.png" 
                    alt="QQ群二维码"
                    class="w-full max-w-sm mx-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                </div>

                <!-- Features -->
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">实时在线交流，快速获得帮助</span>
                  </div>
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">分享使用技巧和创作经验</span>
                  </div>
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">第一时间获取更新通知</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- WeChat Group Card -->
          <div class="group">
            <div class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              <!-- Card Header -->
              <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div class="flex items-center space-x-3 mb-2">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.5 5C5.5 5 3 7.5 3 10.5c0 2.4 1.5 4.5 3.8 5.3.2.1.5.3.6.7.1.3.1.7 0 1-.1.2-.1.3 0 .4.1.1.3.1.4 0 .8-.4 2.2-1.2 2.8-1.6.3-.2.6-.3.9-.3h.5c3 0 5.5-2.5 5.5-5.5S11.5 5 8.5 5zm7 3c-.3 0-.5 0-.8.1.5.8.8 1.7.8 2.7 0 3.3-2.7 6-6 6h-.5c-.2 0-.4.1-.6.2.9.6 2 1 3.1 1h.5c.3 0 .6.1.9.3.6.4 2 1.2 2.8 1.6.1.1.3.1.4 0 .1-.1.1-.2 0-.4-.1-.3-.1-.7 0-1 .1-.4.4-.6.6-.7 2.3-.8 3.8-2.9 3.8-5.3 0-3-2.5-5.5-5.5-5.5z"/>
                  </svg>
                  <h2 class="text-2xl font-bold">微信交流群</h2>
                </div>
                <p class="text-green-100">扫码添加微信，邀请进群交流</p>
              </div>

              <!-- QR Code -->
              <div class="p-8">
                <div class="bg-gray-50 rounded-xl p-6 mb-6">
                  <img 
                    src="https://images.waer.ltd/notes/202510131855308.jpg" 
                    alt="微信群二维码"
                    class="w-full max-w-sm mx-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                </div>

                <!-- Features -->
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">与公众号创作者深度交流</span>
                  </div>
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">获取排版灵感和创作建议</span>
                  </div>
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">参与产品功能讨论和建议</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Additional Info -->
        <div class="mt-16 text-center">
          <div class="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">社区规则</h3>
            <div class="text-left space-y-3 text-gray-600">
              <p class="flex items-start space-x-2">
                <span class="text-primary-500 font-bold">•</span>
                <span>保持友善和尊重，共同营造良好的交流氛围</span>
              </p>
              <p class="flex items-start space-x-2">
                <span class="text-primary-500 font-bold">•</span>
                <span>分享有价值的内容，避免发送无关信息</span>
              </p>
              <p class="flex items-start space-x-2">
                <span class="text-primary-500 font-bold">•</span>
                <span>遇到问题时，请详细描述以便获得更好的帮助</span>
              </p>
              <p class="flex items-start space-x-2">
                <span class="text-primary-500 font-bold">•</span>
                <span>禁止发布广告、违法违规内容</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  </div>

</template>

<script setup>
import AnimatedGridPattern from \'@/components/AnimatedGridPattern.vue\'
import { useSEO, seoConfigs } from '@/composables/useSEO'

// SEO配置
useSEO({
  title: '交流讨论 - Welight',
  description: '加入 Welight 社区，与其他创作者交流经验、分享技巧、获取帮助。提供 QQ 群和微信群两种交流方式。',
  keywords: 'Welight社区,交流讨论,QQ群,微信群,用户交流,技术支持'
})
</script>

<style scoped>
/* 添加一些动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group > div {
  animation: fadeInUp 0.6s ease-out;
}

.group:nth-child(2) > div {
  animation-delay: 0.2s;
}


</style>

