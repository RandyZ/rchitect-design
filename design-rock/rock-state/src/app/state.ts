import type {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectSetting,
  TransitionSetting,
  SporadicSetting
} from '@rchitect-design/types';
import type { Ref, ComputedRef } from 'vue-demi';

export declare namespace AppState {
  export interface State {
    fullContent: Ref<boolean>;
    /**
     * Header setting
     */
    headerSetting: Ref<HeaderSetting>
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
    getFullContent: ComputedRef<boolean>;
  };

  export interface Action {
    setProjectConfig(config: DeepPartial<ProjectSetting>): Promise<void>;
    resetProjectConfig(): void;
  }
}
