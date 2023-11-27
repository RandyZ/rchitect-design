import { useAppSetting, useAppSettingAction } from '#/app-config'
import { ThemeEnum } from '@rchitect-design/constants'
import { useEventListener } from '@vueuse/core'
import isUndefined from 'lodash-es/isUndefined'
import { computed, unref } from 'vue-demi'

export function createMediaPrefersColorSchemeListen() {
  const settingActions = useAppSettingAction()
  // 监听系统主题
  useEventListener(
    window.matchMedia('(prefers-color-scheme: dark)'),
    'change',
    (e: Event & { matches: boolean }) => {
      settingActions.setThemeMode(e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT)
    },
  )
}

export const useAppTheme = () => {
  const { themeMode } = useAppSetting()
  const isDark = computed(() => {
    return unref(themeMode) === ThemeEnum.DARK
  })

  const appSettingAction = useAppSettingAction()
  const toggleTheme = (v: boolean | undefined) => {
    if (isUndefined(v)) {
      appSettingAction.toggleTheme();
    } else {
      appSettingAction.setThemeMode(v ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    }
  }
  return { isDark, theme: themeMode, toggleTheme }
}
