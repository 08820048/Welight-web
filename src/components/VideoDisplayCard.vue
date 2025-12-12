<template>
  <div class="relative w-full max-w-5xl mx-auto rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm p-2 sm:p-4 shadow-xl transition-all duration-500 hover:shadow-2xl">
    <div class="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200 aspect-video bg-gray-100">
      <video
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
        :poster="poster"
      >
        <source :src="videoUrl" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>
    </div>
  </div>
</template>

<script setup>
defineProps({
  videoUrl: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: ''
  }
})
</script>
