import { PermissionModeEnum } from '@rchitect-design/constants';
import { Autowired, Bean } from '@rchitect-rock/ioc';
import { type Permission, Beans } from '@rchitect-rock/state';
import { unref } from 'vue-demi';

@Bean()
export class MenuState {
  permissionState: Permission.State;
  constructor(@Autowired(Beans.PermissionState) permissionState: Permission.State) {
    this.permissionState = permissionState;
  }

  /**
   * 获取权限模式
   *
   * @returns
   */
  getPermissionMode(): PermissionModeEnum {
    return unref(this.permissionState.permissionMode);
  }

  /**
   * 是否是后台权限模式
   * @returns
   */
  isBackMode = () => {
    return this.getPermissionMode() === PermissionModeEnum.BACK;
  };
  /**
   * 是否是路由表模式
   * @returns
   */
  isRouteMappingMode = () => {
    return this.getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
  };
  /**
   * 是否是角色路由模式
   * @returns
   */
  isRoleMode = () => {
    return this.getPermissionMode() === PermissionModeEnum.ROLE;
  };
}
