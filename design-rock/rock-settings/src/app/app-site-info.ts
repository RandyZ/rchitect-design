import type { WebSiteConfigurations, WebSiteSetting } from "@rchitect-design/types";
import type { ToRefs } from "vue-demi";
import { Repository } from "@rchitect-design/types";

export declare namespace AppSiteInfo {
  export type State = WebSiteSetting
  export interface Actions extends Repository.Actions {
    setSiteInfoAction(configs: Partial<WebSiteConfigurations>): void;
  }
}