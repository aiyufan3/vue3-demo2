import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    // forgotPassword
    {
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: () => import('../views/forgotPassword.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//

router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {

        const token = localStorage.getItem('token')

        if (token) {
            next('/')
        } else {
            next()
        }
    } else {
        const token = localStorage.getItem('token')
        
        if (token || to.path === '/forgotPassword') {
            next()
        } else {
            next('/login')
        }
    }
  });

export default router