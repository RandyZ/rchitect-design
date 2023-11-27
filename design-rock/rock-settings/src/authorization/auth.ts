import { PermissionModeEnum } from '@rchitect-design/constants';
import type { Menu, Repository } from '@rchitect-design/types';
import type { Ref } from 'vue-demi';

export declare namespace Auth {
  export interface State extends Repository.State {
    // Permission code list
    permCodeList: Ref<string[] | number[]>;
    // Permission mode
    permissionMode: Ref<PermissionModeEnum>;
    // Whether the route has been dynamically added
    isDynamicAddedRoute: Ref<boolean>;
    // To trigger a menu update
    lastBuildMenuTime: Ref<number>;
    // Backstage menu list
    backMenuList: Menu[];
    frontMenuList: Menu[];
  }

  export interface Action extends Repository.Actions {
    setPermCodeList(codeList: string[]): void;
    setBackMenuList(list: Menu[]): void;
    setFrontMenuList(list: Menu[]): void;
    setLastBuildMenuTime(): void;
    setDynamicAddedRoute(added: boolean): void;
    resetState(): void;
    changePermissionCode(): Promise<void>;
    buildRoutesAction(): Promise<RouteRecordItem[]>;
  }
}
