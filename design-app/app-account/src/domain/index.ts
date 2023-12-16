import { ErrorMessageMode } from '@rchitect-design/types';
import { User } from '@rchitect-rock/layouts';
import { AuthorizationModeEnum } from '@rchitect-design/constants';
import { doFetchToken, doLoginApi } from './repository';
import { useGlobConfig } from "@rchitect-rock/hooks";

export { useUserStore } from './store';

/**
 * 获取Token的函数
 * @param params
 * @param mode
 * @returns {Promise<LoginResultModel | AuthenticationToken>}
 */
export function fetchTokenFunction(
  params: User.CodeLoginParamters | User.LoginParams,
  mode: ErrorMessageMode = 'modal'
) {
  const { authMode } = useGlobConfig();
  if (authMode === AuthorizationModeEnum.SELF_LOGIN) {
    const _params = params as User.LoginParams;
    return doLoginApi(_params, mode);
  } else if (authMode === AuthorizationModeEnum.OAUTH2_CODE) {
    const _params = params as User.CodeLoginParamters;
    return doFetchToken(_params, mode);
  } else {
    return Promise.reject('未知的登录方式');
  }
}
