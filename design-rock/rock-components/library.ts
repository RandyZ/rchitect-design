import { AppContextPropertyGeneric, type CommonModuleLibContext, toPackage } from '@rchitect-rock/base-package';
import * as pack from './package.json';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import ComponentMap from './src/ComponentMap';
import Beans from './beankeys';
import { registerWmqComponent } from './src';

export const Lib: CommonModuleLibContext<typeof Beans> = toPackage({
  name: pack.name,
  version: pack.version,
  types: Beans,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`【${pack.name}】 IocModule start load`);
    bind(Beans.ComponentMap).to(ComponentMap)
  }),
  onSetup: async (app, appContext) => {
    const key = Beans.ComponentDictionary
    const componentMap = appContext.getParam(key);
    registerWmqComponent(app, componentMap);
  },
});
