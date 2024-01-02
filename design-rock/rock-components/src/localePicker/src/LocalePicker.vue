<script lang="ts" setup>
import { ref, watchEffect, unref, computed } from 'vue-demi'
// import { context } from '#/../bridge'
import { useLocale, localeList } from '@rchitect-rock/locale'
import Dropdown from '#/dropdown/src/Dropdown.vue'
import Iconify from '#/iconify/src/Iconify.vue'
import { RockComponent } from '#/RockComponent'
import type { LocaleType } from "@rchitect-design/types";

defineOptions({
  name: 'LocalePicker',
  customOptions: {
    isPresetComponent: true,
  },
})

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: true },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean },
})

const selectedKeys = ref<string[]>([])


const { changeLocale, getLocale } = useLocale()

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

const getLocaleList = computed(() => {
  return localeList.map((item) => ({
    label: item.text,
    key: item.event,
  }))
})

watchEffect(() => {
  selectedKeys.value = [ unref(getLocale) ]
})

async function toggleLocale(lang:LocaleType) {
  await changeLocale(lang)
  selectedKeys.value = [ lang ]
  props.reload && location.reload()
}

function handleMenuEvent(menu:string) {
  if (unref(getLocale) === menu) {
    return
  }
  toggleLocale(menu as string)
}
</script>

<template>
  <Dropdown
      trigger="click"
      :options="getLocaleList"
      @select="handleMenuEvent"
  >
    <span class="flex items-center cursor-pointer">
      <Iconify icon="ion:language" hoverPointer/>
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </Dropdown>
</template>

<style lang="less"></style>
