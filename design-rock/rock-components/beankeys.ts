import * as pack from './package.json';
import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { ContextOptions } from './bridge';
import type ComponentMap from './src/ComponentMap';

export default {
  ContextOptions: Symbol.for(`${pack.name}/ContextOptions`) as ServiceIdentifier<ContextOptions>,
  ComponentMap: Symbol.for(`${pack.name}/ComponentMap`) as ServiceIdentifier<ComponentMap>,
  ComponentDictionary: Symbol.for(`${pack.name}/ComponentDictionary`) as ServiceIdentifier<WmqComponentDictionary>
}