import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop/test-tenant-slug',
    name: 'CustomerHome',
    component: () => import('@/views/customers/Home.vue')
  },
  {
    path: '/shop/test-tenant-slug/business-hours',
    name: 'BusinessHours',
    component: () => import('@/views/customers/BusinessHours.vue')
  },
  {
    path: '/shop/test-tenant-slug/contact',
    name: 'BusinessHours',
    component: () => import('@/views/customers/Contact.vue')
  },
  {
    path: '/',
    redirect: { name: 'CustomerHome' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
