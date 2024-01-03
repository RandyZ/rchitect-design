# Rock Space

### 一、相关的概念

#### A. Setting（设置）

  `Setting` **设置**包括用户界面的偏好、应用程序行为以及其他可配置的参数。
  这些设置通常在应用启动时加载，用户可以根据自己的需求进行调整。
  例如，主题颜色、语言偏好等都可以是应用程序的设置。

#### B. Config（配置）

  `Config` **配置**包括环境变量、API端点、第三方服务的密钥等。
  这些配置信息可以在应用启动时加载，以确保应用在不同环境中的正确运行。
  配置的设计取决于应用的需求，例如，可以将配置信息存储在单独的配置文件中，或者通过环境变量进行配置。

#### C. Repository（仓库）

  `Repository`**仓库**的核心任务是为应用提供统一的数据访问入口，用来屏蔽掉对于业务实体的实际操作

#### D. Store（存储）

  `Store` **存储**作为仓库的实现，直接与网络设施和本地存储打交道，参考Pinia中的相关概念

### 二、Rock Space 中的设计

  Rock空间下整体可以看作一个应用，对应用框架整体进行了一个DDD的设计分割。对App Space下的应用应该遵从这个结构
  
#### `@rchitect-design/types/Repository`的设计

[Repository](../design-defination/types/src/types/repository.ts)是Rock Space中数据模型的重要的部分，这个Module声明了一个声明类型的通用范型。

一个Repository应该包含以下内容：

##### 1. State 状态
```ts
  /**
   * 数据值对象
   */
  export type State = Record<string | number | symbol, any>;
```
代表一个应用的状态存储，可以看做一个值对象。所以特别注意，State声明的时候不要声明成一个响应式属性的对象，如果需要做响应式，可以用`toRefs`和类型工具`ToRefs<>`来转换。

这里举一个Pinia的例子
```ts
  export const useStateStore = defineStore('AppStateStore', () => {
  const state: ToRefs<AppState.State> = {
    theme: ref('light'),
    fullContent: ref(false),
    mobile: ref(false),
    appTimerId: ref(0),
    loading: ref(false),
    clsPrefix: ref('rch-'),
  }
  return {
    ...state
  };
})
```