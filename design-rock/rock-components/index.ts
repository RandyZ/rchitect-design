import { RockComponent } from './src/RockComponent';

export * from './src/RockComponent';
export {
  setNotice,
  setMessage,
  setDialog,
  useNotice,
  useMsg,
  useDialog,
} from './src';
export { withInstall, type WithInstall, type CustomComponent, type ComponentDict } from './src/utils/installSupport';
export { useComponent, COMPONENT_PREFIX } from './src';
export * from './src/component-exporter'
export { driverRef } from './src/utils/refSupport';
/**
 * 包装函数为自动导出函数
 * @param func 函数体
 * @param name 自动导出的名称
 * @param isPresetComponent 是否自动注册，默认为true
 * @returns {AutoExportFunction}
 */
export const wrapFunctionToAutoExport = (
  func: Function, name: string | RockComponent,
  isPresetComponent: boolean = true
): AutoExportFunction => {
  return new Proxy(func, {
    get(target, p, receiver) {
      if (p === 'name') {
        return name;
      } else if (p === 'isPresetComponent') {
        return isPresetComponent;
      } else {
        return Reflect.get(target, p, receiver);
      }
    },
    apply(target, thisArg, args) {
      console.log(`Calling function with arguments: ${args}`);
      return target.apply(thisArg, args);
    },
  });
}

export { Lib } from './library';
export { default as Beans } from './beankeys';

import type { Component, Ref } from "vue-demi";
import type { FormItemRule, FormRules } from './src/form/types'
import type { S2DataConfig, S2Options, ThemeCfg, S2Event, S2RenderOptions } from '#/cubeTable/types'
import type { TreeNodeData } from './src/tree/types'
import type { DataDictionary } from "@rchitect-design/types";
import type { RockComponent } from "./src/RockComponent";

export declare namespace CubeTable {
  export type DataConfig = S2DataConfig;
  export type Options = S2Options;
  export type Theme = ThemeCfg;
  export type Meta = Meta;
  export type Fields = Fields;
  export type Data = Data;
  export const Event = S2Event;
  export type RenderOptions = S2RenderOptions
  export type CubeSheetTable = CubeSheetTable
}

export declare namespace Form {
  // 将types.ts中的类型导出
  export type ItemRule = FormItemRule;
  export type Rules = FormRules;
}

export declare namespace Tree {
  export type NodeData = TreeNodeData
}

export declare global {
  /**
   * A type that extends the Vue Component type and adds an optional boolean property `isAutoExport`.
   * `isAutoExport` is used to indicate whether the component should be automatically exported.
   */
  type WmqComponent<T extends Component> = Component & {
    customOptions?: {
      /**
       * 是否是预设组件，预设组件不强需要驱动实现，驱动直接设置null即可，undefined表示不启用
       */
      isPresetComponent?: boolean,
      [key: string]: any
    }
    /**
     * 契约组件中会返回一个驱动组件的引用，预设组件中会返回一个预设组件的引用
     * @see {driverRef}
     */
    DriverRef?: Ref<T>
  };
  /**
   * 自动导出函数
   */
  export type AutoExportFunction = Function | { name: string | RockComponent, isPresetComponent: boolean }
  /**
   * A dictionary that maps string keys to `WmqComponent` values.
   */
  type WmqComponentDictionary = DataDictionary<WmqComponent<any>>;
}
