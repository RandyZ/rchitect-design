import { defineStore } from "pinia";
import { ref, computed, unref, ToRefs } from 'vue-demi';
import { deepMerge, getAppConfig } from '@rchitect-rock/tools'
import isEmpty from 'lodash-es/isEmpty';
import type { AppConfig } from "@rchitect-rock/settings";
import environment from "#/app-config/environment";

export type AppConfigStore = ReturnType<typeof useConfigStore>;

export const useConfigStore = defineStore('AppConfigStore', () => {
  const defaultState = environment(getAppConfig(import.meta.env))
  const state:ToRefs<AppConfig.State> = {
    // Header setting
    headerSetting: ref(defaultState.headerSetting || {} as any),
    // Content Container setting
    containerSetting: ref(defaultState.containerSetting || {} as any),
    // menuSetting
    menuSetting: ref(defaultState.menuSetting || {} as any),
    // Multi-tab settings
    multiTabsSetting: ref(defaultState.multiTabsSetting || {} as any),
    // Sporadic settings to classify
    sporadicSetting: ref(defaultState.sporadicSetting || {} as any),
    // 主题配置
    themeSetting: ref(defaultState.themeSetting || {} as any),
    // 功能标志配置
    featureFlagSetting: ref(defaultState.featureFlagSetting || {} as any),
    // 国际化配置
    localSetting: ref(defaultState.localSetting || {} as any),
    // Animation configuration
    transitionSetting: ref(defaultState.transitionSetting || {} as any),
    websiteSetting: ref(defaultState.websiteSetting || {} as any)
  }

  const getters:AppConfig.Getter = {
    getProjectConfig: computed(() => {
      return {
        headerSetting: unref(state.headerSetting),
        menuSetting: unref(state.menuSetting),
        multiTabsSetting: unref(state.multiTabsSetting),
        transitionSetting: unref(state.transitionSetting),
        sporadicSetting: unref(state.sporadicSetting),
        themeSetting: unref(state.themeSetting),
        featureFlagSetting: unref(state.featureFlagSetting),
        localSetting: unref(state.localSetting),
        containerSetting: unref(state.containerSetting),
        websiteSetting: unref(state.websiteSetting)
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
        isEmpty(headerSetting) && isEmpty(menuSetting)
        && isEmpty(multiTabsSetting) && isEmpty(transitionSetting)
        && isEmpty(sporadicSetting) && isEmpty(state.themeSetting.value)
      );
    })
  }
  const actions:AppConfig.Action = {
    setProjectConfig: async (config) => {
      state.headerSetting.value = deepMerge(unref(state.headerSetting) || {}, config.headerSetting || {})
      state.containerSetting.value = deepMerge(unref(state.containerSetting), config.containerSetting || {})
      state.menuSetting.value = deepMerge(unref(state.menuSetting), config.menuSetting || {})
      state.multiTabsSetting.value = deepMerge(unref(state.multiTabsSetting), config.multiTabsSetting || {})
      state.transitionSetting.value = deepMerge(unref(state.transitionSetting) || {}, config.transitionSetting)
      state.themeSetting.value = deepMerge(unref(state.themeSetting) || {}, config.themeSetting)
      state.featureFlagSetting.value = deepMerge(unref(state.featureFlagSetting) || {}, config.featureFlagSetting)
      state.sporadicSetting.value = deepMerge(unref(state.sporadicSetting) || {}, config.sporadicSetting)
      state.localSetting.value = deepMerge(unref(state.localSetting) || {}, config.localSetting)
      state.websiteSetting.value = deepMerge(unref(state.websiteSetting) || {}, config.websiteSetting)
    },
    resetProjectConfig: () => {
      setProjectConfig(defaultState)
    }
  }
  return {
    ...state,
    ...getters,
    ...actions
  }
}, {
  persist: true
})
