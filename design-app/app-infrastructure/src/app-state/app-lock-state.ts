import { defineStore } from "pinia";
import { unref } from 'vue-demi';
import type { AppLock } from "@rchitect-rock/layouts";
import { useUserStore } from "@rchitect-app/account";
import type { UserInfo } from "@rchitect-design/types";

export type AppLockStateStore = ReturnType<typeof useAppLockState>;

export const useAppLockState = defineStore('AppLockStateStore', () => {
    const state:AppLock.State = {
      lockInfo: ref(null)
    }

    const actions:AppLock.Actions = {
      setLockInfo(info) {
        state.LockInfo.value = info;
      },
      resetLockInfo() {
        state.LockInfo.value = null;
      },
      async unLock(password?:string) {
        const userStore = useUserStore();
        if (this.lockInfo?.pwd === password) {
          this.resetLockInfo();
          return true;
        }
        const tryLogin = async ():Promise<UserInfo | boolean> => {
          try {
            const username = unref(userStore.userInfo)?.username ?? '';
            const res = await userStore.login({
              username,
              password: password!,
              goHome: false,
              mode: 'none',
            } as any);
            if (res) {
              this.resetLockInfo();
            }
            return res || false;
          } catch (error) {
            return false;
          }
        };
        return await tryLogin();
      },
    }
    return {
      ...state,
      ...actions
    };
  },
  {
    paths: [ 'lockInfo' ]
  }
)
