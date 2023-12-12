import {
  Component, defineComponent, computed, provide, h,
  InjectionKey, unref, ComputedRef, PropType
} from "vue-demi";
import { diKT } from "@rchitect-rock/ioc";
import { RockComponent, Beans, ComponentMap, ComponentDict } from "@rchitect-rock/components";
import { CornerstoneComponentDriver } from "#/bridge";
import { createDriverHook } from "./ComponentDriverComposeable";
// TODO 用vue-types
export const props = {
  abstract: Boolean,
  tag: {
    type: String,
    default: 'div'
  },
  driverCls: String,
  /**
   * class style prefix
   */
  driver: { type: Object as PropType<CornerstoneComponentDriver>, required: false, default: null },
};

/**
 * 获取组件库的Map
 * @returns 
 */
function useComponentMap() {
  return diKT(Beans.ComponentMap);
};

export type DriverHook = {
  /**
   * 获取可用组件
   * 
   * @param key 
   * @returns 
   */
  use: (key: string | RockComponent) => Component;
  /**
   * 获取当前驱动的所有组件
   * @returns 
   */
  useComponents: () => ComputedRef<ComponentDict | undefined>;
  /**
   * 获取当前驱动的组件
   * @param key 
   * @returns 
   */
  useComponent: (key: string | RockComponent) => Component;
  /**
   * 获取已注册的所有组件
   * @returns 
   */
  useRegisteredComponents: () => ComputedRef<ComponentMap>;
  /**
   * 获取已注册的组件
   * @param key 
   * @returns 
   */
  useRegisteredComponent: (key: string | RockComponent) => Component;
};

export const DriverHookKey: InjectionKey<DriverHook> = Symbol.for('driverHook');

export default defineComponent({
  name: 'ComponentDriverProvider',
  alias: ['ComponentDriver'],
  inheritAttrs: false,
  props,
  setup(props, { slots, expose }) {
    if (!slots.default) {
      console.debug('ComponentDriverProvider 缺少默认插槽，不会render任何内容！');
    }
    // 实现driver中组件的按需获取
    const driver = unref(props.driver);
    const wmqComponents = computed(() => {
      return useComponentMap()
    });
    const { driverHook, driverComponentMap } = createDriverHook(driver, wmqComponents);
    provide(DriverHookKey, driverHook);
    if (driverComponentMap !== null) {
      provide(Beans.ComponentMap, driverComponentMap);
    }
    expose({
      driverHook
    })
  },
  render() {
    return !this.abstract
      ? h(
        this.tag,
        {
          class: `wmq-${this.driverCls}`
        },
        this.$slots.default?.()
      )
      : this.$slots.default?.()
  }
})