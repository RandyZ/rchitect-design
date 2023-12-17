<script lang="ts" setup>
import { ref, h, onMounted, unref, nextTick, computed } from 'vue-demi'
import LayoutLogoComponent from '../logo/index.vue'
import { createNamespace, mapTree } from '@rchitect-rock/tools'
import { useI18n } from '@rchitect-rock/locale'
import { Route } from '@rchitect-design/constants'
import { renderIcon } from '../index'
import {
  MenuFunctions, listenerRouteChange,
  type RouteLocationNormalizedLoaded,
  RouterLink
} from '@rchitect-rock/router'
// import { useAppConfig, useAppStatus, useMenuSetting } from '@rchitect-rock/hooks'
// import { themeSettingHooks } from "@rchitect-rock/hooks";
import { Menu } from '@rchitect-design/types'
import { driverRef } from "@rchitect-rock/components";
import { string, number, bool } from 'vue-types'

defineOptions({
  name: 'LayoutMenuComponent',
})

const themeHooks = themeSettingHooks();

const props = defineProps({
  mode: string().def('vertical'),
  title: string(),
  /**
   * 是否显示根菜单， 如果显示则忽略当前菜单的路由过滤
   */
  showAtRootMenu: bool().def(true),
  /**
   * 提取Menu树的层级
   */
  menusShowLevel: number().def(0),
})

const { isMobile } = useAppStatus().toRefs()
const { menu, isSidebar, isMixSidebar, getCollapsedShowTitle } = useAppConfig()
const { isMenuMixType, isMenuMixSidebarType, getCollapsed } = useMenuSetting()
const { t } = useI18n()
const { bem } = createNamespace('layout-menu')
const menuModeClass = computed(() => {
  if (props.mode === 'vertical' || unref(isMobile)) {
    return '__column';
  } else {
    return '__inline';
  }
})
const menuRef = ref<WmqComponent<Menu>>();

const { menus, currentRoute } = MenuFunctions.useMenusAtLevel(
  props.menusShowLevel,
  !(unref(isMenuMixType) || unref(isMenuMixSidebarType))
)

const menuList = computed(() => {
  return mapTree(unref(menus), { conversion: (menu) => routerToMenu(menu) })
})

// const menuList:Ref<Menu[]> = ref([])
const activeKey = ref()

const getMenuCollapsed = computed(() => {
  if (unref(isMixSidebar)) return false
  return unref(getCollapsed)
})

// 定位菜单选择 与 当前路由匹配
const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    driverRef(menuRef)?.showOption()
  })
}
// TODO 静态路由 待实现
onMounted(async () => {
  // const menus = await MenuFunctions.getMenus()
  // menuList.value = mapTree(menus, { conversion: (menu) => routerToMenu(menu) })
  // showOption()
})

listenerRouteChange((route) => {
  if (route.name === Route.REDIRECT_NAME) return

  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route)

  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
  showOption()
})

async function handleMenuChange(route?:RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)
  activeKey.value = menu.name
}

// 路由格式化
const routerToMenu = (item:RouteRecordItem) => {
  const { name, children, meta, icon, hideMenu } = item
  if (!meta) {
    console.warn(`${ name } route meta attribute is undefined`)
  }
  const title = meta ? t(meta.title as string) : ''
  return {
    label: () => {
      if (children) {
        return title
      }
      return h(
          RouterLink,
          {
            to: {
              name,
            },
          },
          { default: () => title },
      )
    },
    key: name,
    show: !hideMenu,
    icon: renderIcon(icon ? icon : 'line-md:text-box'),
  }
}

const styleVar = computed(() => {
  return themeHooks.getMenumStyles || {};
})
</script>

<template>
  <div :class="[bem(), menuModeClass]" >
    <slot name="logo" v-if="!isMenuMixType">
      <!-- showSidebarLogo || isMobile -->
      <LayoutLogoComponent
          :class="bem('logo')"
          :showTitle="true"
          :logo-title="props.title"
      />
    </slot>
    <WmqScrollbar :class="bem('scrollbar')">
      <WmqMenu
        v-model:value="activeKey"
        ref="menuRef"
        :options="menuList"
        :collapsed="getMenuCollapsed"
        :collapsed-width="48"
        :collapsed-icon-size="22"
        :indent="18"
        :root-indent="18"
        :mode="props.mode"
        :accordion="menu.accordion"
        :style="styleVar"/>
    </WmqScrollbar>
  </div>
</template>

<style lang="less" scoped>
.layout-menu {
  display: flex;
  height: 100%;

  &.__inline {
    flex-direction: row;
  }

  &.__column {
    flex-direction: column;
  }

  &__logo {
    flex-shrink: 0;
  }

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
}
</style>
