/**
 * @description: 环境变量配置
 */
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // Authorization mode
  VITE_GLOB_APP_AUTH_MODE: string
  // OAuth2 Automatic login
  VITE_GLOB_APP_IS_AUTO_OAUTH?: boolean
  // OAuth2 Code login route
  VITE_GLOB_APP_OAUTH_CODE_ROUTE?: string
  // OAuth2 Code login host
  VITE_GLOB_APP_OAUTH_CODE_SERVER?: string
  // 其他配置
  [key: string]: any
}