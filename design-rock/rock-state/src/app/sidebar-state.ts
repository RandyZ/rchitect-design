import { Repository } from "@rchitect-design/types";
import type { ComputedRef } from "vue-demi";

export namespace AppSidebar {
  export interface Getters extends Repository.Getters {
    isNoneTrigger:ComputedRef<boolean>;
    isCenterTrigger:ComputedRef<boolean>;
    isFooterTrigger:ComputedRef<boolean>;
    isHeaderTrigger:ComputedRef<boolean>;
  }
}