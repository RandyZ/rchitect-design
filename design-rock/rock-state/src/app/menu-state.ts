import { Repository } from "@rchitect-design/types";
import type { ComputedRef } from "vue-demi";

export namespace AppMenu {

  export interface State extends Repository.State {
    collapsed:boolean;
  }

  export interface Getters extends Repository.Getters {
    isCollapsed:ComputedRef<boolean>;
  }
}