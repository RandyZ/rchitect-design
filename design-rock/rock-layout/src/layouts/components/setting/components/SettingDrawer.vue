<script lang="ts" setup>
import DarkModeToggle from './DarkModeToggle.vue'
import NavigationBarPicker from './NavigationBarPicker.vue'
import ThemeColorPicker from './ThemeColorPicker.vue'
import ThemeColorsPicker from './ThemeColorsPicker.vue'
import Features from './Features.vue'
import Content from './Content.vue'
import Transitions from './Transitions.vue'
import FooterButtons from './FooterButtons.vue'
import { baseHandler } from '../handler'
import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  HEADER_PRESET_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  HandlerSettingEnum,
} from '@rchitect-design/constants'
import { navigationBarTypeList } from '../constant'
import { useI18n } from '@rchitect-rock/locale'
import { useMenuSetting, useRootSetting, themeSettingHooks } from '@rchitect-rock/hooks'

const { t } = useI18n()
const { getShowDarkModeToggle } = useRootSetting()
const { getIsHorizontal, getMenuType } = useMenuSetting()

const themeHooks = themeSettingHooks();

const onThemeColorHandle = (value: string, event: string) => {
  if(themeHooks[event]){
    themeHooks[event](value);
  }
};

defineProps({
  visible: { type: Boolean, default: false },
})
const emit = defineEmits(['update:visible'])
const onVisible = (show: boolean) => {
  emit('update:visible', show)
}
</script>

<template>
  <WmqDrawer :show="visible" @update:show="onVisible" :width="330">
    <WmqDrawerContent closable>
      <template #header>{{ t('layout.setting.drawerTitle') }}</template>
      <template v-if="getShowDarkModeToggle">
        <WmqDivider title-placement="left">{{
          t('layout.setting.darkMode')
        }}</WmqDivider>
        <DarkModeToggle :def="themeHooks.getDark"
                        @handle="onThemeColorHandle($event, 'setDark')"/>
      </template>
      <WmqDivider title-placement="left">{{
        t('layout.setting.navMode')
      }}</WmqDivider>
      <NavigationBarPicker :def="getMenuType" :type-list="navigationBarTypeList" @handler="(item) => {
          baseHandler(HandlerSettingEnum.CHANGE_LAYOUT, {
            mode: item.mode,
            type: item.type,
            split: getIsHorizontal ? false : undefined,
          })
        }
        " />
      <WmqDivider title-placement="left">{{
        t('layout.setting.sysTheme')
      }}</WmqDivider>
      <ThemeColorPicker :def="themeHooks.getMainColor"
                        :color-list="APP_PRESET_COLOR_LIST"
                        @handle="onThemeColorHandle($event, 'setMainColor')"/>
      <WmqDivider title-placement="left">{{
        t('layout.setting.headerTheme')
      }}</WmqDivider>
      <ThemeColorsPicker :colors-list="[HEADER_PRESET_BG_COLOR_LIST, HEADER_PRESET_COLOR_LIST]"
                          :color-names="['bgColor', 'color']"
                          :defs="[themeHooks.getHeaderBgColor, themeHooks.getHeaderColor]"
                          @handle="(value: string, index) => {
                            onThemeColorHandle(value, ['setHeaderBgColor','setHeaderColor'][index]);
                          }"/>
      <WmqDivider title-placement="left">{{
        t('layout.setting.sidebarTheme')
      }}</WmqDivider>
      <ThemeColorPicker :def="themeHooks.getMenuColor"
                        :color-list="SIDE_BAR_BG_COLOR_LIST"
                        @handle="onThemeColorHandle($event, 'setMenuColor')"/>
      <WmqDivider title-placement="left">{{ t('layout.setting.interfaceFunction') }}
      </WmqDivider>
      <Features />
      <WmqDivider title-placement="left">{{
        t('layout.setting.interfaceDisplay')
      }}</WmqDivider>
      <Content />
      <WmqDivider title-placement="left">{{
        t('layout.setting.animation')
      }}</WmqDivider>
      <Transitions />
      <WmqDivider />
      <FooterButtons />
    </WmqDrawerContent>
  </WmqDrawer>
</template>
