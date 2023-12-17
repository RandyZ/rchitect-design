<script lang="ts" setup>
import {h, ref, unref} from 'vue-demi'
import { useI18n } from '@rchitect-rock/locale'
import { WmqIconify } from '@rchitect-rock/components'
import LockModal from '../lock/LockModal.vue'
import UserInfo from './user-info.vue'
import { useUserAction } from "#/hooks";

const { t } = useI18n()
const userAction = useUserAction()
const renderIcon = (props, children?: any) => {
  return () => {
    return h(WmqIconify, props, children)
  }
}

const options = ref([
  {
    label: t('文档'),
    key: 'doc',
    icon: renderIcon({
      icon: 'carbon:document',
    }),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: t('锁定屏幕'),
    key: 'lock',
    icon: renderIcon({
      icon: 'ant-design:lock-outlined',
    }),
  },
  {
    label: t('退出系统'),
    key: 'logout',
    icon: renderIcon({
      icon: 'ri:shut-down-line',
    }),
  },
])

const showLockModal = ref(false)

const handleSelect = (key) => {
  switch (key) {
    case 'logout':
      handleLoginOut()
      break
    case 'doc':
      openDoc()
      break
    case 'lock':
      handleLock()
      break
  }
}

const handleLoginOut = () => {
  userAction.logout(true)
}

const openDoc = () => {
  // openWindow(DOC_URL)
}

const handleLock = () => {
  showLockModal.value = !unref(showLockModal)
}
</script>

<template>
  <WmqDropdown trigger="hover" :options="options" @select="handleSelect">
    <UserInfo />
  </WmqDropdown>
  <LockModal v-model:show="showLockModal"/>
</template>
