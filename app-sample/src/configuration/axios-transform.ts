import { unref } from 'vue';
import type { RequestOptions, RequestResult } from '@rchitect-design/types';
import { $t } from '@rchitect-rock/locale'
import type { InfrastructureOptions, Protocols } from '@rchitect-app/infrastructure';
import {
  AxiosTransform,
  InfrastructureHelper as h,
  Beans as infrastructureBeans,
  RchitectRequestConfig,
  RchitectResponse,
  RequestEnum, SpecialHeaderEnum
} from '@rchitect-app/infrastructure';
import { Autowired, Bean } from '@rchitect-rock/ioc';
import { HttpStatusCode } from "@rchitect-design/types/src/types/http";
import { isFunction, isString } from "lodash-es";
import { type ApiMapping, default as Beans } from "@/ioc/beankes";
import { appendUrlParams, Md5SignerUtils } from "@rchitect-rock/tools";


// import { useWebSiteConfigurations } from "@rchitect-rock/hooks/src/app-config/useSiteGeneral";


class RespData<T> implements Protocols.ResponseData<T> {
  status:HttpStatusCode;
  code:string;
  message:string | undefined;
  details:string | undefined;
  validationErrors:any[];
  data?:T;
  isOk:() => boolean;

  constructor(rawData:RequestResult<T>, status = HttpStatusCode.OK, isOk = () => status === HttpStatusCode.OK) {
    this.status = status;
    this.code = rawData.code;
    this.message = rawData.message;
    this.details = rawData.details;
    this.validationErrors = rawData.validationErrors;
    this.data = rawData.data;
    this.isOk = isOk.bind(this)
  }
}

const preRequestHook = (config:RchitectRequestConfig, options:RequestOptions, apiMapping:ApiMapping) => {
  debugger
  const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options;
  // const conf = useWebSiteConfigurations();
  // if (config.baseURL === `/${conf.envValues.VITE_GLOB_SERVER_AUTH}`) {
  //   config.url = ApiMapping[config.url as string] || config.url
  // }
  if (!config.baseURL && apiUrl) {
    config.baseURL = isString(apiUrl)
      ? apiUrl
      : (isFunction(apiUrl) ? apiUrl?.() : '')
  }
  const params = config.params || {};
  const data = config.data || false;
  formatDate && data && !isString(data) && h.formatRequestDate(data);
  if (config.method?.toUpperCase() === RequestEnum.GET) {
    if (!isString(params)) {
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      config.params = Object.assign(
        params || {},
        h.joinTimestamp(joinTime, false)
      );
      const reqConverter = apiMapping[config.url as string]?.req
      if (reqConverter) {
        config.params = reqConverter(config.params)
      }
    } else {
      // 兼容restful风格
      config.url = config.url + params + `${ h.joinTimestamp(joinTime, true) }`;
      config.params = undefined;
    }
  } else {
    if (!isString(params)) {
      formatDate && h.formatRequestDate(params);
      if (
        Reflect.has(config, 'data') &&
        config.data &&
        Object.keys(config.data).length > 0
      ) {
        config.data = data;
        config.params = params;
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params;
        config.params = undefined;
      }

      const reqConverter = apiMapping[config.url as string]?.req
      if (reqConverter) {
        config.data = reqConverter(config.data)
      }
      if (joinParamsToUrl) {
        config.url = appendUrlParams(
          config.url as string,
          Object.assign({}, config.params, config.data)
        );
      }
    } else {
      // 兼容restful风格
      config.url = config.url + params;
      config.params = undefined;
    }
  }
  return config;
}

@Bean()
export class AIHelpAxiosTransform extends AxiosTransform {
  infrastructureOptions:InfrastructureOptions;

  constructor(
    @Autowired(infrastructureBeans.InfrastructureOptions) contextOptions:InfrastructureOptions,
    @Autowired(Beans.ServerApiMapping) apiMapping:ApiMapping
  ) {
    super();
    this.infrastructureOptions = contextOptions;
    this.beforeRequestHook = (config:RchitectRequestConfig, options:RequestOptions) => {
      return preRequestHook(config, options, apiMapping)
    }
    this.requestInterceptors = (config, options) => {
      debugger
      // 请求之前处理config
      const token = contextOptions.tokenProvider?.();
      const _config = config as Recordable<any>;
      if (token && _config?.requestOptions?.withToken !== false) {
        // 处理Token携带 需要考虑下使用TokenResultModel.tokenType还是使用requestOptions.authenticationScheme
        _config.headers.Authorization = options.requestOptions?.authenticationScheme
          ? `${options.requestOptions?.authenticationScheme} ${token.accessToken}`
          : `${token.tokenType || 'Bearer'} ${token.accessToken}`;
        _config.headers[SpecialHeaderEnum.TOKEN] = token.accessToken;
        //--update-begin--author:liusq---date:20210831---for:将签名和时间戳，添加在请求接口 Header

        // update-begin--author:taoyan---date:20220421--for: VUEN-410【签名改造】 X-TIMESTAMP牵扯
        _config.headers[SpecialHeaderEnum.TIMESTAMP] = Md5SignerUtils.getTimestamp();
        // update-end--author:taoyan---date:20220421--for: VUEN-410【签名改造】 X-TIMESTAMP牵扯
        _config.headers[SpecialHeaderEnum.VERSION] = 'v3';
        // TODO 改正密钥
        _config.headers[SpecialHeaderEnum.Sign] = Md5SignerUtils.getSign(_config.url, _config.params, 'test');
        _config.headers[SpecialHeaderEnum.TENANT_ID] = 1000;
      }
      return config;
    }
    this.transformRequestHook = (rawRes:RchitectResponse, options:RequestOptions):Protocols.ResponseData<any> => {
      debugger
      const status = rawRes.status as HttpStatusCode;
      const { data } = rawRes;
      if (status === HttpStatusCode.OK) {
        return new RespData(data, status) as Protocols.ResponseData<any>
      } else {
        // TODO 需要加上服务端国际化处理
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const errMsg = unref($t(`${ data.code }.message`))
        if (options.errorMessageMode === 'none') {
          return new RespData(data) as Protocols.ResponseData<any>
        } else {
          // TODO 实现具体的消息提示
          if (options.errorMessageMode === 'modal') {
            console.trace('异常1', options.errorMessageMode)
            // const dialog = useDialog()
            // dialog.error(errMsg)
          } else if (options.errorMessageMode === 'message') {
            console.trace('异常2', options.errorMessageMode)
            // const notice = useNotice()
            // notice.error(i18n.t(`${data.code}.message`))
          } else if (options.errorMessageMode === 'thrown') {
            throw new Error(JSON.stringify(rawRes))
          }
          return new RespData(data) as Protocols.ResponseData<any>
        }
      }
    }
  }
}