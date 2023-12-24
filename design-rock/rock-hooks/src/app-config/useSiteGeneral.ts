import type { WebSiteConfigurations } from '@rchitect-design/types'
import { unref } from 'vue-demi'
import { diKT } from "@rchitect-rock/ioc";
import { Beans as settingsBeans } from "@rchitect-rock/settings";

/**
 * 获取全局定义配置
 *
 * @returns
 */
export const useWebSiteConfigurations = () => {
  const siteInfoState = diKT(settingsBeans.AppSiteInfoState)
  const siteInfoActions = diKT(settingsBeans.AppSiteInfoActions)
  const initSiteGeneralConfig = (
    configs:DeepPartial<WebSiteConfigurations>,
  ) => siteInfoActions.setSiteInfoAction(configs)
  return {
    ...siteGeneralStore,
    envValues: unref(siteInfoState.env),
    initSiteGeneralConfig,
  }
}
