# 最近购买数据接口文档

## 接口概述

提供最近购买数据的查询接口，用于前端官网展示最近的许可证和积分套餐购买记录，实现滚动展示效果。

## 接口信息

### 获取最近购买记录

**接口地址**: `GET /payment/recent-purchases`

**接口说明**: 获取最近的许可证和积分套餐购买记录，用于前端官网滚动展示

**鉴权要求**: 无需认证（公开接口）

**请求参数**:

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| limit | Integer | 否 | 3 | 返回记录数量，最小1条，最大10条 |

**请求示例**:

```bash
# 获取默认3条记录
curl -X GET "https://ilikexff.cn/payment/recent-purchases"

# 获取5条记录
curl -X GET "https://ilikexff.cn/payment/recent-purchases?limit=5"
```

**响应示例**:

```json
{
  "success": true,
  "message": "查询成功",
  "data": [
    {
      "purchaseType": "NEW_PURCHASE",
      "purchaseTypeDescription": "新购许可证",
      "productName": "Apex Blog 专业版许可证",
      "amount": 99.00,
      "currency": "CNY",
      "customerName": "张***",
      "purchaseTime": "2025-11-20T10:30:00",
      "relativeTime": "5分钟前"
    },
    {
      "purchaseType": "CREDIT_PURCHASE",
      "purchaseTypeDescription": "积分购买",
      "productName": "1000积分套餐",
      "amount": 50.00,
      "currency": "CNY",
      "customerName": "李***",
      "purchaseTime": "2025-11-20T09:15:00",
      "relativeTime": "1小时前"
    },
    {
      "purchaseType": "RENEWAL",
      "purchaseTypeDescription": "续费许可证",
      "productName": "Apex Blog 专业版许可证",
      "amount": 99.00,
      "currency": "CNY",
      "customerName": "王***",
      "purchaseTime": "2025-11-19T18:20:00",
      "relativeTime": "16小时前"
    }
  ]
}
```

## 响应字段说明

| 字段名 | 类型 | 说明 |
|--------|------|------|
| purchaseType | String | 购买类型：NEW_PURCHASE（新购）、RENEWAL（续费）、CREDIT_PURCHASE（积分购买） |
| purchaseTypeDescription | String | 购买类型中文描述 |
| productName | String | 产品名称 |
| amount | BigDecimal | 购买金额 |
| currency | String | 货币类型，默认 CNY |
| customerName | String | 客户名称（已脱敏处理） |
| purchaseTime | DateTime | 购买时间（ISO 8601 格式） |
| relativeTime | String | 相对时间描述（如：刚刚、5分钟前、1小时前、3天前） |

## 数据说明

### 包含的订单类型

- ✅ **NEW_PURCHASE** - 新购许可证
- ✅ **RENEWAL** - 续费许可证
- ✅ **CREDIT_PURCHASE** - 积分购买
- ❌ **MONTHLY_CARD** - 月卡购买（暂不包含）

### 数据筛选规则

1. 只返回**已支付**（PAID）状态的订单
2. 按**支付时间**（paidAt）倒序排序
3. 默认返回最近 **3条** 记录
4. 最多可返回 **10条** 记录

### 隐私保护

为保护用户隐私，客户名称已进行脱敏处理：

- **有客户名称**：显示姓氏 + `***`（如：`张***`）
- **无客户名称**：使用邮箱前缀脱敏（如：`abc***@example.com`）
- **无任何信息**：显示 `匿名用户`

## 前端使用示例

### JavaScript/TypeScript

```typescript
// 获取最近购买记录
async function getRecentPurchases(limit = 3) {
  try {
    const response = await fetch(
      `https://ilikexff.cn/payment/recent-purchases?limit=${limit}`
    );
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      console.error('获取失败:', result.message);
      return [];
    }
  } catch (error) {
    console.error('请求失败:', error);
    return [];
  }
}

// 使用示例
const purchases = await getRecentPurchases(5);
console.log('最近购买记录:', purchases);
```

### React 示例

```jsx
import { useEffect, useState } from 'react';

function RecentPurchases() {
  const [purchases, setPurchases] = useState([]);
  
  useEffect(() => {
    fetch('https://ilikexff.cn/payment/recent-purchases?limit=3')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setPurchases(result.data);
        }
      })
      .catch(err => console.error(err));
  }, []);
  
  return (
    <div className="recent-purchases">
      <h3>最近购买</h3>
      <ul>
        {purchases.map((item, index) => (
          <li key={index}>
            <span>{item.customerName}</span>
            <span>购买了 {item.productName}</span>
            <span>{item.relativeTime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 错误处理

### 错误响应示例

```json
{
  "success": false,
  "message": "查询失败: 数据库连接异常",
  "data": null
}
```

### 常见错误

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| 查询失败 | 服务器内部错误 | 稍后重试或联系技术支持 |
| 参数错误 | limit 参数超出范围 | 确保 limit 在 1-10 之间 |

## 注意事项

1. ⚠️ 该接口为**公开接口**，无需认证即可访问
2. ⚠️ 数据已进行**隐私脱敏**处理，不会泄露用户敏感信息
3. ⚠️ 建议前端实现**缓存机制**，避免频繁请求
4. ⚠️ 相对时间描述会根据当前时间动态计算
5. ⚠️ 如果没有购买记录，返回空数组 `[]`

## 更新日志

- **2025-11-20**: 初始版本发布
  - 支持查询最近购买记录
  - 支持许可证和积分套餐购买
  - 实现客户名称脱敏
  - 实现相对时间描述

