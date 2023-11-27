import { diKT } from '@rchitect-rock/ioc'
import { Beans } from '@rchitect-rock/settings'

export const useAppSetting = () => diKT(Beans.AppSettingState)
export const useAppSettingAction = () => diKT(Beans.AppSettingAction)
export const useAppSettingGetter = () => diKT(Beans.AppConfigGetter)


export const useAuthState = () => diKT(Beans.AuthState)
export const useAuthStateAction = () => diKT(Beans.AuthAction)