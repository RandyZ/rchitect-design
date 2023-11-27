<script lang="ts" setup>
import { fetchProps, fetch } from '#/dataprovider'
import { watch, ref, watchEffect } from 'vue-demi'
import { omit } from 'lodash-es'
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: RockComponent.PopSelect,
})

const PopSelect = useDriverComponent(RockComponent.PopSelect)
const props = defineProps(omit(fetchProps, ['value']))
// const isFirstLoad = ref(true)
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
  <PopSelect v-bind="$attrs" :options="options" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </PopSelect>
</template>

<style scoped></style>
