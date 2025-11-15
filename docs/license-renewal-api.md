# 许可证续费接口文档

## 概述

许可证续费功能允许用户在许可证到期前或到期后延长许可证的有效期，续费后许可证密钥保持不变，无需重新激活设备。

## 接口信息

### 许可证续费

**接口地址：** `POST /api/licenses/renew`

**接口描述：** 为已有许可证创建续费订单，用户支付成功后自动延长许可证有效期

**请求头：**
```
Content-Type: application/json
```

**请求参数：**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| licenseKey | String | 是 | 许可证密钥 | "APEX-XXXX-XXXX-XXXX-XXXX" |
| customerEmail | String | 是 | 客户邮箱（必须与许可证绑定的邮箱一致） | "user@example.com" |
| renewYears | Integer | 是 | 续费年数（1-5年） | 1 |
| paymentMethod | String | 是 | 支付方式（WECHAT_NATIVE/ALIPAY） | "WECHAT_NATIVE" |
| remark | String | 否 | 备注信息 | "续费备注" |
| customAmount | BigDecimal | 否 | 自定义金额（管理员使用，普通用户不传） | null |

**请求示例：**

```json
{
  "licenseKey": "APEX-1234-5678-9ABC-DEF0",
  "customerEmail": "user@example.com",
  "renewYears": 1,
  "paymentMethod": "WECHAT_NATIVE",
  "remark": "续费1年"
}
```

**响应参数：**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | Integer | 响应码（200=成功） |
| message | String | 响应消息 |
| data | Object | 响应数据 |
| data.order | Object | 订单信息 |
| data.order.orderNo | String | 订单号 |
| data.order.productName | String | 产品名称 |
| data.order.amount | BigDecimal | 订单金额 |
| data.order.status | String | 订单状态 |
| data.order.qrCode | String | 支付二维码（Base64） |
| data.order.paymentUrl | String | 支付链接 |
| data.license | Object | 许可证信息 |
| data.license.licenseKey | String | 许可证密钥 |
| data.license.productCode | String | 产品代码 |
| data.license.status | String | 许可证状态 |
| data.license.expiredAt | String | 当前过期时间 |
| data.originalExpiredAt | String | 原过期时间 |
| data.newExpiredAt | String | 新过期时间（支付成功后） |
| data.renewYears | Integer | 续费年数 |
| data.qrCode | String | 支付二维码（Base64） |
| data.paymentUrl | String | 支付链接 |
| data.message | String | 提示信息 |

**成功响应示例：**

```json
{
  "code": 200,
  "message": "续费订单创建成功，请完成支付",
  "data": {
    "order": {
      "id": 123,
      "orderNo": "ORD20250115123456789ABC",
      "productName": "Apex Blog Pro - 续费1年",
      "amount": 299.00,
      "status": "PENDING",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
      "paymentUrl": "weixin://wxpay/bizpayurl?pr=xxxxx",
      "customerEmail": "user@example.com",
      "createdAt": "2025-01-15T12:34:56"
    },
    "license": {
      "licenseKey": "APEX-1234-5678-9ABC-DEF0",
      "productCode": "APEX_BLOG_PRO",
      "status": "ACTIVE",
      "expiredAt": "2025-12-31T23:59:59",
      "maxActivations": 3,
      "currentActivations": 2
    },
    "originalExpiredAt": "2025-12-31T23:59:59",
    "newExpiredAt": null,
    "renewYears": 1,
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
    "paymentUrl": "weixin://wxpay/bizpayurl?pr=xxxxx",
    "message": "续费订单创建成功，请完成支付"
  }
}
```

**错误响应示例：**

```json
{
  "code": 400,
  "message": "许可证不存在",
  "data": null
}
```

```json
{
  "code": 400,
  "message": "邮箱与许可证不匹配",
  "data": null
}
```

```json
{
  "code": 400,
  "message": "许可证已被撤销，无法续费",
  "data": null
}
```

## 业务流程

### 1. 续费流程图

```
用户查看许可证 → 点击续费按钮 → 选择续费年数 → 调用续费接口
    ↓
创建续费订单 → 显示支付二维码 → 用户扫码支付
    ↓
支付成功回调 → 延长许可证有效期 → 发送续费成功邮件
    ↓
许可证自动生效（无需重新激活设备）
```

### 2. 续费规则

- **续费时机**：
  - ✅ 许可证未过期：从当前过期时间延长
  - ✅ 许可证已过期：从续费时间开始计算
  
- **续费年限**：支持 1-5 年

- **许可证状态**：
  - ✅ ACTIVE（激活）：可以续费
  - ✅ EXPIRED（过期）：可以续费
  - ✅ SUSPENDED（暂停）：可以续费
  - ❌ REVOKED（撤销）：不能续费

- **续费后**：
  - 许可证密钥保持不变
  - 已激活的设备无需重新激活
  - 过期或暂停状态自动恢复为激活状态

### 3. 前端实现建议

#### 3.1 续费按钮显示逻辑

```javascript
// 判断是否显示续费按钮
function shouldShowRenewButton(license) {
  // 已撤销的许可证不显示续费按钮
  if (license.status === 'REVOKED') {
    return false;
  }
  
  // 其他状态都可以续费
  return true;
}

// 判断是否需要提醒续费
function shouldRemindRenewal(license) {
  if (!license.expiredAt) {
    return false; // 永久许可证不提醒
  }
  
  const expiredDate = new Date(license.expiredAt);
  const now = new Date();
  const daysLeft = Math.ceil((expiredDate - now) / (1000 * 60 * 60 * 24));
  
  // 距离过期30天内提醒
  return daysLeft <= 30;
}
```

#### 3.2 调用续费接口

```javascript
async function renewLicense(licenseKey, customerEmail, renewYears) {
  try {
    const response = await fetch('/api/licenses/renew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        licenseKey: licenseKey,
        customerEmail: customerEmail,
        renewYears: renewYears,
        paymentMethod: 'WECHAT_NATIVE'
      })
    });
    
    const result = await response.json();
    
    if (result.code === 200) {
      // 显示支付二维码
      showPaymentQRCode(result.data.qrCode, result.data.order.orderNo);
      
      // 开始轮询订单状态
      pollOrderStatus(result.data.order.orderNo);
    } else {
      // 显示错误信息
      showError(result.message);
    }
  } catch (error) {
    console.error('续费失败:', error);
    showError('网络错误，请稍后重试');
  }
}
```

#### 3.3 轮询订单状态

```javascript
async function pollOrderStatus(orderNo) {
  const maxAttempts = 60; // 最多轮询60次（5分钟）
  let attempts = 0;
  
  const interval = setInterval(async () => {
    attempts++;
    
    try {
      const response = await fetch(`/api/payment/orders/${orderNo}`);
      const result = await response.json();
      
      if (result.data.status === 'PAID') {
        // 支付成功
        clearInterval(interval);
        showSuccess('续费成功！许可证有效期已延长');
        
        // 刷新许可证信息
        refreshLicenseInfo();
      } else if (result.data.status === 'EXPIRED' || result.data.status === 'CANCELLED') {
        // 订单过期或取消
        clearInterval(interval);
        showError('订单已过期或取消');
      } else if (attempts >= maxAttempts) {
        // 超时
        clearInterval(interval);
        showWarning('支付超时，请稍后查看订单状态');
      }
    } catch (error) {
      console.error('查询订单状态失败:', error);
    }
  }, 5000); // 每5秒查询一次
}
```

## 注意事项

1. **邮箱验证**：续费时必须使用许可证绑定的邮箱，否则会返回错误
2. **订单有效期**：续费订单创建后30分钟内有效，超时自动关闭
3. **重复续费**：同一许可证可以多次续费，每次续费都会延长有效期
4. **支付方式**：目前支持微信支付（WECHAT_NATIVE）和支付宝（ALIPAY）
5. **自动生效**：支付成功后许可证自动延长有效期，无需手动操作
6. **设备激活**：续费不影响已激活的设备，无需重新激活

## 相关接口

- **查询许可证信息**：`GET /api/licenses/{licenseKey}`
- **查询订单状态**：`GET /api/payment/orders/{orderNo}`
- **查询用户所有许可证**：`GET /api/licenses?customerEmail={email}`

## 测试建议

1. **正常续费**：使用有效许可证和正确邮箱测试续费流程
2. **邮箱不匹配**：使用错误邮箱测试，应返回错误
3. **已撤销许可证**：测试已撤销的许可证，应返回错误
4. **过期许可证**：测试过期许可证续费，验证从当前时间开始计算
5. **多年续费**：测试续费2-5年，验证金额计算正确

## 更新日志

- **2025-01-15**：初始版本，支持许可证续费功能

