<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: 'Card',
})
const Card = useDriverComponent(RockComponent.Card)
const Skeleton = useDriverComponent(RockComponent.Skeleton)
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <Card v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <Skeleton v-if="loading" text />
      <slot :name="item" v-bind="data || {}" v-else></slot>
    </template>
  </Card>
</template>
<style scoped lang="scss">
:deep(.n-card__content) {
  overflow: hidden !important;
}
</style>
