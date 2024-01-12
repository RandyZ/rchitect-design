import type { AuthenticationToken, ErrorMessageMode } from '@rchitect-design/types';
import { LoginResultModel, UserInfoModel, } from '#/domain/dto/auth-dtos';
import type { User } from '@rchitect-rock/layouts';

// 改成依赖注入
export interface Repository {
  /**
   * 授权中心登录，获取Token
   * @param params code and state
   * @param mode
   * @returns {Promise<AuthenticationToken>}
   */
  doFetchToken(params:User.CodeLoginParamters, mode?:ErrorMessageMode):Promise<AuthenticationToken | undefined>

  /**
   * 自主登录，获取Token
   * @param params
   * @param mode
   * @returns {Promise<LoginResultModel>}
   */
  doLoginApi(params:User.LoginParams, mode?:ErrorMessageMode):Promise<LoginResultModel | undefined>

  /**
   * 退出登录
   */
  doLogoutApi():Promise<void>

  /**
   * 获取用户信息
   * @returns {Promise<UserInfoModel>}
   */
  getUserInfoApi():Promise<UserInfoModel | undefined>

  /**
   * 获取用户可用菜单
   */
  getUserRoutes():Promise<RouteRecordItem[]>

  /**
   * 获取权限列表
   * @returns {Promise<string[]>}
   */
  getPermCode():Promise<string[]>

  /**
   * 获取验证码
   * @returns {Promise<{ img: string, uuid: string } | null>}
   */
  getCaptchaImage():Promise<{ img:string, uuid:string } | null>
}