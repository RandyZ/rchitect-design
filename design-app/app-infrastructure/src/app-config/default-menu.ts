import type { MenuSetting } from "@rchitect-design/types";
import {
  ColorPreset,
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  ThemeEnum,
  TriggerEnum
} from "@rchitect-design/constants";

export const defaultMenuSetting: MenuSetting = {
  // sidebar menu bg color
  bgColor: ColorPreset.SIDE_BAR_BG_COLOR_LIST[0],
  //  Whether to fix the left menu
  fixed: true,
  // Menu collapse
  collapsed: false,
  // Whether to display the menu name when folding the menu
  collapsedShowTitle: false,
  // Whether it can be dragged
  // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
  canDrag: false,
  // Whether to show no dom
  show: true,
  // Whether to show dom
  hidden: false,
  // Menu width
  menuWidth: 210,
  // Menu mode
  mode: MenuModeEnum.INLINE,
  // Menu type
  type: MenuTypeEnum.SIDEBAR,
  // Menu theme
  theme: ThemeEnum.DARK,
  // Split menu
  split: false,
  // Top menu layout
  topMenuAlign: 'center',
  // Fold trigger position
  trigger: TriggerEnum.HEADER,
  // Turn on accordion mode, only show a menu
  accordion: true,
  // Switch page to close menu
  closeMixSidebarOnChange: false,
  // Module opening method ‘click’ |'hover'
  mixSideTrigger: MixSidebarTriggerEnum.CLICK,
  // Fixed expanded menu
  mixSideFixed: false,
}
export default defaultMenuSetting;