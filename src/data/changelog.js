// 更新日志数据
export const changelogData = [
  {
    version: '3.1.2',
    date: '2025-10-04',
    type: 'release',
    badge: '最新版本',
    badgeColor: 'green',
    changes: {
      fixes: ['紧急修复试用期无法使用AI服务的问题', '修复本地Ollama模型请求出现400的问题'],
      improvements: [
        '调整新闻资讯，新增"头条热搜"、"全网热搜"、"国际新闻"，并调整布局',
        '其他细节优化'
      ],
      features: []
    }
  },
  {
    version: '3.1.0',
    date: '2025-10-04',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      features: [
        '新增文章背景效果，在"主题编辑"面板中选择"背景"菜单，即可使用你喜欢的背景',
        '新增AI创作模块，目前测试尚未完善，处于灰度发布状态，部分功能尚在开发调试中',
        '重构AI服务系统，AI模型大换血，在线模型采用deepseek V3、阿里的qwen3-max以及Kimi的kimi-k2-0905-preview',
        '全新的积分制，每个新用户默认有100积分的免费积分（之前的免费额度使用功能和月卡功能作废）',
        '新增热门资讯板块，在AI创作界面，新增了当前实时的热门搜索和话题，以及科技和游戏资讯。掌握创作热点不再网上冲浪！'
      ],
      improvements: [
        '优化"转换"功能，正式更名为"一键排版"，并且修复了排版状态下，按钮存在多个状态图标的问题',
        '调整模型选择位置，在编辑区顶部的工具栏即可选择模型，不需要再打开另一个界面，简化了操作',
        '优化一键排版功能，尽可能保持原文不变的情况下进行排版处理',
        '官网UI调整'
      ],
      fixes: []
    }
  },
  {
    version: '3.0.1',
    date: '2025-09-28',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      fixes: [
        '修复正常试用期期间，使用一键复制功能出现的试用期状态异常的提示问题',
        '修复试用期心跳检测传输的应用版本号错误的问题'
      ],
      improvements: [
        '优化许可证使用策略，试用期期间也可以通过许可证管理界面输入购买的许可证进行永久激活'
      ],
      features: [
        '新增设置功能，用户可以通过设置界面根据自己的喜好调整应用设置',
        '自动主题推荐控制',
        '水印开关控制'
      ]
    }
  },
  {
    version: '3.0.0',
    date: '2025-09-28',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      fixes: ['修复代码块横向滚动条消失的问题，当前的情况是代码长度会自动换行'],
      improvements: [
        '优化消息提示体验，增加可关闭支持，用户可以手动关闭提示消息',
        '囊中羞涩，暂时禁用"检查更新"功能，后续视情况开放',
        '调整"赞助"功能的入口位置，移动到顶部菜单栏',
        '优化应用界面，移除应用内的滚动条，提升使用体验',
        '优化文件保存逻辑，新文件保存时自动提取文章一级标题作为默认文件名，同时编辑区上方的.md文件名也会根据一级标题实时更新，不再是"未知文档"',
        '细节优化手机预览模式，提升体验',
        '优化主题选择器，主题列表的触发方式更流畅和直接',
        '美化编辑区和预览区的空状态显示效果',
        '美化规范检查效果，提升视觉体验',
        '调整菜单配色，统一视觉体验，对特殊的菜单按钮进行突出配色处理',
        '调整顶部菜单布局，调整菜单按钮分组，使得默认情况下，顶部菜单栏的布局不再显得拥挤',
        '优化图片上传体验，支持当光标处于图片语法后，会显示"重新上传"的悬浮菜单，用户可以选择再次尝试上传',
        '优化划词功能菜单栏的显示逻辑，确保划词菜单不会遮挡被选中的文本，同时处理边界情况'
      ],
      features: [
        '新增"主题智能推荐"功能，静默、自动智能化的主题推荐引擎，可以根据当前文章的内容风格推荐合适的主题，如果你觉得选择什么样的主题是个问题，那么不妨直接使用推荐的主题吧',
        '在"主题编辑"功能中新增对于标题字体的单独设置支持(鉴于公众号的限制，某些字体可能存在兼容性问题)',
        '新增应用终身许可证买断的方式，用户可以一次性购买终身许可证激活应用，获得应用的永久使用权',
        '应用内提供 AI 服务的购买服务，对于懒得配置 AI 或者不会配置AI 服务的用户可以考虑使用我们的服务，开箱即用'
      ]
    }
  },
  {
    version: '2.4.2',
    date: '2025-09-11',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      improvements: [
        '优化"智能转换"功能，确保转换的格式符合"规范检查"规范',
        '优化水印展示，加上排版主题名称',
        '统一所有主题中存在列表的样式，新增"属魔少年"主题，优化水墨丹青、苹果简约、科技蓝调主题(改为海洋蓝韵)',
        '修复主题复制到公众号之后其中的代码块出现高亮效果缺失，缩进异常的问题',
        '修复v4.2.1版本导致的 AI 后台任务提示列表的展示位置不可见问题，确保始终显示在右下角位置',
        '移除"导出 HTML"功能'
      ],
      features: ['新增一款名为"默认主题"的默认主题，没有任何样式，保留原始的 markdown 渲染风格']
    }
  },
  {
    version: '2.4.1',
    date: '2025-09-05',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      improvements: [
        '整体界面UI调整，采用扁平化一体式的简洁UI风格',
        '主题"建国大业"优化，移除公众号号内不支持的点缀效果',
        '调整部分界面布局和应用标题等内容',
        '新增编辑器空白内容时的默认效果，优化使用体验',
        '调整使用码获取渠道，新增QQ群获取',
        '在"更多"菜单中新增赞助页面，如果Welight帮到了你，那么不妨请我喝杯咖啡吧'
      ]
    }
  },
  {
    version: '2.4.0',
    date: '2025-09-03',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      improvements: [
        '优化"转换"功能，在划词菜单中也集成转换功能，用户可以只转换选中部分的内容，避免在文本内容过长的情况下一次性转换出现超时等异常情况',
        '移除图片上传配置中尚未完全实现的其他云存储服务商，只保留七牛云，并且优化消息提示体验',
        '修复和优化AI免费额度体验功能，一共10元的共享密钥额度，每台设备限200次请求，先到先得，用完为止'
      ],
      features: [
        '新增图片重新上传机制，在粘贴的图片上传失败后，提供一个重新上传的入口，不需要重复粘贴进行重试',
        '新增本地AI模型Ollama的支持，支持llama3.2:3b等模型，提供隐私保护的本地AI处理能力',
        '新增15种主流编程语言高亮的支持以及35种其他语言的兼容性支持'
      ]
    }
  },
  {
    version: '2.3.3',
    date: '2025-09-02',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      fixes: ['调整开屏动画展示的时机，视觉上缩短应用打开时候的加载时间'],
      improvements: [
        '优化AI功能，增加文本长度限制，转换功能从之前的5000字限制改为理论上的无限制，统一增加AI模型的token长度，处理上文本内容更加得心应手',
        '优化转换功能，提供两种风格的转换支持：智能转换和简洁转换',
        '其他细节优化和调整'
      ],
      features: [
        '智能转换：在基于原文含义又尽可能不被曲解的情况下，采用更多markdown语法进行总结式的智能转换，转换后的markdown语法类型丰富，主题预览效果更体验更佳',
        '简洁转换：基于原文结构的保守转换风格，采用基础的markdown语法格式支持，保证转换符合markdown要求的同时也尽可能多的保留原文结构'
      ]
    }
  },
  {
    version: '2.3.2',
    date: '2025-09-01',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      fixes: ['修复2.3.1中"规范检查"功能丢失的问题'],
      features: ['新增应用开屏加载动画']
    }
  },
  {
    version: '2.3.1',
    date: '2025-09-01',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      fixes: ['修复图片粘贴自动上传之后无法显示的问题']
    }
  },
  {
    version: '2.3.0',
    date: '2025-09-01',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      fixes: ['优化无序列表、有序列表执行的问题', '优化转换功能，转换后自动执行规范检查'],
      features: [
        '新增语法规范检查，针对已知的公众号编辑器不兼容的语法使用进行检查定位',
        '检测到编辑器中粘贴了markdown文章时自动执行规范检查'
      ]
    }
  },
  {
    version: '2.2.2',
    date: '2025-08-31',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      improvements: [
        '优化"苹果简约"主题样式和用户体验',
        '优化"建国大业"主题样式和用户体验',
        '优化应用检测更新的环境检测问题'
      ]
    }
  },
  {
    version: '2.2.1',
    date: '2025-08-30',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      fixes: ['修复自动更新功能的相关问题', '优化应用更新检测机制', '解决更新过程中的稳定性问题']
    }
  },
  {
    version: '2.2.0',
    date: '2025-08-30',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
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
      fixes: ['解决颜色冲突导致菜单看不清的问题', '调整主题数量，优化主题管理']
    }
  },
  {
    version: '2.1.1',
    date: '2025-08-29',
    type: 'release',
    badge: '稳定版',
    badgeColor: 'blue',
    changes: {
      improvements: ['移除编辑区内容折叠功能，简化编辑器'],
      fixes: ['修复 Windows 版本构建失败的 BUG']
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
      improvements: ['应用启动速度优化', '内存使用效率提升', '用户界面体验优化', '编辑器性能提升'],
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
  return changelogData.find((item) => item.version === version)
}

// 获取所有发布版本（排除 alpha）
export const getReleaseVersions = () => {
  return changelogData.filter((item) => item.type !== 'alpha')
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
