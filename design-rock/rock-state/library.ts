import * as pack from './package.json';
import types from './beankeys';
import type { CommonModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import { AsyncIocModule, di } from '@rchitect-rock/ioc';
import { useAppConfig, AppConfigStore, DataEventBus, setupPinia } from "#/.";

export const Lib: CommonModuleLibContext<typeof types> = {
  install,
  name: pack.name,
  version: pack.version,
  types,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`【${pack.name}】 IocModule start load`);
    bind<AppConfigStore>(types.DefineAppConfigOptions).toConstantValue(useAppConfig());
    bind<DataEventBus>(types.DataEventBus).to(DataEventBus);
  }),
  async onSetup() {
    const needAuthstore = await di(types.AuthStore);
    if (!needAuthstore) {
      throw new Error(`【${pack.name}】need AuthStore, but not found, please check your ioc config`);
    }
  },
  async beforeSetup(app) {
    setupPinia(app)
  }
};
