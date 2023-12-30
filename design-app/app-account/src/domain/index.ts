import type { ErrorMessageMode } from '@rchitect-design/types';
import type { User } from '@rchitect-rock/layouts';
import { AuthorizationModeEnum } from '@rchitect-design/constants';
import { useAppSetting } from "@rchitect-rock/hooks";
import { diKT } from '@rchitect-rock/ioc';
import { Beans } from '#/../beankeys';
import { unref } from 'vue-demi'
import { useAuthMode } from "#/usage";

export { useUserStore } from '#/state';
export * from './repository';
export * from './dto/auth-dtos';
/**
 * 获取Token的函数
 * @param params
 * @param mode
 */
export function fetchTokenFunction(
  params:User.CodeLoginParamters | User.LoginParams,
  mode:ErrorMessageMode = 'modal'
) {
  const authMode = useAuthMode()
  const { doFetchToken, doLoginApi } = diKT(Beans.Repository);
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
