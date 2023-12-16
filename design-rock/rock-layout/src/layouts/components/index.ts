import { h } from 'vue-demi';
import { RockComponent, useComponent } from '@rchitect-rock/components';

/**
 * 函数式记载Iconify图标
 * @param icon 
 * @returns 
 */
export const renderIcon = (icon: string) => {
  if (!icon) return undefined;
  const RockIconify = useComponent(RockComponent.Iconify);
  if (!RockIconify) {
    throw new Error('RockComponent.Iconify is not provided');
  }
  return () => h(RockIconify, { icon });
};
