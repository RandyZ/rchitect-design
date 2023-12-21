<template>
  <EditTableHeaderCell v-if="getIsEdit">
    {{ getTitle }}
  </EditTableHeaderCell>
  <span v-else>{{ getTitle }}</span>
  <BasicHelp v-if="getHelpMessage" :text="getHelpMessage" :class="`${prefixCls}__help`" />
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import type { BasicColumn } from '#/Table/src/types/table';
  import { defineComponent, computed } from 'vue';
  // TODO: 路径
  import BasicHelp from '#/basic-help/index.vue';
  import EditTableHeaderCell from '#/Table/src/components/EditTableHeaderIcon.vue';
  import { useDesign } from '@rchitect-rock/hooks';

  export default defineComponent({
    name: 'TableHeaderCell',
    components: {
      EditTableHeaderCell,
      BasicHelp,
    },
    props: {
      column: {
        type: Object as PropType<BasicColumn>,
        default: () => ({}),
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-header-cell');

      const getIsEdit = computed(() => !!props.column?.edit);
      const getTitle = computed(() => props.column?.customTitle || props.column?.title);
      const getHelpMessage = computed(() => props.column?.helpMessage);

      return { prefixCls, getIsEdit, getTitle, getHelpMessage };
    },
  });
</script>
<style lang="less">
  //@prefix-cls: ~'@{namespace}-basic-table-header-cell';
  //
  //.@{prefix-cls} {
  //  &__help {
  //    margin-left: 8px;
  //    color: rgb(0 0 0 / 65%) !important;
  //  }
  //}
</style>
