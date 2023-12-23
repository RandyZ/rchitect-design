import * as multipleTabGuards from './layouts/components/tabs/models/MultipleTabGuard';

export { DarkModeToggle } from '#/layouts/components/setting';

export const GUARDS = {
  ...multipleTabGuards,
};

export type { User, AppLock } from './state';

export { useUserState, useUserAction, useUserGetter } from './hooks'