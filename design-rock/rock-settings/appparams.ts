import { ProjectSetting } from '@rchitect-design/types';
import * as pack from './package.json';
import type { AppContextPropertyGeneric } from '@rchitect-rock/base-package';

export default {
  ProjectSettingParam: Symbol.for(`${pack.name}/SubAppGlobalRegisterConfigs`) as AppContextPropertyGeneric<ProjectSetting>,
}