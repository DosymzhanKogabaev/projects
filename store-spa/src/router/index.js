import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../pages/ProductList.vue')
    },
    {
      path: '/category/:category?',
      name: 'category',
      component: () => import('../pages/ProductList.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/Cart.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../pages/Favorites.vue')
    },
    {
      path: '/paymentSuccessful',
      name: 'paymentSuccessful',
      component: () => import('../pages/PaymentSuccessful.vue')
    }
  ]
})

export default router
