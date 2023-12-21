import { unref } from 'vue-demi';
import { useAppState } from "#/app-state";

export type DesignInfo = ReturnType<typeof useDesign>

export function useDesign(scope: string) {
  const appState = useAppState()
  // const $style = cssModule ? useCssModule() : {};

  // const style: Record<string, string> = {};
  // if (cssModule) {
  //   Object.keys($style).forEach((key) => {
  //     // const moduleCls = $style[key];
  //     const k = key.replace(new RegExp(`^${values.prefixCls}-?`, 'ig'), '');
  //     style[lowerFirst(k)] = $style[key];
  //   });
  // }
  return {
    // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
    prefixCls: `${unref(appState.clsPrefix)}-${scope}`,
    prefixVar: unref(appState.clsPrefix),
    // style,
  }
}