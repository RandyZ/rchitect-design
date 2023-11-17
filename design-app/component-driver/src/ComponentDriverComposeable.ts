import { ComponentMap } from "@rchitect-rock/components";
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
  = (driver, defaultComponentMap = defaultEmptyMap) => {
  let driverComponentMap: ComponentMap | null = null;
  if (driver != null) {
    driverComponentMap = new ComponentMap();
    const iter = driver.componentMap.entries()
    for (const [key, value] of iter) {
      driverComponentMap.register(key, value);
    }
  }
  const componentsInDriver: ComputedRef<{ key: string, component: Component } | undefined> = computed(() => {
    const ret = {} as { key: string, component: Component }
    if (driver) {
      const iter = driver.componentMap.entries()
      for (const [key, value] of iter) {
        ret[key as string] = value
      }
    }
    return ret
  });
  const driverHook: DriverHook = {
    useComponents: () => componentsInDriver,
    useComponent: (key) => {
      if (componentsInDriver.value) {
        return unref(componentsInDriver.value[key] || defaultComponentMap?.value[key] || null);
      } else {
        return null;
      }
    },
    useRegisteredComponents: () => defaultComponentMap,
    useRegisteredComponent: (key) => driverHook.useRegisteredComponents().value.get(key) || null,
    use: (key) => unref(driverHook.useComponent(key) || driverHook.useRegisteredComponent(key))
  };
  return {
    driverHook,
    driverComponentMap
  }
}