export * from './src/bridge';
export * from './src/installer';
export { DriverHookKey } from './src/ComponentDriverProvider';
export type { DriverHook } from './src/ComponentDriverProvider';
export { createDriverHook } from '#/ComponentDriverComposeable';

/**
 * @description alias for @rchitect-rock/components/RockComponent
 */
export { RockComponent, toRockComponent } from '@rchitect-rock/components'
export { toPackage } from '@rchitect-rock/base-package'

export { default as AppParams } from './app-param-keys';

export type { ComponentDriverLibrary } from './driver-library'