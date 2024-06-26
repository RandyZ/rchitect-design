import { ThrownHandler } from '@rchitect-design/types';
import {
  interfaces,
  Container,
  ContainerModule,
  AsyncContainerModule,
  injectable,
  inject
} from 'inversify';
import { InjectionKey } from 'vue-demi';

export type ServiceIdentifier<T> = interfaces.ServiceIdentifier<T> & InjectionKey<T>;
export type IocModule = interfaces.ContainerModule;
export const IocModule = ContainerModule;
export type AsyncIocModule = interfaces.AsyncContainerModule;
export const AsyncIocModule = AsyncContainerModule;
export type AsyncIocModuleCallBack = interfaces.AsyncContainerModuleCallBack;
export type IocContainer = Container;
export const IocContainer = Container;
export type IocContainerOptions = interfaces.ContainerOptions;
export const Bean = injectable;
type Autowired = typeof inject;
export const Autowired: Autowired = inject;


export const CONTAINER_KEY: ServiceIdentifier<IocContainer> = Symbol.for('CONTAINER_KEY') as ServiceIdentifier<IocContainer>;
export const THROWN_HANDLER: ServiceIdentifier<ThrownHandler> = Symbol.for('ThrownHandler') as ServiceIdentifier<ThrownHandler>;