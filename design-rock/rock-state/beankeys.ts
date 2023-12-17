import * as pack from './package.json';
import {
  authBeanGenerator,
  appBeanGenerator,
  screenLockerGenerator
} from './src/index';

export default {
  ...authBeanGenerator(pack.name),
  ...appBeanGenerator(pack.name),
  ...screenLockerGenerator(pack.name),
};