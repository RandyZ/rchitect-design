import * as pack from "./package.json"
import type { AxiosTransform, CreateAxiosOptions, InfrastructureAxios, InfrastructureOptions } from './src/app-net';
import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { RequestOptions } from '@rchitect-design/types';

export default {
  /**
   * 基础设施参数
   */
  InfrastructureOptions: Symbol.for(`${ pack.name }/InfrastructureOptions`) as ServiceIdentifier<InfrastructureOptions>,
  /**
   * 请求发送参数
   */
  RequestOptions: Symbol.for(`${ pack.name }/RequestOptions`) as ServiceIdentifier<RequestOptions>,
  /**
   * Axios初始化参数
   */
  CreateAxiosOptions: Symbol.for(`${ pack.name }/CreateAxiosOptions`) as ServiceIdentifier<Partial<CreateAxiosOptions>>,
  /**
   * Axios初始化参数
   */
  AxiosTransform: Symbol.for(`${ pack.name }/AxiosTransform`) as ServiceIdentifier<AxiosTransform>,
  /**
   * 基础设施中的Axios对象
   */
  InfrastructureAxios: Symbol.for(`${ pack.name }/InfrastructureAxios`) as ServiceIdentifier<InfrastructureAxios>,
};