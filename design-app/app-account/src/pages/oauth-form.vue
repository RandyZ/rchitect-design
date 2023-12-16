<script lang="ts" setup>
import { computed, unref, onMounted } from 'vue'
import { useI18n } from '@weiming-rock/locale'
import LoginFormTitle from './login-form-title.vue'
import { AuthorizationModeEnum } from '@weiming-rock/constants';
import { useDialog } from '@weiming-rock/components';
import { LoginStateEnum } from '../index';
import { useLoginState } from '../usage';
import { useGlobConfig } from '@weiming-rock/hooks';
const { handleBackLogin, getLoginState, mode, isAutoLogin } = useLoginState()
const { t } = useI18n()
const showBackBtn = computed(() => mode !== AuthorizationModeEnum.OAUTH2_CODE && unref(getLoginState) === LoginStateEnum.OAUTH_CODE)
const showAutoLogin = computed(() => mode === AuthorizationModeEnum.OAUTH2_CODE && !unref(isAutoLogin))
onMounted(() => {
  if (mode === AuthorizationModeEnum.OAUTH2_CODE) {
    if (!showAutoLogin.value) {
      setTimeout(() => {
        login()
      }, 1000)
    }
  } else {
    useDialog().warning({
      title: '警告',
      content: 'OAuth2授权模式不是CODE模式，将无法使用OAuth2登录，请联系管理员！',
      closable: false,
      closeOnEsc: false,
      maskClosable: false,
    })
  }
})
const login = () => {
  const { oauthCodeServer } = useGlobConfig();
  if (oauthCodeServer) {
    window.location.href = oauthCodeServer
  } else {
    useDialog().warning({
      title: '警告',
      content: '网站配置异常，请检查是否设置了ResourceServer地址',
      closable: false,
      closeOnEsc: false,
      maskClosable: false,
    })
  }
}
</script>

<template>
  <login-form-title class="enter-x" />
  <div class="enter-x min-w-64 min-h-64">
    <div class="flex flex-col justify-center items-center enter-x xl:justify-start" :width="280">
      <wmq-spinner :animation-duration="1000" :size="240" color="#1b4fab" />
    </div>
    <wmq-divider class="enter-x">{{ showAutoLogin ? '请登录' : t('sys.login.weimingOAuthRedicting') }}</wmq-divider>
    <div class="enter-x">
      <wmq-button block class="mt-4" @click="login" v-if="showAutoLogin">
        前往登录
      </wmq-button>
      <wmq-button v-if="showBackBtn" block class="mt-4" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </wmq-button>
    </div>
  </div>
</template>
