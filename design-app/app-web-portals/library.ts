import * as pack from "./package.json"
import { BasicModuleLibContext, toPackage } from '@rchitect-rock/base-package';

export const Lib:BasicModuleLibContext = toPackage({
  name: pack.name,
  version: pack.version,
  priority: 0,
});
