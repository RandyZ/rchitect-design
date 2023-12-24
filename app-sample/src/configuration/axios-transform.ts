import { useI18n } from '@rchitect-rock/locale';
import type { RequestOptions } from '@rchitect-design/types';
import {
  CreateAxiosOptions,
  RchitectRequestConfig,
  RchitectResponse,
  RchitectResponseAny,
  AxiosTransform,
  InfrastructureHelper as h,
  InfrastructureConstants as c,
  Lib as infrastructureLib
} from '@rchitect-app/infrastructure';
import type { InfrastructureOptions, Protocols } from '@rchitect-app/infrastructure';
import { convertToResponseData } from './protocol';
import { Autowired, Bean, resolveByKey } from '@rchitect-rock/ioc';
import isString from 'lodash-es/isString';
import isFunction from 'lodash-es/isFunction';
import { appendUrlParams } from '@rchitect-rock/tools';
import has from 'lodash-es/has';
import { useDefininationConfig } from '@rchitect-rock/hooks';
// import { ApiMapping, ApiConverterMapping } from './xsg-api-mapping';
// import { useNotice, useDialog } from '@weiming-rock/components'

/**
 * 协议转换器
 */
export type ProtocolConverter = {
  req?:(params:any) => any
  resp?:(resp:Protocols.ResponseData<any>) => any
  isOk?:(code:string) => boolean
}
/**
 * Api转换器
 */
export type ApiMapping = {
  [key:string]:string | {
    url:string
    method?:string
    converter?:ProtocolConverter
  }
}

@Bean()
export class WmqAxiosTransform extends AxiosTransform {
  infrastructureOptions:InfrastructureOptions;

  constructor(
    @Autowired(infrastructureLib.types.InfrastructureOptions) contextOptions:InfrastructureOptions
  ) {
    super();
    this.infrastructureOptions = contextOptions;
    this.beforeRequestHook = (config: RchitectRequestConfig, options: RequestOptions) => {
      return config
    }
    this.transformRequestHook = (rawRes: RchitectResponse, options: RequestOptions) => {
      return rawRes
    }
    this.requestInterceptors = (config: RchitectRequestConfig, options: CreateAxiosOptions) => {
      return config;
    }
    this.responseInterceptors = (res: RchitectResponse) => {
      return res;
    }
    this.responseInterceptorsCatch = (error: any) => {
      return Promise.reject(error);
    }
  }
}