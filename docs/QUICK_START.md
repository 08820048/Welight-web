# 服务状态检测功能 - 快速开始

## 🚀 快速开始

### 1. 功能已自动启用

服务状态检测功能已经集成到定价页面，无需额外配置即可使用。

### 2. 验证功能

访问定价页面：
```
http://localhost:5173/pricing
```

或访问测试页面：
```
http://localhost:5173/src/tests/service-status-test.html
```

### 3. 查看效果

#### 正常状态
- ✅ 无状态横幅
- ✅ 所有购买按钮显示"立即购买"
- ✅ 按钮可点击

#### 维护状态
- ⚠️ 页面顶部显示黄色状态横幅
- ⚠️ 所有购买按钮显示"维护中"
- ⚠️ 按钮禁用，变为灰色

#### 故障状态
- ❌ 页面顶部显示红色状态横幅
- ❌ 所有购买按钮显示"服务故障"
- ❌ 按钮禁用，变为灰色

## 🔧 后端接口要求

### 接口地址
```
GET https://ilikexff.cn/api/service-status
```

### 响应格式

**正常状态示例**
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "statusCode": "NORMAL",
    "statusName": "服务正常",
    "statusDescription": "所有功能正常运行",
    "message": "系统运行正常",
    "estimatedRecoveryTime": null,
    "lastUpdated": "2025-10-15T10:30:00",
    "available": true
  },
  "timestamp": 1760261544322
}
```

**维护状态示例**
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "statusCode": "MAINTENANCE",
    "statusName": "维护中",
    "statusDescription": "系统正在维护，部分功能可能受影响",
    "message": "系统正在进行例行维护，预计30分钟后恢复",
    "estimatedRecoveryTime": "2025-10-15T11:00:00",
    "lastUpdated": "2025-10-15T10:30:00",
    "available": false
  },
  "timestamp": 1760261544322
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| statusCode | string | ✅ | 状态码：NORMAL/MAINTENANCE/FAULT/DEGRADED |
| statusName | string | ✅ | 状态名称 |
| statusDescription | string | ✅ | 状态描述 |
| message | string | ✅ | 详细消息 |
| estimatedRecoveryTime | string/null | ❌ | 预计恢复时间（ISO格式） |
| lastUpdated | string/null | ❌ | 最后更新时间（ISO格式） |
| available | boolean | ✅ | 服务是否可用 |

## 📊 状态码说明

| 状态码 | 说明 | available | 按钮文本 | 横幅颜色 |
|--------|------|-----------|----------|----------|
| NORMAL | 服务正常 | true | 立即购买 | 无 |
| MAINTENANCE | 维护中 | false | 维护中 | 黄色 |
| FAULT | 故障 | false | 服务故障 | 红色 |
| DEGRADED | 降级服务 | true | 立即购买 | 黄色 |

## 🧪 本地测试

### 方法1：使用测试页面
```bash
# 启动开发服务器
npm run dev

# 访问测试页面
open http://localhost:5173/src/tests/service-status-test.html
```

### 方法2：模拟不同状态

编辑 `src/services/serviceStatusService.js`，修改 `getDefaultNormalStatus()` 函数：

```javascript
// 模拟维护状态
function getDefaultNormalStatus() {
  return {
    statusCode: 'MAINTENANCE',
    statusName: '维护中',
    statusDescription: '系统正在维护',
    message: '系统正在进行例行维护，预计30分钟后恢复',
    estimatedRecoveryTime: '2025-10-15T11:00:00',
    lastUpdated: new Date().toISOString(),
    available: false
  }
}
```

然后刷新页面查看效果。

### 方法3：使用浏览器开发工具

1. 打开浏览器开发者工具（F12）
2. 切换到 Network 标签
3. 找到 `service-status` 请求
4. 右键 → Block request URL
5. 刷新页面，将使用默认正常状态

## 🎯 功能验证清单

- [ ] 页面加载时自动检查服务状态
- [ ] 服务正常时，按钮可用
- [ ] 服务维护时，按钮禁用且显示"维护中"
- [ ] 服务故障时，按钮禁用且显示"服务故障"
- [ ] 状态横幅正确显示（颜色、图标、文字）
- [ ] 预计恢复时间正确显示
- [ ] 鼠标悬停按钮时显示详细提示
- [ ] 每5分钟自动检查一次
- [ ] 接口失败时降级为正常状态

## 🔍 调试技巧

### 查看当前状态
打开浏览器控制台，输入：
```javascript
// 查看当前服务状态
console.log('当前服务状态:', serviceStatus)
```

### 手动刷新状态
在测试页面点击"刷新状态"按钮

### 查看网络请求
1. 打开开发者工具 → Network
2. 筛选 XHR/Fetch
3. 查找 `service-status` 请求
4. 检查响应数据

## ⚙️ 配置选项

### 修改检查间隔

编辑 `src/views/Pricing.vue`，找到 `initServiceStatus()` 函数：

```javascript
statusMonitor = createServiceStatusMonitor((newStatus) => {
  // ...
}, 5 * 60 * 1000)  // 改为 3 * 60 * 1000 表示3分钟检查一次
```

### 修改API地址

编辑 `src/services/serviceStatusService.js`：

```javascript
const API_BASE_URL = 'https://your-api-domain.com/api'
```

## 📱 移动端适配

功能已自动适配移动端：
- ✅ 状态横幅响应式布局
- ✅ 按钮文字自动换行
- ✅ Touch 友好的交互

## 🐛 常见问题

### Q1: 按钮一直显示"维护中"
**A**: 检查后端接口是否正常返回数据，或查看浏览器控制台是否有错误

### Q2: 状态横幅不显示
**A**: 只有当 `available: false` 时才显示横幅，检查接口返回的 `available` 字段

### Q3: 状态更新不及时
**A**: 默认5分钟检查一次，可以刷新页面立即获取最新状态

### Q4: 接口调用失败
**A**: 功能设计为容错优先，接口失败时会使用默认正常状态，不影响用户使用

## 📞 技术支持

如有问题，请：
1. 查看浏览器控制台错误信息
2. 检查网络请求是否正常
3. 查看 `docs/service-status-feature.md` 详细文档
4. 联系开发团队

## 🎉 完成

功能已经可以正常使用！后端只需要实现 `/service-status` 接口即可。

