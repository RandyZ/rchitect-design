import type {
  CacheTypeEnum,
  ContentLayoutEnum,
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
  TriggerEnum,
  RouterTransitionEnum,
} from '@rchitect-design/constants'
import type { FooterLinkOptions, LocaleType } from '../configuration'

/**
 * @description:  菜单设置
 */
export interface MenuSetting {
  bgColor:string
  fixed:boolean
  collapsed:boolean
  canDrag:boolean
  show:boolean
  hidden:boolean
  split:boolean
  menuWidth:number
  mode:MenuModeEnum
  type:MenuTypeEnum
  theme:ThemeEnum
  topMenuAlign:'start' | 'center' | 'end'
  trigger:TriggerEnum
  accordion:boolean
  closeMixSidebarOnChange:boolean
  collapsedShowTitle:boolean
  mixSideTrigger:MixSidebarTriggerEnum
  mixSideFixed:boolean
  readonly width?:number
  readonly mixSidebarWidth?:number
  readonly collapsedWidth?:number
}

/**
 * @description: 多Tab设置
 */
export interface MultiTabsSetting {
  cache:boolean
  // Turn on
  show:boolean
  hidden:boolean
  // Turn on quick actions
  showQuick:boolean
  canDrag:boolean
  // Whether to show the refresh button
  showRedo:boolean
  // Whether to show the collapse button
  showFold:boolean
  readonly height?:number
}

/**
 * @description: Header设置
 */
export interface HeaderSetting {
  color:string
  bgColor:string
  fixed:boolean
  show:boolean
  // 是否隐藏Header
  hidden:boolean
  theme:ThemeEnum
  // Turn on full screen
  showFullScreen:boolean
  // Whether to show the lock screen
  useLockPage:boolean
  // Show document button
  showDoc:boolean
  // Show message center button
  showNotice:boolean
  showSearch:boolean
  showLocalePicker:boolean
  readonly height?:number
}

export interface ContainerSetting {
  // 内容区域宽度
  // contentWidth:number,
  // 左侧菜单
  showMenu:boolean,
  // 顶栏
  showHeader:boolean,
  // Whether to display the logo
  showLogo:boolean,
  // Whether to show the global footer
  showFooter:boolean,
  // 自动锁屏
  autoLockScreen:boolean,
  // 固定header
  fixedHeader:boolean,
}

/**
 * @description: 本地化设置
 */
export interface LocaleSetting {
  // Current language
  locale:LocaleType
  // default language
  fallback:LocaleType
  // available Locales
  availableLocales:LocaleType[]
}

/**
 * @description: 动画设置
 */
export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable:boolean
  // Route basic switching animation
  basicTransition:RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading:boolean
  // Whether to open the top progress bar
  openNProgress:boolean
}

/**
 * @description: 主题设置
 */
export interface ThemeSetting {
  // 主题模式
  theme:ThemeEnum
  // Theme color
  themeColor:string
  // Website gray mode, open for possible mourning dates
  grayMode:boolean
  // Whether to turn on the color weak mode
  colorWeak:boolean
}

/**
 * @description: 功能标志设置
 */
export interface FeatureFlagSetting {
  /** Whether to turn on the multi-lang switcher */
  showPicker:boolean
  // Whether to show the theme switch button
  showDarkModeToggle:boolean
  // pageLayout whether to enable keep-alive
  openKeepAlive:boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage:boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch:boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending:boolean
  // Whether to open back to top
  useOpenBackTop:boolean
  // Show breadcrumbs
  showBreadCrumb:boolean
  // Show breadcrumb icon
  showBreadCrumbIcon:boolean
  // Configure where the Setting Drawer is displayed
  showSettingDrawer:boolean
  /**
   * Whether to show the configuration button
   * @deprecated use  SettingButtonPositionEnum.NONE
   */
  showSettingButton:boolean
  // Configure where the button is displayed
  settingButtonPosition:SettingButtonPositionEnum
  // The main interface is displayed in full screen, the menu is not displayed, and the top
  canFullContent:boolean
}

/**
 * @description: 工程中其他参数设置
 */
export interface SporadicSetting {
  // Lock screen time
  lockTime:number
  // Permission mode
  permissionMode:PermissionModeEnum
  // Storage location of permission related information
  permissionCacheType:CacheTypeEnum
  // Session timeout processing
  sessionTimeoutProcessing:SessionTimeoutProcessingEnum
  // content width
  contentMode:ContentLayoutEnum
}

export interface WebsiteSetting {
  /** Logo url */
  logo: string
  /** Website title */
  title:string
  /** Web links of footer */
  links:FooterLinkOptions[]
  /** Copyright */
  copyright:string
}

/**
 * @description:  Setting interface parameters
 */
export interface ProjectSetting {
  // menuType: MenuTypeEnum;
  headerSetting:HeaderSetting
  // container setting
  containerSetting:ContainerSetting
  // menuSetting
  menuSetting:MenuSetting
  // Multi-tab settings
  multiTabsSetting:MultiTabsSetting
  // Animation configuration
  transitionSetting:TransitionSetting
  // 主题配置
  themeSetting:ThemeSetting
  // 功能标志配置
  featureFlagSetting:FeatureFlagSetting
  // Sporadic settings to classify
  sporadicSetting:SporadicSetting
  // 国际化配置
  localSetting:LocaleSetting
  /** Website infos */
  websiteSetting:WebsiteSetting
}
