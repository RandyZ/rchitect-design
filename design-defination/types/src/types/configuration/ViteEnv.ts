/**
 * Vite global variable interface
 */
export interface ViteEnv {
  /**
 * 是否开启MOCk
 */
  VITE_USE_MOCK: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  /**
   * UNOCSS 独立创建配置文件还是Vite插件集成
   */
  VITE_UNOCSS_TYPE: 'independent' | 'plugin'
  /**
   * 应用的Title
   */
  VITE_GLOB_APP_TITLE: string
  /**
   * 应用的短名称
   */
  VITE_GLOB_APP_SHORT_NAME: string
  /**
   * 是否去掉log日志
   */
  VITE_DROP_CONSOLE: boolean
  /**
   * 是否启用https代理
   */
  VITE_USE_HTTPS: boolean
  /**
   * 是否启用代理
   */
  VITE_USE_PROXY: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_USE_IMAGEMIN: boolean,
  /**
   * 是否兼容遗产浏览器
   */
  VITE_LEGACY: boolean,
  /**
   * 扩展属性定义
   */
  [key: string]: any
}