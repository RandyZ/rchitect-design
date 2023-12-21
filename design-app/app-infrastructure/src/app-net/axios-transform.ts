/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, RequestResult } from '@rchitect-design/types';
import { Bean } from '@rchitect-rock/ioc';
import type { InfrastructureOptions } from './options';

/**
 * 标准请求响应类型
 */
export type WmqResponse = AxiosResponse<RequestResult>;
/**
 * 任意类型请求响应类型
 */
export type WmqResponseAny = AxiosResponse<any>;
/**
 * 请求配置
 */
export type WmqRequestConfig = AxiosRequestConfig;

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export class DefaultCreateAxiosOptions implements CreateAxiosOptions {
  options : InfrastructureOptions;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  constructor(
    options: InfrastructureOptions
  ) {
    console.log('DefaultCreateAxiosOptions', options);
    this.options = options;
  }
}

@Bean()
export abstract class AxiosTransform {
  /**
   * 请求前置钩子
   * @param config 数据配置
   * @param options Axios配置
   * @returns {WmqRequestConfig}
   */
  beforeRequestHook?: (
    config: WmqRequestConfig,
    options: RequestOptions
  ) => WmqRequestConfig;

  /**
   * 请求成功后转换钩子
   * @param res 原始返回值
   * @param options 请求转换配置
   * @returns 拆箱后的数据
   */
  transformRequestHook?: (
    res: WmqResponse,
    options: RequestOptions
  ) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: WmqRequestConfig,
    options: CreateAxiosOptions
  ) => WmqRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: WmqResponseAny) => WmqResponseAny;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
