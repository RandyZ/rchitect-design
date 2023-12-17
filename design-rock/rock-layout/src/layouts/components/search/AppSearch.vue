<script lang="ts" setup>
import { useI18n } from '@rchitect-rock/locale'
import { Lib as stateLib } from '@rchitect-rock/state'
import { ref, watch } from 'vue'
import { SearchBoxEvents } from '#/layouts/components/search/SearchContext'
import AppSearchModal from './AppSearchModal.vue'
import { diKT } from '@rchitect-rock/ioc'
import { useMagicKeys } from '@rchitect-rock/tools'
const dataEventBus = diKT(stateLib.types.DataEventBus)
const { t } = useI18n()
const showModal = ref(false)
const keyboardKeys = useMagicKeys()
watch(keyboardKeys.current, (v) => {
  if (!showModal.value) {
    const [k1, k2] = v
    const isControl = ['control', 'meta'].includes(k1)
    const isK = k2 === 'k'
    if (isControl && isK) {
      showModal.value = true
    }
  }
})
dataEventBus.$watchWithVue(SearchBoxEvents.BoxClose, () => {
  showModal.value = false
})
function changeModal(show: boolean) {
  showModal.value = show
}
</script>

<template>
  <div class="flex items-center" @click="changeModal(true)">
    <WmqPopover placement="bottom">
      <template #trigger>
        <WmqIconify icon="ant-design:search-outlined" hoverPointer />
      </template>
      {{ t('common.searchText') }}
      (<WmqIconify icon="streamline:computer-keyboard-command-keyboard-mac-command-apple" />、CRTL + K)
    </WmqPopover>
    <AppSearchModal :visible="showModal" />
  </div>
</template>
