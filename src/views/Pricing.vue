<template>
  <div class="relative min-h-screen bg-[#ffffff] dark:bg-[#141413]">
    <div class="min-h-screen text-[#141413] dark:text-[#ffffff] px-4 pt-20 pb-12 relative overflow-hidden"
      style="position: relative; z-index: 1;">
      <div class="product-pricing-field pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem]"
        aria-hidden="true"></div>
      <div class="max-w-6xl mx-auto">
        <!-- 服务状态提示横幅 -->
        <div v-if="serviceStatus && !isServiceCurrentlyAvailable" class="surface-soft mb-6 p-4 animate-fade-in-up"
          :class="{
            'bg-yellow-50/90': serviceStatus.statusCode === 'MAINTENANCE' || serviceStatus.statusCode === 'DEGRADED',
            'bg-red-50/90': serviceStatus.statusCode === 'FAULT'
          }">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 mt-0.5" :class="{
                'text-yellow-600': serviceStatus.statusCode === 'MAINTENANCE' || serviceStatus.statusCode === 'DEGRADED',
                'text-red-600': serviceStatus.statusCode === 'FAULT'
              }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <h3 class="text-sm font-medium" :class="{
                'text-yellow-800': serviceStatus.statusCode === 'MAINTENANCE' || serviceStatus.statusCode === 'DEGRADED',
                'text-red-800': serviceStatus.statusCode === 'FAULT'
              }">
                {{ serviceStatus.statusName }}
              </h3>
              <div class="mt-1 text-sm" :class="{
                'text-yellow-700': serviceStatus.statusCode === 'MAINTENANCE' || serviceStatus.statusCode === 'DEGRADED',
                'text-red-700': serviceStatus.statusCode === 'FAULT'
              }">
                <p>{{ serviceStatus.message }}</p>
                <p v-if="serviceStatus.estimatedRecoveryTime" class="mt-1">
                  预计恢复时间: {{ formatRecoveryTime(serviceStatus.estimatedRecoveryTime) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 购买弹窗 -->
        <div v-if="showBuyModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm modal-backdrop animate-fade-in">
          <div
            class="surface-soft modal-content animate-scale-in relative mx-auto max-h-[min(88vh,44rem)] w-full max-w-md overflow-y-auto rounded-[28px] p-6 text-gray-900 shadow-2xl sm:p-8 dark:text-gray-100">
            <button
              class="surface-stat absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              @click="closeBuyModal">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 class="text-balance mb-5 pr-10 text-2xl font-bold tracking-tight text-gray-900">Dodo 安全结账</h2>

            <!-- 产品信息 -->
            <div v-if="selectedProduct && !orderInfo"
              class="surface-soft-inner surface-soft-outline mb-5 rounded-2xl bg-gray-50/80 p-4 dark:bg-gray-800/40">
              <h3 class="font-bold text-gray-900">{{ selectedProduct.name }}</h3>
              <p class="text-pretty mb-3 text-sm text-gray-600">{{ selectedProduct.description }}</p>
              <div class="flex items-center justify-between">
                <span class="tabular-nums text-lg font-bold text-gray-900">{{ selectedProduct.priceRange ||
                  formatPrice(selectedProduct.price,
                  selectedProduct.currency) }}</span>
                <span v-if="selectedProduct.permanent"
                  class="surface-stat rounded-full px-2.5 py-1 text-xs text-gray-900 dark:text-gray-100">永久授权</span>
              </div>
              <div v-if="activeCampaigns && activeCampaigns.length > 0" class="text-xs text-gray-600 mt-2">
                当前活动：{{ activeCampaigns[0].title }}
              </div>
            </div>

            <div v-if="!orderInfo">
              <form @submit.prevent="submitBuy" class="space-y-4">
                <div
                  class="surface-soft-inner surface-soft-outline rounded-2xl bg-gray-50/80 p-4 text-sm text-gray-700 dark:bg-gray-800/40 dark:text-gray-200">
                  <p>将跳转到 Dodo Payments 托管结账页完成支付。支付完成后会自动回到本站成功页，并显示 Dodo 发放的许可证密钥。</p>
                  <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">最终价格、税费、可用支付方式和邮箱收集以 Dodo Checkout 页面为准。</p>
                </div>
                <!-- 服务条款和隐私政策提示 -->
                <div class="text-xs text-gray-500 text-center mb-3">
                  购买表示您已同意我们的
                  <router-link to="/terms" class="text-gray-900 hover:text-gray-700 underline">《服务条款》</router-link>
                  和
                  <router-link to="/privacy" class="text-gray-900 hover:text-gray-700 underline">《隐私政策》</router-link>
                </div>

                <button type="submit" :disabled="loading"
                  class="flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white shadow-[0_18px_40px_-24px_rgba(17,24,39,0.9)] transition-all duration-200 hover:bg-gray-800">
                  <span v-if="loading" class="animate-spin mr-2"><svg class="w-5 h-5" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                      <path d="M12 2v4" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                      <path d="M12 18v4" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                    </svg></span>
                  前往 Dodo Payments 结账
                </button>
                <div v-if="errorMsg" class="text-red-600 text-sm mt-2">{{ errorMsg }}</div>
              </form>
            </div>
            <div v-else>
              <div
                class="surface-soft-inner surface-soft-outline mb-4 rounded-2xl bg-gray-50/80 p-5 text-center dark:bg-gray-800/40">
                <div class="tabular-nums mb-1 text-lg font-bold text-gray-900">订单金额：¥{{ orderInfo.amount }} {{
                  orderInfo.currency }}
                </div>
                <div v-if="orderInfo && orderInfo.originalAmount && orderInfo.originalAmount !== orderInfo.amount"
                  class="text-sm text-gray-600 mb-1">
                  原价：¥{{ orderInfo.originalAmount }}
                </div>
                <div v-if="orderInfo && (orderInfo.appliedCampaignId || orderInfo.appliedCouponId)"
                  class="text-xs text-gray-500 mb-2">
                  <span v-if="orderInfo.appliedCampaignId">活动ID：{{ orderInfo.appliedCampaignId }}</span>
                  <span v-if="orderInfo.appliedCouponId" class="ml-2">优惠券ID：{{ orderInfo.appliedCouponId }}</span>
                </div>
                <div class="text-gray-600 mb-2">请使用微信扫码支付</div>
                <img :src="qrCodeImg" alt="支付二维码"
                  class="mx-auto h-40 w-40 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
                  v-if="qrCodeImg" />
                <div class="tabular-nums mt-3 text-xs text-gray-400">订单号：{{ orderInfo.orderNo }}</div>
                <div class="mt-4 rounded-2xl border px-3 py-2 text-sm font-medium" :class="{
                  'border-emerald-200 bg-emerald-50 text-emerald-700': orderStatus === 'PAID',
                  'border-red-200 bg-red-50 text-red-700': orderStatus === 'EXPIRED' || orderStatus === 'CANCELLED',
                  'border-gray-200 bg-gray-100 text-gray-900': orderStatus === 'PENDING'
                }">
                  <div v-if="orderStatus === 'PAID'">✅ 支付成功！正在获取许可证...</div>
                  <div v-else-if="orderStatus === 'EXPIRED'">⏰ 订单已过期，请重新下单</div>
                  <div v-else-if="orderStatus === 'CANCELLED'">❌ 订单已取消</div>
                  <div v-else>⏳ {{ getOrderStatusDescription(orderStatus) }} - 支付后自动获取许可证</div>
                </div>
              </div>
              <div v-if="licenseInfo"
                class="surface-soft-inner surface-soft-outline mt-4 rounded-2xl bg-gray-50/80 p-4 text-gray-900 dark:bg-gray-800/40">
                <div class="font-bold mb-3 flex items-center justify-between">
                  <span>许可证信息</span>
                  <span
                    class="surface-stat rounded-full px-2.5 py-1 text-xs text-gray-900 dark:text-gray-100">购买成功</span>
                </div>
                <div class="space-y-2 text-sm">
                  <div
                    class="surface-soft-outline flex items-center justify-between rounded-xl bg-white/90 p-3 dark:bg-gray-900/50">
                    <span>许可证密钥：</span>
                    <div class="flex items-center">
                      <span class="tabular-nums mr-2 font-mono text-gray-900">{{ licenseInfo.licenseKey }}</span>
                      <button @click="copyLicenseKey"
                        class="text-xs text-gray-900 transition-colors hover:text-gray-700">
                        复制
                      </button>
                    </div>
                  </div>
                  <div>产品：{{ licenseInfo.productCode }}</div>
                  <div>邮箱：{{ licenseInfo.customerEmail }}</div>
                  <div>状态：{{ licenseInfo.statusDescription }}</div>
                  <div v-if="licenseInfo.permanent">有效期：1年</div>
                  <div v-else>有效期至：{{ licenseInfo.expiredAt }}</div>
                  <div>最大激活数：{{ licenseInfo.maxActivations }}</div>
                  <div>当前激活数：{{ licenseInfo.currentActivations }}</div>
                </div>
                <div
                  class="surface-soft-outline mt-4 rounded-xl bg-gray-100/90 p-3 text-xs text-gray-900 dark:bg-gray-900/50 dark:text-gray-100">
                  💡 提示：许可证已发送到您的邮箱，请在桌面应用中输入许可证密钥使用
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 续费弹窗 -->
        <div v-if="showRenewModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm modal-backdrop animate-fade-in">
          <div
            class="surface-soft modal-content animate-scale-in relative mx-auto max-h-[min(88vh,44rem)] w-full max-w-md overflow-y-auto rounded-[28px] p-6 text-gray-900 shadow-2xl sm:p-8 dark:text-gray-100">
            <button
              class="surface-stat absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              @click="closeRenewModal">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 class="text-balance mb-5 pr-10 text-2xl font-bold tracking-tight text-gray-900">许可证续费</h2>

            <!-- 未创建订单时显示表单 -->
            <div v-if="!renewOrderInfo">
              <form @submit.prevent="submitRenewForm" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">许可证密钥</label>
                  <input v-model="renewForm.licenseKey" type="text" required placeholder="APEX-XXXX-XXXX-XXXX-XXXX"
                    class="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">客户邮箱</label>
                  <input v-model="renewForm.customerEmail" type="email" required placeholder="your@email.com"
                    class="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-200" />
                  <p class="text-xs text-gray-500 mt-1">请输入购买许可证时使用的邮箱</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">续费年数</label>
                  <select v-model.number="renewForm.renewYears"
                    class="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-200">
                    <option :value="1">1年 - ¥{{ getLicenseYearlyPrice(1) }}</option>
                    <option :value="2">2年 - ¥{{ getLicenseYearlyPrice(2) }}</option>
                    <option :value="3">3年 - ¥{{ getLicenseYearlyPrice(3) }}</option>
                    <option :value="4">4年 - ¥{{ getLicenseYearlyPrice(4) }}</option>
                    <option :value="5">5年 - ¥{{ getLicenseYearlyPrice(5) }}</option>
                  </select>
                </div>
                <div v-if="renewErrorMsg" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {{ renewErrorMsg }}
                </div>
                <button type="submit" :disabled="renewLoading"
                  class="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white shadow-[0_18px_40px_-24px_rgba(17,24,39,0.9)] transition-all duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                  {{ renewLoading ? '处理中...' : '立即续费' }}
                </button>
              </form>
            </div>

            <!-- 创建订单后显示支付信息 -->
            <div v-else>
              <div class="text-center">
                <div
                  class="surface-soft-inner surface-soft-outline mb-4 rounded-2xl bg-gray-50/80 p-5 dark:bg-gray-800/40">
                  <div class="surface-stat mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full">
                    <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">请扫码支付</h3>
                  <p class="tabular-nums text-sm text-gray-600 mb-4">
                    续费 {{ renewForm.renewYears }} 年 - ¥{{ getLicenseYearlyPrice(renewForm.renewYears) }}
                  </p>

                  <!-- 支付二维码 -->
                  <div v-if="renewQrCodeImg" class="mb-4 flex justify-center">
                    <img :src="renewQrCodeImg" alt="支付二维码"
                      class="h-64 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm" />
                  </div>

                  <!-- 订单状态 -->
                  <div class="surface-soft-outline mb-4 rounded-2xl bg-white/75 p-3 dark:bg-gray-900/50">
                    <div class="text-sm text-gray-600">
                      <div class="mb-1 flex justify-between gap-4">
                        <span>订单号：</span>
                        <span class="tabular-nums font-mono text-xs">{{ renewOrderInfo.orderNo }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>订单状态：</span>
                        <span class="font-semibold" :class="{
                          'text-yellow-600': renewOrderStatus === 'PENDING',
                          'text-green-600': renewOrderStatus === 'PAID',
                          'text-red-600': renewOrderStatus === 'EXPIRED' || renewOrderStatus === 'CANCELLED'
                        }">
                          {{ getOrderStatusDescription(renewOrderStatus) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- 支付成功提示 -->
                  <div v-if="renewOrderStatus === 'PAID'" class="rounded-2xl border border-green-200 bg-green-50 p-4">
                    <div class="flex items-center justify-center text-green-700 mb-2">
                      <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="font-semibold">续费成功！</span>
                    </div>
                    <p class="text-sm text-green-600">许可证有效期已延长，无需重新激活设备</p>
                  </div>

                  <!-- 等待支付提示 -->
                  <div v-else-if="renewOrderStatus === 'PENDING'" class="text-sm text-gray-500">
                    <div class="flex items-center justify-center mb-2">
                      <div
                        class="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1B365D] mr-2 dark:border-[#ffffff]">
                      </div>
                      <span>等待支付...</span>
                    </div>
                    <p>请使用微信扫描二维码完成支付</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近购买记录滚动展示：放在顶部菜单栏与定价线框之间 -->
        <!-- <RecentPurchasesTicker class="animate-fade-in-up delay-300" /> -->

        <!-- 标题区：定价与服务购买 -->
        <section class="relative mb-10 py-12 md:py-16 animate-fade-in-up delay-100">
          <div class="text-center relative max-w-3xl mx-auto px-4 md:px-8">
            <AnimatedUnderlineText text="Welight 授权"
              text-className="text-balance text-4xl font-medium tracking-normal text-[#141413] dark:text-[#ffffff]"
              underline-className="text-[#1B365D] dark:text-[#ffffff]" />
            <MagicText text="59 元立即解锁网页版与桌面端完整编辑体验" container-className="mt-6 justify-center"
              word-className="text-pretty text-lg text-[#666666] dark:text-[#666666]" />
          </div>

          <!-- 产品卡片区 -->
          <div v-if="loadingProducts" class="text-center py-12 animate-fade-in-up delay-600">
            <div
              class="animate-spin inline-block w-8 h-8 border-4 border-[#1B365D] border-t-transparent rounded-full dark:border-[#ffffff] dark:border-t-transparent">
            </div>
            <p class="mt-2 text-[#666666] animate-fade-in-up delay-700 dark:text-[#666666]">正在加载产品信息...</p>
          </div>

          <div v-else class="relative mt-10">
            <div class="mx-auto max-w-3xl px-4 text-center md:px-8">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#1B365D] dark:text-[#D0DCE9]">
                License
              </p>
              <div class="mt-5 flex items-start justify-center tabular-nums text-[#141413] dark:text-[#ffffff]">
                <span class="text-[clamp(3.4rem,14vw,8rem)] font-light leading-[0.9] tracking-normal">59 元</span>
              </div>

              <button @click="handleProductPurchase(primaryPricingProduct)" :disabled="!isServiceCurrentlyAvailable"
                :title="!isServiceCurrentlyAvailable ? getStatusTooltip(serviceStatus) : ''"
                class="mx-auto mt-6 flex min-h-12 w-full max-w-xs items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-transform duration-200 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-55"
                :class="getPricingPrimaryButtonClass(0, isServiceCurrentlyAvailable)">
                请作者喝一杯瑞幸美式
              </button>

              <div
                class="mx-auto mt-7 max-w-xl space-y-3 text-pretty text-sm leading-7 text-[#666666] dark:text-[#666666] md:text-base">
                <p>固定价格 <span class="font-semibold text-[#141413] dark:text-[#ffffff]">59 元</span>，最终税费与可用支付方式以支付页面展示为准。
                </p>
                <p>包含网页版与桌面端完整功能、主题更新、许可证发放与授权验证。</p>
              </div>

              <div
                class="mt-9 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#6b6a64] dark:text-[#D0DCE9]">
                <span>终身更新</span>
                <span class="hidden text-[#999999] sm:inline dark:text-[#817d72]">·</span>
                <span>2 台设备 / 许可证</span>
                <span class="hidden text-[#999999] sm:inline dark:text-[#817d72]">·</span>
                <span>支持银行卡、Apple Pay、<span class="font-medium text-[#08ca64]">微信</span>等</span>
              </div>
            </div>
          </div>
        </section>



        <!-- 购买须知与接口说明（线框模块：购买须知） -->
        <section class="mt-12 relative py-12 md:py-16 animate-fade-in-up delay-1000">
          <div class="relative max-w-3xl mx-auto px-4 md:px-8">
            <div class="pt-8">
              <h2 class="text-xl font-bold text-[#141413] dark:text-[#ffffff] mb-4 animate-fade-in-left delay-1100">
                购买须知
              </h2>
              <ul class="list-disc pl-6 text-[#333333] dark:text-[#666666] space-y-2 mb-6 text-sm">
                <li class="animate-fade-in-up delay-1200">购买后许可证由 Dodo Payments 自动发放，请妥善保存许可证密钥。</li>
                <li class="animate-fade-in-up delay-1300">每个许可证支持在指定数量的设备上使用。</li>
                <li class="animate-fade-in-up delay-1400">许可证密钥请在桌面应用中输入使用。</li>
                <li class="animate-fade-in-up delay-1450">许可证购买后，所有 AI 功能可以选择自己配置密钥使用，也可以选择配置自己的图床进行使用。</li>
                <li class="animate-fade-in-up delay-1500">反馈交流请通过QQ群联系开发者。</li>
                <li class="animate-fade-in-up delay-1550">
                  网页版地址：
                  <a href="https://waer.ltd/wl/" target="_blank" rel="noopener noreferrer"
                    class="underline text-[#1B365D] transition-colors hover:text-[#141413] dark:text-[#ffffff] dark:hover:text-[#E4ECF5]">
                    https://waer.ltd/wl/
                  </a>
                </li>
                <li class="animate-fade-in-up delay-1600">支付由 Dodo Payments 托管处理，固定价格 59 元，最终税费、币种换算与可用支付方式以结账页为准。</li>
                <li class="animate-fade-in-up delay-1700">如需退款请联系支持协助处理，能否退款以支付平台规则、交易时间和订单状态为准。</li>
                <li class="animate-fade-in-up delay-1700">默认内置的图片云存储服务和 AI 服务一样作为可选服务，您也可以选择配置自己的图床进行使用</li>
              </ul>

              <h2 class="text-xl font-bold text-[#141413] dark:text-[#ffffff] mb-4 animate-fade-in-left delay-1800">
                交流反馈
              </h2>
              <div class="text-sm animate-scale-in delay-1900">
                <span class="font-medium text-[#1B365D] dark:text-[#ffffff]">QQ群：</span>
                <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=ksnTYp3Puhc%2FmHe4BgNG73VDWykN%2FQxAV%2BfDI9TkZqY7a7TyiEVzbFoC4XUEbWeX&busi_data=eyJncm91cENvZGUiOiI0NzQ5MTk0NTgiLCJ0b2tlbiI6IlY2aUI0V3kvWFJhQUZrYXc5WFhLaHlHMzJsa0hlbFROdkFpTUVwcndyTDIzeWVKMU9SeDlvRmFja1pmRElQaFMiLCJ1aW4iOiIyMjE3MDIxNTYzIn0%3D&data=DAdDioP_YBpztOA2YNL5VvKvK2XKMOl4ZJKCZlzfp_ZVasT801z-5F7opkUw1NzwxPvEnGs5P_2y6djq489Tng&svctype=4&tempid=h5_group_info"
                  target="_blank"
                  class="text-[#1B365D] underline transition-colors hover:text-[#141413] dark:text-[#ffffff] dark:hover:text-[#E4ECF5]">
                  点击加入
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 积分套餐购买组件 -->
    <CreditsPurchase v-if="showCreditsModal" :preselected-package="preselectedCreditsPackage"
      @close="showCreditsModal = false; preselectedCreditsPackage = null" @success="handleCreditsPurchaseSuccess" />

    <!-- 成功提示Toast -->
    <div v-if="showToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import AnimatedUnderlineText from '@/components/ui/AnimatedUnderlineText.vue'
import MagicText from '@/components/ui/MagicText.vue'
import { useSEO, seoConfigs } from '@/composables/useSEO'
import {
  pollOrderStatus,
  getLicensesByEmail,
  renewLicense,
  formatPrice,
  getOrderStatusDescription
} from '../services/licenseService.js'
import {
  buildDodoCheckoutUrl,
  storePendingDodoCheckout
} from '../services/dodoPaymentsService.js'
import {
  getServiceStatus,
  isServiceAvailable,
  getStatusDisplayText,
  getStatusTooltip,
  createServiceStatusMonitor
} from '../services/serviceStatusService.js'
import CreditsPurchase from '../components/CreditsPurchase.vue'
import { previewCoupon } from '../services/couponService.js'
import { getActiveProductActivities } from '../services/campaignService.js'

// import RecentPurchasesTicker from '../components/RecentPurchasesTicker.vue'

// SEO配置
useSEO(seoConfigs.pricing)

/**
 * 动态加载撒花特效库
 */
function loadConfettiLibrary() {
  return new Promise((resolve, reject) => {
    console.log('🔍 检查confetti库状态，当前类型:', typeof window.confetti)
    if (typeof window.confetti !== 'undefined') {
      console.log('✅ confetti库已存在，无需重复加载')
      resolve()
      return
    }

    console.log('📦 开始动态加载confetti库...')
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js'
    script.onload = () => {
      console.log('✅ confetti库加载成功，类型:', typeof window.confetti)
      resolve()
    }
    script.onerror = (error) => {
      console.error('❌ confetti库加载失败:', error)
      reject(new Error('Failed to load confetti library'))
    }
    document.head.appendChild(script)
    console.log('📡 script标签已添加到head')
  })
}

/**
 * 触发支付成功撒花特效
 */
async function triggerPaymentSuccessConfetti() {
  try {
    console.log('🎯 开始触发支付成功撒花特效...')
    await loadConfettiLibrary()
    console.log('📦 撒花库加载完成，confetti类型:', typeof window.confetti)

    if (typeof window.confetti === 'undefined') {
      throw new Error('confetti库未正确加载')
    }

    console.log('🎊 执行撒花特效...')
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22C55E', '#4ADE80', '#BBF7D0', '#F1F5F9', '#10B981']
    })
    console.log('✅ 撒花特效执行完成')
  } catch (error) {
    console.error('❌ 撒花特效加载失败:', error)
    // 显示用户友好的错误提示
    alert('撒花特效加载失败，但支付已成功完成！')
  }
}

// 响应式数据
const DODO_LICENSE_PRODUCT = {
  id: 'dodo-welight-license',
  code: 'WELIGHT_DODO_LICENSE',
  name: 'Welight 标准授权',
  description: '解锁网页版与桌面端完整功能，仅需 59 元，购买后由 Dodo Payments 发放许可证密钥。',
  price: 59,
  priceRange: '59 元',
  currency: 'CNY',
  permanent: true,
  maxActivations: 2,
  features: [
    '终身更新',
    '2 台设备 / 许可证',
    '网页版和桌面端共用',
    '支持银行卡、Apple Pay、微信等'
  ]
}

const products = ref([])
const loadingProducts = ref(true)
const showBuyModal = ref(false)
const showCreditsModal = ref(false)
const preselectedCreditsPackage = ref(null)
const selectedProduct = ref(null)
const toastMessage = ref('')
const showToast = ref(false)
const buyForm = ref({
  customerEmail: '',
  customerName: '',
  couponCode: ''
})
const loading = ref(false)
const errorMsg = ref('')
const orderInfo = ref(null)
const orderStatus = ref('')
const licenseInfo = ref(null)
let pollingPromise = null

const qrCodeImg = ref('')

// 续费相关响应式数据
const showRenewModal = ref(false)
const renewForm = ref({
  licenseKey: '',
  customerEmail: '',
  renewYears: 1
})
const renewLoading = ref(false)
const renewErrorMsg = ref('')
const renewOrderInfo = ref(null)
const renewOrderStatus = ref('')
const renewQrCodeImg = ref('')
let renewPollingPromise = null

// 服务状态相关
const serviceStatus = ref(null)
let statusMonitor = null
const activeCampaigns = ref([])
const couponPreview = ref(null)
const couponPreviewLoading = ref(false)
const couponPreviewError = ref('')
// 自动试算防抖定时器
let couponPreviewDebounce = null

// 滚动动画相关
let scrollObserver = null

// 计算属性：服务是否可用
const isServiceCurrentlyAvailable = computed(() => {
  return isServiceAvailable(serviceStatus.value)
})

const primaryPricingProduct = computed(() => {
  return products.value[0] || DODO_LICENSE_PRODUCT
})

// 移除节日逻辑，恢复默认效果

// 获取购买按钮文本
function getPurchaseButtonText(product) {
  if (!isServiceCurrentlyAvailable.value) {
    return getStatusDisplayText(serviceStatus.value)
  }
  return '立即购买'
}

// 格式化恢复时间
function formatRecoveryTime(dateTimeStr) {
  if (!dateTimeStr) return ''

  try {
    const date = new Date(dateTimeStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
  } catch (error) {
    console.error('日期格式化失败:', error)
    return dateTimeStr
  }
}

// 初始化服务状态
async function initServiceStatus() {
  try {
    // 获取初始服务状态
    serviceStatus.value = await getServiceStatus()
    console.log('服务状态:', serviceStatus.value)

    // 创建状态监控器，每5分钟检查一次
    statusMonitor = createServiceStatusMonitor((newStatus) => {
      console.log('服务状态更新:', newStatus)
      serviceStatus.value = newStatus

      // 如果服务状态变为不可用，显示提示
      if (!isServiceAvailable(newStatus)) {
        showSuccessToast(`⚠️ ${newStatus.statusName}: ${newStatus.message}`)
      }
    }, 5 * 60 * 1000) // 5分钟检查一次

    // 启动监控
    await statusMonitor.start()
  } catch (error) {
    console.error('初始化服务状态失败:', error)
    // 失败时使用默认正常状态
    serviceStatus.value = {
      statusCode: 'NORMAL',
      statusName: '服务正常',
      available: true
    }
  }
}

// 生命周期钩子
onMounted(async () => {
  await loadProducts()
  // 初始化服务状态检查
  await initServiceStatus()
  try {
    activeCampaigns.value = await getActiveProductActivities()
  } catch (e) {
    console.warn('加载活动失败:', e)
  }
  // 初始化滚动动画
  initScrollAnimations()
  // 预加载撒花特效库
  loadConfettiLibrary().catch(console.error)
})

onUnmounted(() => {
  if (pollingPromise) {
    pollingPromise = null
  }
  // 停止服务状态监控
  if (statusMonitor) {
    statusMonitor.stop()
    statusMonitor = null
  }
  // 清理滚动监听器
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
})

// 加载产品列表
async function loadProducts() {
  try {
    loadingProducts.value = true
    products.value = [DODO_LICENSE_PRODUCT]
  } catch (error) {
    console.error('加载产品列表失败:', error)
    products.value = [DODO_LICENSE_PRODUCT]
  } finally {
    loadingProducts.value = false
  }
}

// 打开购买弹窗
function openBuyModal(product = null) {
  selectedProduct.value = product || products.value[0] // 默认选择第一个产品
  showBuyModal.value = true
}

// 统一的产品购买处理
function handleProductPurchase(product) {
  openBuyModal(product)
}

// 关闭弹窗时清理状态
function closeBuyModal() {
  showBuyModal.value = false
  selectedProduct.value = null
  buyForm.value = {
    customerEmail: '',
    customerName: '',
    couponCode: ''
  }
  loading.value = false
  errorMsg.value = ''
  orderInfo.value = null
  orderStatus.value = ''
  licenseInfo.value = null
  qrCodeImg.value = ''
  couponPreview.value = null
  couponPreviewError.value = ''
  couponPreviewLoading.value = false
  if (pollingPromise) {
    pollingPromise = null
  }
}

// 创建订单
const submitBuy = async () => {
  if (!selectedProduct.value) {
    errorMsg.value = '请选择要购买的产品'
    return
  }

  loading.value = true
  errorMsg.value = ''
  orderInfo.value = null
  orderStatus.value = ''
  licenseInfo.value = null
  qrCodeImg.value = ''

  try {
    storePendingDodoCheckout({
      productCode: selectedProduct.value.code,
      productName: selectedProduct.value.name,
      source: 'pricing'
    })
    window.location.href = buildDodoCheckoutUrl({ quantity: 1 })
  } catch (error) {
    errorMsg.value = error.message || '无法打开 Dodo 结账页，请稍后重试'
  } finally {
    loading.value = false
  }
}

async function handleCouponPreview() {
  if (!buyForm.value.couponCode || !buyForm.value.customerEmail || !selectedProduct.value) return
  couponPreviewLoading.value = true
  couponPreviewError.value = ''
  try {
    const data = await previewCoupon({
      couponCode: buyForm.value.couponCode.trim(),
      productCode: selectedProduct.value.code,
      customerEmail: buyForm.value.customerEmail.trim()
    })
    couponPreview.value = data
  } catch (e) {
    couponPreview.value = null
    // 统一中文提示
    const msg = e?.message || ''
    if (msg.includes('HTTP')) {
      couponPreviewError.value = msg
    } else if (msg.includes('Unexpected end') || msg.includes('json')) {
      couponPreviewError.value = '试算失败：服务器未返回有效数据，请稍后再试'
    } else {
      couponPreviewError.value = '试算失败：' + msg
    }
  } finally {
    couponPreviewLoading.value = false
  }
}

/**
 * 自动触发优惠券试算（带防抖）
 * 在用户输入优惠码或填写邮箱、选择产品后自动调用试算，无需手动点击
 */
function scheduleCouponPreview() {
  if (couponPreviewDebounce) {
    clearTimeout(couponPreviewDebounce)
    couponPreviewDebounce = null
  }
  couponPreviewDebounce = setTimeout(() => {
    handleCouponPreview()
  }, 400)
}

/**
 * 监听优惠码输入变化
 * - 有效条件：couponCode + customerEmail + selectedProduct
 * - 清空时：重置预览与错误提示
 */
watch(() => buyForm.value.couponCode, (code) => {
  const hasContext = !!(buyForm.value.customerEmail && selectedProduct.value)
  if (!code) {
    couponPreview.value = null
    couponPreviewError.value = ''
    if (couponPreviewDebounce) {
      clearTimeout(couponPreviewDebounce)
      couponPreviewDebounce = null
    }
    return
  }
  if (hasContext) {
    scheduleCouponPreview()
  }
})

/**
 * 监听邮箱变化
 * - 当邮箱有效且已有优惠码与产品时，自动试算
 */
watch(() => buyForm.value.customerEmail, (email) => {
  const hasCoupon = !!buyForm.value.couponCode
  if (email && hasCoupon && selectedProduct.value) {
    scheduleCouponPreview()
  }
})

/**
 * 监听选中产品变化
 * - 当产品变化且已有优惠码与邮箱时，自动试算
 */
watch(selectedProduct, (p) => {
  if (p && buyForm.value.couponCode && buyForm.value.customerEmail) {
    scheduleCouponPreview()
  }
})

// 开始轮询订单状态
async function startPollingOrderStatus(orderNo) {
  try {
    pollingPromise = pollOrderStatus(
      orderNo,
      (status) => {
        orderStatus.value = status.status
        // 更新订单信息
        if (orderInfo.value) {
          Object.assign(orderInfo.value, status)
        }
      },
      3000, // 3秒轮询一次
      200   // 最多轮询200次（10分钟）
    )

    const finalStatus = await pollingPromise

    if (finalStatus.status === 'PAID') {
      // 支付成功，获取许可证信息
      await fetchLicenseInfo(buyForm.value.customerEmail)
    }

  } catch (error) {
    console.error('轮询订单状态失败:', error)
    errorMsg.value = '订单状态查询超时，请手动刷新页面查看'
  } finally {
    pollingPromise = null
  }
}

// 获取许可证信息
async function fetchLicenseInfo(customerEmail) {
  try {
    console.log('🔍 开始获取许可证信息，邮箱:', customerEmail)
    const licenses = await getLicensesByEmail(customerEmail)
    console.log('📄 获取到的许可证数量:', licenses ? licenses.length : 0)

    if (licenses && licenses.length > 0) {
      // 获取最新的许可证（按创建时间排序，取第一个）
      const latestLicense = licenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      licenseInfo.value = latestLicense
      console.log('✅ 许可证信息已更新:', latestLicense.licenseKey)

      // 支付成功，触发撒花特效
      console.log('⏰ 500ms后将触发撒花特效...')
      setTimeout(() => {
        console.log('🎊 开始执行撒花特效')
        triggerPaymentSuccessConfetti()
      }, 500) // 延迟500ms让用户看到许可证信息后再撒花
    } else {
      console.log('⚠️ 未找到有效的许可证')
    }
  } catch (error) {
    console.error('❌ 获取许可证信息失败:', error)
  }
}

// 复制许可证密钥
function copyLicenseKey() {
  if (licenseInfo.value && licenseInfo.value.licenseKey) {
    navigator.clipboard.writeText(licenseInfo.value.licenseKey).then(() => {
      // 可以添加一个提示
      console.log('许可证密钥已复制到剪贴板')
    }).catch(err => {
      console.error('复制失败:', err)
    })
  }
}

// 判断是否是许可证产品
function isLicenseProduct(product) {
  return product.code && (product.code.includes('WELIGHT') || product.code.includes('LICENSE')) && !product.code.includes('CREDITS')
}

function getProductCardSubtitle(product) {
  const code = product?.code || ''
  if (code.includes('CREDITS')) return '适合高频 AI 与云服务使用'
  if (code.includes('MONTHLY')) return '短期密集使用的灵活选择'
  if (code.includes('AI_SERVICE')) return 'AI 服务月度套餐'
  if (code.includes('CLOUD_STORAGE')) return '云端存储月度套餐'
  if (isLicenseProduct(product)) return '解锁全部功能的长期方案'
  return '灵活购买，随用随开'
}

/**
 * 获取产品原价：用于在价格上方显示灰色的“原价¥xx”
 *
 * 仅在产品存在优惠（当前价 < 原价）时显示
 */
function getOriginalPrice(product) {
  if (!product) return null

  const base = (typeof product.originalPrice === 'number' && product.originalPrice > 0)
    ? product.originalPrice
    : product.price
  const current = getCurrentPrice(product)

  if (typeof base === 'number' && typeof current === 'number' && current > 0 && current < base) {
    return base
  }
  return null
}

// 计算折扣百分比
function getDiscountPercent(product) {
  const current = getCurrentPrice(product)
  const originalPrice = getOriginalPrice(product)
  if (!originalPrice || !current || originalPrice <= current) {
    return null
  }
  // 按“折扣率”计算：当前价 / 原价，转为“x.x折”
  const zhe = Math.round((current / originalPrice) * 100) / 10
  return zhe
}

/**
 * 将金额比值格式化为“x.x折”
 * @param {number} amount 实际价格
 * @param {number} base 原价
 * @returns {string|null} x.x折 文案
 */
function formatFoldRateByAmounts(amount, base) {
  if (typeof amount !== 'number' || typeof base !== 'number' || !base) return null
  const rate = amount / base
  return (rate * 10).toFixed(1)
}

/**
 * 将折扣率格式化为“x.x折”
 * @param {number} rate 折扣率（0~1）
 * @returns {string|null} x.x折 文案
 */
function formatFoldRateFromRate(rate) {
  if (typeof rate !== 'number') return null
  return (rate * 10).toFixed(1)
}
// 计算月卡折合天价格
function getDailyPrice(product) {
  if (!product.code.includes('MONTHLY')) {
    return null
  }
  // 按30天计算
  const dailyPrice = (product.price / 30).toFixed(2)
  return dailyPrice
}

/**
 * 价格安全截断：保留两位小数并设置下限为 0.01
 * @param {number|string} val 原始价格
 * @returns {number} 处理后的价格
 */
function clampPrice(val) {
  const v = typeof val === 'number' ? val : parseFloat(val)
  if (Number.isNaN(v)) return 0
  return Math.max(0.01, parseFloat(v.toFixed(2)))
}

function toArray(val) {
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val)
      return Array.isArray(parsed) ? parsed : [val]
    } catch {
      return val
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }
  return []
}

/**
 * 判断规则是否命中指定产品
 * @param {object} rule 活动规则（包含 matchType/matchValue）
 * @param {object} product 产品对象（包含 code）
 * @returns {boolean} 是否命中
 */
function ruleMatchesProduct(rule, product) {
  if (!rule || !product || !product.code) return false
  const code = product.code
  const type = rule.matchType
  const value = rule.matchValue || ''
  if (type === 'ALL_PRODUCTS') return true
  if (type === 'PRODUCT_CODE_PREFIX') return value ? code.startsWith(value) : false
  if (type === 'PRODUCT_CODE_EXACT') return value ? code === value : false
  return false
}

/**
 * 将规则应用到价格（支持折扣或直降）
 * @param {number} price 原始价格
 * @param {object} rule 活动规则（包含 discountType/discountRate/reductionAmount）
 * @returns {number} 应用规则后的价格
 */
function applyRuleToPrice(price, rule) {
  if (!rule || typeof price !== 'number') return price
  if (rule.discountType === 'DISCOUNT_RATE' && typeof rule.discountRate === 'number') {
    return clampPrice(price * rule.discountRate)
  }
  if (rule.discountType === 'DIRECT_REDUCTION' && typeof rule.reductionAmount === 'number') {
    return clampPrice(price - rule.reductionAmount)
  }
  return price
}

/**
 * 计算某产品命中的“最佳活动规则”（使价格最低）
 * @param {object} product 产品对象
 * @returns {{activity: object, rule: object, finalPrice: number}|null}
 */
function getBestAppliedActivityForProduct(product) {
  if (!product) return null
  const base = (typeof product.originalPrice === 'number' && product.originalPrice > 0)
    ? product.originalPrice
    : product.price
  let best = null
  for (const act of activeCampaigns.value || []) {
    const rules = Array.isArray(act.rules) ? act.rules : []
    for (const r of rules) {
      if (r.enabled === false) continue
      if (!ruleMatchesProduct(r, product)) continue
      const newPrice = applyRuleToPrice(base, r)
      if (newPrice < base && (!best || newPrice < best.finalPrice)) {
        best = { activity: act, rule: r, finalPrice: newPrice }
      }
    }
  }
  return best
}

function getCurrentPrice(product) {
  if (!product) return null
  const base = (typeof product.originalPrice === 'number' && product.originalPrice > 0)
    ? product.originalPrice
    : product.price

  const candidates = []

  if (typeof base === 'number' && base > 0) {
    candidates.push(base)
  }

  if (typeof product.finalPrice === 'number' && typeof base === 'number' && product.finalPrice > 0) {
    candidates.push(product.finalPrice)
  }

  if (typeof product.currentPrice === 'number' && typeof base === 'number' && product.currentPrice > 0) {
    candidates.push(product.currentPrice)
  }

  const applied = getBestAppliedActivityForProduct(product)
  if (applied && typeof applied.finalPrice === 'number') {
    candidates.push(applied.finalPrice)
  }

  const valid = candidates
    .filter((p) => typeof p === 'number' && p > 0 && (typeof base !== 'number' || p <= base))
    .sort((a, b) => a - b)

  return valid.length > 0 ? valid[0] : base
}

function isProductInActiveCampaign(product) {
  if (
    product &&
    (product.appliedCampaignId != null ||
      (typeof product.finalPrice === 'number' &&
        typeof product.price === 'number' &&
        product.finalPrice > 0 &&
        product.finalPrice < product.price) ||
      (typeof product.currentPrice === 'number' &&
        typeof product.price === 'number' &&
        product.currentPrice > 0 &&
        product.currentPrice < product.price))
  ) {
    return true
  }
  const applied = getBestAppliedActivityForProduct(product)
  return !!applied
}

function getActiveCampaignName(product) {
  if (!product) return '活动中'
  const applied = getBestAppliedActivityForProduct(product)
  const actFromRule = applied?.activity
  const nameFromRule =
    actFromRule?.displayName ||
    actFromRule?.name ||
    actFromRule?.title ||
    actFromRule?.activityName ||
    actFromRule?.campaignName
  if (nameFromRule) return nameFromRule

  const id = product.appliedCampaignId
  if (id != null) {
    const sid = String(id)
    const act = (activeCampaigns.value || []).find((a) => a && (String(a.id) === sid || String(a.code) === sid))
    const name = act?.displayName || act?.name || act?.title || act?.activityName || act?.campaignName
    if (name) return name
  }

  for (const act of activeCampaigns.value || []) {
    const name = act?.displayName || act?.name || act?.title || act?.activityName || act?.campaignName
    if (!name) continue

    const rules = Array.isArray(act?.rules) ? act.rules : []
    for (const r of rules) {
      if (r?.enabled === false) continue
      if (ruleMatchesProduct(r, product)) return name
    }

    const codes = toArray(act?.productCodes || act?.targetProductCodes || act?.targetProducts)
    if (codes.includes(product.code)) return name
  }

  return '活动中'
}

function getPricingRibbonText(product) {
  if (!product) return ''
  if (isProductInActiveCampaign(product)) return '限时活动'
  if (product.code?.includes('CREDITS')) return '可选增值'
  if (product.isEnterprise) return '高性价比'
  if (isLicenseProduct(product)) return '最受欢迎'
  return '限时8.8折'
}

function getPricingPrimaryButtonClass(index, enabled) {
  if (!enabled) return 'cursor-not-allowed border-[#e5e5e5] bg-[#f3f3f3] text-[#999999] dark:border-[#44433f] dark:bg-[#242421] dark:text-[#999999]'
  void index
  return 'border-[#1B365D] bg-[#1B365D] text-[#ffffff] hover:bg-[#142947] dark:border-[#ffffff] dark:bg-[#ffffff] dark:text-[#142947] dark:hover:bg-[#E4ECF5]'
}

function getPricingSecondaryButtonClass(enabled) {
  if (!enabled) return 'cursor-not-allowed border-[#e5e5e5] bg-[#f3f3f3] text-[#999999] dark:border-[#44433f] dark:bg-[#242421] dark:text-[#999999]'
  return 'border-[#e5e5e5] text-[#141413] hover:bg-[#f3f3f3] dark:border-[#55554f] dark:text-[#ffffff] dark:hover:bg-[#3a3a36]'
}


// 获取许可证年度价格（用于续费）
function getLicenseYearlyPrice(years = 1) {
  // 从products列表中找到许可证产品
  const licenseProduct = products.value.find(p => isLicenseProduct(p))
  if (!licenseProduct) {
    return '0.00' // 如果找不到许可证产品，返回默认值
  }
  const totalPrice = (licenseProduct.price * years).toFixed(2)
  return totalPrice
}

// ==================== 续费相关函数 ====================

// 打开续费弹窗
function openRenewModal() {
  showRenewModal.value = true
}

// 关闭续费弹窗并清理状态
function closeRenewModal() {
  showRenewModal.value = false
  renewForm.value = {
    licenseKey: '',
    customerEmail: '',
    renewYears: 1
  }
  renewLoading.value = false
  renewErrorMsg.value = ''
  renewOrderInfo.value = null
  renewOrderStatus.value = ''
  renewQrCodeImg.value = ''
  if (renewPollingPromise) {
    renewPollingPromise = null
  }
}

// 提交续费表单
async function submitRenewForm() {
  renewLoading.value = true
  renewErrorMsg.value = ''
  renewOrderInfo.value = null
  renewOrderStatus.value = ''
  renewQrCodeImg.value = ''

  try {
    const renewData = {
      licenseKey: renewForm.value.licenseKey.trim(),
      customerEmail: renewForm.value.customerEmail.trim(),
      renewYears: renewForm.value.renewYears,
      remark: `Web端续费 - ${renewForm.value.renewYears}年`
    }

    const result = await renewLicense(renewData)
    renewOrderInfo.value = result.order
    renewOrderStatus.value = result.order.status

    // 使用后端提供的二维码图片接口
    if (result.order && result.order.orderNo) {
      renewQrCodeImg.value = `https://ilikexff.cn/api/payment/orders/${result.order.orderNo}/qrcode-image`
    }

    // 开始轮询订单状态
    startRenewPollingOrderStatus(result.order.orderNo)

  } catch (error) {
    renewErrorMsg.value = error.message || '续费订单创建失败，请稍后重试'
  } finally {
    renewLoading.value = false
  }
}

// 开始轮询续费订单状态
function startRenewPollingOrderStatus(orderNo) {
  renewPollingPromise = pollOrderStatus(
    orderNo,
    (status) => {
      renewOrderStatus.value = status.status
    },
    3000,
    200
  ).then(async (finalStatus) => {
    if (finalStatus.status === 'PAID') {
      // 续费支付成功，触发撒花特效
      setTimeout(() => {
        triggerPaymentSuccessConfetti()
      }, 500)
    }
  }).catch((error) => {
    console.error('轮询续费订单状态失败:', error)
    renewErrorMsg.value = '订单状态查询超时，请稍后手动查看'
  }).finally(() => {
    renewPollingPromise = null
  })
}

// 获取积分套餐的积分数量
function getCreditsAmountLocal(product) {
  if (!product) return 0

  // 如果产品直接有credits字段（新的积分套餐数据结构）
  if (product.credits) {
    return product.credits
  }

  // 兼容旧的数据结构
  if (!product.code.includes('CREDITS') || !product.metadata) {
    return 0
  }

  try {
    const metadata = JSON.parse(product.metadata)
    return metadata.credits || 0
  } catch (error) {
    console.error('解析积分套餐metadata失败:', error)
    return 0
  }
}

// 初始化滚动动画
function initScrollAnimations() {
  // 创建 Intersection Observer
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in-view')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // 观察所有需要动画的元素
  setTimeout(() => {
    // 观察 scroll-animate 元素
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate')
    scrollAnimateElements.forEach((el) => {
      scrollObserver.observe(el)
    })

    // 观察新的动画类名元素
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in, .animate-fade-in-left, .animate-enhanced-bounce')
    animateElements.forEach((el) => {
      scrollObserver.observe(el)
    })
  }, 100)
}

// 统一的产品购买方法
async function purchaseProduct(product) {
  try {
    if (product.code.includes('CREDITS')) {
      // 积分套餐购买流程 - 将当前产品作为预选套餐传入
      preselectedCreditsPackage.value = {
        id: product.id,
        packageCode: product.code,
        packageName: product.packageName || product.name,
        packageDescription: product.packageDescription || product.description,
        credits: product.credits,
        originalPrice: product.originalPrice || product.price,
        currentPrice: product.currentPrice || product.price,
        discount: product.discount || 0,
        packageType: product.packageType || 'STANDARD',
        isActive: product.isActive,
        displayOrder: product.displayOrder || 0,
        features: product.features || [`${product.credits}积分`, '适用于所有AI服务', '永不过期'],
        costPerCredit: product.costPerCredit || 0,
        recommendedFor: product.recommendedFor || '用户',
        isPopular: product.isPopular || false
      }
      showCreditsModal.value = true
    } else {
      // 许可证产品，使用许可证购买流程
      openBuyModal(product)
    }
  } catch (error) {
    console.error('购买失败:', error)
    alert(`购买失败：${error.message}`)
  }
}



// 处理积分套餐购买成功
function handleCreditsPurchaseSuccess(result) {
  showCreditsModal.value = false

  // 显示成功消息
  const message = `🎉 积分购买成功！获得 ${result.credits || 0} 积分`

  // 显示撒花特效
  loadConfettiLibrary().then(() => {
    if (typeof window.confetti !== 'undefined') {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }).catch(error => {
    console.warn('撒花特效加载失败:', error)
  })

  // 显示现代化的成功提示
  showSuccessToast(message)
}

// 显示成功提示toast
function showSuccessToast(message) {
  toastMessage.value = message
  showToast.value = true

  // 3秒后自动隐藏
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}








</script>

<style scoped>
/* 现代化卡片动画与样式 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}

/* Toast动画 */
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

/* 渐进式动画样式 */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scroll-animate.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
}

.scroll-animate.scale-up {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.scroll-animate.animate-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 新的动画类名触发机制 */
.animate-fade-in-up.animate-in-view {
  opacity: 1;
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-scale-in.animate-in-view {
  opacity: 1;
  animation: scaleIn 0.8s ease-out forwards;
}

.animate-fade-in-left.animate-in-view {
  opacity: 1;
  animation: fadeInLeft 0.8s ease-out forwards;
}

.animate-enhanced-bounce.animate-in-view {
  opacity: 1;
  animation: enhanced-bounce 1.5s ease-in-out;
}

/* 动画关键帧定义 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enhanced-bounce {

  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }

  70% {
    transform: translate3d(0, -4px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* 卡片内部渐隐效果 */
.ai-service-gradient-overlay {
  background: linear-gradient(to bottom, rgba(27, 54, 93, 0.14) 0%, rgba(27, 54, 93, 0.07) 40%, transparent 70%);
}

.cloud-storage-gradient-overlay {
  background: linear-gradient(to bottom, rgba(27, 54, 93, 0.14) 0%, rgba(27, 54, 93, 0.07) 40%, transparent 70%);
}

.permanent-gradient-overlay {
  background: linear-gradient(to bottom, rgba(27, 54, 93, 0.14) 0%, rgba(27, 54, 93, 0.07) 40%, transparent 70%);
}

.pricing-border-trail {
  --pricing-card-radius: 16px;
  --trail-length: 260px;
  --trail-thickness: 36px;
  --trail-blur: 4px;
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
  border: 10px solid transparent;
  overflow: hidden;
  -webkit-mask:
    linear-gradient(#000 0 0) padding-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) padding-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
}

.pricing-border-trail__segment {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: 9999px;
  animation-duration: var(--trail-duration, 5.2s);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: var(--trail-delay, 0s);
  will-change: left, right, top, bottom, opacity;
}

.pricing-border-trail__segment::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  filter: blur(var(--trail-blur)) saturate(1.25);
  opacity: 1;
  transform: translateZ(0);
}

.pricing-border-trail__segment--top,
.pricing-border-trail__segment--bottom {
  width: var(--trail-length);
  height: var(--trail-thickness);
}

.pricing-border-trail__segment--right,
.pricing-border-trail__segment--left {
  width: var(--trail-thickness);
  height: var(--trail-length);
}

.pricing-border-trail__segment--top {
  top: 0;
  left: calc(-1 * var(--trail-length));
  background: linear-gradient(90deg,
      rgba(27, 54, 93, 0) 0%,
      rgba(27, 54, 93, 0) 18%,
      rgba(45, 90, 138, 0.72) 34%,
      rgba(27, 54, 93, 0.95) 50%,
      rgba(45, 90, 138, 0.72) 66%,
      rgba(27, 54, 93, 0) 82%,
      rgba(27, 54, 93, 0) 100%);
  animation-name: pricing-trail-top;
}

.pricing-border-trail__segment--right {
  top: calc(-1 * var(--trail-length));
  right: 0;
  background: linear-gradient(180deg,
      rgba(27, 54, 93, 0) 0%,
      rgba(27, 54, 93, 0) 18%,
      rgba(45, 90, 138, 0.72) 34%,
      rgba(27, 54, 93, 0.95) 50%,
      rgba(45, 90, 138, 0.72) 66%,
      rgba(27, 54, 93, 0) 82%,
      rgba(27, 54, 93, 0) 100%);
  animation-name: pricing-trail-right;
}

.pricing-border-trail__segment--bottom {
  bottom: 0;
  right: calc(-1 * var(--trail-length));
  background: linear-gradient(90deg,
      rgba(27, 54, 93, 0) 0%,
      rgba(27, 54, 93, 0) 18%,
      rgba(45, 90, 138, 0.72) 34%,
      rgba(27, 54, 93, 0.95) 50%,
      rgba(45, 90, 138, 0.72) 66%,
      rgba(27, 54, 93, 0) 82%,
      rgba(27, 54, 93, 0) 100%);
  animation-name: pricing-trail-bottom;
}

.pricing-border-trail__segment--left {
  bottom: calc(-1 * var(--trail-length));
  left: 0;
  background: linear-gradient(180deg,
      rgba(27, 54, 93, 0) 0%,
      rgba(27, 54, 93, 0) 18%,
      rgba(45, 90, 138, 0.72) 34%,
      rgba(27, 54, 93, 0.95) 50%,
      rgba(45, 90, 138, 0.72) 66%,
      rgba(27, 54, 93, 0) 82%,
      rgba(27, 54, 93, 0) 100%);
  animation-name: pricing-trail-left;
}

@keyframes pricing-trail-top {
  0% {
    opacity: 0;
    left: calc(-1 * var(--trail-length));
  }

  2% {
    opacity: 1;
  }

  22% {
    opacity: 1;
    left: 100%;
  }

  25% {
    opacity: 0;
    left: 100%;
  }

  100% {
    opacity: 0;
    left: calc(-1 * var(--trail-length));
  }
}

@keyframes pricing-trail-right {
  0% {
    opacity: 0;
    top: calc(-1 * var(--trail-length));
  }

  24% {
    opacity: 0;
    top: calc(-1 * var(--trail-length));
  }

  27% {
    opacity: 1;
  }

  47% {
    opacity: 1;
    top: 100%;
  }

  50% {
    opacity: 0;
    top: 100%;
  }

  100% {
    opacity: 0;
    top: calc(-1 * var(--trail-length));
  }
}

@keyframes pricing-trail-bottom {
  0% {
    opacity: 0;
    right: calc(-1 * var(--trail-length));
  }

  49% {
    opacity: 0;
    right: calc(-1 * var(--trail-length));
  }

  52% {
    opacity: 1;
  }

  72% {
    opacity: 1;
    right: 100%;
  }

  75% {
    opacity: 0;
    right: 100%;
  }

  100% {
    opacity: 0;
    right: calc(-1 * var(--trail-length));
  }
}

@keyframes pricing-trail-left {
  0% {
    opacity: 0;
    bottom: calc(-1 * var(--trail-length));
  }

  74% {
    opacity: 0;
    bottom: calc(-1 * var(--trail-length));
  }

  77% {
    opacity: 1;
  }

  97% {
    opacity: 1;
    bottom: 100%;
  }

  100% {
    opacity: 0;
    bottom: 100%;
  }
}

:global(.dark) .pricing-border-trail__segment--top,
:global(.dark) .pricing-border-trail__segment--bottom {
  background: linear-gradient(90deg,
      rgba(208, 220, 233, 0) 0%,
      rgba(208, 220, 233, 0) 18%,
      rgba(208, 220, 233, 0.6) 34%,
      rgba(228, 236, 245, 0.9) 50%,
      rgba(208, 220, 233, 0.6) 66%,
      rgba(208, 220, 233, 0) 82%,
      rgba(208, 220, 233, 0) 100%);
}

:global(.dark) .pricing-border-trail__segment--right,
:global(.dark) .pricing-border-trail__segment--left {
  background: linear-gradient(180deg,
      rgba(208, 220, 233, 0) 0%,
      rgba(208, 220, 233, 0) 18%,
      rgba(208, 220, 233, 0.6) 34%,
      rgba(228, 236, 245, 0.9) 50%,
      rgba(208, 220, 233, 0.6) 66%,
      rgba(208, 220, 233, 0) 82%,
      rgba(208, 220, 233, 0) 100%);
}

/* 产品卡片丝滑悬停效果 */
.product-card {
  transform: translateY(0) scale(1);
  transition:
    transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.28s ease-out,
    filter 0.22s ease-out;
  will-change: transform, box-shadow, filter;
  backface-visibility: hidden;
}

.product-card:hover {
  transform: translateY(-6px) scale(1.006);
  box-shadow:
    0 0 0 1px rgba(27, 54, 93, 0.18),
    0 6px 28px rgba(20, 20, 19, 0.06);
  filter: brightness(1.005);
}





/* 渐隐效果层的hover增强 */
.product-card:hover .ai-service-gradient-overlay {
  background: linear-gradient(to bottom, rgba(27, 54, 93, 0.18) 0%, rgba(27, 54, 93, 0.09) 40%, transparent 70%);
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-card:hover .cloud-storage-gradient-overlay {
  background: linear-gradient(to bottom, rgba(27, 54, 93, 0.18) 0%, rgba(27, 54, 93, 0.09) 40%, transparent 70%);
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-card:hover .permanent-gradient-overlay {
  background: linear-gradient(to bottom, rgba(27, 54, 93, 0.18) 0%, rgba(27, 54, 93, 0.09) 40%, transparent 70%);
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 移除圣诞帽临时装饰，恢复默认样式 */

/* 为渐隐效果层添加基础过渡 */
.ai-service-gradient-overlay,
.cloud-storage-gradient-overlay,
.permanent-gradient-overlay {
  transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 新购买按钮样式 */
.btn-container {
  --btn-color: #d8ff7c;
  --corner-color: #0002;
  --corner-dist: 24px;
  --corner-multiplier: 1.5;
  --timing-function: cubic-bezier(0, 0, 0, 2.5);
  --duration: 250ms;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 黑色按钮 - 许可证 */
.btn-container-blue {
  --btn-color: #000000;
}

/* 黑色按钮 - AI服务 */
.btn-container-orange {
  --btn-color: #000000;
}

.btn {
  position: relative;
  min-width: 160px;
  min-height: calc(var(--corner-dist) * 2);
  border-radius: 16px;
  border: none;
  padding: 0.25em 1em;

  background: linear-gradient(#fff2, #0001), var(--btn-color);
  box-shadow:
    1px 1px 2px -1px #fff inset,
    0 2px 1px #00000010,
    0 4px 2px #00000010,
    0 8px 4px #00000010,
    0 16px 8px #00000010,
    0 32px 16px #00000010;

  transition:
    transform var(--duration) var(--timing-function),
    filter var(--duration) var(--timing-function);
  -webkit-transition:
    transform var(--duration) var(--timing-function),
    -webkit-filter var(--duration) var(--timing-function);

  cursor: pointer;
}

.btn-drawer {
  position: absolute;
  display: flex;
  justify-content: center;

  min-height: 32px;
  border-radius: 16px;
  border: none;
  padding: 0.25em 1em;
  font-size: 0.8em;
  font-weight: 600;
  font-family: "Poppins", monospace;
  color: #0009;

  background: linear-gradient(#fff2, #0001), var(--btn-color);
  background-color: #fbff13;
  opacity: 0;

  transition:
    transform calc(0.5 * var(--duration)) ease,
    filter var(--duration) var(--timing-function),
    opacity calc(0.5 * var(--duration)) ease;
  -webkit-transition:
    transform calc(0.5 * var(--duration)) ease,
    -webkit-filter var(--duration) var(--timing-function),
    opacity calc(0.5 * var(--duration)) ease;
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

.transition-top {
  top: 0;
  left: 0;
  border-radius: 12px 12px 0 0;
  align-items: start;
}

.transition-bottom {
  bottom: 0;
  right: 0;
  border-radius: 0 0 12px 12px;
  align-items: end;
}

.btn-text {
  display: inline-block;

  font-size: 1.25em;
  font-family: "Syne", "Poppins", "Inter", sans-serif;
  font-weight: 600;
  color: #ffffff;

  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  -webkit-filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));

  transition:
    transform var(--duration) var(--timing-function),
    filter var(--duration) var(--timing-function),
    color var(--duration) var(--timing-function);
  -webkit-transition:
    transform var(--duration) var(--timing-function),
    -webkit-filter var(--duration) var(--timing-function),
    color var(--duration) var(--timing-function);
}

.btn-corner {
  position: absolute;
  width: 32px;

  fill: none;
  stroke: var(--corner-color);

  transition:
    transform var(--duration) var(--timing-function),
    filter var(--duration) var(--timing-function);
  -webkit-transition:
    transform var(--duration) var(--timing-function),
    -webkit-filter var(--duration) var(--timing-function);
}

.btn-corner:nth-of-type(1) {
  top: 0;
  left: 0;
  transform: translate(calc(-1 * var(--corner-dist)),
      calc(-1 * var(--corner-dist))) rotate(90deg);
}

.btn-corner:nth-of-type(2) {
  top: 0;
  right: 0;
  transform: translate(var(--corner-dist), calc(-1 * var(--corner-dist))) rotate(180deg);
}

.btn-corner:nth-of-type(3) {
  bottom: 0;
  right: 0;
  transform: translate(var(--corner-dist), var(--corner-dist)) rotate(-90deg);
}

.btn-corner:nth-of-type(4) {
  bottom: 0;
  left: 0;
  transform: translate(calc(-1 * var(--corner-dist)), var(--corner-dist)) rotate(0deg);
}

.btn-container:has(.btn:hover),
.btn-container:has(.btn:focus-visible) {
  .btn {
    transform: scale(1.05);
    filter: drop-shadow(0 16px 16px #0002);
    -webkit-filter: drop-shadow(0 16px 16px #0002);
  }

  .transition-top {
    transform: translateY(-24px) rotateZ(4deg);
    filter: blur(0px);
    -webkit-filter: blur(0px);
    opacity: 1;
  }

  .transition-bottom {
    transform: translateY(24px) rotateZ(4deg);
    filter: blur(0px);
    -webkit-filter: blur(0px);
    opacity: 1;
  }

  .btn-text {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
    -webkit-filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
    transform: scale(1.05);
    color: #ffffff;
  }

  --corner-color: #0004;

  .btn-corner:first-of-type {
    transform: translate(calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
        calc(-1 * var(--corner-multiplier) * var(--corner-dist))) rotate(90deg);
    filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
  }

  .btn-corner:nth-of-type(2) {
    transform: translate(calc(var(--corner-multiplier) * var(--corner-dist)),
        calc(-1 * var(--corner-multiplier) * var(--corner-dist))) rotate(180deg);
    filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
  }

  @-moz-document url-prefix() {
    .btn-corner:nth-of-type(2) {
      filter: drop-shadow(10px -10px 1px var(--corner-color)) drop-shadow(20px -20px 2px var(--corner-color));
    }
  }

  .btn-corner:nth-of-type(3) {
    transform: translate(calc(var(--corner-multiplier) * var(--corner-dist)),
        calc(var(--corner-multiplier) * var(--corner-dist))) rotate(-90deg);
    filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
  }

  .btn-corner:nth-of-type(4) {
    transform: translate(calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
        calc(var(--corner-multiplier) * var(--corner-dist))) rotate(0deg);
    filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color)) drop-shadow(-20px 20px 2px var(--corner-color));
  }
}

.btn-container:has(.btn:active) {
  .btn {
    transform: scale(0.95);
    filter: drop-shadow(0 10px 4px #0002);
    -webkit-filter: drop-shadow(0 10px 4px #0002);
  }

  .transition-top,
  .transition-bottom {
    transform: translateY(0px) scale(0.5);
  }

  .btn-text {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    -webkit-filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    transform: scale(1);
    color: #ffffff;
  }

  --corner-color: #0005;
  --corner-multiplier: 0.95;

  .btn-corner:first-of-type {
    transform: translate(calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
        calc(-1 * var(--corner-multiplier) * var(--corner-dist))) rotate(90deg);
    filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
  }

  .btn-corner:nth-of-type(2) {
    transform: translate(calc(var(--corner-multiplier) * var(--corner-dist)),
        calc(-1 * var(--corner-multiplier) * var(--corner-dist))) rotate(180deg);
    filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
  }

  @-moz-document url-prefix() {
    .btn-corner:nth-of-type(2) {
      filter: drop-shadow(10px -10px 2px var(--corner-color)) drop-shadow(20px -20px 3px var(--corner-color));
    }
  }

  .btn-corner:nth-of-type(3) {
    transform: translate(calc(var(--corner-multiplier) * var(--corner-dist)),
        calc(var(--corner-multiplier) * var(--corner-dist))) rotate(-90deg);
    filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
  }

  .btn-corner:nth-of-type(4) {
    transform: translate(calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
        calc(var(--corner-multiplier) * var(--corner-dist))) rotate(0deg);
    filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
    -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color)) drop-shadow(-20px 20px 3px var(--corner-color));
  }
}

@keyframes hue-anim {

  0%,
  100% {
    filter: hue-rotate(0deg);
    -webkit-filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(-70deg);
    -webkit-filter: hue-rotate(-70deg);
  }
}

@-webkit-keyframes hue-anim {

  0%,
  100% {
    -webkit-filter: hue-rotate(0deg);
  }

  50% {
    -webkit-filter: hue-rotate(-70deg);
  }
}

/* 自定义微缩放效果 */
.group-hover\:scale-102:hover {
  transform: scale(1.02);
}

.group-hover\:scale-101:hover {
  transform: scale(1.01);
}



/* 下滑指示器缓慢弹跳动画 */
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

/* 购买弹窗动画 */
.modal-backdrop {
  animation: modalBackdropFadeIn 0.3s ease-out forwards;
}

.modal-content {
  animation: modalContentSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes modalBackdropFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalContentSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
