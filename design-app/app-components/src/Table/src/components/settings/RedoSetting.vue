<template>
  <WmqTooltip placement="top">
    <template #content>
      <span>{{ t('common.redo') }}</span>
    </template>
    <WmqIconify icon="ant-design:redo-outlined" @click="redo" />
  </WmqTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { WmqIconify } from '@weiming-rock/components'
  import { useI18n } from  '@weiming-rock/locale';
  import { useTableContext } from '../../hooks/useTableContext';

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      WmqIconify,
    },
    setup() {
      const table = useTableContext();
      const { t } = useI18n();

      function redo() {
        table.reload();
      }

      return { redo, t };
    },
  });
</script>
