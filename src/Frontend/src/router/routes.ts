import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'hourly-wage-calculator',
        children: [
          {
            path: 'employee',
            component: () => import('pages/HourlyWageCalculatorEmployee.vue'),
          },
          {
            path: 'one-person-business',
            component: () => import('pages/HourlyWageCalculatorOnePersonBusiness.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
