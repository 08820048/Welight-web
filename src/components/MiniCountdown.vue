<template>
  <!-- 迷你倒计时组件 - 简洁版 -->
  <div v-if="promotion && countdown.total > 0" class="mini-countdown" @click="handleClick"
    :title="`${promotion.displayName || promotion.name} - 点击查看详情`">
    <span class="countdown-text">
      <template v-if="countdown.days > 0">{{ countdown.days }}天</template>
      {{ String(countdown.hours).padStart(2, '0') }}:{{ String(countdown.minutes).padStart(2, '0') }}:{{
        String(countdown.seconds).padStart(2, '0') }}
    </span>
    <!-- 消息气泡小三角 -->
    <div class="bubble-arrow"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  promotion: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['click'])

// 倒计时数据
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  total: 0
})

// 倒计时阶段
const countdownPhase = ref('preheat') // preheat, active, ended

// 定时器
let countdownTimer = null

// 计算倒计时
const calculateCountdown = () => {
  if (!props.promotion) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    countdownPhase.value = 'ended'
    return
  }

  const now = new Date().getTime()

  // 获取活动开始时间和结束时间
  const activityStartDate = new Date(props.promotion.activityStartDate)
  activityStartDate.setHours(0, 0, 0, 0)
  const activityStartTime = activityStartDate.getTime()

  const endDate = new Date(props.promotion.endDate)
  endDate.setHours(23, 59, 59, 999)
  const endTime = endDate.getTime()

  let targetTime
  let phase

  // 判断当前处于哪个阶段
  if (now < activityStartTime) {
    // 预热期：倒计时到活动开始
    targetTime = activityStartTime
    phase = 'preheat'
  } else if (now >= activityStartTime && now <= endTime) {
    // 活动期：倒计时到活动结束
    targetTime = endTime
    phase = 'active'
  } else {
    // 活动已结束
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    countdownPhase.value = 'ended'
    if (countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
    return
  }

  const total = targetTime - now

  if (total <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    countdownPhase.value = phase
    setTimeout(calculateCountdown, 1000)
    return
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)

  countdown.value = { days, hours, minutes, seconds, total }
  countdownPhase.value = phase
}

// 启动倒计时
const startCountdown = () => {
  calculateCountdown()
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
  countdownTimer = setInterval(calculateCountdown, 1000)
}

// 停止倒计时
const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
}

// 处理点击事件
const handleClick = () => {
  emit('click', props.promotion)
}

// 监听 promotion 变化
watch(() => props.promotion, (newVal) => {
  if (newVal) {
    startCountdown()
  } else {
    stopCountdown()
  }
}, { immediate: true })

// 组件挂载
onMounted(() => {
  if (props.promotion) {
    startCountdown()
  }
})

// 组件卸载
onUnmounted(() => {
  stopCountdown()
})
</script>

<style scoped>
.mini-countdown {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  background: linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(255, 68, 68, 0.3);
}

.mini-countdown:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 6px rgba(255, 68, 68, 0.4);
}

.countdown-text {
  font-size: 10px;
  font-weight: 600;
  color: white;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  letter-spacing: 0.2px;
}

/* 消息气泡小三角 */
.bubble-arrow {
  position: absolute;
  bottom: -4px;
  left: 8px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #ff6b6b;
}

.mini-countdown:hover .bubble-arrow {
  border-top-color: #ff6b6b;
}
</style>
