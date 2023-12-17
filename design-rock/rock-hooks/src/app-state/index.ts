import { diKT } from '@rchitect-rock/ioc'
import { Beans as stateBeans } from '@rchitect-rock/state'

export const useAuthState = () => diKT(stateBeans.AuthState)
export const useAuthStateAction = () => diKT(stateBeans.AuthAction)

export const useAppState = () => diKT(stateBeans.AppState)
export const useAppStateAction = () => diKT(stateBeans.AppStateActions)
export const useAppStateGetter = () => diKT(stateBeans.AppStateGetters)
