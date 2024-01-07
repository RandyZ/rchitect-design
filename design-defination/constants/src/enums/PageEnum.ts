import { Route } from "../router";

export enum PageEnum {
  // basic login path
  BASE_LOGIN = Route.BASIC_LOGIN_PATH,
  // basic home path
  BASE_HOME = Route.BASIC_HOME_PATH,
  // error page path
  ERROR_PAGE = Route.BASIC_REDIRECT_PATH,
  // error log page path
  ERROR_LOG_PAGE = Route.BASIC_ERROR_LOG_PATH,
  // 锁屏页
  BASE_LOCK = Route.BASIC_LOCK_PATH,
}