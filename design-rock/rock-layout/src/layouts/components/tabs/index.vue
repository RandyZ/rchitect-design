<script lang="ts" setup>
import { Sortable } from '@rchitect-rock/tools'
import {
  RouteLocationNormalized, RouteMeta, Lib as routeLib, listenerRouteChange
} from '@rchitect-rock/router'
import { computed, nextTick, ref, unref } from 'vue-demi'
import { useI18n } from '@rchitect-rock/locale'
import { MenuTypeEnum, Route } from '@rchitect-design/constants'
import TabRedo from './components/TabRedo.vue'
import TabDropdown from './components/TabDropdown.vue'
import TabQuick from './components/TabQuick.vue'
import FoldButton from './components/FoldButton.vue'
// import { storeToRefs } from '@rchitect-rock/state'
import { diKT } from '@rchitect-rock/ioc'
import Beans from '#/../beankeys'
// import { useUserStore } from '#/index'
// import { useAppStatus, useMultipleTabSetting, useMenuSetting } from '@rchitect-rock/hooks'

defineOptions({
  name: 'LayoutPageTabs',
})

const { t } = useI18n()
const { isMobile } = useAppStatus().toRefs()
const { getMenuType } = useMenuSetting()
const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()
const multipleTabOperator = diKT(Beans.MultipleTabOperator)
const multipleTabStore = diKT(Beans.MultipleTabStore)
const router = diKT(routeLib.types.RouteTable).router
const currentRoute = router.currentRoute

const handleChange = (value:string) => multipleTabOperator.routeOperator.go(value, false)
const { getTabList } = storeToRefs(multipleTabStore)
const userStore = useUserStore()
const tabDropdownRef = ref<HTMLElement | null>(null)
const activeTabName = ref<string>('')

const tabList = computed(() => {
  return unref(getTabList).filter(
      (item) => !item.meta?.hideTab && router.hasRoute(item.name as string),
  )
})

listenerRouteChange((route) => {
  const { name } = route
  if (name === Route.PAGE_REDIRECT_NAME || !route || !userStore.getAccessToken) {
    return
  }

  const { path, fullPath, meta = {} } = route
  const { currentActiveMenu, hideTab } = meta as RouteMeta
  const isHide = !hideTab ? null : currentActiveMenu
  const p = isHide || fullPath || path
  if (activeTabName.value !== p) {
    activeTabName.value = p as string
  }

  if (isHide) {
    const findParentRoute = router
        .getRoutes()
        .find((item) => item.path === currentActiveMenu)
    findParentRoute && multipleTabStore.checkTab(findParentRoute as unknown as RouteLocationNormalized)
  } else {
    multipleTabStore.checkTab(unref(route))
  }
})

// 获取tabs内dom 设置拖拽
nextTick(() => {
  const selection = document.querySelector('#drag > div > div > div > div > div.n-tabs-wrapper')
  Sortable.create(selection)
})

const handleContextMenu = (
    e:PointerEvent | MouseEvent,
    tabItem:RouteLocationNormalized,
) => {
  e.preventDefault()
  if (!tabItem) return
  // @ts-ignore
  unref(tabDropdownRef)?.openDropdown(e, tabItem)
}

const getShowHeaderMultipleTab = computed(() => {
  return (
      unref(getShowMultipleTab) &&
      (unref(getMenuType) !== MenuTypeEnum.MIX || unref(isMobile))
  )
})

const isLayoutBottomShow = computed(() => {
  return getShowHeaderMultipleTab;
})

const handleClose = (e:PointerEvent, route:RouteLocationNormalized) => {
  e.stopPropagation()
  multipleTabOperator.close(route)
}
</script>

<template>
  <div>
    <WmqTabs
        v-model:value="activeTabName"
        type="card"
        id="drag"
        :tabs-padding="8"
        animated
        @update:value="handleChange"
        class="wmq-tabs"
    >
      <WmqTab
          v-for="(item, index) in tabList"
          :key="item.query ? item.fullPath : item.path"
          :name="item.fullPath"
          style="--n-tab-padding: 0"
      >
        <div
            class="group py-4px pl-12px hover:text-[var(--n-tab-text-color-active)]"
            :class="[index == 0 ? 'pr-12px' : 'pr-18px']"
            @contextmenu="handleContextMenu($event, item)"
        >
          <span>
            <WmqIconify v-if="item?.meta?.affix" size="12" icon="line-md:home-md-twotone"/>
            <WmqIconify v-else-if="item?.meta?.icon" size="12" :icon="item?.meta?.icon" p-r-1/>
            {{ t(item.meta.title as string) }}
          </span>
          <WmqIconify
              v-if="index != 0 && item?.meta?.affix !== true"
              class="absolute !transition-all top-1/2 ml-2px mt--6px hover:!text-14px hover:nt--7px group-hover:!inline-flex"
              :class="{ ['!hidden']: activeTabName !== item.fullPath }"
              size="12"
              icon="ep:close-bold"
              @click="handleClose($event, item)"
          />
        </div>
      </WmqTab>
      <template #suffix>
        <TabRedo v-if="getShowRedo"/>
        <TabQuick :tabItem="currentRoute" v-if="getShowQuick"/>
        <FoldButton v-if="getShowFold"/>
      </template>
      <!-- LayoutBottom -->
      <template v-if="isLayoutBottomShow">
        <!-- Header 是否需要展示Tabs，比如手机展示，需要由Header来负责展示Tabs -->
        <slot name="tabs">
        </slot>
      </template>
    </WmqTabs>
    <TabDropdown ref="tabDropdownRef"/>
  </div>
</template>

<style>

</style>
