<template>
  <WmqButton v-bind="getBindValue"  @click="onClick">
    <template #default="data">
      <WmqIconify :icon="preIcon" v-if="preIcon" :size="iconSize" />
      {{getBindValue.title}}
      <slot v-bind="data || {}"></slot>
      <WmqIconify :icon="postIcon" v-if="postIcon" :size="iconSize" />
    </template>
  </WmqButton>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { WmqIconify } from '@rchitect-rock/components'

  import { buttonProps } from './props';
  // TODO: Randy import { useAttrs } from '@rchitect-rock/hooks';
  import { useAttrs } from 'vue';

  // TODO:
  // defineOptions({
  //   name: 'ElButton',
  //   extends: ElButton,
  //   inheritAttrs: false,
  // });

  const props = defineProps(buttonProps);
  // get component class
  const attrs = useAttrs({ excludeDefaultKeys: false });
  const getButtonClass = computed(() => {
    const { color, disabled } = props;
    return [
      {
        [`ant-btn-${color}`]: !!color,
        [`is-disabled`]: disabled,
      },
    ];
  });

  // get inherit binding value
  const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>
