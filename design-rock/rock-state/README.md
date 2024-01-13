# Rchitect Rock State

## 概述

RockState是一个应用各个数据模型的运行状态，它的设计目标是为了解决应用中的只读状态的响应式转化。

## 为什么需要RockState

应用在运行中一定会涉及到数据对象的管理和抽象，这些数据对象往往是支撑应用的正常运行的关键。可以粗略的理解为数据库或缓存管理设施。
应用启动之前需要从Setting中获取应用的初始化设置，包括Header、Menu、Footer等等，这些设置都是应用启动之前就可以获取到的一些设置。
而应用运行中也会产生自己的数据，这些数据的生命周期往往是与用户身份数据的生命周期保持一致。

## RockState的设计思路

State中存储的数据需要关注一下三点：

- 应用状态是用来记录应用运行中产生的一些状态信息。
- 这些状态都是由使用者，也就是真正的用户来设置的一些状态，比如菜单打开和收起
- 这些状态一般不需要持久化，就算持久化也应该和用户登录状态绑定在一起

## 如何声明一个State

State的本质是Repository，是将Repository的定义在应用运行状态中的一种表现形式。State的定义需要遵循以下原则：

### Data的定义

定义Data可以直接使用`Repository.Data`类型工具，需要重点约束字段名称的规则：

#### 开关类属性

- `isXXX`的字段表示一个布尔值，用于管理开关、状态等二态值，用来表示程序的运行值状态，比如是否是全屏状态
- `supportXXX`的字段也表示一个布尔值，用于判断是否支持某个功能，常用于表示功能是否开启，组件是否展示等。比如是否支持全屏功能

#### 其他属性

其他属性的命名需要遵循`xxxXXX`的驼峰命名规则，比如`headerBgColor`，`header`表示属性归属，`BgColor`表示属性用途。
这样的命名规则可以让属性的含义更加明确，也方便后续的扩展

#### 一个Data的定义
```ts
import { Repository } from "@rchitect-design/types";

export namespace SomeAppRuntimeState {
  export type Data = Repository.Data<{
    /**
     * 是否支持面包屑
     */
    isShowBreadcrumb:boolean,
    /**
     * 是否支持全屏
     */
    supportFullScreen:boolean,
    /**
     * 是否全屏
     */
    isFullScreen:boolean,
    /**
     * 头部背景色
     */
    headerBgColor:string,
  }>

}
```
### Actions的定义

Actions跟Pinia设计的概念保持一致，在Rchitect项目中主要做了如下变形和约束：
1. Action的定义需要遵循`verbXXX`的命名规则，比如`setPermCodeList`，`set`表示动作，`PermCodeList`表示动作的目的或者作用
2. 禁止写一些直接操作State的方法，比如`setXXX`，`resetXXX`等，这些方法应该在`Repository`中定义，而不是在`State`中定义


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

这种情况下需要声明State，State作为一个单纯的数据值对象声明，需要被声明为一个存粹KV数据类型，不要在里面添加方法

```ts
import { Repository } from "./repository";

export declare namespace AppState {
  export interface State {
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
  AppState: Symbol.for(`${ packName }/Auth.State`) as ServiceIdentifier<AppState.State>,
  AppStateActions: Symbol.for(`${ packName }/AppState.Action`) as ServiceIdentifier<AppState.Action>,
  AppStateGetters: Symbol.for(`${ packName }/AppState.Getter`) as ServiceIdentifier<AppState.Getter>,
}
```