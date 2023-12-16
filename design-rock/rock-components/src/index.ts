import { App, inject } from "vue-demi";
import { diKT } from '@rchitect-rock/ioc';
import { forIn, isEmpty, isUndefined } from 'lodash-es'
import VXETable from 'vxe-table';
import { Lib } from '#/../index';
import { RockComponent } from '#/RockComponent';
import ComponentMap from './ComponentMap';
import { DataDictionary } from '@rchitect-design/types';
import { VueHelper } from '@rchitect-rock/tools';
import scanWmqComponens from '#/ScanWmqComponens';
export { RockComponent, toRockComponent } from '#/RockComponent'

const MODULE_NAME = 'Wmq';
/**
 * 组件前缀
 */
export const COMPONENT_PREFIX = MODULE_NAME;
/**
 * 导入ComponentMap
 * @param forceFromIoc 强制只获取Ioc中的map，忽略Provider中的map
 * @returns 组件容器
 */
export const useComponentMap = (forceFromIoc: boolean = false): ComponentMap => {
  if (!forceFromIoc) {
    const componentMap: ComponentMap | null = VueHelper.isSetup()
      ? inject(Lib.types.ComponentMap, null)
      : null;
    if (componentMap != null) {
      return componentMap;
    }
  }
  return diKT(Lib.types.ComponentMap);
};
/**
 * 自动导出的Component
 */
const autoExportComponent: DataDictionary<WmqComponent<any>> = {};
const allWmqComponent: DataDictionary<WmqComponent<any>> = {};

type ReturnType<T extends boolean> = T extends true ? WmqComponent<any> : WmqComponent<any> | undefined;

/**
 * 获取驱动组件
 *
 * @param component
 * @param throwWhenUndefined
 * @returns
 */
export const useDriverComponent = <T extends WmqComponent<any>>(
  component: RockComponent | string
): T | undefined => {
  let realComponent = useComponentMap().get(component);
  if (!realComponent) {
    realComponent = useComponentMap(true).get(component);
  }
  if (realComponent) {
    return realComponent as T;
  } else {
    // throw new Error(`组件${component}缺少驱动，请检查是否已经安装驱动`);
    console.warn(`组件${component}缺少驱动，请检查是否已经安装驱动`);
  }
};

/**
 * 获取组件，返回可以渲染的组件引用
 *
 * @param component
 * @param throwWhenUndefined
 * @returns
 */
export const useComponent = <T extends boolean>(
  component: RockComponent | string,
  throwWhenUndefined: T = false as T
): ReturnType<T> => {
  // 1. 找到真实的ComponentMap
  let realComponent = useComponentMap().get(component);
  if (!realComponent) {
    realComponent = useComponentMap(true).get(component);
  }
  // 2. 确保Wmq Component已经加载
  if (isEmpty(autoExportComponent) || isEmpty(allWmqComponent)) {
    scanWmqComponens(autoExportComponent, allWmqComponent);
  }
  // 3. 确保自动导出的组件已经加载
  const wmqComponent = allWmqComponent[component]
  if (wmqComponent) {
    return wmqComponent as ReturnType<T>;
  } else if (realComponent) {
    return realComponent as ReturnType<T>;
  } else {
    // 4. 无法找到组件，根据参数和组件查询结果决定是否抛出异常
    if (throwWhenUndefined) {
      throw new Error(`组件${component}未注册`);
    } else {
      return false as unknown as ReturnType<T>;
    }
  }
};

/**
 * 注册字典中所有组件
 *
 * @param Vue
 * @param componentDict
 */
export const registerWmqComponent = (Vue: App, componentDict: WmqComponentDictionary) => {
  console.debug('RockComponent install components into ComponentMap in IOC...');
  const componentMap = useComponentMap(true);
  scanWmqComponens(autoExportComponent, allWmqComponent);
  forIn(RockComponent, (rockComponent: RockComponent) => {
    let finalRegisterComponent: WmqComponent<any> | undefined;
    // 获取驱动中的组件
    const _comp = componentDict[rockComponent];
    // RockComponent中的契约组件
    const wmqComp = allWmqComponent[rockComponent];
    // 自动导出组件支持不用驱动中的实现
    if (wmqComp) {
      // 找到相应的契约组件，直接注册
      const { customOptions: { isPresetComponent = false } = {} } = wmqComp;
      if (isPresetComponent) {
        // 自动导出的组件优先使用驱动中的组件，只有驱动中提供null，才使用自动导出的组件
        if (_comp === null) {
          finalRegisterComponent = wmqComp;
        } else if (!isUndefined(_comp)) {
          finalRegisterComponent = _comp;
        }
      } else if (_comp) {
        // 非自动导出的组件会在使用时加载驱动中的组件，将驱动组件放入容器中
        finalRegisterComponent = _comp;
      } else {
        console.error(`驱动中找不到组件<${rockComponent}>, 页面渲染可能出错，请检查驱动配置和实现`);
      }
      // 真实组件放入IOC容器中
      finalRegisterComponent && componentMap.register(rockComponent, finalRegisterComponent);
      // 契约组件注册到Vue中支持全局使用
      Vue.component(`${COMPONENT_PREFIX}${rockComponent}`, wmqComp);
    } else {
      // 契约未定义相关组件，只放入IOC容器中
      _comp && componentMap.register(rockComponent, _comp);
    }
  })
  // TODO 处理VXETable的注册
  Vue.use(VXETable);
}

// TODO 修改提示 ---------------------------------------------------------------------------------------------------
/**
 * @deprecated 设计提示的设计
 */
export function warn(message: string) {
  console.warn(`[${MODULE_NAME} warn]:${message}`);
}

/**
 * @deprecated 设计提示的设计
 */
export function error(message: string) {
  throw new Error(`[${MODULE_NAME} error]:${message}`);
}

/**
 * @deprecated 设计提示的设计
 */
//Notification 相关
let registerNotice = () => {
};
let notice;
/**
 * @deprecated 设计提示的设计
 */
export const setNotice = (func = () => {
}) => {
  registerNotice = func;
  console.log('useNotice已注册');
};
/**
 * @deprecated 设计提示的设计
 */
export const useNotice: () => any = () => {
  notice = registerNotice();
  if (!isUndefined(notice)) {
    console.log('注册失败');
  }
  return notice;
};
/**
 * @deprecated 设计提示的设计
 */
//Message 相关
let registerMsg = () => {
};
let msg;
/**
 * @deprecated 设计提示的设计
 */
export const useMsg: () => any = () => {
  msg = registerMsg();
  if (!isUndefined(msg)) {
    console.log('注册失败');
  }
  return msg;
};
/**
 * 设置消息组件接口函数
 * @param func message function 对接组件实现
 * @deprecated 设计提示的设计
 */
export const setMessage = (func = () => {
}) => {
  registerMsg = func;
  console.log('useMsg已注册');
};
/**
 * @deprecated 设计提示的设计
 */
//Dialog 相关
let registerDialog = () => {
};
let dialog;
/**
 * @deprecated 设计提示的设计
 */
export const setDialog = (func = () => {
}) => {
  registerDialog = func;
  console.log('useDialog已注册');
};
/**
 * @deprecated 设计提示的设计
 */
export const useDialog: () => any = () => {
  dialog = registerDialog();
  if (!isUndefined(dialog)) {
    console.log('注册失败');
  }
  return dialog;
};
