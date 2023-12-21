import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { Permission } from './permission'

export * from './permission'

/**
 * 权限模块
 * 
 * @param packName 
 * @returns 
 */
export default (packName: string) => ({
  PermissionState: Symbol.for(`${packName}/Permission.State`) as ServiceIdentifier<Permission.State>,
  PermissionAction: Symbol.for(`${packName}/Permission.Action`) as ServiceIdentifier<Permission.Action>,
})