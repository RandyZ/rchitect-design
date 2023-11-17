import { bool } from 'vue-types'

export const border = bool().def(false)
export const closable = bool().def(false)
export const props = {
  border,
  closable
}