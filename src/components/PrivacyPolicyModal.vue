<template>
  <!-- 模态框背景 -->
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal">
    <!-- 模态框内容 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-hidden modal-content"
      @click.stop>
      <!-- 头部 -->
      <div class="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Welight 隐私政策</h2>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
        <div class="prose prose-gray dark:prose-invert max-w-none text-sm">
          <!-- 更新日期 -->
          <div class="text-center mb-6 text-gray-500 dark:text-gray-400">
            <p>更新日期：2025 年 10 月 1 日</p>
            <p>生效日期：2025 年 10 月 1 日</p>
          </div>

          <!-- 引言 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">引言</h3>
            <div class="space-y-4 leading-relaxed">
              <p>
                Welight 是由 Welight 开发团队（以下简称"我们"）为用户（以下简称"您"）提供的产品及服务。我们重视对用户隐私的保护，也深知对您的个人信息的有效保护是我们业务健康发展的基石。感谢您对 Welight 产品和服务的信任！我们深知这份信任来之不易，我们秉承公开、透明原则，向您明示我们处理您的个人信息的规则，我们采用合法、正当的方式和明确、合理的目的处理您的个人信息。
              </p>
              <p>
                我们希望通过本隐私政策向您说明，在使用我们的产品或服务时，我们如何收集、使用、存储、共享、转移和公开披露您的个人信息，以及我们为您提供的访问、更新、删除和保护这些信息的方式。
              </p>
            </div>
          </section>

          <!-- 特别提示 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">特别提示</h3>
            <div class="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p class="text-yellow-800 dark:text-yellow-200 text-sm leading-relaxed">
                在使用我们的产品或服务前，务必仔细阅读并了解本隐私政策，在确认充分理解并同意后使用我们的产品或服务。一旦您开始使用我们的产品或服务，即表示您已充分理解并同意本政策，并同意我们按照本隐私政策收集、使用、储存和共享您的相关信息。
              </p>
            </div>
          </section>

          <!-- 一、我们如何收集和使用您的信息 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">一、我们如何收集和使用您的信息</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">设备信息</h4>
                <p class="leading-relaxed mb-3">
                  为了更好地提供服务和确保操作环境的安全与稳定，我们会收集您的设备型号、操作系统版本、网络状态、IP 地址等信息。
                </p>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">账户信息</h4>
                <p class="leading-relaxed mb-3">
                  当您注册 Welight 账户时，我们会收集您提供的邮箱、用户名等信息，用于账户注册、身份验证和服务提供。
                </p>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">使用数据</h4>
                <p class="leading-relaxed mb-3">
                  我们会收集您在使用 Welight 时的操作记录、文档内容、设置偏好等信息，以便为您提供个性化的服务体验。
                </p>
              </div>
            </div>
          </section>

          <!-- 二、信息的存储 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">二、信息的存储</h3>
            <div class="space-y-4">
              <div>
                <span class="font-semibold">存储方式：</span> 我们会通过安全的方式存储您的信息，包括本地存储和云端存储。
              </div>
              <div>
                <span class="font-semibold">存储期限：</span> 我们只会在为实现服务目的所必需的时间内存储您的个人信息。
              </div>
              <div>
                <span class="font-semibold">存储地域：</span> 我们会按照法律法规规定，将收集的用户个人信息存储于中国境内。
              </div>
            </div>
          </section>

          <!-- 三、信息的安全 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">三、信息的安全</h3>
            <div class="space-y-4">
              <div>
                <span class="font-semibold">技术保护：</span> 我们采用业界领先的技术保护措施，包括加密传输、访问控制等。
              </div>
              <div>
                <span class="font-semibold">管理制度：</span> 我们建立了完善的个人信息安全管理制度和流程。
              </div>
              <div>
                <span class="font-semibold">事件处置：</span> 若发生安全事件，我们会及时通知您并采取相应的补救措施。
              </div>
            </div>
          </section>

          <!-- 四、信息的共享和披露 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">四、信息的共享和披露</h3>
            <div class="space-y-4">
              <p class="leading-relaxed">
                我们不会与任何公司、组织和个人共享您的个人信息，除非：
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>获得您的明确同意</li>
                <li>法律法规要求</li>
                <li>为维护您或他人的合法权益</li>
              </ul>
            </div>
          </section>

          <!-- 五、您的权利 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">五、您的权利</h3>
            <div class="space-y-4">
              <div>
                <span class="font-semibold">查阅权：</span> 您有权查阅我们收集的您的个人信息。
              </div>
              <div>
                <span class="font-semibold">更正权：</span> 您有权要求我们更正不准确的个人信息。
              </div>
              <div>
                <span class="font-semibold">删除权：</span> 在特定情况下，您有权要求我们删除您的个人信息。
              </div>
              <div>
                <span class="font-semibold">注销权：</span> 您可以随时注销您的账户。
              </div>
            </div>
          </section>

          <!-- 六、未成年人信息保护 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">六、未成年人信息保护</h3>
            <div class="space-y-4">
              <p class="leading-relaxed">
                我们非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用 Welight 前，应事先取得您的家长或法定监护人的同意。
              </p>
            </div>
          </section>

          <!-- 七、政策更新 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">七、政策更新</h3>
            <div class="space-y-4">
              <p class="leading-relaxed">
                我们可能会适时更新本隐私政策。当政策发生重大变更时，我们会通过适当方式向您通知，并征得您的同意。
              </p>
            </div>
          </section>

          <!-- 八、联系我们 -->
          <section class="mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">八、联系我们</h3>
            <div class="space-y-4">
              <p class="leading-relaxed">
                如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <li>QQ群：474919458</li>
                <li>官方网站：https://waer.ltd</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <!-- 底部按钮区域 -->
      <div
        class="flex justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button @click="closeModal"
          class="px-6 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200 font-medium">
          关闭
        </button>
        <button @click="closeModal"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm">
          我同意
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 键盘事件处理
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isVisible) {
    closeModal()
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* 模态框动画 */
.modal-content {
  animation: modalFadeInUp 0.3s ease-out forwards;
}

@keyframes modalFadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 深色模式滚动条 */
.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
