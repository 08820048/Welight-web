<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 pt-24">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">字体展示测试页面</h1>

      <div class="mb-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">测试文本</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">中文文本</label>
            <input v-model="chineseText" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">英文文本</label>
            <input v-model="englishText" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">字体大小 ({{ fontSize }}px)</label>
            <input v-model="fontSize" type="range" min="12" max="48" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">筛选分类</label>
            <select v-model="selectedCategory"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="全部">全部字体</option>
              <option value="系统默认">系统默认</option>
              <option value="中文 - 黑体">中文 - 黑体</option>
              <option value="中文 - 宋体">中文 - 宋体</option>
              <option value="中文 - 楷体">中文 - 楷体</option>
              <option value="中文 - 仿宋">中文 - 仿宋</option>
              <option value="中文 - 圆体">中文 - 圆体</option>
              <option value="中文 - 其他">中文 - 其他</option>
              <option value="英文 - 无衬线">英文 - 无衬线</option>
              <option value="英文 - 衬线">英文 - 衬线</option>
              <option value="英文 - 等宽">英文 - 等宽</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mb-4 text-center text-gray-600">
        共 {{ filteredFonts.length }} 个字体
      </div>

      <div class="space-y-6">
        <div v-for="font in filteredFonts" :key="font.name"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-800">{{ font.name }}</h3>
            <span class="text-sm text-gray-500">{{ font.category }}</span>
          </div>

          <div class="mb-2">
            <code class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
              font-family: {{ font.family }}
            </code>
          </div>

          <div class="space-y-3 mt-4">
            <div :style="{ fontFamily: font.family, fontSize: fontSize + 'px' }" class="text-gray-900">
              {{ chineseText }}
            </div>
            <div :style="{ fontFamily: font.family, fontSize: fontSize + 'px' }" class="text-gray-700">
              {{ englishText }}
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="grid grid-cols-3 gap-4 text-sm">
              <div :style="{ fontFamily: font.family }">
                <span class="text-gray-500">Regular:</span>
                <span class="font-normal">字体 Font</span>
              </div>
              <div :style="{ fontFamily: font.family }">
                <span class="text-gray-500">Bold:</span>
                <span class="font-bold">字体 Font</span>
              </div>
              <div :style="{ fontFamily: font.family }">
                <span class="text-gray-500">Italic:</span>
                <span class="italic">字体 Font</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const chineseText = ref('微光公众号排版工具 - 让文字更有温度')
const englishText = ref('Welight - Make Your Words More Beautiful')
const fontSize = ref(24)
const selectedCategory = ref('全部')

const fonts = ref([
  // 系统默认
  {
    name: '系统默认字体',
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    category: '系统默认'
  },

  // 中文 - 黑体/无衬线
  {
    name: '苹方 (PingFang SC)',
    family: '"PingFang SC", -apple-system, sans-serif',
    category: '中文 - 黑体'
  },
  {
    name: '微软雅黑 (Microsoft YaHei)',
    family: '"Microsoft YaHei", "微软雅黑", sans-serif',
    category: '中文 - 黑体'
  },
  {
    name: '思源黑体 (Source Han Sans)',
    family: '"Source Han Sans SC", "Noto Sans CJK SC", sans-serif',
    category: '中文 - 黑体'
  },
  {
    name: '黑体 (SimHei)',
    family: 'SimHei, "黑体", sans-serif',
    category: '中文 - 黑体'
  },
  {
    name: '冬青黑体 (Hiragino Sans GB)',
    family: '"Hiragino Sans GB", "冬青黑体", sans-serif',
    category: '中文 - 黑体'
  },

  // 中文 - 宋体/衬线
  {
    name: '宋体 (SimSun)',
    family: 'SimSun, "宋体", serif',
    category: '中文 - 宋体'
  },
  {
    name: '新宋体 (NSimSun)',
    family: 'NSimSun, "新宋体", serif',
    category: '中文 - 宋体'
  },
  {
    name: '思源宋体 (Source Han Serif)',
    family: '"Source Han Serif SC", "Noto Serif CJK SC", serif',
    category: '中文 - 宋体'
  },
  {
    name: '华文宋体 (STSong)',
    family: 'STSong, "华文宋体", serif',
    category: '中文 - 宋体'
  },

  // 中文 - 楷体
  {
    name: '楷体 (KaiTi)',
    family: 'KaiTi, "楷体", serif',
    category: '中文 - 楷体'
  },
  {
    name: '华文楷体 (STKaiti)',
    family: 'STKaiti, "华文楷体", serif',
    category: '中文 - 楷体'
  },
  {
    name: '楷体_GB2312',
    family: 'KaiTi_GB2312, "楷体_GB2312", serif',
    category: '中文 - 楷体'
  },

  // 中文 - 仿宋
  {
    name: '仿宋 (FangSong)',
    family: 'FangSong, "仿宋", serif',
    category: '中文 - 仿宋'
  },
  {
    name: '华文仿宋 (STFangsong)',
    family: 'STFangsong, "华文仿宋", serif',
    category: '中文 - 仿宋'
  },

  // 中文 - 圆体
  {
    name: '幼圆 (YouYuan)',
    family: 'YouYuan, "幼圆", sans-serif',
    category: '中文 - 圆体'
  },
  {
    name: '华文圆体 (STYuanti)',
    family: 'STYuanti, "华文圆体", sans-serif',
    category: '中文 - 圆体'
  },

  // 中文 - 其他
  {
    name: '华文细黑 (STXihei)',
    family: 'STXihei, "华文细黑", sans-serif',
    category: '中文 - 其他'
  },
  {
    name: '华文中宋 (STZhongsong)',
    family: 'STZhongsong, "华文中宋", serif',
    category: '中文 - 其他'
  },
  {
    name: '隶书 (LiSu)',
    family: 'LiSu, "隶书", serif',
    category: '中文 - 其他'
  },

  // 英文 - 无衬线
  {
    name: 'Arial',
    family: 'Arial, sans-serif',
    category: '英文 - 无衬线'
  },
  {
    name: 'Helvetica',
    family: 'Helvetica, Arial, sans-serif',
    category: '英文 - 无衬线'
  },
  {
    name: 'Helvetica Neue',
    family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    category: '英文 - 无衬线'
  },
  {
    name: 'Roboto',
    family: 'Roboto, sans-serif',
    category: '英文 - 无衬线'
  },
  {
    name: 'Segoe UI',
    family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    category: '英文 - 无衬线'
  },
  {
    name: 'Verdana',
    family: 'Verdana, Geneva, Tahoma, sans-serif',
    category: '英文 - 无衬线'
  },

  // 英文 - 衬线
  {
    name: 'Georgia',
    family: 'Georgia, serif',
    category: '英文 - 衬线'
  },
  {
    name: 'Times New Roman',
    family: '"Times New Roman", Times, serif',
    category: '英文 - 衬线'
  },
  {
    name: 'Palatino',
    family: 'Palatino, "Palatino Linotype", "Book Antiqua", serif',
    category: '英文 - 衬线'
  },

  // 英文 - 等宽
  {
    name: 'Courier New',
    family: '"Courier New", Courier, monospace',
    category: '英文 - 等宽'
  },
  {
    name: 'Monaco',
    family: 'Monaco, "Courier New", monospace',
    category: '英文 - 等宽'
  },
  {
    name: 'Consolas',
    family: 'Consolas, Monaco, "Courier New", monospace',
    category: '英文 - 等宽'
  }
])

const filteredFonts = computed(() => {
  if (selectedCategory.value === '全部') {
    return fonts.value
  }
  return fonts.value.filter(font => font.category === selectedCategory.value)
})
</script>

<style scoped>
/* 确保所有字体都能正确显示 */
</style>
