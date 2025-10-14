# 📧 EmailJS 快速配置（5分钟完成）

## 第一步：注册账号（1分钟）

1. 访问：https://www.emailjs.com/
2. 点击 **Sign Up** 注册（可用 Google 账号快速登录）
3. 验证邮箱

## 第二步：添加邮件服务（2分钟）

1. 登录后，点击左侧 **Email Services**
2. 点击 **Add New Service**
3. 选择 **Gmail**（推荐）
4. 点击 **Connect Account**，授权您的 Gmail
5. 复制 **Service ID**（类似：`service_abc123`）

## 第三步：创建邮件模板（1分钟）

1. 点击左侧 **Email Templates**
2. 点击 **Create New Template**
3. 复制粘贴以下内容：

**Subject（主题）：**
```
Welight {{promotion_name}} 活动提醒订阅成功
```

**Content（内容）：**
```
您好！

感谢您订阅 Welight {{promotion_name}} 活动提醒！

我们会在活动开始时通过邮件通知您。

订阅邮箱：{{user_email}}
订阅时间：{{subscribe_time}}

祝您使用愉快！
Welight 团队
```

4. 点击 **Save**
5. 复制 **Template ID**（类似：`template_xyz789`）

## 第四步：获取 Public Key（30秒）

1. 点击左侧 **Account**
2. 找到 **API Keys** 部分
3. 复制 **Public Key**（类似：`abcdefg123456`）

## 第五步：配置项目（30秒）

打开 `src/config/emailjs.config.js`，替换为您的配置：

```javascript
export const emailJsConfig = {
  publicKey: 'abcdefg123456',      // 第四步的 Public Key
  serviceId: 'service_abc123',     // 第二步的 Service ID
  templateId: 'template_xyz789'    // 第三步的 Template ID
}
```

## 第六步：测试（30秒）

1. 运行：`npm run dev`
2. 打开活动页面
3. 输入邮箱，点击"预约提醒"
4. 检查邮箱是否收到邮件

## ✅ 完成！

现在您的活动页面已经可以真实发送邮件了！

**免费额度：** 每月 200 封邮件

**详细文档：** 查看 `docs/EMAILJS_SETUP.md`

---

## 🚨 常见问题

### 邮件没收到？

1. 检查垃圾邮件箱
2. 确认 Service 已连接成功
3. 查看浏览器控制台是否有错误

### 配置错了怎么办？

重新复制正确的 ID 到 `src/config/emailjs.config.js` 即可

### 不想配置可以吗？

可以！代码会自动降级为模拟提交，不影响使用

