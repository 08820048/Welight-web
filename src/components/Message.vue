<template>
  <Teleport to="body">
    <Transition name="message" appear>
      <div
        v-if="visible"
        :class="messageClass"
        class="message-container"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
      >
        <!-- 图标 -->
        <div class="message-icon">
          <svg v-if="type === 'success'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'error'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'warning'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'info'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>

        <!-- 消息内容 -->
        <div class="message-content">
          {{ message }}
        </div>

        <!-- 关闭按钮 -->
        <button
          v-if="showClose"
          @click="close"
          class="message-close"
        >
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * 类似Element UI的Message消息提示组件
 * 支持success、error、warning、info四种类型
 * 自动消失，支持手动关闭
 */
const props = defineProps({
  // 消息类型
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  // 消息内容
  message: {
    type: String,
    required: true
  },
  // 显示时长（毫秒），0表示不自动关闭
  duration: {
    type: Number,
    default: 3000
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: false
  },
  // 距离顶部的偏移量
  offset: {
    type: Number,
    default: 20
  },
  // 层级
  zIndex: {
    type: Number,
    default: 2000
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)
let timer = null

// 消息样式类
const messageClass = computed(() => {
  return [
    'message',
    `message-${props.type}`
  ]
})

// 启动定时器
function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

// 清除定时器
function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

// 关闭消息
function close() {
  visible.value = false
  clearTimer()
  emit('close')
}

// 显示消息
function show() {
  visible.value = true
  startTimer()
}

onMounted(() => {
  show()
})

onUnmounted(() => {
  clearTimer()
})

// 暴露方法给父组件
defineExpose({
  close
})
</script>

<style scoped>
/* 消息容器 */
.message-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  pointer-events: auto;
}

/* 消息基础样式 */
.message {
  display: flex;
  align-items: center;
  min-width: 380px;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  border: 1px solid #ebeef5;
  font-size: 14px;
  line-height: 1.4;
  transition: all 0.3s ease;
}

/* 图标样式 */
.message-icon {
  margin-right: 10px;
  flex-shrink: 0;
}

/* 内容样式 */
.message-content {
  flex: 1;
  color: #606266;
}

/* 关闭按钮 */
.message-close {
  margin-left: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #c0c4cc;
  transition: color 0.2s ease;
  padding: 0;
  flex-shrink: 0;
}

.message-close:hover {
  color: #909399;
}

/* 成功消息 */
.message-success {
  background-color: #f0f9ff;
  border-color: #67c23a;
}

.message-success .message-icon {
  color: #67c23a;
}

.message-success .message-content {
  color: #67c23a;
}

/* 错误消息 */
.message-error {
  background-color: #fef0f0;
  border-color: #f56c6c;
}

.message-error .message-icon {
  color: #f56c6c;
}

.message-error .message-content {
  color: #f56c6c;
}

/* 警告消息 */
.message-warning {
  background-color: #fdf6ec;
  border-color: #e6a23c;
}

.message-warning .message-icon {
  color: #e6a23c;
}

.message-warning .message-content {
  color: #e6a23c;
}

/* 信息消息 */
.message-info {
  background-color: #f4f4f5;
  border-color: #909399;
}

.message-info .message-icon {
  color: #909399;
}

.message-info .message-content {
  color: #909399;
}

/* 动画效果 */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .message {
    min-width: 300px;
    margin: 0 20px;
  }
}
</style>