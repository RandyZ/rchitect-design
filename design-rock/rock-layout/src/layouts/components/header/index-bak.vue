<script lang="ts">
export default {
  name: 'LayoutHeader',
}
</script>
<script lang="ts" setup>
import { computed, unref } from 'vue-demi'
import LayoutBreadcrumb from '#/layouts/components/breadcrumb/index.vue'
import LayoutTabs from '#/layouts/components/tabs/index.vue'
import AppSearch from '#/layouts/components/search/AppSearch.vue'
import AppNotify from '#/layouts/components/notify/index.vue'
import AppFullScreen from '#/layouts/components/FullScreen.vue'
import { SettingButton } from '#/layouts/components/setting'
import UserDropdown from '#/layouts/components/user-dropdown/index.vue'
import Logo from '#/layouts/components/logo/index.vue'
import {
  SettingButtonPositionEnum,
  ThemeEnum,
  MenuTypeEnum,
} from '@rchitect-design/constants'
import {
  useAppConfig,
  useAppStatus,
  useHeaderSetting,
  useMultipleTabSetting,
  useRootSetting,
  useMenuSetting
} from '@rchitect-rock/hooks'
import { RockComponent, useComponent } from "@rchitect-rock/components";

const WmqSpace = useComponent(RockComponent.Space, true) as SpaceInstance
const WmqLocalePicker = useComponent(RockComponent.LocalePicker, true) as LocalePickerInstance
const { menu } = useAppConfig()
const {
  getShowBread,
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
  getShowFullHeaderRef,
  getShowHeaderLogo,
} = useHeaderSetting()
const { getDarkMode } = useRootSetting()
const { getSettingButtonPosition, getShowSettingButton } = useRootSetting()
const { getMenuType, getMenuWidth, isMenuTopType, isMenuMixType } = useMenuSetting()
const { isMobile } = useAppStatus().toRefs()
const { getShowMultipleTab } = useMultipleTabSetting()
const isDark = computed(() => unref(getDarkMode) === ThemeEnum.DARK)
const getShowSetting = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false
  }
  const settingButtonPosition = unref(getSettingButtonPosition)

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return unref(getShowHeader)
  }
  return settingButtonPosition === SettingButtonPositionEnum.HEADER
})

const getShowHeaderMultipleTab = computed(() => {
  return (
    unref(getShowMultipleTab) &&
    (unref(getMenuType) !== MenuTypeEnum.MIX || unref(isMobile))
  )
})
// Header的三层组件展示状态
// 顶层组件展示状态
const isLayoutTopShow = computed(() => {
  return getShowFullHeaderRef;
})
// 顶层组件展示状态：Logo是否展示
const isLayoutTopLogoShow = computed(() => {
  return unref(isMenuTopType) || unref(isMenuMixType);
})
const isLayoutMiddleShow = computed(() => {
  return getShowFullHeaderRef;
})
const isLayoutBottomShow = computed(() => {
  return getShowHeaderMultipleTab;
})
</script>
<template>
  <WmqSpace vertical>
    <!-- 第一层区域： -->
    <WmqSpace v-if="isLayoutTopShow" :class="['h-48px', 'shadow', { 'mb-8px': !getShowHeaderMultipleTab }]"
      :style="{ '--un-shadow-color': 'var(--n-border-color)' }" justify="space-between" :align="'center'">
      <!-- 应用Logo区 -->
      <slot name="logo">
        <WmqSpace align="center" :size="0">
          <!-- 应用Logo -->
          <Logo v-if="isLayoutTopLogoShow" :style="{
            width: getMenuWidth + 'px',
            maxWidth: getMenuWidth + 'px',
          }" />
          <!-- 默认面包屑 -->
          <slot name="breadcrumb">
            <LayoutBreadcrumb v-if="!(isMenuTopType || (isMenuMixType && menu.split))" />
          </slot>
        </WmqSpace>
      </slot>
      <!-- 菜单主体组件 -->
      <slot name="menu"></slot>
      <!-- 用户功能区 -->
      <div class="pl-8px pr-8px">
        <slot name="buttons">
          <WmqSpace class="p-1" :size="16" :align="'center'">
            <AppSearch v-if="getShowSearch" />
            <AppNotify :is-dark="isDark" v-if="getShowNotice" />
            <AppFullScreen v-if="getShowFullScreen" />
            <WmqLocalePicker v-if="getShowLocalePicker" :reload="true" :showText="false" />
            <UserDropdown />
            <SettingButton v-if="getShowSetting" />
          </WmqSpace>
        </slot>
      </div>
    </WmqSpace>
    <template v-if="isLayoutMiddleShow">
      <WmqSpace>
        <slot name="menuMiddle"></slot>
      </WmqSpace>
    </template>
    <!-- LayoutBottom isLayoutBottomShow-->
    <template v-if="isLayoutBottomShow">
      <!-- Header 是否需要展示Tabs，比如手机展示，需要由Header来负责展示Tabs -->
      <slot name="tabs">
        <LayoutTabs />
      </slot>
    </template>
  </WmqSpace>
</template>

<style scoped lang="less"></style>
