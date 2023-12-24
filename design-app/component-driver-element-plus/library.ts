import { type ComponentDriverLibrary, toPackage, AppParams } from '@rchitect-app/component-driver';
import * as pack from './package.json';
import { Beans as componentBeans } from '@rchitect-rock/components';
import { EPComponentDriver } from "#/bridge";

export const Lib:ComponentDriverLibrary = toPackage({
  name: pack.name,
  version: pack.version,
  beforeSetup: async (app, appContext) => {
    const driverBuilder = EPComponentDriver.builder()
    const hook = appContext.getParamWith(AppParams.BuilderHookParam);
    let driver;
    if (hook) {
      driver = hook(driverBuilder);
    } else {
      driver = driverBuilder.enableAll();
    }
    appContext.registerParam(componentBeans.ComponentDictionary, driver.componentDictoray());
  },
});
