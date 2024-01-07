import { PermissionModeEnum } from '@rchitect-design/constants';
import type { Menu, Repository } from '@rchitect-design/types';

export declare namespace Permission {
  export interface State {
    // Permission code list
    permCodeList:string[] | number[];
    // Permission mode
    permissionMode:PermissionModeEnum;
    // Whether the route has been dynamically added
    isDynamicAddedRoute:boolean;
    // To trigger a menu update
    lastBuildMenuTime:number;
    // Backstage menu list
    backMenuList:Menu[];
    // Front desk menu list
    frontMenuList:Menu[];
  }

  export interface Action extends Repository.Actions {
    setPermCodeList(codeList:string[]):void;

    setBackMenuList(list:Menu[]):void;

    setFrontMenuList(list:Menu[]):void;

    setLastBuildMenuTime():void;

    setDynamicAddedRoute(added:boolean):void;

    resetState():void;

    changePermissionCode():Promise<void>;

    buildRoutesAction():Promise<RouteRecordItem[]>;
  }
}
