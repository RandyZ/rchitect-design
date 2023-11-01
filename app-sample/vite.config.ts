import { createViteConfig } from '@rchitect-cli/vite'
import { defineConfig, UserConfig } from 'vite'

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const config: UserConfig = await createViteConfig(command, mode, process.cwd(), { preset: 'antd' })
  return config;
})
