import type {
  GlobEnvConfig,
  HeaderSetting, MenuSetting, MultiTabsSetting, SporadicSetting, TransitionSetting
} from "@rchitect-design/types";
import { 
  CacheTypeEnum, 
  ContentLayoutEnum, 
  PermissionModeEnum, 
  SessionTimeoutProcessingEnum, SettingButtonPositionEnum, 
  ColorPreset, RouterTransitionEnum, MenuModeEnum, MenuTypeEnum, 
  MixSidebarTriggerEnum, ThemeEnum, TriggerEnum 
} from "@rchitect-design/constants";
import { isUndefined } from 'lodash-es';

export const DEFAULT_HEADER_SETTING: HeaderSetting = {
  hidden: false,
  // header bg color
  bgColor: ColorPreset.HEADER_PRESET_BG_COLOR_LIST[0],
  // header text color
  color: ColorPreset.HEADER_PRESET_COLOR_LIST[0],
  // Fixed at the top
  fixed: true,
  // Whether to show top
  show: true,
  // theme
  theme: ThemeEnum.LIGHT,
  // Whether to enable the lock screen function
  useLockPage: true,
  // Whether to show the full screen button
  showFullScreen: true,
  // Whether to show the document button
  showDoc: true,
  // Whether to show the notification button
  showNotice: true,
  // Whether to display the menu search
  showSearch: true,
  showLocalePicker: true,
}

export const DEFAULT_MENU_SETTING: MenuSetting = {
  // sidebar menu bg color
  bgColor: ColorPreset.SIDE_BAR_BG_COLOR_LIST[0],
  //  Whether to fix the left menu
  fixed: true,
  // Menu collapse
  collapsed: false,
  // Whether to display the menu name when folding the menu
  collapsedShowTitle: false,
  // Whether it can be dragged
  // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
  canDrag: false,
  // Whether to show no dom
  show: true,
  // Whether to show dom
  hidden: false,
  // Menu width
  menuWidth: 210,
  // Menu mode
  mode: MenuModeEnum.INLINE,
  // Menu type
  type: MenuTypeEnum.SIDEBAR,
  // Menu theme
  theme: ThemeEnum.DARK,
  // Split menu
  split: false,
  // Top menu layout
  topMenuAlign: 'center',
  // Fold trigger position
  trigger: TriggerEnum.HEADER,
  // Turn on accordion mode, only show a menu
  accordion: true,
  // Switch page to close menu
  closeMixSidebarOnChange: false,
  // Module opening method ‘click’ |'hover'
  mixSideTrigger: MixSidebarTriggerEnum.CLICK,
  // Fixed expanded menu
  mixSideFixed: false,
}

export const DEFAULT_MULTITAB_SETTING: MultiTabsSetting = {
  hidden: false,
  cache: false,
  // Turn on
  show: true,
  // Is it possible to drag and drop sorting tabs
  canDrag: true,
  // Turn on quick actions
  showQuick: true,
  // Whether to show the refresh button
  showRedo: true,
  // Whether to show the collapse button
  showFold: true,
}

export const DEFAULT_TRANSITION_SETTING: TransitionSetting = {
  //  Whether to open the page switching animation
  // The disabled state will also disable pageLoading
  enable: true,

  // Route basic switching animation
  basicTransition: RouterTransitionEnum.FADE_SIDE,

  // Whether to open page switching loading
  // Only open when enable=true
  openPageLoading: true,

  // Whether to open the top progress bar
  openNProgress: false,
}

/**
 * @description: Sporadic settings
 */
export const DEFAULT_SPORADIC_SETTING: SporadicSetting = {
  // Whether to open the top progress bar
  openNProgress: true,
  // pageLayout whether to enable keep-alive
  openKeepAlive: true,
  // Lock screen time
  lockTime: 0,
  // Show breadcrumbs
  showBreadCrumb: true,
  // Show breadcrumb icon
  showBreadCrumbIcon: true,
  // Whether to open back to top
  useOpenBackTop: true,
  // Is it possible to embed iframe pages
  canEmbedIFramePage: true,
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: false,
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum.LOCAL,
  // Whether to show the configuration button
  showSettingButton: true,
  // Whether to show the theme switch button
  showDarkModeToggle: true,
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // Configure where the Setting Drawer is displayed
  showSettingDrawer: true,
  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // Website gray mode, open for possible mourning dates
  grayMode: false,
  // Whether to turn on the color weak mode
  colorWeak: false,
  // Theme color
  themeColor: ColorPreset.APP_PRESET_COLOR_LIST[0],

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: false,
  // content width
  contentMode: ContentLayoutEnum.FULL,
  // Whether to display the logo
  showLogo: true,
  // Whether to show the global footer
  showFooter: true
}

const defaultProjectSetting = {
  headerSetting: DEFAULT_HEADER_SETTING,
  menuSetting: DEFAULT_MENU_SETTING,
  multiTabsSetting: DEFAULT_MULTITAB_SETTING,
  transitionSetting: DEFAULT_TRANSITION_SETTING,
  sporadicSetting: DEFAULT_SPORADIC_SETTING,
}

export default (env?: GlobEnvConfig) => {
  if (isUndefined(env)) {
    return defaultProjectSetting
  } else {
    // TODO 完成配置文件到默认配置的合并
    return {
      headerSetting: DEFAULT_HEADER_SETTING,
      menuSetting: DEFAULT_MENU_SETTING,
      multiTabsSetting: DEFAULT_MULTITAB_SETTING,
      transitionSetting: DEFAULT_TRANSITION_SETTING,
      sporadicSetting: DEFAULT_SPORADIC_SETTING,
    }
  }
}