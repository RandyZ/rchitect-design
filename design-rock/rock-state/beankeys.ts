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
   * 应用运行时设置
   */
  AppRuntimeConfigOptions: Symbol.for(`${pack.name}/AppRuntimeConfigOptions`) as ServiceIdentifier<AppRuntimeConfigOptions>
};