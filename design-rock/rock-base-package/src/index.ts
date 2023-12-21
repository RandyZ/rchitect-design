import { MakeOptional, TypeKey } from "./Library";

export * from './Library';
export * from './AppContext';

import type { App } from 'vue-demi';
import type { Library } from './Library';
import type { AppContext } from './AppContext';
import { isEmpty } from 'lodash-es'

/**
 * 实现Vue插件协议
 * @param this
 * @param _
 * @param context
 */
export async function install<T extends Library<any>>(
  this:any,
  _:App, context:AppContext
) {
  const lib = this as T
  console.debug(`Library 【${ lib.name }:${ lib.version }】 auto configing`);
  // 如果lib中存在types，则将其注册到ioc容器中
  if (lib.module) {
    context.iocModules.push(lib.module);
  }
  // 如果lib中存在beforeSetup方法，则构造一个函数，将其放入ioc加载完成前执行
  if (lib.beforeSetup) {
    context.onBeforeIocLoaded(async (app:App) => {
      await lib.beforeSetup?.(app, context);
    }, lib.priority);
  }
  // 如果lib中存在onSetup方法，则构造一个函数，将其放入ioc加载完成后执行
  if (lib.onSetup) {
    context.onIocLoaded(async (app:App) => {
      await lib.onSetup?.(app, context);
    }, lib.priority);
  }
  // 如果lib中存在routes，则将其注册到路由表中
  if (lib.routes && !isEmpty(lib.routes)) {
    context.registerRoutes(lib.routes)
  }
}

/**
 * 将配置信息转换为Package
 * @param rawLib
 */
export const toPackage:<
  R extends {
    install:Library<any>['install'],
    onSetup?:Library<any>['onSetup'],
    beforeSetup?:Library<any>['beforeSetup']
  }
>(rawLib:MakeOptional<R, 'install'>) => R = (rawLib) => {
  rawLib.install = install
  return rawLib as any
}