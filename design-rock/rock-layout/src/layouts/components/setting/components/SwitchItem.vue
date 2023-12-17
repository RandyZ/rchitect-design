<script lang="ts" setup name="SwitchItem">
import { PropType } from 'vue'
import { HandlerSettingEnum } from "@rchitect-design/constants";
import {baseHandler} from "../handler";

const emit = defineEmits(['change']);

const props = defineProps({
  title: {type: String, default: ''},
  def: {
    type: Boolean as PropType<boolean>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
  isEmit: {
    type: Boolean,
    default: false
  }
})
const onChange = (value)=>{
  if(!props.isEmit){
    props.event && baseHandler(props.event, value)
  }
  else{
    emit("change", value)
  }
}
</script>
<template>
  <div class="switch-item">
    <WmqSpace justify="space-between" align="center">
      <span>{{ title }}</span>
      <WmqSwitch :value="def" :disabled="disabled" @update:value="onChange">
        <template #checked-icon>
          <WmqIconify icon="ant-design:check-outlined" color="#18A058" />
        </template>
        <template #unchecked-icon>
          <WmqIconify icon="ant-design:close-outlined" color="#BEBEBE" />
        </template>
      </WmqSwitch>
    </WmqSpace>
  </div>
</template>
