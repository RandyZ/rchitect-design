import * as pack from "./package.json"
import { toPackage } from '@rchitect-rock/base-package';
import type { ModuleLibContext } from '@rchitect-rock/base-package';
import { Beans } from './';
import type { BeanKeys } from './';
import { RouteList } from './src/routes';


export const Lib: ModuleLibContext<'types' | 'module', BeanKeys> = toPackage({
  name: pack.name,
  version: pack.version,
  types: Beans,
  priority: 0,
  routes: RouteList
});
