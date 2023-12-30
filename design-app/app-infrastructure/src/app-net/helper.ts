import { isObject, isString } from 'lodash-es';
import { diK } from "@rchitect-rock/ioc";
import { useI18n } from "@rchitect-rock/locale";
import type { ErrorMessageMode } from "@rchitect-design/types";
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * @description: Append timestamp to request
 * @param join
 * @param restful
 */
export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object;

/**
 * @description: Append timestamp to request
 * @param join
 * @param restful
 */
export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}


export const formatRequestDate = (params: Recordable<any>) => {
  if (!isObject(params)) {
    return;
  }

  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
};

/**
 * 检查返回值状态
 *
 * @param status 状态码
 * @param msg 错误信息
 * @param errorMessageMode 错误信息显示模式，可选值 'message', 'modal', 'none'
 * @param onError 错误处理函数，可选参数
 * @returns 无返回值
 */
export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
  onError?: (msg: string) => void
): void {
  const { t } = useI18n();
  let errMessage = '';
  const infrastructureOptions = diK(types.InfrastructureOptions)
  const infrastructureEvent = Symbol.for(`${status}`)
  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      if (infrastructureOptions) {
        if (infrastructureOptions.onUnauthorized) {
          infrastructureOptions.onUnauthorized();
        } else {
          infrastructureOptions.onAll?.(infrastructureEvent);
        }
      }
      break;
    case 403:
      errMessage = t('sys.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = t('sys.api.errMsg404');
      break;
    case 405:
      errMessage = t('sys.api.errMsg405');
      break;
    case 408:
      errMessage = t('sys.api.errMsg408');
      break;
    case 500:
      errMessage = t('sys.api.errMsg500');
      break;
    case 501:
      errMessage = t('sys.api.errMsg501');
      break;
    case 502:
      errMessage = t('sys.api.errMsg502');
      break;
    case 503:
      errMessage = t('sys.api.errMsg503');
      break;
    case 504:
      errMessage = t('sys.api.errMsg504');
      break;
    case 505:
      errMessage = t('sys.api.errMsg505');
      break;
    default:
  }

  if (errMessage) {
    if (onError) {
      onError(errMessage);
      return;
    } else if (infrastructureOptions) {
      infrastructureOptions.onAll?.(infrastructureEvent, errMessage);
      if (infrastructureOptions.promoter) {
        switch (errorMessageMode) {
          case 'modal':
            infrastructureOptions.promoter.modal?.(errMessage);
            break;
          case 'message':
            infrastructureOptions.promoter.message?.(errMessage);
            break;
          case 'none':
            break;
          default:
            infrastructureOptions.promoter.error?.(errMessage);
        }
      }
    }
  }
}
