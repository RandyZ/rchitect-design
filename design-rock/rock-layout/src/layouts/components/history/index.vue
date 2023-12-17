<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "@rchitect-rock/router";
import type { Ref } from "vue";
import { watch, ref } from 'vue-demi'
import {useI18n} from "@rchitect-rock/locale";
import { MenuFunctions, useRoute, useRouter } from "@rchitect-rock/router";
defineOptions({
  name: "LayoutUseageHistoryComponent",
})
const emit = defineEmits(["selectMenu"])

const { t } = useI18n()
const queue: Ref<RouteLocationNormalizedLoaded[]> = ref([]);
const router = useRouter();
const currentRoute = useRoute()
const currentRouteRef = ref(currentRoute)

const queueControls = async () => {
  const index = queue.value.findIndex((item) => item.name === currentRoute.name);
  if(index !== -1){
    queue.value.splice(index, 1);
  }
  queue.value.unshift(currentRoute);
  const menus = await MenuFunctions.getMenus();
  const [ first ] = getChidlren(menus, currentRoute.name);
  first && emit("selectMenu", first);
};

function getChidlren(tree: any[], name, path: any[] = []) {
  for (var i = 0; i < tree.length; i++) {
    var tempPath:any[] = [...path]
    tempPath.push(tree[i])
    if (tree[i].name === name) {
      return tempPath
    }
    if (tree[i].children) {
      const reuslt = getChidlren(tree[i].children, name, tempPath)
      if (reuslt) {
        return reuslt
      }
    }
  }
  return [];
}

const onGoToPath = async (item) => {
  const menus = await MenuFunctions.getMenus();
  const [ first ] = getChidlren(menus, item.name);
  router.push(item);
  first && emit("selectMenu", first);
};

watch(() => router.currentRoute.value , queueControls, { immediate: true });
</script>
<template>
  <WmqPopover trigger="click" :show-arrow="false">
    <template #header>
      <WmqText type="info" strong depth="1" :ellipsis="true">
        功能历史
      </WmqText>
    </template>
    <template #trigger>
      <div ref="triggerRef" size="mini" class="
        flex grid-items-center justify-center flex-shrink-0
        h-[40px] text-center leading-[40px] w-[50px]
      ">
        <WmqButton text size="medium" >
          <template #icon>
            <WmqIconify icon="material-symbols:deployed-code-history-outline" size="25px" color="var(--header-main-color)"/>
          </template>
        </WmqButton>
      </div>
    </template>
    <div>
      <div v-for="(item) of queue"
           :key="item.name || ''"
           class="p-[5px] cursor-pointer"
           :class="{
             'text-[red]': item.name === currentRouteRef.meta.name
           }"
           @click="onGoToPath(item)">{{ t(item.meta.title) }} {{ currentRouteRef.name }}</div>
    </div>
  </WmqPopover>
</template>
