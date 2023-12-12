import { ComponentDict, ComponentMap } from "@rchitect-rock/components";
import { CornerstoneComponentDriver } from "./bridge";
import { Component, computed, ComputedRef, unref } from "vue-demi";
import { DriverHook } from "./ComponentDriverProvider";

const defaultEmptyMap = new ComponentMap();
/**
 * 生成驱动的hook
 * @param driver
 * @param defaultComponentMap
 * @returns
 */
export const createDriverHook: (driver: CornerstoneComponentDriver, defaultComponentMap?: ComputedRef<ComponentMap>) => {
  driverHook: DriverHook,
  driverComponentMap: ComponentMap | null
}
  = (driver, defaultComponentMap) => {
    const _defaultComponentMap: ComputedRef<ComponentMap> = computed(() => defaultComponentMap?.value || defaultEmptyMap);
    let driverComponentMap: ComponentMap | null = null;
    if (driver != null) {
      driverComponentMap = new ComponentMap();
      const iter = driver.componentMap.entries()
      for (const [key, value] of iter) {
        driverComponentMap.register(key, value);
      }
    }
    const componentsInDriver: ComputedRef<ComponentDict | undefined> = computed(() => {
      const ret:ComponentDict = {}
      if (driver) {
        const iter = driver.componentMap.entries()
        for (const [key, value] of iter) {
          ret[key] = value
        }
      }
      return ret
    });
    const driverHook: DriverHook = {
      /**
       * 获取驱动中的可用组件清单
       */
      useComponents: () => componentsInDriver,
      /**
       * 获取驱动中的组件
       */
      useComponent: (key) => {
        const _key = unref(key);
        if (componentsInDriver.value) {
          return unref((componentsInDriver.value as any)[key] || unref(_defaultComponentMap).get(key) || null);
        } else {
          return null;
        }
      },
      useRegisteredComponents: () => _defaultComponentMap,
      useRegisteredComponent: (key) => unref(_defaultComponentMap).get(key) as Component ?? null,
      use: (key) => unref(driverHook.useComponent(key) || driverHook.useRegisteredComponent(key))
    };
    return {
      driverHook,
      driverComponentMap
    }
  }