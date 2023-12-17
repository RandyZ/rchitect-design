<script setup lang="ts">
import { computed, unref } from 'vue-demi'
import { triggerWindowResize } from '@rchitect-rock/tools'
import { useRoute } from '@rchitect-rock/router';
import { useHeaderSetting, useHeaderSettingAction, useMenuSettingManager } from "#/hooks";

const headerSetting = useHeaderSetting();
const headerSettingAction = useHeaderSettingAction();
const { getShowMenu, setMenuSetting } = useMenuSettingManager();

const getShowHeader = computed(() => unref(headerSetting).show)
const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));
const route = useRoute();

const isQueryFull = computed(() => (route.query && Reflect.has(route.query, '__full__')));

const getIcon = computed(() => {
  return unref(getIsUnFold) || isQueryFull.value ? 'codicon:screen-normal' : 'codicon:screen-full';
});

function handleFold() {
  const isUnFold = unref(getIsUnFold);
  if (isQueryFull.value) return;
  setMenuSetting({
    show: isUnFold,
    hidden: !isUnFold,
  });
  headerSettingAction.setProjectConfig({headerSetting: { show: isUnFold }});
  triggerWindowResize();
}
</script>

<template>
  <div @click="handleFold"
       class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer">
    <WmqIconify :icon="getIcon"/>
  </div>
</template>

<style scoped lang="css"></style>
