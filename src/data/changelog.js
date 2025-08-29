// 更新日志数据
export const changelogData = [
  {
    version: '2.1.0',
    date: '2024-08-30',
    type: 'release',
    badge: '最新版本',
    badgeColor: 'green',
    changes: {
      features: [
        '🤖 深度优化AI功能，提高AI响应速度',
        '🔄 调整"转换"功能的呈现方式，支持实时输出',
        '🔔 优化消息提示，统一调整到编辑器右上角位置',
        '🔄 完善应用自动更新流程'
      ],
      improvements: [
        '⚡ AI响应速度显著提升，用户体验更流畅',
        '📍 消息提示位置优化，避免遮挡顶部菜单栏',
        '🔧 权限配置优化，改善Windows版本用户体验',
        '🎯 转换功能交互优化，提供更好的实时反馈'
      ],
      fixes: [
        '🎨 修复部分主题使用后导致预览区无法滚动的问题',
        '🔐 尝试修复Windows版本粘贴需要管理员权限的问题',
        '📱 解决了消息提示遮挡界面元素的问题'
      ]
    }
  },
  {
    version: '2.0.0',
    date: '2024-08-29',
    type: 'release',
    badge: '正式版',
    badgeColor: 'blue',
    changes: {
      features: [
        '🌟 全新的官方网站上线，提供更好的用户体验',
        '📱 响应式设计，完美适配各种设备和屏幕尺寸',
        '🎨 现代化的UI设计，采用渐进式动画效果',
        '📊 实时下载统计功能，展示真实的下载数据',
        '🌙 深色模式支持，保护您的眼睛',
        '📋 更新日志功能，及时了解版本变化'
      ],
      improvements: [
        '⚡ 页面加载速度提升 60%，用户体验更流畅',
        '🎯 优化了下载流程，支持多平台一键下载',
        '📈 改进了统计数据的准确性和实时性',
        '🔧 优化了代码结构，提高了维护性'
      ],
      fixes: [
        '🐛 修复了首页重新进入时加载不完整的问题',
        '🔄 解决了下载统计数据显示不准确的问题',
        '📱 修复了移动端的兼容性问题',
        '🎨 解决了深色模式下的样式异常'
      ]
    }
  },
  {
    version: '1.0.0',
    date: '2024-07-15',
    type: 'release',
    badge: '首个正式版',
    badgeColor: 'blue',
    changes: {
      features: [
        '🎉 Welight 应用首个正式版发布',
        '📝 Markdown 编辑器，支持实时预览',
        '🎨 多种主题支持，个性化编辑体验',
        '🤖 AI 功能集成，智能辅助写作',
        '🔄 文档转换功能，支持多种格式',
        '🖥️ 跨平台支持（Windows、macOS、Linux）'
      ],
      improvements: [
        '🚀 应用启动速度优化',
        '💾 内存使用效率提升',
        '🎨 用户界面体验优化',
        '⚡ 编辑器性能提升'
      ],
      fixes: [
        '🔧 修复了编辑器稳定性问题',
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
