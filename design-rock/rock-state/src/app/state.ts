import type { ComputedRef } from 'vue-demi';
import type { BeforeMiniState } from "@rchitect-design/types";
import type { ThemeEnum } from "@rchitect-design/constants";

export declare namespace AppState {
  export interface State{
    theme: ThemeEnum
    clsPrefix:string
    fullContent:boolean
    mobile:boolean
    loading:boolean
    appTimerId?:TimeoutHandle
    // Info to keep before minify
    beforeMiniInfo: BeforeMiniState;
  }

  export type Getter = {
    isFullContent: ComputedRef<boolean>;
    isDarkMode: ComputedRef<boolean>;
  };

  export interface Action {
    /**
     * 恢复默认状态
     */
    resetAllState:() => void
    /**
     * 切换主题
     */
    toggleTheme: () => void;
    /**
     * Set the state keeped before minify
     * @param state
     */
    setBeforeMiniInfo(state: BeforeMiniState): void;
  }
}
