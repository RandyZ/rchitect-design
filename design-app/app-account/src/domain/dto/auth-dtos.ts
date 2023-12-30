import { AuthenticationToken } from "@rchitect-design/types"
import { RoleInfo } from "@rchitect-design/types"

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResultModel extends AuthenticationToken {
  userId: string | number
  role: RoleInfo
}

export interface UserInfoModel {
  roles: RoleInfo[]
  userId: string | number
  username: string
  realName?: string
  avatar: string
  desc?: string
}

