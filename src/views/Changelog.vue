<template>
  <div class="relative min-h-screen bg-white">
    <div class="min-h-screen text-gray-200 pt-20 relative overflow-hidden" style="position: relative; z-index: 1;">
      <!-- Header -->
      <section class="section-padding relative z-10">
        <div class="container-custom text-center relative">
          <AnimatedUnderlineText text="更新日志"
            text-className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-longcang"
            underline-className="text-gray-900 dark:text-white" />
          <MagicText text="Welight 版本更新记录" container-className="mt-6 justify-center max-w-3xl mx-auto"
            word-className="text-xl text-gray-600" />
        </div>
      </section>

      <!-- Changelog List -->
      <section class="section-padding relative z-10">
        <div class="container-custom relative max-w-4xl mx-auto">
          <div v-if="!changelogData || changelogData.length === 0" class="text-center py-12">
            <p class="text-gray-500">正在加载更新日志...</p>
          </div>

          <div v-else class="space-y-8">
            <div v-for="version in changelogData" :key="version.version"
              class="relative pb-6 border-b border-gray-100 last:border-0 last:pb-0">
              <!-- Title Row -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-base font-semibold text-gray-900">v{{ version.version }}</span>
                  <span v-if="version.badge" class="px-2 py-0.5 text-xs rounded-md bg-gray-900 text-white">
                    {{ version.badge }}
                  </span>
                </div>
                <span class="text-xs text-gray-500">{{ formatDate(version.date) }}</span>
              </div>

              <!-- Changes -->
              <div class="space-y-4">
                <template v-for="(changes, changeType) in version.changes" :key="changeType">
                  <div v-if="changes && changes.length > 0">
                    <h4 class="text-xs font-medium mb-1.5 text-gray-900">
                      {{ getChangeTypeConfig(changeType).icon }} {{ getChangeTypeConfig(changeType).title }}
                    </h4>
                    <ul class="space-y-1 text-sm text-gray-600">
                      <li v-for="change in changes" :key="change" class="flex items-start gap-2">
                        <span class="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{{ change }}</span>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import AnimatedUnderlineText from '@/components/ui/AnimatedUnderlineText.vue'
import MagicText from '@/components/ui/MagicText.vue'
import { changelogData, formatDate, getChangeTypeConfig } from '@/data/changelog.js'
</script>

<style scoped></style>
