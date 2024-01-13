import { diKT } from "@rchitect-rock/ioc";
import Beans from '../beankeys';

export const useHeaderState = () => diKT(Beans.HeaderState)
export const usePermissionState = () => diKT(Beans.PermissionState)
export const usePermissionStateActions = () => usePermissionState().useActions()