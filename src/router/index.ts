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
                path : '/app/home',
                name : 'Home',
                meta : {
                    title : '主页',
                    keeyAlive : true,
                    icon : 'liulanqi',
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
                    icon : 'jiedianguanli',
                    requireAuth : false
                },
                component : () => import('@/views/drug/index.vue')
            },
            {
                path : '/app/role',
                name : 'Role',
                meta : {
                    title : '角色管理',
                    keeyAlive : true,
                    icon : 'jiaoseguanli',
                    requireAuth : false
                },
                component : () => import('@/views/role/index.vue')
            },
            {
                path : '/app/user',
                name : 'User',
                meta : {
                    title : '用户管理',
                    keeyAlive : true,
                    icon : 'yonghuguanli',
                    requireAuth : false
                },
                component : () => import('@/views/user/index.vue')

            },
            {
                path : '/app/record',
                name : 'record',
                meta : {
                    title : '开药记录',
                    keeyAlive : true,
                    icon : 'xitongrizhi',
                    requireAuth : false
                },
                component : () => import('@/views/record/index.vue')
            },
            {
                path : '/app/patient',
                name : 'Patient',
                meta : {
                    title : '病人管理',
                    keeyAlive : true,
                    icon : 'jiedianguanli',
                    requireAuth : false
                },
                component : () => import('@/views/patient/index.vue')

            },
            {
                path : '/sys/account',
                name : 'account',
                component : () => import('@/views/account/index.vue'),
                meta : {
                    title : '用户管理',
                    keepAlive : true,
                    breadcrumb : true,

                },
            },
            {
                path : '/sys/password',
                name : 'password',
                component : () => import('@/views/password/index.vue'),
                meta : {
                    title : '用户管理',
                    keepAlive : true,
                    breadcrumb : true,

                },
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

];

const router
    = createRouter({
          history : createWebHashHistory(),
          routes
      });

router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        next();
    }
    const store = useUserStore();
    // 如果用户没有 token 并且访问的不是登录页面，则重定向到登录页面
    if (store.getToken === null && to.path !== '/login') {
        next('/login');
    } else {
        // 否则继续导航
        next();
    }
});

export default router;
