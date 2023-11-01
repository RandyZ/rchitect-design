import type { VNodeChild, PropType as VuePropType } from 'vue-demi'
import type { RouteRecordItem as IRouteRecordItem } from './router'
import type { ViteEnv as IViteEnv } from '#/types/configuration/ViteEnv'

// define global
declare global {
  // Basic type definition
  type Recordable<T> = Record<string, T>
  type Nullable<T> = T | null
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>
  type EmitType = (event: string, ...args: any[]) => void
  type TargetContext = '_self' | '_blank'
  type LabelValueOptions = {
    label: string
    value: any
    [key: string]: string | number | boolean
  }[]

  // Type Utils
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  interface Fn<T = any, R = T> {
    (...arg: T[]): R
  }
  interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>
  }

  // Parameter definition
  const __VITE_USE_MOCK__: boolean
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }
  
  // Vite
  type ViteEnv = IViteEnv
  /**
   * Support for vite import.meta.glob
   */
  type GlobModule = Recordable<any>
  // import.meta
  interface ImportMetaEnv extends ViteEnv {
    __: never
  }

  // vue & dom & router
  interface ComponentElRef<T extends HTMLElement = HTMLDivElement> { $el: T }
  type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null
  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
  type PropType<T> = VuePropType<T>
  type VueNode = VNodeChild | JSX.Element
  type RouteRecordItem = IRouteRecordItem
}