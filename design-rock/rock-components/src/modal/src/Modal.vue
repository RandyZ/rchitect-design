<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref, computed } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
defineOptions({
  name: 'Modal',
})
const Modal = useDriverComponent(RockComponent.Modal)
const props = defineProps({
  width: {
    type: [String, Number],
    default: '600px',
  },
  onPositiveClick: {
    type: Function,
    default: null,
  },
})
const bodyStyle = computed(() => {
  return {
    width: props.width,
  }
})
const emit = defineEmits(['success'])

const PositiveClick = () => {
  props.onPositiveClick && props.onPositiveClick()
  emit('success')
}
</script>
<template>
  <Modal v-bind="$attrs" :style="bodyStyle" @PositiveClick="PositiveClick" :ref="DriverRefKey">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>

<style scoped></style>
