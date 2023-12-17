/**
 * 导出VueUse的函数
 * @see  {@link http://www.vueusejs.com/functions.html}
 */
export * from '@vueuse/core'

import Sortable from 'sortablejs';
/**
 * 导出SortableJS
 * @see {@link http://www.sortablejs.com/}
 */
export { Sortable };
/**
 * 导出工具
 */
export * from './src';

import { unref } from 'vue-demi';

// TODO: 优化
// dynamic use hook props
export function getDynamicProps<T extends Record<string, unknown>, U>(props: T): Partial<U> {
  const ret: Recordable<any> = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable<any>)[key]);
  });

  return ret as Partial<U>;
}

export function getTreeItemAllChild<T> (treeItem: T): T {
  const newTreeItem:T = { ...treeItem };
  let { children = [], ...arg } = newTreeItem as any;
  const copyChildrens = [...children];
  const result: T[] = [];
  while (copyChildrens.length){
    const item = copyChildrens.shift();
    if((item.children || []).length){
      copyChildrens.push(...item.children)
    }
    item && result.push(item);
  }
  return {
    ...newTreeItem,
    children: result
  };
}

export const debounceAwait = (wait: number, immediate: boolean = false) => {
  let timeout: any = null;
  let debounced: any = function(...args: any[]) {
    return new Promise ((resolve: Function) => {
      //  @ts-ignore
      let context = this;
      if (timeout)  clearTimeout(timeout);
      if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait);
        if (callNow) {
          resolve()
        }
      } else {
        timeout = setTimeout(() => {
          resolve()
        }, wait)
      }
    })
  }
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  };
  return debounced;
}
