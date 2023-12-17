import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from './package.json';
import type { AppConfig, AppSetting } from './src/app';
import type { MenuSettingManager } from './src/menu';
import {
  type DataEventBus,
} from './src/index';
import type {
  GlobConfig,
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectSetting,
  SporadicSetting,
  TransitionSetting
} from '@rchitect-design/types';


export default {
  DataEventBus: Symbol.for(`${ pack.name }/DataEventBus`) as ServiceIdentifier<DataEventBus>,
  /**
   * @deprecated
   */
  GlobConfig: Symbol.for('@rchitect-design/types/GlobConfig') as ServiceIdentifier<GlobConfig>,
  DefaultProjectSetting: Symbol.for('@rchitect-design/types/DefaultProjectSetting') as ServiceIdentifier<ProjectSetting>,
  DefaultHeaderSetting: Symbol.for('@rchitect-design/types/DefaultHeaderSetting') as ServiceIdentifier<HeaderSetting>,
  DefaultMenuSetting: Symbol.for('@rchitect-design/types/DefaultMenuSetting') as ServiceIdentifier<MenuSetting>,
  DefaultMultiTabsSetting: Symbol.for('@rchitect-design/types/DefaultMultiTabsSetting') as ServiceIdentifier<MultiTabsSetting>,
  DefaultTransitionSetting: Symbol.for('@rchitect-design/types/DefaultTransitionSetting') as ServiceIdentifier<TransitionSetting>,
  DefaultSporadicSetting: Symbol.for('@rchitect-design/types/DefaultSporadicSetting') as ServiceIdentifier<SporadicSetting>,

  AppSettingState: Symbol.for(`${ pack.name }/AppSetting.State`) as ServiceIdentifier<AppSetting.State>,
  AppSettingGetter: Symbol.for(`${ pack.name }/AppSetting.Getter`) as ServiceIdentifier<AppSetting.Getter>,
  AppSettingAction: Symbol.for(`${ pack.name }/AppSetting.Action`) as ServiceIdentifier<AppSetting.Action>,

  AppConfigState: Symbol.for(`${ pack.name }/AppConfig.State`) as ServiceIdentifier<AppConfig.State>,
  AppConfigGetter: Symbol.for(`${ pack.name }/AppConfig.Getter`) as ServiceIdentifier<AppConfig.Getter>,
  AppConfigAction: Symbol.for(`${ pack.name }/AppConfig.Action`) as ServiceIdentifier<AppConfig.Action>,

  MenuSettingManager: Symbol.for(`${ pack.name }/MenuSettingManager`) as ServiceIdentifier<MenuSettingManager>,
};