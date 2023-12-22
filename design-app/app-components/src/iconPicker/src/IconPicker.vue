<template>
  <a-input
    disabled
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
    v-model:value="currentSelect"
  >
    <template #suffix>
      <a-popover
        placement="bottom"
        trigger="click"
        v-model="visible"
        width="300"
        :popperClass="`${prefixCls}-popover`"
      >

        <div class="flex justify-between">
          <a-input
              :placeholder="t('component.icon.search')"
              @input="debounceHandleSearchChange"
              v-model="iconValue"
              allowClear
          />
        </div>
        <div v-if="getPaginationList.length">
          <ScrollContainer class="border border-solid border-t-0">
            <ul class="flex flex-wrap px-2">
              <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
              >
                <!-- <Icon :icon="icon" :prefix="prefix" /> -->
                <SvgIcon v-if="isSvgMode" :name="icon" />
                <WmqIconify :icon="icon" v-else />
              </li>
            </ul>
          </ScrollContainer>
          <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
            <a-pagination
                showLessItems
                small
                background
                layout="prev, pager, next"
                :pageSize="pageSize"
                :total="getTotal"
                @sizeChange="handlePageChange"
                @currentChange="handlePageChange"
                @prevClick="handlePageChange"
                @nextClick="handlePageChange"
            />
          </div>
        </div>
        <template v-else><div class="p-5"><a-empty /></div>
        </template>

        <template #reference>
          <span class="cursor-pointer px-2 py-1 flex items-center" v-if="isSvgMode && currentSelect">
          <SvgIcon :name="currentSelect" />
        </span>
          <WmqIconify :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer px-2 py-1" v-else />
        </template>

      </a-popover>
    </template>
  </a-input>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, watch, unref } from 'vue';
  import { ScrollContainer } from '#/Container';
  import { ElInput as Input, ElPopover as Popover, ElPagination as Pagination, ElEmpty as Empty } from 'element-plus';
  import { WmqIconify } from '@rchitect-rock/components';
  import SvgIcon from '#/svg-icon';
  import iconsData from '../data/icons.data';
  import { propTypes } from '@rchitect-design/types';
  import { useDebounceFn } from '@rchitect-rock/tools';
  import { useI18n } from '@rchitect-rock/locale';
  import { useCopyToClipboard, usePagination, useDesign } from '@rchitect-rock/hooks';
  import svgIcons from 'virtual:svg-icons-names';

  // 没有使用别名引入，是因为WebStorm当前版本还不能正确识别，会报unused警告
  const AInput = Input;
  const APopover = Popover;
  const APagination = Pagination;
  const AEmpty = Empty;

  function getIcons() {
    const data = iconsData as any;
    const prefix: string = data?.prefix ?? '';
    let result: string[] = [];
    if (prefix) {
      result = (data?.icons ?? []).map((item) => `${prefix}:${item}`);
    } else if (Array.isArray(iconsData)) {
      result = iconsData as string[];
    }
    return result;
  }

  function getSvgIcons() {
    return svgIcons.map((icon) => icon.replace('icon-', ''));
  }

  const props = defineProps({
    value: propTypes.string,
    width: propTypes.string.def('100%'),
    pageSize: propTypes.number.def(140),
    copy: propTypes.bool.def(false),
    mode: propTypes.oneOf<('svg' | 'iconify')[]>(['svg', 'iconify']).def('iconify'),
  });

  const emit = defineEmits(['change', 'update:value']);

  const isSvgMode = props.mode === 'svg';
  const icons = isSvgMode ? getSvgIcons() : getIcons();

  const currentSelect = ref('');
  const visible = ref(false);
  const currentList = ref(icons);

  const iconValue = ref('');

  const { t } = useI18n();
  const { prefixCls } = useDesign('icon-picker');

  const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100);

  let clipboardRef;
  let isSuccessRef;

  if (props.copy) {
    const clipboard = useCopyToClipboard(props.value);
    clipboardRef = clipboard?.clipboardRef;
    isSuccessRef = clipboard?.isSuccessRef;
  }

  // const { createMessage } = useMessage();

  const { getPaginationList, getTotal, setCurrentPage } = usePagination(
    currentList,
    props.pageSize,
  );

  watchEffect(() => {
    currentSelect.value = props.value;
  });

  watch(
    () => currentSelect.value,
    (v) => {
      emit('update:value', v);
      return emit('change', v);
    },
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleClick(icon: string) {
    currentSelect.value = icon;
    if (props.copy) {
      clipboardRef.value = icon;
      if (unref(isSuccessRef)) {
        // createMessage.success(t('component.icon.copy'));
      }
    }
  }

  function handleSearchChange(e: Event) {
    const value = iconValue.value;
    if (!value) {
      setCurrentPage(1);
      currentList.value = icons;
      return;
    }
    currentList.value = icons.filter((item) => item.includes(value));
  }
</script>
<style lang="less">
  // TODO: 样式
  @namespace: 'vben';
  @prefix-cls: ~'@{namespace}-icon-picker';

  .@{prefix-cls} {
    .el-input-group-addon {
      padding: 0;
    }

    &-popover {
      width: 300px;

      .el-popover-inner-content {
        padding: 0;
      }

      .scrollbar {
        height: 220px;
      }
    }

    .p-2 {
      padding: 0.5rem;
    }

    .border-solid {
      border-style: solid;
    }

    .border {
      border-width: 1px;
    }

    .justify-center {
      justify-content: center;
    }

    .items-center {
      align-items: center;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .flex {
      display: flex;
    }

    .w-1\/8 {
      width: 12.5%;
    }

    .mt-1 {
      margin-top: 0.25rem;
    }

    .mr-1 {
      margin-right: 0.25rem;
    }

    .border-t-0 {
      border-top-width: 0;
    }

    .px-2 {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .flex-wrap {
      flex-wrap: wrap;
    }

    .flex {
      display: flex;
    }
  }
</style>
