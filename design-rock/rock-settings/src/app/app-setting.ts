import { ThemeEnum } from '@rchitect-design/constants';
import type { ComputedRef, Ref } from 'vue-demi';
import type { BeforeMiniState, Repository } from '@rchitect-design/types';

export declare namespace AppSetting {
  export interface State extends Repository.State {
    // 主题模式
    themeMode: Ref<ThemeEnum>;
    fullContent: Ref<boolean>;
    // Page loading status
    pageLoading: Ref<boolean>;
    appTimerId: Ref<TimeoutHandle | undefined>
    // Info to keep before minify
    beforeMiniInfo: BeforeMiniState;
  }

  export interface Getter extends Repository.Getters {
    isFullContent: ComputedRef<boolean>;
    isPageLoading: ComputedRef<boolean>;
    isDarkMode: ComputedRef<boolean>;
    getThemeMode: ComputedRef<ThemeEnum>;
  }

  export interface Action extends Repository.Actions {
    /**
     * Set loading status asyn
     * @param loading 
     */
    setPageLoadingAction(loading: boolean): Promise<void>;
    resetAllState(): void;
    /**
     * Set Theme mode
     * 
     * @param mode 
     */
    setThemeMode(mode: ThemeEnum): void;
    /**
     * 切换主题
     */
    toggleTheme: () => void;
    /**
     * When the window shrinks, remember some states, and restore these states when the window is restored
     */
    useBeforeMiniInfo(): Ref<BeforeMiniState>;
    /**
     * Set the state keeped before minify
     * @param state 
     */
    setBeforeMiniInfo(state: BeforeMiniState): void;
  }
}
