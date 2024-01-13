import type { ModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import * as pack from './package.json';
import Beans from './beankeys';
import { AsyncIocModule } from "@rchitect-rock/ioc";
import { HeaderData } from "#/beans/HeaderData";

export const Lib:ModuleLibContext<'routes', typeof Beans> = {
  install,
  name: pack.name,
  version: pack.version,
  types: Beans,
  module: new AsyncIocModule(async (bind, unbind, isBound) => {
    console.debug(`【${ pack.name }】 IocModule start load...`);
    bind(Beans.HeaderState).to(HeaderData)
  }),
};
