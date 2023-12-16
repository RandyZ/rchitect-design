import type { ModuleLibContext } from '@rchitect-rock/base-package';
import { install } from '@rchitect-rock/base-package';
import * as pack from './package.json';
import types from './beankeys';

export const Lib: ModuleLibContext<'routes' | 'module', typeof types> = {
  install,
  name: pack.name,
  version: pack.version,
  types,
};
