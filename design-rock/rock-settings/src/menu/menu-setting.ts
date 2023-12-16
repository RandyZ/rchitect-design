import { Bean, Autowired } from "@rchitect-rock/ioc";
import { MenuModeEnum, MenuTypeEnum } from "@rchitect-design/constants";
import type { ComputedRef, Ref} from "vue-demi"
import { computed, toRefs, unref } from "vue-demi"
import Beans from "../../beankeys";
import type { AppConfig } from '../app/app-config';
import { MenuSetting } from "@rchitect-design/types";

export type TopMenuAlign = 'start' | 'center' | 'end';

@Bean()
export class MenuSettingManager {
  // Menu Type MenuTypeEnum
  getMenuType: Ref<MenuTypeEnum>;
  getMenuMode: Ref<MenuModeEnum>;
  getCollapsed: Ref<boolean>;
  getMenuWidth: Ref<number>;
  getSplit: Ref<boolean>;
  getShowMenu: Ref<boolean>;
  getShowSidebar: ComputedRef<boolean>;

  /**
   * 修改MenuSetting
   * @param menuSetting
   */
  setMenuSetting: (menuSetting: Partial<MenuSetting>) => void;
  /**
   * 折叠菜单
   */
  toggleCollapsed: () => void

  constructor(
    @Autowired(Beans.AppConfigState) appConfigState: AppConfig.State
  ) {
    const allMenuRefs = toRefs(appConfigState.menuSetting.value);
    const getShowSidebar = computed(() => {
      return (
        unref(allMenuRefs.split) || (
          unref(allMenuRefs.show)
          && unref(allMenuRefs.mode) !== MenuModeEnum.HORIZONTAL
          && !unref(rootSetting.getFullContent)
        )
      );
    })
    this.getCollapsed = allMenuRefs.collapsed;
    this.getMenuWidth = allMenuRefs.menuWidth;
    this.getSplit = allMenuRefs.split;
    this.getShowMenu = allMenuRefs.show;
    this.getMenuMode = allMenuRefs.mode;
    this.getMenuType = allMenuRefs.type;
  }
}
