<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from '@rchitect-rock/locale'
import { WmqIconify } from '@rchitect-rock/components'
import { TabActionEnum } from '@rchitect-design/constants'
import { RouteLocationNormalized, Lib as routeLib } from "@rchitect-rock/router"
import { renderIcon } from "#/layouts/components";
import TYPES from '#/../beankeys'
import { diKT } from '@rchitect-rock/ioc'
import { object } from 'vue-types'

const { t } = useI18n();
const props = defineProps({
  tabItem: object<RouteLocationNormalized>()
})

const tabStore = diKT(TYPES.MultipleTabStore);
const { currentRoute } = diKT(routeLib.types.RouteTable).router;
const multipleTabOperator = diKT(TYPES.MultipleTabOperator)

const options = computed(() => {
  if (!props.tabItem) {
    return;
  }
  const { meta } = props.tabItem;
  const { path } = unref(currentRoute);
  const isCurItem = props.tabItem ? props.tabItem.path === path : false;
  // Refresh button
  const index = tabStore.getTabList.findIndex((tab) => tab.path === props.tabItem?.path)
  const refreshDisabled = !isCurItem;
  // Close left
  const closeLeftDisabled = index === 0 || !isCurItem;
  const disabled = tabStore.getTabList.length === 1;
  // Close right
  const closeRightDisabled = !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);
  return [
    {
      label: t('layout.multipleTab.reload'),
      key: TabActionEnum.REFRESH_PAGE,
      icon: renderIcon('ion:reload-sharp'),
      disabled: refreshDisabled,
    },
    {
      label: t('layout.multipleTab.close'),
      key: TabActionEnum.CLOSE_CURRENT,
      icon: renderIcon('clarity:close-line'),
      disabled: !!meta?.affix || disabled
    },
    {
      type: 'divider',
      key: 'divider1'
    },
    {
      icon: renderIcon('line-md:arrow-close-left'),
      key: TabActionEnum.CLOSE_LEFT,
      label: t('layout.multipleTab.closeLeft'),
      disabled: closeLeftDisabled,
    },
    {
      icon: renderIcon('line-md:arrow-close-right'),
      key: TabActionEnum.CLOSE_RIGHT,
      label: t('layout.multipleTab.closeRight'),
      disabled: closeRightDisabled,
    },
    {
      type: 'divider',
      key: 'divider2'
    },
    {
      icon: renderIcon('dashicons:align-center'),
      key: TabActionEnum.CLOSE_OTHER,
      label: t('layout.multipleTab.closeOther'),
      disabled: disabled || !isCurItem,
    },
    {
      label: t('layout.multipleTab.closeAll'),
      key: TabActionEnum.CLOSE_ALL,
      icon: renderIcon('clarity:minus-line'),
      disabled: disabled,
    },
  ]
})
const handleSelect = async (key) => {
  switch (key) {
    case TabActionEnum.REFRESH_PAGE:
      await multipleTabOperator.refreshPage()
      break
    case TabActionEnum.CLOSE_CURRENT:
      await multipleTabOperator.close(props.tabItem)
      break
    case TabActionEnum.CLOSE_ALL:
      await multipleTabOperator.closeAll()
      break
    case TabActionEnum.CLOSE_LEFT:
      await multipleTabOperator.closeLeft()
      break
    case TabActionEnum.CLOSE_RIGHT:
      await multipleTabOperator.closeRight()
      break
    case TabActionEnum.CLOSE_OTHER:
      await multipleTabOperator.closeOther()
      break
  }
}
</script>
<template>
  <WmqDropdown placement="bottom-start" trigger="click" :options="options" :show-arrow="true" @select="handleSelect">
    <div class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer">
      <WmqIconify icon="material-symbols:double-arrow-rounded" class="rotate-90" rotate="90deg" />
    </div>
  </WmqDropdown>
</template>
