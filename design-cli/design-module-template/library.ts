import * as pack from "./package.json"
import { toPackage } from '@rchitect-rock/base-package';
import { AsyncIocModule } from "@rchitect-rock/ioc";
import type { Library } from '@rchitect-rock/base-package';
import { Beans } from './';
import type { BeanKeys } from './';
import { SomeBeanProvideImpl, RouteList } from './index'


export const Lib: Library<BeanKeys> = toPackage({
  name: pack.name,
  version: pack.version,
  types: Beans,
  priority: 0,
  routes: RouteList,
  module: new AsyncIocModule(async (bind) => {
    // 注册bean
    console.log('IOC容器注册完成，开始创建Bean');
    bind(Beans.BeanProvided).to(SomeBeanProvideImpl);
  }),
  onSetup: async (_app, _appContext) => {
    // IOC机制加载完成
    console.log('IOC机制加载完成');
  },
  beforeSetup: async (_app, _appContext) => {
    console.log('IOC容器尚未创建，处理pinia初始化等必须操作');
  }
});
