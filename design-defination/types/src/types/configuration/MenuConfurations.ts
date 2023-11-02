import { MenuModeEnum, MixSidebarTriggerEnum } from "@rchitect-design/constants"

/**
 * @description: menu config
 */
export interface MenuConfigOptions {
  canDrag: boolean
  split: boolean
  mode: MenuModeEnum
  accordion: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
  mixSideFixed: boolean
  topMenuAlign: 'start' | 'center' | 'end'
  subMenuWidth: number
  dropdownPlacement:
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
}

