import * as pack from './package.json';
import {
  authBeanGenerator,
  appBeanGenerator
} from './src/index';


export default {
  ...authBeanGenerator(pack.name),
  ...appBeanGenerator(pack.name),
};