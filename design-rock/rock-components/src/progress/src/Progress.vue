<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Progress',
})

const Progress = useDriverComponent(RockComponent.Progress)
</script>
<template>
  <Progress v-bind="$attrs" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Progress>
</template>

<style scoped></style>
