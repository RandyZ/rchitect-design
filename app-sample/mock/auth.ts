import type { MockMethod, RespThisType } from 'vite-plugin-mock'
import {
  resultError,
  resultSuccess,
  getRequestToken,
  requestParams,
} from '@rchitect-rock/tools/mock-util'
import { IncomingMessage, ServerResponse } from 'http'
import { HttpStatusCode } from '@rchitect-design/types'
import { useGlobConfig } from '@rchitect-rock/hooks'

const OAUTH2_FAKE_CODE = 'fakeCode'
const OAUTH2_FAKE_STATE = 'fakeState'
const OAUTH2_FAKE_TOKEN = ['eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQyODYyMDQsInVzZXJfbmFtZSI6Imhyc2pfcXVhbmJ1IiwianRpIjoiMjRlMWQ4OWYtM2EyZi00YWNlLTg4ZTQtM2E5YTg3ZDgxMjY1IiwiY2xpZW50X2lkIjoiZGVtbyIsInNjb3BlIjpbIkFMTCJdfQ.zbSg4OsAwKiVWwRp-fcAYZblrYGwY87dNHHyCj7fFUeQhbDRLfbiR0hJKayfZyh3Qg459pH_nrI2WE3jDb3o7V5qUOMoAPV_1GsXRTEhKkaV2z3pi8ZykcIzssAiSBBQLHyQjQTniQ7jWGmMwJ0o6jkUHs95mVMv29nQnRgCglI_radHdYsBD3TTnNLXqVfC9e_5-Fj7cUPVJyGRUjAJpQ25h9JAyK1h3lU5u0ZmoW4ix3nVJ6kuavXIOGb_n5gKgPc_VSPuQ5j42KbF06Cz2gZoYzwb5fJ9_5CpSkAU40H0wH0Gpqy0JbEAPJRxgveRNzW-Yu5BCY5nlRJ4uL9Nzw', 'fakeToken2']
const OAUTH2_FAKE_REFRESHTOKEN = 'fakeRefreshToken'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'randy',
      realname: 'Randy Admin',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: 'randy123',
      accessToken: OAUTH2_FAKE_TOKEN[0],
      roles: [
        {
          name: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realname: 'test user',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      accessToken: OAUTH2_FAKE_TOKEN[1],
      roles: [
        {
          name: 'Tester',
          value: 'test',
        },
      ],
    },
  ]
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
}
export default [
  // mock user login
  // 模拟ResourceServer重定向到授权服务，登录成功之后回传Code和State
  {
    url: '/basic-api/oauth2/authorization/wmqe-pc',
    timeout: 200,
    method: 'get',
    rawResponse: (req, resp) => {
      resp.writeHead(302, {
        // 本地模拟重定向到资源服务前端，携带虚拟的Code和State
        Location: `http://localhost:3000/login/oauth2/code?code=${OAUTH2_FAKE_CODE}&state=${OAUTH2_FAKE_STATE}`
      })
      resp.end()
    },
  },
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
  // 模拟ResourceServer获取Token
  {
    url: '/basic-api/login/oauth2/code/wmqe-pc',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { code, state } = query
      if (code === OAUTH2_FAKE_CODE && state === OAUTH2_FAKE_STATE) {
        return resultSuccess({
          accessToken: OAUTH2_FAKE_TOKEN[0],
          refreshToken: OAUTH2_FAKE_REFRESHTOKEN,
          tokenType: 'Bearer',
        })
      } else {
        return resultError('Invalid code or state')
      }
    },
  },
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body

      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password,
      )

      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }

      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const accessToken = getRequestToken(request)
      if (!accessToken) return resultError('Invalid accessToken.', { code: '401'})
      const checkUser = createFakeUserList().find(
        (item) => accessToken.indexOf(item.accessToken) >= 0
      )
      if (!checkUser) {
        return resultError(
          'The corresponding user information was not obtained!',
        )
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const accessToken = getRequestToken(request)
      if (!accessToken) return resultError('Invalid accessToken.')
      const checkUser = createFakeUserList().find(
        (item) => item.accessToken === accessToken,
      )
      if (!checkUser) {
        return resultError('Invalid accessToken.')
      }
      const codeList = fakeCodeList[checkUser.userId]

      return resultSuccess(codeList)
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const accessToken = getRequestToken(request)
      if (!accessToken) return resultError('Invalid accessToken.')
      const checkUser = createFakeUserList().find(
        (item) => item.accessToken === accessToken,
      )
      if (!checkUser) {
        return resultError('Invalid accessToken.')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    },
  },

] as MockMethod[]
