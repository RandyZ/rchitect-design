import type {
  ProjectSetting
} from '@rchitect-design/types';
import type { ComputedRef } from 'vue-demi';

/**
 * 应用预设设置
 */
export declare namespace AppConfig {

  export type State = ProjectSetting

  export type Getter = {
    getProjectConfig:ComputedRef<ProjectSetting | null>;
    isInited:ComputedRef<boolean>
  };

  export interface Action {
    setProjectConfig(config:DeepPartial<ProjectSetting>):Promise<void>;

    resetProjectConfig():void;
  }
}
