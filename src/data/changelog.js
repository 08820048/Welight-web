// 更新日志数据
export const changelogData = [
  {
    version: '2.0.0',
    date: '2024-08-29',
    type: 'release', // release, beta, alpha
    badge: '最新版本',
    badgeColor: 'green',
    changes: {
      features: [
        '🌟 全新的官方网站上线，提供更好的用户体验',
        '📱 响应式设计，完美适配各种设备和屏幕尺寸',
        '🎨 现代化的UI设计，采用渐进式动画效果',
        '📊 实时下载统计功能，展示真实的下载数据',
        '🌙 深色模式支持，保护您的眼睛',
        '📋 更新日志功能，及时了解版本变化',
        '🔄 智能缓存机制，提升页面加载速度'
      ],
      improvements: [
        '⚡ 页面加载速度提升 60%，用户体验更流畅',
        '🎯 优化了下载流程，支持多平台一键下载',
        '📈 改进了统计数据的准确性和实时性',
        '🔧 优化了代码结构，提高了维护性',
        '🎪 增强了动画效果，提供更好的视觉反馈'
      ],
      fixes: [
        '🐛 修复了首页重新进入时加载不完整的问题',
        '🔄 解决了下载统计数据显示不准确的问题',
        '📱 修复了移动端的兼容性问题',
        '🎨 解决了深色模式下的样式异常',
        '⚙️ 修复了页面状态管理的相关问题'
      ]
    }
  },
  {
    version: '1.0.0',
    date: '2024-07-15',
    type: 'release',
    badge: '正式版',
    badgeColor: 'blue',
    changes: {
      features: [
        '🎉 Welight 应用正式发布',
        '📁 智能文件管理系统，自动分类和整理',
        '🔄 实时同步功能，多设备无缝协作',
        '🔍 增强的搜索功能，支持模糊匹配和高级筛选',
        '⚡ 批量操作功能，提高工作效率',
        '🖥️ 跨平台支持（Windows、macOS、Linux）'
      ],
      improvements: [
        '🚀 启动速度优化，响应更加迅速',
        '💾 内存使用优化，运行更加流畅',
        '🔍 搜索算法优化，查找更加快速',
        '🎨 用户界面优化，操作更加直观'
      ],
      fixes: [
        '🔧 修复了文件保存的稳定性问题',
        '🍎 解决了 macOS 上的兼容性问题',
        '🖥️ 修复了高分辨率显示器的显示问题'
      ]
    }
  },
  {
    version: '0.9.5',
    date: '2024-06-20',
    type: 'beta',
    badge: 'Beta',
    badgeColor: 'yellow',
    changes: {
      features: [
        '🧪 Beta 测试版本发布',
        '📁 基础文件管理功能完善',
        '🔄 文件同步机制优化'
      ],
      improvements: [
        '🎨 改进了用户界面的响应性',
        '⚡ 优化了文件处理性能',
        '🚀 提升了应用启动速度',
        '💬 改进了错误提示信息的准确性'
      ],
      fixes: [
        '🔧 修复了启动时的崩溃问题',
        '⏱️ 解决了数据同步延迟的问题',
        '📄 修复了某些文件格式无法正确识别的问题',
        '🎯 解决了界面偶尔卡顿的问题'
      ]
    }
  },
  {
    version: '0.9.0',
    date: '2024-05-15',
    type: 'beta',
    badge: 'Beta',
    badgeColor: 'yellow',
    changes: {
      features: [
        '🎉 首次发布 Beta 版本',
        '📁 基础文件管理功能',
        '🖥️ 跨平台支持（Windows、macOS、Linux）',
        '🎨 基本的用户界面框架',
        '🖱️ 文件拖拽功能'
      ],
      improvements: [
        '🏗️ 建立了基础的应用架构',
        '⚙️ 实现了核心功能模块',
        '🔧 完善了基础工具链'
      ]
    }
  },
  {
    version: '0.8.0',
    date: '2024-04-01',
    type: 'alpha',
    badge: 'Alpha',
    badgeColor: 'gray',
    changes: {
      features: [
        '🌱 项目初始化',
        '🏗️ 基础框架搭建',
        '🔬 核心功能原型开发',
        '📋 技术栈选型完成'
      ],
      improvements: [
        '⚡ 建立了开发环境',
        '📚 完成了技术调研'
      ]
    }
  }
]

// 获取最新版本信息
export const getLatestVersion = () => {
  return changelogData[0]
}

// 根据版本号获取更新信息
export const getVersionInfo = (version) => {
  return changelogData.find(item => item.version === version)
}

// 获取所有发布版本（排除 alpha）
export const getReleaseVersions = () => {
  return changelogData.filter(item => item.type !== 'alpha')
}

// 格式化日期
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 获取徽章样式
export const getBadgeClass = (color) => {
  const classes = {
    green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    gray: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
  }
  return classes[color] || classes.gray
}

// 获取版本状态点颜色
export const getStatusDotClass = (type) => {
  const classes = {
    release: 'bg-green-500',
    beta: 'bg-blue-500',
    alpha: 'bg-yellow-500'
  }
  return classes[type] || 'bg-gray-400'
}

// 获取更新类型的图标和颜色
export const getChangeTypeConfig = (type) => {
  const configs = {
    features: {
      icon: '🎉',
      title: '新功能',
      color: 'text-green-600 dark:text-green-400'
    },
    improvements: {
      icon: '🔧',
      title: '改进优化',
      color: 'text-blue-600 dark:text-blue-400'
    },
    fixes: {
      icon: '🐛',
      title: '问题修复',
      color: 'text-red-600 dark:text-red-400'
    }
  }
  return configs[type] || configs.improvements
}
