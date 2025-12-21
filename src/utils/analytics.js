// 百度统计工具函数

/**
 * 追踪下载事件
 * @param {string} platform - 平台类型
 * @param {string} downloadUrl - 下载链接
 */
export function trackDownload(platform, downloadUrl) {
  if (typeof window._hmt !== 'undefined') {
    window._hmt.push(['_trackEvent', 'download', platform, downloadUrl])
  }
}

/**
 * 追踪页面访问
 * @param {string} pageName - 页面名称
 */
export function trackPageView(pageName) {
  if (typeof window._hmt !== 'undefined') {
    window._hmt.push(['_trackPageview', pageName])
  }
}

/**
 * 追踪自定义事件
 * @param {string} category - 事件类别
 * @param {string} action - 事件动作
 * @param {string} label - 事件标签
 * @param {number} value - 事件值
 */
export function trackEvent(category, action, label, value) {
  if (typeof window._hmt !== 'undefined') {
    window._hmt.push(['_trackEvent', category, action, label, value])
  }
}

/**
 * 获取下载统计数据 - 已迁移到 downloadStats 服务
 * @deprecated 请使用 @/services/downloadStats 中的相关函数
 */
export function getDownloadStats() {
  console.warn('getDownloadStats 已废弃，请使用 @/services/downloadStats 中的 initializeDownloadStats')
  return {
    'windows-installer': 0,
    'windows-msi': 0,
    'macos-apple': 0,
    'macos-intel': 0,
    'linux-appimage': 0,
    'linux-deb': 0
  }
}

/**
 * 初始化百度统计
 * @param {string} siteId - 百度统计站点ID
 */
export function initBaiduAnalytics(siteId) {
  if (typeof window !== 'undefined') {
    window._hmt = window._hmt || []
    
    const script = document.createElement('script')
    script.src = `https://hm.baidu.com/hm.js?${siteId}`
    script.async = true
    
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  }
}
