import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from './package.json';
import type { AppConfig, AppSetting, AppSiteInfo, Header, MenuSettingManager } from './src/index';
import type {
  GlobConfig,
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectSetting,
  SporadicSetting,
  TransitionSetting
} from '@rchitect-design/types';
import { HeaderSettingManager } from "./src/index";

// Header相关的Bean
const headerBeans = {
  HeaderState: Symbol.for(`${pack.name}/Header.State`) as ServiceIdentifier<Header.State>,
  HeaderSettingManager: Symbol.for(`${pack.name}/HeaderSettingManager`) as ServiceIdentifier<HeaderSettingManager>,
}

export default {
  // Types中定义的默认值数据
  /**
   * @deprecated 使用环境变量代替
   */
  GlobConfig: Symbol.for('@rchitect-design/types/GlobConfig') as ServiceIdentifier<GlobConfig>,
  /**
   * @deprecated 直接使用内部五个Setting
   * @see {DefaultHeaderSetting}
   * @see {DefaultMenuSetting}
   * @see {DefaultMultiTabsSetting}
   * @see {DefaultTransitionSetting}
   * @see {DefaultSporadicSetting}
   */
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

  AppSiteInfoState: Symbol.for(`${ pack.name }/AppSiteInfo.State`) as ServiceIdentifier<AppSiteInfo.State>,
  AppSiteInfoActions: Symbol.for(`${ pack.name }/AppSiteInfo.Actions`) as ServiceIdentifier<AppSiteInfo.Actions>,

  MenuSettingManager: Symbol.for(`${ pack.name }/MenuSettingManager`) as ServiceIdentifier<MenuSettingManager>,


  ...headerBeans
};