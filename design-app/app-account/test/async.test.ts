import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import AsyncWrapperComponent from '#/component/AsyncWrapperComponent.vue';

test('异步组件加载出现刮起情况测试', async () => {
  expect(AsyncWrapperComponent).toBeTruthy()

  let resolve: Function = () => { throw new Error('resolve is not defined') }

  const promise = new Promise<void>(_resolve => resolve = _resolve)
  const wrapper = mount(AsyncWrapperComponent, {
    props: {
      promise,
    },
  })

  await nextTick()

  expect(wrapper.text()).toContain('fallback')

  resolve()

  await flushPromises()
  await nextTick()
  await nextTick()

  const text = wrapper.text()
  expect(text).toContain('resolved')
})