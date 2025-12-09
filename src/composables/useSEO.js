import { onMounted } from 'vue'

export function useSEO(options = {}) {
  const defaultOptions = {
    title: 'Welight - 微信公众号排版工具 | Markdown一键转公众号',
    description:
      'Welight是专业的微信公众号排版工具，基于Markdown语法快速排版。支持多种精美主题、AI智能写作、一键复制到公众号。让公众号排版变得简单高效，提升内容创作体验。',
    keywords:
      'Welight,微信公众号排版,公众号编辑器,Markdown排版,公众号工具,微信排版,内容创作,AI写作,一键排版,免费下载',
    image: 'https://waer.ltd/logo.png',
    url: 'https://waer.ltd/',
    type: 'website'
  }

  const seoOptions = { ...defaultOptions, ...options }

  onMounted(() => {
    // 更新页面标题
    document.title = seoOptions.title

    // 更新或创建meta标签
    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)

      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // 更新基础meta标签
    updateMeta('description', seoOptions.description)
    updateMeta('keywords', seoOptions.keywords)

    // 更新Open Graph标签
    updateMeta('og:title', seoOptions.title, true)
    updateMeta('og:description', seoOptions.description, true)
    updateMeta('og:image', seoOptions.image, true)
    updateMeta('og:url', seoOptions.url, true)
    updateMeta('og:type', seoOptions.type, true)

    // 更新Twitter Card标签
    updateMeta('twitter:title', seoOptions.title, true)
    updateMeta('twitter:description', seoOptions.description, true)
    updateMeta('twitter:image', seoOptions.image, true)
    updateMeta('twitter:card', 'summary_large_image', true)
  })
}

// 页面特定的SEO配置
export const seoConfigs = {
  home: {
    title: 'Welight - 微信公众号排版工具 | Markdown一键转公众号 | 排版神器',
    description:
      'Welight是专业的微信公众号排版工具，基于Markdown语法快速排版。支持20+精美主题、AI智能写作、一键复制到公众号。让公众号排版变得简单高效，是自媒体人、运营人员的首选排版神器。',
    keywords:
      'Welight,微信公众号排版,公众号编辑器,Markdown排版,公众号工具,微信排版,内容创作,AI写作,排版神器,公众号模板,文章美化,自媒体工具,微信编辑器,公众号格式化,一键排版',
    url: 'https://waer.ltd/'
  },
  download: {
    title: 'Welight下载 - 免费微信公众号排版工具 | 支持Windows/macOS/Linux',
    description:
      '免费下载Welight微信公众号排版工具，支持Windows 10/11、macOS、Linux系统。基于Markdown的专业公众号编辑器，20+主题模板，AI智能写作，让排版变得简单高效。',
    keywords:
      'Welight下载,微信公众号排版工具下载,公众号编辑器下载,免费排版软件,Windows,macOS,Linux,桌面应用下载,公众号工具免费',
    url: 'https://waer.ltd/download'
  },
  changelog: {
    title: 'Welight更新日志 - 版本历史与新功能介绍',
    description:
      '查看Welight微信公众号排版工具的最新版本更新日志，了解新功能、优化改进和问题修复。持续更新，不断完善用户体验。',
    keywords: 'Welight更新日志,版本历史,新功能,更新记录,公众号排版工具更新',
    url: 'https://waer.ltd/release-history'
  },
  about: {
    title: 'Welight介绍 - 专业的微信公众号排版工具',
    description:
      '了解Welight微信公众号排版工具的功能特色、设计理念和团队介绍。专为公众号创作者打造的高效排版解决方案。',
    keywords: 'Welight介绍,关于Welight,微信公众号排版,产品介绍,团队介绍',
    url: 'https://waer.ltd/about'
  },
  pricing: {
    title: 'Welight定价 - 许可证购买 | 年付/终身授权 | AI积分套餐',
    description:
      'Welight微信公众号排版工具定价方案，提供年许可证、终身许可证和AI积分套餐。解锁全部主题模板、AI智能写作等高级功能，物超所值。',
    keywords:
      'Welight价格,公众号排版工具价格,许可证购买,终身授权,AI积分,会员价格,软件购买,正版授权',
    url: 'https://waer.ltd/pricing'
  },
  donation: {
    title: 'Welight赞助支持 - 支持独立开发者',
    description:
      '支持Welight独立开发者，您的赞助将帮助我们持续改进产品、开发新功能。感谢每一位支持者的信任与鼓励。',
    keywords: 'Welight赞助,支持开发者,独立开发,打赏支持,软件赞助',
    url: 'https://waer.ltd/donation'
  },
  documentation: {
    title: 'Welight帮助文档 - 使用教程与功能指南',
    description:
      'Welight微信公众号排版工具完整使用文档，包含快速入门、主题系统、配置管理、常见问题解答等，帮助您快速上手。',
    keywords:
      'Welight教程,使用文档,帮助指南,公众号排版教程,Markdown教程,主题配置,快速入门,操作指南',
    url: 'https://waer.ltd/documentation'
  },
  community: {
    title: 'Welight社区交流 - 加入用户群组',
    description:
      '加入Welight用户社区，与其他公众号创作者交流排版技巧、分享经验。提供QQ群和微信群两种交流方式，获取最新动态和技术支持。',
    keywords: 'Welight社区,用户交流,QQ群,微信群,公众号交流,排版技巧分享,用户群',
    url: 'https://waer.ltd/community'
  },
  monthlyCards: {
    title: 'Welight月卡功能 - 灵活订阅方案',
    description: 'Welight月卡订阅服务，按月付费使用全部高级功能，灵活便捷，适合短期项目使用。',
    keywords: 'Welight月卡,按月订阅,灵活付费,短期使用,订阅服务',
    url: 'https://waer.ltd/monthly-cards'
  },
  releaseHistory: {
    title: 'Welight历史版本下载 - 所有版本归档',
    description:
      '下载Welight微信公众号排版工具的历史版本，包含所有已发布版本的安装包归档，支持Windows、macOS、Linux系统。',
    keywords: 'Welight历史版本,旧版本下载,版本归档,Welight下载,版本回退',
    url: 'https://waer.ltd/release-history'
  },
  terms: {
    title: '服务条款 - Welight用户协议',
    description: 'Welight微信公众号排版工具服务条款与用户协议，请在使用前仔细阅读。',
    keywords: 'Welight服务条款,用户协议,使用条款',
    url: 'https://waer.ltd/terms'
  },
  privacy: {
    title: '隐私政策 - Welight数据保护声明',
    description: 'Welight微信公众号排版工具隐私政策，说明我们如何收集、使用和保护您的个人信息。',
    keywords: 'Welight隐私政策,数据保护,隐私声明,个人信息保护',
    url: 'https://waer.ltd/privacy'
  },
  disclaimer: {
    title: '免责声明 - Welight法律声明',
    description: 'Welight微信公众号排版工具免责声明与法律条款说明。',
    keywords: 'Welight免责声明,法律声明,责任限制',
    url: 'https://waer.ltd/disclaimer'
  }
}
