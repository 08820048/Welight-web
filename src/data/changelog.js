// 更新日志数据
export const changelogData = [
  {
    version: '2.2.0',
    date: '2025-08-29',
    type: 'release',
    badge: '最新版本',
    badgeColor: 'green',
    changes: {
      features: [
        '划词功能中的AI功能优化增强，新增AI功能任务后台机制',
        '多任务并行，后台任务完成后会自动通知',
        '新增免费的DeepSeek模型体验，用户可通过指定方式获取免费使用码',
        '提供推广方式，方便用户体验AI功能'
      ],
      improvements: [
        '调整"极简白净"主题切换时顶部菜单栏菜单配色',
        '针对性处理超链接的markdown语法格式在公众号编辑器中的兼容性',
        '调整增强现有主题样式、统一主题中的无序列表风格',
        '优化文本格式转换时markdown规则检查和转换逻辑',
        '将后续操作权交给用户处理，不占用编辑器空间，提高创作效率',
        '其他细节优化'
      ],
      fixes: [
        '解决颜色冲突导致菜单看不清的问题',
        '调整主题数量，优化主题管理'
      ]
    }
  },
  {
    version: '2.1.1',
    date: '2025-08-29',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      improvements: [
        '移除编辑区内容折叠功能，简化编辑器'
      ],
      fixes: [
        '修复 Windows 版本构建失败的 BUG'
      ]
    }
  },
  {
    version: '2.1.0',
    date: '2025-08-29',
    type: 'release',
    badge: '正式版',
    badgeColor: 'blue',
    changes: {
      features: [
        '深度优化AI功能，提高AI响应速度',
        '调整"转换"功能的呈现方式，支持实时输出',
        '优化消息提示，统一调整到编辑器右上角位置',
        '完善应用自动更新流程'
      ],
      improvements: [
        'AI响应速度显著提升，用户体验更流畅',
        '消息提示位置优化，避免遮挡顶部菜单栏',
        '权限配置优化，改善Windows版本用户体验',
        '转换功能交互优化，提供更好的实时反馈'
      ],
      fixes: [
        '修复部分主题使用后导致预览区无法滚动的问题',
        '尝试修复Windows版本粘贴需要管理员权限的问题',
        '解决了消息提示遮挡界面元素的问题'
      ]
    }
  },
  {
    version: '2.0.0',
    date: '2025-08-29',
    type: 'release',
    badge: '首个桌面版',
    badgeColor: 'blue',
    changes: {
      features: [
        'Welight 桌面应用正式发布',
        'Markdown 编辑器，支持实时预览',
        '多种主题支持，个性化编辑体验',
        'AI 功能集成，智能辅助写作',
        '文档转换功能，支持多种格式',
        '跨平台支持（Windows、macOS、Linux）',
        '全新的官方网站上线'
      ],
      improvements: [
        '应用启动速度优化',
        '内存使用效率提升',
        '用户界面体验优化',
        '编辑器性能提升'
      ],
      fixes: [
        '修复了编辑器稳定性问题',
        '解决了 macOS 上的兼容性问题',
        '修复了高分辨率显示器的显示问题'
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
