import type { AppState } from '@rchitect-rock/state'
import { defineStore } from "pinia";
import { Ref, computed, ref, shallowReactive, unref } from 'vue-demi';
import { useRouter, useAppSetting } from '@rchitect-rock/hooks';

export type AppStateStore = ReturnType<typeof useStateStore>;

export const useStateStore = defineStore('AppStateStore', () => {
  const state: AppState.State = {
  }

  const getters: AppState.Getter = {
    getFullContent: computed(() => {
      const { currentRoute } = useRouter();
      const route = unref(currentRoute);
      const query = route.query;
      if (query && Reflect.has(query, '__full__')) {
        return true;
      }
      // Return to the configuration in the configuration file
      return unref(useAppSetting().fullContent);
    })
  }

  const actions: AppState.Action = {
  }
  return {
    ...state,
    ...getters,
    ...actions
  };
})
