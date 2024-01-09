import { mount } from '@vue/test-utils'
import OAuthForm from '#/pages/oauth-form.vue'
import { beforeEach, describe, expect } from "vitest";
import { CONTAINER_KEY } from "@rchitect-rock/ioc";

describe('OAuthForm测试', () => {
  beforeEach(() => {
    vi.mock('@rchitect-rock/locale', async (importOriginal) => {
      const actual:any = await importOriginal()
      return {
        ...actual,
        useI18n: () => {
          return {
            t: (key: string) => {
              debugger
              console.info('Key', key)
              return key
            }
          }
        }
      }
    })
    vi.mock('#/usage', async (importOriginal) => {
      const actual:any = await importOriginal()
      return {
        ...actual,
        useLoginState: () => ({

        })
      }
    })
  })
  test('测试正常渲染', async () => {
    expect(OAuthForm).toBeTruthy()
    const wrapper = mount(OAuthForm, {
      global: {
        provide: {
          [CONTAINER_KEY as symbol]: {
            get: vi.fn()
          }
        }
      }
    })
    expect(wrapper.text()).toContain("sys.login.weimingOAuthRedicting")
  })
})

