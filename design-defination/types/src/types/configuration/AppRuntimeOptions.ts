import type { CacheTypeEnum, MenuTypeEnum, PermissionModeEnum, SessionTimeoutProcessingEnum, SettingButtonPositionEnum, ThemeEnum, TriggerEnum } from "@rchitect-design/constants"
import type { MenuConfigOptions } from "./MenuConfurations"
import type { HeaderConfigOptions } from "./HeaderConfigOptions"
import type { TabBarConfigOptions } from "./TabBarConfigOptions"
import type { ContentConfigOptions, FooterConfigOptions, LogoConfigOptions, TransitionConfigOptions } from "./ToolkitConfigOptions"

export interface SidebarConfigOptions {
  theme: ThemeEnum
  show: boolean
  visible: boolean
  fixed: boolean
  bgColor: string
  collapsed: boolean
  width: number
  trigger: TriggerEnum
  readonly mixSidebarWidth: number
  readonly collapsedWidth: number
}

/**
 * DefineAppConfigOptions
 * TODO 归拢这个数据依赖，方便各个模块直接使用
 */
export interface AppRuntimeConfigOptions {
  // Navigation bar mode
  navBarMode: MenuTypeEnum
  // Theme
  theme: ThemeEnum
  // Theme color
  themeColor: string
  // Whether to show the theme switch button
  showThemeModeToggle: boolean
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  closeMixSidebarOnChange: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Configuration setting drawer open
  openSettingDrawer: boolean
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // Website gray mode, open for possible mourning dates
  grayMode: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
  // Lock screen time
  lockTime: number
  // Whether to show the lock screen
  useLockPage: boolean
  sidebar: SidebarConfigOptions
  menu: MenuConfigOptions
  header: HeaderConfigOptions
  logo: LogoConfigOptions
  tabTar: TabBarConfigOptions
  content: ContentConfigOptions
  footer: FooterConfigOptions
  transition: TransitionConfigOptions
}
/**
 * @deprecated
 */
export type DefineAppConfigOptions = AppRuntimeConfigOptions