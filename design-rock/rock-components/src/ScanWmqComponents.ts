import { DataDictionary } from "@rchitect-design/types";
import forIn from "lodash-es/forIn";
import isEmpty from "lodash-es/isEmpty";
import get from "lodash-es/get";
/**
 * 扫描WmqCompoents中声明组件
 * 
 * @param presetComponents 预设组件
 * @param wmqComponent 所有组件
 * @returns DataDictionary<WmqComponent>[] 0: presetComponents, 1: wmqComponent
 */
const scanWmqComponents = (
  presetComponents: DataDictionary<WmqComponent<any> > = {},
  wmqComponent: DataDictionary<WmqComponent<any> > = {}
): DataDictionary<WmqComponent<any> >[] => {
  const pkgs: Record<string, GlobModule> = import.meta.glob('./**/index.ts', { eager: true });
  forIn(pkgs, (pkg) => {
    if (!isEmpty(pkg)) {
      forIn(pkg, (component) => {
        if (get(component, 'isPresetComponent', false)) {
          presetComponents[component.name] = component;
        }
        wmqComponent[component.name] = component;
      })
    }
  })
  return [presetComponents, wmqComponent]
}

export const allPredefinedComponents = () => {
  const autoExportComponent: DataDictionary<WmqComponent<any> > = {};
  const pkgs: Record<string, GlobModule> = import.meta.glob('./**/index.ts', { eager: true });
  forIn(pkgs, (pkg) => {
    if (!isEmpty(pkg)) {
      forIn(pkg, (component) => {
        if (get(component, 'isPresetComponent', false)) {
          autoExportComponent[component.name] = component;
        }
      })
    }
  })
  return autoExportComponent;
}

export default scanWmqComponents
