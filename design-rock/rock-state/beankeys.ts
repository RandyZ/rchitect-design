import * as pack from './package.json';
import {
  authBeanGenerator,
  appBeanGenerator,
} from './src/index';
import { ServiceIdentifier } from "@rchitect-rock/ioc";
import type { AppRuntimeConfigOptions } from "@rchitect-design/types";

export default {
  ...authBeanGenerator(pack.name),
  ...appBeanGenerator(pack.name),
  /**
   * @deprecated 后续使用其他Store分解替代
   */
  AppRunTimeConfigOptions: Symbol.for(`${pack.name}/AppRuntimeConfigOptions`) as ServiceIdentifier<AppRuntimeConfigOptions>
};