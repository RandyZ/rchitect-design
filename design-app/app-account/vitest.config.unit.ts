import { defineProject, type UserProjectConfigExport } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import { MonoRepoResolverPlugin } from '@rchitect-cli/vite'

export default defineProject({
  plugins: [
    Vue(),
    MonoRepoResolverPlugin()
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    alias: {
      '#': './src'
    }
  }
}) as UserProjectConfigExport