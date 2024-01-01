import { defineStore } from "pinia";
import { computed, unref, toRefs, ref, shallowReactive } from 'vue-demi';
import type { AppRuntimeConfigOptions } from '@rchitect-design/types';
import {
  CacheTypeEnum,
  ColorPreset,
  ContentLayoutEnum, MenuModeEnum,
  MenuTypeEnum, MixSidebarTriggerEnum, PermissionModeEnum,
  RouterTransitionEnum, SessionTimeoutProcessingEnum, SettingButtonPositionEnum,
  ThemeEnum, TriggerEnum
} from "@rchitect-design/constants";
import type { AppMenu } from "@rchitect-rock/state";
import { ToRefs } from "vue";

export type AppRuntimeOptions = ReturnType<typeof useAppRuntimeStore>;

export const useAppRuntimeStore = defineStore('AppRuntimeConfigOptionsStore', () => {
  const options: AppRuntimeConfigOptions = {
    theme: ThemeEnum.LIGHT,
    navBarMode: MenuTypeEnum.SIDEBAR,
    themeColor: '',
    showThemeModeToggle: true,
    openKeepAlive: true,
    useOpenBackTop: true,
    closeMessageOnSwitch: false,
    removeAllHttpPending: true,
    permissionCacheType: CacheTypeEnum.LOCAL,
    settingButtonPosition: SettingButtonPositionEnum.AUTO,
    openSettingDrawer: false,
    permissionMode: PermissionModeEnum.ROUTE_MAPPING,
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
    grayMode: false,
    colorWeak: false,
    lockTime: 0,
    useLockPage: false,
    canEmbedIFramePage: true,
    closeMixSidebarOnChange: false,
    sidebar: {
      theme: ThemeEnum.LIGHT,
      show: true,
      visible: true,
      bgColor: ColorPreset.SIDE_BAR_BG_COLOR_LIST[0],
      fixed: false,
      width: 210,
      mixSidebarWidth: 80,
      collapsedWidth: 48,
      collapsed: false,
      trigger: TriggerEnum.CENTER,
    },
    menu: {
      canDrag: false,
      split: false,
      mode: MenuModeEnum.VERTICAL,
      accordion: false,
      collapsedShowTitle: false,
      mixSideTrigger: MixSidebarTriggerEnum.CLICK,
      mixSideFixed: false,
      topMenuAlign: 'start',
      dropdownPlacement: 'top-start',
      subMenuWidth: 0,
    },
    header: {
      theme: ThemeEnum.DARK,
      show: true,
      visible: true,
      bgColor: ColorPreset.HEADER_PRESET_BG_COLOR_LIST[0],
      fixed: false,
      height: 48,
      showDoc: true,
      showBreadCrumb: true,
      showBreadCrumbIcon: true,
      showFullScreen: true,
      showNotice: true,
      showSearch: true,
      showLocalePicker: true,
      showSetting: true,
    },
    logo: {
      show: true,
      visible: true,
      showTitle: true,
    },
    tabTar: {
      show: true,
      visible: true,
      height: 36,
      cache: true,
      canDrag: false,
      showFold: true,
      showQuick: true,
      showRedo: true,
    },
    content: {
      fullScreen: false,
      mode: ContentLayoutEnum.FULL,
    },
    footer: {
      height: 60,
      show: false,
      visible: false,
    },
    transition: {
      enable: true,
      basicTransition: RouterTransitionEnum.FADE_SIDE,
      openPageLoading: true,
      openNProgress: false,
    },
  }
  const state = toRefs(shallowReactive(options))
  const menuState :ToRefs<AppMenu.State> = {
    collapsed:ref(false)
  }
  return {
    ...state,
    ...menuState,
  };
})
