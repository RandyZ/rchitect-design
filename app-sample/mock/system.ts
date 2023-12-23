import { MockMethod } from 'vite-plugin-mock'
import {
    resultSuccess,
} from '@rchitect-rock/rools/mock-util'

export function createDeptList() {
    return [
        {
            "id": "0",
            "deptName": "华东分部",
            "orderNo": 1,
            "createTime": "1983-04-30 11:27:19",
            "remark": "十政单当还理线程统门道它色行此走流文度度",
            "status": "0",
            "children": [{
                "id": "0-0",
                "deptName": "研发部",
                "orderNo": 1,
                "createTime": "2017-10-08 17:13:44",
                "remark": "太收统教会都白意带把实它每铁方代划毛争",
                "status": "1",
                "parentDept": "0"
            }, {
                "id": "0-1",
                "deptName": "市场部",
                "orderNo": 2,
                "createTime": "2011-12-29 02:38:28",
                "remark": "家问京七断义分系用国已天意形关置书厂",
                "status": "0",
                "parentDept": "0"
            }, {
                "id": "0-2",
                "deptName": "商务部",
                "orderNo": 3,
                "createTime": "2005-07-19 01:23:39",
                "remark": "力从最具何其目知更建造过常养清际和但",
                "status": "0",
                "parentDept": "0"
            }, {
                "id": "0-3",
                "deptName": "财务部",
                "orderNo": 4,
                "createTime": "2017-08-22 07:33:23",
                "remark": "义养和在经发效养情认设手到条",
                "status": "0",
                "parentDept": "0"
            }]
        }, {
            "id": "1",
            "deptName": "华南分部",
            "orderNo": 2,
            "createTime": "1977-10-15 23:34:49",
            "remark": "确查量复例最响别老习好参构除光",
            "status": "1",
            "children": [{
                "id": "1-0",
                "deptName": "研发部",
                "orderNo": 1,
                "createTime": "1975-06-16 16:52:42",
                "remark": "委实心民事子小海林只目任领",
                "status": "0",
                "parentDept": "1"
            }, {
                "id": "1-1",
                "deptName": "市场部",
                "orderNo": 2,
                "createTime": "1993-05-08 09:59:38",
                "remark": "我可该热过式习万有质千",
                "status": "0",
                "parentDept": "1"
            }, {
                "id": "1-2",
                "deptName": "商务部",
                "orderNo": 3,
                "createTime": "2003-05-14 07:39:08",
                "remark": "积况取电值个属市影第毛理着联着号节维说立",
                "status": "1",
                "parentDept": "1"
            }, {
                "id": "1-3",
                "deptName": "财务部",
                "orderNo": 4,
                "createTime": "1978-07-14 01:47:45",
                "remark": "自值光认当会半式人记记认土周",
                "status": "1",
                "parentDept": "1"
            }]
        }, {
            "id": "2",
            "deptName": "西北分部",
            "orderNo": 3,
            "createTime": "1984-01-14 08:10:19",
            "remark": "特西八国求那细强那原来",
            "status": "0",
            "children": [{
                "id": "2-0",
                "deptName": "研发部",
                "orderNo": 1,
                "createTime": "1978-09-09 12:12:55",
                "remark": "空格色联数济质己养型之需",
                "status": "1",
                "parentDept": "2"
            }, {
                "id": "2-1",
                "deptName": "市场部",
                "orderNo": 2,
                "createTime": "1970-08-03 12:04:35",
                "remark": "海科称类音领专来意料状边条",
                "status": "0",
                "parentDept": "2"
            }, {
                "id": "2-2",
                "deptName": "商务部",
                "orderNo": 3,
                "createTime": "2016-03-06 17:38:47",
                "remark": "龙七向新何或我身技广达马月身",
                "status": "1",
                "parentDept": "2"
            }, {
                "id": "2-3",
                "deptName": "财务部",
                "orderNo": 4,
                "createTime": "1992-09-26 20:14:16",
                "remark": "青低算相点率想速只日来样回严王",
                "status": "0",
                "parentDept": "2"
            }]
        }]
}
export default [
    {
        url: '/basic-api/system/getDeptList',
        timeout: 200,
        method: 'get',
        response: ({ query }) => {
            return resultSuccess(createDeptList())
        },
    }
] as MockMethod[]
