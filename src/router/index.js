import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/sys-admin',
        component: () => import('../views/HomeView.vue'),
        redirect: '/sys-admin/index',
        name: 'Home',
        children: [
            {
                path: 'temp/album/add-new', // /sys-admin/temp/album/add-new
                component: () => import('../views/sys-admin/temp/AlbumAddNewView.vue')
            },
            {
                path: 'temp/brand/list',
                component: () => import('../views/sys-admin/temp/BrandListView.vue')
            },
            {
                path: 'temp/brand/add-new',
                component: () => import('../views/sys-admin/temp/BrandAddNewView.vue')
            },
            {
                path: 'index',
                component: () => import('../views/sys-admin/AdminIndexView.vue')
            },
            {
                path: 'product/album-management',
                component: () => import('../views/sys-admin/product/AlbumManagementView.vue')
            },
            {
                path: 'product/attribute-template-management',
                component: () => import('../views/sys-admin/product/AttributeTemplateManagementView.vue')
            },
            {
                path: 'product/brand-management',
                component: () => import('../views/sys-admin/product/BrandManagementView.vue')
            },
            {
                path: 'product/category-management',
                component: () => import('../views/sys-admin/product/CategoryManagementView.vue')
            },
            {
                path: 'product/spu-add-new',
                component: () => import('../views/sys-admin/product/SpuAddNewView.vue')
            },
            {
                path: 'product/spu-management',
                component: () => import('../views/sys-admin/product/SpuManagementView.vue')
            },
        ]
    },
    {
        path: '/about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/',
        component: LoginView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
