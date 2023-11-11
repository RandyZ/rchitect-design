import * as pack from './package.json';
import { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { SomeBeanRequired, SomeBeanProvide } from './index'

export const Beans = {
  BeanRequired: Symbol.for(`${pack.name}/SomeBeanRequired`) as ServiceIdentifier<SomeBeanRequired>,
  BeanProvided: Symbol.for(`${pack.name}/SomeBeanProvide`) as ServiceIdentifier<SomeBeanProvide>,
}
export type BeanKeys = typeof Beans;