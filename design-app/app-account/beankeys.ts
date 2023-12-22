import * as pack from './package.json';
import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { Repository } from './src/domain/repository'
import type { UserStateStore } from './src/state'

export const Beans = {
  Repository: Symbol.for(`${pack.name}/Repository`) as ServiceIdentifier<Repository>,
  UserStateStore: Symbol.for(`${pack.name}/UserStateStore`) as ServiceIdentifier<UserStateStore>,
}
export type BeanKeys = typeof Beans;