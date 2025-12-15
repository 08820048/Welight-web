<template>
  <div class="relative w-full max-w-5xl mx-auto rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm p-2 sm:p-4 shadow-xl transition-all duration-500 hover:shadow-2xl">
    <div class="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200 aspect-video bg-gray-100">
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
        preload="metadata"
        :poster="poster"
        @error="handleVideoError"
      >
        <source :src="videoUrl" type="video/mp4" />
        <source v-if="fallbackUrl" :src="fallbackUrl" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  videoUrl: {
    type: String,
    required: true
  },
  fallbackUrl: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  }
})

const videoRef = ref(null)
let switched = false

/**
 * 当主视频源加载失败时，自动切换到备用视频源
 */
function handleVideoError() {
  if (switched) return
  const el = videoRef.value
  if (!el) return
  const sources = el.querySelectorAll('source')
  if (sources.length > 1) {
    // 切换到最后一个 source（备用）
    try {
      const last = sources[sources.length - 1]
      el.src = last.getAttribute('src') || ''
      switched = true
      el.load()
    } catch {}
  }
}
</script>
