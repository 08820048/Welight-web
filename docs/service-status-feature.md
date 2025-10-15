# 服务状态动态检测功能

## 功能概述

该功能实现了基于后端服务状态的动态购买控制，当服务处于非正常状态时，自动禁用定价页面的所有购买按钮，并显示相应的服务状态信息。

## 功能特性

### 1. 服务状态检测
- 自动调用后端 `/service-status` 接口获取服务状态
- 支持四种服务状态：
  - `NORMAL` - 服务正常
  - `MAINTENANCE` - 维护中
  - `FAULT` - 故障
  - `DEGRADED` - 降级服务

### 2. 动态按钮控制
- 服务正常时：按钮显示"立即购买"，可点击
- 服务异常时：按钮显示服务状态（如"维护中"、"服务故障"），禁用点击

### 3. 状态提示横幅
- 当服务不可用时，页面顶部显示醒目的状态提示横幅
- 不同状态使用不同颜色：
  - 维护中/降级服务：黄色
  - 故障：红色
- 显示详细的状态信息和预计恢复时间

### 4. 实时监控
- 每5分钟自动检查一次服务状态
- 状态变化时自动更新UI
- 服务变为不可用时显示Toast提示

### 5. 容错机制
- 接口调用失败时，默认返回正常状态，确保用户体验不受影响
- 即使后端异常，也不会阻止用户访问页面

## 技术实现

### 文件结构

```
src/
├── services/
│   └── serviceStatusService.js    # 服务状态管理服务
├── views/
│   └── Pricing.vue                # 定价页面（已集成）
└── tests/
    └── service-status-test.html   # 功能测试页面
```

### 核心API

#### `getServiceStatus()`
获取当前服务状态

```javascript
const status = await getServiceStatus()
// 返回: { statusCode, statusName, message, available, ... }
```

#### `isServiceAvailable(status)`
检查服务是否可用

```javascript
const canPurchase = isServiceAvailable(status)
// 返回: true/false
```

#### `getStatusDisplayText(status)`
获取按钮显示文本

```javascript
const buttonText = getStatusDisplayText(status)
// 返回: "立即购买" 或 "维护中" 等
```

#### `createServiceStatusMonitor(callback, interval)`
创建状态监控器

```javascript
const monitor = createServiceStatusMonitor((newStatus) => {
  console.log('状态更新:', newStatus)
}, 5 * 60 * 1000)

await monitor.start()  // 启动监控
monitor.stop()         // 停止监控
```

## 使用示例

### 在 Vue 组件中使用

```vue
<template>
  <div>
    <!-- 状态横幅 -->
    <div v-if="!isServiceAvailable" class="alert">
      {{ serviceStatus.message }}
    </div>
    
    <!-- 购买按钮 -->
    <button 
      :disabled="!isServiceAvailable"
      @click="handlePurchase">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  getServiceStatus, 
  isServiceAvailable as checkAvailable,
  getStatusDisplayText,
  createServiceStatusMonitor 
} from '@/services/serviceStatusService'

const serviceStatus = ref(null)
let monitor = null

const isServiceAvailable = computed(() => 
  checkAvailable(serviceStatus.value)
)

const buttonText = computed(() => 
  getStatusDisplayText(serviceStatus.value)
)

onMounted(async () => {
  // 获取初始状态
  serviceStatus.value = await getServiceStatus()
  
  // 启动监控
  monitor = createServiceStatusMonitor((newStatus) => {
    serviceStatus.value = newStatus
  })
  await monitor.start()
})

onUnmounted(() => {
  if (monitor) {
    monitor.stop()
  }
})
</script>
```

## 后端接口规范

### 请求
```
GET /service-status
```

### 响应格式

**正常状态**
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
  }
}
```

**维护状态**
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
  }
}
```

## 测试

### 本地测试
打开测试页面：
```
http://localhost:5173/src/tests/service-status-test.html
```

### 功能验证清单
- [ ] 服务正常时，按钮可点击，显示"立即购买"
- [ ] 服务维护时，按钮禁用，显示"维护中"
- [ ] 服务故障时，按钮禁用，显示"服务故障"
- [ ] 状态横幅正确显示
- [ ] 预计恢复时间正确显示
- [ ] 状态监控正常工作
- [ ] 接口失败时降级为正常状态

## 配置选项

### 监控间隔
默认5分钟检查一次，可在 `Pricing.vue` 中修改：

```javascript
statusMonitor = createServiceStatusMonitor(
  callback, 
  5 * 60 * 1000  // 修改此值调整检查间隔
)
```

### API地址
在 `serviceStatusService.js` 中配置：

```javascript
const API_BASE_URL = 'https://ilikexff.cn/api'
```

## 注意事项

1. **容错优先**：即使接口失败，也不应阻止用户访问页面
2. **用户体验**：状态变化时应有明显的视觉反馈
3. **性能考虑**：避免过于频繁的状态检查
4. **缓存策略**：可考虑添加本地缓存减少请求

## 未来优化

- [ ] 添加 WebSocket 支持实时推送状态变化
- [ ] 支持更细粒度的功能控制（如只禁用特定产品）
- [ ] 添加状态历史记录
- [ ] 支持自定义状态类型
- [ ] 添加状态变化通知（邮件/短信）

