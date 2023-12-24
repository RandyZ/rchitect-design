import * as pack from './package.json';
import { ServiceIdentifier } from "@rchitect-rock/ioc";
import { ComponentDriverBuilder, CornerstoneComponentDriver } from "#/bridge";

export type BuilderHook = <T extends CornerstoneComponentDriver>(builder:ComponentDriverBuilder) => T;

export default {
  BuilderHookParam: Symbol.for(`${ pack.name }/BuilderHook`) as ServiceIdentifier<BuilderHook>,
}