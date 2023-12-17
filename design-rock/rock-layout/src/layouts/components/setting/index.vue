<script lang="ts" setup>
import { ref } from 'vue'
import DarkModeToggle from './components/DarkModeToggle.vue'
import NavigationBarPicker from './components/NavigationBarPicker.vue'
import ThemeColorPicker from './components/ThemeColorPicker.vue'
import Features from './components/Features.vue'
import Content from './components/Content.vue'
import Transitions from './components/Transitions.vue'
import FooterButtons from './components/FooterButtons.vue'
import { baseHandler } from './handler'
import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  HandlerSettingEnum
} from '@rchitect-design/constants'
import { navigationBarTypeList } from './constant'
import { useI18n } from '@rchitect-rock/locale'
import { useHeaderSetting, useMenuSetting, useRootSetting } from '@rchitect-rock/hooks'

const { t } = useI18n();
const settingDrawerShow = ref(false)

const {
  getShowDarkModeToggle,
  getThemeColor,
  getSettingButtonPosition
} = useRootSetting();
const { getIsHorizontal, getMenuType, getMenuBgColor } = useMenuSetting();
const { getHeaderBgColor } = useHeaderSetting();

</script>

<template>
  <div class="flex items-center">
    <WmqIconify icon="ion:settings-outline" hoverPointer @click="settingDrawerShow = true" />
    <VbenAffix v-if="getSettingButtonPosition"
      class="z-999 p-10px flex-center text-white border-rd-l bg-[#0960bd] right-0 top-1/2" listen-to="body">
      <WmqIconify icon="ion:settings-outline" hoverPointer @click="settingDrawerShow = true" />
    </VbenAffix>
    <WmqDrawer v-model:show="settingDrawerShow" :width="330">
      <WmqDrawerContent closable>
        <template #header>{{ t('layout.setting.drawerTitle') }}</template>
        <template v-if="getShowDarkModeToggle">
          <WmqDivider title-placement="left">{{ t('layout.setting.darkMode') }}</WmqDivider>
          <DarkModeToggle />
        </template>
        <WmqDivider title-placement="left">{{ t('layout.setting.navMode') }}</WmqDivider>
        <NavigationBarPicker :def="getMenuType" :type-list="navigationBarTypeList" @handler="(item) => {
          baseHandler(HandlerSettingEnum.CHANGE_LAYOUT, {
            mode: item.mode,
            type: item.type,
            split: getIsHorizontal ? false : undefined,
          })
        }" />
        <WmqDivider title-placement="left">{{ t('layout.setting.sysTheme') }}</WmqDivider>
        <ThemeColorPicker :def="getThemeColor" :event="HandlerSettingEnum.CHANGE_THEME_COLOR"
          :color-list="APP_PRESET_COLOR_LIST" />
        <WmqDivider title-placement="left">{{ t('layout.setting.headerTheme') }}</WmqDivider>
        <ThemeColorPicker :def="getHeaderBgColor" :event="HandlerSettingEnum.HEADER_THEME"
          :color-list="HEADER_PRESET_BG_COLOR_LIST" />
        <WmqDivider title-placement="left">{{ t('layout.setting.sidebarTheme') }}</WmqDivider>
        <ThemeColorPicker :def="getMenuBgColor" :event="HandlerSettingEnum.MENU_THEME"
          :color-list="SIDE_BAR_BG_COLOR_LIST" />
        <WmqDivider title-placement="left">{{ t('layout.setting.interfaceFunction') }}
        </WmqDivider>
        <Features />
        <WmqDivider title-placement="left">{{ t('layout.setting.interfaceDisplay') }}</WmqDivider>
        <Content />
        <WmqDivider title-placement="left">{{ t('layout.setting.animation') }}</WmqDivider>
        <Transitions />
        <WmqDivider />
        <FooterButtons />
      </WmqDrawerContent>
    </WmqDrawer>
  </div>
</template>
