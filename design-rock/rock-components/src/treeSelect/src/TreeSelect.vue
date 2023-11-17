<script lang="ts" setup>
import { props } from '../types'
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineProps(props)
defineOptions({
  name: RockComponent.TreeSelect,
})
const TreeSelect = useDriverComponent(RockComponent.TreeSelect)
</script>
<template>
  <TreeSelect v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </TreeSelect>
</template>

<style scoped></style>
