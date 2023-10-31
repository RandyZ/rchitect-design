import * as pack from './package.json';
import { ServiceIdentifier } from '@weiming-rock/ioc';
import { omit } from 'lodash-es';
import type {SomeBeanRequired, SomeBeanProvide} from './index'

export const Beans = {
  BeanRequired: Symbol.for(`${pack.name}/SomeBeanRequired`) as ServiceIdentifier<SomeBeanRequired>,
  BeanProvided: Symbol.for(`${pack.name}/SomeBeanProvide`) as ServiceIdentifier<SomeBeanProvide>,
}
export type BeanKeys = typeof Beans;

/**
 * Module提供的Bean
 */
export const ProvideBean: Omit<BeanKeys, 'BeanRequired'> = {
  ...omit(Beans, ['BeanRequired'])
}
/**
 * Module模块启动需要的Bean
 */
export const RequiredBean: Omit<BeanKeys, 'SomeKey' | 'BeanProvided'> = {
  ...omit(Beans, ['BeanRequired'])
}