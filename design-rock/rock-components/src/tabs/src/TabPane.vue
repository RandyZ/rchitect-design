<script lang="ts">
// FIXME NaiveUI 需要一个标记，这个需要契约组件中全局策略支持
export default {
  __TAB_PANE__: true
}
</script>
<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: 'TabPane',
})

const TabPane = useDriverComponent(RockComponent.TabPane)
</script>
<template>
  <TabPane v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </TabPane>
</template>

<style scoped></style>
