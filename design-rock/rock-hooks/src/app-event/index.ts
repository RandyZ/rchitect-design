import { Beans, type DataEventBus } from '@rchitect-rock/settings';
import { diKT } from '@rchitect-rock/ioc'

export * from './use-breakpoint'
export * from './use-scroll-to'
export * from './use-event-listener'
/**
 * 获取时间总线
 * 
 * @returns 
 */
export const useEventbus = (): DataEventBus => {
  return diKT(Beans.DataEventBus)
}