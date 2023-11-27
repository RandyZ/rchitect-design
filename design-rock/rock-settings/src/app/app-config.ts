import type {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectSetting,
  TransitionSetting,
} from '@rchitect-design/types';

export declare namespace AppConfig {
  export interface State {
    // project config
    projectConfig: ProjectSetting | null;
  }

  export type Getter = {
    getProjectConfig: ProjectSetting;
    getHeaderSetting: HeaderSetting;
    getMenuSetting: MenuSetting;
    getMultiTabsSetting: MultiTabsSetting;
    getTransitionSetting: TransitionSetting;
  };

  export interface Action {
    setProjectConfig(config: DeepPartial<ProjectSetting>): void;
    resetProjectConfig(): void;
  }
}
