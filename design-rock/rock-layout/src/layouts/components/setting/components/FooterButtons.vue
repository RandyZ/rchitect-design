<script lang="ts" setup>
// import { resolveContextOptions } from "#/../bridge";
import { useI18n } from '@rchitect-rock/locale'
// import { writeTextToClipboard, useAppStateStore } from '@rchitect-rock/hooks'
import { unref } from "vue";
import { useAppSettingAction, useAppStateActions, useUserAction } from "#/hooks";
import { diKT } from "@rchitect-rock/ioc";
import Beans from "#/../beankeys";

const { t } = useI18n();
// const {
//   useConfigStore,
// } = resolveContextOptions();
const appSettingAction = useAppSettingAction()
const multipleTabActions = diKT(Beans.MultipleTabActions)
const userAction = useUserAction()
const configStore = useConfigStore()

const handleCopy = () => {
  writeTextToClipboard(JSON.stringify(unref(configStore.getProjectConfig), null, 2))
  // const { isSuccessRef } = useCopyToClipboard(
  //   JSON.stringify(unref(configStore.getProjectConfig), null, 2),
  // );
  // unref(isSuccessRef) &&
  // createSuccessModal({
  //   title: t('layout.setting.operatingTitle'),
  //   content: t('layout.setting.operatingContent'),
  // });
}

const handleReset = () => {
  try {
    configStore.resetProjectConfig();
    // const { colorWeak, grayMode } = defaultSetting;
    // updateTheme(themeColor);
    // updateColorWeak(colorWeak);
    // updateGrayMode(grayMode);
    // createMessage.success(t('layout.setting.resetSuccess'));
  } catch (error: any) {
    // createMessage.error(error);
  }
}

const handleClearAndRedo = () => {
  localStorage.clear()
  appSettingAction.resetAllState()
  // permissionStore.resetState()
  multipleTabActions.resetState()
  userAction.resetState()
  location.reload()
}
</script>
<template>
  <WmqSpace vertical>
    <WmqButton type="info" block @click="handleCopy">
      <template #icon>
        <WmqIconify icon="ant-design:snippets-twotone" />
      </template>
      {{ t('layout.setting.copyBtn') }}
    </WmqButton>
    <WmqButton type="warning" @click="handleReset" block>
      <template #icon>
        <WmqIconify icon="ant-design:reload-outlined" />
      </template>
      {{ t('common.resetText') }}
    </WmqButton>
    <WmqButton type="error" block @click="handleClearAndRedo">
      <template #icon>
        <WmqIconify icon="ant-design:redo-outlined" />
      </template>
      {{ t('layout.setting.clearBtn') }}
    </WmqButton>
  </WmqSpace>
</template>
