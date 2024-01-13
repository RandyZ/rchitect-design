import { computed, type Ref, toRef, unref } from "vue-demi";
import { Autowired, Bean } from "@rchitect-rock/ioc";
import { type AppConfig, Beans, type MenuSettingManager } from "@rchitect-rock/settings";
import { MenuModeEnum } from "@rchitect-design/constants";
import type { HeaderState } from "#/app/header-state";
import { useFullscreen } from "@vueuse/core";

@Bean()
export class HeaderData implements HeaderState.Data {

  isShowBreadcrumb: Ref<boolean>;
  supportFullScreen: Ref<boolean>;
  isFullScreen: Ref<boolean>;
  headerBgColor: Ref<string>;

  constructor(
    @Autowired(Beans.AppConfigState) appConfigState:AppConfig.State,
    @Autowired(Beans.MenuSettingManager) menuSettingManager:MenuSettingManager,
  ) {
    const headerSetting = appConfigState.headerSetting
    const featureFlagSetting = appConfigState.featureFlagSetting
    this.isShowBreadcrumb = computed(() => {
      return unref(menuSettingManager.getMenuMode) !== MenuModeEnum.HORIZONTAL
      && unref(featureFlagSetting.showBreadCrumb)
      && !unref(menuSettingManager.getSplit)
    });
    this.supportFullScreen = toRef(featureFlagSetting, 'canFullContent');
    this.isFullScreen = useFullscreen().isFullscreen;
    this.headerBgColor = toRef(headerSetting, 'bgColor')
  }
  useActions() {
    return {
      toggleFullScreen: useFullscreen().toggle
    }
  }
}