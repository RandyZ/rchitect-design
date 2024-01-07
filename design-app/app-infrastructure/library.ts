import * as pack from './package.json';
import type { ModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import { setupPinia } from "./src";
import { useSettingStore } from '#/app-setting';
import { useConfigStore } from '#/app-config';
import { useStateStore } from '#/app-state';
import { useAppLockState } from '#/app-locker';
import { Beans as settingsBeans } from '@rchitect-rock/settings'
import { Beans as stateBeans } from '@rchitect-rock/state'
import { Beans as layoutBeans } from '@rchitect-rock/layouts'
import Beans from './beankeys';
import { getGlobalConfig, getAppConfig, deepMerge } from '@rchitect-rock/tools';
import environment from '#/app-config/environment'
import clone from 'lodash-es/clone';
import { InfrastructureAxios, InfrastructureOptions, defaultRequestOptions, defaultCreateAxiosOptions } from '#/app-net'
import type { RequestOptions } from "@rchitect-design/types";
import { usePermissionStore } from "#/user-state";
import { useSiteInfo } from "#/app-config/site-info";
import { storeToRefs } from "pinia";
import { useAppRuntimeStore } from "#/app-state/app-runtime";

export const Lib:ModuleLibContext<'routes', typeof Beans> = {
  install,
  name: pack.name,
  version: pack.version,
  types: Beans,
  module: new AsyncIocModule(async (bind, _, isBound) => {
    console.debug(`【${ pack.name }】 IocModule start load`);
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
    bind(stateBeans.AppState).toConstantValue(storeToRefs(stateStore))
    bind(stateBeans.AppStateActions).toConstantValue(stateStore)
    bind(stateBeans.AppStateGetters).toConstantValue(stateStore)

    // 应用锁
    const appLockState = useAppLockState()
    bind(layoutBeans.AppLockState).toConstantValue(storeToRefs(appLockState))
    bind(layoutBeans.AppLockActions).toConstantValue(appLockState)

    // 环境配置
    const globalConfig = getGlobalConfig(import.meta.env);
    bind(settingsBeans.GlobConfig).toConstantValue(globalConfig);

    // 工程设置
    const projectSetting = environment(getAppConfig(import.meta.env));
    bind(settingsBeans.DefaultProjectSetting).toConstantValue(projectSetting);
    bind(settingsBeans.DefaultHeaderSetting).toConstantValue(projectSetting.headerSetting);
    bind(settingsBeans.DefaultMultiTabsSetting).toConstantValue(projectSetting.multiTabsSetting);
    bind(settingsBeans.DefaultMenuSetting).toConstantValue(projectSetting.menuSetting);
    bind(settingsBeans.DefaultTransitionSetting).toConstantValue(projectSetting.transitionSetting);
    bind(settingsBeans.DefaultSporadicSetting).toConstantValue(projectSetting.sporadicSetting);
    // bind(settingsBeans.DefaultThemeSetting).toConstantValue(projectSetting.themeSetting);

    // 站点信息
    const siteInfo = useSiteInfo();
    bind(settingsBeans.AppSiteInfoState).toConstantValue(siteInfo);
    bind(settingsBeans.AppSiteInfoActions).toConstantValue(siteInfo);

    // 权限设置
    const permissionStore = usePermissionStore()
    bind(stateBeans.PermissionState).toConstantValue(permissionStore)
    bind(stateBeans.PermissionAction).toConstantValue(permissionStore)

    const appRuntimeOptions = useAppRuntimeStore()
    bind(stateBeans.AppRuntimeConfigOptions).toConstantValue(appRuntimeOptions)
    bind(stateBeans.AppMenuState).toConstantValue(appRuntimeOptions)
    bind(Beans.AppRuntimeOptions).toConstantValue(appRuntimeOptions)

    bind(Beans.InfrastructureAxios).to(InfrastructureAxios);
    if (!isBound(Beans.CreateAxiosOptions)) {
      bind(Beans.CreateAxiosOptions).toDynamicValue(
        (context) => {
          if (!isBound(Beans.InfrastructureOptions)) {
            throw new Error('ContextOptions not found');
          }
          const contextOpt:InfrastructureOptions = context.container.get(Beans.InfrastructureOptions);
          let requestOptions:RequestOptions;
          if (isBound(Beans.RequestOptions)) {
            requestOptions = context.container.get(Beans.RequestOptions);
          } else {
            requestOptions = defaultRequestOptions;
          }
          requestOptions.apiUrl = contextOpt.apiUrl;
          const transformer = context.container.get(Beans.AxiosTransform);
          const config = {
            transform: clone(transformer),
            requestOptions,
          };
          return deepMerge(defaultCreateAxiosOptions, config);
        }
      );
    }
  }),
  async beforeSetup(app) {
    setupPinia(app)
  }
};
