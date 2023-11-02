import { Ref } from "vue-demi"
import { FooterLinkOptions } from "./ToolkitConfigOptions"
import { GlobConfig } from "./GlobConfig"
import { GlobEnvConfig } from "./GlobEnvConfig"

/**
 * @description: 网站信息配置
 */
export interface WebSiteConfguration {
  // Logo url
  logo: string
  // Avatar url
  avatar: string
  // username
  username: string,
  // Site title
  title: string
  // Copyright Information
  copyright: Ref<string>
  // Footer link
  links: FooterLinkOptions[]
  // 站点配置
  site: GlobConfig,
  // 环境变量
  env: GlobEnvConfig
}

/**
 * @deprecated Please use WebSiteConfguration instead
 */
export type DefineSiteOptions = WebSiteConfguration