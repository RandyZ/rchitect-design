export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface LocaleConfig {
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}