<script lang="ts" setup>
import { DriverRefKey } from '#/utils/refSupport'
import { useDriverComponent, RockComponent } from '#/index'
import { ref } from 'vue-demi';
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
})
const Menu = useDriverComponent(RockComponent.Menu)
const DriverRef = ref<typeof Menu>()
defineExpose({ [DriverRefKey]: DriverRef })
</script>
<template>
  <Menu v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Menu>
</template>

<style lang="scss">
// FIXME 样式的修改放到Component之外传入，Menu组件会被应用内其他地方使用
// class="all-menu-warp"
// :style="{
//   '--n-item-text-color': '#fff',
//   '--n-item-icon-color': '#fff',
//   '--n-arrow-color': '#fff',
//   '--n-item-text-color-active': '#fff',
//   '--n-item-text-color-child-active': '#fff',
//   '--n-item-icon-color-child-active': '#fff',
//   '--n-item-icon-color-hover': '#fff',
//   '--n-item-icon-color-active-hover': '#fff',
//   '--n-item-text-color-hover': '#fff',
//   '--n-arrow-color-hover': '#fff',
//   '--n-item-text-color-active-hover': '#fff',
//   '--n-item-icon-color-collapsed': '#fff',
//   '--n-item-icon-color-child-active-hover': '#fff',
//   '--n-item-text-color-child-active-hover': '#fff',
//   '--n-arrow-color-child-active-hover': '#fff',
//   '--n-item-icon-color-active': '#fff',
//   '--n-arrow-color-child-active': '#fff',
//   '--n-item-color-hover': '#17305d',
//   '--n-border-radius': '0px'
// }"

// .all-menu-warp {
//   .n-menu-item-content--selected {
//     background: #12264a;
//   }
//   &.n-menu .n-menu-item-content::before {
//     display: none;
//   }
// }
</style>
