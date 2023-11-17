import { getCurrentInstance, isVue3, type Slots } from "vue-demi";
import { isFunction } from 'lodash-es';

/**
 * 判断当前调用是否在setup过程中
 * @description: 使用 getCurrentInstance 函数来获取当前 Vue 实例的实例对象。如果在 Setup 阶段调用，则会返回一个非空实例对象，从而使 isInSetup 为 true。函数只支持在Vue3中调用，vue2默认返回false
 * @returns {boolean}
 */
export const isSetup = () => {
  if (isVue3) {
    return !!getCurrentInstance();
  } else {
    return false
  }
}

// TODO: 文件类型tsx还是ts
/**
 * @description:  Get slot to prevent empty error
 */
export const getSlot = (slots: Slots, slot = 'default', data?: any) => {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
}

/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export const extendSlots = (slots: Slots, excludeKeys: string[] = []) => {
  const slotKeys = Object.keys(slots);
  const ret: any = {};
  slotKeys.map((key) => {
    if (excludeKeys.includes(key)) {
      return null;
    }
    ret[key] = (data?: any) => getSlot(slots, key, data);
  });
  return ret;
}