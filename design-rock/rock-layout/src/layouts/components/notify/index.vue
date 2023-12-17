<script lang="ts">
const BasicColor = ['rgb(51, 54, 57)','rgb(213,213,214)']
const BasicHover = ['rgb(208,58,82)','rgb(208,58,82)']
</script>
<script lang="ts" setup>
import { computed,  ref, unref } from 'vue-demi'
import { tabListData, ListItem } from './data'
import NoticeList from './NoticeList.vue'
import { array, bool } from 'vue-types';
import isNil from 'lodash-es/isNil';
defineOptions({
  name: 'WmqLayoutNotifyList',
})
const listData = ref(tabListData)

const onNoticeClick = (record: ListItem) => {
  record.titleDelete = !record.titleDelete
}

const props = defineProps({
  isDark: bool(),
  color: array<string>().def(BasicColor),
  holverColor: array<string>().def(BasicHover)
})

const iconColor = computed(() =>{
  if (isNil(props.isDark)) {
    return props.color[0]
  } else {
    return props.color[props.isDark ? 1 : 0]
  }
})
  
const holverColor = computed(() =>{
  if (isNil(props.isDark)) {
    return props.holverColor[0]
  } else {
    return props.holverColor[props.isDark ? 1 : 0]
  }
})

const varStyle = computed(() => ({
  '--notify-icon-color': unref(iconColor),
  '--notify-icon-color-hover': unref(holverColor)
}))
</script>

<template>
  <div>
    <WmqPopover title="" trigger="click">
      <template #trigger>
        <WmqBadge dot>
          <WmqIconify
            icon="line-md:bell"
            hoverPointer
            hoverColor="var(--notify-icon-color-hover)"
            color="var(--notify-icon-color)"
            :style="varStyle"
          />
        </WmqBadge>
      </template>
      <WmqTabs
        class="w-60"
        animated
        type="line"
        justify-content="space-evenly"
      >
        <WmqTabPane
          v-for="item in listData"
          :key="item.key"
          :name="item.key"
          :tab="`${item.name}(${item.list.length})`"
        >
          <NoticeList :list="item.list" @title-click="onNoticeClick" />
        </WmqTabPane>
      </WmqTabs>
    </WmqPopover>
  </div>
</template>

<style lang="less">
.vben-header-notify {
  padding: 0 10px;
}
</style>
