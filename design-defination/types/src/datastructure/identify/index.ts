export interface PermissionInfo {
  name: string
  values: (string | PermissionInfo)[]
}

export interface RoleInfo {
  roleName: string
  value: string
  permissions?: PermissionInfo[],
  // 扩展属性
  [key: string]: any
}

export interface UserInfo {
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 真实名字
  realName: string
  // 头像
  avatar: string
  // 介绍
  desc?: string
  // 首页地址
  homePath?: string
  // 角色列表
  roles: RoleInfo[],
  // 扩展属性
  [key: string]: any
}