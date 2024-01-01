import { diKT } from "@rchitect-rock/ioc";
import { Beans as settingBeans } from "@rchitect-rock/settings";
export const useHeaderSettingManager = () => diKT(settingBeans.MenuSettingManager)