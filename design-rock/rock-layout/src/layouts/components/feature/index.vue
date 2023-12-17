<script lang="ts" setup>
import { SettingButtonPosition } from '../setting'
import { computed, unref } from "vue";
import { SettingButtonPositionEnum } from '@rchitect-design/constants'
import { useHeaderSetting, useSporadicSetting } from "#/hooks";

defineOptions({
  name: 'SettingFeatureDrawer'
})

// const { getShowSettingButton, getSettingButtonPosition, getFullContent } = useRootSetting();
const headerSetting = useHeaderSetting();
const sporadicSetting = useSporadicSetting();
const getIsFixedSettingDrawer = computed(() => {
  if (!unref(sporadicSetting).showSettingButton) {
    return false;
  }
  const settingButtonPosition = unref(sporadicSetting).settingButtonPosition;
  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return !unref(headerSetting).show || unref(sporadicSetting).fullContent;
  }
  return settingButtonPosition === SettingButtonPositionEnum.FIXED;
});
</script>
<template>
  <SettingButtonPosition v-if="getIsFixedSettingDrawer" />
</template>