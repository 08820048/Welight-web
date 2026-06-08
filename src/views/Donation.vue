<template>
  <div class="product-main min-h-screen">
    <section class="px-4 pt-24 pb-12 md:px-6 md:pt-28 md:pb-16">
      <div class="mx-auto max-w-4xl text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#1B365D] dark:text-[#D0DCE9]">
          Donation
        </p>
        <h1 class="mt-5 text-balance text-3xl font-semibold tracking-normal text-[#1B365D] md:text-4xl dark:text-[#D0DCE9]">
          赞助支持 Welight
        </h1>
        <p class="mt-4 mx-auto max-w-2xl text-pretty text-base leading-7 text-[#504e49] dark:text-[#d6d1c4]">
          感谢每一位支持 Welight 的你，您的赞助将用于支持软件的持续开发、服务器维护、功能优化和技术支持。
        </p>
      </div>
    </section>

    <section class="px-4 pb-20 md:px-6 md:pb-28">
      <div class="mx-auto max-w-5xl space-y-0">
        <!-- 赞助者福利 -->
        <div class="border-t border-[#d8d3c4] py-8 dark:border-[#44433f]">
          <div class="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr]">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#1B365D] dark:text-[#D0DCE9]">Benefits</p>
              <h2 class="mt-2 text-xl md:text-2xl font-semibold tracking-normal text-[#1B365D] dark:text-[#D0DCE9]">
                赞助者福利
              </h2>
            </div>
            <div>
              <p class="text-pretty text-base leading-7 text-[#504e49] dark:text-[#d6d1c4]">
                每位赞助者每月可获得 <span class="font-semibold text-[#141413] dark:text-[#f5f4ed]">500 积分</span> 奖励，积分可用于 AI 功能消费和图片存储服务。
              </p>
            </div>
          </div>
        </div>

        <!-- 特别赞助 -->
        <div v-if="specialDonations.length > 0" class="border-t border-[#d8d3c4] py-8 dark:border-[#44433f]">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#1B365D] dark:text-[#D0DCE9]">Special</p>
          <h2 class="mt-2 text-xl md:text-2xl font-semibold tracking-normal text-[#1B365D] dark:text-[#D0DCE9]">
            特别赞助
          </h2>
          <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="donation in specialDonations" :key="donation.id"
              class="border-t border-[#d8d3c4] pt-5 dark:border-[#44433f]">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-[#1B365D] dark:text-[#D0DCE9]">{{ donation.specialTag }}</span>
                <span class="tabular-nums text-lg font-semibold text-[#141413] dark:text-[#f5f4ed]">
                  {{ formatAmount(donation.amount) }}
                </span>
              </div>
              <div class="mt-3 space-y-1 text-sm text-[#504e49] dark:text-[#d6d1c4]">
                <p><span class="font-medium text-[#3D3D3A] dark:text-[#d6d1c4]">赞助者：</span>{{ donation.donorName }}</p>
                <p><span class="font-medium text-[#3D3D3A] dark:text-[#d6d1c4]">时间：</span>{{ formatDate(donation.donationDate) }}</p>
                <p><span class="font-medium text-[#3D3D3A] dark:text-[#d6d1c4]">渠道：</span>{{ donation.channel }}</p>
              </div>
              <p v-if="donation.message" class="mt-3 text-sm italic text-[#6b6a64] dark:text-[#817d72]">
                "{{ donation.message }}"
              </p>
            </div>
          </div>
        </div>

        <!-- 致谢名单 -->
        <div class="border-t border-[#d8d3c4] py-8 dark:border-[#44433f]">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#1B365D] dark:text-[#D0DCE9]">List</p>
          <h2 class="mt-2 text-xl md:text-2xl font-semibold tracking-normal text-[#1B365D] dark:text-[#D0DCE9]">
            致谢名单
          </h2>
          <p class="mt-3 text-sm text-[#504e49] dark:text-[#d6d1c4]">
            每一份赞助我们都会认真记录，并向您致以诚挚感谢。
          </p>

          <div class="mt-6 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-[#d8d3c4] dark:border-[#44433f]">
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b6a64] dark:text-[#D0DCE9]">
                    赞助者
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b6a64] dark:text-[#D0DCE9]">
                    金额
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b6a64] dark:text-[#D0DCE9]">
                    时间
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b6a64] dark:text-[#D0DCE9]">
                    渠道
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b6a64] dark:text-[#D0DCE9]">
                    留言
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="donation in allDonations" :key="donation.id"
                  class="border-b border-[#d8d3c4] dark:border-[#44433f]">
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span class="font-medium text-[#141413] dark:text-[#f5f4ed]">{{ donation.donorName }}</span>
                    <span v-if="donation.isSpecial" class="ml-2 text-xs text-[#1B365D] dark:text-[#D0DCE9]">
                      {{ donation.specialTag }}
                    </span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap tabular-nums font-semibold text-[#141413] dark:text-[#f5f4ed]">
                    {{ formatAmount(donation.amount) }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-[#504e49] dark:text-[#d6d1c4]">
                    {{ formatDate(donation.date) }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-[#504e49] dark:text-[#d6d1c4]">
                    {{ donation.channel }}
                  </td>
                  <td class="px-4 py-3 max-w-xs truncate text-[#504e49] dark:text-[#d6d1c4]"
                    :title="donation.message">
                    {{ donation.message || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAllDonations, getSpecialDonations, formatAmount, formatDate } from '@/data/donations.js'
import { useSEO, seoConfigs } from '@/composables/useSEO'

useSEO(seoConfigs.donation)

const allDonations = ref([])
const specialDonations = ref([])

function initData() {
  const donations = getAllDonations()
  allDonations.value = donations.map(donation => ({
    ...donation,
    date: donation.donationDate
  }))
  specialDonations.value = getSpecialDonations()
}

onMounted(() => {
  initData()
})
</script>
