import type { Repository, LockInfo, UserInfo } from "@rchitect-design/types";
import { Ref } from "vue-demi";

/**
 * App Lock State
 */
export declare namespace AppLock {
  export interface State extends Repository.State {
    lockInfo:Ref<Nullable<LockInfo>>;
  }

  export interface Actions extends Repository.Actions {
    setLockInfo(info:LockInfo):void;

    resetLockInfo():void;

    unLock(password?:string):Promise<UserInfo | boolean>;
  }
}