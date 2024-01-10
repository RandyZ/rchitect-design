import { Repository } from "@rchitect-app/account";
import { User } from "@rchitect-rock/layouts";
import { AuthenticationToken, ErrorMessageMode, RouteRecord } from "@rchitect-design/types";
import { LoginResultModel, UserInfoModel } from "@rchitect-app/account";
import { Bean, Autowired } from "@rchitect-rock/ioc";
import { Beans as infrastructureBeans, Protocols, useInfrastructureApi } from "@rchitect-app/infrastructure";
import type { InfrastructureAxios } from "@rchitect-app/infrastructure";

const ServerApi = {
  Login: '/v1/account/login/username',
  CodeImg: '/v1/account/code-image',
  CodeJsonImg: '/api/captchaImage',
  Logout: '/logout',
  GetUserInfo: '/v1/account/me/info',
  GetUserRoutes: '/v1/account/me/routes',
  GetPermCode: '/getPermCode',
  GetCaptchaImage: '/v1/account/captcha-image',
  GetTokenByCode: '/login/oauth2/code',
}

@Bean()
export class AppAccountRepository implements Repository {
  infrastructureAxios:InfrastructureAxios;

  constructor(
    @Autowired(infrastructureBeans.InfrastructureAxios) infrastructureAxios:InfrastructureAxios
  ) {
    this.infrastructureAxios = infrastructureAxios;
    this.doFetchToken = this.doFetchToken.bind(this);
    this.doLoginApi = this.doLoginApi.bind(this);
    this.doLogoutApi = this.doLogoutApi.bind(this);
    this.getUserInfoApi = this.getUserInfoApi.bind(this);
    this.getPermCode = this.getPermCode.bind(this);
    this.getCaptchaImage = this.getCaptchaImage.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doFetchToken(params:User.CodeLoginParamters, mode?:ErrorMessageMode):Promise<AuthenticationToken | undefined> {
    debugger
    return Promise.resolve(undefined);
  }

  async doLoginApi(params:User.LoginParams, mode?:ErrorMessageMode):Promise<LoginResultModel | undefined> {
    return this.infrastructureAxios.post<Protocols.ResponseData<LoginResultModel>>({
      ...useInfrastructureApi(ServerApi.Login),
      data: params
    }, {
      errorMessageMode: mode
    }).then(response => {
      return response.data;
    })
  }

  doLogoutApi():void {
    debugger
  }

  getCaptchaImage():Promise<{ img:string; uuid:string } | null> {
    return this.infrastructureAxios.get<{ img:string; uuid:string }>(useInfrastructureApi(ServerApi.GetCaptchaImage));
  }

  getPermCode():Promise<string[]> {
    debugger
    return Promise.resolve([]);
  }

  async getUserInfoApi():Promise<UserInfoModel | undefined> {
    return this.infrastructureAxios.get<Protocols.ResponseData<UserInfoModel>>(
      useInfrastructureApi(ServerApi.GetUserInfo)
    ).then(response => {
      return response.data;
    })
  }

  async getUserRoutes():Promise<RouteRecordItem[]> {
    return this.infrastructureAxios.get<Protocols.ResponseData<RouteRecord>>(
      useInfrastructureApi(ServerApi.GetUserInfo)
    ).then(response => {
      //TODO 转换一下菜单的结构
      return (response.data || []) as RouteRecordItem[];
    })
  }
}