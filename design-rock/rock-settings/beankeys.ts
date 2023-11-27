import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from './package.json';
import { 
  appBeanGenerator,
  authBeanGenerator,
  type DataEventBus,
} from './src/index';


export default {
  ...appBeanGenerator(pack.name),
  ...authBeanGenerator(pack.name),
  DataEventBus: Symbol.for(`${pack.name}/DataEventBus`) as ServiceIdentifier<DataEventBus>,
};