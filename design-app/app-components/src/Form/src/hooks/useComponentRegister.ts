import type { ComponentType } from '../types/index';
import { tryOnUnmounted } from '@rchitect-rock/tools';
import { add, del } from '../componentMap';
import type { Component } from 'vue';

export function useComponentRegister(compName: ComponentType, comp: Component) {
  add(compName, comp);
  tryOnUnmounted(() => {
    del(compName);
  });
}
