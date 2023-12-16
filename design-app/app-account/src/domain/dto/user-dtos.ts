import { RoleInfo } from "@rchitect-design/types"

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
}
