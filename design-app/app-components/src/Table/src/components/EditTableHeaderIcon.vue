<template>
  <span>
    <slot></slot>
    {{ title }}
    <WmqIconify icon="ant-design:form-outlined" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { WmqIconify } from '@weiming-rock/components';

  export default defineComponent({
    name: 'EditTableHeaderIcon',
    components: { WmqIconify },
    props: { title: { type: String, default: '' } },
  });
</script>
