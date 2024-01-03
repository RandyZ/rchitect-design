import type { Menu, MenuConfigOptions, Repository } from "@rchitect-design/types";
import type { ComputedRef } from "vue-demi";

export namespace AppMenu {

  export interface State extends Repository.State, MenuConfigOptions {
    collapsed:boolean;
  }

  export interface Getters extends Repository.Getters {
    menus: ComputedRef<Menu[]>;
    isCollapsed:ComputedRef<boolean>;
  }
}