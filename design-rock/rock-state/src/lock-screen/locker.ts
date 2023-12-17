import type { Ref, ComputedRef } from 'vue-demi'
import type { Repository, LockInfo } from '@rchitect-design/types'
export declare namespace ScreenLocker {
  export interface State extends Repository.State {
    lock: Ref<boolean>
    pwd: Ref<string>
  }
  export interface Getters extends Repository.Getters {
    getLockInfo: ComputedRef<LockInfo>
  }
  export interface Actions extends Repository.Actions {
    setLockInfo: (info: LockInfo) => void;
  }
}
