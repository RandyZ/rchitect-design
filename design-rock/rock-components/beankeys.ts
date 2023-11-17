import * as pack from './package.json';
import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { ContextOptions } from './bridge';
import type ComponentMap from '#/ComponentMap';
import type { AppContextPropertyGeneric } from '@rchitect-rock/base-package';

export const AppContextParamDef = {
  DriverComponentDictionary: Symbol.for(`${pack.name}/DriverComponentDictionary`) as AppContextPropertyGeneric<WmqComponentDictionary>
}

export default {
  ContextOptions: Symbol.for(`${pack.name}/ContextOptions`) as ServiceIdentifier<ContextOptions>,
  ComponentMap: Symbol.for(`${pack.name}/ComponentMap`) as ServiceIdentifier<ComponentMap>,
}