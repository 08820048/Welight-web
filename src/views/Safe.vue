<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <div class="h-16"></div>
    <main class="max-w-4xl mx-auto px-4 py-10">
      <header class="mb-6">
        <h1 class="text-3xl font-bold">网络安全管理方案</h1>
      </header>

      <section v-if="hasContent" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
        <div class="markdown-content" v-html="renderedContent"></div>
      </section>

      <section
        v-else
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 text-sm text-gray-600 dark:text-gray-300"
      >
        文档内容为空，请在 `docs/网络安全管理方案.md` 中补充内容后刷新页面。
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { useSEO } from '@/composables/useSEO'
import safePlanRaw from '../../docs/网络安全管理方案.md?raw'

useSEO({
  title: '网络安全管理方案 - Welight',
  description: 'Welight 网络安全管理方案文档。',
  keywords: '网络安全管理方案,Welight,安全管理',
  url: 'https://waer.ltd/safe'
})

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight(code, language) {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value
    }
    return hljs.highlightAuto(code).value
  }
})

const sourceContent = String(safePlanRaw || '')
const hasContent = computed(() => sourceContent.trim().length > 0)
const renderedContent = computed(() => marked.parse(sourceContent))
</script>

<style scoped>
:deep(.markdown-content h1) {
  @apply text-3xl font-bold mt-8 mb-4;
}

:deep(.markdown-content h2) {
  @apply text-2xl font-bold mt-6 mb-3;
}

:deep(.markdown-content h3) {
  @apply text-xl font-semibold mt-5 mb-2;
}

:deep(.markdown-content p) {
  @apply leading-7 my-3;
}

:deep(.markdown-content ul) {
  @apply list-disc pl-6 my-3;
}

:deep(.markdown-content ol) {
  @apply list-decimal pl-6 my-3;
}

:deep(.markdown-content a) {
  @apply text-blue-600 hover:underline;
}

:deep(.markdown-content blockquote) {
  @apply border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4;
}

:deep(.markdown-content pre) {
  @apply rounded-lg p-4 overflow-x-auto my-4 bg-gray-900 text-gray-100;
}

:deep(.markdown-content code) {
  @apply font-mono text-sm;
}

:deep(.markdown-content table) {
  @apply w-full border-collapse my-4;
}

:deep(.markdown-content th),
:deep(.markdown-content td) {
  @apply border border-gray-300 px-3 py-2 text-left;
}
</style>
