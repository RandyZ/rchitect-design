<script lang="ts">
// FIXME NaiveUI 需要一个标记，这个需要契约组件中全局策略支持
export default {
  DESCRIPTION_ITEM_FLAG: true
}
</script>
<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: RockComponent.DescriptionsItem,
})
const DescriptionsItem = useDriverComponent(RockComponent.DescriptionsItem)
</script>
<template>
  <DescriptionsItem v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </DescriptionsItem>
</template>

<style scoped></style>
