<script lang="ts" setup>
import SettingDrawer from "./SettingDrawer.vue";
import {ref} from "vue";
import { useComosables } from "#/layouts/useComosables";
import { RockComponent, useComponent } from "@rchitect-rock/components";

const settingDrawerVisible = ref(false)
const WmqAffix = useComponent(RockComponent.Affix)
const { contentRef } = useComosables()
</script>
<template>
  <WmqAffix @click="settingDrawerVisible = true"
             class="z-999 p-10px flex-center text-white border-rd-l bg-[#0960bd] right-0 !top-2/5 cursor-pointer"
             :trigger-top="240"
             :listen-to="contentRef">
    <WmqIconify
      icon="ion:settings-outline"
      hoverPointer
    />
  </WmqAffix>
  <SettingDrawer v-model:visible="settingDrawerVisible" />
</template>
