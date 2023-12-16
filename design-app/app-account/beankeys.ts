import * as pack from './package.json';
import { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { Repository } from './src/domain/repository'

export const Beans = {
  Repository: Symbol.for(`${pack.name}/SomeBeanRequired`) as ServiceIdentifier<Repository>,
}
export type BeanKeys = typeof Beans;