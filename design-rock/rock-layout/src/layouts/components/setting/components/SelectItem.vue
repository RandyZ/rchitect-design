<script lang="ts" setup name="SelectItem">
import {PropType,  h} from 'vue'
import {HandlerSettingEnum} from "@rchitect-design/constants";
import {baseHandler} from "../handler";
import {useI18n} from '@rchitect-rock/locale'

const {t} = useI18n();

const emit = defineEmits(['change']);

const props = defineProps({
  title: {type: String, default: ''},
  def: {
    type: [String, Number] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
  options: {type: Array, default: () => []},
  isEmit: {
    type: Boolean,
    default: false
  }
})
const onChange = (value) => {
  if(!props.isEmit){
    props.event && baseHandler(props.event, value)
  }
  else{
    emit("change", value)
  }
}
/*
* options 数据传入时,多语言会失效,这里再渲染一遍
* */
function renderLabel(option: { label: string, value: string | number }) {
  return h('span',{},t(option.label))
}

</script>
<template>
  <div class="switch-item">
    <WmqSpace justify="space-between" align="center">
      <span>{{ title }}</span>
      <WmqSelect class="w-130px" size="small" :value="def" :options="options" :disabled="disabled"
                  @update:value="onChange" :render-label="renderLabel"/>
    </WmqSpace>
  </div>
</template>
<style lang="less" scoped></style>
