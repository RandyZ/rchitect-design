export type ErrorMessageMode = 'none' | 'modal' | 'message' | 'thrown' |undefined

/**
 * 请求发送参数
 */
export interface RequestOptions {
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
  // authentication schemes，e.g: Bearer
  authenticationScheme?:string;
  // Splicing request parameters to url
  joinParamsToUrl?:boolean
  // Format request parameter time
  formatDate?:boolean
  // Whether to process the request result
  isTransformResponse?:boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?:boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?:string | (() => string)
  // Error message prompt type
  errorMessageMode?:ErrorMessageMode
  // Whether to add a timestamp
  joinTime?:boolean
  ignoreCancelToken?:boolean
  // Whether to send token in header
  withToken?:boolean
}

export interface RequestResult<T = any> {
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
  [key:string]:any
}

/**
 * Authentication schemes
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
 */
export type AuthenticationSchemes =
  'Basic'
  | 'Bearer'
  | 'Digest'
  | 'HOBA'
  | 'Mutual'
  | 'Negotiate / NTLM'
  | 'VAPID'
  | 'SCRAM'
  | 'AWS4-HMAC-SHA256'

/**
 * Authentication token 数据结构
 */
export interface AuthenticationToken {
  accessToken:string;
  refreshToken?:string;
  tokenType?:AuthenticationSchemes;
}
