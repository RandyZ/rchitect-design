import { useI18n } from '@rchitect-rock/locale';
import type { RequestOptions } from '@rchitect-design/types';
import {
  CreateAxiosOptions,
  WmqRequestConfig,
  WmqResponse,
  WmqResponseAny,
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

@Bean()
export class WmqAxiosTransform extends AxiosTransform {
  infrastructureOptions: InfrastructureOptions;
  constructor(
    @Autowired(infrastructureLib.types.InfrastructureOptions) contextOptions: InfrastructureOptions
  ) {
    super();
    this.infrastructureOptions = contextOptions;
  }
}

export const useRequest = () => {
  return resolveByKey(infrastructureLib.types.InfrastructureAxios);
};
