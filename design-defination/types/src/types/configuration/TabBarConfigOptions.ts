export interface TabBarConfigOptions {
  show: boolean
  visible: boolean
  cache: boolean
  canDrag: boolean
  showQuick: boolean
  showRedo: boolean
  showFold: boolean
  readonly height: number
}

/**
 * @deprecated Please use TabBarConfigOptions instead
 */
export type TabTbrConfigOptions = TabBarConfigOptions
