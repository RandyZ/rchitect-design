<script lang="ts" setup>
import { computed, onMounted, ref, unref, useAttrs, watch } from 'vue-demi'
import type { WmqFormProps } from './type'
import { cloneDeep, keys, set } from 'lodash-es'
import { useDriverComponent, RockComponent } from '#/index'
import { RockGrid as WmqGrid, RockGridItem as WmqGridItem } from '#/grid'
import { RockButton as WmqButton, RockButtonGroup as WmqButtonGroup } from '#/button'
import { RockInput as WmqInput } from '#/input'
import WmqFormItem from './FormItem.vue'
import { DriverRefKey } from '#/utils/refSupport'
const formRef = ref()
defineExpose({ [DriverRefKey]: formRef })
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Form',
})
const Form = useDriverComponent(RockComponent.Form)


const emit = defineEmits(['register', 'update:model'])
const innerProps = ref<Partial<WmqFormProps>>()
const props = defineProps({
  schemas: [],
  rules: {
    type: Object || Array,
    default: {},
  },
})
const attrs = useAttrs()
const getRules = computed(() => innerProps.value?.rules || props.rules)
const setProps = (prop: Partial<WmqFormProps>) => {
  prop.schemas?.forEach((v) => {
    if (v.defaultValue) {
      fieldValue.value[v.field] = v.defaultValue
    }
    if (v.required || !v.rule) {
      v.rule = {
        required: true,
      }
    }
  })

  innerProps.value = {
    actions: false,
    ...prop,
    ...unref(innerProps),
  }
}
const fieldValue = ref({})
watch(
  () => attrs.model,
  () => {
    const m = cloneDeep(attrs.model)
    sObject(m)
  },
  { deep: true, immediate: true },
)
watch(
  () => fieldValue,
  () => {
    emit('update:model', getFieldValue())
  },
  { deep: true },
)
function sObject(m, key?) {
  keys(m).forEach((k) => {
    const tempKey = key ? key + '.' + k : k
    if (typeof m[k] == 'object') {
      sObject(m[k], tempKey)
      return
    }
    fieldValue.value[tempKey] = m[k]
  })
}
function getFieldValue() {
  const m = JSON.parse(JSON.stringify(fieldValue.value))
  Object.keys(m).forEach((k) => {
    if (k.indexOf('.') != -1) {
      const v = m[k]
      delete m[k]
      set(m, k, v)
    }
  })
  return m
}
// 默认gridItem参数
const getGridItemProps = (p) => {
  return { span: getGridProps.value.span, ...p }
}

const getFormItemProps = (p) => {
  const { labelProps } = p

  return { ...labelProps }
}

// 默认grid参数
const getGridProps = computed(() => {
  return {
    cols: 24,
    span: 8,
    xGap: 12,
    yGap: 0,
    ...unref(innerProps)?.gridProps,
  }
})

const FormMethod = ref({})

onMounted(() => {
  FormMethod.value = {
    setProps,
    getFieldValue,
    validate: formRef.value?.validate,
    restoreValidation: formRef.value?.restoreValidation,
    updateSchemas: (schemas) => {
      if (!innerProps.value) {
        innerProps.value = {}
      }
      innerProps.value.schemas = schemas
    },
  }
  emit('register', unref(FormMethod))
})
</script>
<template>
  <div>
    <!--    {{ $attrs }}-->
    <Form ref="formRef" v-bind="$attrs" :rules="getRules">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <WmqGrid v-bind="getGridProps">
        <WmqGridItem
          v-bind="getGridItemProps(schema.gridItemProps)"
          v-for="(schema, key) in innerProps?.schemas"
          :key="key"
          :path="schema.field"
        >
          <WmqFormItem
            :label="schema.label"
            :path="schema.field"
            :showRequireMark="schema.required"
            :rule="schema.rule"
            v-bind="getFormItemProps(schema)"
          >
            <slot
              :name="schema.slot"
              v-if="schema.slot"
              v-bind="{ m: fieldValue, field: schema.field }"
            ></slot>
            <component
              v-if="
                schema.component !== 'InputPassword' && schema.component !== 'InputTextArea' && !schema.slot
              "
              :is="`Wmq${schema.component}`"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <WmqInput
              type="password"
              v-if="schema.component === 'InputPassword'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <WmqInput
              type="textarea"
              v-if="schema.component === 'InputTextArea'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
          </WmqFormItem>
        </WmqGridItem>
        <WmqGridItem
          v-if="(innerProps?.schemas?.length || 0) > 0 && innerProps?.actions"
          v-bind="innerProps?.actionsProps"
        >
          <slot name="actions-prefix" v-bind="FormMethod || {}"></slot>
          <slot name="actions" v-bind="FormMethod || {}">
            <WmqButtonGroup>
              <WmqButton type="error" @click="formRef.restoreValidation">
              {{ innerProps?.actionsProps?.cancelText || '重置' }}
              </WmqButton>
              <WmqButton
                type="primary"
                @click="innerProps?.submitFunc??(FormMethod)"
              >
                {{ innerProps?.actionsProps?.submitText || '提交' }}
              </WmqButton>
            </WmqButtonGroup>
          </slot>
          <slot name="actions-suffix" v-bind="FormMethod || {}"></slot>
        </WmqGridItem>
      </WmqGrid>
    </Form>
  </div>
</template>
