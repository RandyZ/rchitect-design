<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import { CountDownInput } from '@rchitect-rock/app-components'
import { useI18n } from '@rchitect-rock/locale'
import LoginFormTitle from './login-form-title.vue'
import { useFormRules, useFormValid, useLoginState } from '../usage';
import { LoginStateEnum } from '../index';

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false,
})

const { getFormRules } = useFormRules(formData)
const { validForm } = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>

<template>
  <template v-if="getShow">
    <login-form-title class="enter-x" />
    <wmq-form :model="formData" :rules="getFormRules" ref="formRef">
      <wmq-form-item name="account" class="enter-x" inline :show-label="false">
        <wmq-input
          class="fix-auto-fill"
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
      <wmq-form-item
        name="password"
        class="enter-x"
        inline
        :show-label="false"
      >
        <wmq-input
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </wmq-form-item>
      <wmq-form-item
        name="confirmPassword"
        class="enter-x"
        inline
        :show-label="false"
      >
        <wmq-input
          size="large"
          type="password"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </wmq-form-item>

      <wmq-form-item class="enter-x" name="policy" inline :show-label="false">
        <!-- No logic, you need to deal with it yourself -->
        <wmq-checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </wmq-checkbox>
      </wmq-form-item>

      <wmq-button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </wmq-button>
      <wmq-button
        size="large"
        block
        class="mt-4 enter-x"
        @click="handleBackLogin"
      >
        {{ t('sys.login.backSignIn') }}
      </wmq-button>
    </wmq-form>
  </template>
</template>
