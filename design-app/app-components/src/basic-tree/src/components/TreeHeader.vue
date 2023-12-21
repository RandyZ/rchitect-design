<template>
  <div :class="bem()" class="flex px-2 py-1.5 items-center">
    <slot name="headerTitle" v-if="slots.headerTitle"></slot>
    <BasicTitle :helpMessage="helpMessage" v-if="!slots.headerTitle && title">
      {{ title }}
    </BasicTitle>
    <div
      class="flex items-center flex-1 cursor-pointer justify-self-stretch"
      v-if="search || toolbar"
    >
      <div :class="getInputSearchCls" v-if="search">
        <WmqInput
          :placeholder="t('common.searchText')"
          size="small"
          allowClear
          v-model="searchValue">
          <template #suffix>
            <WmqIconify icon="ic:baseline-search"></WmqIconify>
          </template>
        </WmqInput>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { type PropType, computed, ref, watch, useSlots } from 'vue';
  import BasicTitle from '#/basic-title';
  import { useI18n } from '@rchitect-rock/locale'
  import { createBEM, useDebounceFn } from '@rchitect-rock/tools';
  import { ToolbarEnum } from '../types/tree';

  const searchValue = ref('');
  const { bem } = createBEM('tree-header');

  const props = defineProps({
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    toolbar: {
      type: Boolean,
      default: false,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
    searchText: {
      type: String,
      default: '',
    },
    checkAll: {
      type: Function,
      default: undefined,
    },
    expandAll: {
      type: Function,
      default: undefined,
    },
  } as const);
  const emit = defineEmits(['strictly-change', 'search']);

  const slots = useSlots();
  const { t } = useI18n();

  const getInputSearchCls = computed(() => {
    const titleExists = slots.headerTitle || props.title;
    return [
      'mr-1',
      'w-full',
      {
        ['ml-5']: titleExists,
      },
    ];
  });

  const toolbarList = computed(() => {
    const { checkable } = props;
    const defaultToolbarList = [
      { label: t('component.tree.expandAll'), value: ToolbarEnum.EXPAND_ALL },
      {
        label: t('component.tree.unExpandAll'),
        value: ToolbarEnum.UN_EXPAND_ALL,
        divider: checkable,
      },
    ];

    return checkable
      ? [
          { label: t('component.tree.selectAll'), value: ToolbarEnum.SELECT_ALL },
          {
            label: t('component.tree.unSelectAll'),
            value: ToolbarEnum.UN_SELECT_ALL,
            divider: checkable,
          },
          ...defaultToolbarList,
          { label: t('component.tree.checkStrictly'), value: ToolbarEnum.CHECK_STRICTLY },
          { label: t('component.tree.checkUnStrictly'), value: ToolbarEnum.CHECK_UN_STRICTLY },
        ]
      : defaultToolbarList;
  });

  function emitChange(value?: string): void {
    emit('search', value);
  }

  const debounceEmitChange = useDebounceFn(emitChange, 200);

  watch(
    () => searchValue.value,
    (v) => {
      debounceEmitChange(v);
    },
  );

  watch(
    () => props.searchText,
    (v) => {
      if (v !== searchValue.value) {
        searchValue.value = v;
      }
    },
  );
</script>
