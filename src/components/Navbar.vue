<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center space-x-2 group hover:opacity-80 transition-opacity duration-200"
        >
          <img src="/logo.png" alt="Welight Logo" class="w-8 h-8 rounded-lg" />
          <span class="text-xl font-bold relative logo-gradient-text cursor-pointer">
            Welight
          </span>
          <sup class="text-xs text-gray-500 ml-1 font-normal">v3.1.3</sup>
        </router-link>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-2">
          <!-- Documentation links -->
          <div class="hidden md:flex items-center space-x-2">
            <router-link
              to="/documentation"
              class="relative flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              title="查看使用文档"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span class="hidden sm:inline text-sm font-medium">文档</span>
            </router-link>
          </div>

          <!-- 反馈菜单 -->
          <div class="relative group">
            <button
              class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              title="问题反馈与功能诉求"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span class="hidden sm:inline text-sm font-medium">反馈</span>
              <svg
                class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- 下拉菜单 -->
            <div
              class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
            >
              <div class="py-2">
                <a
                  href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file"
                  target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span>问题反馈</span>
                  </div>
                </a>
                <a
                  href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file"
                  target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <span>功能诉求</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- 公告按钮 -->
          <button
            @click="showAnnouncements"
            class="relative flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="查看公告通知"
          >
            <svg
              class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">公告通知</span>
            <!-- 新公告提示点 -->
            <div
              v-if="hasNewAnnouncements"
              class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"
            ></div>
          </button>

          <!-- 技术服务按钮 -->
          <!-- <button @click="showTechSupport"
            class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="技术服务支持">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">技术服务</span>
          </button> -->

          <!-- 定价菜单按钮 -->
          <router-link
            to="/pricing"
            class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group relative"
            title="定价与购买"
          >
            <svg
              class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">定价</span>
            <!-- 新设计的庆字标识 -->
            <span
              class="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md bg-gradient-to-r from-red-500 to-orange-500 group-hover:scale-110 transition-transform duration-300"
            >
              庆
            </span>
          </router-link>

          <!-- 月卡管理按钮 -->
          <router-link
            to="/monthly-cards"
            class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="月卡管理"
          >
            <svg
              class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">月卡管理</span>
          </router-link>

          <!-- 更新日志按钮 -->
          <button
            @click="showChangelog"
            class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="查看更新日志"
          >
            <svg
              class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">更新日志</span>
          </button>

          <!-- 赞助支持按钮 -->
          <div class="relative">
            <router-link
              to="/donation"
              class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 group donation-button"
              title="赞助"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span class="hidden sm:inline text-sm font-medium">赞助</span>
            </router-link>
            <!-- 赞助次数徽章 -->
            <div
              v-if="donationCount > 0"
              class="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium min-w-[20px] text-center"
            >
              +{{ donationCount }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 更新日志模态框 -->
    <ChangelogModal :isVisible="isChangelogVisible" @close="closeChangelog" />

    <!-- 公告模态框 -->
    <AnnouncementModal :isVisible="isAnnouncementVisible" @close="closeAnnouncements" />

    <!-- 技术服务模态框 -->
    <div
      v-if="isTechSupportVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeTechSupport"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 modal-content" @click.stop>
        <div class="p-6">
          <!-- 标题 -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">技术服务支持</h3>
            <button
              @click="closeTechSupport"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- 内容 -->
          <div class="space-y-4">
            <!-- 服务说明 -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h4 class="font-medium text-yellow-800 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                重要说明
              </h4>
              <div class="grid md:grid-cols-2 gap-2 text-sm text-yellow-700">
                <div>• 该技术服务仅由Welight开发者个人提供</div>
                <div>• 主要面向不熟悉技术配置的用户群体</div>
                <div>• Welight软件本身完全免费，技术服务为可选付费项目</div>
                <div>• 大部分问题可通过官方文档和QQ群自助解决</div>
              </div>
            </div>

            <!-- 主要内容区域 - 使用网格布局 -->
            <div class="grid md:grid-cols-2 gap-4 text-gray-600">
              <!-- 左侧：服务内容和适用人群 -->
              <div class="space-y-4">
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">服务内容：</h4>
                  <ul class="space-y-1 text-sm">
                    <li class="flex items-center space-x-2">
                      <svg
                        class="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>图床配置与设置（七牛云）</span>
                    </li>
                    <li class="flex items-center space-x-2">
                      <svg
                        class="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>AI模型配置与调试（DeepSeek、Ollama等）</span>
                    </li>
                    <li class="flex items-center space-x-2">
                      <svg
                        class="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>软件安装问题解决</span>
                    </li>
                    <li class="flex items-center space-x-2">
                      <svg
                        class="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>使用问题答疑（功能使用指导）</span>
                    </li>
                  </ul>
                </div>

                <!-- 适用人群 -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 class="font-medium text-blue-800 mb-2">适用人群：</h4>
                  <div class="grid grid-cols-1 gap-1 text-sm text-blue-700">
                    <div>• 对技术配置不熟悉的用户</div>
                    <div>• 需要快速解决问题的商业用户</div>
                    <div>• 希望获得一对一指导的用户</div>
                    <div>• 遇到复杂配置问题的用户</div>
                  </div>
                </div>
              </div>

              <!-- 右侧：定价和联系方式 -->
              <div class="space-y-4">
                <!-- 定价信息 -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">服务定价</span>
                    <span class="text-lg font-bold text-gray-900">9.99元/次</span>
                  </div>
                  <div class="text-xs text-gray-500 space-y-1">
                    <p>• 基础问题解决，一般30分钟内完成</p>
                    <p>• 复杂配置问题可能需要额外费用</p>
                    <p>• 远程协助，安全可靠</p>
                    <p class="text-green-600 font-medium">
                      💡 建议先尝试QQ群求助，大部分问题可免费解决
                    </p>
                  </div>
                </div>

                <!-- 联系方式 -->
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">开发者QQ</span>
                    <button @click="copyTechQQ" class="text-blue-600 hover:text-blue-700 text-sm">
                      <svg
                        class="w-4 h-4 inline mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      复制
                    </button>
                  </div>
                  <div class="text-2xl font-bold text-blue-600 text-center mb-2">2217021563</div>
                  <p v-if="techQQCopied" class="text-green-600 text-sm text-center mb-2">
                    QQ号已复制到剪贴板
                  </p>
                  <p class="text-xs text-gray-500 text-center">添加QQ请备注"服务支持"</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 按钮 -->
          <div class="flex space-x-3 mt-6">
            <button
              @click="closeTechSupport"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              关闭
            </button>
            <a
              href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2217021563&website=www.oicqzone.com"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              联系技术支持
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ChangelogModal from './ChangelogModal.vue'
import AnnouncementModal from './AnnouncementModal.vue'
import {
  hasNewAnnouncements as checkNewAnnouncements,
  markLatestAnnouncementAsViewed
} from '@/data/announcements.js'
import { donations } from '@/data/donations.js'

// 更新日志模态框状态
const isChangelogVisible = ref(false)
// 公告模态框状态
const isAnnouncementVisible = ref(false)
// 是否有新公告
const hasNewAnnouncements = ref(false)

// 计算赞助次数
const donationCount = computed(() => donations.length)

// 技术服务模态框状态
const isTechSupportVisible = ref(false)
// 复制状态
const copied = ref(false)
const techQQCopied = ref(false)

// 显示更新日志
const showChangelog = () => {
  isChangelogVisible.value = true
}

// 关闭更新日志
const closeChangelog = () => {
  isChangelogVisible.value = false
}

// 显示公告
const showAnnouncements = () => {
  isAnnouncementVisible.value = true
}

// 关闭公告
const closeAnnouncements = () => {
  isAnnouncementVisible.value = false
  // 关闭时更新新公告状态
  hasNewAnnouncements.value = checkNewAnnouncements()
}

// 显示技术服务
const showTechSupport = () => {
  isTechSupportVisible.value = true
}

// 关闭技术服务
const closeTechSupport = () => {
  isTechSupportVisible.value = false
  techQQCopied.value = false
}

// 复制技术支持QQ号
const copyTechQQ = async () => {
  try {
    await navigator.clipboard.writeText('2217021563')
    techQQCopied.value = true
    setTimeout(() => {
      techQQCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 组件挂载时检查新公告
onMounted(() => {
  // 检查是否有新公告
  hasNewAnnouncements.value = checkNewAnnouncements()

  // 如果有新公告且是首次访问，自动弹出公告
  if (hasNewAnnouncements.value) {
    // 延迟1秒后自动弹出，给页面加载一些时间
    setTimeout(() => {
      isAnnouncementVisible.value = true
    }, 1000)
  }
})
</script>

<style scoped>
/* 赞助按钮样式 */
.donation-button {
  color: #ee4668;
}

.donation-button:hover {
  color: #d63456;
  background-color: rgba(238, 70, 104, 0.1);
}

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
</style>
