import { defineStore } from "pinia";
import { ref, computed, unref } from 'vue-demi';
import { deepMerge } from '@rchitect-rock/tools'
import isUndefined from 'lodash-es/isUndefined';
import type { AppConfig } from "@rchitect-rock/settings";
import type { ServiceIdentifier } from "@rchitect-rock/ioc";

export type AppConfigStore = ReturnType<typeof useSettingStore>;

export const useSettingStore = defineStore('AppConfigStore', () => {
  const state: AppConfig.State = {
    /**
     * Header setting
     */
    headerSetting: ref({} as any),
    // menuSetting
    menuSetting: ref({} as any),
    // Multi-tab settings
    multiTabsSetting: ref({} as any),
    // Animation configuration
    transitionSetting: ref({} as any),
    // Sporadic settings to classify
    sporadicSetting: ref({} as any),
  }

  const getters: AppConfig.Getter = {
    getProjectConfig: computed(() => {
      return {
        headerSetting: unref(state.headerSetting),
        menuSetting: unref(state.menuSetting),
        multiTabsSetting: unref(state.multiTabsSetting),
        transitionSetting: unref(state.transitionSetting),
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
        isUndefined(headerSetting) && isUndefined(menuSetting) && isUndefined(multiTabsSetting) && isUndefined(transitionSetting) && isUndefined(sporadicSetting)
      );
    })
  }
  const actions: AppConfig.Action = {
    setProjectConfig: async (config) => {
      state.headerSetting.value = deepMerge(unref(state.headerSetting) || {}, config.headerSetting)
      state.menuSetting.value = deepMerge(unref(state.headerSetting) || {}, config.menuSetting)
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

/**
 * 应用级别配置的beans
 * 
 * @param packName 
 * @returns 
 */
export default (packName: string) => ({
  AppConfigStore: Symbol.for(`${packName}/AppConfigStore`) as ServiceIdentifier<AppConfigStore>,
})
