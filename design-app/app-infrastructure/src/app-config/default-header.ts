import type { HeaderSetting } from "@rchitect-design/types";
import { ColorPreset, ThemeEnum } from "@rchitect-design/constants";

export const defaultHeader:HeaderSetting = {
  hidden: false,
  // header bg color
  bgColor: ColorPreset.HEADER_PRESET_BG_COLOR_LIST[0],
  // header text color
  color: ColorPreset.HEADER_PRESET_COLOR_LIST[0],
  // Fixed at the top
  fixed: true,
  // Whether to show top
  show: true,
  // theme
  theme: ThemeEnum.LIGHT,
  // Whether to enable the lock screen function
  useLockPage: true,
  // Whether to show the full screen button
  showFullScreen: true,
  // Whether to show the document button
  showDoc: true,
  // Whether to show the notification button
  showNotice: true,
  // Whether to display the menu search
  showSearch: true,
  showLocalePicker: true,
}
export default defaultHeader;