<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { CountDownInput } from '@rchitect-rock/app-components'
import { useI18n } from '@rchitect-rock/locale'
import LoginFormTitle from './login-form-title.vue'
import { useFormRules, useFormValid, useLoginState } from '../usage';
import { LoginStateEnum } from '../index';

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  mobile: '',
  sms: '',
})

const { validForm } = useFormValid(formRef)

const show = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>
<template>
  <template v-if="show">
    <login-form-title class="enter-x" />
    <wmq-form
      class="rd-2"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <wmq-form-item name="mobile" class="enter-x" inline :show-label="false">
        <wmq-input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </wmq-form-item>
      <wmq-form-item name="sms" class="enter-x" inline :show-label="false">
        <count-down-input
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </wmq-form-item>

      <div class="enter-x">
        <wmq-button
          type="primary"
          size="large"
          block
          @click="handleLogin"
          :loading="loading"
        >
          {{ t('sys.login.loginButton') }}
        </wmq-button>
        <wmq-button block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </wmq-button>
      </div>
    </wmq-form>
  </template>
</template>
