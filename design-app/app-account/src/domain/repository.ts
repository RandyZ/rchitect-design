import type { ErrorMessageMode, AuthenticationToken } from '@rchitect-design/types';
import {
  CodeLoginParamters,
  LoginParams,
  LoginResultModel,
  UserInfoModel,
} from '#/domain/dto/auth-dtos';

// 改成依赖注入
export interface Repository {
  /**
   * 授权中心登录，获取Token
   * @param params code and state
   * @param mode
   * @returns {Promise<AuthenticationToken>}
   */
  doFetchToken(params: CodeLoginParamters, mode?: ErrorMessageMode): Promise<AuthenticationToken>
  /**
   * 自主登录，获取Token
   * @param params
   * @param mode
   * @returns {Promise<LoginResultModel>}
   */
  doLoginApi(params: LoginParams, mode?: ErrorMessageMode): Promise<LoginResultModel>
  /**
   * 退出登录
   */
  doLogoutApi(): void
  /**
   * 获取用户信息
   * @returns {Promise<UserInfoModel>}
   */
  getUserInfoApi(): Promise<UserInfoModel>
  /**
   * 获取权限列表
   * @returns {Promise<string[]>}
   */
  getPermCode(): Promise<string[]>
  /**
   * 获取验证码
   * @returns {Promise<{ img: string, uuid: string } | null>}
   */
  getCaptchaImage(): Promise<{ img: string, uuid: string } | null>
}