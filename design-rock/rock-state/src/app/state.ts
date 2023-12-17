import type { Ref, ComputedRef } from 'vue-demi';
import type { TabBarConfigOptions } from "@rchitect-design/types";

export declare namespace AppState {
  export interface State {
    clsPrefix: Ref<string>
    fullContent: Ref<boolean>
    mobile: Ref<boolean>
    theme: Ref<string>
    loading: Ref<boolean>
    appTimerId: Ref<TimeoutHandle | undefined>
    tabBar: Ref<TabBarConfigOptions>
  }

  export type Getter = {
    getFullContent: ComputedRef<boolean>;
  };

  export interface Action {
    /**
     * 恢复默认状态
     */
    restoreState: () => void
  }
}
