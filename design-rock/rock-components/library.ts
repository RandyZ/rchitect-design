import type { Library } from '@rchitect-rock/base-package';
import { toPackage } from '@rchitect-rock/base-package';
import * as pack from './package.json';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import ComponentMap from './src/ComponentMap';
import Beans from './beankeys';
import { registerWmqComponent } from './src';

export const Lib: Library<typeof Beans> = toPackage({
  name: pack.name,
  version: pack.version,
  types: Beans,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`[${pack.name}] IocModule start load`);
    bind(Beans.ComponentMap).to(ComponentMap)
  }),
  onSetup: async (app, appContext) => {
    const componentMap = appContext.getParam<WmqComponentDictionary>(Beans.ComponentDictionary);
    registerWmqComponent(app, componentMap);
  },
});
