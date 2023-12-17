import { isClient } from '@vueuse/core'

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    // @ts-ignore
    const listeners = entry.target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn) => {
        fn()
      })
    }
  }
}

export const addResizeListener = (
  element: any,
  fn: (...args: unknown[]) => unknown,
) => {
  if (!isClient || !element) return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

export const removeResizeListener = (
  element: any,
  fn: (...args: unknown[]) => unknown,
) => {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__?.disconnect()
  }
}

export function triggerWindowResize() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, true);
  (event as any).eventType = 'message';
  window.dispatchEvent(event);
}


export class ResizeBus {

  private static instance: Map<any, any> = new Map();
  private nodes = new Map();
  private elementObserves = new Map();

  constructor(name = "__resize__") {
    if (ResizeBus.instance.get(name) === undefined) {
      ResizeBus.instance.set(name, this);
    }
    return ResizeBus.instance.get(name);
  }


  public on (element, fn){
    const { nodes } = this;
    let listeners = nodes.get(element) || [];
    listeners.push(fn);
    nodes.set(element, listeners);
  }

  public resizeEmit (element, name) {
    const that = this;
    const { elementObserves } = this;
    if(!elementObserves.has(element)){
      const observeInstance = new ResizeObserver(() => {
        that.emit(name)
      });
      observeInstance.observe(element);
      elementObserves.set(element, observeInstance);
    }
  }

  public emit (element: Element){
    const { nodes } = this;
    if(nodes.has(element)){
      let listeners = nodes.get(element) || [];
      for(const fn of listeners){
        fn();
      }
    }
  }

  public clearAll (element) {
    const { nodes, elementObserves} = this;
    if(nodes.has(element)){
      nodes.delete(element)
    }
    if(elementObserves.has(element)){
      elementObserves.delete(element)
    }
  }

}
