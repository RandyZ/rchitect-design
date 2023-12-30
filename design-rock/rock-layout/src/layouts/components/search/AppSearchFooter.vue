<script lang="ts" setup>
import { onKeyStroke } from '@rchitect-rock/tools'
import { useI18n } from '@rchitect-rock/locale'
import AppSearchKeyItem from './AppSearchKeyItem.vue'
// import { resolveContextOptions } from "#/../bridge";
import { SearchBoxEvents } from '#/layouts/components/search/SearchContext'
import { onMounted } from 'vue';
import { useEventbus } from "@rchitect-rock/events";

const { useDesign } = resolveContextOptions();
const { prefixCls } = useDesign('app-search-footer')
const { t } = useI18n()
const dataEventBus = useEventbus()

onMounted(() => {
  // 监听键盘事件
  onKeyStroke('Escape', () => {
    dataEventBus.$emit(SearchBoxEvents.BoxClose)
  })
})


</script>

<template>
  <div :class="`${prefixCls}`">
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="ant-design:enter-outlined" />
    <span>{{ t('component.app.toSearch') }}</span>
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="ion:arrow-up-outline" />
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="ion:arrow-down-outline" />
    <span>{{ t('component.app.toNavigate') }}</span>
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="mdi:keyboard-esc" />
    <span>{{ t('common.closeText') }}</span>
  </div>
</template>
<style lang="less" scoped>
// @prefix-cls: ~'@{namespace}-app-search-footer';

.vben-app-search-footer {
  position: relative;
  display: flex;
  height: 44px;
  padding: 0 16px;
  font-size: 12px;
  color: #666;
  background-color: @component-background;
  border-top: 1px solid @border-color-base;
  border-radius: 0 0 16px 16px;
  align-items: center;
  flex-shrink: 0;

  &-item {
    display: flex;
    width: 20px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 0.4em;
    background-color: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px rgb(30 35 90 / 40%);
    align-items: center;
    justify-content: center;

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(6) {
      margin-left: 14px;
    }
  }
}
</style>
