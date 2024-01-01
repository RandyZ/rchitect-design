import { CacheTypeEnum, MenuTypeEnum, PermissionModeEnum, SessionTimeoutProcessingEnum, SettingButtonPositionEnum, ThemeEnum, TriggerEnum } from "@rchitect-design/constants"
import { MenuConfigOptions } from "./MenuConfurations"
import { HeaderConfigOptions } from "./HeaderConfigOptions"
import { TabTbrConfigOptions } from "./TabBarConfigOptions"
import { ContentConfigOptions, FooterConfigOptions, LogoConfigOptions, TransitionConfigOptions } from "./ToolkitConfigOptions"

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
 * @deprecated 分解这个依赖
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
  /**
   * 菜单配置
   * @deprecated 挪到MenuSettingData中
   */
  menu: MenuConfigOptions
  header: HeaderConfigOptions
  logo: LogoConfigOptions
  tabTar: TabTbrConfigOptions
  content: ContentConfigOptions
  footer: FooterConfigOptions
  transition: TransitionConfigOptions
}
/**
 * @deprecated
 */
export type DefineAppConfigOptions = AppRuntimeConfigOptions