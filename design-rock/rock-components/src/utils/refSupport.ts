import { type Component, type MaybeRef, unref } from "vue-demi";

/**
 * 契约组件中对驱动组件的引用Key
 */
export const DriverRefKey = 'DriverRef'
/**
 * 提取契约组件中的实际驱动组件
 * 
 * @param wmqComponentRef 
 * @returns 如果是契约组件，返回驱动组件，否则返回undefined
 */
export const driverRef = <T extends Component>(wmqComponentRef: MaybeRef<WmqComponent<T>>):Component | undefined => {
  const wmqComponent = unref(wmqComponentRef)
  if (!wmqComponent) {
    return undefined
  }
  return unref(wmqComponent[DriverRefKey])
}