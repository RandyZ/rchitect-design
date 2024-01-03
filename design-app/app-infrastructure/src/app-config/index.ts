import { defineStore } from "pinia";
import { ref, computed, unref, ToRefs } from 'vue-demi';
import { deepMerge } from '@rchitect-rock/tools'
import isUndefined from 'lodash-es/isUndefined';
import type { AppConfig } from "@rchitect-rock/settings";

export type AppConfigStore = ReturnType<typeof useConfigStore>;

export const useConfigStore = defineStore('AppConfigStore', () => {
  const state:ToRefs<AppConfig.State> = {
    // Header setting
    headerSetting: ref(),
    // Content Container setting
    containerSetting: ref(),
    // menuSetting
    menuSetting: ref(),
    // Multi-tab settings
    multiTabsSetting: ref(),
    // Animation configuration
    transitionSetting: ref(),
    // Sporadic settings to classify
    sporadicSetting: ref(),
    // 主题配置
    themeSetting: ref(),
    // 功能标志配置
    featureFlagSetting: ref(),
    // 国际化配置
    localSetting: ref(),
  }

  const getters:AppConfig.Getter = {
    getProjectConfig: computed(() => {
      return {
        headerSetting: unref(state.headerSetting),
        menuSetting: unref(state.menuSetting),
        multiTabsSetting: unref(state.multiTabsSetting),
        transitionSetting: unref(state.transitionSetting),
        sporadicSetting: unref(state.sporadicSetting),
        sporadicSetting: unref(state.sporadicSetting)
      };
    }),
    isInited: computed(() => {
      const headerSetting = unref(state.headerSetting);
      // menuSetting
      const menuSetting = unref(state.menuSetting);
      // Multi-tab settings
      const multiTabsSetting = unref(state.multiTabsSetting);
      // Animation configuration
      const transitionSetting = unref(state.transitionSetting);
      // Sporadic settings to classify
      const sporadicSetting = unref(state.sporadicSetting);
      return (
        isUndefined(headerSetting) && isUndefined(menuSetting)
        && isUndefined(multiTabsSetting) && isUndefined(transitionSetting)
        && isUndefined(sporadicSetting) && isUndefined(state.themeSetting?.value)
        && isUndefined(sporadicSetting) && isUndefined(state.themeSetting?.value)
      );
    })
  }
  const actions:AppConfig.Action = {
    setProjectConfig: async (config) => {
      state.headerSetting.value = deepMerge(unref(state.headerSetting) || {}, config.headerSetting)
      state.menuSetting.value = deepMerge(unref(state.menuSetting) || {}, config.menuSetting)
      state.multiTabsSetting.value = deepMerge(unref(state.multiTabsSetting) || {}, config.multiTabsSetting)
      state.transitionSetting.value = deepMerge(unref(state.transitionSetting) || {}, config.transitionSetting)
      state.sporadicSetting.value = deepMerge(unref(state.sporadicSetting) || {}, config.sporadicSetting)
    },
    resetProjectConfig: () => {

    }
  }
  return {
    ...state,
    ...getters,
    ...actions
  }
})
