<script lang="ts" setup>
import { props } from '../types'
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: RockComponent.Tag,
})

const Tag = useDriverComponent(RockComponent.Tag)
defineProps(props)
</script>
<template>
  <Tag v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Tag>
</template>

<style scoped></style>
