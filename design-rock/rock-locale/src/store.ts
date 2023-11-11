import type { LocaleType } from '@rchitect-design/types'
import { computed } from 'vue'
import { LOCALE_KEY } from '@rchitect-design/constants'
import { useLocalStorage } from '@vueuse/core'
import { localeSetting } from './config'

const store = useLocalStorage(LOCALE_KEY, localeSetting)

export function setLocale(locale: LocaleType) {
  store.value.locale = locale
}

export const getLocale = computed(() => store.value.locale)
