<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <WmqTooltip :title="t('component.modal.restore')" placement="bottom" v-if="fullScreen">
        <WmqIconify icon="ant-design:fullscreen-exit-outlined" role="full" @click="handleFullScreen"/>
      </WmqTooltip>
      <WmqTooltip :title="t('component.modal.maximize')" placement="bottom" v-else>
        <WmqIconify icon="ant-design:fullscreen-exit-outlined" role="close" @click="handleFullScreen"/>

      </WmqTooltip>
    </template>
    <WmqTooltip :title="t('component.modal.close')" placement="bottom">
      <WmqIconify icon="ant-design:close-outlined" @click="handleCancel"/>
    </WmqTooltip>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { WmqIconify } from '@weiming-rock/components'
  import { useDesign } from '@weiming-rock/hooks';
  import { useI18n } from '@weiming-rock/locale';

  export default defineComponent({
    name: 'ModalClose',
    components: { WmqIconify },
    props: {
      canFullscreen: { type: Boolean, default: true },
      fullScreen: { type: Boolean },
    },
    emits: ['cancel', 'fullscreen'],
    setup(props, { emit }) {
      const { prefixCls } = useDesign('basic-modal-close');
      const { t } = useI18n();

      const getClass = computed(() => {
        return [
          prefixCls,
          `${prefixCls}--custom`,
          {
            [`${prefixCls}--can-full`]: props.canFullscreen,
          },
        ];
      });

      function handleCancel(e: Event) {
        emit('cancel', e);
      }

      function handleFullScreen(e: Event) {
        e?.stopPropagation();
        e?.preventDefault();
        emit('fullscreen');
      }

      return {
        t,
        getClass,
        prefixCls,
        handleCancel,
        handleFullScreen,
      };
    },
  });
</script>
<style lang="less">
  //@prefix-cls: ~'@{namespace}-basic-modal-close';
  //.@{prefix-cls} {
  //  display: flex;
  //  align-items: center;
  //  height: 95%;
  //
  //  > span {
  //    margin-left: 48px;
  //    font-size: 16px;
  //  }
  //
  //  &--can-full {
  //    > span {
  //      margin-left: 12px;
  //    }
  //  }
  //
  //  &:not(&--can-full) {
  //    > span:nth-child(1) {
  //      &:hover {
  //        font-weight: 700;
  //      }
  //    }
  //  }
  //
  //  & span:nth-child(1) {
  //    display: inline-block;
  //    padding: 10px;
  //
  //    &:hover {
  //      color: @primary-color;
  //    }
  //  }
  //
  //  & span:last-child {
  //    &:hover {
  //      color: @error-color;
  //    }
  //  }
  //}
</style>
