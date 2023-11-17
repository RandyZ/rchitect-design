import { ComputedRef } from 'vue'
import { Lib as settingLib } from '@rchitect-rock/settings'
import { Setting } from '@rchitect-rock/settings'
import { diKT } from '@rchitect-rock/ioc'

export type LocaleReturn = {
  getLocale: ComputedRef<string>
  changeLocale: (locale: string) => Promise<string | undefined>
}

export interface ContextOptions {
  useLocale: () => LocaleReturn
  localeList: Array<any>
  useAppStore: () => unknown
  useConfigStore: () => Setting.SettingStore
}

export const context: ContextOptions = {
  useLocale: () => ({} as LocaleReturn),
  useAppStore: () => undefined,
  useConfigStore: () => diKT(settingLib.types.SettingStore),
  localeList: [],
}
