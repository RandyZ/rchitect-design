import { ThemeEnum } from '@rchitect-design/constants';
import type {
  BeforeMiniState,
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectSetting,
  TransitionSetting,
} from '@rchitect-design/types';

export declare module Setting {
  export interface SettingState {
    darkMode?: ThemeEnum;
    // Page loading status
    pageLoading: boolean;
    // project config
    projectConfig: ProjectSetting | null;
    // When the window shrinks, remember some states, and restore these states when the window is restored
    beforeMiniInfo: BeforeMiniState;
  }

  export type SettingGetter = {
    getDarkMode: ThemeEnum;
    getBeforeMiniInfo: BeforeMiniState;
    getProjectConfig: ProjectSetting;
    getHeaderSetting: HeaderSetting;
    getMenuSetting: MenuSetting;
    getMultiTabsSetting: MultiTabsSetting;
    getPageLoading: boolean;
    getTransitionSetting: TransitionSetting;
  };

  export interface SettingAction {
    setBeforeMiniInfo(state: BeforeMiniState): void;
    setProjectConfig(config: DeepPartial<ProjectSetting>): void;
    setDarkMode(mode: ThemeEnum): void;
    setPageLoadingAction(loading: boolean): Promise<void>;
    resetProjectConfig(): void;
  }
}
