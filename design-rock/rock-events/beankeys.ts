import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from './package.json';
import {
  type DataEventBus,
} from './src/DataEventBus';

export default {
  DataEventBus: Symbol.for(`${ pack.name }/DataEventBus`) as ServiceIdentifier<DataEventBus>,
};