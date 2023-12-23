import type { MockMethod } from "vite-plugin-mock";

const Mocks:MockMethod[] = [
  {
    url: '/v1/account/captcha-image',
    method: 'get',
    response: ({ body }) => {
      return {
        "code": 1,
        "reason": "成功",
        "debugMsg": "成功",
        "data": {
          "uuid": "bb12ef3eae8d4ed884bd25f1b107bdbc",
          "img": "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"
        },
        "ok": true
      }
    }
  },
  {
    url: '/api/account/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          data: {
            token: 'admin-token'
          }
        }
      } else {
        return {
          code: 400,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/account/info',
    method: 'get',
    response: ({ body }) => {
      const { token } = body
      if (token === 'admin-token') {
        return {
          code: 200,
          data: {
            roles: ['admin'],
            name: 'admin',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640'
          }
        }
      } else {
        return {
          code: 400,
          message: 'Token无效'
        }
      }
    }
  },
  {
    url: '/api/account/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]

export default Mocks