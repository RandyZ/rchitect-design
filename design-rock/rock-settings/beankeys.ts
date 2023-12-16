import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from './package.json';
import {
  appBeanGenerator,
  type DataEventBus,
} from './src/index';
import type { GlobConfig, HeaderSetting, MenuSetting, MultiTabsSetting, ProjectSetting, SporadicSetting, TransitionSetting } from '@rchitect-design/types';


export default {
  ...appBeanGenerator(pack.name),
  DataEventBus: Symbol.for(`${pack.name}/DataEventBus`) as ServiceIdentifier<DataEventBus>,
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
};