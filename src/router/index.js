import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('../views/Download.vue')
    },
    {
      path: '/donation',
      name: 'donation',
      component: () => import('../views/Donation.vue')
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/Pricing.vue')
    },
    {
      path: '/monthly-cards',
      name: 'monthly-cards',
      component: () => import('../views/MonthlyCards.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/Terms.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/Privacy.vue')
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('../views/Disclaimer.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/Community.vue')
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('../views/Documentation.vue')
    },
    {
      path: '/safe',
      name: 'safe',
      component: () => import('../views/Safe.vue')
    },
    {
      path: '/release-history',
      name: 'release-history',
      component: () => import('../views/ReleaseHistory.vue')
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: () => import('../views/Changelog.vue')
    },
    {
      path: '/font-test',
      name: 'font-test',
      component: () => import('../views/FontTest.vue')
    },
    {
      path: '/wireframe-demo',
      name: 'wireframe-demo',
      component: () => import('../views/WireframeDemo.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
