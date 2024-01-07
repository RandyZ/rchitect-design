import { diKT } from '@rchitect-rock/ioc'
import { Beans as stateBeans } from '@rchitect-rock/state'

export const usePermissionState = () => diKT(stateBeans.PermissionState)
export const usePermissionStateAction = () => diKT(stateBeans.PermissionAction)

export const useAppState = () => diKT(stateBeans.AppState)
export const useAppStateAction = () => diKT(stateBeans.AppStateActions)
export const useAppStateGetter = () => diKT(stateBeans.AppStateGetters)

/**
 * 获取运行时配置
 * @deprecated 已废弃，逐步分解到其他模块
 */
export const useAppRunTimeConfigOptions = () => diKT(stateBeans.AppRuntimeConfigOptions)

export * from './useWebTitle'
export * from './usePagination'
export * from './useContext'
export * from './useHeaders'