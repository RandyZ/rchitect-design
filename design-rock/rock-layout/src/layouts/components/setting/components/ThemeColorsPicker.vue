<script lang="ts" setup>
import { HandlerSettingEnum } from "@rchitect-design/constants";
import { baseHandler } from "../handler";
import { array, number } from 'vue-types';
import get from 'lodash-es/get';
import ThemeColorPicker from './ThemeColorPicker.vue'

defineOptions({ name: 'ThemeColorsPicker' })

const props = defineProps({
  colorsList: array<string[]>().def([]),
  colorNames: array<string>(),
  event: number<HandlerSettingEnum>(),
  defs: array<string>().def([]),
})

const emit = defineEmits(['handle']);

const handleClick = (color, rowKey) => {
  if(props.event){
    const propName = get(props.colorNames, rowKey, rowKey)
    baseHandler(props.event, {
      [propName]: color
    })
  }
  else{
    emit('handle', color, rowKey);
  }
}
</script>
<template>
  <WmqList>
    <WmqListItem v-for="(colorList, rowKey) in colorsList">
      <WmqThing :description="colorNames ? colorNames[rowKey] : rowKey" :description-style="{color: 'rgb(156, 163, 175)'}">
        <ThemeColorPicker
          :def="defs[rowKey]"
          :color-list="colorList"
          @handle="color => handleClick(color, rowKey)"
        />
      </WmqThing>
    </WmqListItem>
  </WmqList>
</template>
