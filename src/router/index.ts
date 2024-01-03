import {useUserStore} from '@/store/user';
import {
    createRouter,
    createWebHashHistory
} from 'vue-router';

const routes = [
    {
        path : '/app',
        name : 'app',
        redirect : '/app/home',
        component : () => import('@/layouts/BasicLayout/index.vue'),
        meta : {
            title : '管理平台',
            keeyAlive : true,
        },
        children : [
            {
                path : '/register',
                name : 'Register',
                meta : {
                    title : '注册',
                    keeyAlive : true,
                    requireAuth : false
                },
                component : () => import('@/views/register/index.vue')
            },
            {
                path : '/app/home',
                name : 'Home',
                meta : {
                    title : '主页',
                    keeyAlive : true,
                    requireAuth : false
                },
                component : () => import('@/views/home/index.vue')

            },
            {
                path : '/app/drug',
                name : 'Drug',
                meta : {
                    title : '药品管理',
                    keeyAlive : true,
                    requireAuth : false
                },
                component : () => import('@/views/drug/index.vue')
            },
            {
                path : '/app/user',
                name : 'User',
                meta : {
                    title : '用户管理',
                    keeyAlive : true,
                    requireAuth : false
                },
                component : () => import('@/views/user/index.vue')

            },
            {
                path : '/sys/account',
                name : 'account',
                component : () => import('@/views/account/index.vue'),
                meta : { title : '用户管理', keepAlive : true, breadcrumb : true },
            },
        ]
    },
    {
        path : '/login',
        name : 'Login',
        meta : {
            title : '登录',
            keeyAlive : true,
            requireAuth : false
        },
        component : () => import('@/views/login/index.vue')
    },

];

const router
    = createRouter({
          history : createWebHashHistory(),
          routes
      });

router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next();
    }
    // 假设你的 store 名为 userStore，根据实际情况修改
    const userStore = useUserStore();

    // 如果用户没有 token 并且访问的不是登录页面，则重定向到登录页面
    if (userStore.getToken === "" && to.path !== '/login') {
        next('/login');
    } else {
        // 否则继续导航
        next();
    }
});

export default router;
