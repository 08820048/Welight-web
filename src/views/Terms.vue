<template>
  <div class="relative min-h-screen bg-white">
    <AnimatedGridPattern
      :num-squares="30"
      :max-opacity="0.1"
      :duration="3"
      :repeat-delay="1"
      class-name="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
    />
    <div class="min-h-screen pt-20 pb-12 relative overflow-hidden" style="position: relative; z-index: 1;">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-fade-in-up">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">服务条款</h1>
        <p class="text-gray-600">Welight 服务条款</p>
        <p class="text-sm text-gray-500 mt-2">更新日期：2025年10月1日</p>
      </div>

      <!-- 服务条款内容 -->
      <div class="bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in-up delay-200">

        <!-- 欢迎语 -->
        <div class="text-gray-700 space-y-3">
          <p class="leading-relaxed">
            欢迎使用 Welight 服务（以下简称"本服务"）！
          </p>
          <p class="leading-relaxed">
            本协议是您与 Welight 开发团队（以下简称"我们"或"平台"）之间关于您使用 Welight
            服务所订立的有效契约，对双方具有同等法律效力。我们建议您仔细阅读本协议的全部内容，如果您不同意本协议的任一或全部条款内容，请不要以确认形式进行下一步操作或使用 Welight
            服务。当您以确认形式进行下一步操作或使用 Welight 服务时，即表示您与我们已达成协议关系，您自愿接受本协议并遵守本协议项下的全部约定。
          </p>
          <p class="leading-relaxed">
            我们有权变更本协议内容，经修订的协议一经公布，立即自动生效。一旦本协议内容发生变更的，我们将在相应页面、站内信或以其他合理方式进行通知，请您仔细阅读。如果您不同意变更的内容的，您可以选择停止使用本服务。如您继续使用本服务的，则视为您已经同意变更的全部内容。
          </p>
        </div>

        <!-- 一、服务内容、形式 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">一、服务内容、形式</h2>

          <div class="space-y-4 text-gray-700">
            <div>
              <h3 class="font-bold text-gray-900 mb-2">1. 服务内容</h3>
              <p class="leading-relaxed">
                Welight 服务内容包括但不限于【文章排版】、【AI 写作】、【AI 翻译】、【云存储】等功能。Welight
                服务内容均以官网平台的内容展示为准，我们会不断更新升级服务，升级更新的相关内容均以平台公告及功能使用说明为准。
              </p>
            </div>

            <div>
              <h3 class="font-bold text-gray-900 mb-2">2. 服务形式</h3>
              <p class="leading-relaxed">
                Welight 服务主要以桌面应用程序和网页版为主，您可以下载桌面客户端或直接在网站页面上体验服务，未来我们会探索更多的服务模式为用户带来更好的使用体验。
              </p>
            </div>
          </div>
        </section>

        <!-- 二、服务使用规范 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">二、服务使用规范</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span>
              您确认，在您实际使用本服务时，您应当是具备完全民事行为能力的自然人。若您是18周岁以下的未成年人，建议您请您的监护人仔细阅读本协议，并在征得您的监护人同意的前提下使用我们的服务。</p>

            <p><span class="font-semibold">2.</span>
              您充分了解并同意，本服务仅为辅助您创作及排版的工具，您在使用本服务时不得侵害他人权益（包括但不限于他人物权、著作权、专利权、商标权等知识产权、肖像权与其他权益），您应自行对利用本服务从事的所有行为及结果承担责任。
            </p>

            <p><span class="font-semibold">3.</span> 您同意，将严格依照本协议使用本服务，并且不会利用本服务进行任何违法或不当的活动。</p>

            <p><span class="font-semibold">4.</span> 您应当对使用本服务的行为是否符合法律法规规定进行必要审查，并由您承担由此产生的所有责任。</p>
          </div>
        </section>

        <!-- 三、服务费用 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">三、服务费用</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span>
              您理解并同意，我们有权免费或要求付费提供本服务。对于收费服务我们会在您使用之时给予您明确的提示，只有您根据提示确认其愿意支付相关费用，您才能使用该等增值服务。</p>

            <p><span class="font-semibold">2.</span> 本服务收费标准由我们根据运营成本、运营策略等综合考虑后独立决定，并在相关的产品服务宣传及支付页面向您展示。</p>

            <p><span class="font-semibold">3.</span>
              我们有权根据实际需要对收费服务的收费标准、方式进行修改和变更，前述修改、变更将在相关页面进行通知，您可以选择接受修改、变更后的收费标准、方式或停止使用该服务。</p>

            <p><span class="font-semibold">4.</span> <strong>关于默认图床服务的特别说明：</strong>
              本服务提供的默认图床功能（免费图片上传服务）仅作为体验性服务提供，不属于软件永久许可证授权的功能范围。我们不对该服务的持续性、稳定性、可用性作出任何承诺或保证。我们保留随时调整、暂停或终止默认图床服务的权利，且无需事先通知或承担任何责任。建议您配置自己的云存储服务（如七牛云、阿里云OSS等）以确保图片存储的长期稳定性和可控性。因使用默认图床服务导致的任何数据丢失、访问中断或其他损失，我们不承担任何责任。
            </p>
          </div>
        </section>

        <!-- 四、知识产权 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">四、知识产权</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span>
              除非另有约定或我们另行声明，本服务内包含的所有产品、技术、软件、程序、数据及其他信息（包括但不限于文字、图像、图片、照片、音频、视频、图表、色彩、版面设计、电子文档）的所有知识产权（包括但不限于版权、商标权、专利权、商业秘密等）及相关权利均归我们或我们的关联公司所有。
            </p>

            <p><span class="font-semibold">2.</span> 未经我们或我们的关联公司书面同意，您不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权。</p>

            <p><span class="font-semibold">3.</span>
              您使用本服务创作的内容，其知识产权归您所有。但您理解并同意，您在使用本服务过程中产生的数据可能会被我们用于改进服务质量、优化用户体验等目的。</p>
          </div>
        </section>

        <!-- 五、隐私保护 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">五、隐私保护</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span> 保护用户隐私是我们的一项基本政策，我们将按照本协议及《隐私政策》的规定收集、使用、储存和分享您的个人信息。</p>

            <p><span class="font-semibold">2.</span> 您在使用本服务时，我们可能会收集您的设备信息、日志信息等，用于为您提供更好的服务和改进产品质量。</p>

            <p><span class="font-semibold">3.</span> 我们会采取合理的安全措施保护您的个人信息安全，但互联网环境并非百分之百安全，我们将尽力确保您提供给我们的任何信息的安全性。</p>
          </div>
        </section>

        <!-- 六、免责声明 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">六、免责声明</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span>
              您理解并同意，本服务是按照现有技术和条件所能达到的现状提供的。我们会尽最大努力向您提供服务，确保服务的连贯性和安全性；但我们不能保证其所提供的服务毫无瑕疵，也无法随时预见和防范法律、技术以及其他风险。</p>

            <p><span class="font-semibold">2.</span> 您理解并同意，我们不对因下述任一情况而导致您的任何损害赔偿承担责任：
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成我们系统障碍不能执行业务的；</li>
              <li>由于黑客攻击、电信部门技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断或者延迟；</li>
              <li>因您的过错导致的任何损失；</li>
              <li>其他我们无法控制或合理预见的情形。</li>
            </ul>
            </p>

            <p><span class="font-semibold">3.</span>
              您理解并同意，在使用本服务过程中，可能会遇到网络信息或其他用户行为带来的风险，我们不对任何信息的真实性、适用性、合法性承担责任，也不对因侵权行为给您造成的损害负责。</p>
          </div>
        </section>

        <!-- 七、协议的变更和终止 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">七、协议的变更和终止</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span>
              我们有权根据需要不时地制订、修改本协议及相关规则，变更后的协议和规则一经在网站公布，立即自动生效。如您不同意相关变更，应当立即停止使用本服务。您继续使用本服务，即表示您接受经修订的协议和规则。</p>

            <p><span class="font-semibold">2.</span> 如您违反本协议约定，我们有权随时中止或终止向您提供本服务，而无需对您或任何第三方承担任何责任。</p>

            <p><span class="font-semibold">3.</span> 您理解并同意，即使本协议终止，我们仍享有下列权利：
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>继续保存您留存于本服务的各类信息；</li>
              <li>对于您过往的违法违规行为，我们仍可依据本协议向您追究违约责任。</li>
            </ul>
            </p>
          </div>
        </section>

        <!-- 八、法律适用与争议解决 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">八、法律适用与争议解决</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span> 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>

            <p><span class="font-semibold">2.</span> 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向我们所在地的人民法院提起诉讼。</p>
          </div>
        </section>

        <!-- 九、其他 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">九、其他</h2>

          <div class="space-y-3 text-gray-700">
            <p><span class="font-semibold">1.</span> 本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。</p>

            <p><span class="font-semibold">2.</span> 本协议中的标题仅为方便而设，不影响对本协议的理解。</p>

            <p><span class="font-semibold">3.</span> 如果您对本协议或本服务有任何疑问，请通过 QQ 1071558803</p>
          </div>
        </section>

        <!-- 联系方式 -->
        <section class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">联系我们</h2>
          <p class="text-gray-700 mb-3">如果您对本服务条款有任何疑问或建议，请通过以下方式联系我们：</p>
          <ul class="space-y-2 text-gray-700">
            <li><strong>QQ群：</strong>1071558803</li>
            <li><strong>官方网站：</strong><a href="https://welight.waer.ltd"
                class="text-blue-600 hover:underline">https://welight.waer.ltd</a></li>
          </ul>
        </section>

      </div>

      <!-- 返回按钮 -->
      <div class="text-center mt-8">
        <router-link to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </router-link>
      </div>
    </div>
  </div>
  </div>

</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '服务条款 - Welight'
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.delay-200 {
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

html {
  scroll-behavior: smooth;
}


</style>
