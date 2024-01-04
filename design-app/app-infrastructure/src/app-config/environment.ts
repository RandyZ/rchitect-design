import type { GlobEnvConfig, ProjectSetting } from "@rchitect-design/types";
import { isUndefined } from 'lodash-es';
import DEFAULT_HEADER_SETTING from "./default-header";
import DEFAULT_MENU_SETTING from "./default-menu";
import DEFAULT_MULTI_TAB_SETTING from "./default-tabs";
import DEFAULT_TRANSITION_SETTING from "./default-transition";
import DEFAULT_SPORADIC_SETTING from "./defualt-sporadic";
import DEFAULT_FEATURE_FLAG_SETTING from "./default-feature";
import DEFAULT_THEME_SETTING from "./default-theme";
import DEFAULT_CONTAINER_SETTING from "./default-container";

const defaultProjectSetting:DeepPartial<ProjectSetting> = {
  containerSetting: DEFAULT_CONTAINER_SETTING,
  headerSetting: DEFAULT_HEADER_SETTING,
  menuSetting: DEFAULT_MENU_SETTING,
  multiTabsSetting: DEFAULT_MULTI_TAB_SETTING,
  transitionSetting: DEFAULT_TRANSITION_SETTING,
  sporadicSetting: DEFAULT_SPORADIC_SETTING,
  featureFlagSetting: DEFAULT_FEATURE_FLAG_SETTING,
  themeSetting: DEFAULT_THEME_SETTING,
  //TODO 处理Local的默认配置
}

export default (env?:GlobEnvConfig):DeepPartial<ProjectSetting> => {
  if (isUndefined(env)) {
    return defaultProjectSetting
  } else {
    // TODO 完成配置文件到默认配置的合并
    return defaultProjectSetting
  }
}