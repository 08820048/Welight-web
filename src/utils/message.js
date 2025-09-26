import { createApp } from 'vue'
import Message from '../components/Message.vue'

/**
 * Message服务 - 类似Element UI的消息提示
 * 提供全局调用方法：$message.success(), $message.error(), $message.warning(), $message.info()
 */

// 存储当前显示的消息实例
let messageInstances = []
let seed = 1

// 创建消息实例
function createMessage(options) {
  const id = 'message_' + seed++
  
  // 创建容器元素
  const container = document.createElement('div')
  container.id = id
  document.body.appendChild(container)
  
  // 计算偏移量（多个消息时的堆叠效果）
  const offset = options.offset || 20
  const verticalOffset = offset + (messageInstances.length * 60)
  
  // 创建Vue应用实例
  const app = createApp(Message, {
    ...options,
    offset: verticalOffset,
    onClose: () => {
      // 移除实例
      removeMessage(id)
      // 调用用户定义的关闭回调
      if (options.onClose) {
        options.onClose()
      }
    }
  })
  
  // 挂载组件
  const instance = app.mount(container)
  
  // 更新容器样式
  container.style.top = verticalOffset + 'px'
  
  // 存储实例信息
  const messageInstance = {
    id,
    app,
    container,
    instance,
    verticalOffset
  }
  
  messageInstances.push(messageInstance)
  
  return messageInstance
}

// 移除消息实例
function removeMessage(id) {
  const index = messageInstances.findIndex(item => item.id === id)
  if (index === -1) return
  
  const { app, container } = messageInstances[index]
  
  // 卸载Vue应用
  app.unmount()
  
  // 移除DOM元素
  if (container.parentNode) {
    container.parentNode.removeChild(container)
  }
  
  // 从数组中移除
  messageInstances.splice(index, 1)
  
  // 重新计算剩余消息的位置
  updateMessagePositions()
}

// 更新消息位置
function updateMessagePositions() {
  messageInstances.forEach((item, index) => {
    const offset = 20
    const verticalOffset = offset + (index * 60)
    item.container.style.top = verticalOffset + 'px'
    item.verticalOffset = verticalOffset
  })
}

// 关闭所有消息
function closeAll() {
  messageInstances.forEach(item => {
    item.instance.close()
  })
}

// 主要的消息方法
function message(options) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  
  return createMessage(options)
}

// 成功消息
message.success = function(message, options = {}) {
  return createMessage({
    type: 'success',
    message,
    ...options
  })
}

// 错误消息
message.error = function(message, options = {}) {
  return createMessage({
    type: 'error',
    message,
    ...options
  })
}

// 警告消息
message.warning = function(message, options = {}) {
  return createMessage({
    type: 'warning',
    message,
    ...options
  })
}

// 信息消息
message.info = function(message, options = {}) {
  return createMessage({
    type: 'info',
    message,
    ...options
  })
}

// 关闭所有消息
message.closeAll = closeAll

export default message

// 导出单独的方法以便按需引入
export {
  closeAll
}