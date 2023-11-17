<script lang="ts" setup>
import 'xe-utils'
import 'vxe-table/styles/index.scss'
import type { WmqTableProps } from './type'
import { computed, PropType, ref, unref, useAttrs, watch } from 'vue'
import { isBoolean, isFunction } from 'lodash-es'
import { VxeGrid, type VxeGridInstance } from 'vxe-table'
import { ThemeEnum } from '@rchitect-design/constants'
import { context } from '#/../bridge'
import { useInterceptor } from './hooks'
import { RockComponent } from '#/index'
defineOptions({
  name: RockComponent.Table,
  customOptions: {
    isPresetComponent: true,
  }
})
const { useConfigStore } = context
const appStore = useConfigStore()

useInterceptor()

watch(
  () => appStore.getDarkMode,
  () => {
    if (appStore.getDarkMode == ThemeEnum.DARK) {
      import('./scss/dark.scss')
    }
    //刷新页面重置SCSS
    if (appStore.getDarkMode === ThemeEnum.LIGHT) {
      import('./scss/light.scss')
      // window.location.reload()
    }
  },
  { immediate: true },
)
const attrs = useAttrs()
const emit = defineEmits(['register'])
const titleClass = computed(() => {
  return {
    backgroundColor:
      appStore.getDarkMode === ThemeEnum.DARK ? '#262626' : '#FFF',
  }
})
const props = defineProps({
  options: {
    type: Object as PropType<WmqTableProps>,
    default: {},
  },
})
const innerProps = ref<Partial<WmqTableProps>>()

const title = ref('')

const getProps = computed(() => {
  const options = innerProps.value || props.options
  title.value = options?.title || ''
  delete options?.title
  getProxyConfig(options)
  getPageConfig(options)
  // console.log(options);
  return {
    ...options,
    ...attrs,
  }
})
const xGrid = ref<VxeGridInstance>()

const reload = () => {
  const g = unref(xGrid)
  if (!g) {
    return
  }
  g.commitProxy('query')
}

const getProxyConfig = (options: WmqTableProps) => {
  const { api, proxyConfig, data, afterFetch } = options
  if (proxyConfig || data) return
  if (api && isFunction(api)) {
    options.proxyConfig = {
      props: {
        result: 'items', // 配置响应结果列表字段
        total: 'total', // 配置响应结果总页数字段
      },
      ajax: {
        query: async ({ page, sorts, filters, form }) => {
          const { currentPage, pageSize } = page
          let res = await api({
            ...options.params,
            page: currentPage,
            pageSize,
          })
          if (afterFetch && isFunction(afterFetch)) {
            res = afterFetch(res)
          }

          return res || []
        },
      },
    }
  }
}
const getPageConfig = (options: WmqTableProps) => {
  const { pagination, pagerConfig } = options
  if (pagerConfig) return

  if (pagination) {
    if (isBoolean(pagination)) {
      options.pagerConfig = {
        pageSize: 50,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
      }
      return
    }
    options.pagerConfig = pagination
  }
}

const setProps = (prop: Partial<WmqTableProps>) => {
  innerProps.value = { ...unref(innerProps), ...prop }
}
defineExpose({ reload, Ref: xGrid })
emit('register', { reload, setProps })
</script>
<template>
  <div class="m-2 p-2" :style="titleClass">
    <div v-if="title" class="flex m-2">
      <div class="ml-2 text-xl">{{ title }}</div>
    </div>

    <VxeGrid v-bind="getProps" ref="xGrid">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </VxeGrid>
  </div>
</template>
<style lang="scss"></style>
