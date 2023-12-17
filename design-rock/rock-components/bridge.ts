import { ComputedRef } from 'vue-demi'
import { AppSetting, Beans as settingBeans } from '@rchitect-rock/settings'
import { diKT } from '@rchitect-rock/ioc'

export type LocaleReturn = {
  getLocale: ComputedRef<string>
  changeLocale: (locale: string) => Promise<string | undefined>
}

export interface ContextOptions {
  useLocale: () => LocaleReturn
  localeList: Array<any>
  useAppSetting: () => AppSetting.State
}

export default {
  useLocale: () => ({} as LocaleReturn),
  useAppSetting: () => diKT(settingBeans.AppSettingState),
  localeList: [],
} as ContextOptions
