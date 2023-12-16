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
export type { WmqFormSchema } from './src/form';
export type { WmqTableProps, WmqColumns, WmqCellClick } from './src/table';
export { default as ComponentMap } from './src/ComponentMap';
export { useForm, transferFormilySchemas } from './src/form';
export { useTable } from './src/table';
export { withInstall, type WithInstall, type CustomComponent, type ComponentDict } from './src/utils/installSupport';
export { useComponent } from './src';
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
export * from './types.d';
