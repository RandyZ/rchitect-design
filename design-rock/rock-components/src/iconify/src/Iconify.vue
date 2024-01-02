<script setup lang="ts">
import { RockComponent } from '#/RockComponent'
import { IconifyPropTypes, type IconifyProps } from './props'
import type { CSSProperties } from 'vue-demi'
import { unref, computed, useAttrs, ref } from 'vue-demi'
import { createNamespace } from '@rchitect-rock/tools'
import isString from 'lodash-es/isString'
import { Icon as Iconify } from '@iconify/vue'

defineOptions({
  name: 'Iconify',
  customOptions: {
    isPresetComponent: true,
  },
})

const props: IconifyProps = defineProps(IconifyPropTypes)

const iconRefEl = ref<HTMLElement | null>(null)

const getIconRef = computed(
  () => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`,
)

const { bem } = createNamespace('iconify')

const attrs = useAttrs()

const styles = computed((): CSSProperties => {
  const { size, color } = props
  let _size = size
  if (isString(size)) {
    _size = parseInt(size as string, 10)
  }

  return {
    fontSize: `${_size}px`,
    color: color,
    display: 'inline-flex',
  }
})

const classes = computed(() => {
  const cls = [bem(), unref(attrs).class]
  if (props.infinite) {
    cls.push(bem('infinite'))
  }
  return cls
})
</script>

<template>
  <Iconify :icon="getIconRef" :class="[classes, { 'hover:cursor-pointer': hoverPointer }]" :style="styles" ref="iconRefEl" />
</template>

<style lang="less" scoped>
.iconify {
  display: inline-block;
  transition: color 0.2s, transform .2s;

  &:hover {
    color: v-bind(hoverColor) !important;
  }
}

.iconify__infinite {
  animation: loading-circle 1s infinite linear;
}
</style>
