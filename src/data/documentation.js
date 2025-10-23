/**
 * 文档配置文件（纯目录驱动）
 * 仅保留分类元数据；页面内容全部从 src/docs 目录动态加载
 */

export const documentationConfig = {
  // 文档分类配置（用于显示中文标题与图标）
  categories: [
    {
      id: 'quick-start',
      title: '基本功能',
      icon: 'rocket',
      color: 'emerald'
    },
    {
      id: 'core-features',
      title: '主题系统',
      icon: 'star',
      color: 'blue'
    },
    {
      id: 'config',
      title: '配置管理',
      icon: 'cog',
      color: 'purple'
    },
    {
      id: 'help',
      title: '帮助支持',
      icon: 'question-circle',
      color: 'orange'
    }
  ],

  // 页面列表由目录动态填充
  pages: []
}

/**
 * 获取指定页面
 * @param {string} pageId 页面 ID
 */
export function getDocumentationPage(pageId) {
  return documentationConfig.pages.find((p) => p.id === pageId)
}

/**
 * 按分类获取页面（按 order 排序）
 * @param {string} categoryId 分类 ID
 */
export function getDocumentationPagesByCategory(categoryId) {
  return documentationConfig.pages
    .filter((p) => p.category === categoryId)
    .sort((a, b) => a.order - b.order)
}

/**
 * 获取所有分类
 */
export function getDocumentationCategories() {
  return documentationConfig.categories
}

/**
 * 搜索文档页面
 * @param {string} query 搜索关键词
 * @returns {Array} 匹配的文档页面列表
 */
export function searchDocumentationPages(query) {
  if (!query.trim()) return []
  const lowerQuery = query.toLowerCase()
  return documentationConfig.pages.filter(
    (page) =>
      page.title.toLowerCase().includes(lowerQuery) ||
      page.content.toLowerCase().includes(lowerQuery)
  )
}

// 动态加载 docs 目录下的 Markdown 文件并合并到配置
const markdownModules = import.meta.glob('../docs/**/*.md', { as: 'raw', eager: true })

function normalizeDocEntry(path, content) {
  const segments = path.split('/')
  const docsIndex = segments.findIndex((s) => s === 'docs')
  // 分类：取 docs 下一级目录作为分类；如果没有子目录则归为 misc
  let category = 'misc'
  if (
    docsIndex >= 0 &&
    segments.length > docsIndex + 2 &&
    !segments[docsIndex + 1].endsWith('.md')
  ) {
    category = segments[docsIndex + 1]
  }
  const filename = segments[segments.length - 1].replace(/\.md$/i, '')
  const orderMatch = filename.match(/^(\d+)[-_ ](.+)$/)
  const order = orderMatch ? parseInt(orderMatch[1], 10) : 999
  const title = orderMatch ? orderMatch[2] : filename
  // id 使用 "分类-标题"，去除空格与特殊字符；支持中文
  const idBase = `${category}-${title}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_\x00-\x7f\u4e00-\u9fa5]/gi, '-')
  const id = idBase
  return { id, title, category, order, content }
}

const dynamicPages = Object.entries(markdownModules).map(([path, content]) =>
  normalizeDocEntry(path, content)
)

// 动态补充不存在的分类
const existingCategoryIds = new Set(documentationConfig.categories.map((c) => c.id))
const dynamicCategoryIds = Array.from(new Set(dynamicPages.map((p) => p.category)))

dynamicCategoryIds.forEach((id) => {
  if (!existingCategoryIds.has(id)) {
    documentationConfig.categories.push({
      id,
      title: id,
      icon: 'document',
      color: 'gray'
    })
  }
})

// 按 order 排序并替换 pages
documentationConfig.pages = dynamicPages.sort((a, b) => a.order - b.order)
