<script lang="ts" setup>
import { reactive, ref, unref, computed, onMounted } from 'vue';
import { useI18n } from '@rchitect-rock/locale';
import { useNotice, useDialog } from '@rchitect-rock/components'
import { LoginStateEnum } from '../constant'
import {
  useLoginState,
  useFormRules,
} from '../usage';
import LoginFormTitle from './login-form-title.vue';
import { diKT } from '@rchitect-rock/ioc'
import { Beans as layoutBeans } from '@rchitect-rock/layouts'
import { Beans } from '#/../beankeys'

const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const { t } = useI18n();
const userStore = diKT(layoutBeans.UserAction);
const { setLoginState, getLoginState } = useLoginState();
const { getFormRules } = useFormRules();

const dialog = useDialog();
const codeUrl = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAnCAYAAAC2c+5GAAAAZ0lEQVRoge3QMRHAMBDAsCT8YT6PZutgAu0gIfB5z8yzeJ2vA/7GkDAkDAlDwpAwJAwJQ8KQMCQMCUPCkDAkDAlDwpAwJAwJQ8KQMCQMCUPCkDAkDAlDwpAwJAwJQ8KQMCQMCUPCkLgMcgP5gqyNnwAAAABJRU5ErkJggg==')

const formData = reactive({
  account: 'admin',
  password: 'S1234588',
  captchaCode: '',
  uuid: ''
});

// const { validForm } = useFormValid(formRef);
//onKeyStroke('Enter', handleLogin);

const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
const notice = useNotice();
async function handleLogin() {
  // 暂时不做校验
  // const data = await validForm()
  // if (!data) return
  try {
    loading.value = true;
    const userInfo = await userStore.login({
      password: formData.password,
      username: formData.account,
      uuid: formData.uuid,
      captchaCode: formData.captchaCode,
      mode: 'none' //不要默认的错误提示
    });

    if (userInfo) {
      notice.success({
        content: t('sys.login.loginSuccessTitle'),
        meta: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realname}`,
        duration: 3000
      });
    }
  } catch (error) {
    console.log('登录失败', error);
    dialog.error({
      title: t('sys.api.errorTip'),
      content:
        (error as unknown as Error).message || t('sys.api.networkExceptionMsg')
    });
  } finally {
    loading.value = false;
  }
}

const { getCaptchaImage } = diKT(Beans.Repository)
function getCode() {
  getCaptchaImage().then((imgData) => {
    if (imgData) {
      codeUrl.value = imgData.img;
      formData.uuid = imgData.uuid;
    } else {
      Promise.reject(new Error('获取验证码失败'));
    }
  }).catch((err) => {
    console.log(err);
    notice.warning({
      content: '验证码获取失败',
      meta: `验证码获取失败，请稍后重试`,
      duration: 3000
    });
  })
}

onMounted(() => {
  getCode()
})

</script>
<template>
  <login-form-title v-show="show" class="enter-x" />
  <wmq-form :model="formData" :rules="getFormRules" ref="formRef" v-show="show" @keypress.enter="handleLogin">
    <wmq-form-item class="enter-x" inline :show-label="false">
      <wmq-input size="large" v-model:value="formData.account" :placeholder="t('sys.login.userName')"
        class="fix-auto-fill" />
    </wmq-form-item>
    <wmq-form-item class="enter-x" inline :show-label="false">
      <wmq-input type="password" show-password-on="click" size="large" v-model:value="formData.password"
        :placeholder="t('sys.login.password')" />
    </wmq-form-item>
    <!--    <wmq-form-item class="enter-x" inline :show-label="false">-->
    <!--      <wmq-input type="password" size="large" style="width: 80%" v-model:value="formData.captchaCode"-->
    <!--                 :placeholder="t('sys.login.verificationCode')" />-->
    <!--      <div class="login-code" >-->
    <!--        <img :src="codeUrl" @click="getCode" class="login-code-img" />-->
    <!--      </div>-->
    <!--    </wmq-form-item>-->

    <wmq-grid class="enter-x">
      <wmq-grid-item :span="12">
        <wmq-form-item inline :show-label="false">
          <!-- No logic, you need to deal with it yourself -->
          <wmq-checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </wmq-checkbox>
        </wmq-form-item>
      </wmq-grid-item>
      <wmq-grid-item :span="12">
        <wmq-form-item inline :show-label="false" class="justify-items-end">
          <!-- No logic, you need to deal with it yourself -->
          <wmq-button text tag="a" type="primary" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </wmq-button>
        </wmq-form-item>
      </wmq-grid-item>
    </wmq-grid>

    <wmq-form-item class="enter-x" inline :show-label="false">
      <wmq-button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </wmq-button>
    </wmq-form-item>

    <wmq-grid class="enter-x" :cols="3">
      <wmq-grid-item :md="8" :xs="24">
        <wmq-button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </wmq-button>
      </wmq-grid-item>
      <wmq-grid-item :md="8" :xs="24" class="!my-2 md:!my-0 xs:mx-0 md:mx-2">
        <wmq-button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </wmq-button>
      </wmq-grid-item>
      <wmq-grid-item :md="7" :xs="24">
        <wmq-button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </wmq-button>
      </wmq-grid-item>
    </wmq-grid>

    <wmq-divider class="enter-x">{{ t('sys.login.otherSignIn') }}</wmq-divider>

    <div class="flex justify-evenly enter-x" :class="`sign-in-way`">
      <WmqIconify icon="ant-design:github-filled" />
      <WmqIconify icon="ant-design:wechat-filled" />
      <WmqIconify icon="ant-design:alipay-circle-filled" />
      <WmqIconify icon="ant-design:google-circle-filled" />
      <WmqIconify icon="ant-design:twitter-circle-filled" />
    </div>
  </wmq-form>
</template>

<style lang="less" scope>
.login-code {
  width: 30%;
  height: 40px;
  float: right;
  padding-left: 12px;

  img {
    cursor: pointer;
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }
}
</style>
