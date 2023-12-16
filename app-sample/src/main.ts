import '@rchitect-design/styles';
import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import App from './App.vue'
import { AppContext } from '@rchitect-rock/base-package';
import { IocPlugin } from '@rchitect-rock/ioc';
import { Lib as routeLib } from '@rchitect-rock/router';
import { Beans, Lib as baseComponentLib } from '@rchitect-rock/components';
import { Lib as accountLib } from '@rchitect-app/account';
import { NavieuiComponentDriver as ComponentDriver } from '@rchitect-app/component-driver-naive';

(async () => {
  // 创建AppContext
  const appContext = new AppContext({
    defaultScope: 'Singleton',
    autoBindInjectable: true,
    skipBaseClassChecks: true,
  });
  // TODO NaiveUI组件驱动的载入放到组件驱动模块中独立处理
  const birdge: ComponentDriver = ComponentDriver.builder().enableAll();
  const dictionary = birdge.componentDictoray();
  appContext.registerParam(Beans.ComponentDictionary, dictionary);
  // 创建&载入Vue App
  const app = await appContext.load(
    createApp(App)
      // 安装IOC插件
      .use(IocPlugin, appContext)
      // 使用路由
      .use(routeLib, appContext)
      // 使用基础组件
      .use(baseComponentLib, appContext)
      .use(accountLib, appContext)
  )
  // 挂载Vue App
  app.mount('#app')
})()
