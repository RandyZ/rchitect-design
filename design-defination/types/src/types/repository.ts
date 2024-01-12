import type { Ref } from 'vue-demi';

export declare module Repository {
  /**
   * 数据值对象
   * @deprecated 无需使用，直接使用interface
   */
  export type State = Record<string | number | symbol, any>;


  export type Getters<T = any> = {
    [K in keyof T]:Ref<T[K]>
  };
  /**
   * 操作函数
   */
  export type Actions<T = any> = {
    [K in keyof T]:(...args:any[]) => any
  };
}