import type { ServiceIdentifier } from "@rchitect-rock/ioc";
import type { MenuSettingManager } from "./menu-setting";
export * from './menu-setting'
/**
 * 应用级别配置的beans
 * 
 * @param packName 
 * @returns 
 */
export default (packName: string) => ({
  MenuSettingManager: Symbol.for(`${packName}/MenuSettingManager`) as ServiceIdentifier<MenuSettingManager>,
})