import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/search-for-care',
        name: 'SearchForCare',
        component: () => import('@/views/SearchForCare.vue')
    },
    {
        path: '/query-care',
        name: 'QueryCare',
        component: () => import('@/views/QueryCare.vue')
    },
    {
        path: '/motif-sampler',
        name: 'MotifSampler',
        component: () => import('@/views/MotifSampler.vue')
    },
    {
        path: '/motif-details/:id',
        name: 'MotifDetails',
        component: () => import('@/views/MotifDetails.vue')
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('@/views/History.vue')
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router