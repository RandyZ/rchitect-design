import '@rchitect-design/styles';
import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import App from './App.vue'
import { APP_CONTEXT, AppContext } from '@rchitect-rock/base-package';
import {
  IocPlugin,
  IocContainerOptions,
  AsyncIocModule,
  THROWN_HANDLER,
  diKT,
} from '@rchitect-rock/ioc';
import { Lib as routeLib } from '@rchitect-rock/router';

// createApp(App).mount('#app')
(async () => {
  const app = createApp(App);
  const appContext = new AppContext();
  // IOC插件配置
  const iocOptions = {
    defaultScope: 'Singleton',
    autoBindInjectable: true,
    skipBaseClassChecks: true,
  } as IocContainerOptions;
  
})()