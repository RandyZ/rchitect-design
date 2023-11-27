import { get, isFunction } from 'lodash-es'
import { error } from './index'
export interface FetchProps {
  api?: Function
  params?: Object
  afterFetch?: Function
  immediate?: boolean
  value?: object
  options?: Array<any>
  resultField?: String
}

// 请求props定义
export const fetchProps = {
  api: {
    type: Function,
    default: null,
  },
  params: {
    type: Object,
    default: {},
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default: undefined,
  },
  value: {
    type: String,
    default: '',
  },
  afterFetch: {
    type: Function,
    default: null,
  },
  resultField: {
    type: String,
    default: 'options',
  },
}
// 请求获取数据
export async function fetch(props: FetchProps, o: any) {
  const { api, params, options, afterFetch, resultField } = props
  // 有options 不请求 直接使用options
  if (options) {
    o.value = options
    return
  }
  if (!api) return
  if (!isFunction(api)) {
    // 传入函数
    // 正确 api 错误 api()
    error('api不是函数')
    return
  }
  let res = await api(params)
  if (afterFetch && isFunction(afterFetch)) {
    res = afterFetch(res)
  }
  if (resultField) {
    res = get(res, resultField as string)
  }
  o.value = res
}
