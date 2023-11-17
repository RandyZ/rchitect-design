# 组件库驱动

主要目的是为了隔离每个App对三方组件库的依赖。

根据实际情况明确以下原则

## 原则一 尽量使用`@rchitect-rock/component`中定义好的组件

## 原则二 需要按需加载可以app中加载`ComponentProvider`，通过`@rchitect-rock/component`的`RockComponent`，直接从Provider中获取

## 原则三 不要在app中直接import三方库的组件，最低要求也要从`component-driver-XXX`中载入组件
