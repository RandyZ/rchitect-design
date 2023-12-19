<template>
  <WmqTooltip placement="top">
    <template #content>
      <span>{{ t('component.table.settingDens') }}</span>
    </template>

    <Dropdown placement="bottom" :trigger="['click']" :getPopupContainer="getPopupContainer">
      <WmqIconify icon="ant-design:column-height-outlined" />
      <template #overlay>
        <Menu @click="handleTitleClick" selectable v-model:selectedKeys="selectedKeysRef">
          <MenuItem index="default">
            <span>{{ t('component.table.settingDensDefault') }}</span>
          </MenuItem>
          <MenuItem index="middle">
            <span>{{ t('component.table.settingDensMiddle') }}</span>
          </MenuItem>
          <MenuItem index="small">
            <span>{{ t('component.table.settingDensSmall') }}</span>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </WmqTooltip>
</template>
<script lang="ts">
  import type { SizeType } from '../../types/table';
  import { defineComponent, ref } from 'vue';
  import { ElDropdown as Dropdown, ElDropdownMenu as Menu, ElDropdownItem as MenuItem } from 'element-plus';
  import { useI18n } from  '@weiming-rock/locale';
  import { useTableContext } from '../../hooks/useTableContext';
  import { getPopupContainer } from '@vben/utils';
  import { WmqIconify } from '@weiming-rock/components'

  export default defineComponent({
    name: 'SizeSetting',
    components: {
      Dropdown,
      Menu,
      MenuItem,
      WmqIconify
    },
    setup() {
      const table = useTableContext();
      const { t } = useI18n();

      const selectedKeysRef = ref<SizeType[]>([table.getSize()]);

      function handleTitleClick({ key }: { key: SizeType }) {
        selectedKeysRef.value = [key];
        table.setProps({
          size: key,
        });
      }

      return {
        handleTitleClick,
        selectedKeysRef,
        getPopupContainer,
        t,
      };
    },
  });
</script>
