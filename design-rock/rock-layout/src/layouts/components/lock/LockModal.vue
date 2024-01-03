<script lang="ts" setup>
import { computed, ref, unref } from 'vue-demi'
import { useI18n } from '@rchitect-rock/locale'
import { RockComponent, useComponent, useForm } from '@rchitect-rock/components'
// TODO 使用inject获取图片资源
// import headerImg from '@/assets/images/header.jpg'
import { useAppLockActions, useUserState } from "#/hooks";

const { t } = useI18n()

const props = defineProps({
  show: {
    type: Boolean,
  },
})

const WmqH5 = useComponent(RockComponent.H5)
const userStore = useUserState()
const lockActions = useAppLockActions()
const getUserInfo = computed(() => {
  const { realName = 'WeiMing Admin', avatar, desc } = unref(userStore.userInfo) || {}

  return { realName, avatar: avatar || 'headerImg', desc }
})
const emits = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (val) => {
    emits('update:show', val)
  },
})

const formRef = ref(undefined)
const [register, { getFieldValue, validate }] = useForm({
  schemas: [
    {
      gridItemProps: {
        span: 24,
      },
      field: 'password',
      label: t('layout.header.lockScreenPassword'),
      component: 'InputPassword',
      componentProps: {
        placeholder: t('layout.header.lockScreenPassword'),
        showPasswordOn: 'mousedown',
      },
      rule: {
        required: true,
        message: t('layout.header.lockScreenPassword'),
        trigger: ['input', 'blur'],
      },
    },
  ],
})

const formModel = ref({
  password: '',
})

const handleLock = async () => {
  await validate((errors) => {
    if (!errors) {
      const { password } = getFieldValue()
      lockActions.setLockInfo({
        isLock: true,
        pwd: password,
      })
    }
  })
}
</script>

<template>
  <WmqModal
    v-model:show="showModal"
    :title="t('layout.header.lockScreen')"
    preset="card"
  >
    <WmqSpace vertical align="center">
      <WmqAvatar round :size="64" :src="getUserInfo.avatar" />
      <WmqH5>{{ getUserInfo.realName }}</WmqH5>
    </WmqSpace>
    <WmqForm
      @register="register"
      ref="formRef"
      v-model:model="formModel"
      label-placement="left"
    />
    <WmqButton type="info" block @click="handleLock">
      {{ t('layout.header.lockScreenBtn') }}
    </WmqButton>
  </WmqModal>
</template>

<style lang="less" scoped></style>
