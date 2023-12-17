<script lang="ts" setup>
import { MenuTypeEnum } from '@rchitect-design/constants'
import type { Component } from 'vue-demi'
import { computed, unref } from 'vue-demi'
import LeftMenuLayout from './layout-left-menu.vue'
// import TopMenuLayout from './layout-top-menu.vue'
// import MenuSplitLevelLayout from './layout-menu-split-level.vue'
// import TopMenuMixLayout from './top-menu-mixed.vue'
// import MixSidebar from './mix-sidebar.vue'
import Mobile from './mobile-menu.vue'
// import { useAppState, useMenuSetting } from '@rchitect-rock/hooks'
// import { resolveContextOptions } from '#/../bridge'
import { Beans as stateBeans } from '@rchitect-rock/state'
import { diKT } from '@rchitect-rock/ioc'
import { useLockScreen } from "#/layouts/useLockScreen";

const appState = diKT(stateBeans.AppState)
// const { useLockScreen } = resolveContextOptions();

// Create a lock screen monitor
const lockEvents = useLockScreen();
// 处理布局类型
const { getMenuType } = useMenuSetting()
const layout = computed<Component>(() => {
  if (unref(appState.isMobile)) return Mobile
  switch (getMenuType.value) {
    case MenuTypeEnum.SIDEBAR:
      return LeftMenuLayout
      // case MenuTypeEnum.MIX:
      //   return TopMenuMixLayout
      // case MenuTypeEnum.TOP_MENU:
      //   return TopMenuLayout
      // case MenuTypeEnum.MIX_SIDEBAR:
      //   return MixSidebar
      // case MenuTypeEnum.SIDER_WITH_TOP_RECOMMEND:
      //   return MenuSplitLevelLayout
    default:
      throw new Error('The layout type is not defined! Check whether the ProjectSetting is init to store?')
  }
})
</script>
<template>
  <component :is="layout" v-bind="lockEvents">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </component>
</template>
