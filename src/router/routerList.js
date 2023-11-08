import { lazy } from 'react'

const routers = [
    {
        path: '/login',
        component: lazy(() => import('../pages/Login')),
    },
    {
        path: '/googlelogin',
        component: lazy(() => import('../pages/Login/GoogleLogin')),
    },
    {
        path: '/signup',
        component: lazy(() => import('../pages/signUp')),
    },
    {
        path: '/resetPassword',
        component: lazy(() => import('../pages/resetPassword')),
    },
    {
        path: '/profile',
        title: 'profile',
        component: lazy(() => import('../pages/UserDetails')),
    },
    {
        path: '/panels',
        title: 'panels',
        component: lazy(() => import('../pages/Panels')),
    },
    {
        path: '/management',
        title: 'management',
        component: lazy(() => import('../pages/Management')),
    },
    {
        path: '/notificationsetting',
        title: 'notificationsetting',
        component: lazy(() => import('../pages/NotificationSetting')),
    },
    {
        path: '/postdetail/:postId',
        title: 'postdetail',
        component: lazy(() => import('../pages/HomeFeedPost')),
    },
    {
        path: '/',
        component: lazy(() => import('../pages/Index')),
        children: [],
    },
]
export default routers
