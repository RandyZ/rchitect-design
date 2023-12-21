import { defineComponent, provide } from 'vue';
import type { InjectionKey } from 'vue';
import { useMsg, useNotice } from '@rchitect-rock/components';
import { setPromoter } from '@rchitect-app/infrastructure';
import type { AppState } from '@rchitect-rock/state';
import { useAppState } from '@rchitect-rock/hooks';

export const AppStatusInjectionKey = Symbol(
  'AppStatusRefs'
) as InjectionKey<AppState.State>;

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  setup(_, { slots }) {
    const appState = useAppState();
    //注册msg以及notice，方便全局使用
    const msg = useMsg();
    const notice = useNotice();
    setPromoter({
      message: msg,
      notify: notice,
    });
    provide(AppStatusInjectionKey, appState);
    return () => slots.default?.();
  },
});
