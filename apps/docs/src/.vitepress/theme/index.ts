// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { defineCustomElements } from "@rchitect/components/loader";

// 确保在客户端环境下执行
if (typeof window !== 'undefined') {
  defineCustomElements();
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.config.compilerOptions.isCustomElement = (tag) =>
      tag.startsWith("swc-");
  }
} satisfies Theme
