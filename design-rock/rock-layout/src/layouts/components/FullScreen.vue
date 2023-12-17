<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from '@rchitect-rock/locale'

import { useFullscreen } from '@rchitect-rock/tools'
const { t } = useI18n()
const { toggle, isFullscreen } = useFullscreen()

const getTitle = computed(() => {
  return unref(isFullscreen)
    ? t('layout.header.tooltipExitFull')
    : t('layout.header.tooltipEntryFull')
})
</script>

<template>
  <WmqPopover :title="getTitle" placement="bottom" :duration="500">
    <template #trigger>
      <span @click="toggle" class="flex items-center">
        <WmqIconify
          icon="ant-design:fullscreen-outlined"
          hoverPointer
          v-if="!isFullscreen"
        />
        <WmqIconify icon="ant-design:fullscreen-exit-outlined" v-else />
      </span>
    </template>
    <span>{{ getTitle }}</span>
  </WmqPopover>
</template>
