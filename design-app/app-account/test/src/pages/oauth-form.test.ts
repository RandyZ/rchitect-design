import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import OauthForm from '#/pages/oauth-form.vue'

test('HelloPage正常渲染', async () => {
  expect(OauthForm).toBeTruthy()

  const wrapper = shallowMount(OauthForm)

  // await wrapper.find('button').trigger('click')
  //
  // // start loading, so vitest started loading
  // await flushPromises()
  // await vi.dynamicImportSettled()
  //
  // expect(wrapper.html()).toContain('1 x 2 = 2')
})