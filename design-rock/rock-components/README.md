# 未名磐石Design-基础组件

## 组件自动安装标准

### 第一类：使用ComponentDriver中的实现

1. 文件名称作为组件安装的基础名称，最后注册为`WmqXXXX`。比如`Button.vue`最后注册为`WmqButton`的组件
2. 语法糖中的name为了好扩展，直接按照标准写`WmqButton`
3. 简介
   1. 属性传递：`<Button v-bind="$attrs" ref="Ref">`
      > `$attrs`是为了支持`v-bind`的属性传递，`ref`是为了支持`ref`的传递
   2. 插槽传递：`<template #[item]="data" v-for="item in Object.keys($slots)" :key="item">`
      > `$slots`提取所有声明的插槽，`v-for`取出`item`声明动态插槽，做动态插槽，`data`取出插槽数据，传递给子插槽

```vue
<script lang="ts" setup>
import { maps } from '#/index'
import { ref } from 'vue'
const Button = maps.get('Button')
const Ref = ref(null)
defineExpose({ Ref })
</script>
<template>
  <Button v-bind="$attrs" ref="Ref">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Button>
</template>

<style scoped></style>
```

### 第二类：RockComponent中实现，支持三方组件驱动覆盖

这类组件会在`RockComponent`中独立实现，可以脱离组件库直接使用。需要注意的有点：

1. `RockComponent`中的组件只能依赖本库中的组件，不要直接对外使用Driver的组件
2. 需要独立出自己的`Props`和`Emits`定义，方便组件driver覆盖实现的时候规范输入输出，不需要可以没有
3. 如果使用方（比如sample工程）希望使用`RockComponent`中实现的组件可以直接传递`null`到组件字典中，**注意**：必须是`null`

#### 命名规范和Type处理

导出的组件需要出于TS的范型推断需求，需要主动导出Type，需要遵守如下规范。
为了简化组件的导出、使用和类型推断，设计整体的组件导出模式如下

##### 组件命名规则

名称的组成`[组件来源][模块名][组件名]`

> 举例：`WmqRockCol` => `[Wmq][Rock][Col]`

1. 组件模块：标注组件的所属模块，`Rock`表明磐石模块内的组件
2. 组件来源：未名企鹅开发的组件统一使用`Wmq`作为前缀
3. 组件名：描述组件的作用

##### 单个组件的包内部结构

```md
├── README.md
├── index.ts
├── src
│   ├── 组件1.tsx
│   └── 组件.vue
```

`index.ts`用来声明组件和props的类型，不必把组件类型导出，导出的组件声明模块和组件即可`RockCol` => `[Rock][Col]`

``` ts
export { default as RockCol } from './src/Col.vue';
```

##### [types.d.ts](types.d.ts)全局类型声明

为了能让其他模块识别出组件来使用，内部声明vue模块的重载

```ts
import type { RockCol } from "./src/col";

declare module 'vue' {
  export interface GlobalComponents {
    WmqCol: typeof RockCol;
  }
}
```
defineOptions({
  name: RockComponent.Iconify,
  customOptions: {
    isPresetComponent: true,
  },
})
#### 开发这类组件的标准

> Vue3.3之后支持了新的编译宏函数`defineOptions`。不再需要双`<scrip>`来支持

1. 组件对象要包含标准属性`name:string`和`isPresetComponent:boolean`
    - `name:string`：组件名称，必须要有，且满足`RockComponent`枚举要求，必须使用`name: RockComponent.Iconify`形式定义。枚举添加
    - `isPresetComponent:boolean`：是否自动注册，为`true`的组件才会在驱动未提供的情况下直接注册到组件中
    - 预设组件会随着组件库安装全局注册，非全局安装，希望依赖组件可以选择`useComponent`来获取组件
2. Lib载入后会扫描全局加载的驱动载入到内存中用于渲染

##### LocalePicker.vue

```Vue
<script lang="ts" setup>
import { ref, watchEffect, unref, computed } from 'vue'
import { context } from '../../../bridge'
defineOptions({
  name: RockComponent.LocalePicker,
  customOptions: {
    isPresetComponent: true,
  },
})
......
</script>

<template>
  <WmqDropdown
    trigger="click"
    :options="getLocaleList"
    @select="handleMenuEvent"
  >
    <span class="flex items-center cursor-pointer">
      <WmqIconify icon="ion:language" hoverPointer />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </WmqDropdown>
</template>

<style lang="less"></style>
```

##### index.ts

```ts
import LocalePicker from './src/LocalePicker.vue'

export type RockLocalePicker = InstanceType<typeof LocalePicker>
export const RockLocalePicker = LocalePicker
```

## 组件类型导出后的使用问题

```typescript
import { type Form } from '@rchitect-rock/components'
const aaa = {trigger:[
  {
    type: 'click',
    name: 'blur',
    required: true,
  },
  {
    name: 'change',
    value: true,
  },
]} as Form.Rules;
```

## 其他相关文档

[Iconfy图标地址](https://icon-sets.iconify.design/)
