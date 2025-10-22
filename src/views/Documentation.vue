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
        'fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-gray-50 border-r border-gray-200 shadow-sm transition-transform duration-300 z-50 overflow-hidden',
        'lg:sticky lg:top-16 lg:translate-x-0',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]">
        <div class="flex flex-col h-full">

          <!-- 导航菜单 -->
          <nav ref="menuScroll" class="flex-1 overflow-y-auto p-4">
            <div v-for="category in filteredCategories" :key="category.id" class="mb-6">
              <h3 class="text-sm font-bold text-gray-900 mb-3 px-2">
                {{ category.title }}
              </h3>
              <ul class="space-y-1">
                <li v-for="page in getPagesByCategory(category.id)" :key="page.id">
                  <button 
                    @click="setCurrentPage(page.id)" 
                    :class="[
                      'menu-btn w-full text-left px-3 py-2 text-sm rounded-none relative transition-all duration-200 ease-out',
                      currentPageId === page.id 
                        ? 'bg-blue-50 text-blue-700 font-medium menu-active' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    ]"
                  >
                    {{ page.title }}
                  </button>
                  <!-- 动态二级目录：当前页面的 H3 标题 -->
                  <ul v-if="currentPageId === page.id && currentHeadings.length" class="mt-1 ml-6 space-y-0.5 subheadings" :class="{ 'subline-active': !!activeHeadingId }">
                    <li v-for="h in currentHeadings" :key="h.id">
                      <button 
                        @click="scrollToHeading(h.id)"
                        :data-heading-id="h.id"
                        :class="[
                          'subitem-btn w-full text-left pl-3 pr-2 py-1 text-xs rounded-none hover:bg-gray-100 transition-colors relative',
                          activeHeadingId === h.id 
                            ? 'active-subitem text-green-700 font-medium pb-1 -mb-px' 
                            : 'text-gray-600 hover:text-gray-800'
                        ]"
                      >
                        {{ h.text }}
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>


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
      <main ref="contentScroll" class="flex-1 h-[calc(100vh-4rem)] overflow-y-auto">
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
              class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline focus:outline-none"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {{ previousPage.title }}
            </button>
            <div v-else></div>
            
            <button 
              v-if="nextPage"
              @click="setCurrentPage(nextPage.id)"
              class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline focus:outline-none"
            >
              {{ nextPage.title }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
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
const contentScroll = ref(null)
const menuScroll = ref(null)
const activeHeadingId = ref(null)
let headingObserver = null
// 监听内容渲染后初始化滚动联动（ScrollSpy）
const destroyHeadingObserver = () => {
  if (headingObserver) {
    headingObserver.disconnect()
    headingObserver = null
  }
}

const initHeadingObserver = () => {
  destroyHeadingObserver()
  const rootEl = contentScroll.value
  if (!rootEl) return
  const nodes = rootEl.querySelectorAll('.markdown-content h3[id]')
  if (!nodes.length) return

  // 初始高亮第一个
  activeHeadingId.value = nodes[0].id

  headingObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    if (visible.length) {
      activeHeadingId.value = visible[0].target.id
    }
  }, {
    root: rootEl,
    rootMargin: '0px 0px -60% 0px',
    threshold: [0, 0.25, 0.5, 1]
  })
  nodes.forEach(n => headingObserver.observe(n))
}

onUnmounted(() => {
  destroyHeadingObserver()
})

// 配置 marked，确保生成标题 id 与高亮
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

// 扩展：支持 ==...== 文本高亮（转换为 <mark>）
marked.use({
  extensions: [
    {
      name: 'mark',
      level: 'inline',
      start(src) {
        const i = src.indexOf('==')
        return i === -1 ? undefined : i
      },
      tokenizer(src) {
        const m = src.match(/^==(.+?)==/)
        if (m) {
          return { type: 'mark', raw: m[0], text: m[1] }
        }
      },
      renderer(token) {
        return `<mark>${token.text}</mark>`
      }
    }
  ]
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

const currentPage = computed(() => getDocumentationPage(currentPageId.value))

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

// 渲染 HTML 并为 H3 添加与目录一致的 id，同时处理提示框和任务列表
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

    // 转换 GitHub 风格提示框：[!TIP]、[!IMPORTANT] 等（新增图标）
    const titles = { tip: '提示', note: '备注', important: '重要', warning: '警告', caution: '注意' }
    const icons = {
      tip: '<svg class="admonition-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>',
      note: '<svg class="admonition-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>',
      important: '<svg class="admonition-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>',
      warning: '<svg class="admonition-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86l-8.48 14.7A2 2 0 003.52 22h16.96a2 2 0 001.71-3.44L13.71 3.86a2 2 0 00-3.42 0z"/></svg>',
      caution: '<svg class="admonition-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86l-8.48 14.7A2 2 0 003.52 22h16.96a2 2 0 001.71-3.44L13.71 3.86a2 2 0 00-3.42 0z"/></svg>'
    }
    doc.body.querySelectorAll('blockquote').forEach((bq) => {
      const first = bq.firstElementChild
      if (first && first.tagName === 'P') {
        const marker = first.textContent.trim()
        const m = marker.match(/^\[\!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]$/i)
        if (m) {
          const type = m[1].toLowerCase()
          const box = doc.createElement('div')
          box.className = `admonition admonition-${type}`

          const titleEl = doc.createElement('div')
          titleEl.className = 'admonition-title'
          titleEl.innerHTML = `${icons[type] || icons.note}<span class="admonition-label">${titles[type] || m[1]}</span>`

          const contentEl = doc.createElement('div')
          contentEl.className = 'admonition-content'

          // 去掉标记行，并把剩余内容迁移到内容容器
          bq.removeChild(first)
          while (bq.firstChild) {
            contentEl.appendChild(bq.firstChild)
          }

          box.appendChild(titleEl)
          box.appendChild(contentEl)
          bq.replaceWith(box)
        }
      }
    })

    // 修复任务列表：为含复选框的列表项添加类，并确保禁用
    doc.body.querySelectorAll('li').forEach((li) => {
      const checkbox = li.querySelector('input[type="checkbox"]')
      if (checkbox) {
        li.classList.add('task-list-item')
        checkbox.setAttribute('disabled', '')
      }
    })

    return doc.body.innerHTML
  } catch (e) {
    console.error('Heading id injection failed:', e)
    return html
  }
})

const allPages = computed(() => documentationConfig.pages)
const allCategories = computed(() => getDocumentationCategories())

const orderedPages = computed(() => {
  const result = []
  for (const cat of allCategories.value) {
    const pages = getDocumentationPagesByCategory(cat.id)
    if (pages && pages.length) {
      result.push(...pages)
    }
  }
  return result
})

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return allCategories.value
  }
  const searchResults = searchDocumentationPages(searchQuery.value)
  const categoryIds = [...new Set(searchResults.map(page => page.category))]
  return allCategories.value.filter(category => categoryIds.includes(category.id))
})

const previousPage = computed(() => {
  const currentIndex = orderedPages.value.findIndex(page => page.id === currentPageId.value)
  return currentIndex > 0 ? orderedPages.value[currentIndex - 1] : null
})

const nextPage = computed(() => {
  const currentIndex = orderedPages.value.findIndex(page => page.id === currentPageId.value)
  return currentIndex < orderedPages.value.length - 1 ? orderedPages.value[currentIndex + 1] : null
})

// 渲染完成后，初始化滚动联动观察器
watch(() => renderedContent.value, () => {
  nextTick(() => initHeadingObserver())
})

// 初次挂载后初始化观察器，确保滚动联动生效
onMounted(() => {
  nextTick(() => initHeadingObserver())
})

// 页面切换后重新建立观察器
watch(currentPageId, () => {
  activeHeadingId.value = null
  nextTick(() => initHeadingObserver())
})

const getPagesByCategory = (categoryId) => {
  if (searchQuery.value.trim()) {
    const searchResults = searchDocumentationPages(searchQuery.value)
    return searchResults.filter(page => page.category === categoryId)
  }
  return getDocumentationPagesByCategory(categoryId)
}
const pad2 = (n) => String(n).padStart(2, '0')
const formatDate = (input) => {
  const date = input instanceof Date ? input : new Date(input)
  if (isNaN(date)) return ''
  const y = date.getFullYear()
  const m = pad2(date.getMonth() + 1)
  const d = pad2(date.getDate())
  return `${y}-${m}-${d}`
}

const setCurrentPage = (pageId) => {
  if (!pageId) return
  if (currentPageId.value === pageId) {
    nextTick(() => initHeadingObserver())
    return
  }
  currentPageId.value = pageId
  activeHeadingId.value = null
  if (contentScroll.value) {
    // 切换页面时将内容滚动到顶部，避免旧位置残留
    contentScroll.value.scrollTo({ top: 0, behavior: 'auto' })
  }
}

const scrollToHeading = (headingId) => {
  const container = contentScroll.value
  const target = document.getElementById(headingId)
  if (!container || !target) return
  // 计算目标在容器内的相对位置，并做轻微上边距偏移
  const offset = target.getBoundingClientRect().top - container.getBoundingClientRect().top
  const top = offset + container.scrollTop - 8
  container.scrollTo({ top, behavior: 'smooth' })
  activeHeadingId.value = headingId
}

const ensureActiveHeadingVisible = () => {
  const container = menuScroll.value
  if (!container) return
  const el = container.querySelector('.active-subitem')
  if (!el) return
  const cRect = container.getBoundingClientRect()
  const eRect = el.getBoundingClientRect()
  if (eRect.top < cRect.top) {
    container.scrollTop += eRect.top - cRect.top - 8
  } else if (eRect.bottom > cRect.bottom) {
    container.scrollTop += eRect.bottom - cRect.bottom + 8
  }
}

watch(activeHeadingId, () => {
  nextTick(() => ensureActiveHeadingVisible())
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

/* 新增：按键显示样式 */
:deep(.markdown-content kbd) {
  @apply inline-block font-mono text-sm bg-gray-100 border border-gray-300 border-b-2 rounded-md px-2 py-0.5 shadow-sm text-gray-800;
}

/* 新增：提示框基础样式 */
:deep(.markdown-content .admonition) {
  @apply my-4 rounded-none p-4 text-gray-800;
}
:deep(.markdown-content .admonition-title) {
  @apply font-semibold mb-2 flex items-center gap-2;
}
:deep(.markdown-content .admonition-title .admonition-label) {
  @apply leading-5;
}
:deep(.markdown-content .admonition-content > :last-child) {
  @apply mb-0;
}

/* 新增：不同类型提示框的配色 */
:deep(.markdown-content .admonition-tip) {
  @apply border-l-4 border-green-500 bg-green-50;
}
:deep(.markdown-content .admonition-note) {
  @apply border-l-4 border-blue-500 bg-blue-50;
}
:deep(.markdown-content .admonition-important) {
  @apply border-l-4 border-orange-500 bg-orange-50;
}
:deep(.markdown-content .admonition-warning) {
  @apply border-l-4 border-yellow-500 bg-yellow-50;
}
:deep(.markdown-content .admonition-caution) {
  @apply border-l-4 border-yellow-600 bg-yellow-50;
}

/* 图标颜色与尺寸 */
:deep(.markdown-content .admonition-tip .admonition-icon) { @apply text-green-600; }
:deep(.markdown-content .admonition-note .admonition-icon) { @apply text-blue-600; }
:deep(.markdown-content .admonition-important .admonition-icon) { @apply text-orange-600; }
:deep(.markdown-content .admonition-warning .admonition-icon) { @apply text-yellow-600; }
:deep(.markdown-content .admonition-caution .admonition-icon) { @apply text-yellow-700; }

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
/* 新增：mark 高亮样式 */
:deep(.markdown-content mark) {
  @apply bg-yellow-100 rounded px-1 text-gray-900;
}

/* 新增：任务列表样式 */
:deep(.markdown-content .task-list-item) {
  list-style: none;
}
:deep(.markdown-content .task-list-item input[type="checkbox"]) {
  margin-right: 0.5rem;
  vertical-align: middle;
}
/* 侧栏二级标题子列表：统一竖线与活动底线 */
.subheadings { position: relative; }
.subheadings::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0; width: 1px;
  background-color: #D1D5DB; /* gray-300 */
}
.subheadings.subline-active::before {
  background-color: #D1D5DB; /* gray-300：激活时也保持灰色 */
}
.subitem-btn { position: relative; }
.subitem-btn.active-subitem::after {
  content: "";
  position: absolute;
  left: 0.75rem; /* 与 pl-3 对齐，保证不越过竖线 */
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(to right, #22c55e 0%, #22c55e 45%, rgba(34,197,94,0.6) 70%, rgba(34,197,94,0.25) 85%, rgba(34,197,94,0) 100%);
}

/* 顶级目录项激活动画：左侧指示条与颜色过渡 */
.menu-btn { position: relative; }
.menu-btn::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background-color: #3B82F6; /* blue-500 */
  transform: scaleY(0);
  opacity: 0;
  transition: transform 180ms ease-out, opacity 180ms ease-out;
}
.menu-btn.menu-active::before {
  transform: scaleY(1);
  opacity: 1;
}
</style>
