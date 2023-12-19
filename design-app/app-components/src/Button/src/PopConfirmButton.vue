<script lang="ts">
  import { computed, defineComponent, h, unref } from 'vue';
  import BasicButton from './BasicButton.vue';
  import { ElPopconfirm } from 'element-plus';
  import { extendSlots } from '@vben/utils';
  import { omit } from 'lodash-es';
  // TODO: 验证
  import { useAttrs } from 'vue';
  import { useI18n } from '@weiming-rock/locale';

  const props = {
    /**
     * Whether to enable the drop-down menu
     * @default: true
     */
    enable: {
      type: Boolean,
      default: true,
    },
  };

  export default defineComponent({
    name: 'PopButton',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const { t } = useI18n();
      const attrs = useAttrs();

      // get inherit binding value
      const getBindValues = computed(() => {
        return Object.assign(
          {
            okText: t('common.okText'),
            cancelText: t('common.cancelText'),
          },
          { ...props, ...unref(attrs) },
        );
      });

      return () => {
        const bindValues = omit(unref(getBindValues), 'icon');
        const btnBind = omit(bindValues, 'title') as any;
        if (btnBind.disabled) btnBind.color = '';
        const Button = h(BasicButton, btnBind, extendSlots(slots));
        // If it is not enabled, it is a normal button
        if (!props.enable) {
          return Button;
        }
        return h(ElPopconfirm, bindValues, { reference: () => Button });
      };
    },
  });
</script>
