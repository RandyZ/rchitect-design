import { createTypes, toType } from 'vue-types';
import type { VueTypesInterface, VueTypeValidableDef } from 'vue-types';
import { CSSProperties } from "vue-demi";

export const BasicProps = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
})

export type BasicProps = typeof BasicProps

// 需要自定义扩展的类型
// see: https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#the-extend-method
// propTypes.extend([
//   {
//     name: 'style',
//     getter: true,
//     type: [String, Object],
//     default: undefined
//   }
// ])

// 自定义扩展vue-types
export type PropTypes = VueTypesInterface & {
  readonly style:VueTypeValidableDef<CSSProperties>
}

export class propTypes extends BasicProps {
  static get style() {
    return toType('style', {
      type: [ String, Object ],
      default: undefined
    })
  }
}
