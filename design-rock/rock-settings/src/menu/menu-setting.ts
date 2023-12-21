import { Bean, Autowired } from "@rchitect-rock/ioc";
import { MenuModeEnum, MenuTypeEnum } from "@rchitect-design/constants";
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
  getShowSidebar:ComputedRef<boolean>;

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
    const allMenuRefs = toRefs(appConfigState.menuSetting.value);
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
    this.getShowSidebar = getShowSidebar;


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
