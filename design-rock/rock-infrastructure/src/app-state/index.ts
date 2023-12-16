import { ThemeEnum } from '@rchitect-design/constants';
import { AppSetting } from '@rchitect-rock/settings'
import { defineStore } from "pinia";
import { Ref, computed, ref, shallowReactive, unref } from 'vue-demi';
import { BeforeMiniState } from '@rchitect-design/types';
import { deepMerge } from '@rchitect-rock/tools';

export type AppSettingStore = ReturnType<typeof useSettingStore>;

export const useSettingStore = defineStore('AppSettingStore', () => {
  const state: AppSetting.State = {
    // 主题模式
    themeMode: ref(ThemeEnum.LIGHT),
    fullContent: ref(false),
    // Page loading status
    pageLoading: ref(false),
    appTimerId: ref(),
    // Info to keep before minify
    beforeMiniInfo: shallowReactive({}) as BeforeMiniState
  }

  const getters: AppSetting.Getter = {
    isFullContent: computed(() => unref(state.fullContent)),
    isPageLoading: computed(() => unref(state.fullContent)),
    isDarkMode: computed(() => unref(state.themeMode) === ThemeEnum.DARK),
    getThemeMode: computed(() => unref(state.themeMode) || ThemeEnum.LIGHT)
  }

  const actions: AppSetting.Action = {
    /**
    * Set loading status asyn
    * @param loading
    */
    setPageLoadingAction: (loading: boolean): Promise<void> => {
      return new Promise((resolve) => {
        state.pageLoading.value = loading;
        resolve();
      });
    },
    resetAllState: () => {
      state.themeMode.value = ThemeEnum.LIGHT;
      state.fullContent.value = false;
      state.pageLoading.value = false;
      state.appTimerId.value = undefined;
      state.beforeMiniInfo.menuCollapsed = undefined;
      state.beforeMiniInfo.menuMode = undefined;
      state.beforeMiniInfo.menuSplit = undefined;
      state.beforeMiniInfo.menuType = undefined;
    },
    /**
    * Set Theme mode
    *
    * @param mode
    */
    setThemeMode: (mode: ThemeEnum) => {
      state.themeMode.value = mode;
    },
    /**
    * When the window shrinks, remember some states, and restore these states when the window is restored
    */
    useBeforeMiniInfo: (): Ref<BeforeMiniState> => {
      return ref(state.beforeMiniInfo);
    },
    /**
    * Set the state keeped before minify
    * @param state
    */
    setBeforeMiniInfo: (beforeMiniInfo: BeforeMiniState) => {
      deepMerge(state.beforeMiniInfo, beforeMiniInfo);
    },
    /**
     * Toggle Theme from [Light, Dark]
     */
    toggleTheme: (): void => {
      if (unref(state.themeMode) === ThemeEnum.LIGHT) {
        state.themeMode.value = ThemeEnum.DARK
      } else {
        state.themeMode.value = ThemeEnum.LIGHT
      }
    }
  }
  return {
    ...state,
    ...getters,
    ...actions
  };
},{
  persist: true
})
