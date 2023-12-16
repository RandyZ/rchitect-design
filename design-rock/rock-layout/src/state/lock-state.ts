import type {
  UserInfo,
} from '@rchitect-design/types';

export declare namespace Lock {
  export interface State {
    lockInfo: Nullable<LockInfo>;
  }

  export type Getter = {
    getLockInfo: Nullable<LockInfo>;
  };

  export interface Action {
    setLockInfo(info: LockInfo);
    resetLockInfo();
    unLock(password?: string): Promise<UserInfo | boolean>;
  }
}
