<script setup lang="ts">
import type { Menu } from '@rchitect-design/types'
import { nextTick } from "vue-demi"
import startsWith from 'lodash-es/startsWith';
import { MenuFunctions, useRouter } from "@rchitect-rock/router";
import { useI18n } from '@rchitect-rock/locale'

defineOptions({
  name: 'HeaderRecommendMenu',
})

const router = useRouter();
const { t } = useI18n()
const { menus, currentRoute } = MenuFunctions.useMenusAtLevel()

const resetChildren = (list): Menu[] => {
  return list.filter(el => el.children);
};

const onGoToPath = (item) => {
  nextTick(() => {
    router.push({ path: item.path })
  })
};
</script>

<template>
  <div class="flex h-full grid-items-center justify-left">
    <WmqPopover
      v-for="(item, index) of menus"
      :key="index"
      placement="bottom"
      :show-arrow="false"
      :scrollable="true"
      :disabled="!resetChildren(item.children || []).length"
    >
      <template #trigger>
        <WmqButton
          :quaternary="!startsWith(currentRoute.path, item.path)"
          :tertiary="startsWith(currentRoute.path, item.path)"
          type="text"
          :strong="startsWith(currentRoute.path, item.path)"
          @click="onGoToPath(item)"
          class="mx-1 cursor-pointer whitespace-nowrap overflow-hidden c-[var(--header-main-color)]">
          <template #icon>
            <WmqIconify :icon="item.icon" />
          </template>
          {{ t(item.title) }}
        </WmqButton>
      </template>
      <div class="flex flex-nowrap box-border p-3">
        <div v-for="(child, i) of resetChildren(item.children || [])"
                :key="i"
                class="border-r-[1px]"
                :class="{
                  'border-r-solid border-slate-300 mr-[10px]': i < resetChildren(item.children || []).length -1
                }">
          <h4 class="m-[0px] text-[16px] fw-[500]">{{ t(child.title) }}</h4>
          <div v-for="(ele, index) of child.children"
              :key="index"
               class="w-[140px] cursor-pointer leading-[28px]"
               @click="onGoToPath(ele)"
          >
            <template v-if="ele.meta.hideMenu !== true">
              <WmqIconify :icon="child.icon">
              </WmqIconify>
              {{ t(ele.title) }}
            </template>
          </div>
        </div>
      </div>
    </WmqPopover>
  </div>
</template>
