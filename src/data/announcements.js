// 公告数据
export const announcementData = [
  {
    id: 'announcement-2025-11-11',
    title: '许可证定价调整通知',
    date: '2025-11-11',
    type: 'important',
    badge: '重要公告',
    badgeColor: 'red',
    content: `# 许可证定价调整通知

尊敬的 Welight 用户：

为了提供更好的 AI 服务和持续更新，我们将于 **2025年11月15日**（也就是双十一活动结束后）调整定价：

## 新价格

**¥49.99/年**（原 ¥14.99/永久）

## 老用户权益

已购买永久许可证的用户，将**永久保留所有功能**，无需额外付费。

---

感谢您的支持！

**Welight 开发者**
*2025年11月11日*`
  },
  {
    id: 'announcement-2025-09-15',
    title: 'Welight 更新频率调整',
    date: '2025-09-15',
    type: 'important',
    badge: '重要公告',
    badgeColor: 'red',
    content: `# Welight 更新频率调整

亲爱的 Welight 用户，感谢你们一直以来对 Welight 的喜爱与支持！我们致力于打造一个简单、智能、强大且免费的跨平台公众号排版桌面工具（支持 Windows、Mac 和 Linux）。

近期，使用的构建服务（GitHub Actions）的免费额度已用尽，继续使用将带来较高的费用。作为一个业余的独立开发者，应用本身是完全免费的，但是更新迭代需要的构建费用确实是一笔不小的开销，然而，应用内开启的 **赞助**功能，至今没有收到一分钱的赞助，这让我想起网络上那个"免费助人被骂廉价傻逼的段子。"，因此后续会大幅降低更新频率，感谢 B 站网友和其他用户的支持和理解。

![GitHub Actions 费用截图](https://images.waer.ltd/notes/202509152208460.png)

![赞助功能截图](https://images.waer.ltd/notes/202509152208325.png)

感谢你们的理解与陪伴！每一份支持都让我们更有动力，让 Welight 变得更好。期待与你一起打造更棒的体验！

**Welight 开发者**
*2025年9月15日*`
  }
]

// 格式化日期
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 获取徽章样式类
export const getBadgeClass = (color) => {
  const colorMap = {
    red: 'bg-red-100 text-red-800 border-red-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200'
  }
  return colorMap[color] || colorMap.gray
}

// 获取状态点样式类
export const getStatusDotClass = (type) => {
  const typeMap = {
    important: 'bg-red-500',
    info: 'bg-blue-500',
    update: 'bg-green-500',
    warning: 'bg-yellow-500'
  }
  return typeMap[type] || typeMap.info
}

// 获取最新公告
export const getLatestAnnouncement = () => {
  return announcementData[0]
}

// 根据ID获取公告
export const getAnnouncementById = (id) => {
  return announcementData.find((item) => item.id === id)
}

// 检查是否有新公告（用户未查看过的）
export const hasNewAnnouncements = () => {
  const lastViewedId = localStorage.getItem('welight_last_viewed_announcement')
  if (!lastViewedId) return true

  const latestAnnouncement = getLatestAnnouncement()
  return latestAnnouncement && latestAnnouncement.id !== lastViewedId
}

// 标记公告为已查看
export const markAnnouncementAsViewed = (announcementId) => {
  localStorage.setItem('welight_last_viewed_announcement', announcementId)
}

// 标记最新公告为已查看
export const markLatestAnnouncementAsViewed = () => {
  const latest = getLatestAnnouncement()
  if (latest) {
    markAnnouncementAsViewed(latest.id)
  }
}
