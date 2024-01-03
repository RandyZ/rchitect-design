import type { FeatureFlagSetting } from "@rchitect-design/types";
import { SettingButtonPositionEnum } from "@rchitect-design/constants";

const def:FeatureFlagSetting =  {
  showPicker: true,
  canEmbedIFramePage: true,
  canFullContent: false,
  closeMessageOnSwitch: true,
  openKeepAlive: true,
  removeAllHttpPending: false,
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  showBreadCrumb: true,
  showBreadCrumbIcon: true,
  showDarkModeToggle: true,
  showSettingButton: true,
  showSettingDrawer: true,
  useOpenBackTop: true
}
export default def;