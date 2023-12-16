import * as pack from './package.json';
import {
  authBeanGenerator,
} from './src/index';


export default {
  ...authBeanGenerator(pack.name),
};