import { MockMethod } from 'vite-plugin-mock'
import {
  resultSuccess,
} from '@rchitect-rock/tools/mock-util'

export function createDeptList() {
  return [
    {
      "name": "选项0",
      "id": "0"
    }, {
      "name": "选项1",
      "id": "1"
    }, {
      "name": "选项2",
      "id": "2"
    }, {
      "name": "选项3",
      "id": "3"
    }, {
      "name": "选项4",
      "id": "4"
    }, {
      "name": "选项5",
      "id": "5"
    }, {
      "name": "选项6",
      "id": "6"
    }, {
      "name": "选项7",
      "id": "7"
    }, {
      "name": "选项8",
      "id": "8"
    }, {
      "name": "选项9",
      "id": "9"
    }, {
      "name": "选项10",
      "id": "10"
    }, {
      "name": "选项11",
      "id": "11"
    }, {
      "name": "选项12",
      "id": "12"
    }, {
      "name": "选项13",
      "id": "13"
    }, {
      "name": "选项14",
      "id": "14"
    }, {
      "name": "选项15",
      "id": "15"
    }, {
      "name": "选项16",
      "id": "16"
    }, {
      "name": "选项17",
      "id": "17"
    }, {
      "name": "选项18",
      "id": "18"
    }, {
      "name": "选项19",
      "id": "19"
    }]
}
export default [
  {
    url: '/select/getDemoOptions',
    timeout: 200,
    method: 'get',
    response: ({ params }) => {
      return resultSuccess(createDeptList())
    },
  }
] as MockMethod[]