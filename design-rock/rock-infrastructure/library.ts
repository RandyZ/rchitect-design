import * as pack from './package.json';
import types from './beankeys';
import type { CommonModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import { setupPinia } from "#/.";
import { useSettingStore } from '#/AppState/store';
import { Beans as settingsBeans } from '@rchitect-rock/settings'

export const Lib: CommonModuleLibContext<typeof types> = {
  install,
  name: pack.name,
  version: pack.version,
  types,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`【${pack.name}】 IocModule start load`);
    const settingStore = useSettingStore()
    bind(types.AppSettingStore).toConstantValue(settingStore)
    bind(settingsBeans.AppSettingAction).toConstantValue(settingStore)
    bind(settingsBeans.AppSettingGetter).toConstantValue(settingStore)
    bind(settingsBeans.AppConfigState).toConstantValue(settingStore)
  }),
  async onSetup() {
    // const needAuthstore = await di(types.AuthStore);
    // if (!needAuthstore) {
    //   throw new Error(`【${pack.name}】need AuthStore, but not found, please check your ioc config`);
    // }
  },
  async beforeSetup(app) {
    setupPinia(app)
  }
};
