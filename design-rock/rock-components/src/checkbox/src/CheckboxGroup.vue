<script lang="ts" setup name="WmqCheckboxGroup">
import Checkbox from './Checkbox.vue'
import { fetch } from '#/dataprovider'
import { computed, ref, watch, watchEffect } from 'vue-demi'
import { useDriverComponent, RockComponent } from '#/index'
import WmqButtonGroup from '#/button/src/ButtonGroup.vue'
import WmqButton from '#/button/src/Button.vue'
import { DriverRefKey } from '#/utils/refSupport'
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })

interface OptionType { value: any, label: string, disabled: boolean }

defineOptions({
  name: RockComponent.CheckboxGroup,
})
const CheckboxGroup = useDriverComponent(RockComponent.CheckboxGroup)
const props = defineProps({
  labelField: {
    type: String,
    default: 'label',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  mode: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'default',
  },
  api: {
    type: Function,
    default: null,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default: undefined,
  },
  value: {
    type: Array,
    default: undefined,
  },
})
const options = ref<OptionType[]>([])
const value = ref<any>([])
const emit = defineEmits(['update:value'])

const option = computed(() => {
  const { options } = props

  return options
    ? options.map((v: any) => {
      return {
        label: v[props.labelField],
        value: v[props.valueField],
        selected: false,
      }
    })
    : []
})
const select = (v: any) => {
  const i = value.value?.findIndex((a) => a == v)
  if (i === -1) {
    value.value.push(v)
  } else {
    value.value.splice(i, 1)
  }

  emit('update:value', value)
}
const getType = (v) => {
  if (value.value.length == 0) {
    return ''
  }
  return value.value.find((a) => a == v) ? 'primary' : ''
}
const isFirstLoad = ref(true)
watchEffect(() => {
  props.immediate && fetch(props, options)
})
watch(
  () => props.params,
  () => {
    !isFirstLoad.value && fetch(props, options)
  },
  { deep: true },
)
const update = (v) => {
  value.value = v
  emit('update:value', v)
}
</script>
<template>
  <CheckboxGroup v-bind="$attrs" @update:value="update" :ref="DriverRefKey">
    <template v-for="item in options" :key="`${item.value}`">
      <WmqButtonGroup v-if="type === 'button'">
        <WmqButton :value="item.value" @click="select(item.value)" :type="getType(item.value)" :disabled="item.disabled">
          {{ item.label }}</WmqButton>
      </WmqButtonGroup>
      <Checkbox v-bind="item" v-else :label="item.value">{{ item.label }}</Checkbox>
    </template>
  </CheckboxGroup>
</template>

<style scoped></style>
