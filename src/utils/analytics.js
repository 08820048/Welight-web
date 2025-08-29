// 百度统计工具函数

/**
 * 追踪下载事件
 * @param {string} platform - 平台类型
 * @param {string} downloadUrl - 下载链接
 */
export function trackDownload(platform, downloadUrl) {
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackEvent', 'download', platform, downloadUrl])
  }
}

/**
 * 追踪页面访问
 * @param {string} pageName - 页面名称
 */
export function trackPageView(pageName) {
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackPageview', pageName])
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
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackEvent', category, action, label, value])
  }
}

/**
 * 模拟获取下载统计数据
 * 注意：百度统计不提供实时API，这里只是示例
 * 实际需要通过百度统计后台查看数据
 */
export function getDownloadStats() {
  // 这里返回模拟数据，实际应该从百度统计API获取
  // 百度统计的数据通常需要通过后台查看或使用官方API
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
