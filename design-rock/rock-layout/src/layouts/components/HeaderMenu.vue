<template>
  <WmqSpace vertical>
    <WmqSpace
        v-if="getShowFullHeaderRef"
        :class="['h-48px', 'shadow', { 'mb-8px': !getShowHeaderMultipleTab }]"
        :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
        justify="space-between"
        :align="'center'"
    >
    </WmqSpace>
    <!-- Header 是否需要展示Tabs，比如手机展示，需要由Header来负责展示Tabs -->
    <template v-if="getShowHeaderMultipleTab">
      <slot name="tabs">
        <LayoutTabs/>
      </slot>
    </template>
  </WmqSpace>
</template>

<script lang="ts" setup>
import {computed, unref} from 'vue';
import {MenuTypeEnum} from '@rchitect-design/constants';
import {useMenuSetting, useMultipleTabSetting, useHeaderSetting, useAppStatus} from '@rchitect-rock/hooks';
import LayoutTabs from '#/layouts/components/tabs/index.vue'
import {useComponent, RockComponent} from '@rchitect-rock/components';
const WmqSpace = useComponent(RockComponent.Space, true);
const {getShowMultipleTab} = useMultipleTabSetting()
const {getMenuType, getMenuWidth, getIsTopMenu} = useMenuSetting()
const {isMobile} = useAppStatus().toRefs()
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
/**
 * 是否在Header中展示Tabs
 */
const getShowHeaderMultipleTab = computed(() => {
  return (
      // 是否展示Tabs
      unref(getShowMultipleTab) &&
      (
          // 1. 混合布局展示Tabs
          unref(getMenuType) !== MenuTypeEnum.MIX
          // 2. 手机端展示Tabs
          || unref(isMobile)
      )
  )
})
</script>
