import { Repository } from "@rchitect-design/types";
import type { ComputedRef } from "vue-demi";

export namespace AppHeader {

  export interface State extends Repository.State {
  }

  export interface Getters extends Repository.Getters {
    isCollapsed:ComputedRef<boolean>;
  }
}