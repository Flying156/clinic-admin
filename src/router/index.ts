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
                    title : '药品',
                    keeyAlive : true,
                    requireAuth : false
                },
                component : () => import('@/views/drug/index.vue')
            }
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

export default router;
