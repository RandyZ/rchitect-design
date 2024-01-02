<script lang="ts" setup name="WmqBreadcrumbItem">
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: 'BreadcrumbItem',
})
const BreadcrumbItem = useDriverComponent(RockComponent.BreadcrumbItem)
</script>
<template>
  <BreadcrumbItem v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </BreadcrumbItem>
</template>

<style scoped></style>
