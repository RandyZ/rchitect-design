import type {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectSetting,
  TransitionSetting,
  SporadicSetting
} from '@rchitect-design/types';
import type { Ref, ComputedRef } from 'vue-demi';
import { ContainerSetting } from "@rchitect-design/types";

/**
 * 应用设置
 */
export declare namespace AppConfig {
  export interface State {
    /**
     * Header setting
     */
    headerSetting: Ref<HeaderSetting>
    /**
     * Content Container setting
     */
    containerSetting: Ref<ContainerSetting>
    // menuSetting
    menuSetting: Ref<MenuSetting>
    // Multi-tab settings
    multiTabsSetting: Ref<MultiTabsSetting>
    // Animation configuration
    transitionSetting: Ref<TransitionSetting>
    // Sporadic settings to classify
    sporadicSetting: Ref<SporadicSetting>
  }

  export type Getter = {
    getProjectConfig: ComputedRef<ProjectSetting | null>;
    isInited: ComputedRef<boolean>
  };

  export interface Action {
    setProjectConfig(config: DeepPartial<ProjectSetting>): Promise<void>;
    resetProjectConfig(): void;
  }
}
