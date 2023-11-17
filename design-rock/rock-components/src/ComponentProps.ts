import { toType } from 'vue-types';
import { BasicProps } from '@rchitect-design/types';

export default class ComponentProps extends BasicProps {
  static get style() {
    return toType('style', {
      type: [String, Object],
      default: undefined,
    });
  }
}
