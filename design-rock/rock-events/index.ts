import { diKT } from "@rchitect-rock/ioc";

export type { DataEventBus, Events } from './src/DataEventBus'
export { default as Beans } from './beankeys'
export * from './library'

export const useEventbus = (): DataEventBus => {
  return diKT(Beans.DataEventBus)
}