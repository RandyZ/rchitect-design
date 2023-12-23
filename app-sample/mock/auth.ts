import { MockMethod, RespThisType } from 'vite-plugin-mock'
import {
  resultError,
  resultSuccess,
  getRequestToken,
  requestParams,
} from '@rchitect-rock/rools/mock-util'
import { log } from 'console'
import { IncomingMessage, ServerResponse } from 'http'
import { HttpStatusCode } from '@weiming-rock/types'
import { useGlobConfig } from '@weiming-rock/hooks'

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
