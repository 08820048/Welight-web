<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 justify-between h-16 w-full -ml-4 sm:-ml-6 lg:-ml-8">
        <!-- Logo 和品牌信息 -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 flex ring-1 ring-primary-100 bg-primary-50 bg-cover rounded-lg items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img src="/logo.png" alt="Welight Logo" class="w-full h-full object-cover" />
          </div>
          <div class="hidden sm:block">
            <div class="text-lg font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              Welight
              <sup class="text-xs text-slate-500 font-normal">v4.1.2</sup>
            </div>
            <div class="text-xs text-slate-500">智能高效的公众号编辑器</div>
          </div>
        </router-link>

        <!-- 导航菜单 - 桌面端 -->
        <nav class="hidden lg:flex items-center gap-8 text-sm text-slate-600">
          <router-link to="/" class="hover:text-slate-900 transition-colors font-medium"
            active-class="text-primary-600">
            首页
          </router-link>
          <button @click="showAnnouncements"
            class="relative hover:text-slate-900 transition-colors font-medium flex items-center gap-1.5">
            公告通知
            <div v-if="hasNewAnnouncements" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          <router-link to="/pricing" class="hover:text-slate-900 transition-colors font-medium relative"
            active-class="text-primary-600">
            购买许可
            <!-- <span
              class="absolute -top-2 -right-3 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90">
              庆
            </span> -->
          </router-link>You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
testimonials-columns-1.tsx
"use client";
import React from "react";
import { motion } from "motion/react";


export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

;

demo.tsx
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default { Testimonials };
```

Install NPM dependencies:
```bash
motion
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

          <router-link to="/donation"
            class="hover:text-slate-900 transition-colors font-medium relative flex items-center gap-1.5"
            active-class="text-primary-600">
            赞助支持
            <!-- <div v-if="donationCount > 0"
              class="bg-yellow-400 text-slate-900 text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center shadow-sm scale-75">
              +{{ donationCount }}
            </div> -->
          </router-link>

          <!-- 交流反馈下拉菜单 -->
          <div class="relative group">
            <button class="hover:text-slate-900 transition-colors font-medium flex items-center gap-1.5"
              title="交流讨论与问题反馈">
              交流反馈
              <svg class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- 下拉菜单 -->
            <div
              class="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
              <div class="py-2">
                <a href="https://qm.qq.com/q/nNA64h5d6K" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <span>交流讨论</span>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>问题反馈</span>
                  </div>
                </a>
                <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file" target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>功能诉求</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- 更新日志：文本菜单 -->
          <button @click="showChangelog" class="hover:text-slate-900 transition-colors font-medium" title="查看更新日志">
            更新日志
          </button>

          <!-- 网页版 -->
          <a href="https://waer.ltd/wl/" target="_blank" class="hover:text-slate-900 transition-colors font-medium"
            title="在线网页版">
            网页版
          </a>

          <!-- 主题预览 -->
          <a href="https://waer.ltd/wl/themes" target="_blank"
            class="hover:text-slate-900 transition-colors font-medium" title="主题预览">
            主题预览
          </a>

          <!-- 活动菜单项 -->
          <button v-for="promo in menuPromotions" :key="promo.id" @click="showPromotionBanner(promo)"
            class="relative font-bold flex items-center gap-1.5 group/promo promotion-menu-item">
            <!-- 迷你倒计时 - 放在上方 -->
            <MiniCountdown :promotion="promo" @click.stop="showPromotionBanner(promo)" class="absolute -top-5"
              style="left: 65px;" />
            <span class="promotion-text">{{ promo.name }}</span>
            <span v-if="promo.menuBadge" class="promotion-flame">{{ promo.menuBadge }}</span>
            <span v-if="promo.menuBadgeText"
              class="absolute -top-2 -right-3 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90 animate-pulse">
              {{ promo.menuBadgeText }}
            </span>
          </button>
        </nav>

        <!-- 右侧按钮组 -->
        <div class="flex items-center gap-3">
          <!-- 前往下载按钮 -->
          <router-link to="/download" class="hidden md:block download-button" title="前往下载">
            <span class="button__text">前往下载</span>
            <span class="button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" class="svg">
                <path
                  d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z">
                </path>
                <path
                  d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z">
                </path>
                <path
                  d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z">
                </path>
              </svg>
            </span>
          </router-link>

          <!-- 文档按钮 -->
          <router-link to="/documentation" @click="markDocsUpdateViewed" class="hidden md:block doc-button-new"
            title="查看文档">
            <div>
              <div class="pencil"></div>
              <div class="folder">
                <div class="top">
                  <svg viewBox="0 0 24 27">
                    <path
                      d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z">
                    </path>
                  </svg>
                </div>
                <div class="paper"></div>
              </div>
            </div>
            阅读文档
            <span v-if="hasDocsUpdate"
              class="absolute -top-2 -right-2 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-sm bg-gradient-to-r from-red-500 to-orange-500 scale-90 animate-pulse z-10">
              有更新
            </span>
          </router-link>

          <!-- 移动端菜单按钮 -->
          <button @click="toggleMobileMenu"
            class="lg:hidden inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-slate-900 transition"
            aria-label="菜单">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
        <nav class="container-custom py-4 space-y-2">
          <router-link to="/" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            首页
          </router-link>
          <router-link to="/features" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            功能特性
          </router-link>
          <router-link to="/pricing" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            购买许可
          </router-link>
          <router-link to="/download" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            下载
          </router-link>
          <a href="https://waer.ltd/wl/" target="_blank" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            网页版
          </a>
          <a href="https://waer.ltd/wl/themes" target="_blank" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            主题预览
          </a>
          <router-link to="/monthly-cards" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            月卡管理
          </router-link>
          <router-link to="/documentation" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            文档
          </router-link>
          <router-link to="/community" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
            交流讨论
          </router-link>
          <!-- 移动端活动菜单项 -->
          <button v-for="promo in menuPromotions" :key="promo.id" @click="showPromotionBanner(promo); closeMobileMenu()"
            class="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition-all font-bold flex items-center justify-between promotion-menu-item-mobile">
            <span class="flex items-center gap-2">
              <span v-if="promo.menuBadge" class="promotion-flame">{{ promo.menuBadge }}</span>
              <span class="promotion-text">{{ promo.name }}</span>
            </span>
            <span v-if="promo.menuBadgeText"
              class="text-white text-xs px-2 py-0.5 rounded-full font-bold bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
              {{ promo.menuBadgeText }}
            </span>
          </button>
          <router-link to="/donation" @click="closeMobileMenu"
            class="block px-4 py-2 text-slate-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            ❤️ 赞助支持
          </router-link>
        </nav>
      </div>
    </transition>

    <!-- 更新日志模态框 -->
    <ChangelogModal :isVisible="isChangelogVisible" @close="closeChangelog" />

    <!-- 公告模态框 -->
    <AnnouncementModal :isVisible="isAnnouncementVisible" @close="closeAnnouncements" />

    <!-- 活动条幅 -->
    <PromotionBanner v-model="isPromotionBannerVisible" :promotion="currentPromotion" @close="closePromotionBanner" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ChangelogModal from './ChangelogModal.vue'
import AnnouncementModal from './AnnouncementModal.vue'
import PromotionBanner from './PromotionBanner.vue'
import MiniCountdown from './MiniCountdown.vue'
import { hasNewAnnouncements as checkNewAnnouncements } from '@/data/announcements.js'
import { donations } from '@/data/donations.js'
import { getMenuPromotions, hasNewPromotions, markLatestPromotionAsViewed } from '@/data/promotions.js'
import { getLatestVersion } from '@/data/changelog.js'

// 滚动状态
const isScrolled = ref(false)

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 更新日志模态框状态
const isChangelogVisible = ref(false)

// 公告模态框状态
const isAnnouncementVisible = ref(false)

// 是否有新公告
const hasNewAnnouncements = ref(false)

// 计算赞助次数
const donationCount = computed(() => donations.length)

// 活动相关状态
const isPromotionBannerVisible = ref(false)
const currentPromotion = ref(null)
const menuPromotions = ref([])

// 文档更新提示
const hasDocsUpdate = ref(false)
const latestVersion = getLatestVersion()
const markDocsUpdateViewed = () => {
  localStorage.setItem('welight_docs_last_viewed_version', latestVersion.version)
  hasDocsUpdate.value = false
}

// 获取菜单中的活动
const loadMenuPromotions = () => {
  menuPromotions.value = getMenuPromotions()
}

// 显示活动条幅
const showPromotionBanner = (promotion) => {
  currentPromotion.value = promotion
  isPromotionBannerVisible.value = true
}

// 关闭活动条幅
const closePromotionBanner = () => {
  isPromotionBannerVisible.value = false
  // 标记活动为已查看
  if (currentPromotion.value) {
    markLatestPromotionAsViewed()
  }
  currentPromotion.value = null
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 显示更新日志
const showChangelog = () => {
  isChangelogVisible.value = true
}

// 关闭更新日志
const closeChangelog = () => {
  isChangelogVisible.value = false
}

// 显示公告
const showAnnouncements = () => {
  isAnnouncementVisible.value = true
}

// 关闭公告
const closeAnnouncements = () => {
  isAnnouncementVisible.value = false
  hasNewAnnouncements.value = checkNewAnnouncements()
}

// 处理滚动
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// 组件挂载
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  hasNewAnnouncements.value = checkNewAnnouncements()

  // 加载活动菜单
  loadMenuPromotions()

  // 检查文档是否有更新（基于版本）
  const lastViewedDocs = localStorage.getItem('welight_docs_last_viewed_version')
  hasDocsUpdate.value = !lastViewedDocs || lastViewedDocs !== latestVersion.version

  // 检查是否有新活动需要自动弹出
  const hasNewPromo = hasNewPromotions()

  // 如果有新公告，延迟弹出
  if (hasNewAnnouncements.value) {
    setTimeout(() => {
      isAnnouncementVisible.value = true
    }, 1000)
  }
  // 如果没有新公告但有新活动，延迟弹出活动条幅
  else if (hasNewPromo && menuPromotions.value.length > 0) {
    setTimeout(() => {
      showPromotionBanner(menuPromotions.value[0])
    }, 1500) // 延迟1.5秒，避免与公告冲突
  }
})

// 组件卸载
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 活动菜单项样式 */
.promotion-menu-item {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.promotion-menu-item:hover {
  transform: translateY(-2px);
}

/* 活动文字渐变和动画 */
.promotion-text {
  background: #ff4444;
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'Noto Serif SC', 'STKaiti', 'KaiTi', serif;
  font-size: 1.5rem;
  /* 24px */
  font-weight: 900;
  letter-spacing: 0.08em;
}



/* 火焰图标动画 */
.promotion-flame {
  display: inline-block;
  animation: flame-flicker 1.5s ease-in-out infinite, flame-float 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.6)) drop-shadow(0 0 12px rgba(255, 142, 83, 0.4));
}

/* 火焰闪烁动画 */
@keyframes flame-flicker {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }

  25% {
    transform: scale(1.1) rotate(-5deg);
    opacity: 0.9;
  }

  50% {
    transform: scale(0.95) rotate(5deg);
    opacity: 1;
  }

  75% {
    transform: scale(1.05) rotate(-3deg);
    opacity: 0.95;
  }
}

/* 火焰上下浮动 */
@keyframes flame-float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-3px);
  }
}

/* 悬停时增强效果 */
.promotion-menu-item:hover .promotion-flame {
  animation: flame-flicker 0.8s ease-in-out infinite, flame-float 1s ease-in-out infinite;
  filter: drop-shadow(0 0 12px rgba(255, 107, 107, 0.8)) drop-shadow(0 0 16px rgba(255, 142, 83, 0.6));
}

.promotion-menu-item:hover .promotion-text {
  transform: scale(1.05);
}

/* 下载按钮样式 */
.download-button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #17795E;
  background-color: #209978;
  overflow: hidden;
  border-radius: 5px;
}

.download-button,
.download-button .button__icon,
.download-button .button__text {
  transition: all 0.3s;
}

.download-button .button__text {
  transform: translateX(22px);
  color: #fff;
  font-weight: 600;
}

.download-button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: #17795E;
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-button .svg {
  width: 20px;
  fill: #fff;
}

.download-button:hover {
  background: #17795E;
}

.download-button:hover .button__text {
  color: transparent;
}

.download-button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.download-button:active .button__icon {
  background-color: #146c54;
}

.download-button:active {
  border: 1px solid #146c54;
}

/* 文档按钮样式 */
.doc-button-new {
  --color: #fff;
  --background: #404660;
  --background-hover: #3A4059;
  --background-left: #2B3044;
  --folder: #F3E9CB;
  --folder-inner: #BEB393;
  --paper: #FFFFFF;
  --paper-lines: #BBC1E1;
  --paper-behind: #E1E6F9;
  --pencil-cap: #fff;
  --pencil-top: #275EFE;
  --pencil-middle: #fff;
  --pencil-bottom: #5C86FF;
  --shadow: rgba(13, 15, 25, .2);
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  padding: 10.5px 29px 10.5px 69px;
  height: 40px;
  transition: background 0.3s;
  color: var(--color);
  background: var(--bg, var(--background));
}

.doc-button-new>div {
  top: 0;
  left: 0;
  bottom: 0;
  width: 53px;
  position: absolute;
  overflow: hidden;
  border-radius: 5px 0 0 5px;
  background: var(--background-left);
}

.doc-button-new>div .folder {
  width: 23px;
  height: 27px;
  position: absolute;
  left: 15px;
  top: 6.5px;
}

.doc-button-new>div .folder .top {
  left: 0;
  top: 0;
  z-index: 2;
  position: absolute;
  transform: translateX(var(--fx, 0));
  transition: transform 0.4s ease var(--fd, 0.3s);
}

.doc-button-new>div .folder .top svg {
  width: 24px;
  height: 27px;
  display: block;
  fill: var(--folder);
  transform-origin: 0 50%;
  transition: transform 0.3s ease var(--fds, 0.45s);
  transform: perspective(120px) rotateY(var(--fr, 0deg));
}

.doc-button-new>div .folder:before,
.doc-button-new>div .folder:after,
.doc-button-new>div .folder .paper {
  content: "";
  position: absolute;
  left: var(--l, 0);
  top: var(--t, 0);
  width: var(--w, 100%);
  height: var(--h, 100%);
  border-radius: 1px;
  background: var(--b, var(--folder-inner));
}

.doc-button-new>div .folder:before {
  box-shadow: 0 1.5px 3px var(--shadow), 0 2.5px 5px var(--shadow), 0 3.5px 7px var(--shadow);
  transform: translateX(var(--fx, 0));
  transition: transform 0.4s ease var(--fd, 0.3s);
}

.doc-button-new>div .folder:after,
.doc-button-new>div .folder .paper {
  --l: 1px;
  --t: 1px;
  --w: 21px;
  --h: 25px;
  --b: var(--paper-behind);
}

.doc-button-new>div .folder:after {
  transform: translate(var(--pbx, 0), var(--pby, 0));
  transition: transform 0.4s ease var(--pbd, 0s);
}

.doc-button-new>div .folder .paper {
  z-index: 1;
  --b: var(--paper);
}

.doc-button-new>div .folder .paper:before,
.doc-button-new>div .folder .paper:after {
  content: "";
  width: var(--wp, 14px);
  height: 2px;
  border-radius: 1px;
  transform: scaleY(0.5);
  left: 3px;
  top: var(--tp, 3px);
  position: absolute;
  background: var(--paper-lines);
  box-shadow: 0 12px 0 0 var(--paper-lines), 0 24px 0 0 var(--paper-lines);
}

.doc-button-new>div .folder .paper:after {
  --tp: 6px;
  --wp: 10px;
}

.doc-button-new>div .pencil {
  height: 2px;
  width: 3px;
  border-radius: 1px 1px 0 0;
  top: 8px;
  left: 105%;
  position: absolute;
  z-index: 3;
  transform-origin: 50% 19px;
  background: var(--pencil-cap);
  transform: translateX(var(--pex, 0)) rotate(35deg);
  transition: transform 0.4s ease var(--pbd, 0s);
}

.doc-button-new>div .pencil:before,
.doc-button-new>div .pencil:after {
  content: "";
  position: absolute;
  display: block;
  background: var(--b, linear-gradient(var(--pencil-top) 55%, var(--pencil-middle) 55.1%, var(--pencil-middle) 60%, var(--pencil-bottom) 60.1%));
  width: var(--w, 5px);
  height: var(--h, 20px);
  border-radius: var(--br, 2px 2px 0 0);
  top: var(--t, 2px);
  left: var(--l, -1px);
}

.doc-button-new>div .pencil:before {
  -webkit-clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
  clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
}

.doc-button-new>div .pencil:after {
  --b: none;
  --w: 3px;
  --h: 6px;
  --br: 0 2px 1px 0;
  --t: 3px;
  --l: 3px;
  border-top: 1px solid var(--pencil-top);
  border-right: 1px solid var(--pencil-top);
}

.doc-button-new:before,
.doc-button-new:after {
  content: "";
  position: absolute;
  width: 10px;
  height: 2px;
  border-radius: 1px;
  background: var(--color);
  transform-origin: 9px 1px;
  transform: translateX(var(--cx, 0)) scale(0.5) rotate(var(--r, -45deg));
  top: 19px;
  right: 16px;
  transition: transform 0.3s;
}

.doc-button-new:after {
  --r: 45deg;
}

.doc-button-new:hover {
  --cx: 2px;
  --bg: var(--background-hover);
  --fx: -40px;
  --fr: -60deg;
  --fd: .15s;
  --fds: 0s;
  --pbx: 3px;
  --pby: -3px;
  --pbd: .15s;
  --pex: -24px;
}
</style>
