/**
 * EmailJS 配置文件
 *
 * 使用步骤：
 * 1. 访问 https://www.emailjs.com/ 注册账号（免费）
 * 2. 在 Email Services 中添加邮件服务（Gmail/Outlook等）
 * 3. 在 Email Templates 中创建邮件模板
 * 4. 在 Account 中获取 Public Key
 * 5. 将以下配置替换为您的实际值
 */

export const emailJsConfig = {
  // 您的 EmailJS Public Key（在 Account 页面获取）
  publicKey: 'FD9Vpjw6p22_dz8bZ',

  // 您的 Service ID（在 Email Services 页面获取）
  serviceId: 'service_tfr1aks',

  // 您的 Template ID（在 Email Templates 页面获取）
  templateId: 'template_ux91d6o'
}

/**
 * 邮件模板变量说明：
 *
 * 在 EmailJS 模板中可以使用以下变量：
 * - {{user_email}}     用户输入的邮箱
 * - {{promotion_name}} 活动名称
 * - {{promotion_id}}   活动ID
 * - {{subscribe_time}} 订阅时间
 * - {{message}}        自定义消息
 *
 * 示例模板内容：
 *
 * 主题：Welight活动提醒订阅成功
 *
 * 内容：
 * 您好！
 *
 * 感谢您订阅 Welight {{promotion_name}} 活动提醒！
 *
 * 我们会在活动开始时通过邮件通知您。
 *
 * 订阅邮箱：{{user_email}}
 * 订阅时间：{{subscribe_time}}
 *
 * 祝您使用愉快！
 * Welight 团队
 */
