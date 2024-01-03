# Rchitect Rock State

## 概述

状态管理的设计思路：

- 应用状态是用来记录应用运行中产生的一些状态信息。
- 这些状态都是由使用者，也就是真正的用户来设置的一些状态，比如菜单打开和收起
- 这些状态一般不需要持久化，就算持久化也应该和用户登录状态绑定在一起

不要这个库中具体实现状态的共享（比如Pinia），这里的声明只用来保存应用运行时状态，只提供接口和声明。 另外可以提供一些辅助方法

## 

## 如何声明一个State类型

声明一个`Repository`会分两种情况

1. Types中声明了类型：这种情况下不需要在声明NS来创建数据类型，直接使用Types中声明的类型即可
2. 未声明类型：这种情况下需要使用NS来创建数据类型，然后在NS中声明Repository的具体类型

## 例子

### 例一：Types中声明了类型，包装成`Repository`

这种情况下不需要声明State，Key直接使用已经声明的类型即可

```ts
export namespace AppSidebar {
  export interface Getters extends Repository.Getters {
    isNoneTrigger:ComputedRef<boolean>;
    isCenterTrigger:ComputedRef<boolean>;
    isFooterTrigger:ComputedRef<boolean>;
    isHeaderTrigger:ComputedRef<boolean>;
  }
}

// Bean的声明
import { SidebarConfigOptions } from '@rchitect-design/types'

export default {
  // 如果Types中声明Bean这里可以直接转介一下
  AppSidebarState: Symbol.for(`${ pack.name }/SidebarConfigOptions`) as ServiceIdentifier<SidebarConfigOptions>,
  AppSidebarGetters: Symbol.for(`${ pack.name }/AppSidebar.Getters`) as ServiceIdentifier<AppSidebar.Getters>
}
```

### 例二：新建`Repository`

这种情况下需要声明State，Key使用NS中定义的类型来创建

```ts
import { Repository } from "./repository";

export declare namespace AppState {
  export interface State extends Repository.State {
    clsPrefix:string
    fullContent:boolean
    mobile:boolean
    theme:string
    loading:boolean
    appTimerId?:TimeoutHandle
  }

  export type Getter = {
    getFullContent:ComputedRef<boolean>;
  };

  export interface Action {
    /**
     * 恢复默认状态
     */
    restoreState:() => void
  }
}

// Bean的声明
export default {
  AppState: Symbol.for(`${packName}/Auth.State`) as ServiceIdentifier<AppState.State>,
  AppStateActions: Symbol.for(`${packName}/AppState.Action`) as ServiceIdentifier<AppState.Action>,
  AppStateGetters: Symbol.for(`${packName}/AppState.Getter`) as ServiceIdentifier<AppState.Getter>,
}
```