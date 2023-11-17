export * from './src/bridge';
export * from './src/installer';
export { default as ComponentDriverProvider } from './src/ComponentDriverProvider';
export { DriverHookKey } from './src/ComponentDriverProvider';
export type { DriverHook } from './src/ComponentDriverProvider';
export { createDriverHook } from '#/ComponentDriverComposeable';

/**
 * @description alias for @rchitect-rock/components/RockComponent
 */
export { RockComponent } from '@rchitect-rock/components' 