import { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from '../../package.json';
import { Setting } from './setting-state'

export * from './defination'

export const Beans = {
  SettingState: Symbol.for(`${pack.name}/Setting.SettingState`) as ServiceIdentifier<Setting.SettingState>,
  SettingGetter: Symbol.for(`${pack.name}/Setting.SettingGetter`) as ServiceIdentifier<Setting.SettingGetter>,
  SettingAction: Symbol.for(`${pack.name}/Setting.SettingAction`) as ServiceIdentifier<Setting.SettingAction>
}
