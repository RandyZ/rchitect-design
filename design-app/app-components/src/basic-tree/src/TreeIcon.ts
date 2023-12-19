import type { VNode, FunctionalComponent } from 'vue';
import { h } from 'vue';
import { isString } from 'lodash-es';
import { WmqIconify } from '@weiming-rock/components';

export const TreeIcon: FunctionalComponent = ({ icon }: { icon: VNode | string }) => {
  if (!icon) return null;
  if (isString(icon)) {
    return h(WmqIconify, { icon, class: 'mr-1' });
  }
  return WmqIconify;
};
