<script lang="ts" setup>
import { HandlerSettingEnum } from "@rchitect-design/constants";
import { baseHandler } from "../handler";
import { array, number, string } from 'vue-types';

defineOptions({ name: 'ThemeColorPicker' })

const props = defineProps({
  colorList: array<string>().def([]),
  event: number<HandlerSettingEnum>(),
  def: string().def(''),
})

const emit = defineEmits<{
  handle: [color: string]
}>()

const handleClick = (color) => {
  if (props.event) {
    baseHandler(props.event, color)
  } else {
    emit('handle', color)
  }
}
</script>
<template>
  <div class="theme-color-picker">
    <WmqSpace justify="space-between" :size="0" :wrap="true" >
      <template v-for="color, key in colorList" :key="color">
        <span
          @click="handleClick(color)"
          class="h-20px w-20px cursor-pointer border rounded-sm box-border
          border-gray-300 inline-block color-item"
          :class="{ active: def == color }"
          :style="{ background: color }"
        >
          <WmqSpace v-if="def == color" justify="center">
            <WmqIconify icon="ant-design:check-outlined" color="#D1D5DB" hover-color="#D1D5DB"  />
          </WmqSpace>
        </span>
      </template>
    </WmqSpace>
  </div>
</template>
<style lang="less" scoped>
.color-item{
  &:hover,&.active{
    border-color: rgba(6,96,189,1);
  }
}
</style>
