import { ElDialog as Modal } from 'element-plus';
import { defineComponent, toRefs, unref } from 'vue';
import { basicProps } from '../props';
import { useModalDragMove } from '../hooks/useModalDrag';
// TODO: 验证
import { useAttrs } from 'vue';
import { extendSlots } from '@vben/utils';

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps as any,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const { modelValue, draggable, destroyOnClose } = toRefs(props);
    const attrs = useAttrs();
    useModalDragMove({
      modelValue,
      destroyOnClose,
      draggable,
    });

    const onCancel = (e: Event) => {
      emit('cancel', e);
    };

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel,  } as Recordable;
      return <Modal {...propsData}>{extendSlots(slots)}</Modal>;
    };
  },
});
