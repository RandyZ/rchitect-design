import type { ComputedRef } from 'vue-demi';

export declare module Repository {
  /**
   * 数据值对象
   * @deprecated 无需使用，直接使用interface
   */
  export type State = Record<string | number | symbol, any>;

  /**
   * 计算属性
   */
  export type Getters = Record<string | number | symbol, ComputedRef<any>>;

  /**
   * 操作函数
   */
  export type Actions = Record<string, (...args: any[]) => any>;
}