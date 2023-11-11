import { flushPromises, mount } from '@vue/test-utils'
import HelloPage from '#/pages/HelloPage.vue'

test('HelloPage正常渲染', async () => {
  expect(HelloPage).toBeTruthy()

  const wrapper = mount(HelloPage)

  await wrapper.find('button').trigger('click')

  // start loading, so vitest started loading
  await flushPromises() 
  await vi.dynamicImportSettled()

  expect(wrapper.html()).toContain('1 x 2 = 2')
})