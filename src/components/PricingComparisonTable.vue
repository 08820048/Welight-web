<template>
  <div
    class="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
    <table class="w-full text-sm text-left text-gray-600 dark:text-gray-300">
      <thead
        class="text-xs text-gray-700 dark:text-gray-100 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <tr>
          <th scope="col" class="px-6 py-4 font-bold text-base w-1/6 min-w-[100px]">
            项目
          </th>
          <th scope="col"
            class="px-6 py-4 font-bold text-base w-1/4 min-w-[180px] text-blue-600 dark:text-blue-300 bg-blue-50/50 dark:bg-gray-800">
            年订阅许可 (年付 ¥29.9)
          </th>
          <th scope="col"
            class="px-6 py-4 font-bold text-base w-1/4 min-w-[180px] text-indigo-600 dark:text-indigo-300 bg-indigo-50/50 dark:bg-gray-800">
            买断制许可证 (终身¥49.9)
          </th>
          <th scope="col"
            class="px-6 py-4 font-bold text-base w-1/3 min-w-[200px] text-purple-600 dark:text-purple-300 bg-purple-50/50 dark:bg-gray-800">
            积分套餐 (如热门 ¥24 / 2000积分)
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-50/30 dark:bg-gray-800/40">
            用途
          </td>
          <td class="px-6 py-4 bg-blue-50/10 dark:bg-gray-800/30">
            软件核心授权：解锁桌面/网页版完整功能、多设备激活、免费更新、技术支持
          </td>
          <td class="px-6 py-4 bg-indigo-50/10 dark:bg-gray-800/30">
            软件核心授权：一次付费终身使用、多设备激活、免费更新、优先技术支持
          </td>
          <td class="px-6 py-4 bg-purple-50/10 dark:bg-gray-800/30">
            AI生成、图片存储等消费服务（永久有效）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-50/30 dark:bg-gray-800/40">
            必需性
          </td>
          <td class="px-6 py-4 bg-blue-50/10 dark:bg-gray-800/30">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
              必须
            </span>
            <span class="ml-2 text-gray-500 dark:text-gray-400 text-xs">（软件基础，软件本身的使用许可）</span>
          </td>
          <td class="px-6 py-4 bg-indigo-50/10 dark:bg-gray-800/30">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
              必须
            </span>
            <span class="ml-2 text-gray-500 dark:text-gray-400 text-xs">（软件基础，终身授权）</span>
          </td>
          <td class="px-6 py-4 bg-purple-50/10 dark:bg-gray-800/30">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              可选
            </span>
            <span class="ml-2 text-gray-500 dark:text-gray-400 text-xs">（内置AI用，自带密钥可免积分）</span>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-50/30 dark:bg-gray-800/40">
            附赠
          </td>
          <td class="px-6 py-4 bg-blue-50/10 dark:bg-gray-800/30">
            包含300积分（永久有效，用完为止）
          </td>
          <td class="px-6 py-4 bg-indigo-50/10 dark:bg-gray-800/30">
            包含300积分（永久有效，用完为止）
          </td>
          <td class="px-6 py-4 bg-purple-50/10 dark:bg-gray-800/30">
            无（但可单独购买）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-50/30 dark:bg-gray-800/40">
            有效期
          </td>
          <td class="px-6 py-4 bg-blue-50/10 dark:bg-gray-800/30">
            1年（可续费）
          </td>
          <td class="px-6 py-4 bg-indigo-50/10 dark:bg-gray-800/30">
            终身有效（无需续费）
          </td>
          <td class="px-6 py-4 bg-purple-50/10 dark:bg-gray-800/30">
            永久（积分用完可续购）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-50/30 dark:bg-gray-800/40">
            适用场景
          </td>
          <td class="px-6 py-4 bg-blue-50/10 dark:bg-gray-800/30">
            日常使用软件的所有功能
          </td>
          <td class="px-6 py-4 bg-indigo-50/10 dark:bg-gray-800/30">
            长期稳定使用，追求性价比与省心
          </td>
          <td class="px-6 py-4 bg-purple-50/10 dark:bg-gray-800/30">
            需要额外AI/存储时补充
          </td>
        </tr>
        <tr class="hover:bg-gray-50/30 dark:hover:bg-gray-800 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-50/30 dark:bg-gray-800/40">
            购买前提
          </td>
          <td class="px-6 py-4 bg-blue-50/10 dark:bg-gray-800/30">
            无
          </td>
          <td class="px-6 py-4 bg-indigo-50/10 dark:bg-gray-800/30">
            无
          </td>
          <td class="px-6 py-4 bg-purple-50/10 dark:bg-gray-800/30">
            需有效许可证（试用期不可买）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-50/30 dark:bg-gray-800/40">
            其他
          </td>
          <td class="px-6 py-4 bg-blue-50/10 dark:bg-gray-800/30">
            支持3台设备，优先技术支持

          </td>
          <td class="px-6 py-4 bg-indigo-50/10 dark:bg-gray-800/30">
            支持3台设备，优先技术支持
          </td>
          <td class="px-6 py-4 bg-purple-50/10 dark:bg-gray-800/30">
            灵活消费，按需使用
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// No script needed for this static table
</script>
