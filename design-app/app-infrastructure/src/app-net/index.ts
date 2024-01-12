import { diKT } from "@rchitect-rock/ioc";
import { Beans as settingsBeans } from "@rchitect-rock/settings";
import { isNil, get } from "lodash-es";
import { isRef, unref } from "vue-demi";
import type { AxiosRequestConfig } from "axios";

export * from './axios-infrastructure'
export * from './axios-cancel-token'
export * from './axios-transform'
export * from './options'
export * from './constants'
export * from './protocols'
export * as InfrastructureHelper from './helper';

/**
 * 获取API配置
 *
 * @param api
 * @param server
 * @returns
 */
export const useInfrastructureApi = (api:string, server?:string):Pick<AxiosRequestConfig, 'url' | 'baseURL'> => {
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