import { defineProject } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { MonoRepoResolverPlugin } from '@config/vite'

export default defineProject({
  plugins: [
    Vue(),
    VueJsx(),
    MonoRepoResolverPlugin()
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    alias: {
      '#': './src'
    }
  }
})