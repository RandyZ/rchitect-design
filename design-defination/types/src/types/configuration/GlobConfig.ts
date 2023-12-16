import { AuthorizationModeEnum } from '@rchitect-design/constants'
/**
 * @description: 代码层配置的类型
 * @deprecated 
 */
export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  apiUrl: string
  // Project abbreviation
  shortName: string
  // Authorization mode
  authMode: AuthorizationModeEnum,
  // OAuth2 Automatic login
  oauthAutoLogin: boolean
  // OAuth2 Code login host
  oauthCodeServer?: string
  // OAuth2 Code login route
  oauthCodeRoute?: string
}