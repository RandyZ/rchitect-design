<template>
  <div :class="[prefixCls, getAlign]" @click="onCellClick">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <PopConfirmButton  v-if="action.tooltip && action.popConfirm" v-bind="action">
        <WmqTooltip v-if="action.tooltip && action.popConfirm" v-bind="getTooltip(action.tooltip)">
          <WmqIconify :icon="action.icon" :class="{ 'mr-1': !!action.label }" v-if="action.icon" :color="action.iconColor" />
          <template v-if="action.label">{{ action.label }}</template>
        </WmqTooltip>
      </PopConfirmButton>
      <PopConfirmButton v-else v-bind="action">
        <WmqIconify :icon="action.icon" :class="{ 'mr-1': !!action.label }" v-if="action.icon" :color="action.iconColor" />
        <template v-if="action.label">{{ action.label }}</template>
      </PopConfirmButton>
      <WmqDivider
        direction="vertical"
        class="action-divider"
        v-if="divider && index < getActions.length - 1"
      />
    </template>
    <WmqDropdown
      :trigger="['hover']"
      :dropMenuList="getDropdownList"
      popconfirm
      v-if="dropDownActions && getDropdownList.length > 0"
    >
      <slot name="more"></slot>
      <WmqButton type="link" size="small" v-if="!$slots.more">
        <WmqIconify icon="ant-design:more-outlined" />
      </WmqButton>
    </WmqDropdown>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, toRaw, unref } from 'vue';
  import { WmqIconify } from '@rchitect-rock/components';
  // TODO: 路径
  import { TableActionType } from '../types/table';
  import { ActionItem } from '../types/tableAction';

  import { PopConfirmButton } from '#/Button';
  import { useDesign } from '@rchitect-rock/hooks';
  import { useTableContext } from '../hooks/useTableContext';
  // import { usePermission } from '/@/hooks/web/usePermission';
  import { isBoolean, isFunction, isString } from 'lodash-es';
  import { propTypes } from '@rchitect-design/types';
  import { ACTION_COLUMN_FLAG } from '../const';

  export default defineComponent({
    name: 'TableAction',
    components: { WmqIconify, PopConfirmButton },
    props: {
      actions: {
        type: Array as PropType<ActionItem[]>,
        default: null,
      },
      dropDownActions: {
        type: Array as PropType<ActionItem[]>,
        default: null,
      },
      divider: propTypes.bool.def(true),
      outside: propTypes.bool,
      stopButtonPropagation: propTypes.bool.def(false),
    },
    setup(props) {

      const { prefixCls } = useDesign('basic-table-action');
      let table: Partial<TableActionType> = {};
      if (!props.outside) {
        table = useTableContext();
      }

      // const { hasPermission } = usePermission();
      const hasPermission= function () {
        return true;
      };
      function isIfShow(action: ActionItem): boolean {
        const ifShow = action.ifShow;

        let isIfShow = true;

        if (isBoolean(ifShow)) {
          isIfShow = ifShow;
        }
        if (isFunction(ifShow)) {
          isIfShow = ifShow(action);
        }
        return isIfShow;
      }

      const getActions = computed(() => {
        return (toRaw(props.actions) || [])
          .filter((action) => {
            return hasPermission(action.auth) && isIfShow(action);
          })
          .map((action) => {
            const { popConfirm } = action;
            return {
              getPopupContainer: () => unref((table as any)?.wrapRef) ?? document.body,
              type: 'link',
              size: 'small',
              ...action,
              ...(popConfirm || {}),
              onConfirm: popConfirm?.confirm,
              onCancel: popConfirm?.cancel,
              enable: !!popConfirm,
            };
          });
      });

      const getDropdownList = computed((): any[] => {
        const list = (toRaw(props.dropDownActions) || []).filter((action) => {
          return hasPermission(action.auth) && isIfShow(action);
        });
        return list.map((action, index) => {
          const { label, popConfirm } = action;
          return {
            ...action,
            ...popConfirm,
            onConfirm: popConfirm?.confirm,
            onCancel: popConfirm?.cancel,
            text: label,
            divider: index < list.length - 1 ? props.divider : false,
          };
        });
      });

      const getAlign = computed(() => {
        const columns = (table as TableActionType)?.getColumns?.() || [];
        const actionColumn = columns.find((item) => item.flag === ACTION_COLUMN_FLAG);
        return actionColumn?.align ?? 'left';
      });

      // TODO: 类型TooltipProps
      function getTooltip(data: string | any): any {
        return {
          getPopupContainer: () => unref((table as any)?.wrapRef) ?? document.body,
          placement: 'bottom',
          ...(isString(data) ? { title: data } : data),
        };
      }

      function onCellClick(e: MouseEvent) {
        if (!props.stopButtonPropagation) return;
        const path = e.composedPath() as HTMLElement[];
        const isInButton = path.find((ele) => {
          return ele.tagName?.toUpperCase() === 'BUTTON';
        });
        isInButton && e.stopPropagation();
      }

      return { prefixCls, getActions, getDropdownList, getAlign, onCellClick, getTooltip };
    },
  });
</script>
<style lang="less">
  @namespace: vben;
  @prefix-cls: ~'@{namespace}-basic-table-action';

  .@{prefix-cls} {
    display: flex;
    align-items: center;

    .action-divider {
      display: table;
    }

    &.left {
      justify-content: flex-start;
    }

    &.center {
      justify-content: center;
    }

    &.right {
      justify-content: flex-end;
    }

    button {
      display: flex;
      align-items: center;

      span {
        margin-left: 0 !important;
      }
    }

    button.ant-btn-circle {
      span {
        margin: auto !important;
      }
    }

    .el-divider,
    .el-divider-vertical {
      margin: 0 2px;
    }

    .icon-more {
      transform: rotate(90deg);

      svg {
        font-size: 1.1em;
        font-weight: 700;
      }
    }
  }
</style>
