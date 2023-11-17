import { any, object, string } from "vue-types";

/**
 * @description Iconify组件属性Type
 */
export type IconifyProps = {
  icon: string
  color?: string
  size: string | number
  prefix: string
  infinite: boolean
  hoverPointer: boolean
  hoverColor: string
}

/**
 * @description Iconify组件属性
 */
export const IconifyPropTypes = {
  icon: string().isRequired,
  color: string(),
  size: any<string|number>().def(16),
  infinite: any<boolean>().def(false),
  prefix: string().def(''),
  hoverPointer: any<boolean>().def(false),
  hoverColor: string().def('inherit'),
}