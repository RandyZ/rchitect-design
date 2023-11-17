export * from './SomeBean';


const Routes = {
  HelloPage: () => import('#/pages/HelloPage.vue')
};

const rootRoute: RouteRecordItem = {
  path: '/template',
  name: 'Template',
  redirect: '/template/hello',
  meta: {
    orderNo: 2,
    icon: 'line-md:clipboard-list-twotone',
    title: 'rchitect Design模版',
    root: true,
  },
  children: [
    {
      path: 'hello',
      name: 'HelloPage',
      component: Routes.HelloPage,
      meta: {
        orderNo: 2,
        icon: 'line-md:clipboard-list-twotone',
        title: '模版HelloWord',
      },
    },
  ],
};

export const RouteList: RouteRecordItem[] = [rootRoute];