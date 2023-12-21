import * as pack from "./package.json"
import { Library, toPackage } from '@rchitect-rock/base-package';
import { Beans } from './beankeys';
import type { BeanKeys } from './beankeys';
import { RouteList } from './src/routes';
import { AsyncIocModule } from "@rchitect-rock/ioc";
import { Beans as layoutBeans } from "@rchitect-rock/layouts";
import { useUserStore } from "#/domain/store";


export const Lib:Library<BeanKeys> = toPackage({
  name: pack.name,
  version: pack.version,
  types: Beans,
  priority: 0,
  routes: RouteList,
  module: new AsyncIocModule(async (bind) => {
    const repositoryBean = useUserStore()
    bind(layoutBeans.UserState).toConstantValue(repositoryBean)
    bind(layoutBeans.UserAction).toConstantValue(repositoryBean)
    bind(layoutBeans.UserGetter).toConstantValue(repositoryBean)
  })
});
