# Rechitect Design

基于MonoRepo形式组织的Vue的企业级模块化工程

编译思想和组件设计方案借鉴了很多[Vben](https://github.com/vbenjs/vben3)的思想

## 工程命令

### 

## 环境变量

- `.env.development` 开发环境
- `.env.production` 生产环境
- `.env.test` 测试环境

### 服务地址配置

#### 单个服务对接

直接用`VITE_GLOB_API_URL = '/some-server'`配置即可

#### 多服务对接

多个服务的时候需要同域名下的不同路径对接，例如：

服务A：`http://local.aihelp.net/A-api`
服务B：`http://local.aihelp.net/B-api`

这种场景下就很难再靠`VITE_GLOB_API_URL`来配置了，所以需要使用`VITE_GLOB_SERVER_XXXXX`来配置。
上面的场景需要配置为：`VITE_GLOB_SERVER_服务名`，这里的服务名可以随意取，但是要保证唯一性

```env
VITE_GLOB_SERVER_A = 'A-api'
VITE_GLOB_SERVER_B = 'A-api'
```

使用`useInfrastructureApi`钩子函数转换请求，服务名称大小写均可，钩子函数中会进行转换

```ts
// 实际地址：http://local.aihelp.net/A-api/some-a-api
const axiosConfA = useInfrastructureApi('/some-a-api', 'a')
// 实际地址：http://local.aihelp.net/B-api/some-b-api
const axiosConfB = useInfrastructureApi('/some-b-api', 'b')
```

#### 本地开发

本地开发会涉及到CORS的问题，所以需要使用代理来解决
`VITE_PROXY`: 代理配置，格式为`[ 激活前缀, 实际地址 ]`，例如`["/some-server", "http://some-server-addr/base/api"]`

- 激活前缀：在本地开发的时候，必须要和服务名的地址前缀一致，例如上面的`/server-ticket`，这样才能正确的代理到对应的服务
- 服务地址：实际的服务地址，例如上面的`http://some-server-addr/base/api`
- Api对应关系：`/some-server/some-api` => `http://some-server-addr/base/api/some-api`

```env

## 基础命令

### 模块生成

```bash
yarn run gen:app <module-name>
yarn run gen:rock <module-name>
```

## IDE的一些注意事项

### VSCode

#### 1. 开启Takeover模式

[Volar 开启takeover](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)

# 需要解决的问题

- [ ] 模块之间传递图片资源的方案实现。
  - 在`AppContext`中增加图片资源参数的传递
  - 图片资源的传递方式可以选择`import promise`或者`import base64`的方式
- [ ] 布局组件完善，将多种布局组件进行整合
- [ ] 多语言模块抽离lang定义文件放回到应用工程
- [ ] 替换svg插件，这个插件过期了，可以使用[@spiriit/vite-plugin-svg-spritemap](https://www.npmjs.com/package/@spiriit/vite-plugin-svg-spritemap)替换
- [ ] RPA连线框架的实现，考虑使用[AntvX6](https://x6.antv.antgroup.com/)来实现
- [ ] `ComponentDriverProvider`实现组件的按需加载
