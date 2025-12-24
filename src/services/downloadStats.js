// 下载统计服务
// 集成后端API进行真实的下载量统计

const API_BASE_URL = 'https://ilikexff.cn/api/download-stats'
// 保留仅旧统计服务的实现，前端不使用需要签名的新接口

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
        'Content-Type': 'application/x-www-form-urlencoded'
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
 * 记录下载事件（指定平台）
 * @param {string} platform - 平台名称 (MAC, WINDOWS, LINUX)
 * @param {string} referer - 来源页面URL
 * @returns {Promise<boolean>} 是否记录成功
 */
export async function recordDownloadWithPlatform(platform, referer = 'https://waer.ltd/download') {
  try {
    const response = await fetch(`${API_BASE_URL}/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `platform=${platform}&referer=${encodeURIComponent(referer)}`
    })

    if (response.ok) {
      const result = await response.json()
      if (result.code === 200) {
        console.log(`${platform} 平台下载记录成功`)
        return true
      } else {
        console.error('下载记录失败:', result.message)
        return false
      }
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
/**
 * 获取下载统计数据（旧统计服务）
 * @returns {Promise<Object|null>} 统计数据对象或null
 */
export async function getDownloadStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`)
    if (response.ok) {
      const result = await response.json()
      if (result.code === 200 && result.data) {
        return result.data
      } else {
        console.warn('后端返回数据格式异常:', result)
        return null
      }
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
  'linux-deb': 'linux',
  'linux-rpm': 'linux'
}

/**
 * 处理下载事件 - 记录下载并更新本地统计
 * @param {string} platform - 平台标识
 * @param {string} downloadUrl - 下载链接
 * @param {Function} updateLocalStats - 更新本地统计的回调函数
 */
// 平台映射：前端平台名称 -> API平台名称
const PLATFORM_API_MAPPING = {
  'windows-installer': 'WINDOWS',
  'windows-msi': 'WINDOWS',
  'macos-apple': 'MAC',
  'macos-intel': 'MAC',
  'linux-appimage': 'LINUX',
  'linux-deb': 'LINUX',
  'linux-rpm': 'LINUX'
}

export async function handleDownload(platform, downloadUrl, updateLocalStats) {
  try {
    // 1. 记录下载到后端（发送正确的平台名称）
    const apiPlatform = PLATFORM_API_MAPPING[platform] || 'UNKNOWN'
    const referer = window.location.href
    await recordDownloadWithPlatform(apiPlatform, referer)

    // 2. 更新本地统计（用于即时反馈）
    if (updateLocalStats) {
      updateLocalStats(platform)
    }

    // 3. 百度统计事件追踪
    if (typeof window._hmt !== 'undefined') {
      window._hmt.push(['_trackEvent', 'download', platform, downloadUrl])
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
    'linux-deb': 0,
    'linux-rpm': 0
  }

  try {
    // 尝试从后端获取真实统计数据
    const backendStats = await getDownloadStats()

    if (backendStats && backendStats.platformDownloads) {
      console.log('后端统计数据:', backendStats)

      // 获取平台下载数据
      const platformDownloads = backendStats.platformDownloads
      const mappedStats = { ...defaultStats }

      // 根据后端实际返回的数据格式映射
      if (platformDownloads.windows > 0) {
        // Windows平台分配：70% installer, 30% msi
        mappedStats['windows-installer'] = Math.floor(platformDownloads.windows * 0.7)
        mappedStats['windows-msi'] = platformDownloads.windows - mappedStats['windows-installer']
      }

      if (platformDownloads.mac > 0) {
        // macOS平台分配：90% Apple Silicon, 10% Intel
        mappedStats['macos-apple'] = Math.floor(platformDownloads.mac * 0.9)
        mappedStats['macos-intel'] = platformDownloads.mac - mappedStats['macos-apple']
      }

      if (platformDownloads.linux > 0) {
        // Linux平台分配：60% AppImage, 25% deb, 15% rpm
        mappedStats['linux-appimage'] = Math.floor(platformDownloads.linux * 0.6)
        mappedStats['linux-deb'] = Math.floor(platformDownloads.linux * 0.25)
        mappedStats['linux-rpm'] =
          platformDownloads.linux - mappedStats['linux-appimage'] - mappedStats['linux-deb']
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
