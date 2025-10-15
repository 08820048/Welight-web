/**
 * 服务状态管理服务
 * 用于检查系统服务状态并控制购买功能的可用性
 */

const API_BASE_URL = 'https://ilikexff.cn/api'

/**
 * 服务状态码枚举
 */
export const SERVICE_STATUS = {
  NORMAL: 'NORMAL',           // 服务正常
  MAINTENANCE: 'MAINTENANCE', // 维护中
  FAULT: 'FAULT',            // 故障
  DEGRADED: 'DEGRADED'       // 降级服务
}

/**
 * 获取服务状态
 * @returns {Promise<Object>} 服务状态信息
 */
export async function getServiceStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/service-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.warn('获取服务状态失败，使用默认正常状态')
      return getDefaultNormalStatus()
    }

    const result = await response.json()
    
    if (result.code === 200 && result.data) {
      return result.data
    } else {
      console.warn('服务状态响应格式异常，使用默认正常状态')
      return getDefaultNormalStatus()
    }
  } catch (error) {
    console.error('获取服务状态异常:', error)
    // 即使出错也返回正常状态，确保应用端不受影响
    return getDefaultNormalStatus()
  }
}

/**
 * 获取默认的正常状态
 * @returns {Object} 默认正常状态对象
 */
function getDefaultNormalStatus() {
  return {
    statusCode: SERVICE_STATUS.NORMAL,
    statusName: '服务正常',
    statusDescription: '所有功能正常运行',
    message: '系统运行正常',
    estimatedRecoveryTime: null,
    lastUpdated: null,
    available: true
  }
}

/**
 * 检查服务是否可用（可以进行购买操作）
 * @param {Object} status 服务状态对象
 * @returns {boolean} 是否可用
 */
export function isServiceAvailable(status) {
  if (!status) return true // 如果没有状态信息，默认可用
  return status.available === true
}

/**
 * 获取服务状态的显示文本
 * @param {Object} status 服务状态对象
 * @returns {string} 显示文本
 */
export function getStatusDisplayText(status) {
  if (!status) return '立即购买'
  
  if (status.available) {
    return '立即购买'
  }
  
  // 根据不同状态返回不同文本
  switch (status.statusCode) {
    case SERVICE_STATUS.MAINTENANCE:
      return '维护中'
    case SERVICE_STATUS.FAULT:
      return '服务故障'
    case SERVICE_STATUS.DEGRADED:
      return '服务降级'
    default:
      return '暂不可用'
  }
}

/**
 * 获取服务状态的详细提示信息
 * @param {Object} status 服务状态对象
 * @returns {string} 提示信息
 */
export function getStatusTooltip(status) {
  if (!status || status.available) {
    return ''
  }
  
  let tooltip = status.message || status.statusDescription || '服务暂时不可用'
  
  if (status.estimatedRecoveryTime) {
    tooltip += `\n预计恢复时间: ${formatDateTime(status.estimatedRecoveryTime)}`
  }
  
  return tooltip
}

/**
 * 格式化日期时间
 * @param {string} dateTimeStr ISO格式的日期时间字符串
 * @returns {string} 格式化后的日期时间
 */
function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return ''
  
  try {
    const date = new Date(dateTimeStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day} ${hours}:${minutes}`
  } catch (error) {
    console.error('日期格式化失败:', error)
    return dateTimeStr
  }
}

/**
 * 创建服务状态监控器
 * 定期检查服务状态并触发回调
 * @param {Function} callback 状态变化时的回调函数
 * @param {number} interval 检查间隔（毫秒），默认5分钟
 * @returns {Object} 包含 start 和 stop 方法的监控器对象
 */
export function createServiceStatusMonitor(callback, interval = 5 * 60 * 1000) {
  let timerId = null
  let currentStatus = null
  
  const checkStatus = async () => {
    const newStatus = await getServiceStatus()
    
    // 如果状态发生变化，触发回调
    if (!currentStatus || currentStatus.statusCode !== newStatus.statusCode) {
      currentStatus = newStatus
      if (callback && typeof callback === 'function') {
        callback(newStatus)
      }
    }
  }
  
  return {
    /**
     * 启动监控
     */
    async start() {
      // 立即检查一次
      await checkStatus()
      
      // 设置定时检查
      timerId = setInterval(checkStatus, interval)
    },
    
    /**
     * 停止监控
     */
    stop() {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }
    },
    
    /**
     * 获取当前状态
     */
    getCurrentStatus() {
      return currentStatus
    }
  }
}

