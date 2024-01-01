import type { CommonModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import * as pack from './package.json';
import { AsyncIocModule, di, diK } from '@rchitect-rock/ioc';
import types from './beankeys';
import { MenuSettingManager } from './src/menu';
import AppParams from './appparams';

export const Lib: CommonModuleLibContext<typeof types> = {
  install,
  name: pack.name,
  version: pack.version,
  types,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`${pack.name} IocModule start load`);
    bind(types.MenuSettingManager).to(MenuSettingManager);
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetup: async (app, appContext) => {
    console.debug(`【${pack.name}】 onSetup start`);
    const settingAction = await di(types.AppConfigAction);
    const settingGetter = await di(types.AppConfigGetter);
    // TODO: 从后端获取配置或者SettingStore中增加默认配置
    if (settingGetter.isInited.value) {
      console.debug(`【${pack.name}】 onSetup projectConfig exists, skip load`);
    } else {
      const projectSetting = appContext.getParamWith(AppParams.ProjectSettingParam, diK(types.DefaultProjectSetting)) || {};
      await settingAction.setProjectConfig(projectSetting);
    }
  }
};
