import { Repository } from "@rchitect-app/account";
import { User } from "@rchitect-rock/layouts";
import { AuthenticationToken, ErrorMessageMode } from "@rchitect-design/types";
import { UserInfoModel } from "@rchitect-app/account/src/domain/dto/auth-dtos";
import { Bean } from "@rchitect-rock/ioc";

@Bean()
export class AppAccountRepository implements Repository {
  constructor() {
    // console.debugg("AccountRepository");
  }

  doFetchToken(params:User.CodeLoginParamters, mode?:ErrorMessageMode):Promise<AuthenticationToken> {
    return Promise.resolve(undefined);
  }

  doLoginApi(params:User.LoginParams, mode?:ErrorMessageMode):Promise<LoginResultModel> {
    return Promise.resolve(undefined);
  }

  doLogoutApi():void {
  }

  getCaptchaImage():Promise<{ img:string; uuid:string } | null> {
    return Promise.resolve(undefined);
  }

  getPermCode():Promise<string[]> {
    return Promise.resolve([]);
  }

  getUserInfoApi():Promise<UserInfoModel> {
    return Promise.resolve(undefined);
  }

}