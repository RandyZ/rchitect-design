import * as pack from './package.json';
import type { BasicModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import { setupPinia } from "#/.";
import { useSettingStore } from '#/app-setting';
import { useConfigStore } from '#/app-config';
import { useStateStore } from '#/app-state';
import { Beans as settingsBeans } from '@rchitect-rock/settings'
import { Beans as stateBeans } from '@rchitect-rock/state'
import { getGlobalConfig, getAppConfig } from '@rchitect-rock/tools';
import mergeSetting from '#/app-config/enviroment'

export const Lib: BasicModuleLibContext = {
  install,
  name: pack.name,
  version: pack.version,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`【${pack.name}】 IocModule start load`);
    // TODO 考虑下根据条件选择注入

    // 应用设置
    const settingStore = useSettingStore()
    bind(settingsBeans.AppSettingState).toConstantValue(settingStore)
    bind(settingsBeans.AppSettingAction).toConstantValue(settingStore)
    bind(settingsBeans.AppSettingGetter).toConstantValue(settingStore)

    // 应用配置
    const configStore = useConfigStore()
    bind(settingsBeans.AppConfigState).toConstantValue(configStore)
    bind(settingsBeans.AppConfigGetter).toConstantValue(configStore)
    bind(settingsBeans.AppConfigAction).toConstantValue(configStore)

    // 应用运行时状态
    const stateStore = useStateStore()
    bind(stateBeans.AppState).toConstantValue(stateStore)
    bind(stateBeans.AppStateActions).toConstantValue(stateStore)
    bind(stateBeans.AppStateGetters).toConstantValue(stateStore)
    
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
