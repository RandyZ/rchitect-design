import { Store } from 'pinia';

declare module App {
  export interface AppState {
    fullContent: boolean;
    pageLoading: boolean;
    appTimerId?: TimeoutHandle;
  }

  export type AppGetter = {
    isFullContent: boolean;
    getPageLoading: boolean;
  };

  export interface AppAction {
    setPageLoading(loading: boolean): void;
    resetAllState(): void;
    setPageLoadingAction(loading: boolean): Promise<void>;
  }

  export type AppStore = Store<string, AppState, AppGetter, AppAction>;
}
