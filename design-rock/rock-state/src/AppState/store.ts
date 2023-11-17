import { Setting } from '@rchitect-rock/settings'
import { Store } from "pinia";

export type SettingStore = Store<
  string,
  Setting.SettingState,
  Setting.SettingGetter,
  Setting.SettingAction
>;

export 