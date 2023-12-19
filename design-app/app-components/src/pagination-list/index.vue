<template>
  <WmqList h-full flex flex-col>
    <template #header>
      <div flex flex-nowrap>
        <WmqPagination
            v-model:page="props.page"
            :item-count="totalCount"
            :page-size="pageSize"
            simple
            size="small"
            flex flex-nowrap
            :on-update:page="updatePage"
            text-nowrap
        />
        <div class="ml-[10px]" text-nowrap>共{{totalCount}}条</div>
        <slot name="header-right"/>
      </div>
    </template>
    <WmqScrollbar flex-1 class="mx-[-5px]">
      <WmqListItem v-for="(record, index) in dataSource" @click="clickItem(record)">
        <slot name="record" :record="record" :index="index" :page="page" :pageSize="pageSize" />
      </WmqListItem>
    </WmqScrollbar>
  </WmqList>
</template>

<script lang="ts" setup>
import VT from 'vue-types'
import { ref } from 'vue-demi'
import {watchEffect} from "vue";
const emit = defineEmits(['clickItem', 'pageChange', 'update:page'])

const props = defineProps({
  dataSource: VT.array,
  totalCount: VT.number,
  isPaged: VT.bool,
  pageSize: VT.number,
  page: VT.number
})

function clickItem(record) {
  emit('clickItem', record)
}

function updatePage(page) {
  emit('update:page', page, props.pageSize)
}
</script>

<style scoped>

</style>
