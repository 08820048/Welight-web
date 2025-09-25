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
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Welight 服务条款</h2>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
        <div class="prose prose-gray dark:prose-invert max-w-none text-sm">
          <!-- 更新日期 -->
          <div class="text-center mb-6 text-gray-500 dark:text-gray-400">
            <p>更新日期：2025 年 10 月 1 日</p>
          </div>

          <!-- 欢迎语 -->
          <div class="mb-6">
            <p class="leading-relaxed">
              欢迎使用 Welight 服务（以下简称"本服务"）！
            </p>
            <p class="leading-relaxed mt-3">
              本协议是您与 Welight 开发团队（以下简称"我们"或"平台"）之间关于您使用 Welight
              服务所订立的有效契约，对双方具有同等法律效力。我们建议您仔细阅读本协议的全部内容，如果您不同意本协议的任一或全部条款内容，请不要以确认形式进行下一步操作或使用 Welight
              服务。当您以确认形式进行下一步操作或使用 Welight 服务时，即表示您与我们已达成协议关系，您自愿接受本协议并遵守本协议项下的全部约定。
            </p>
            <p class="leading-relaxed mt-3">
              我们有权变更本协议内容，经修订的协议一经公布，立即自动生效。一旦本协议内容发生变更的，我们将在相应页面、站内信或以其他合理方式进行通知，请您仔细阅读。如果您不同意变更的内容的，您可以选择停止使用本服务。如您继续使用本服务的，则视为您已经同意变更的全部内容。
            </p>
          </div>

          <!-- 一、服务内容、形式 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">一、服务内容、形式</h3>

            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">1. 服务内容</h4>
            <p class="leading-relaxed mb-4">
              Welight 服务内容包括但不限于【文章排版】、【AI 写作】、【AI 翻译】、【云存储】等功能。Welight
              服务内容均以官网平台的内容展示为准，我们会不断更新升级服务，升级更新的相关内容均以平台公告及功能使用说明为准。
            </p>

            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">2. 服务形式</h4>
            <p class="leading-relaxed mb-4">
              Welight 服务主要以桌面应用程序和网页版为主，您可以下载桌面客户端或直接在网站页面上体验服务，未来我们会探索更多的服务模式为用户带来更好的使用体验。
            </p>
          </section>

          <!-- 二、服务使用规范 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">二、服务使用规范</h3>

            <div class="space-y-4">
              <div>
                <span class="font-semibold">1.</span>
                您确认，在您实际使用本服务时，您应当是具备完全民事行为能力的自然人。若您是18周岁以下的未成年人，建议您请您的监护人仔细阅读本协议，并在征得您的监护人同意的前提下使用我们的服务。
              </div>

              <div>
                <span class="font-semibold">2.</span>
                您充分了解并同意，本服务仅为辅助您创作及排版的工具，您在使用本服务时不得侵害他人权益（包括但不限于他人物权、著作权、专利权、商标权等知识产权、肖像权与其他权益），您应自行对利用本服务从事的所有行为及结果承担责任。
              </div>

              <div>
                <span class="font-semibold">3.</span> 您同意，将严格依照本协议使用本服务，并且不会利用本服务进行任何违法或不当的活动。
              </div>

              <div>
                <span class="font-semibold">4.</span> 您应当对使用本服务的行为是否符合法律法规规定进行必要审查，并由您承担由此产生的所有责任。
              </div>
            </div>
          </section>

          <!-- 三、服务费用 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">三、服务费用</h3>

            <div class="space-y-4">
              <div>
                <span class="font-semibold">1.</span>
                您理解并同意，我们有权免费或要求付费提供本服务。对于收费服务我们会在您使用之时给予您明确的提示，只有您根据提示确认其愿意支付相关费用，您才能使用该等增值服务。
              </div>

              <div>
                <span class="font-semibold">2.</span> 本服务收费标准由我们根据运营成本、运营策略等综合考虑后独立决定，并在相关的产品服务宣传及支付页面向您展示。
              </div>

              <div>
                <span class="font-semibold">3.</span> 我们提供的许可证服务属于数字产品，许可证一旦激活使用后，非故障情况下概不支持退订和退款，请您谅解。
              </div>
            </div>
          </section>

          <!-- 四、知识产权及相关权益 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">四、知识产权及相关权益</h3>

            <div class="space-y-4">
              <div>
                <span class="font-semibold">1.</span> Welight 软件及相关技术的知识产权归我们所有，您仅获得使用权。
              </div>

              <div>
                <span class="font-semibold">2.</span> 您使用本服务创作的内容，其知识产权归您所有，但您需确保不侵犯他人权益。
              </div>

              <div>
                <span class="font-semibold">3.</span> 您承诺，未经我们许可，不对 Welight 软件进行反向工程、反向编译或反汇编等行为。
              </div>
            </div>
          </section>

          <!-- 五、免责声明 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">五、免责声明</h3>

            <div class="space-y-4">
              <div>
                <span class="font-semibold">1.</span> 我们对服务的稳定性、安全性、准确性不做绝对保证，但会尽最大努力确保服务质量。
              </div>

              <div>
                <span class="font-semibold">2.</span> 因不可抗力、网络故障、系统维护等原因导致的服务中断，我们不承担责任。
              </div>

              <div>
                <span class="font-semibold">3.</span> 您使用本服务产生的内容及其后果由您自行承担责任。
              </div>
            </div>
          </section>

          <!-- 六、其他 -->
          <section class="mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">六、其他</h3>

            <div class="space-y-4">
              <div>
                <span class="font-semibold">1.</span> 本协议受中华人民共和国法律管辖。
              </div>

              <div>
                <span class="font-semibold">2.</span> 如有争议，双方应首先通过友好协商解决。
              </div>

              <div>
                <span class="font-semibold">3.</span> 本协议的最终解释权归 Welight 开发团队所有。
              </div>
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
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm">
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
