import {
  BeforeMiniState,
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
  Setting,
  TransitionSetting,
} from '@weiming-rock/types'
import { defineStore } from '@weiming-rock/state'
import { deepMerge } from '@vben/utils'
import { ThemeEnum } from '@weiming-rock/constants'
import { diK } from '@weiming-rock/ioc'
import TYPES from '#/../beankeys'

export const useSettingStore = defineStore({
  id: 'app-setting-store',
  persist: {
    paths: ['darkMode', 'projectConfig'],
  },
  state: (): Setting.SettingState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: null,
    beforeMiniInfo: {},
  }),
  getters: {
    getDarkMode(): ThemeEnum {
      return this.darkMode || ThemeEnum.DARK
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
  },
  actions: {
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      // localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      console.log(loading)
    },
    resetProjectConfig() {
      this.setProjectConfig(diK(TYPES.ProjectSetting) || {})
    },
  }
})
