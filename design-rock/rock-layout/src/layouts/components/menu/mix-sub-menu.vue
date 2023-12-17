<script lang="ts" setup>
import { ref, h, unref, nextTick, computed } from 'vue-demi'
import { createNamespace, mapTree } from '@rchitect-rock/tools'
import { resolveContextOptions } from '#/../bridge'
import {
  RouteLocationNormalizedLoaded,
  RouterLink,
  useRouter,
} from '@rchitect-rock/router'
import { useI18n } from '@rchitect-rock/locale'
import { REDIRECT_NAME } from '@rchitect-design/constants'
import { renderIcon } from "../index";

const { listenerRouteChange, useMenuSetting } = resolveContextOptions();
const { getAccordion } = useMenuSetting()
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const { bem } = createNamespace('layout-menu')
// const collapsed = ref(false)
const { t } = useI18n()
const { currentRoute } = useRouter()
const menuRef = ref<any>(null)
const activeKey = ref()
// 定位菜单选择 与 当前路由匹配
const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    unref(menuRef)?.showOption()
  })
}

const menuList = computed(() => {
  return mapTree(props.list, { conversion: (menu) => routerToMenu(menu) })
})

listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return

  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route)

  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
  showOption()
})

async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)
  activeKey.value = menu.name
}

// 路由格式化
const routerToMenu = (item: RouteRecordItem) => {
  const { name, children, meta, icon } = item
  const title = t(meta.title as string)
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
    icon: icon ? renderIcon(icon) : null,
  }
}
</script>

<template>
  <div :class="bem()">
    <WmqScrollbar :class="bem('scrollbar')">
      <WmqMenu v-model:value="activeKey" :options="menuList" :collapsed-width="48" :collapsed="false"
        :collapsed-icon-size="22" :indent="18" :root-indent="18" ref="menuRef" :accordion="getAccordion" />
    </WmqScrollbar>
  </div>
</template>

<style lang="less" scoped>
.layout-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
}
</style>
