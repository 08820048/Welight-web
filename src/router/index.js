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
