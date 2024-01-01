<script lang="ts" setup>
import { computed, unref, watch } from 'vue-demi'

import { RockComponent, useComponent } from "@rchitect-rock/components";
import HeaderRecommendMenu from "./RecommendMenu/index.vue";
import AppNotify from "#/layouts/components/notify/index.vue";
import LayoutBreadcrumb from "#/layouts/components/breadcrumb/index.vue";
import UserDropdown from "#/layouts/components/user-dropdown/index.vue";
import AppFullScreen from "#/layouts/components/FullScreen.vue";
import Logo from "#/layouts/components/logo/index.vue";
import AppSearch from "#/layouts/components/search/AppSearch.vue";
import HeaderHistory from "../history/index.vue";
import { SettingButton } from "#/layouts/components/setting/index";
import LayoutTabs from "#/layouts/components/tabs/index.vue";
// import { useAppConfig, useHeaderSetting, useMenuSetting } from "@rchitect-rock/hooks";
import { useAppRunTimeConfigOptions, useHeaderSettingManager, useMenuSettingManager } from "#/hooks";

defineOptions({
  name: "LayoutHeaderComponent",
})

const WmqSpace = useComponent(RockComponent.Space, true)
const WmqLocalePicker = useComponent(RockComponent.LocalePicker, true)
const {
  getShowSidebar,
  getMenuType,
  getMenuWidth,
  isMenuTopType,
  isMenuMixType,
  isMenuMixSidebarType,
  getMenuHidden
} = useMenuSettingManager()
const { menu } = useAppRunTimeConfigOptions()
const {
  getShowBread,
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
  getShowFullHeaderRef,
  getShowHeaderLogo,
  getHeaderBgColor,
  getHeaderColor
} = useHeaderSettingManager()

const emit = defineEmits(["selectMenu"]);

const isLayoutTopShow = computed(() => {
  return getShowSidebar.value;
})
const isLayoutBreadcrumbShow = computed(() => {
  // return !(isMenuTopType || (isMenuMixType && menu.split));
  return false
})
const isLayoutTopLogoShow = computed(() => {
  return true;
  // return unref(isMenuTopType) || unref(isMenuMixType);
})
const isLayoutMiddleShow = computed(() => {
  return unref(isMenuMixType) || unref(isMenuMixSidebarType);
})
const getShowHeaderMultipleTab = computed(() => {
  return true
  // return (
  //     unref(getShowMultipleTab) &&
  //     (unref(getMenuType) !== MenuTypeEnum.MIX || unref(isMobile))
  // )
})
const getShowSetting = computed(() => {
  return false
  // if (!unref(getShowSettingButton)) {
  //   return false
  // }
  // const settingButtonPosition = unref(getSettingButtonPosition)
  //
  // if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
  //   return unref(getShowHeader)
  // }
  // return settingButtonPosition === SettingButtonPositionEnum.HEADER
})
const isDark = computed(() => {
  return false;
  // return unref(getDarkMode) === ThemeEnum.DARK
})
const isLayoutBottomShow = computed(() => false);

const onLayoutTabSelectMenu = (event) => {
  emit('selectMenu', event)
};

const firstLayerHeaderStyleVars = computed(() => {
  const bgColor = unref(getHeaderBgColor)
  const color = unref(getHeaderColor)
  // TODO 根据isDark来判断颜色
  return {
    '--header-height': '48px',
    '--header-bg-color': bgColor,
    '--header-main-color': color ? color : 'var(--n-border-color)',
    '--un-shadow-color': 'var(--header-main-color)',
    '--notify-icon-color': 'var(--header-main-color)',
  }
})

</script>
<template>
  <WmqSpace
      vertical
      :size="1"
      :style="firstLayerHeaderStyleVars"
      class="bg-[var(--header-bg-color)] c-[var(--header-main-color)]"
  >
    <!-- 第一层区域：应用Logo和用户信息区，中间空余区域插槽topCenter -->
    <WmqSpace
        v-if="isLayoutTopShow"
        :class="['h-[var(--header-height)]', { 'mb-8px': !getShowHeaderMultipleTab }]"
        style="box-shadow: 0px 0px 0px 0.5px var(--header-main-color);"
        justify="space-between"
        :align="'center'"
    >
      <!-- 应用Logo区 -->
      <slot name="logo">
        <WmqSpace :align="'center'" :size="0">
          <!-- 应用Logo -->
          <Logo v-if="isLayoutTopLogoShow" :style="{
            width: getMenuWidth + 'px',
            maxWidth: getMenuWidth + 'px',
          }" />
          <!-- 默认面包屑 -->
          <slot name="logoExtra">
            <LayoutBreadcrumb v-if="isLayoutBreadcrumbShow" />
          </slot>
        </WmqSpace>
      </slot>
      <!-- 首行中央区域 -->
      <slot name="topCenter"></slot>
      <!-- 用户功能区 -->
      <div class="pl-8px pr-8px">
        <slot name="buttons">
          <WmqSpace class="p-1" :size="16" :align="'center'">
            <AppSearch v-if="getShowSearch" />
            <AppNotify :color="[]" v-if="getShowNotice" />
            <AppFullScreen v-if="getShowFullScreen" />
            <WmqLocalePicker v-if="getShowLocalePicker" :reload="true" :showText="false" />
            <UserDropdown />
            <SettingButton v-if="getShowSetting" />
          </WmqSpace>
        </slot>
      </div>
    </WmqSpace>
    <!-- 第二层区域：默认放功能快捷触达 -->
    <div v-if="isLayoutMiddleShow">
      <slot name="menuMiddle">
        <div class="flex flex-nowrap h-[40px] border-b-[1px] border-b-solid border-slate-100">
          <div>
            <HeaderHistory @selectMenu="onLayoutTabSelectMenu"/>
          </div>
          <WmqDivider vertical flex-self-center m-0 />
          <WmqScrollbar x-scrollable :horizontalRailStyle="{display: 'none'}">
            <HeaderRecommendMenu @selectMenu="onLayoutTabSelectMenu"/>
          </WmqScrollbar>
        </div>
      </slot>
    </div>
    <!-- LayoutBottom  -->
    <template v-if="isLayoutBottomShow">
      <!-- Header 是否需要展示Tabs，比如手机展示，需要由Header来负责展示Tabs -->
      <slot name="tabs">
        <LayoutTabs />
      </slot>
    </template>
  </WmqSpace>
</template>
<style scoped lang="less">
:deep(.n-scrollbar-content) {
  height: 100%;
}
</style>
