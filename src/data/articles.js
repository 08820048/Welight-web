/**
 * 微光学堂文章配置
 * 
 * 使用说明：
 * 1. 将AI生成的HTML文章放到 public/articles/ 目录
 * 2. 在下方 articles 数组中添加文章配置
 * 3. slug 需要和HTML文件名一致（不含.html后缀）
 * 
 * 示例：文件 public/articles/getting-started.html 对应 slug: 'getting-started'
 */

export const articles = [
  {
    slug: '微信公众号排版：从Markdown到成品的那些小确幸',
    title: '微信公众号排版：从Markdown到成品的那些小确幸',
    summary: '从安装到排版第一篇文章，10分钟快速上手Welight微信公众号排版工具。',
    cover: 'https://images.waer.ltd/notes/202511291509882.png',
    date: '2025-12-09',
    category: '入门教程',
    tags: ['入门', '教程', '快速开始'],
    author: 'Welight Team'
  },

]

/**
 * 获取所有文章
 * @param {Object} options - 筛选选项
 * @param {string} options.category - 按分类筛选
 * @param {string} options.tag - 按标签筛选
 * @returns {Array} 文章列表
 */
export function getArticles(options = {}) {
  let result = [...articles]
  
  if (options.category) {
    result = result.filter(a => a.category === options.category)
  }
  
  if (options.tag) {
    result = result.filter(a => a.tags.includes(options.tag))
  }
  
  // 按日期降序排序
  result.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return result
}

/**
 * 根据slug获取文章
 * @param {string} slug - 文章标识
 * @returns {Object|null} 文章对象
 */
export function getArticleBySlug(slug) {
  return articles.find(a => a.slug === slug) || null
}

/**
 * 获取所有分类
 * @returns {Array} 分类列表
 */
export function getCategories() {
  const categories = [...new Set(articles.map(a => a.category))]
  return categories
}

/**
 * 获取所有标签
 * @returns {Array} 标签列表
 */
export function getTags() {
  const tags = new Set()
  articles.forEach(a => a.tags.forEach(t => tags.add(t)))
  return [...tags]
}

/**
 * 获取相关文章（同分类或同标签）
 * @param {string} slug - 当前文章slug
 * @param {number} limit - 返回数量限制
 * @returns {Array} 相关文章列表
 */
export function getRelatedArticles(slug, limit = 3) {
  const current = getArticleBySlug(slug)
  if (!current) return []
  
  const related = articles
    .filter(a => a.slug !== slug)
    .filter(a => 
      a.category === current.category || 
      a.tags.some(t => current.tags.includes(t))
    )
    .slice(0, limit)
  
  return related
}

/**
 * 获取文章HTML路径
 * @param {string} slug - 文章标识
 * @returns {string} HTML文件路径
 */
export function getArticleHtmlPath(slug) {
  return `/articles/${slug}.html`
}

