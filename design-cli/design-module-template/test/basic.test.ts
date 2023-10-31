import { mount } from '@vue/test-utils'
import BaseComponent from '#/component/BaseComponent.vue'

test('BaseComponent基础逻辑组件渲染测试', async () => {
  expect(BaseComponent).toBeTruthy()

  const wrapper = mount(BaseComponent, {
    props: {
      count: 4,
    },
  })
  expect(wrapper.text()).toContain('4 x 2 = 8')

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.get('button').trigger('click')

  expect(wrapper.text()).toContain('4 x 3 = 12')

  await wrapper.get('button').trigger('click')

  expect(wrapper.text()).toContain('4 x 4 = 16')
})