// 下载统计服务
// 集成后端API进行真实的下载量统计

const API_BASE_URL = 'https://ilikexff.cn/api/download-stats'

/**
 * 记录下载事件（自动检测平台）
 * @param {string} referer - 来源页面URL
 * @returns {Promise<boolean>} 是否记录成功
 */
export async function recordDownload(referer = 'https://waer.ltd/download') {
  try {
    const response = await fetch(`${API_BASE_URL}/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `referer=${encodeURIComponent(referer)}`
    })
    
    if (response.ok) {
      console.log('下载记录成功')
      return true
    } else {
      console.error('下载记录失败:', response.status)
      return false
    }
  } catch (error) {
    console.error('记录下载时发生错误:', error)
    return false
  }
}

/**
 * 获取下载统计数据
 * @returns {Promise<Object|null>} 统计数据对象或null
 */
export async function getDownloadStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`)
    
    if (response.ok) {
      const result = await response.json()
      console.log('获取统计数据成功:', result.data)
      return result.data
    } else {
      console.error('获取统计数据失败:', response.status)
      return null
    }
  } catch (error) {
    console.error('获取统计数据时发生错误:', error)
    return null
  }
}

/**
 * 平台映射 - 将内部平台标识映射到后端识别的格式
 */
const PLATFORM_MAPPING = {
  'windows-installer': 'windows',
  'windows-msi': 'windows',
  'macos-apple': 'macos',
  'macos-intel': 'macos',
  'linux-appimage': 'linux',
  'linux-deb': 'linux'
}

/**
 * 处理下载事件 - 记录下载并更新本地统计
 * @param {string} platform - 平台标识
 * @param {string} downloadUrl - 下载链接
 * @param {Function} updateLocalStats - 更新本地统计的回调函数
 */
export async function handleDownload(platform, downloadUrl, updateLocalStats) {
  try {
    // 1. 记录下载到后端
    const referer = window.location.href
    await recordDownload(referer)
    
    // 2. 更新本地统计（用于即时反馈）
    if (updateLocalStats) {
      updateLocalStats(platform)
    }
    
    // 3. 百度统计事件追踪
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackEvent', 'download', platform, downloadUrl])
    }
    
    // 4. 执行实际下载
    window.open(downloadUrl, '_blank')
    console.log(`开始下载 ${platform} 版本: ${downloadUrl}`)
    
    return true
  } catch (error) {
    console.error('处理下载时发生错误:', error)
    return false
  }
}

/**
 * 初始化下载统计 - 从后端获取真实数据
 * @returns {Promise<Object>} 统计数据对象
 */
export async function initializeDownloadStats() {
  // 默认统计数据
  const defaultStats = {
    'windows-installer': 0,
    'windows-msi': 0,
    'macos-apple': 0,
    'macos-intel': 0,
    'linux-appimage': 0,
    'linux-deb': 0
  }
  
  try {
    // 尝试从后端获取真实统计数据
    const backendStats = await getDownloadStats()
    
    if (backendStats) {
      // 如果后端返回了数据，将其映射到我们的格式
      const mappedStats = { ...defaultStats }
      
      // 根据后端数据更新统计（这里需要根据后端实际返回的数据格式调整）
      if (backendStats.windows) {
        mappedStats['windows-installer'] = Math.floor(backendStats.windows * 0.7) // 假设70%使用installer
        mappedStats['windows-msi'] = Math.floor(backendStats.windows * 0.3) // 30%使用msi
      }
      
      if (backendStats.macos) {
        mappedStats['macos-apple'] = Math.floor(backendStats.macos * 0.9) // 假设90%使用Apple Silicon
        mappedStats['macos-intel'] = Math.floor(backendStats.macos * 0.1) // 10%使用Intel
      }
      
      if (backendStats.linux) {
        mappedStats['linux-appimage'] = Math.floor(backendStats.linux * 0.6) // 假设60%使用AppImage
        mappedStats['linux-deb'] = Math.floor(backendStats.linux * 0.4) // 40%使用deb
      }
      
      return mappedStats
    }
  } catch (error) {
    console.error('初始化下载统计失败，使用默认数据:', error)
  }
  
  // 如果后端数据获取失败，尝试从本地存储获取
  const localStats = localStorage.getItem('downloadStats')
  if (localStats) {
    try {
      const parsedStats = JSON.parse(localStats)
      return { ...defaultStats, ...parsedStats }
    } catch (error) {
      console.error('解析本地统计数据失败:', error)
    }
  }
  
  return defaultStats
}

/**
 * 定期同步统计数据
 * @param {Function} updateCallback - 更新统计数据的回调函数
 * @param {number} interval - 同步间隔（毫秒），默认5分钟
 */
export function startStatsSync(updateCallback, interval = 5 * 60 * 1000) {
  const syncStats = async () => {
    try {
      const stats = await initializeDownloadStats()
      if (updateCallback) {
        updateCallback(stats)
      }
    } catch (error) {
      console.error('同步统计数据失败:', error)
    }
  }
  
  // 立即执行一次
  syncStats()
  
  // 设置定期同步
  const intervalId = setInterval(syncStats, interval)
  
  // 返回清理函数
  return () => clearInterval(intervalId)
}
