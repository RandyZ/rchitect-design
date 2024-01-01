import { PageEnum, Route, AuthorizationModeEnum, PermissionModeEnum } from '@rchitect-design/constants';
import { Lib as routeLib } from '@rchitect-rock/router';
import { Beans as layoutBeans, LayoutRoutes, useUserGetter, useUserAction, useUserState } from '@rchitect-rock/layouts';
import { Beans as stateBeans } from '@rchitect-rock/state';
import { useOAuth2Config, useAuthMode } from '#/usage';
import { diKT } from '@rchitect-rock/ioc';
import { AppContext } from "@rchitect-rock/base-package";
import { unref } from "vue";
import { useUserStore } from "#/state";
import type { NavigationHook } from "@rchitect-design/types";

const LOCK_PATH = Route.BASIC_LOCK_PATH;
const LOGIN_PATH = Route.BASIC_LOGIN_PATH;
const ROOT_PATH = LayoutRoutes.ROOT_ROUTE.path;

const routeTable = () => diKT(routeLib.types.RouteTable);
const menuState = () => diKT(routeLib.types.MenuState);
const usePermissionActions = () => diKT(stateBeans.PermissionAction);
const useLockState = () => diKT(layoutBeans.AppLockState);
const useLockActions = () => diKT(layoutBeans.AppLockActions);

/**
 * 身份路由守卫-自定义首页
 * @param to
 * @param from
 * @param next
 * @returns
 */
const authGuardCustomHomepageHandler:NavigationHook = async (to, from, next) => {
  const userStore = useUserStore()
  if (
    // '/' => '/dashboard'
    from.path === ROOT_PATH &&
    to.path === PageEnum.BASE_HOME &&
    // If the user has set the home page, it will be used as the home page
    userStore.userInfo?.homePath &&
    userStore.userInfo?.homePath !== PageEnum.BASE_HOME
  ) {
    next(userStore.userInfo.homePath);
    return false;
  } else {
    return true;
  }
};

/**
 * 身份路由守卫-白名单
 * @param to
 * @param from
 * @param next
 * @returns
 */
const authGuardWhiteRoutesHandler:NavigationHook = async (to, from, next) => {
  if (routeTable().whiteRouteTable.paths.includes(to.path as PageEnum)) {
    const userGetter = useUserGetter()
    const userState = useUserState()
    const userAction = useUserAction()
    const token = userGetter.getToken;
    if (to.path === LOGIN_PATH && token) {
      // 登录页携带了redirect参数，直接跳转到redirect参数指定的页面
      const isSessionTimeout = unref(userState.sessionTimeout);
      try {
        await userAction.afterLoginAction();
        if (!isSessionTimeout) {
          next((to.query?.redirect as string) || '/');
          return false;
        }
      } catch (e) {
        console.debug('跳转Redirect失败', e);
      }
    }
    // 如果是锁屏页，且没有锁屏，则跳转到上一个页面
    if (to.path === LOCK_PATH && !unref(useLockState().lockInfo)?.isLock) {
      next({ path: from.path });
      return false;
    }
    // 白名单直接进入对应页面
    next();
    return false;
  }
  return true;
};
/**
 * 身份路由守卫-无token
 * @param to
 * @param from
 * @param next
 * @returns
 */
const authGuardWithoutTokenHandler:NavigationHook = async (to, from, next) => {
  const token = useUserGetter().getToken;
  const userAction = useUserAction();
  if (!unref(token)) {
    // You can access without permission. You need to set the routing meta.ignoreAuth to true
    if (to.meta.ignoreAuth) {
      next();
      return false;
    }
    // 如果是授权码的无Token模式回登录页面
    if (useAuthMode() === AuthorizationModeEnum.OAUTH2_CODE) {
      const oauth2Confg = useOAuth2Config()?.value;
      if (oauth2Confg) {
        const isCodeHandlePath = to.path === oauth2Confg.codeHandlerRoute;
        const authCode = to.query?.code;
        const authState = to.query?.state;
        // 如果是授权码回调地址，且携带了code和state参数，则进行登录
        if (authCode && authState && isCodeHandlePath) {
          const user = await userAction.login({
            clientId: 'wmqe-pc',
            code: authCode,
            state: authState,
            gohome: true,
          } as any);
          console.debug('授权码登录成功', user);
          // loggin 会进行重定向，所以这里不需要next
          next(false);
          return false;
        }
      }
    }
    // redirect login page
    const redirectData: {
      path: string;
      replace: boolean;
      query?: Recordable<string>;
    } = {
      path: LOGIN_PATH,
      replace: true,
    };
    if (to.path) {
      redirectData.query = {
        ...redirectData.query,
        redirect: to.path,
      };
    }
    next(redirectData);
    return false;
  }
  return true;
};
/**
 * 创建登录身份验证守卫
 * 1. 验证前置Handler
 * 2. 验证锁屏
 * 3. 修正路由
 *    1. 替换路由（后台权限）
 *    2. 过滤路由（前端权限）
 * 4. 路径验证
 */
export function createAuthGuard(appContext:AppContext) {
  appContext.registerRouteGuards(async (to, from, next) => {
    const ret =
      (await authGuardCustomHomepageHandler(to, from, next)) &&
      (await authGuardWhiteRoutesHandler(to, from, next)) &&
      (await authGuardWithoutTokenHandler(to, from, next));
    if (!ret) {
      return false;
    }
    // TODO 继续抽取其他方法
    // 1. 是否锁屏
    if (unref(useLockState().lockInfo)?.isLock) {
      // redirect lock page
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOCK_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }
    // 2. 用户
    const userStore = useUserStore();
    const permissionActions = usePermissionActions();
    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === LayoutRoutes.PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (unref(userStore.userInfo)?.homePath || PageEnum.BASE_HOME)
    ) {
      next(unref(userStore.userInfo)?.homePath || PageEnum.BASE_HOME);
      return;
    }
    const permissionMode = menuState().getPermissionMode();
    // TODO get userinfo while last fetch time is empty
    if (
      unref(userStore.lastUpdateTime) === 0 &&
      permissionMode == PermissionModeEnum.BACK
    ) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }
    if (unref(userStore.isDynamicAddedRoute)) {
      next();
      return;
    }
    const routes = await permissionActions.buildRoutesAction();
    routes.forEach((route) => {
      routeTable().router.addRoute(route);
    });

    permissionActions.setDynamicAddedRoute(true);

    if (to.name === LayoutRoutes.PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect };
      // next(nextData);
      // FIXME nextData 无法正确跳转
      next()
    }
  });
}
