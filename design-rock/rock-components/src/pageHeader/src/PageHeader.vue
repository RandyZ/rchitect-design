<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: RockComponent.PageHeader,
})
const PageHeader = useDriverComponent(RockComponent.PageHeader)
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <PageHeader v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <RockSkeleton v-if="loading" text />
      <slot :name="item" v-bind="data || {}" v-else></slot>
    </template>
  </PageHeader>
</template>

<style scoped></style>
