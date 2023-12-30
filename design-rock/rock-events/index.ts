import { diKT } from "@rchitect-rock/ioc";

export type { DataEventBus, Events } from './src/DataEventBus'
import _Beans from './beankeys';
export const Beans = _Beans
export * from './library'

export const useEventbus = (): DataEventBus => {
  return diKT(Beans.DataEventBus)
}