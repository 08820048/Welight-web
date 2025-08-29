<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">下载统计测试</h3>
    
    <!-- 当前统计数据 -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">当前统计数据：</h4>
      <div class="bg-gray-50 rounded p-3 text-sm">
        <pre>{{ JSON.stringify(stats, null, 2) }}</pre>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="space-y-2">
      <button 
        @click="testRecordDownload"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? '记录中...' : '测试记录下载' }}
      </button>
      
      <button 
        @click="testGetStats"
        :disabled="loading"
        class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {{ loading ? '获取中...' : '获取统计数据' }}
      </button>
    </div>
    
    <!-- 状态信息 -->
    <div v-if="message" class="mt-4 p-3 rounded text-sm" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { recordDownload, getDownloadStats } from '@/services/downloadStats'

const stats = ref(null)
const loading = ref(false)
const message = ref('')
const messageClass = ref('')

// 测试记录下载
const testRecordDownload = async () => {
  loading.value = true
  message.value = ''
  
  try {
    const success = await recordDownload('https://waer.ltd/test')
    if (success) {
      message.value = '下载记录成功！'
      messageClass.value = 'bg-green-100 text-green-800'
      // 记录成功后自动获取最新统计
      await testGetStats()
    } else {
      message.value = '下载记录失败'
      messageClass.value = 'bg-red-100 text-red-800'
    }
  } catch (error) {
    message.value = `错误: ${error.message}`
    messageClass.value = 'bg-red-100 text-red-800'
  } finally {
    loading.value = false
  }
}

// 测试获取统计数据
const testGetStats = async () => {
  loading.value = true
  message.value = ''
  
  try {
    const data = await getDownloadStats()
    if (data) {
      stats.value = data
      message.value = '统计数据获取成功！'
      messageClass.value = 'bg-green-100 text-green-800'
    } else {
      message.value = '获取统计数据失败'
      messageClass.value = 'bg-red-100 text-red-800'
    }
  } catch (error) {
    message.value = `错误: ${error.message}`
    messageClass.value = 'bg-red-100 text-red-800'
  } finally {
    loading.value = false
  }
}
</script>
