<template>
  <div>
    <slot name="insertFooter"></slot>
    <WmqButton v-bind="cancelButtonProps" @click="handleCancel" v-if="showCancelBtn">
      {{ cancelText }}
    </WmqButton>
    <slot name="centerFooter"></slot>
    <WmqButton
      :type="okType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      v-if="showOkBtn"
    >
      {{ okText }}
    </WmqButton>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { basicProps } from '../props';

  export default defineComponent({
    name: 'BasicModalFooter',
    props: basicProps,
    components: {
    },
    emits: ['ok', 'cancel'],
    setup(_, { emit }) {
      function handleOk(e: Event) {
        emit('ok', e);
      }

      function handleCancel(e: Event) {
        emit('cancel', e);
      }

      return { handleOk, handleCancel };
    },
  });
</script>
