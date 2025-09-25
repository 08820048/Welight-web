<template>
  <!-- 模态框背景 -->
  <div 
    v-if="isVisible" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <!-- 模态框内容 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden modal-content"
      @click.stop
    >
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">定价说明</h2>
        </div>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div class="prose prose-gray dark:prose-invert max-w-none">
          <!-- 为什么开启了付费模式 -->
          <section class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">为什么开启了付费模式？</h3>
            <div class="text-gray-600 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
              <p>
                Welight 的前身是一款名为0703 的网页排版工具，这是我在写公众号文章的时候，由于公众号编辑器排版非常繁琐耗时，且效率低下。为了找到一个可以高效、快捷排版的工具，我前前后后体验了很多同类产品发现不是要开会员就是要扫码关注公众号登录啥的，非常麻烦，对于个人公众号作者来说，确实有些贵了，所以才自己随便写了一个 0703 出来自己用，顺带放到 哔哩哔哩，没想到收到很多人的反馈，觉得这个东西帮助到了很多同道中人。
              </p>
              <p>
                我不断听取用户的建议，慢慢维护、迭代，最终做出了桌面端，正式更名为Welight，如此也是迭代了大概十几个版本，这期间一直都是免费的，没有收取任何人一毛钱。
              </p>
              <p>
                但是随着应用的不断更新，体积也越来越大，这时候才发现构建不同平台的安装包的时候需要大量的耗时，这就导致了构建成本越来越高，作为一个个人开发者，这样的费用已经超出了个人的承受能力，于是开启了捐赠功能，但遗憾的是，截止目前，就一共两个人捐赠了 一共 10 块钱，很感谢，同时，越来越多人建议我调整一下，开启收费模式，因为当下白嫖的人太多，并不是每一个人都会因为你的东西帮助到了自己而贡献一些力量，心怀感激！
              </p>
              <p>
                如果我一直免费，一直有爱发电下去，最终的结果就是下架，这不是我想看到的，因为welightd的出现，就是为了在某种程度上可以作为市面上哪些收费不菲的产品的平替。
              </p>
              <p>
                于是经过慎重考虑，决定使用应用终身买断制+可选功能付费的方式向商业化转型。
              </p>
            </div>
          </section>

          <!-- 关于定价 -->
          <section class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">关于定价</h3>
            <div class="text-gray-600 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
              <p>
                应用目前的买断价格为 14.99 元，也就是一杯奶茶的钱，你可以得到一个应用的终身使用授权。相比市面上很多同类产品 28,138每月的会员价，四舍五入welight 等于免费。同时，对于应用内的 AI 服务和云存储服务，我们也推出了可选的阅读月卡，如果你懒得折腾自己配置云存储和 AI 服务，那么可以选择购买我们提供的月卡服务，激活即可用，目前对于 AI 服务的定价也才 4.99 元/月。你获得的是应用内一个月的AI 无限量使用权，完整使用应用内所有的 AI 功能。
              </p>
              <div class="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p class="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>注意：</strong>随着后续 AI 功能的增加，我们可能会对价格进行适当调整，但始终相信，我们的定价绝对远低于同类产品。这一点毋庸置疑！
                </p>
              </div>
            </div>
          </section>
        </div>
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
