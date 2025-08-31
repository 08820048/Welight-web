import { useHead } from '@unhead/vue'

export function useSEO(options = {}) {
  const defaultOptions = {
    title: 'Welight - 微信公众号排版工具 | Markdown一键转公众号',
    description: 'Welight是专业的微信公众号排版工具，基于Markdown语法快速排版。支持多种精美主题、AI智能写作、一键复制到公众号。让公众号排版变得简单高效，提升内容创作体验。',
    keywords: 'Welight,微信公众号排版,公众号编辑器,Markdown排版,公众号工具,微信排版,内容创作,AI写作,一键排版,免费下载',
    image: 'https://waer.ltd/logo.png',
    url: 'https://waer.ltd/',
    type: 'website'
  }

  const seoOptions = { ...defaultOptions, ...options }

  useHead({
    title: seoOptions.title,
    meta: [
      { name: 'description', content: seoOptions.description },
      { name: 'keywords', content: seoOptions.keywords },
      { property: 'og:title', content: seoOptions.title },
      { property: 'og:description', content: seoOptions.description },
      { property: 'og:image', content: seoOptions.image },
      { property: 'og:url', content: seoOptions.url },
      { property: 'og:type', content: seoOptions.type },
      { property: 'twitter:title', content: seoOptions.title },
      { property: 'twitter:description', content: seoOptions.description },
      { property: 'twitter:image', content: seoOptions.image },
      { property: 'twitter:card', content: 'summary_large_image' }
    ]
  })
}

// 页面特定的SEO配置
export const seoConfigs = {
  home: {
    title: 'Welight - 微信公众号排版工具 | Markdown一键转公众号',
    description: 'Welight是专业的微信公众号排版工具，基于Markdown语法快速排版。支持多种精美主题、AI智能写作、一键复制到公众号。让公众号排版变得简单高效。',
    keywords: 'Welight,微信公众号排版,公众号编辑器,Markdown排版,公众号工具,微信排版,内容创作,AI写作',
    url: 'https://waer.ltd/'
  },
  download: {
    title: 'Welight下载 - 免费微信公众号排版工具 | 支持Windows/macOS/Linux',
    description: '免费下载Welight微信公众号排版工具，支持Windows、macOS、Linux系统。基于Markdown的专业公众号编辑器，让排版变得简单高效。',
    keywords: 'Welight下载,微信公众号排版工具下载,公众号编辑器下载,免费排版软件,Windows,macOS,Linux',
    url: 'https://waer.ltd/download'
  },
  changelog: {
    title: 'Welight更新日志 - 版本历史与新功能介绍',
    description: '查看Welight微信公众号排版工具的最新版本更新日志，了解新功能、优化改进和问题修复。持续更新，不断完善用户体验。',
    keywords: 'Welight更新日志,版本历史,新功能,更新记录,公众号排版工具更新',
    url: 'https://waer.ltd/changelog'
  },
  about: {
    title: 'Welight介绍 - 专业的微信公众号排版工具',
    description: '了解Welight微信公众号排版工具的功能特色、设计理念和团队介绍。专为公众号创作者打造的高效排版解决方案。',
    keywords: 'Welight介绍,关于Welight,微信公众号排版,产品介绍,团队介绍',
    url: 'https://waer.ltd/about'
  }
}
