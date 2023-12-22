<template>
  <BasicTitle v-if="!isDetail" :class="prefixCls">
    <slot name="title"></slot>
    {{ !$slots.title ? title : '' }}
  </BasicTitle>

  <div :class="[prefixCls, `${prefixCls}--detail`]" v-else>
    <span :class="`${prefixCls}__twrap`">
      <span @click="handleClose" v-if="showDetailBack">
        <WmqIconify icon="ant-design:arrow-left-outlined" :class="`${prefixCls}__back`"/>
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}__toolbar`">
      <slot name="titleToolbar"></slot>
    </span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import BasicTitle from '#/basic-title';
  import { WmqIconify } from '@rchitect-rock/components'
  import { propTypes } from '@rchitect-design/types'
  import { useDesign } from '@rchitect-rock/hooks';

  export default defineComponent({
    name: 'BasicDrawerHeader',
    components: { BasicTitle, WmqIconify },
    props: {
      isDetail: propTypes.bool,
      showDetailBack: propTypes.bool,
      title: propTypes.string,
    },
    emits: ['close'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('basic-drawer-header');
      function handleClose() {
        emit('close');
      }

      return { prefixCls, handleClose };
    },
  });
</script>

<style lang="less">
  @namespace: 'vben';
  @prefix-cls: ~'@{namespace}-basic-drawer-header';
  @footer-height: 60px;
  .@{prefix-cls} {
    display: flex;
    align-items: center;
    height: 100%;

    &__back {
      padding: 0 12px;
      cursor: pointer;

      &:hover {
        //color: @primary-color;
      }
    }

    &__twrap {
      flex: 1;
    }

    &__toolbar {
      padding-right: 50px;
    }
  }
</style>
