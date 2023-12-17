<script lang="ts" setup>
import { computed, ref, watch, unref } from 'vue'
import { ListItem } from './data'
import { isNumber } from 'lodash-es'

const props = defineProps<{
  list: Array<ListItem>
  pageSize?: number
  currentPage?: number
  titleRows?: number
  descRows?: number
  onTitleClick?: (Recordable) => void
}>()
const current = ref(props.currentPage || 1)
const getData = computed(() => {
  if (props.pageSize === -1) return []
  let size = isNumber(props.pageSize) ? props.pageSize : 5
  return props.list.slice(size * (unref(current) - 1), size * unref(current))
})
watch(
  () => props.currentPage,
  (v) => {
    current.value = v || 1
  },
)

function handleTitleClick(item: ListItem) {
  props.onTitleClick?.(item)
}
</script>
<template>
  <WmqList class="vben-header-notify-list" bordered>
    <WmqListItem v-for="item in getData" :key="item.id">
      <WmqThing>
        <template #header>
          <WmqEllipsis class="w-40 text-sm cursor-pointer" @click="handleTitleClick">
            {{ item.title }}
          </WmqEllipsis>
        </template>

        <template #avatar>
          <WmqAvatar v-if="item.avatar" round :src="item.avatar" />
          <span v-else> {{ item.avatar }}</span>
        </template>

        <template #description>
          <div v-if="item.type == '3'">
            <WmqTag size="small" :type="item.color">
              {{ item.extra }}
            </WmqTag>
            <div class="text-gray-600 text-sm py-1">
              {{ item.description }}
            </div>
          </div>
          <div v-else class="text-gray-400 text-xs">
            {{ item.datetime }}
          </div>
        </template>
      </WmqThing>
    </WmqListItem>
  </WmqList>
</template>

<style lang="less" scoped>
.vben-header-notify-list {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
