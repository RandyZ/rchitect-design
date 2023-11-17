import { App, Component } from 'vue';
import { RockComponent } from '@rchitect-rock/components';
import {
  ComponentEntry,
  RockComponentDetailDict,
} from './installer';

export abstract class CornerstoneComponentDriver {
  app?: App;
  componentMap: Map<RockComponent, Component>;
  protected constructor(app?: App) {
    this.app = app;
    this.componentMap = new Map<RockComponent, Component>();
  }

  getApp(): App | undefined {
    return this.app;
  }

  getComponent(name: RockComponent): Component | undefined {
    return this.componentMap.get(name);
  }

  loadComponent(name: RockComponent): Component | undefined {
    const registeredComponent = this.componentMap.get(name);
    if (registeredComponent) {
      return registeredComponent;
    } else {
      const componentEntry = this.installNew(name, this.app);
      if (componentEntry) {
        this.registerComponent(componentEntry);
        return componentEntry.value;
      }
    }
  }

  componentDictoray(): RockComponentDetailDict {
    const dict: RockComponentDetailDict = {};
    this.componentMap.forEach((value, key) => {
      dict[key] = value;
    });
    return dict;
  }

  /**
   * 注册组件
   * @param entry 组件属性元组
   * @returns {CornerstoneComponentDriver}
   */
  registerComponent(entry: ComponentEntry): CornerstoneComponentDriver {
    this.componentMap.set(entry.key, entry.value);
    return this;
  }
  /**
   * 安装新组件
   * 
   * @description 注意，这个方法需要按照Driver的实际实现情况进行重写，否则无效
   * @param component 
   * @param app 
   * @returns 
   */
  installNew(component: RockComponent, app?: App): ComponentEntry | undefined {
    return undefined;
  }
}

/**
 * Builder定义
 */
export class ComponentInstaller {
  constructor(
    installer: (rockComponent: RockComponent, app?: App) => ComponentEntry | undefined,
    builder: ComponentDriverBuilder,
    app?: App
  ) {
    for (const name in RockComponent) {
      const componentEnum = RockComponent[name];
      this[`enable${componentEnum}`] = () => {
        const entry = installer(componentEnum, app);
        if (entry) {
          builder.componentBridge().registerComponent(entry)
        }
        return builder;
      };
    }
  }
  [key: string]: (app?: App) => ComponentDriverBuilder;
}

export interface BuilderTail {
  componentBridge(): CornerstoneComponentDriver;

  enableAll(): CornerstoneComponentDriver;

  finish(): CornerstoneComponentDriver;
}

export type ComponentDriverBuilder = ComponentInstaller & BuilderTail;

export const toBuilder = (
  installer: ComponentInstaller,
  driverBuilder: ComponentDriverBuilder,
  driver: CornerstoneComponentDriver
) => {
  Object.assign(driverBuilder, installer);
  driverBuilder.componentBridge = () => driver;
  driverBuilder.enableAll = () => {
    for (const name in RockComponent) {
      installer[`enable${RockComponent[name]}`]();
    }
    return driverBuilder.finish();
  };
  driverBuilder.finish = () => driver;
  return driverBuilder;
};

