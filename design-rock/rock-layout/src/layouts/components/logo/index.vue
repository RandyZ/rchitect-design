<script lang="ts">
export default {
  name: 'LayoutLogoComponent'
}
</script>
<script lang="ts" setup>
import { Beans } from '@rchitect-rock/router'
import { Route } from '@rchitect-design/constants'
import { createNamespace, getGlobalConfig } from '@rchitect-rock/tools'
import logo from '#/layouts/components/logo/assets/logo.png'
import { diKT } from '@rchitect-rock/ioc'
import { computed } from 'vue-demi'

const { bem } = createNamespace('app-logo')

const props = defineProps({
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },
  /**
   * Click to jump to which path
   */
  homePath: { type: String, default: Route.BASIC_HOME_PATH },
  /**
   * Logo src
   */
  logoSrc: { type: String, default: logo },
  /**
   * Logo title
   */
  logoTitle: { type: String, required: false },
})

const title = computed(() => {
  if (props.logoTitle) {
    return props.logoTitle
  } else {
    const { title } = getGlobalConfig(import.meta.env)
    return title
  }
})

const routeTable = diKT(Beans.RouteTable)
function goHome() {
  routeTable.router.push(props.homePath)
}
</script>

<template>
  <div :class="bem()" @click="goHome">
    <img :src="logo" alt="logo" />
    <div
      class="ml-2 truncate md:opacity-100"
      :class="bem('title')"
      v-show="showTitle"
    >
      {{ title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 48px;
  background: transparent;
  box-sizing: border-box;

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }

  img {
    width: 32px;
  }
}
</style>
