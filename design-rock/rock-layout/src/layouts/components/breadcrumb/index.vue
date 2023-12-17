<script lang="ts">
export default {
  name: 'LayoutBreadcrumbComponent'
}
</script>
<script lang="ts" setup>
import { ref, unref, watchEffect } from 'vue'
import { useI18n } from '@rchitect-rock/locale'
// import { useRoutesTable, useAppConfig, useGo } from '@rchitect-rock/hooks'
import { filterTree } from '@rchitect-rock/tools'
import isString from 'lodash-es/isString'
import { Route } from '@rchitect-design/constants'
import { WmqIconify } from '@rchitect-rock/components'
import { Menu } from '@rchitect-design/types'
import { MenuFunctions, MenuPaths } from '@rchitect-rock/router'
import { renderIcon } from '../index'
import { useRoute, useRouteOperator, useSporadicSetting } from "#/hooks";

const { t } = useI18n()

const sporadicSetting = useSporadicSetting()
const { currentRoute } = useRoute().router
const routeOperator = useRouteOperator().go

const routes = ref<Menu[]>([])

watchEffect(async () => {
  if (currentRoute.value.name === Route.REDIRECT_NAME) return
  const menus = await MenuFunctions.getMenus()

  const routeMatched = currentRoute.value.matched
  const cur = routeMatched?.[routeMatched.length - 1]
  let path = currentRoute.value.path

  if (cur && cur?.meta?.currentActiveMenu) {
    path = cur.meta.currentActiveMenu as string
  }

  const parent = MenuPaths.getAllParentPath(menus, path)
  const filterMenus = menus.filter((item) => item.path === parent[0])
  const matched = getMatched(filterMenus, parent)
  if (!matched || matched.length === 0) return

  const breadcrumbList = filterItem(matched)

  if (currentRoute.value.meta?.currentActiveMenu) {
    breadcrumbList.push({
      ...currentRoute.value,
      name: currentRoute.value.name,
    })
  }

  routes.value = breadcrumbList
})

function getMatched(menus:Menu[], parent:string[]) {
  const matched:Menu[] = []

  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      matched.push(item)
    }

    if (item.children?.length) {
      matched.push(...getMatched(item.children, parent))
    }
  })
  return matched
}

function filterItem(list:Menu[]) {
  return filterTree(list, (item) => {
    const { meta, name } = item
    if (!meta) {
      return !!name
    }
    const { title, hideBreadcrumb, hideMenu } = meta
    return !(!title || hideBreadcrumb || hideMenu);
  }).filter((item) => !item.meta?.hideBreadcrumb)
}

const renderDropdownLabel = (route:any) => {
  return t(route.title)
}

const renderDropdownIcon = (option:any) => {
  if (unref(sporadicSetting).showBreadCrumbIcon && option.icon) {
    const iconRender = renderIcon(option.icon);
    if (iconRender) {
      return iconRender()
    } else {
      return null;
    }
  } else {
    return null
  }
}

const handleClick = (path:string, route:Recordable<any>) => {
  const { children, redirect, meta } = route

  if (children?.length && !redirect) {
    return
  }
  if (meta?.carryParam) {
    return
  }

  if (redirect && isString(redirect)) {
    routeOperator.go(redirect)
  } else {
    path = /^\//.test(path) ? path : `/${ path }`
    routeOperator.go(path)
  }
}
</script>

<template>
  <WmqSpace align="center" justify="space-between" class="pl-8px pr-8px">
    <WmqBreadcrumb v-if="sporadicSetting.showBreadCrumb">
      <WmqBreadcrumbItem v-for="(route, index) in routes" :key="index">
        <WmqDropdown
            key-field="path"
            size="small"
            :options="route.children"
            :render-label="renderDropdownLabel"
            :render-icon="renderDropdownIcon"
            @select="handleClick"
        >
          <WmqSpace align="center" :size="0">
            <WmqIconify
                class="v-middle"
                :icon="route.icon"
                v-if="route.icon && sporadicSetting.showBreadCrumbIcon"
            />
            <span class="mr-1.2 ml-1.2">{{ t(route.meta?.title || '') }}</span>
            <WmqIconify icon="gridicons:dropdown" v-if="route.children"/>
          </WmqSpace>
        </WmqDropdown>
      </WmqBreadcrumbItem>
    </WmqBreadcrumb>
  </WmqSpace>
</template>
