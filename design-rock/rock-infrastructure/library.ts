import * as pack from './package.json';
import type { BasicModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import { setupPinia } from "#/.";
import { useSettingStore } from '#/app-state';
import { Beans as settingsBeans } from '@rchitect-rock/settings'
import { getGlobalConfig, getAppConfig } from '@rchitect-rock/tools';
import mergeSetting from '#/app-config/enviroment'

export const Lib: BasicModuleLibContext = {
  install,
  name: pack.name,
  version: pack.version,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`【${pack.name}】 IocModule start load`);
    const settingStore = useSettingStore()
    bind(settingsBeans.AppSettingAction).toConstantValue(settingStore)
    bind(settingsBeans.AppSettingGetter).toConstantValue(settingStore)
    bind(settingsBeans.AppConfigState).toConstantValue(settingStore)
    bind(settingsBeans.AppConfigAction).toConstantValue(settingStore)
    
    const projectSetting = mergeSetting(getAppConfig(import.meta.env));
    bind(settingsBeans.GlobConfig).toConstantValue(getGlobalConfig(import.meta.env));
    bind(settingsBeans.DefaultProjectSetting).toConstantValue(projectSetting);
    bind(settingsBeans.DefaultHeaderSetting).toConstantValue(projectSetting.headerSetting);
    bind(settingsBeans.DefaultMultiTabsSetting).toConstantValue(projectSetting.multiTabsSetting);
    bind(settingsBeans.DefaultMenuSetting).toConstantValue(projectSetting.menuSetting);
    bind(settingsBeans.DefaultTransitionSetting).toConstantValue(projectSetting.transitionSetting);
    bind(settingsBeans.DefaultSporadicSetting).toConstantValue(projectSetting.sporadicSetting);
  }),
  async beforeSetup(app) {
    setupPinia(app)
  }
};
