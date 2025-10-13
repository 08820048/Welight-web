<template>
  <!-- 模态框遮罩 -->
  <Transition name="modal">
    <div v-if="isVisible" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
      <!-- 背景遮罩 -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>

      <!-- 模态框内容 -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          @click.stop>
          <!-- 头部 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 class="text-2xl font-bold text-gray-900">免责声明</h2>
            <button @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 内容区域 -->
          <div class="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6">
            <p class="text-sm text-gray-500 mb-6">最后更新时间：2025年10月13日</p>

            <!-- 重要提示 -->
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <div class="flex items-start">
                <svg class="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 class="text-red-800 font-bold mb-2">重要提示</h3>
                  <p class="text-red-700 text-sm">
                    在使用 Welight 应用之前，请仔细阅读本免责声明。使用本应用即表示您已阅读、理解并同意接受本声明的所有条款。如果您不同意本声明的任何内容，请立即停止使用本应用。
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-6 text-gray-700">
              <!-- 1. 应用定位与功能说明 -->
              <section>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span
                    class="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                  应用定位与功能说明
                </h3>
                <div class="pl-9 space-y-2 text-sm">
                  <p>Welight 是一款专为微信公众号创作者打造的<strong>编辑、排版和辅助创作工具</strong>，主要提供以下功能：</p>
                  <ul class="list-disc pl-6 space-y-1">
                    <li>文章编辑与排版美化</li>
                    <li>Markdown 格式支持</li>
                    <li>主题样式定制</li>
                    <li>AI 辅助创作功能（包括但不限于文章生成、内容扩展、摘要提取等）</li>
                    <li>图片处理与管理</li>
                    <li>内容模板管理</li>
                  </ul>
                  <p class="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                    <strong>重要说明：</strong>Welight 仅作为创作工具使用，不对用户创作、编辑或发布的内容承担任何责任。
                  </p>
                </div>
              </section>

              <!-- 2. AI 功能使用声明 -->
              <section>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span
                    class="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                  AI 功能使用声明
                </h3>
                <div class="pl-9 space-y-3 text-sm">
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">2.1 AI 生成内容的局限性</h4>
                    <ul class="list-disc pl-6 space-y-1">
                      <li><strong>准确性不保证：</strong>AI 生成的内容可能存在事实错误、逻辑不通、信息过时等问题，用户需自行核实内容的准确性。</li>
                      <li><strong>原创性问题：</strong>AI 生成的内容可能与现有内容相似或重复，用户需自行判断内容的原创性。</li>
                      <li><strong>版权风险：</strong>AI 生成的内容可能涉及版权问题，用户需自行承担相关法律责任。</li>
                      <li><strong>语言质量：</strong>AI 生成的内容可能存在语法错误、表达不当、风格不统一等问题。</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">2.2 用户责任</h4>
                    <ul class="list-disc pl-6 space-y-1">
                      <li>用户应对 AI 生成的内容进行<strong>人工审核和编辑</strong>，确保内容的准确性、合法性和适当性。</li>
                      <li>用户应自行判断 AI 生成内容是否适合发布，并对发布的内容承担全部责任。</li>
                      <li>用户不得将 AI 生成的内容直接用于商业用途，除非经过充分的人工审核和修改。</li>
                      <li>用户应遵守相关法律法规，不得使用 AI 功能生成违法、违规、侵权或不当内容。</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">2.3 AI 模型来源</h4>
                    <p class="text-sm">Welight 集成的 AI 功能基于第三方 AI 服务提供商（如 DeepSeek、智谱、Qwen、Kimi、Ollama
                      等）。这些 AI 模型的输出结果由第三方服务提供商生成，Welight 不对其准确性、完整性或适用性做任何保证。</p>
                  </div>
                </div>
              </section>

              <!-- 3. 内容合法性声明 -->
              <section>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span
                    class="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                  内容合法性声明
                </h3>
                <div class="pl-9 space-y-3 text-sm">
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">3.1 禁止创作和发布的内容</h4>
                    <p class="mb-1">用户不得使用 Welight 创作、编辑或发布以下内容：</p>
                    <ul class="list-disc pl-6 space-y-1">
                      <li>违反中华人民共和国法律法规的内容</li>
                      <li>危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一的内容</li>
                      <li>损害国家荣誉和利益的内容</li>
                      <li>煽动民族仇恨、民族歧视、破坏民族团结的内容</li>
                      <li>破坏国家宗教政策、宣扬邪教和封建迷信的内容</li>
                      <li>散布谣言、扰乱社会秩序、破坏社会稳定的内容</li>
                      <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的内容</li>
                      <li>侮辱或者诽谤他人、侵害他人合法权益的内容</li>
                      <li>侵犯他人知识产权、商业秘密等合法权利的内容</li>
                      <li>含有虚假、诈骗、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵或其他道德上令人反感的内容</li>
                      <li>其他违反法律法规、社会公德或干扰应用正常运营的内容</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">3.2 用户承诺</h4>
                    <p class="mb-1">用户承诺：</p>
                    <ul class="list-disc pl-6 space-y-1">
                      <li>遵守中华人民共和国相关法律法规</li>
                      <li>遵守微信公众平台运营规范</li>
                      <li>对使用 Welight 创作、编辑的所有内容承担全部法律责任</li>
                      <li>不利用 Welight 从事任何违法违规活动</li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- 4. 免责条款 -->
              <section>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span
                    class="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">4</span>
                  免责条款
                </h3>
                <div class="pl-9 space-y-3 text-sm">
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">4.1 内容责任</h4>
                    <ul class="list-disc pl-6 space-y-1">
                      <li>用户使用 Welight 创作、编辑、发布的所有内容，其法律责任完全由用户本人承担。</li>
                      <li>Welight 不对用户创作的内容进行事先审查，不对内容的合法性、真实性、准确性、完整性负责。</li>
                      <li>因用户发布违法、侵权或不当内容而引起的一切法律纠纷、损失或责任，均由用户自行承担。</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">4.2 服务可用性</h4>
                    <ul class="list-disc pl-6 space-y-1">
                      <li>Welight 不保证服务的持续可用性、稳定性或无错误。</li>
                      <li>因网络故障、系统维护、第三方服务中断等原因导致的服务中断或数据丢失，Welight 不承担责任。</li>
                      <li>AI 功能依赖第三方服务提供商，若第三方服务出现故障或中断，Welight 不承担责任。</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">4.3 第三方服务</h4>
                    <ul class="list-disc pl-6 space-y-1">
                      <li>Welight 集成的第三方 AI 服务、云存储服务等，其服务质量、数据安全由第三方服务提供商负责。</li>
                      <li>用户使用第三方服务时，应遵守第三方服务的使用条款和隐私政策。</li>
                      <li>因第三方服务导致的任何问题或损失，Welight 不承担责任。</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">4.4 数据安全</h4>
                    <ul class="list-disc pl-6 space-y-1">
                      <li>用户应自行备份重要数据，Welight 不对数据丢失承担责任。</li>
                      <li>用户应妥善保管账号密码、许可证密钥等信息，因用户保管不善导致的损失由用户自行承担。</li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- 5. 知识产权声明 -->
              <section>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span
                    class="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">5</span>
                  知识产权声明
                </h3>
                <div class="pl-9 text-sm">
                  <ul class="list-disc pl-6 space-y-1">
                    <li>Welight 应用的所有知识产权（包括但不限于软件代码、界面设计、商标、Logo 等）归开发者所有。</li>
                    <li>用户使用 Welight 创作的内容，其知识产权归用户所有。</li>
                    <li>用户不得对 Welight 进行反向工程、反编译、破解或以其他方式试图获取源代码。</li>
                    <li>未经授权，用户不得复制、修改、传播 Welight 或将其用于商业用途。</li>
                  </ul>
                </div>
              </section>

              <!-- 6. 争议解决 -->
              <section>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span
                    class="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">6</span>
                  争议解决
                </h3>
                <div class="pl-9 text-sm">
                  <ul class="list-disc pl-6 space-y-1">
                    <li>本声明的解释、效力及纠纷的解决，适用中华人民共和国法律。</li>
                    <li>若用户和 Welight 之间发生任何纠纷或争议，首先应友好协商解决。</li>
                    <li>协商不成的，任何一方均可向 Welight 开发者所在地人民法院提起诉讼。</li>
                  </ul>
                </div>
              </section>

              <!-- 7. 声明更新 -->
              <section>
                <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span
                    class="w-7 h-7 bg-gray-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">7</span>
                  声明更新
                </h3>
                <div class="pl-9 text-sm">
                  <p>Welight 保留随时修改本免责声明的权利。修改后的声明将在本页面公布，并在应用中通知用户。用户继续使用 Welight
                    即表示接受修改后的声明。</p>
                </div>
              </section>

              <!-- 联系方式 -->
              <section class="bg-blue-50 rounded-lg p-4">
                <h4 class="text-base font-bold text-gray-900 mb-2">联系我们</h4>
                <p class="text-sm text-gray-700 mb-2">如果您对本免责声明有任何疑问或建议，请通过以下方式联系我们：</p>
                <ul class="space-y-1 text-sm text-gray-700">
                  <li><strong>QQ群：</strong>752636088</li>
                  <li><strong>官方网站：</strong><a href="https://welight.waer.ltd"
                      class="text-blue-600 hover:underline">https://welight.waer.ltd</a></li>
                </ul>
              </section>

              <!-- 同意确认 -->
              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 class="text-yellow-800 font-bold mb-1">用户确认</h4>
                    <p class="text-yellow-700 text-sm">
                      使用 Welight 应用即表示您已完全阅读、理解并同意遵守本免责声明的所有条款。如果您不同意本声明的任何内容，请立即停止使用本应用。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
            <button @click="closeModal"
              class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium">
              我已阅读并理解
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
/* 模态框过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>

