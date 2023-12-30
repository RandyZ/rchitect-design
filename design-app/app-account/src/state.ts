import { defineStore } from 'pinia';
import { Lib as stateLib } from '@rchitect-rock/state';
import { Route, PageEnum } from '@rchitect-design/constants';
import { LayoutRoutes, User } from '@rchitect-rock/layouts';
import { diKT } from '@rchitect-rock/ioc';
import { resetProjectSetting, useRouter } from '@rchitect-rock/hooks';
import { UserInfo, RoleInfo, AuthenticationToken } from '@rchitect-design/types';
import { isArray } from 'lodash-es';
import { Beans } from '#/../beankeys';
import { fetchTokenFunction } from '.';
import { ref, computed, unref } from 'vue-demi';

const usePermissionState = () => diKT(stateLib.types.PermissionState);
const usePermissionAction = () => diKT(stateLib.types.PermissionAction);

export type UserStateStore = ReturnType<typeof useUserStore>;

export const useUserStore = defineStore('AppUserStore', () => {
  const state: User.State = {
    userInfo: ref(null),
    accessToken: ref(),
    refreshToken: ref(),
    tokenType: ref(),
    roles: ref([]),
    // Whether the login expired
    sessionTimeout: ref(false),
    // Last fetch time
    lastUpdateTime: ref(0),
  }
  const getters: User.Getter = {
    getToken: computed(() => {
      const token = unref(state.accessToken)
      return token
        ? {
          accessToken: token,
          refreshToken: unref(state.refreshToken),
          tokenType: unref(state.tokenType),
        }
        : undefined;
    }),
    getSessionTimeout: computed(() => unref(state.sessionTimeout)),
  }
  const actions: User.Action = {
    setToken(token: AuthenticationToken | undefined) {
      const { accessToken = undefined, refreshToken = undefined, tokenType = undefined } = token || {};
      state.accessToken.value = accessToken;
      state.refreshToken.value = refreshToken;
      state.tokenType.value = tokenType;
    },
    setRoles(roles: RoleInfo[]) {
      state.roles.value = roles;
    },
    setUserInfo(info: UserInfo | null) {
      state.userInfo.value = info;
      state.lastUpdateTime.value = new Date().getTime();
    },
    setSessionTimeout(flag: boolean) {
      state.sessionTimeout.value = flag;
    },
    resetState() {
      state.userInfo.value = null;
      state.accessToken.value = undefined;
      state.roles.value = [];
      state.sessionTimeout.value = false;
    },
    async login(params): Promise<UserInfo | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const token = await fetchTokenFunction(loginParams, mode);

        console.debug('Account Store get token', token);
        debugger
        // save token
        this.setToken(token);
        if (!unref(getters.getToken)) {
          return null;
        }
        const userInfo = await this.getUserInfoAction();
        if (goHome) {
          await useRouter().replace(Route.BASIC_HOME_PATH);
        }
        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
      debugger
      if (!unref(getters.getToken)) {
        return null;
      }
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = unref(state.sessionTimeout);
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const authState = usePermissionState();
        const authAction = usePermissionAction();
        if (!authState.isDynamicAddedRoute) {
          const routes = await authAction.buildRoutesAction();
          routes.forEach((route) => {
            useRouter().addRoute(route);
          });
          debugger
          useRouter().addRoute(LayoutRoutes.PAGE_NOT_FOUND_ROUTE);
          authAction.setDynamicAddedRoute(true);
        }
        goHome &&
          (await useRouter().replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!unref(getters.getToken)) {
        return null;
      }
      const { getUserInfoApi } = diKT(Beans.Repository);
      const userInfo = await getUserInfoApi();
      if (isArray(userInfo?.roles)) {
        const roleList = roles.map(
          (item) => item.value
        ) as unknown as RoleInfo[];
        this.setRoles(roleList);
      } else {
        userInfo.roles = [];
        this.setRoles([]);
      }
      this.setUserInfo(userInfo);

      return userInfo;
    },
    async logout(goLogin = false): Promise<void> {
      if (this.getAccessToken) {
        const { doLogoutApi } = diKT(Beans.Repository);
        try {
          await doLogoutApi();
        } catch (error: any) {
          console.log('logout error:' + error.toString());
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      // TODO 暂时在这里推出时清楚工程Setting，之后挪到载入处根据工程的版本来决定是否清除
      resetProjectSetting();
      if (goLogin) {
        useRouter().push(Route.BASIC_LOGIN_PATH);
      }
    },
  }
  return {
    ...state,
    ...getters,
    ...actions
  }
}, {
  persist: {
    paths: ['userInfo', 'accessToken', 'roles'],
  }
})
