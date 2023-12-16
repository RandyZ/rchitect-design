import type { ServiceIdentifier } from '@rchitect-rock/ioc';
// import type { Auth } from './auth'

// export * from './auth'

/**
 * 应用级别配置的beans
 * 
 * @param packName 
 * @returns 
 */
export default (packName: string) => ({
  // AuthState: Symbol.for(`${packName}/Auth.State`) as ServiceIdentifier<Auth.State>,
  // AuthAction: Symbol.for(`${packName}/Auth.Action`) as ServiceIdentifier<Auth.Action>,
})