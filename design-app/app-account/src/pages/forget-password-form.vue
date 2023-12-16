<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { LoginStateEnum } from '../constant'
import { useLoginState, useFormRules } from '../usage'
import { CountDownInput } from '@rchitect-app/components'
import { useI18n } from '@rchitect-rock/locale'
import LoginFormTitle from './login-form-title.vue'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  mobile: '',
  sms: '',
})

const show = computed(
  () => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD,
)

async function handleReset() {
  const form = unref(formRef)
  if (!form) return
  await form.resetFields()
}
</script>

<template>
  <template v-if="show">
    <login-form-title class="enter-x" />
    <wmq-form :model="formData" :rules="getFormRules" ref="formRef">
      <wmq-form-item name="account" class="enter-x" inline :show-label="false">
        <wmq-input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </wmq-form-item>

      <wmq-form-item name="mobile" class="enter-x" inline :show-label="false">
        <wmq-input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
        />
      </wmq-form-item>
      <wmq-form-item name="sms" class="enter-x" inline :show-label="false">
        <count-down-input
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </wmq-form-item>

      <div class="enter-x">
        <wmq-button
          type="primary"
          size="large"
          block
          @click="handleReset"
          :loading="loading"
        >
          {{ t('common.resetText') }}
        </wmq-button>
        <wmq-button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </wmq-button>
      </div>
    </wmq-form>
  </template>
</template>
