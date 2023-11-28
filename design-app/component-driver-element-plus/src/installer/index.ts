import type { App } from 'vue';
import {
  withInstall,
} from '@rchitect-app/component-driver';
import { RockComponent } from '@rchitect-rock/components';
import LocalRegisteredComponents from './components'

export * from './installs'

export const install = (componentName: string | RockComponent, app?: App) => {
  const componentEntry = LocalRegisteredComponents.get(componentName);
  if (componentEntry) {
    app?.use(withInstall(componentEntry.value));
    return componentEntry;
  }
};