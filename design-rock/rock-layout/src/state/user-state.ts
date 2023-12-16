import type {
  AuthenticationSchemes,
  AuthenticationToken,
  ErrorMessageMode,
  Repository,
  RoleInfo,
  UserInfo,
} from '@rchitect-design/types';
import { ComputedRef, Ref } from 'vue-demi';

export declare namespace User {

  export interface CodeLoginParamters {
    clientId: string;
    code: string;
    state: string;
  }

  export interface LoginParams {
    username: string
    password: string
    uuid?: string
    captchaCode?: string
  }

  export interface State extends Repository.State {
    userInfo: Ref<Nullable<UserInfo>>;
    accessToken: Ref<string | undefined>;
    refreshToken: Ref<string | undefined>;
    tokenType: Ref<AuthenticationSchemes | undefined>;
    roles: Ref<RoleInfo[]>;
    sessionTimeout: Ref<boolean>;
    lastUpdateTime: Ref<number>;
  }
  export interface Getter extends Repository.Getters {
    getToken: ComputedRef<AuthenticationToken | undefined>;
    getSessionTimeout: ComputedRef<boolean>;
  }

  export interface Action extends Repository.Actions {
    setToken(token: AuthenticationToken | undefined): void;
    setRoles(roles: RoleInfo[]): void;
    setUserInfo(info: UserInfo | null): void;
    setSessionTimeout(flag: boolean): void;
    resetState(): void;
    /**
     * 登录
     * @param params 设计参数，处理好类型 (CodeLoginParamters | LoginParams)
     */
    login(params: (CodeLoginParamters | LoginParams) & {
      goHome?: boolean;
      mode?: ErrorMessageMode;
    }): Promise<UserInfo | null>;
    afterLoginAction(goHome?: boolean): Promise<UserInfo | null>;
    getUserInfoAction(): Promise<UserInfo | null>;
    logout(goLogin?: boolean): Promise<void>;
  }
}
