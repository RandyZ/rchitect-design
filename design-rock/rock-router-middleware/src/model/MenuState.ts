import { PermissionModeEnum } from '@rchitect-design/constants';
import { Autowired, Bean } from '@rchitect-rock/ioc';
import { Auth, Beans } from '@rchitect-rock/settings';
import { unref } from 'vue-demi';

type AuthState = Auth.State;
@Bean()
export class MenuState {
  authState: Auth.State;
  constructor(@Autowired(Beans.AuthState) authState: AuthState) {
    this.authState = authState;
  }

  /**
   * 获取权限模式
   *
   * @returns
   */
  getPermissionMode(): PermissionModeEnum {
    return unref(this.authState.permissionMode);
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
