import type { ServiceIdentifier } from "@rchitect-rock/ioc";
import { Protocols } from "@rchitect-app/infrastructure";

/**
 * 协议转换器
 */
export type ProtocolConverter = {
  req?:(params:any) => any
  resp?:(resp:Protocols.ResponseData<any>) => any
  isOk?:(code:string) => boolean
}

/**
 * Api转换器
 */
export type ApiMapping = {
  [key:string]:string | {
    url:string
    method?:string
    converter?:ProtocolConverter
  }
}

export default {
  ServerApiMapping: Symbol.for(`@/ApiMapping`) as ServiceIdentifier<ApiMapping>,
}