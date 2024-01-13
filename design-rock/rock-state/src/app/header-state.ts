import { Repository } from "@rchitect-design/types";

/**
 * 应用头部状态
 *
 */
export namespace HeaderState {

  export type Data = Repository.Data<{
    /**
     * 是否支持面包屑
     */
    isShowBreadcrumb:boolean,
    /**
     * 是否支持全屏
     */
    supportFullScreen:boolean,
    /**
     * 是否全屏
     */
    isFullScreen:boolean,
    /**
     * 头部背景色
     */
    headerBgColor:string,
  }, Actions>

  export type Actions = Repository.Actions<{
    /**
     * 切换全屏
     */
    toggleFullScreen:() => void
  }>
}