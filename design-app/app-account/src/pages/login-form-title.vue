<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from '@rchitect-rock/locale'
import { LoginStateEnum } from '../constant'
import { useLoginState } from '../usage'

const { t } = useI18n()

const { getLoginState } = useLoginState()

const formTitle = computed(() => {
  const titleMap = {
    [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
    [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
    [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
    [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
    [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
    [LoginStateEnum.OAUTH_CODE]: t('sys.login.weimingOAuthTitle'),
  }
  return (titleMap as any)[unref(getLoginState)]
})
</script>
<template>
  <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    {{ formTitle }}
  </h2>
</template>
