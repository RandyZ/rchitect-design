import * as pack from "./package.json"
import { toPackage } from '@rchitect-rock/base-package';
import type { BasicModuleLibContext } from '@rchitect-rock/base-package';


export const Lib: BasicModuleLibContext = toPackage({
  name: pack.name,
  version: pack.version
});
