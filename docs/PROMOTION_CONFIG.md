# 活动配置说明文档

## 概述

活动展示功能允许在网站顶部菜单中动态添加促销活动入口，用户点击后会展开一个精美的活动条幅，展示活动详情。

## 文件结构

```
src/
├── data/
│   └── promotions.js          # 活动配置文件
├── components/
│   ├── Header.vue             # 导航栏组件（已集成活动菜单）
│   └── PromotionBanner.vue    # 活动条幅组件
```

## 配置活动

### 1. 编辑活动配置文件

打开 `src/data/promotions.js`，在 `promotions` 数组中添加或修改活动配置：

```javascript
export const promotions = [
  {
    id: 'double-11-2025', // 活动唯一ID
    name: '双十一', // 菜单中显示的名称
    displayName: '双十一特惠', // 活动完整名称
    enabled: true, // 是否启用该活动
    preheatStartDate: '2025-10-14', // 预热开始日期（菜单开始显示）
    activityStartDate: '2025-10-20', // 活动正式开始日期
    endDate: '2025-11-14', // 活动结束日期
    showInMenu: true, // 是否在菜单中显示
    menuBadge: '🔥', // 菜单徽章图标（可选）
    menuBadgeText: 'HOT', // 菜单徽章文字（可选）
    banner: {
      title: '🎉 双十一特惠活动', // 条幅标题
      subtitle: '限时优惠，错过再等一年！', // 条幅副标题
      bgGradient: 'from-red-500 via-orange-500 to-yellow-500', // 背景渐变色
      content: `...` // 条幅内容（HTML）
    }
  }
]
```

### 2. 配置项说明

#### 基础配置

| 字段                | 类型    | 必填 | 说明                                           |
| ------------------- | ------- | ---- | ---------------------------------------------- |
| `id`                | String  | ✅   | 活动唯一标识符                                 |
| `name`              | String  | ✅   | 菜单中显示的简短名称                           |
| `displayName`       | String  | ✅   | 活动完整名称                                   |
| `enabled`           | Boolean | ✅   | 是否启用该活动                                 |
| `preheatStartDate`  | String  | ✅   | 预热开始日期（菜单开始显示，格式：YYYY-MM-DD） |
| `activityStartDate` | String  | ✅   | 活动正式开始日期（格式：YYYY-MM-DD）           |
| `endDate`           | String  | ✅   | 活动结束日期（格式：YYYY-MM-DD）               |
| `showInMenu`        | Boolean | ✅   | 是否在菜单中显示                               |
| `menuBadge`         | String  | ❌   | 菜单徽章图标（如：🔥、⚡、🎁）                 |
| `menuBadgeText`     | String  | ❌   | 菜单徽章文字（如：HOT、NEW）                   |

#### 条幅配置 (banner)

| 字段         | 类型   | 必填 | 说明                  |
| ------------ | ------ | ---- | --------------------- |
| `title`      | String | ✅   | 条幅主标题            |
| `subtitle`   | String | ❌   | 条幅副标题            |
| `bgGradient` | String | ✅   | Tailwind CSS 渐变类名 |
| `content`    | String | ✅   | 条幅内容（支持 HTML） |

### 3. 背景渐变色选项

使用 Tailwind CSS 渐变类名：

```javascript
// 红橙黄渐变（热烈）
bgGradient: 'from-red-500 via-orange-500 to-yellow-500'

// 蓝紫渐变（科技）
bgGradient: 'from-blue-500 via-purple-500 to-pink-500'

// 绿色渐变（清新）
bgGradient: 'from-green-400 via-emerald-500 to-teal-600'

// 粉红渐变（浪漫）
bgGradient: 'from-pink-400 via-rose-500 to-red-500'
```

### 4. 条幅内容编写

条幅内容支持完整的 HTML，建议使用以下结构：

```html
<div class="space-y-6">
  <!-- 活动时间 -->
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
    <h3 class="text-lg font-bold text-white mb-2">活动时间</h3>
    <p class="text-white/90 text-sm">2025年11月1日 - 11月11日</p>
  </div>

  <!-- 活动内容网格 -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
      <h4 class="text-white font-bold mb-1">优惠标题</h4>
      <p class="text-white/90 text-sm">优惠描述</p>
    </div>
  </div>

  <!-- CTA按钮 -->
  <div class="flex gap-3 justify-center">
    <a href="/pricing" class="px-6 py-3 bg-white text-orange-600 rounded-lg font-bold">
      立即抢购
    </a>
  </div>
</div>
```

## 使用示例

### 示例1：双十一活动

```javascript
{
  id: 'double-11-2025',
  name: '双十一',
  displayName: '双十一特惠',
  enabled: true,
  preheatStartDate: '2025-10-14',  // 10月14日开始预热
  activityStartDate: '2025-10-20', // 10月20日活动正式开始
  endDate: '2025-11-14',           // 11月14日活动结束
  showInMenu: true,
  menuBadge: '🔥',
  menuBadgeText: 'HOT',
  banner: {
    title: '🎉 双十一特惠活动',
    subtitle: '限时优惠，错过再等一年！',
    bgGradient: 'from-red-500 via-orange-500 to-yellow-500',
    content: `...` // 见配置文件中的完整示例
  }
}
```

### 示例2：新年活动

```javascript
{
  id: 'new-year-2026',
  name: '新年',
  displayName: '新年特惠',
  enabled: true,
  preheatStartDate: '2025-12-25',  // 圣诞节开始预热
  activityStartDate: '2026-01-01', // 元旦活动正式开始
  endDate: '2026-01-07',           // 1月7日活动结束
  showInMenu: true,
  menuBadge: '🎊',
  menuBadgeText: 'NEW',
  banner: {
    title: '🎊 新年特惠活动',
    subtitle: '新年新气象，优惠享不停！',
    bgGradient: 'from-pink-400 via-rose-500 to-red-500',
    content: `
      <div class="space-y-6">
        <!-- 自定义内容 -->
      </div>
    `
  }
}
```

## 工具函数

### getActivePromotions()

获取当前激活的活动列表（在有效期内且已启用）。

```javascript
import { getActivePromotions } from '@/data/promotions.js'

const activePromotions = getActivePromotions()
```

### getMenuPromotions()

获取应该在菜单中显示的活动列表。

```javascript
import { getMenuPromotions } from '@/data/promotions.js'

const menuPromotions = getMenuPromotions()
```

### getPromotionById(id)

根据ID获取特定活动。

```javascript
import { getPromotionById } from '@/data/promotions.js'

const promotion = getPromotionById('double-11-2025')
```

## 智能倒计时功能

活动条幅会根据当前时间自动显示不同的倒计时：

### 倒计时阶段

#### 1. **预热期**（当前时间 < 活动开始时间）

- 显示：🎊 距离活动开始还有
- 颜色：蓝色主题
- 倒计时目标：`activityStartDate`（活动开始时间）
- 背景：蓝紫渐变

#### 2. **活动期**（活动开始时间 ≤ 当前时间 ≤ 活动结束时间）

- 显示：🔥 距离活动结束还有
- 颜色：红色主题
- 倒计时目标：`endDate`（活动结束时间）
- 背景：白色半透明

#### 3. **已结束**（当前时间 > 活动结束时间）

- 显示：活动已结束
- 颜色：灰色主题
- 倒计时停止

### 倒计时特点

- ✅ **自动切换**：从预热期自动切换到活动期
- ✅ **实时更新**：每秒刷新一次
- ✅ **精确计算**：精确到秒
- ✅ **智能管理**：自动启停，防止内存泄漏
- ✅ **视觉区分**：不同阶段使用不同颜色和图标

### 日期配置说明

```javascript
{
  preheatStartDate: '2025-10-14',  // 菜单开始显示，倒计时未开始
  activityStartDate: '2025-10-20', // 活动正式开始，预热期倒计时目标
  endDate: '2025-11-14',           // 活动结束，活动期倒计时目标
}
```

**时间线示例：**

```
10/14 ────────── 10/20 ────────────────── 11/14
  │                │                         │
预热开始        活动开始                  活动结束
  │                │                         │
  └─ 预热期 ──────┘─── 活动期 ─────────────┘
     (蓝色倒计时)        (红色倒计时)
```

## 注意事项

1. **日期格式**：必须使用 `YYYY-MM-DD` 格式
2. **日期顺序**：`preheatStartDate` ≤ `activityStartDate` ≤ `endDate`
3. **活动时间**：
   - `activityStartDate` 自动设置为当天 00:00:00
   - `endDate` 自动设置为当天 23:59:59
4. **多个活动**：可以同时配置多个活动，系统会自动显示所有在有效期内的活动
5. **禁用活动**：将 `enabled` 设置为 `false` 即可临时禁用活动
6. **HTML安全**：条幅内容支持HTML，请确保内容安全可信

## 常见问题

### Q: 如何临时关闭活动？

A: 将活动配置中的 `enabled` 设置为 `false`：

```javascript
{
  id: 'double-11-2025',
  enabled: false,  // 临时禁用
  // ...其他配置
}
```

### Q: 如何修改活动时间？

A: 直接修改相关日期字段：

```javascript
{
  id: 'double-11-2025',
  preheatStartDate: '2025-10-14',  // 修改预热开始日期
  activityStartDate: '2025-10-20', // 修改活动开始日期
  endDate: '2025-11-15',           // 修改活动结束日期
  // ...其他配置
}
```

### Q: 如何添加新活动？

A: 在 `promotions` 数组中添加新的活动对象：

```javascript
export const promotions = [
  // 现有活动
  { id: 'double-11-2025', ... },

  // 新活动
  {
    id: 'new-activity-2026',
    name: '新活动',
    // ...配置
  }
]
```

## 技术支持

如有问题，请联系开发团队或查看项目文档。
