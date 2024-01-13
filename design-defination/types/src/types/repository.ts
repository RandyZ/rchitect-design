import type { Ref } from 'vue-demi';

export declare module Repository {
  /**
   * 数据值对象
   * @deprecated 无需使用，直接使用interface
   */
  export type State = Record<string | number | symbol, any>;

  /**
   * 数据值对象, 用于定义响应式数据结构。
   */
  export type Data<T = any, A = Actions> = {
    [K in keyof T]:Ref<T[K]>
  } & {
    useActions?:() => A
  };

  /**
   * @deprecated 使用Data代替Getters
   */
  export type Getters<T = any> = Omit<Data<T>, 'useActions'>;
  /**
   * 操作函数
   */
  export type Actions<T = any> = {
    [K in keyof T]:(...args:any[]) => any
  };
}