import { diKT } from '@rchitect-rock/ioc'
import { Beans as stateBeans } from '@rchitect-rock/state'

export const useAuthState = () => diKT(stateBeans.AuthState)
export const useAuthStateAction = () => diKT(stateBeans.AuthAction)