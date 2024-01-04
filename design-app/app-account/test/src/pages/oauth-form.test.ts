import { mount } from '@vue/test-utils'
import OauthForm from '#/pages/oauth-form.vue'
import { setup } from '@rchitect-app/testing-setup'
import {expect} from "vitest";

const { components } = await setup()

test('HelloPage正常渲染', async () => {
  expect(OauthForm).toBeTruthy()

  const wrapper = mount(OauthForm, {
    global: {
      components
    }
  })
  expect(wrapper.text()).toContain("sys.login.weimingOAuthRedicting")
})
