# 下载统计API集成文档

## 概述

本项目已集成后端下载统计API，实现真实的下载量统计功能。系统会自动记录每次下载并从后端获取统计数据。

## API接口

### 1. 记录下载
```javascript
// 记录下载（自动检测平台）
fetch('https://ilikexff.cn/api/download-stats/record', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'referer=https://waer.ltd/download'
});
```

### 2. 获取统计数据
```javascript
// 获取统计数据
fetch('https://ilikexff.cn/api/download-stats/stats')
    .then(res => res.json())
    .then(data => console.log(data.data));
```

## 集成实现

### 服务层 (`src/services/downloadStats.js`)

提供了完整的下载统计服务：

- `recordDownload(referer)` - 记录下载事件
- `getDownloadStats()` - 获取统计数据
- `handleDownload(platform, url, callback)` - 处理下载流程
- `initializeDownloadStats()` - 初始化统计数据
- `startStatsSync(callback, interval)` - 定期同步统计数据

### 组件集成

#### 首页 (`src/views/Home.vue`)
- 显示总下载量
- 集成下载按钮点击统计
- 自动同步后端数据

#### 下载页面 (`src/views/Download.vue`)
- 详细的分平台下载统计
- 实时更新下载数据
- 支持多种下载格式

## 功能特性

### 1. 自动平台检测
后端API会自动检测用户的操作系统平台，无需前端指定。

### 2. 实时统计
- 每次下载都会立即记录到后端
- 前端定期（5分钟）同步最新数据
- 本地缓存确保即时反馈

### 3. 错误处理
- 网络错误时使用本地缓存数据
- 优雅降级，不影响下载功能
- 详细的错误日志记录

### 4. 数据映射
后端返回的平台数据会映射到前端的具体版本：
- Windows → windows-installer (70%) + windows-msi (30%)
- macOS → macos-apple (90%) + macos-intel (10%)
- Linux → linux-appimage (60%) + linux-deb (40%)

## 开发调试

### 测试组件
在开发模式下，首页右下角会显示API测试组件，可以：
- 测试记录下载功能
- 获取当前统计数据
- 查看API响应结果

### 控制台日志
系统会在控制台输出详细的统计信息：
```javascript
console.log('下载统计数据初始化完成:', stats)
console.log('下载记录成功')
console.log('获取统计数据成功:', result.data)
```

## 使用示例

### 基本用法
```javascript
import { handleDownload, initializeDownloadStats } from '@/services/downloadStats'

// 初始化统计数据
const stats = await initializeDownloadStats()

// 处理下载
await handleDownload('windows-installer', 'https://example.com/app.exe', (platform) => {
  // 更新本地统计的回调
  localStats[platform]++
})
```

### 同步数据
```javascript
import { startStatsSync } from '@/services/downloadStats'

// 启动定期同步
const cleanup = startStatsSync((newStats) => {
  // 更新UI显示
  downloadStats.value = newStats
}, 5 * 60 * 1000) // 5分钟同步一次

// 组件卸载时清理
onUnmounted(() => {
  cleanup()
})
```

## 注意事项

1. **网络依赖**: 统计功能依赖网络连接，离线时会使用本地缓存
2. **跨域**: API已配置CORS，支持跨域请求
3. **性能**: 统计请求是异步的，不会阻塞下载流程
4. **隐私**: 只记录下载事件和来源页面，不收集用户个人信息

## 故障排除

### 常见问题

1. **统计数据不更新**
   - 检查网络连接
   - 查看控制台错误信息
   - 确认API服务状态

2. **下载记录失败**
   - 检查referer参数格式
   - 确认API接口可访问性
   - 查看网络请求状态

3. **数据同步延迟**
   - 后端数据更新可能有延迟
   - 前端每5分钟同步一次
   - 可手动刷新页面获取最新数据

### 调试命令

```javascript
// 手动测试API
import { recordDownload, getDownloadStats } from '@/services/downloadStats'

// 测试记录下载
await recordDownload('https://waer.ltd/test')

// 测试获取统计
const stats = await getDownloadStats()
console.log(stats)
```
