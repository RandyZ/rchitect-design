import '@rchitect-design/styles';
import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import App from './App.vue'
import { APP_CONTEXT, AppContext } from '@rchitect-rock/base-package';
import { IocPlugin } from '@rchitect-rock/ioc';
import { Lib as routeLib } from '@rchitect-rock/router';

(async () => {
  const app = createApp(App);
  const appContext = new AppContext({
    defaultScope: 'Singleton',
    autoBindInjectable: true,
    skipBaseClassChecks: true,
  });
  app
  // 安装IOC插件
  .use(IocPlugin, appContext)
  // 使用路由
  .use(routeLib, appContext)
  .mount('#app');
})()