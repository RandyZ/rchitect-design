import type {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectSetting,
  TransitionSetting,
  SporadicSetting
} from '@rchitect-design/types';
import type { Ref, ComputedRef } from 'vue-demi';

export declare namespace AppConfig {
  export interface State {
    /**
     * Header setting
     */
    headerSetting: Ref<HeaderSetting | undefined>
    // menuSetting
    menuSetting: Ref<MenuSetting | undefined>
    // Multi-tab settings
    multiTabsSetting: Ref<MultiTabsSetting | undefined>
    // Animation configuration
    transitionSetting: Ref<TransitionSetting | undefined>
    // Sporadic settings to classify
    sporadicSetting: Ref<SporadicSetting | undefined>
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
