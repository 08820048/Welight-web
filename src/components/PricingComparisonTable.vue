<template>
  <div class="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
    <table class="w-full text-sm text-left text-gray-600">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
        <tr>
          <th scope="col" class="px-6 py-4 font-bold text-base w-1/6 min-w-[100px]">
            项目
          </th>
          <th scope="col" class="px-6 py-4 font-bold text-base w-1/4 min-w-[180px] text-blue-600 bg-blue-50/50">
            年订阅许可 (年付 ¥29.9)
          </th>
          <th scope="col" class="px-6 py-4 font-bold text-base w-1/4 min-w-[180px] text-indigo-600 bg-indigo-50/50">
            买断制许可证 (终身¥49.9)
          </th>
          <th scope="col" class="px-6 py-4 font-bold text-base w-1/3 min-w-[200px] text-purple-600 bg-purple-50/50">
            积分套餐 (如热门 ¥24 / 2000积分)
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/30">
            用途
          </td>
          <td class="px-6 py-4 bg-blue-50/10">
            软件核心授权：解锁桌面/网页版完整功能、多设备激活、免费更新、技术支持
          </td>
          <td class="px-6 py-4 bg-indigo-50/10">
            软件核心授权：一次付费终身使用、多设备激活、免费更新、优先技术支持
          </td>
          <td class="px-6 py-4 bg-purple-50/10">
            AI生成、图片存储等消费服务（永久有效）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/30">
            必需性
          </td>
          <td class="px-6 py-4 bg-blue-50/10">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              必须
            </span>
            <span class="ml-2 text-gray-500 text-xs">（软件基础，软件本身的使用许可）</span>
          </td>
          <td class="px-6 py-4 bg-indigo-50/10">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              必须
            </span>
            <span class="ml-2 text-gray-500 text-xs">（软件基础，终身授权）</span>
          </td>
          <td class="px-6 py-4 bg-purple-50/10">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              可选
            </span>
            <span class="ml-2 text-gray-500 text-xs">（内置AI用，自带密钥可免积分）</span>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/30">
            附赠
          </td>
          <td class="px-6 py-4 bg-blue-50/10">
            包含300积分（永久有效，用完为止）
          </td>
          <td class="px-6 py-4 bg-indigo-50/10">
            包含300积分（永久有效，用完为止）
          </td>
          <td class="px-6 py-4 bg-purple-50/10">
            无（但可单独购买）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/30">
            有效期
          </td>
          <td class="px-6 py-4 bg-blue-50/10">
            1年（可续费）
          </td>
          <td class="px-6 py-4 bg-indigo-50/10">
            终身有效（无需续费）
          </td>
          <td class="px-6 py-4 bg-purple-50/10">
            永久（积分用完可续购）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/30">
            适用场景
          </td>
          <td class="px-6 py-4 bg-blue-50/10">
            日常使用软件的所有功能
          </td>
          <td class="px-6 py-4 bg-indigo-50/10">
            长期稳定使用，追求性价比与省心
          </td>
          <td class="px-6 py-4 bg-purple-50/10">
            需要额外AI/存储时补充
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/30">
            购买前提
          </td>
          <td class="px-6 py-4 bg-blue-50/10">
            无
          </td>
          <td class="px-6 py-4 bg-indigo-50/10">
            无
          </td>
          <td class="px-6 py-4 bg-purple-50/10">
            需有效许可证（试用期不可买）
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900 bg-gray-50/30">
            其他
          </td>
          <td class="px-6 py-4 bg-blue-50/10">
            支持3台设备，优先技术支持

          </td>
          <td class="px-6 py-4 bg-indigo-50/10">
            支持3台设备，优先技术支持
          </td>
          <td class="px-6 py-4 bg-purple-50/10">
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
