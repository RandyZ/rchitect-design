import { Repository } from "@rchitect-design/types";

/**
 * 应用头部状态
 */
export namespace AppHeader {

  export type Getters = Repository.Getters<{
    showBreadcrumb:boolean,
    showFullScreen:boolean,
    getHeaderBgColor:string,
  }>
}