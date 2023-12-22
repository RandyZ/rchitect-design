import * as multipleTabGuards from './layouts/components/tabs/models/MultipleTabGuard';

export const GUARDS = {
  ...multipleTabGuards,
};

export type { User, AppLock } from './state';

export { useUserState, useUserAction, useUserGetter } from './hooks'