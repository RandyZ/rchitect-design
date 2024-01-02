<script lang="ts" setup>
import { fetchProps, fetch } from '#/dataprovider'
import { watch, ref, watchEffect } from 'vue-demi'
import omit from 'lodash-es/omit'
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Select',
})

const Select = useDriverComponent(RockComponent.Select)
const props = defineProps(omit(fetchProps, ['value']))
const isFirstLoad = ref(true)
const options = ref([])
watchEffect(() => {
  props.immediate && fetch(props, options)
})
watch(
  () => props.params,
  () => {
    options.value = []
    fetch(props, options)
  },
  { deep: true },
)
</script>
<template>
  <Select v-bind="$attrs" :options="options" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Select>
</template>

<style scoped></style>
