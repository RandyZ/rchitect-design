<template>
  <div ref="tableDomRef"></div>
</template>

<script setup lang="ts">
import { S2DataConfig, S2Options, ThemeCfg, S2RenderOptions, OffsetConfig, TableSheet } from '@antv/s2';
import { CubeSheet } from '../cube-sheet'
import { isEmpty, get } from 'lodash-es'
import { onMounted, ref, onUnmounted, PropType, watch, unref, computed, watchEffect } from 'vue-demi'
import { RockComponent } from '#/RockComponent'

defineOptions({
  name: 'CubeTable',
  customOptions: {
    isPresetComponent: true,
  },
})

const props = defineProps({
  dataCfg: { type: Object as PropType<S2DataConfig> , default: () => ({})},
  options: { type: Object as PropType<S2Options>, default: () => ({})},
  themeCfg: { type: Object as PropType<ThemeCfg> },
  type: {type: String, default: 'cube'}
})

const table = ref<CubeSheet>()
const tableDomRef = ref<HTMLElement | null>(null)
onMounted(() => {
  const container = unref(tableDomRef);
  if (container === null) {
    throw new Error('无法驱动CubeTable渲染，因为没有找到对应的容器')
  }
  let options = props.options
  if (get(props, 'options.sizeAuto') === true) {
    options = {...props.options, ...{ width: 0, height: 0 }}
  }
  if (props.type === 'detail') {
    table.value = new TableSheet(container, props.dataCfg, options);
  } else {
    table.value = new CubeSheet(container, props.dataCfg, options);
  }
  if (!isEmpty(props.themeCfg)) {
    unref(table)?.setThemeCfg(props.themeCfg)
  }
  render()
})

onUnmounted(() => {
  unref(table)?.destroy()
})
/**
 * 监听主题变化，有变化触发更新
 * 主题修改暂时不开放给外部更改
 */
watchEffect(() => {
  unref(table)?.setThemeCfg(props.themeCfg)
})

const dataCfgComputed = computed(() => {
  return props.dataCfg
})

watch(dataCfgComputed, (newVal) => {
  unref(table)?.setDataCfg(newVal, true)
})

watchEffect(() => {
  unref(table)?.setOptions(props.options, false)
})

function render(reloadData?: boolean, options?: S2RenderOptions) {
  unref(table)?.render(reloadData, options)
}

function changeSheetSize(width?: number, height?: number) {
  unref(table)?.changeSheetSize(width, height)
}

function resetScrollOffset(animate: boolean) {
  unref(table)?.resetScrollOffset(animate)
}

function isCanScrollY() {
  return unref(table)?.isCanScrollY()
}

function updateScrollOffset(offsetConfig: OffsetConfig) {
  unref(table)?.updateScrollOffset(offsetConfig)
}

function getScrollOffset() {
  return unref(table)?.facet.getScrollOffset()
}

function isScrollToBottom(deltaY: number) {
  return unref(table)?.facet.isScrollToBottom(deltaY)
}

function getRowWidth() {
  return unref(table)?.getRowWidth()
}

function on(evt: S2Event, callback: (event: any) => void, once?: boolean) {
  once
    ? unref(table)?.once(evt, callback)
    : unref(table)?.on(evt, callback)
}
defineExpose({
  render,
  changeSheetSize,
  updateScrollOffset,
  getScrollOffset,
  isScrollToBottom,
  resetScrollOffset,
  isCanScrollY,
  on,
  getRowWidth
})
</script>
