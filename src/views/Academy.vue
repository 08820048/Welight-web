<template>
  <div class="relative min-h-screen bg-white">
    <!-- 背景动画 -->
    <AnimatedGridPattern :num-squares="30" :max-opacity="0.15" :duration="4" />

    <!-- 主要内容 -->
    <div class="min-h-screen" style="position: relative; z-index: 1;">
      <!-- 顶部横幅 -->
      <section class="pt-32 pb-16 px-4">
        <div class="max-w-6xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              微光学堂
            </span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            分享排版技巧、使用教程、新功能介绍，助你成为公众号排版高手
          </p>
        </div>
      </section>

      <!-- 分类筛选 -->
      <section class="px-4 mb-12">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap justify-center gap-3">
            <button @click="selectedCategory = ''" :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedCategory === ''
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            ]">
              全部
            </button>
            <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedCategory === category
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            ]">
              {{ category }}
            </button>
          </div>
        </div>
      </section>

      <!-- 文章列表 -->
      <section class="px-4 pb-24">
        <div class="max-w-6xl mx-auto">
          <div v-if="filteredArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link v-for="article in filteredArticles" :key="article.slug" :to="`/academy/${article.slug}`"
              class="group">
              <article
                class="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <!-- 封面图 -->
                <div class="aspect-video overflow-hidden">
                  <img :src="article.cover" :alt="article.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <!-- 文章信息 -->
                <div class="p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                      {{ article.category }}
                    </span>
                    <span class="text-gray-400 text-xs">{{ formatDate(article.date) }}</span>
                  </div>
                  <h2
                    class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {{ article.title }}
                  </h2>
                  <p class="text-gray-500 text-sm line-clamp-2">
                    {{ article.summary }}
                  </p>
                  <!-- 标签 -->
                  <div class="flex flex-wrap gap-2 mt-4">
                    <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="text-xs text-gray-400">
                      #{{ tag }}
                    </span>
                  </div>
                </div>
              </article>
            </router-link>
          </div>

          <!-- 空状态 -->
          <div v-else class="text-center py-20">
            <div class="text-6xl mb-4">📚</div>
            <p class="text-gray-500">暂无文章，敬请期待...</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AnimatedGridPattern from '@/components/AnimatedGridPattern.vue'
import { getArticles, getCategories } from '@/data/articles.js'
import { useSEO, seoConfigs } from '@/composables/useSEO'

// SEO配置
useSEO({
  title: '微光学堂 - Welight使用教程与排版技巧',
  description: '微光学堂提供Welight微信公众号排版工具的使用教程、排版技巧、新功能介绍等内容，帮助你快速掌握公众号排版。',
  keywords: 'Welight教程,公众号排版技巧,微信排版教程,Markdown教程,排版学习',
  url: 'https://waer.ltd/academy'
})

// 数据
const articles = getArticles()
const categories = getCategories()
const selectedCategory = ref('')

// 筛选后的文章
const filteredArticles = computed(() => {
  if (!selectedCategory.value) return articles
  return articles.filter(a => a.category === selectedCategory.value)
})

// 格式化日期
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
