import { createViteConfig } from '@rchitect-cli/vite'
import { defineConfig, PluginOption, UserConfig } from 'vite'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const config: UserConfig = await createViteConfig(command, mode, process.cwd(), { preset: 'antd' })
  // const autoImport = AutoImport({
  //   resolvers: [ElementPlusResolver()],
  // }) as PluginOption
  // const components = Components({
  //   resolvers: [ElementPlusResolver()],
  // }) as PluginOption
  // config.plugins?.push(autoImport, components)
  return config;
})
