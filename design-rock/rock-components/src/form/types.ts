import type {
  RuleItem
} from 'async-validator'
import { Arrayable } from '@rchitect-rock/tools';

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>