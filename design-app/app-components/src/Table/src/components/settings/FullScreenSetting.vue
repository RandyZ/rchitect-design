<template>
  <WmqTooltip placement="top">
    <template #content>
      <span>{{ t('component.table.settingFullScreen') }}</span>
    </template>
    <WmqIconify icon="ant-design:fullscreen-outlined" @click="toggle" v-if="!isFullscreen"/>
    <WmqIconify icon="ant-design:fullscreen-exit-outlined" @click="toggle" v-else />
  </WmqTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { WmqIconify } from '@rchitect-rock/components'
  import { useFullscreen } from '@rchitect-rock/tools';
  import { useI18n } from  '@rchitect-rock/locale';
  import { useTableContext } from '../../hooks/useTableContext';

  export default defineComponent({
    name: 'FullScreenSetting',
    components: {
      WmqIconify
    },

    setup() {
      const table = useTableContext();
      const { t } = useI18n();
      const { toggle, isFullscreen } = useFullscreen(table.wrapRef);

      return {
        toggle,
        isFullscreen,
        t,
      };
    },
  });
</script>
