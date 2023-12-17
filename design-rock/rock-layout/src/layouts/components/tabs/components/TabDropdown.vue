<script lang="ts" setup>
import { computed, h, nextTick, ref, unref } from 'vue'
import { useI18n } from '@rchitect-rock/locale'
import { TabActionEnum } from '@rchitect-design/constants'
import { RouteLocationNormalized, useRouter } from "@rchitect-rock/router"
import { renderIcon } from "#/layouts/components";
import { diKT } from '@rchitect-rock/ioc'
import TYPES from '#/../beankeys'
// const { refreshPage, close, closeAll, closeLeft, closeRight, closeOther } = diKT(TYPES.MultipleTabOperator)
const multipleTabOperator = diKT(TYPES.MultipleTabOperator);
const tabStore = diKT(TYPES.MultipleTabStore);
const { t } = useI18n();
const x = ref(0)
const y = ref(0)
const targetTab = ref<RouteLocationNormalized>()
const showDropdown = ref(false)

const { currentRoute } = useRouter();

const options = computed(() => {

  if (!unref(targetTab)) {
    return;
  }
  const { meta } = unref(targetTab) || {};
  const { path } = unref(currentRoute);

  const isCurItem = unref(targetTab) ? unref(targetTab)?.path === path : false;

  // Refresh button
  const index = tabStore.getTabList.findIndex((tab) => tab.path === unref(targetTab)?.path)
  const refreshDisabled = !isCurItem;
  // Close left
  const closeLeftDisabled = index === 0 || !isCurItem;

  const disabled = tabStore.getTabList.length === 1;

  // Close right
  const closeRightDisabled =
    !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);
  const drops = [
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
    {
      type: 'divider',
      key: 'divider3'
    }
  ]
  if (meta?.affix) {
    drops.push({
      label: t('layout.multipleTab.cancelAffix'),
      key: TabActionEnum.CANCEL_AFFIX,
      icon: renderIcon('line-md:home-simple'),
      disabled: false
    })
  } else {
    drops.push({
      label: t('layout.multipleTab.setAffix'),
      key: TabActionEnum.SET_AFFIX,
      icon: renderIcon('line-md:home-simple-filled'),
      disabled: false
    })
  }
  return drops
})

const openDropdown = (e: PointerEvent, tabItem: RouteLocationNormalized) => {
  targetTab.value = tabItem
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}
const handleSelect = async (key) => {
  switch (key) {
    case TabActionEnum.REFRESH_PAGE:
      await multipleTabOperator.refreshPage()
      break
    case TabActionEnum.CLOSE_CURRENT:
      await multipleTabOperator.close(unref(targetTab))
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
    default:
      console.log(`${key} 待实现`);
      break
  }
}
defineExpose({ openDropdown })
</script>
<template>
  <WmqDropdown placement="bottom-start" trigger="manual" :show-arrow="true" :x="x" :y="y" :options="options"
    v-model:show="showDropdown" @clickoutside="showDropdown = false" @select="handleSelect" />
</template>
