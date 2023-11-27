import * as pack from "./package.json"
import { ServiceIdentifier } from '@rchitect-rock/ioc';
import { AppSettingStore } from "#/AppState/store";

export default {
  AppSettingStore: Symbol.for(`${pack.name}/SettingStore`) as ServiceIdentifier<AppSettingStore>,
}