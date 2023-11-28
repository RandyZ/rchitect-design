import {
  ComponentDriverBuilder,
  CornerstoneComponentDriver,
  ComponentInstaller,
  toBuilder,
} from '@rchitect-app/component-driver';

import { App } from 'vue-demi';
import { install } from './installer';

export class NavieuiComponentDriver extends CornerstoneComponentDriver {
  constructor(app?: App) {
    super(app);
  }
  static builder(app?: App): ComponentDriverBuilder {
    const bridge = new NavieuiComponentDriver(app);
    const bridgeBuilder = {} as ComponentDriverBuilder;
    const installer = new ComponentInstaller(install, bridgeBuilder, app);
    return toBuilder(installer, bridgeBuilder, bridge);
  }
}
