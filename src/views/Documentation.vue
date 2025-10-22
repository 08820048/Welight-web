<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏占位 -->
    <div class="h-16"></div>

    <div class="flex">
      <!-- 移动端遮罩层 -->
      <div 
        v-if="mobileMenuOpen" 
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="mobileMenuOpen = false"
      ></div>

      <!-- 侧边栏 -->
      <aside :class="[
        'fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 z-50 overflow-hidden',
        'lg:sticky lg:top-16 lg:translate-x-0',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]">
        <div class="flex flex-col h-full">
          <!-- 搜索框 -->
          <div class="p-4 border-b border-gray-100">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索文档..."
                class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-gray-50"
                @keydown="handleSearchKeydown"
              />
              <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- 导航菜单 -->
          <nav class="flex-1 overflow-y-auto p-4">
            <div v-for="category in filteredCategories" :key="category.id" class="mb-6">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                {{ category.title }}
              </h3>
              <ul class="space-y-1">
                <li v-for="page in getPagesByCategory(category.id)" :key="page.id">
                  <button 
                    @click="setCurrentPage(page.id)" 
                    :class="[
                      'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-150',
                      currentPageId === page.id 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    ]"
                  >
                    {{ page.title }}
                  </button>
                  <!-- 动态二级目录：当前页面的 H3 标题 -->
                  <ul v-if="currentPageId === page.id && currentHeadings.length" class="mt-1 ml-6 space-y-0.5">
                    <li v-for="h in currentHeadings" :key="h.id">
                      <button 
                        @click="scrollToHeading(h.id)"
                        class="w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                      >
                        {{ h.text }}
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>

          <!-- 版本信息 -->
          <div class="p-4 border-t border-gray-100">
            <div class="text-xs text-gray-500 text-center">
              <p>Welight 文档 v2.0</p>
              <p class="mt-1">最后更新: {{ formatDate(new Date()) }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- 移动端菜单按钮 -->
      <button 
        @click="mobileMenuOpen = true"
        class="fixed top-20 left-4 z-30 lg:hidden p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- 主内容区域 - 与侧边栏并排布局，无额外内边距 -->
      <main class="flex-1 h-[calc(100vh-4rem)] overflow-y-auto">
        <div class="max-w-4xl mx-auto px-6 py-8">
          <!-- 面包屑导航已移除 -->

          <!-- 文档内容 -->
          <div v-if="currentPage" class="prose prose-gray max-w-none">
            <!-- 使用 v-html 渲染 Markdown 内容 -->
            <div v-html="renderedContent" class="markdown-content"></div>
          </div>

          <!-- 默认欢迎页面 -->
          <div v-else class="text-center py-16">
            <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">欢迎使用 Welight 文档</h3>
            <p class="text-gray-500 mb-6">请从左侧菜单选择要查看的文档内容</p>
            <button 
              @click="setCurrentPage(defaultFirstPageId)"
              :disabled="!defaultFirstPageId"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              开始阅读
            </button>
          </div>

          <!-- 页面导航 -->
          <div v-if="currentPage" class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <button 
              v-if="previousPage"
              @click="setCurrentPage(previousPage.id)"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {{ previousPage.title }}
            </button>
            <div v-else></div>
            
            <button 
              v-if="nextPage"
              @click="setCurrentPage(nextPage.id)"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ nextPage.title }}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { 
  documentationConfig, 
  getDocumentationPage, 
  getDocumentationPagesByCategory,
  getDocumentationCategories,
  searchDocumentationPages 
} from '@/data/documentation.js'

// 选择默认页面（左侧菜单第一项：第一个有页面的分类的第一个页面）
const pickDefaultPageId = () => {
  for (const cat of documentationConfig.categories) {
    const pagesInCat = getDocumentationPagesByCategory(cat.id)
    if (pagesInCat && pagesInCat.length) {
      return pagesInCat[0].id
    }
  }
  return documentationConfig.pages[0]?.id || null
}

// 响应式数据
const currentPageId = ref(pickDefaultPageId())
const defaultFirstPageId = computed(() => pickDefaultPageId())
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

// 配置 marked，确保生成标题 id
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) {
        console.error('Highlight.js error:', err)
      }
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

// 简易 slugger（与目录一致）
const makeSlugger = () => {
  const seen = new Map()
  return (text) => {
    let slug = String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u4e00-\u9fa5\- ]+/g, '')
      .replace(/\s+/g, '-')
    const count = seen.get(slug) || 0
    seen.set(slug, count + 1)
    return count > 0 ? `${slug}-${count}` : slug
  }
}

const currentPage = computed(() => {
  return getDocumentationPage(currentPageId.value)
})

// 提取 H3 标题
const currentHeadings = computed(() => {
  if (!currentPage.value) return []
  const tokens = marked.lexer(currentPage.value.content)
  const slugger = makeSlugger()
  const list = []
  for (const t of tokens) {
    if (t.type === 'heading' && t.depth === 3) {
      const id = slugger(t.text)
      list.push({ id, text: t.text })
    }
  }
  return list
})

// 渲染 HTML 并为 H3 添加与目录一致的 id
const renderedContent = computed(() => {
  if (!currentPage.value) return ''
  const html = marked.parse(currentPage.value.content)
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const h3s = doc.body.querySelectorAll('h3')
    const heads = currentHeadings.value
    h3s.forEach((el, i) => {
      const id = heads[i]?.id
      if (id) el.id = id
    })
    return doc.body.innerHTML
  } catch (e) {
    console.error('Heading id injection failed:', e)
    return html
  }
})

const allPages = computed(() => {
  return documentationConfig.pages
})

const allCategories = computed(() => {
  return getDocumentationCategories()
})

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return allCategories.value
  }
  const searchResults = searchDocumentationPages(searchQuery.value)
  const categoryIds = [...new Set(searchResults.map(page => page.category))]
  return allCategories.value.filter(category => 
    categoryIds.includes(category.id)
  )
})

const previousPage = computed(() => {
  const currentIndex = allPages.value.findIndex(page => page.id === currentPageId.value)
  return currentIndex > 0 ? allPages.value[currentIndex - 1] : null
})

const nextPage = computed(() => {
  const currentIndex = allPages.value.findIndex(page => page.id === currentPageId.value)
  return currentIndex < allPages.value.length - 1 ? allPages.value[currentIndex + 1] : null
})

// 方法
const getPagesByCategory = (categoryId) => {
  if (searchQuery.value.trim()) {
    const searchResults = searchDocumentationPages(searchQuery.value)
    return searchResults.filter(page => page.category === categoryId)
  }
  return getDocumentationPagesByCategory(categoryId)
}

const setCurrentPage = (pageId) => {
  currentPageId.value = pageId
  mobileMenuOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToHeading = (headingId) => {
  const el = document.querySelector(`.markdown-content h3#${CSS.escape(headingId)}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleSearchKeydown = (event) => {
  if (event.key === 'Escape') {
    searchQuery.value = ''
  }
  if (event.ctrlKey && event.key === 'k') {
    event.preventDefault()
    event.target.focus()
  }
}

const formatDate = (date) => {
  return date.toLocaleDateString('zh-CN')
}

// 监听器
watch(searchQuery, () => {
  if (searchQuery.value.trim()) {
    const searchResults = searchDocumentationPages(searchQuery.value)
    if (searchResults.length > 0 && !searchResults.find(page => page.id === currentPageId.value)) {
      currentPageId.value = searchResults[0].id
    }
  }
})

// 生命周期
onMounted(() => {
  document.title = 'Welight 文档'
  if (!getDocumentationPage(currentPageId.value)) {
    currentPageId.value = pickDefaultPageId()
  }
  const handleKeydown = (event) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault()
      const searchInput = document.querySelector('input[placeholder="搜索文档..."]')
      if (searchInput) {
        searchInput.focus()
      }
    }
  }
  document.addEventListener('keydown', handleKeydown)
  return () => {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
/* 自定义样式 */
.markdown-content {
  @apply text-gray-800 leading-loose;
}

/* 进入锚点时避免被顶部遮挡 */
.markdown-content h2,
.markdown-content h3 {
  scroll-margin-top: 88px;
}

:deep(.markdown-content h1) {
  @apply text-3xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200;
}

:deep(.markdown-content h2) {
  @apply text-2xl font-semibold text-gray-900 mb-4 mt-8;
}

:deep(.markdown-content h3) {
  @apply text-xl font-semibold text-gray-900 mb-3 mt-6;
}

:deep(.markdown-content h4) {
  @apply text-lg font-semibold text-gray-900 mb-2 mt-4;
}

:deep(.markdown-content p) {
  @apply mb-6 text-gray-700;
}

:deep(.markdown-content ul) {
  @apply list-disc pl-6 mb-4;
}

:deep(.markdown-content ol) {
  @apply list-decimal pl-6 mb-4;
}

:deep(.markdown-content li) {
  @apply mb-2 text-gray-700;
}

:deep(.markdown-content code) {
  @apply bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono;
}

:deep(.markdown-content pre) {
  @apply bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto;
}

:deep(.markdown-content pre code) {
  @apply bg-transparent p-0 text-sm;
}

:deep(.markdown-content blockquote) {
  @apply border-l-4 border-blue-500 pl-4 py-3 mb-4 bg-blue-50 text-gray-700 italic leading-relaxed;
}

:deep(.markdown-content blockquote p) {
  @apply mb-0;
}

:deep(.markdown-content table) {
  @apply w-full border-collapse border border-gray-300 mb-4;
}

:deep(.markdown-content th), :deep(.markdown-content td) {
  @apply border border-gray-300 px-4 py-2 text-left;
}

:deep(.markdown-content th) {
  @apply bg-gray-50 font-semibold;
}

:deep(.markdown-content a) {
  @apply text-blue-600 hover:text-blue-800 underline;
}

:deep(.markdown-content img) {
  @apply max-w-full h-auto rounded-lg shadow-sm;
}

:deep(.markdown-content hr) {
  @apply border-t border-gray-300 my-8;
}

/* 代码高亮样式覆盖 */
:deep(.markdown-content .hljs) {
  @apply bg-gray-50 text-gray-800;
}
</style>
