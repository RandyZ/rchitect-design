import type { CommonModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import * as pack from './package.json';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import Beans from './beankeys';
import { DataEventBus } from './src/DataEventBus';

export const Lib:CommonModuleLibContext<typeof Beans> = {
  install,
  name: pack.name,
  version: pack.version,
  types: Beans,
  module: new AsyncIocModule(async (bind) => {
    console.debug(`${ pack.name } IocModule start load`);
    bind(Beans.DataEventBus).to(DataEventBus);
  }),
};
