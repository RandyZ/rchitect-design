import type { ThemeSetting } from "@rchitect-design/types";
import { ColorPreset, ThemeEnum } from "@rchitect-design/constants";

const def:ThemeSetting = {
  colorWeak: false,
  grayMode: false,
  theme: ThemeEnum.LIGHT,
  themeColor: ColorPreset.APP_PRESET_COLOR_LIST[0]
}
export default def;