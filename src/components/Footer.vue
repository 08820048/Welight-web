<template>
  <footer class="bg-white/20 backdrop-blur-lg border-t border-white/20 relative z-10">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="col-span-1 md:col-span-2">
          <div class="mb-4">
            <span class="text-xl font-bold text-gray-900">Welight</span>
          </div>
          <p class="text-gray-600 mb-4 max-w-md">
            关注我们的微信公众号，获取最新功能更新、使用技巧和排版灵感，让您的内容创作更加高效精彩。
          </p>
          <div class="flex items-center">
            <div class="text-center">
              <img src="https://images.waer.ltd/notes/202509282306627.jpg" alt="微信公众号二维码"
                class="w-20 h-20 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" />
              <p class="text-xs text-gray-500 mt-2">扫码关注公众号</p>
            </div>
          </div>
        </div>

        <!-- 产品链接 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">产品</h3>
          <ul class="space-y-3">
            <li><router-link to="/download"
                class="text-gray-600 hover:text-primary-600 transition-colors duration-200">下载</router-link></li>
            <!-- <li><a href="https://waer.ltd"
                class="text-gray-600 hover:text-primary-600 transition-colors duration-200">官方网站</a></li> -->
            <li><a href="https://ilikexff.cn"
                class="text-gray-600 hover:text-primary-600 transition-colors duration-200">开发者博客</a></li>
          </ul>

          <!-- QQ群信息 -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-2">交流群</h4>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span class="text-gray-600 text-sm">QQ群：474919458</span>
            </div>
          </div>
        </div>

        <!-- 支持链接 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">功能特色</h3>
          <ul class="space-y-3">
            <li><span class="text-gray-600">21种精美主题</span></li>
            <li><span class="text-gray-600">AI智能助手</span></li>
            <li><span class="text-gray-600">实时预览</span></li>
            <li><span class="text-gray-600">云存储支持</span></li>
          </ul>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm">
            © {{ currentYear }} Welight。保留所有权利。
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <!-- <a href="https://waer.ltd"
              class="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200">官方网站</a> -->
            <!-- <a href="https://ilikexff.cn"
              class="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200">开发者博客</a> -->
            <button @click="showTermsModal = true"
              class="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200">服务条款</button>
            <button @click="showPrivacyModal = true"
              class="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200">隐私政策</button>
            <button @click="showDisclaimerModal = true"
              class="text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200">免责声明</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务条款模态框 -->
    <TermsOfServiceModal :isVisible="showTermsModal" @close="closeTermsModal" />

    <!-- 隐私政策模态框 -->
    <PrivacyPolicyModal :isVisible="showPrivacyModal" @close="closePrivacyModal" />

    <!-- 免责声明模态框 -->
    <DisclaimerModal :isVisible="showDisclaimerModal" @close="closeDisclaimerModal" />
  </footer>
</template>

<script setup>
import { computed, ref } from 'vue'
import TermsOfServiceModal from './TermsOfServiceModal.vue'
import PrivacyPolicyModal from './PrivacyPolicyModal.vue'
import DisclaimerModal from './DisclaimerModal.vue'

const currentYear = computed(() => new Date().getFullYear())

// 服务条款模态框状态
const showTermsModal = ref(false)
// 隐私政策模态框状态
const showPrivacyModal = ref(false)
// 免责声明模态框状态
const showDisclaimerModal = ref(false)

// 关闭服务条款模态框
const closeTermsModal = () => {
  showTermsModal.value = false
}

// 关闭隐私政策模态框
const closePrivacyModal = () => {
  showPrivacyModal.value = false
}

// 关闭免责声明模态框
const closeDisclaimerModal = () => {
  showDisclaimerModal.value = false
}
</script>
