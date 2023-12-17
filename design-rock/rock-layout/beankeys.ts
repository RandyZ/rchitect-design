import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from './package.json';
import type { User } from "./src/state";
import type { MultipleTab, MultipleTabOperator } from "./src/layouts/types";

export default {
  UserState: Symbol.for(`${pack.name}/User.State`) as ServiceIdentifier<User.State>,
  UserAction: Symbol.for(`${pack.name}/User.Action`) as ServiceIdentifier<User.Action>,
  UserGetter: Symbol.for(`${pack.name}/User.Getter`) as ServiceIdentifier<User.Getter>,
  MultipleTabStore: Symbol.for(`${pack.name}/MultipleTabStore`) as ServiceIdentifier<MultipleTab.MultipleTabStore>,
  MultipleTabOperator: Symbol.for(`${pack.name}/MultipleTabOperator`) as ServiceIdentifier<MultipleTabOperator>,
};