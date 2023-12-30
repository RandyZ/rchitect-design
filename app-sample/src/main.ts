import '@rchitect-design/styles';
import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import App from './app.vue'
import { setupRouteGuard } from '@/router-guard';
import { AppContext } from '@rchitect-rock/base-package';
import { IocPlugin } from '@rchitect-rock/ioc';
import { Lib as routeLib } from '@rchitect-rock/router';
import { Lib as localeLib } from '@rchitect-rock/locale';
import { Lib as baseComponentLib } from '@rchitect-rock/components';
import { Lib as eventBusLib } from '@rchitect-rock/events';
import { Lib as layoutsLib } from '@rchitect-rock/layouts';
import { Lib as infrastructureLib } from '@rchitect-app/infrastructure';
import { Lib as accountLib } from '@rchitect-app/account';
import { Lib as driverLib } from '@rchitect-app/component-driver-naive';
import localIocModule from "./ioc";

(async () => {
  // 创建AppContext
  const appContext = new AppContext({
    defaultScope: 'Singleton',
    autoBindInjectable: true,
    skipBaseClassChecks: true,
  });
  // 注册路由守卫
  await setupRouteGuard(appContext);
  // 注册IOC模块
  appContext.addIocModule(localIocModule)
  // 创建&载入Vue App
  const app = await appContext.load(
    createApp(App)
      // 安装IOC插件
      .use(IocPlugin, appContext)
      // 使用事件
      .use(eventBusLib, appContext)
      // 使用路由
      .use(routeLib, appContext)
      // 布局组件
      .use(layoutsLib, appContext)
      // 本地化
      .use(localeLib, appContext)
      // 使用基础组件
      .use(baseComponentLib, appContext)
      // 安装组件驱动
      .use(driverLib, appContext)
      // 账号模块
      .use(accountLib, appContext)
      // 接入基础设施模块
      .use(infrastructureLib, appContext)
  )
  // 挂载Vue App
  app.mount('#app')
  // When Closing mock, Tree Shaking `mockjs` dep
  if (__VITE_USE_MOCK__) {
    console.debug('使用Mock数据～～～')
    import('../mock/_mock-server').then(({ setupProdMockServer }) => {
      console.debug('Setup Mock数据～～～')
      return setupProdMockServer()
    });
  }
})()
