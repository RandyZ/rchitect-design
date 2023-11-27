import type { CommonModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import * as pack from './package.json';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import types from './beankeys';
import { DataEventBus } from './src/DataEventBus';

export const Lib: CommonModuleLibContext<typeof types> = {
  install,
  name: pack.name,
  version: pack.version,
  types,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`${pack.name} IocModule start load`);
    // TODO 考虑下根据条件选择注入
    bind<DataEventBus>(types.DataEventBus).to(DataEventBus);
  }),
  onSetup: async (app, appContext) => {
    // console.debug(`【${pack.name}】 onSetup start`);
    // const settingStore = await di(types.SettingStore);
    // // TODO: 从后端获取配置或者SettingStore中增加默认配置
    // if (settingStore.projectConfig) {
    //   console.debug(`【${pack.name}】 onSetup projectConfig exists, skip load`);
    // } else {
    //   await settingStore.setProjectConfig(
    //     diK(types.ProjectSetting)
    //       || (await import('#/defaultConfig/ProjectSetting')).default
    //   );
    // }
  }
};
