# Vite的通用配置

## 一、通用的Vite Config构建

```Typescript
/**
 * Create vite config
 * @param command 构建命令
 * @param mode 构建模式
 * @param cwd 当前工作目录
 * @param param3 预设值
 * @returns 
 */
export async function createViteConfig(
  command: 'build' | 'serve',
  mode: string,
  cwd: string,
  { preset }: { preset: PresetType }
): Promise<UserConfig>;
```

`createViteConfig`方法用于构造Vite的基础配置，方法中封装了大部分通用配置，新工程可以直接调用

```Typescript
import { createViteConfig } from '@config/vite'
import { defineConfig, UserConfig, UserConfigExport } from 'vite'

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  return await createViteConfig(command, mode, process.cwd(), {preset: 'antd'})
}) as UserConfigExport
```

## 二、插件体系

工程中的`src\plugins`中定义了Vite中常用的插件

### 1、`MonoRepoResolverPlugin` 多Workspace别名插件

由于工程的Vite通过脚本统一配置，所以在不同的模块中使用相同的alias会出现路径解析异常，`MonoRepoResolverPlugin`可以解决此问题

1. 工程下的目录结构需要满足标准的Node工程，比如：

  ```Plain Text
  ├── index.ts
  ├── package.json
  ├── src
  │   ├── xxx
  └── tsconfig.json
  ```

2. `#`会被解析到`XXX/src`下
3. 如果是Typescript环境下，可以定义tsconfig来辅助代码提示

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "#/*": ["src/*"]
    },
  }
}
```
