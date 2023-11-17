import {
  ComponentDriverBuilder,
  CornerstoneComponentDriver,
  ComponentInstaller,
  toBuilder,
} from '@rchitect-cornerstone/component-driver';

import { App } from 'vue';
import { install } from './installer';

export class EPComponentDriver extends CornerstoneComponentDriver {
  constructor(app?: App) {
    super(app);
  }
  /**
   * @override
   */
  installNew(component, app?: App) {
    return install(component, app);
  }

  static builder(app?: App): ComponentDriverBuilder {
    const bridgeBuilder = {} as ComponentDriverBuilder;
    const bridge = new EPComponentDriver(app);
    const installer = new ComponentInstaller(install, bridgeBuilder, app);
    return toBuilder(installer, bridgeBuilder, bridge);
  }
}

