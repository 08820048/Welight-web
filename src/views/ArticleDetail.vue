<template>
  <div class="relative min-h-screen bg-white">
    <!-- 主要内容 -->
    <div class="min-h-screen" style="position: relative; z-index: 1;">
      <!-- 顶部导航 -->
      <div class="pt-24 pb-6 px-4">
        <div class="max-w-5xl mx-auto">
          <router-link to="/academy"
            class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            返回微光学堂
          </router-link>
        </div>
      </div>

      <!-- 文章头部信息 -->
      <section v-if="article" class="px-4 pb-8">
        <div class="max-w-5xl mx-auto">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full font-medium">
              {{ article.category }}
            </span>
            <span class="text-gray-400">{{ formatDate(article.date) }}</span>
            <span class="text-gray-400">{{ article.author }}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ article.title }}
          </h1>
          <p class="text-lg text-gray-600">
            {{ article.summary }}
          </p>
          <!-- 标签 -->
          <div class="flex flex-wrap gap-2 mt-6">
            <span v-for="tag in article.tags" :key="tag"
              class="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
              #{{ tag }}
            </span>
          </div>
        </div>
      </section>

      <!-- 文章内容 (iframe嵌入) -->
      <section class="px-4 pb-12">
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe v-if="article" :src="articleHtmlPath" class="w-full border-0"
              :style="{ height: iframeHeight + 'px' }" @load="onIframeLoad" ref="iframeRef"
              sandbox="allow-same-origin allow-scripts"></iframe>
            <!-- 加载状态 -->
            <div v-if="loading" class="flex items-center justify-center py-20">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 相关文章 -->
      <section v-if="relatedArticles.length > 0" class="px-4 pb-24">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">相关文章</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <router-link v-for="related in relatedArticles" :key="related.slug" :to="`/academy/${related.slug}`"
              class="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <h3 class="text-gray-900 font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                {{ related.title }}
              </h3>
              <p class="text-gray-400 text-sm mt-2">{{ formatDate(related.date) }}</p>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 404状态 -->
      <section v-if="!article && !loading" class="px-4 py-20">
        <div class="max-w-5xl mx-auto text-center">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">文章不存在</h2>
          <p class="text-gray-500 mb-6">抱歉，您访问的文章不存在或已被删除</p>
          <router-link to="/academy"
            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            返回微光学堂
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleBySlug, getRelatedArticles, getArticleHtmlPath } from '@/data/articles.js'
import { useSEO } from '@/composables/useSEO'

const route = useRoute()
const iframeRef = ref(null)
const iframeHeight = ref(800)
const loading = ref(true)

// 获取文章数据
const article = computed(() => getArticleBySlug(route.params.slug))
const relatedArticles = computed(() => getRelatedArticles(route.params.slug, 3))
const articleHtmlPath = computed(() => getArticleHtmlPath(route.params.slug))

// 动态SEO
watch(article, (newArticle) => {
  if (newArticle) {
    useSEO({
      title: `${newArticle.title} - 微光学堂`,
      description: newArticle.summary,
      keywords: newArticle.tags.join(',') + ',Welight,公众号排版',
      url: `https://waer.ltd/academy/${newArticle.slug}`
    })
  }
}, { immediate: true })

// 格式化日期
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// iframe加载完成后自适应高度
function onIframeLoad() {
  loading.value = false
  try {
    const iframe = iframeRef.value
    if (iframe && iframe.contentWindow) {
      const height = iframe.contentWindow.document.body.scrollHeight
      iframeHeight.value = Math.max(height + 50, 600)
    }
  } catch (e) {
    // 跨域情况下使用默认高度
    iframeHeight.value = 1200
  }
}
</script>
