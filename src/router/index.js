import Vue from 'vue'
import VueRouter from 'vue-router'
import Inner from '@/components/Inner'
import store from './../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "components/main" */ '@/views/home')
  },
  {
    path: '/inner',
    name: 'inner',
    component: Inner,
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "pages/user/index" */ '@/views/user'),
        redirect: {name: 'user.ads'},
        children: [
          {
            path: 'ads',
            name: 'user.ads',
            component: () => import(/* webpackChunkName: "pages/user/ads" */ '@/views/user/ads'),
          },
          {
            path: 'deals',
            name: 'user.deals',
            component: () => import(/* webpackChunkName: "pages/user/deals" */ '@/views/user/deals'),
          },
          {
            path: 'my-ads',
            name: 'user.myAds',
            component: () => import(/* webpackChunkName: "pages/user/myAds" */ '@/views/user/myAds'),
          },
        ]
      },
      {
        path: 'affiliate',
        name: 'affiliate',
        component: () => import(/* webpackChunkName: "pages/affiliate" */ '@/views/affiliate'),
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import(/* webpackChunkName: "pages/favorites" */ '@/views/favorites'),
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import(/* webpackChunkName: "pages/wallet/index" */ '@/views/wallet'),
        redirect: {name: 'wallet.balance'},
        children: [
          {
            path: 'balance',
            name: 'wallet.balance',
            component: () => import(/* webpackChunkName: "pages/wallet/balance" */ '@/views/wallet/balance'),
          },
          // {
          //   path: 'convert',
          //   name: 'wallet.convert',
          //   component: () => import(/* webpackChunkName: "pages/wallet/convert" */ '@/views/wallet/convert'),
          // },
          {
            path: 'deposit',
            name: 'wallet.deposit',
            component: () => import(/* webpackChunkName: "pages/wallet/deposit" */ '@/views/wallet/deposit'),
          },
          {
            path: 'withdraw',
            name: 'wallet.withdraw',
            component: () => import(/* webpackChunkName: "pages/wallet/withdraw" */ '@/views/wallet/withdraw'),
          }
        ]
      },
      {
        path: 'history',
        name: 'history',
        component: () => import(/* webpackChunkName: "pages/history" */ '@/views/history'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "pages/settings/index" */ '@/views/settings'),
        redirect: {name: 'settings.profile'},
        children: [
          {
            path: 'profile',
            name: 'settings.profile',
            component: () => import(/* webpackChunkName: "pages/settings/profile" */ '@/views/settings/profile'),
          },
/*          {
            path: 'gateway',
            name: 'settings.gateway',
            component: () => import(/!* webpackChunkName: "pages/settings/gateway" *!/ '@/views/settings/gateway'),
          },*/
          {
            path: 'verification',
            name: 'settings.verification',
            component: () => import(/* webpackChunkName: "pages/settings/verification" */ '@/views/settings/verification'),
          },
          {
            path: 'pro',
            name: 'settings.pro',
            component: () => import(/* webpackChunkName: "pages/settings/pro/index" */ '@/views/settings/pro'),
            meta: {requiresPro: true},
            redirect: {name: 'settings.pro.disputes'},
            children: [
/*              {
                path: 'borrow',
                name: 'settings.pro.borrow',
                meta: {requiresPro: true},
                component: () => import(/!* webpackChunkName: "pages/settings/pro/borrow" *!/ '@/views/settings/pro/borrow')
              },*/
/*              {
                path: 'verification',
                name: 'settings.pro.verification',
                meta: {requiresPro: true},
                component: () => import(/!* webpackChunkName: "pages/settings/pro/verification" *!/ '@/views/settings/pro/verification')
              },*/
/*              {
                path: 'gateway',
                name: 'settings.pro.gateway',
                meta: {requiresPro: true},
                component: () => import(/!* webpackChunkName: "pages/settings/pro/gateway" *!/ '@/views/settings/pro/gateway')
              },*/
/*              {
                path: 'history',
                name: 'settings.pro.history',
                meta: {requiresPro: true},
                component: () => import(/!* webpackChunkName: "pages/settings/pro/history" *!/ '@/views/settings/pro/history')
              },*/
              {
                path: 'disputes',
                name: 'settings.pro.disputes',
                meta: {requiresPro: true},
                component: () => import(/* webpackChunkName: "pages/settings/pro/disputes" */ '@/views/settings/pro/disputes')
              },
              {
                path: 'disputes-history',
                name: 'settings.pro.disputesHistory',
                meta: {requiresPro: true},
                component: () => import(/* webpackChunkName: "pages/settings/pro/disputes-history" */ '@/views/settings/pro/disputes-history')
              },
            ]
          },
        ]
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "pages/about" */ '@/views/about')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // linkActiveClass: 'active',
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresPro && !store.state.userModule.isProUser) {
    next({name: 'settings.profile'})
  } else next();
})

export default router
