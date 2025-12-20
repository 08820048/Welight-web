<template>
  <!-- 活动条幅遮罩层 -->
  <transition name="banner-overlay">
    <div v-if="isVisible" @click="close" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
      style="animation: fadeIn 0.3s ease-out;"></div>
  </transition>

  <!-- 活动条幅内容 -->
  <transition name="banner-slide">
    <div v-if="isVisible" class="fixed top-0 left-0 right-0 z-[101] shadow-2xl">
      <div :style="bannerBackgroundStyle" class="relative">
        <!-- 活动规则 - 左下角 -->
        <div class="absolute bottom-4 left-4 text-left z-10 promo-rules-corner">
          <h3 class="text-white text-sm font-semibold mb-2">活动规则</h3>
          <ul class="text-white/80 text-xs space-y-1">
            <li>活动时间：{{ activityTimeLabel }}</li>
            <li>活动期间下单可享受对应折扣，具体以下单页为准</li>
            <li>优惠不可叠加使用，以最优惠价格为准</li>
          </ul>
        </div>

        <!-- 关闭按钮 -->
        <button @click="close"
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all z-10 group">
          <svg class="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- 条幅内容 -->
        <div class="container mx-auto px-4 py-8 max-w-6xl">
          <!-- 标题区域 -->
          <div class="text-center mb-6">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 animate-bounce-slow"
              style="text-shadow: 2px 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(255,187,51,0.3);">
              {{ promotion?.banner?.title || '活动详情' }}
            </h2>
            <p v-if="promotion?.banner?.subtitle" class="text-lg md:text-xl text-white/90 mb-4"
              style="text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
              {{ promotion.banner.subtitle }}
            </p>

            <!-- 倒计时区域 -->
            <div v-if="promotion && countdown.total > 0" class="countdown-section">
              <!-- 倒计时提示文字 - 上方居中 -->
              <div class="countdown-hint">
                <svg class="hint-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="hint-text">
                  {{ countdownPhase === 'preheat' ? '距离活动开始' : '距离活动结束' }}
                </span>
              </div>

              <div class="countdown-wrapper">
                <div class="countdown-item">
                  <div class="countdown-digit" :class="{ 'flash-animation': flashDays }">{{ countdown.days }}</div>
                  <div class="countdown-label">天</div>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                  <div class="countdown-digit" :class="{ 'flash-animation': flashHours }">{{ countdown.hours }}</div>
                  <div class="countdown-label">时</div>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                  <div class="countdown-digit accent-digit" :class="{ 'flash-animation': flashMinutes }">{{
                    countdown.minutes }}</div>
                  <div class="countdown-label">分</div>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                  <div class="countdown-digit" :class="{ 'flash-animation': flashSeconds }">{{ countdown.seconds }}
                  </div>
                  <div class="countdown-label">秒</div>
                </div>
              </div>
            </div>

            <!-- 活动已结束提示 -->
            <div v-else-if="promotion && countdown.total <= 0"
              class="inline-flex items-center gap-2 bg-gray-500/30 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/30">
              <svg class="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-white/70 font-medium">活动已结束</span>
            </div>
          </div>

          <!-- 活动内容 -->
          <div v-html="promotion?.banner?.content" style="width: 110%;"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  promotion: {
    type: Object,
    default: null
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const isVisible = ref(props.modelValue)

// 倒计时状态
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  total: 0
})

// 倒计时阶段：'preheat' 预热期 | 'active' 活动期 | 'ended' 已结束
const countdownPhase = ref('active')



// 闪烁动画状态
const flashDays = ref(false)
const flashHours = ref(false)
const flashMinutes = ref(false)
const flashSeconds = ref(false)

let countdownTimer = null

/**
 * 条幅背景样式（优先使用渐变）
 * @returns {{ background?: string, backgroundColor?: string }}
 */
const bannerBackgroundStyle = computed(() => {
  if (props.promotion?.banner?.bgGradient) {
    return { background: props.promotion.banner.bgGradient }
  }
  return { backgroundColor: props.promotion?.banner?.bgColor || '#ff4444' }
})

/**
 * 格式化日期为 YYYY.MM.DD
 * @param {string|Date} date
 * @returns {string}
 */
const formatDate = (date) => {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

/**
 * 活动时间文案（开始 - 结束）
 */
const activityTimeLabel = computed(() => {
  if (!props.promotion) return ''
  const start = formatDate(props.promotion.activityStartDate || props.promotion.preheatStartDate)
  const end = formatDate(props.promotion.endDate)
  return `${start} - ${end}`
})

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
    // 时间到了，重新计算（可能从预热期切换到活动期）
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    countdownPhase.value = phase
    // 延迟一秒后重新计算，以便切换到下一个阶段
    setTimeout(calculateCountdown, 1000)
    return
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)

  // 检测变化并触发闪烁动画
  const newDays = String(days).padStart(2, '0')
  const newHours = String(hours).padStart(2, '0')
  const newMinutes = String(minutes).padStart(2, '0')
  const newSeconds = String(seconds).padStart(2, '0')

  if (countdown.value.days !== newDays && countdown.value.days !== 0) {
    triggerFlash('days')
  }
  if (countdown.value.hours !== newHours && countdown.value.hours !== 0) {
    triggerFlash('hours')
  }
  if (countdown.value.minutes !== newMinutes && countdown.value.minutes !== 0) {
    triggerFlash('minutes')
  }
  if (countdown.value.seconds !== newSeconds && countdown.value.seconds !== 0) {
    triggerFlash('seconds')
  }

  countdown.value = {
    days: newDays,
    hours: newHours,
    minutes: newMinutes,
    seconds: newSeconds,
    total
  }
  countdownPhase.value = phase
}

// 触发闪烁动画
const triggerFlash = (unit) => {
  if (unit === 'days') {
    flashDays.value = true
    setTimeout(() => { flashDays.value = false }, 500)
  } else if (unit === 'hours') {
    flashHours.value = true
    setTimeout(() => { flashHours.value = false }, 500)
  } else if (unit === 'minutes') {
    flashMinutes.value = true
    setTimeout(() => { flashMinutes.value = false }, 500)
  } else if (unit === 'seconds') {
    flashSeconds.value = true
    setTimeout(() => { flashSeconds.value = false }, 500)
  }
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

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
  if (newVal) {
    // 打开时禁止页面滚动并启动倒计时
    document.body.style.overflow = 'hidden'
    startCountdown()
  } else {
    // 关闭时恢复页面滚动并停止倒计时
    document.body.style.overflow = ''
    stopCountdown()
  }
})

watch(() => props.promotion, () => {
  if (isVisible.value) {
    startCountdown()
  }
})

const close = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
  document.body.style.overflow = ''
  stopCountdown()
}

// 组件挂载时如果已显示则启动倒计时
onMounted(() => {
  if (isVisible.value) {
    startCountdown()
  }
})

// 组件卸载时恢复滚动并停止倒计时
onUnmounted(() => {
  document.body.style.overflow = ''
  stopCountdown()
})
</script>

<style scoped>
/* 遮罩层动画 */
.banner-overlay-enter-active,
.banner-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.banner-overlay-enter-from,
.banner-overlay-leave-to {
  opacity: 0;
}

/* 条幅滑动动画 */
.banner-slide-enter-active,
.banner-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.banner-slide-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.banner-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 缓慢弹跳动画 */
@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* 渐入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 背景渐变动画 */
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* 倒计时样式 */
.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

/* 倒计时区域 */
.countdown-section {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.countdown-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* 倒计时提示文字 - 上方居中 */
.countdown-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.countdown-hint:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hint-icon {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
}

.hint-text {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.countdown-digit {
  font-size: 48px;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  border-radius: 12px;
  padding: 16px 24px;
  min-width: 100px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.countdown-digit::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  left: 0;
}

.countdown-digit.accent-digit {
  background-color: rgba(255, 255, 255, 0.95);
  color: #ff4444;
}

.countdown-label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.countdown-separator {
  font-size: 48px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 16px;
  align-self: flex-start;
}

/* 闪烁动画 */
.flash-animation {
  animation: flash 0.5s ease;
}

@keyframes flash {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .countdown-section {
    gap: 12px;
  }

  .countdown-wrapper {
    gap: 10px;
  }

  .countdown-digit {
    font-size: 32px;
    padding: 12px 16px;
    min-width: 70px;
  }

  .countdown-separator {
    font-size: 32px;
    margin-top: 12px;
  }

  .countdown-label {
    font-size: 12px;
  }

  .countdown-hint {
    padding: 6px 16px;
  }

  .hint-icon {
    width: 16px;
    height: 16px;
  }

  .hint-text {
    font-size: 12px;
  }
}
</style>

<style>
/* 全局样式 - 简洁布局 */

.promo-clean-layout {
  padding: 0;
  margin: 0;
}

.promo-rules-corner {
  max-width: 280px;
}

.promo-rules-corner h3 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.promo-rules-corner ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.promo-rules-corner li {
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.promo-info-grid-new {
  display: flex;
  gap: 80px;
  justify-content: center;
  margin-bottom: 40px;
}

.promo-info-item {
  text-align: center;
  flex: 1;
  max-width: 280px;
}

.promo-info-item h3 {
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.promo-info-item p {
  color: rgba(255, 255, 255, 0.95);
  font-size: 16px;
  margin-bottom: 8px;
}

.promo-info-item strong {
  color: #4ade80;
  font-size: 24px;
  font-weight: 800;
  text-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
  white-space: nowrap;
}

.promo-info-item span {
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  display: block;
  white-space: nowrap;
}



.promo-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.promo-btn-main,
.promo-btn-sub {
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.promo-btn-main {
  background-color: white;
  color: #ff4444;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.promo-btn-main:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.promo-btn-sub {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.promo-btn-sub:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
}

@media (max-width: 1024px) {
  .promo-info-grid-new {
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .promo-actions {
    flex-direction: column;
    gap: 15px;
  }

  .promo-btn-main,
  .promo-btn-sub {
    width: 100%;
    text-align: center;
  }
}

/* 按钮发光动画 */
.promo-button {
  animation: button-glow 2s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.promo-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 187, 51, 0.3), transparent);
  transform: rotate(45deg);
  animation: button-shine 3s linear infinite;
}

@keyframes button-glow {
  0% {
    box-shadow: 0 5px 20px rgba(255, 68, 68, 0.4);
  }

  50% {
    box-shadow: 0 5px 30px rgba(255, 187, 51, 0.6), 0 0 40px rgba(255, 187, 51, 0.3);
  }

  100% {
    box-shadow: 0 5px 20px rgba(255, 68, 68, 0.4);
  }
}

@keyframes button-shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }

  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.promo-button:hover {
  animation: button-glow-hover 1s ease-in-out infinite;
}

@keyframes button-glow-hover {
  0% {
    box-shadow: 0 5px 25px rgba(255, 187, 51, 0.6);
  }

  50% {
    box-shadow: 0 8px 35px rgba(255, 187, 51, 0.8), 0 0 50px rgba(255, 187, 51, 0.5);
  }

  100% {
    box-shadow: 0 5px 25px rgba(255, 187, 51, 0.6);
  }
}
</style>
