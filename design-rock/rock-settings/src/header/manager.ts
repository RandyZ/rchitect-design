import { computed, Ref, unref } from "vue-demi";
import { Autowired, Bean } from "@rchitect-rock/ioc";
import Beans from "#/../beankeys";
import { ThemeEnum } from "@rchitect-design/constants";
import type { Header } from "./store";
import type { MenuSettingManager } from "#/menu";
import type { AppConfig } from "#/app";
import { AppSetting } from "#/app";

@Bean()
export class HeaderSettingManager {
  // menuSettingManager: MenuSettingManager;
  getShowDoc:Ref<boolean>;
  getShowSearch:Ref<boolean>;
  getHeaderTheme:Ref<ThemeEnum>;
  getUseLockPage:Ref<boolean>;
  getShowFullScreen:Ref<boolean>;
  getShowNotice:Ref<boolean>;
  getShowBread:Ref<boolean>;
  getShowContent:Ref<boolean>;
  getShowHeaderLogo:Ref<boolean>;
  getShowHeader:Ref<boolean>;
  getFixed:Ref<boolean>;
  getShowMixHeaderRef:Ref<boolean>;
  getShowFullHeaderRef:Ref<boolean>;
  getShowInsetHeaderRef:Ref<boolean>;
  getUnFixedAndFull:Ref<boolean>;
  /**
   * @deprecated 直接使用Header.State.bgColor
   */
  getHeaderBgColor:Ref<string>;
  /**
   * @deprecated 直接使用Header.State.color
   */
  getHeaderColor:Ref<string>;
  getShowLocalePicker:Ref<boolean>;

  constructor(
    @Autowired(Beans.AppConfigState) appConfigState:AppConfig.State,
    @Autowired(Beans.AppSettingGetter) appSettingGetter:AppSetting.Getter,
    @Autowired(Beans.HeaderState) headerState:Header.State,
    @Autowired(Beans.MenuSettingManager) menuSettingManager:MenuSettingManager,
  ) {
    const getShowDoc = computed(() => headerState.showDoc);
    const getShowSearch = computed(() => headerState.showSearch)
    const getHeaderTheme = computed(() => headerState.theme)
    const getUseLockPage = computed(() => headerState.useLockPage)
    const getShowFullScreen = computed(() => headerState.showFullScreen)
    const getShowNotice = computed(() => headerState.showNotice)
    const getShowBread = computed(() => (
      !unref(menuSettingManager.isMenuModeOfHorizontal)
      && unref(appConfigState.sporadicSetting).showBreadCrumb
      && !unref(menuSettingManager.getSplit)
    ))
    const getShowContent = computed(() => unref(getShowBread) || unref(menuSettingManager.canShowHeaderTrigger))
    const getShowHeaderLogo = computed(() => (
      unref(appConfigState.containerSetting).showLogo
      && !unref(menuSettingManager.isSidebarMenu)
    ))
    const getShowHeader = computed(() => headerState.show)
    const getFixed = computed(() => headerState.fixed)
    const getShowMixHeaderRef = computed(() => !unref(menuSettingManager.isMenuTypeOfSidebar) && unref(getShowHeader))
    const getShowFullHeaderRef = computed(() => {
      return (!unref(appSettingGetter.isFullContent) && unref(getShowHeader));
    })
    const getShowInsetHeaderRef = computed(() => {
      const need = !unref(appSettingGetter.isFullContent) && unref(getShowHeader)
      return (need && !unref(getShowMixHeaderRef))
        || (need && unref(menuSettingManager.isMenuTypeOfTop))
        || (need && unref(menuSettingManager.isMenuTypeOfMixSidebar))
    })
    const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef))
    const getHeaderBgColor = computed(() => headerState.bgColor)
    const getHeaderColor = computed(() => headerState.color)
    const getShowLocalePicker = computed(() => headerState.showLocalePicker)
    this.getShowDoc = getShowDoc;
    this.getShowSearch = getShowSearch;
    this.getHeaderTheme = getHeaderTheme;
    this.getUseLockPage = getUseLockPage;
    this.getShowFullScreen = getShowFullScreen;
    this.getShowNotice = getShowNotice;
    this.getShowBread = getShowBread;
    this.getShowContent = getShowContent;
    this.getShowHeaderLogo = getShowHeaderLogo;
    this.getShowHeader = getShowHeader;
    this.getFixed = getFixed;
    this.getShowMixHeaderRef = getShowMixHeaderRef;
    this.getShowFullHeaderRef = getShowFullHeaderRef;
    this.getShowInsetHeaderRef = getShowInsetHeaderRef;
    this.getUnFixedAndFull = getUnFixedAndFull;
    this.getHeaderBgColor = getHeaderBgColor;
    this.getHeaderColor = getHeaderColor;
    this.getShowLocalePicker = getShowLocalePicker;
  }
}