# Rchitect Design Types

## 概述

Rchitect Design Types是一个用来描述Rchitect Design中各个模块的数据结构的类型声明库。
其中及包含了Rchitect Design中各个模块的数据结构，也包含了一些类型编程的辅助工具。

## 类型说明

> 待完善

## 工具说明

### Repository
[Repository](src/types/repository.ts)是一个辅助声明数据模型的类型工具，目标是规范数据模型的声明。工具的设计思想完全参照了[Pinia](https://pinia.vuejs.org)的设计。
在Pinia的State、Getter和Actions的基础上合并State和Getters的声明，声明到Data中。

- Data：数据模型，用来描述数据结构，同时其中增加了Actions的钩子函数可选项，类型声明时可以选择是否增加。
    > 之所以将State和Getters合并，主要是在面向接口类型编程的过程中并不希望具体看到是State还是Getters，而希望开发者直接关注数据模型。 
- Actions: 数据模型的操作，用来限制对一些模型操作的声明。
