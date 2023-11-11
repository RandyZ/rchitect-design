import { App, Plugin } from 'vue';
import { setupByApp } from '.';
import type { IocContainerOptions } from './ioc';
const plugin: Plugin = {
  install(app: App, options: { iocOptions: IocContainerOptions }): void {
    setupByApp(app, options.iocOptions);
  },
};
export default plugin;
