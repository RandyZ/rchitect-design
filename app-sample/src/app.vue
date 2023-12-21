<script lang="ts" setup>
import { useLocale } from '@rchitect-rock/locale'
import { useAppTheme, useRoutesTable, useWebTitle } from '@rchitect-rock/hooks'

import { Route } from '@rchitect-design/constants'
import { getGlobalConfig, computedAsync } from '@rchitect-rock/tools'
import AppProvider from '@/providers/AppProvider'
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
// import * as tt from '@weiming-cornerstone/apps-identity'
import { unref, watch } from 'vue'

// Listening to page changes and dynamically changing site titles
const { title } = getGlobalConfig(import.meta.env)
useWebTitle(title, (route) => route.name !== Route.REDIRECT_NAME)

// Watch for change web theme
const { isDark } = useAppTheme()
watch(
  () => unref(isDark),
  (v) => {
    document.getElementsByTagName('html')[0].className = v ? 'dark' : ''
  },
  { immediate: true },
)

const themeOverrides = {
  common: {
    primaryColor: '#409eff',
    primaryColorHover: "#409eff",
    primaryColorPressed: "#409eff"
  },
  // Button: {
  //   textColor: '#409eff',
  //   colorHover: '#c6e2ff'
  // },
  // Select: {
  //   peers: {
  //     InternalSelection: {
  //       textColor: '#409eff'
  //     }
  //   }
  // }
}

// Support Multi-language
const { getLocale: localeFlag } = useLocale()
// Dynamic switch component library language
const dateLocale = computedAsync(async () => {
  const message = {
    zh_CN: () => {
      return dateZhCN
    },
    en_US: () => {
      return dateEnUS
    },
  }
  const mod = await message[localeFlag.value]()

  return mod?.default ?? mod
})
// Dynamic switch component library language
const locale = computedAsync(async () => {
  const message = {
    zh_CN: () => {
      import('dayjs/locale/zh-cn')
      return zhCN
    },
    en_US: () => {
      import('dayjs/locale/en')
      return enUS
    },
  }
  const mod = await message[localeFlag.value]()

  return mod?.default ?? mod
})
</script>

<template>
  <WmqConfig :theme-overrides="themeOverrides" :locale="locale" :date-locale="dateLocale">
    <WmqNotificationProvider>
      <WmqMessageProvider>
        <WmqDialogProvider>
          <AppProvider >
            <router-view />
          </AppProvider>
        </WmqDialogProvider>
      </WmqMessageProvider>
    </WmqNotificationProvider>
  </WmqConfig>
</template>
