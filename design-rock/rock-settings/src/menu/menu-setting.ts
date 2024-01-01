import { Bean, Autowired } from "@rchitect-rock/ioc";
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from "@rchitect-design/constants";
import { removeResizeListener, debounceAwait, addResizeListener } from "@rchitect-rock/tools";
import type { ComputedRef, Ref } from "vue-demi"
import { computed, toRefs, unref } from "vue-demi"
import Beans from "../../beankeys";
import type { AppConfig, AppSetting } from '#/app';
import type { MenuSetting } from "@rchitect-design/types";

export type TopMenuAlign = 'start' | 'center' | 'end';

@Bean()
export class MenuSettingManager {
  // Menu Type MenuTypeEnum
  getMenuType:Ref<MenuTypeEnum>;
  getMenuMode:Ref<MenuModeEnum>;
  getCollapsed:Ref<boolean>;
  getMenuWidth:Ref<number>;
  getSplit:Ref<boolean>;
  getShowMenu:Ref<boolean>;
  isMenuHidden:Ref<boolean>;
  /**
   * 是否展示侧边栏
   */
  getShowSidebar:ComputedRef<boolean>;
  // MenuTypeEnum
  isMenuTypeOfTop:ComputedRef<boolean>;
  isMenuTypeOfSidebar:ComputedRef<boolean>;
  isMenuTypeOfMixSidebar:ComputedRef<boolean>;
  isMenuTypeOfMix:ComputedRef<boolean>;
  isMenuTypeOfTopRecommend:ComputedRef<boolean>;
  /**
   * @deprecated 使用isMenuTypeOfMix
   */
  isMenuMixType: ComputedRef<boolean>;
  /**
   * @deprecated 使用isMenuTypeOfMixSidebar
   */
  isMenuMixSidebarType: ComputedRef<boolean>;
  // MenuModeEnum
  isMenuModeOfVertical:ComputedRef<boolean>;
  isMenuModeOfVerticalRight:ComputedRef<boolean>;
  isMenuModeOfHorizontal:ComputedRef<boolean>;
  isMenuModeOfInline:ComputedRef<boolean>;




  /**
   * 菜单是否是侧边栏模式
   */
  isSidebarMenu: ComputedRef<boolean>;
  /**
   * 菜单顶部是否可以隐藏
   */
  canShowHeaderTrigger: ComputedRef<boolean>;

  /**
   * 修改MenuSetting
   * @param menuSetting
   */
  setMenuSetting: (menuSetting: Partial<MenuSetting>) => Promise<void>;
  /**
   * 折叠菜单
   */
  toggleCollapsed: () => void

  /**
   * 移除resize监听
   */
  destory: () => void

  constructor(
    @Autowired(Beans.AppConfigState) appConfigState:AppConfig.State,
    @Autowired(Beans.AppConfigAction) appConfigAction:AppConfig.Action,
    @Autowired(Beans.AppSettingState) appSettingState:AppSetting.State
  ) {
    const allMenuRefs = toRefs(unref(appConfigState.menuSetting));
    const getShowSidebar = computed(() => {
      return (
        unref(allMenuRefs.split) || (
          unref(allMenuRefs.show)
          && unref(allMenuRefs.mode) !== MenuModeEnum.HORIZONTAL
          && !unref(appSettingState.fullContent)
        )
      );
    })
    this.getCollapsed = allMenuRefs.collapsed;
    this.getMenuWidth = allMenuRefs.menuWidth;
    this.getSplit = allMenuRefs.split;
    this.getShowMenu = allMenuRefs.show;
    this.getMenuMode = allMenuRefs.mode;
    this.getMenuType = allMenuRefs.type;
    this.isMenuHidden = allMenuRefs.hidden;
    this.getShowSidebar = getShowSidebar;

    this.canShowHeaderTrigger = computed(() => {
      if (
        unref(this.getMenuType) === MenuTypeEnum.TOP_MENU ||
        !unref(this.getShowMenu) ||
        unref(this.isMenuHidden)
      ) {
        return false;
      }
      return unref(allMenuRefs.trigger) === TriggerEnum.HEADER;
    });
    const isTypeOfMenu = (type: MenuTypeEnum) => computed(() => unref(allMenuRefs.type) === type)
    // MenuType响应式Enum
    this.isMenuTypeOfTop = isTypeOfMenu(MenuTypeEnum.TOP_MENU);
    this.isMenuTypeOfSidebar = isTypeOfMenu(MenuTypeEnum.SIDEBAR);
    this.isMenuTypeOfMix = isTypeOfMenu(MenuTypeEnum.MIX);
    this.isMenuTypeOfMixSidebar = isTypeOfMenu(MenuTypeEnum.MIX_SIDEBAR);
    this.isMenuTypeOfTopRecommend = isTypeOfMenu(MenuTypeEnum.SIDE_WITH_TOP_RECOMMEND);
    this.isMenuMixType = this.isMenuTypeOfMix;
    this.isMenuMixSidebarType = this.isMenuTypeOfMix;
    // MenuMode响应式Enum
    const isModeOfMenu = (mode: MenuModeEnum) => computed(() => unref(allMenuRefs.mode) === mode);
    this.isMenuModeOfVertical = isModeOfMenu(MenuModeEnum.VERTICAL);
    this.isMenuModeOfVerticalRight = isModeOfMenu(MenuModeEnum.VERTICAL_RIGHT);
    this.isMenuModeOfHorizontal = isModeOfMenu(MenuModeEnum.HORIZONTAL);
    this.isMenuModeOfInline = isModeOfMenu(MenuModeEnum.INLINE);

    this.isSidebarMenu = computed(() =>
      unref(allMenuRefs.type) === MenuTypeEnum.SIDEBAR || unref(allMenuRefs.type) === MenuTypeEnum.MIX_SIDEBAR
    );

    this.setMenuSetting = (menuSetting: Partial<MenuSetting>) =>  {
      return appConfigAction.setProjectConfig({ menuSetting });
    }
    this.toggleCollapsed = () => this.setMenuSetting({
      collapsed: !unref(allMenuRefs.collapsed)
    })

    const debounce = debounceAwait(200);
    const parent = document.body;
    const resizeMethod = async () => {
      await debounce();
      // const width = document.body.clientWidth;
      // let collapsed = false
      // if (width < 1024 + 210 + 238) {
      //     collapsed = true
      // }
      this.setMenuSetting({
        collapsed: true
      });
    };

    const initResizeObserver = () => {
      addResizeListener(parent, resizeMethod);
    };

    this.destory = () => {
      removeResizeListener(parent, resizeMethod);
    };

    initResizeObserver()
  }
}
