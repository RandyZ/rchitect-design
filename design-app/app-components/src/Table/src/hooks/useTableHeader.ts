import type { ComputedRef, Slots } from 'vue';
import type { BasicTableProps, InnerHandlers } from '../types/table';
import { unref, computed, h } from 'vue';
import TableHeader from '../components/TableHeader.vue';
import { isString } from 'lodash-es';
import { VueHelper } from '@rchitect-rock/tools';

export function useTableHeader(
  propsRef: ComputedRef<BasicTableProps>,
  slots: Slots,
  handlers: InnerHandlers,
) {
  const getHeaderProps = computed((): Recordable => {
    const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef);
    const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting;
    if (hideTitle && !isString(title)) {
      return {};
    }
    return {
      title: hideTitle
        ? null
        : () =>
            h(
              TableHeader,
              {
                title,
                titleHelpMessage,
                showTableSetting,
                tableSetting,
                onColumnsChange: handlers.onColumnsChange,
              } as Recordable,
              {
                ...(slots.toolbar
                  ? {
                      toolbar: () => VueHelper.getSlot(slots, 'toolbar'),
                    }
                  : {}),
                ...(slots.tableTitle
                  ? {
                      tableTitle: () => VueHelper.getSlot(slots, 'tableTitle'),
                    }
                  : {}),
                ...(slots.headerTop
                  ? {
                      headerTop: () => VueHelpergetSlot(slots, 'headerTop'),
                    }
                  : {}),
              },
            ),
    };
  });
  return { getHeaderProps };
}
