import type { WebSiteConfigurations } from "@rchitect-design/types";
import { Repository } from "@rchitect-design/types";

export declare namespace AppSiteInfo {
  export type State = WebSiteConfigurations

  export interface Actions extends Repository.Actions {
    setSiteInfoAction(configs:Partial<WebSiteConfigurations>):void;
  }
}