# EmailJS 邮件提醒功能配置指南

## 📧 功能说明

活动页面的"预约提醒"功能已集成 EmailJS，可以真实发送邮件通知。

## 🚀 快速开始

### 1. 注册 EmailJS 账号

访问 [EmailJS 官网](https://www.emailjs.com/) 注册免费账号。

**免费额度：**
- 每月 200 封邮件
- 无需信用卡
- 永久免费

### 2. 添加邮件服务

1. 登录后，点击左侧菜单 **Email Services**
2. 点击 **Add New Service**
3. 选择您的邮件服务商（推荐 Gmail）
4. 按照提示连接您的邮箱账号
5. 记录下 **Service ID**（例如：`service_abc123`）

**支持的邮件服务：**
- Gmail
- Outlook
- Yahoo
- 自定义 SMTP

### 3. 创建邮件模板

1. 点击左侧菜单 **Email Templates**
2. 点击 **Create New Template**
3. 填写模板内容：

#### 模板设置

**Template Name:** `promotion_reminder`

**Subject（邮件主题）:**
```
Welight {{promotion_name}} 活动提醒订阅成功
```

**Content（邮件内容）:**
```html
<p>您好！</p>

<p>感谢您订阅 <strong>Welight {{promotion_name}}</strong> 活动提醒！</p>

<p>我们会在活动开始时通过邮件通知您，请留意您的邮箱。</p>

<hr>

<p><strong>订阅信息：</strong></p>
<ul>
  <li>订阅邮箱：{{user_email}}</li>
  <li>订阅时间：{{subscribe_time}}</li>
  <li>活动ID：{{promotion_id}}</li>
</ul>

<p>{{message}}</p>

<hr>

<p>祝您使用愉快！</p>
<p><strong>Welight 团队</strong></p>
```

4. 点击 **Save** 保存模板
5. 记录下 **Template ID**（例如：`template_xyz789`）

#### 可用变量

模板中可以使用以下变量：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `{{user_email}}` | 用户输入的邮箱 | user@example.com |
| `{{promotion_name}}` | 活动名称 | Welight双十一特惠 |
| `{{promotion_id}}` | 活动ID | double-11-2025 |
| `{{subscribe_time}}` | 订阅时间 | 2025/10/14 15:30:00 |
| `{{message}}` | 自定义消息 | 用户订阅了活动开始提醒 |

### 4. 获取 Public Key

1. 点击左侧菜单 **Account**
2. 找到 **API Keys** 部分
3. 复制 **Public Key**（例如：`abcdefg123456`）

### 5. 配置项目

打开 `src/config/emailjs.config.js` 文件，替换为您的实际配置：

```javascript
export const emailJsConfig = {
  // 步骤4 获取的 Public Key
  publicKey: 'abcdefg123456',
  
  // 步骤2 获取的 Service ID
  serviceId: 'service_abc123',
  
  // 步骤3 获取的 Template ID
  templateId: 'template_xyz789'
}
```

### 6. 测试功能

1. 运行项目：`npm run dev`
2. 打开活动页面（点击"双十一"菜单）
3. 输入您的邮箱地址
4. 点击"预约提醒"按钮
5. 检查您的邮箱是否收到邮件

## 🔧 高级配置

### 自定义邮件模板

您可以根据需要自定义邮件模板的样式和内容：

#### 添加 Logo
```html
<img src="https://your-domain.com/logo.png" alt="Welight Logo" style="width: 150px;">
```

#### 添加按钮
```html
<a href="https://your-domain.com/pricing" 
   style="display: inline-block; padding: 12px 24px; background-color: #ff4444; color: white; text-decoration: none; border-radius: 8px;">
  立即查看活动
</a>
```

#### 添加样式
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <!-- 邮件内容 -->
</div>
```

### 发送给管理员

如果您想在用户订阅时也给自己发一封通知邮件：

1. 创建第二个模板（例如：`admin_notification`）
2. 在代码中添加第二次发送：

```javascript
// 发送给用户
await emailjs.send(serviceId, templateId, userParams)

// 发送给管理员
await emailjs.send(serviceId, 'admin_notification', {
  admin_email: 'admin@example.com',
  user_email: emailInput.value,
  ...
})
```

### 错误处理

代码已包含完整的错误处理：

- ✅ 邮箱格式验证
- ✅ EmailJS 配置检查
- ✅ 发送失败提示
- ✅ 降级为模拟提交（未配置时）

## 📊 监控和统计

### 查看发送记录

1. 登录 EmailJS
2. 点击 **Email History**
3. 查看所有发送记录、成功率、失败原因

### 配额管理

免费账号每月 200 封邮件，可以在 **Account** 页面查看使用情况。

如果需要更多配额，可以升级到付费计划：
- **Personal**: $15/月，1000 封邮件
- **Professional**: $35/月，5000 封邮件

## 🛡️ 安全建议

### 1. 保护 API Keys

虽然 Public Key 可以暴露在前端，但建议：

- ✅ 在 EmailJS 后台设置**域名白名单**
- ✅ 限制只有您的域名可以调用
- ✅ 定期更换 API Keys

### 2. 防止滥用

在 EmailJS 后台可以设置：

- **Rate Limiting**: 限制每个 IP 的发送频率
- **CAPTCHA**: 添加人机验证
- **Domain Whitelist**: 只允许特定域名调用

### 3. 数据隐私

- ✅ 不要在邮件中发送敏感信息
- ✅ 遵守 GDPR 等隐私法规
- ✅ 提供取消订阅选项

## ❓ 常见问题

### Q1: 邮件发送失败怎么办？

**检查清单：**
1. EmailJS 配置是否正确？
2. Service 是否已连接邮箱？
3. Template 是否已保存？
4. 是否超出免费配额？
5. 查看浏览器控制台错误信息

### Q2: 邮件进入垃圾箱？

**解决方案：**
1. 在 EmailJS 中验证发件人域名
2. 使用专业的邮件服务（如 Gmail）
3. 避免使用垃圾邮件关键词
4. 添加取消订阅链接

### Q3: 如何测试不消耗配额？

EmailJS 提供 **Test Mode**：
1. 在 Template 编辑页面
2. 点击 **Test It** 按钮
3. 填写测试数据
4. 发送测试邮件（不计入配额）

### Q4: 未配置 EmailJS 会怎样？

代码会自动降级为**模拟提交**：
- ✅ 不会报错
- ✅ 显示"预约成功"
- ✅ 控制台提示未配置
- ❌ 不会真实发送邮件

## 📝 总结

完成以上配置后，您的活动页面就具备了真实的邮件提醒功能！

**配置步骤回顾：**
1. ✅ 注册 EmailJS 账号
2. ✅ 添加邮件服务（获取 Service ID）
3. ✅ 创建邮件模板（获取 Template ID）
4. ✅ 获取 Public Key
5. ✅ 修改 `src/config/emailjs.config.js`
6. ✅ 测试功能

**需要帮助？**
- EmailJS 官方文档：https://www.emailjs.com/docs/
- EmailJS 支持：support@emailjs.com

