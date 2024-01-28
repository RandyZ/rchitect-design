import { defineProject, type UserProjectConfigExport } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import viteCli from '@rchitect-cli/vite'

export default defineProject({
  plugins: [
    Vue(),
    viteCli.MonoRepoResolverPlugin()
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    alias: {
      '#': './src'
    }
  }
}) as UserProjectConfigExport