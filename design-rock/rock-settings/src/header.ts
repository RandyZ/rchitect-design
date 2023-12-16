import { computed, Ref, unref } from "vue-demi";
import { Autowired, Bean } from "@rchitect-rock/ioc";
import type { AppConfig } from "./app";
import Beans from "#/../beankeys";

@Bean()
export class HeaderSetting {
  getShowDoc: Ref<boolean>;
  getShowSearch: Ref<boolean>;
  getHeaderTheme: Ref<ThemeEnum>;
  getUseLockPage: Ref<boolean>;
  getShowFullScreen: Ref<boolean>;
  getShowNotice: Ref<boolean>;
  getShowBread: Ref<boolean>;
  getShowContent: Ref<boolean>;
  getShowHeaderLogo: Ref<boolean>;
  getShowHeader: Ref<boolean>;
  getFixed: Ref<boolean>;
  getShowMixHeaderRef: Ref<boolean>;
  getShowFullHeaderRef: Ref<boolean>;
  getShowInsetHeaderRef: Ref<boolean>;
  getUnFixedAndFull: Ref<boolean>;
  getHeaderBgColor: Ref<string>;
  getHeaderColor: Ref<string>;
  getShowLocalePicker: Ref<boolean>;
  constructor(
    @Autowired(Beans.AppConfigGetter) appConfigGetter: AppConfig.Getter
  ) {
    const headerSettingStore = appConfigGetter.getHeaderSetting;
    const getShowDoc = computed(() => headerSettingStore.showDoc);
    const getShowSearch = computed(() => headerSettingStore.showSearch)
    const getHeaderTheme = computed(() => headerSettingStore.theme)
    const getUseLockPage = computed(() => headerSettingStore.useLockPage)
    const getShowFullScreen = computed(() => headerSettingStore.showFullScreen)
    const getShowNotice = computed(() => headerSettingStore.showNotice)
    const getShowBread = computed(() => (
      unref(menuSetting.getMenuMode) !== MenuModeEnum.HORIZONTAL
      && unref(rootSetting.getShowBreadCrumb)
      && !unref(menuSetting.getSplit)
    ))
    const getShowContent = computed(() => unref(getShowBread) || unref(menuSetting.getShowHeaderTrigger))
    const getShowHeaderLogo = computed(() => (
      unref(rootSetting.getShowLogo)
      && !unref(menuSetting.isMenuSidebarType)
      && !unref(menuSetting.isMenuMixSidebarType)
    ))
    const getShowHeader = computed(() => headerSettingStore.show)
    const getFixed = computed(() => headerSettingStore.fixed)
    const getShowMixHeaderRef = computed(() => !unref(menuSetting.isMenuSidebarType) && unref(getShowHeader))
    const getShowFullHeaderRef = computed(() => {
      return (!unref(rootSetting.getFullContent) && unref(getShowHeader));
    })
    const getShowInsetHeaderRef = computed(() => {
      const need = !unref(rootSetting.getFullContent) && unref(getShowHeader)
      return (need && !unref(getShowMixHeaderRef))
        || (need && unref(menuSetting.isMenuTopType))
        || (need && unref(menuSetting.isMenuMixSidebarType))
    })
    const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef))
    const getHeaderBgColor = computed(() => headerSettingStore.bgColor)
    const getHeaderColor = computed(() => headerSettingStore.color)
    const getShowLocalePicker = computed(() => headerSettingStore.showLocalePicker)
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