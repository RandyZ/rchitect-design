import { HttpStatusCode } from "@rchitect-design/types";

export namespace Protocols {
  /**
   * 返回数据对象
   */
  export interface ResponseData<T> {
    /** 返回状态码 */
    status:HttpStatusCode;
    /** 业务返回码 */
    code:string;
    /** 返回提示信息 */
    message:string | undefined;
    /** 错误明细 */
    details:string | undefined;
    /** 验证错误明细 */
    validationErrors:any[];
    /** 返回数据对象 */
    data?:T;
    isOk():boolean;
  }
}
