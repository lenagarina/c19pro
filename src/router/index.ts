import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: () => import('../views/homePage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/aboutPage.vue')
    },
    {
      path: '/contact',
      name: 'contactPage',
      component: () => import('../views/contactPage.vue')
    },
    {
      path: '/state/:abbreviation',
      name: 'statePage',
      component: () => import('../views/statePage.vue')
    },
    {
      path: '/district/:ags',
      name: 'districtPage',
      component: () => import('../views/districtPage.vue')
    }
  ]
})

export default router
