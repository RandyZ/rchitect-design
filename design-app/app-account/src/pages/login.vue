<script lang="ts" setup>
import { useI18n } from '@rchitect-rock/locale'
import { createNamespace, getGlobalConfig } from '@rchitect-rock/tools'
import LoginForm from './login-form.vue'
import ForgetPasswordForm from './forget-password-form.vue'
import RegisterForm from './register-form.vue'
import MobileForm from './mobile-form.vue'
import QrCodeForm from './qrcode-form.vue'
import OAuthForm from './oauth-form.vue'
import { DarkModeToggle } from '@rchitect-rock/layouts'
import { AuthorizationModeEnum } from '@rchitect-design/constants'
import { computed } from 'vue'
const { bem } = createNamespace('login')

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
})
const { title, authMode } = getGlobalConfig(import.meta.env)
const { t } = useI18n()
// 是否是应用自身登录模式
const isSelfLogin = computed(() => authMode === AuthorizationModeEnum.SELF_LOGIN)
</script>

<template>
  <div :class="bem()">
    <div :class="bem('ani_bg')">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div :class="bem('slogan')" class="hidden xl:flex">
      <div class="-enter-x flex p-[20px]">
        <img :title="title" class="h-[35px]" :alt="t('sys.app.name')" src="@/assets/images/logo-white.png"/>
      </div>
      <div class="my-auto">
        <img
          :alt="title"
          src="@/assets/svg/login-box-bg.svg"
          class="w-2/3 -enter-x"
        />
        <div class="mt-10 font-medium text-white -enter-x">
          <span class="inline-block mt-4 text-2xl">
            {{ t('sys.login.signInTitle') }}</span
          >
        </div>
        <div class="mt-4 font-normal text-white text-md -enter-x">
          {{ t('sys.login.signInDesc') }}
        </div>
      </div>
    </div>
    <div :class="[bem('form'), 'enter-x']">
      <div class="absolute mt-4 right-4"><DarkModeToggle /></div>
      <div
        class="sm:w-4/6 xl:w-4/5 w-full mx-auto my-auto p-4 rounded-md shadow-md xl:shadow-none"
      >
        <wmq-card v-if="isSelfLogin">
          <login-form />
          <forget-password-form />
          <register-form />
          <mobile-form />
          <qr-code-form />
        </wmq-card>
        <wmq-card v-else>
          <OAuthForm />
        </wmq-card>
      </div>
    </div>
  </div>
</template>

<style lang="less">
//@dark-bg: #293146;

html[class='dark'] {
  .login {
    background-color: #18181c;
    &::before {
      background-image: url(@/assets/svg/login-bg-dark.svg);
    }
  }
}

.login {
  height: 100%;
  width: 100%;
  min-height: 100%;
  display: flex;

  &__slogan {
    min-height: 100%;
    padding-left: 50px;
    margin-right: 40px;
    flex-direction: column;
  }

  &__slogan,
  &__form {
    flex: 1;
  }

  &__form {
    display: flex;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
  }

  &__logo {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: absolute;
    top: 12px;
    height: 80px;
    &-title {
      font-size: 24px;
      color: #fff;
      margin-left: 8px;
    }
    img {
      width: 48px;
    }
  }

  &__ani_bg {
    position: fixed;
    width: 55%;
    height: 100%;
    right: 0;

    .circles{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .circles li{
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: rgba(43, 64, 173, 0.3);
      animation: animate 25s linear infinite;
      bottom: -150px;
    }

    .circles li:nth-child(1){
      left: 25%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
    }


    .circles li:nth-child(2){
      left: 10%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
    }

    .circles li:nth-child(3){
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
    }

    .circles li:nth-child(4){
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 18s;
    }

    .circles li:nth-child(5){
      left: 65%;
      width: 20px;
      height: 20px;
      animation-delay: 0s;
    }

    .circles li:nth-child(6){
      left: 75%;
      width: 110px;
      height: 110px;
      animation-delay: 3s;
    }

    .circles li:nth-child(7){
      left: 35%;
      width: 150px;
      height: 150px;
      animation-delay: 7s;
    }

    .circles li:nth-child(8){
      left: 50%;
      width: 25px;
      height: 25px;
      animation-delay: 15s;
      animation-duration: 45s;
    }

    .circles li:nth-child(9){
      left: 20%;
      width: 15px;
      height: 15px;
      animation-delay: 2s;
      animation-duration: 35s;
    }

    .circles li:nth-child(10){
      left: 85%;
      width: 150px;
      height: 150px;
      animation-delay: 0s;
      animation-duration: 11s;
    }



    @keyframes animate {

      0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
      }

      100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
      }

    }
  }

  .sign-in-way {
    .anticon {
      font-size: 22px;
      color: #888;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .count-down-input input {
    min-width: unset;
  }
}
</style>
