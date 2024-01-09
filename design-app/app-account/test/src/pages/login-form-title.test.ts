import { mount } from '@vue/test-utils'
import LoginFormTitle from '#/pages/login-form-title.vue'
import { describe, expect } from "vitest";
import { computed } from "vue";
import { CONTAINER_KEY } from "@rchitect-rock/ioc";

// const { components } = await setup()

describe('LoginFormTitle测试', () => {
  beforeEach(() => {
    vi.mock('#/usage', async (importOriginal) => {
      const actual:any = await importOriginal()
      return {
        ...actual,
        useLoginState: () => ({
          getLoginState: computed(() => 1)
        })
      }
    })
    vi.mock('@rchitect-rock/locale', async (importOriginal) => ({
      useI18n: () => ({ t: (key: string) => {
        console.info('Key', key);
        return key
        } }),
    }))
  });
  test('测试正常渲染', async () => {
    expect(LoginFormTitle).toBeTruthy()
    const wrapper = mount(LoginFormTitle, {
      global: {
        provide: {
          [CONTAINER_KEY as symbol]: {}
        }
      }
    })
    expect(wrapper.text()).toContain("sys.login.signUpFormTitle")
  })
})

