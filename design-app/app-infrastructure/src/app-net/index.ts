import { diKT } from "@rchitect-rock/ioc";
import { Beans as settingsBeans } from "@rchitect-rock/settings";
import { isNil, get } from "lodash-es";

export * from './axios-infrastructure'
export * from './axios-cancel-token'
export * from './axios-transform'
export * from './options'

/**
 * 获取API配置
 *
 * @param api
 * @param server
 * @returns
 */
export const useInfrastructureApi = (api:string, server?:string):{ url:string, baseUrl:string } => {
  const globalConfig = diKT(settingsBeans.GlobConfig)
  const axiosOptions = { url: api, baseURL: globalConfig.apiUrl }
  if (!isNil(server)) {
    const siteInfoState = diKT(settingsBeans.AppSiteInfoState)
    const { env } = siteInfoState.env
    const serverName = get(isRef(env) ? unref(env) : env, `VITE_GLOB_SERVER_${ server.toUpperCase() }`, undefined);
    axiosOptions.baseURL = serverName ? `/${ serverName }` : env.VITE_GLOB_API_URL;
  }
  return axiosOptions
}