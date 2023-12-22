import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import * as pack from './package.json';
import type { User, AppLock } from "./src/state";
import type { MultipleTab, MultipleTabOperator } from "./src/layouts/types";
import type { SearchContext } from "./src/layouts/components/search/SearchContext";

export default {
  MultipleTabActions: Symbol.for(`${ pack.name }/MultipleTab.Actions`) as ServiceIdentifier<MultipleTab.Actions>,
  MultipleTabGetters: Symbol.for(`${ pack.name }/MultipleTab.Actions`) as ServiceIdentifier<MultipleTab.Actions>,
  MultipleTabOperator: Symbol.for(`${ pack.name }/MultipleTabOperator`) as ServiceIdentifier<MultipleTabOperator>,
  MultipleTabState: Symbol.for(`${ pack.name }/MultipleTab.State`) as ServiceIdentifier<MultipleTab.State>,
  SearchContext: Symbol.for(`${ pack.name }/SearchContext`) as ServiceIdentifier<SearchContext>,
  // User
  UserAction: Symbol.for(`${ pack.name }/User.Action`) as ServiceIdentifier<User.Action>,
  UserGetter: Symbol.for(`${ pack.name }/User.Getter`) as ServiceIdentifier<User.Getter>,
  UserState: Symbol.for(`${ pack.name }/User.State`) as ServiceIdentifier<User.State>,
  // App Lock
  AppLockState: Symbol.for(`${ pack.name }/AppLock.State`) as ServiceIdentifier<AppLock.State>,
  AppLockActions: Symbol.for(`${ pack.name }/AppLock.Actions`) as ServiceIdentifier<AppLock.Actions>,
};