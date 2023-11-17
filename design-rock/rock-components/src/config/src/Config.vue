<script lang="ts" setup name="WmqConfig">
import { computed, unref, ref } from 'vue-demi'
import { useAppTheme } from '@rchitect-rock/hooks'
import { ThemeEnum } from '@rchitect-design/constants'
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })


defineOptions({
  name: RockComponent.Config,
  customOptions: {
    isPresetComponent: true,
  },
})  

const Config = useDriverComponent(RockComponent.Config)
const darkTheme = useDriverComponent('DarkTheme')
const props = defineProps({
  // Customize the configuration theme mode
  themeMode: {
    type: String,
    default: 'dark'
  },
  // Whether to inherit the theme
  inherit: {
    type: Boolean,
    default: true
  }
})
const { isDark } = useAppTheme()

const appTheme = computed(() => {
  if (!props.inherit) {
    return props.themeMode === ThemeEnum.DARK ? darkTheme : null
  }
  return unref(isDark) ? darkTheme : null
})
</script>
<template>
  <Config v-bind="$attrs" abstract :theme="appTheme" :ref="DriverRefKey">
    <slot></slot>
  </Config>
</template>