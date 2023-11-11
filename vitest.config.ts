/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
export default defineConfig({
  plugins: [
    VueMacros.vite({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(),
      },
    }),
  ],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    globals: true,
    clearMocks: true,
    // environment: 'jsdom',
    environment: 'happy-dom',
    reporters: ['default', 'vitest-sonar-reporter'],
    // testTransformMode: {
    //   web: 
    // },
    // transformMode: {
    //   web: [/\.[jt]sx$/],
    // },
    outputFile: {
      'vitest-sonar-reporter': './vitest-report/sonar-report.xml',
    },
    coverage: {
      provider: 'v8',
      reporter: 'lcov',
      reportsDirectory: './vitest-report/coverage',
    },
  },
})
