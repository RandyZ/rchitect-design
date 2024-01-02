<script lang="ts" setup>
import { computed, ref } from "vue-demi";
import { useDriverComponent, RockComponent } from '#/index'
import type { RockTextTypes } from './types'
import { DriverRefKey } from '#/utils/refSupport'
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Text',
})
const props = withDefaults(defineProps<RockTextTypes.Props>(), {
  type: 'primary',
  ellipsis: false,
})
const RockText = useDriverComponent(RockComponent.Text)
const sizeMap = {
  large: 'H3',
  default: 'H4',
  small: 'H5',
}
const size = computed(() => {
  if (props.size) {
    return sizeMap[props.size] || props.size
  }
  return props.size
})
</script>
<template>
  <RockText v-bind="$attrs" :type="props.type" :size="size" :ref="DriverRefKey">
    <template #[slotName]="slotData" v-for="slotName in Object.keys($slots)" :key="slotName">
      <slot :name="slotName" v-bind="slotData || {}"></slot>
    </template>
  </RockText>
</template>
