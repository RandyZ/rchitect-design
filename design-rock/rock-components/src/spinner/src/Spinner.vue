<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: RockComponent.Spinner,
})

const Spinner = useDriverComponent(RockComponent.Spinner)
</script>
<template>
  <Spinner v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Spinner>
</template>

<style lang="scss" >
.n-spin-content.n-spin-content--spinning, .n-spin-container,.n-spin-content  {
  height: 100% !important;
}
</style>
