import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
import sidebar from './app/side-bar'
import nav from './app/nav'
import path, { dirname } from 'path'
import MarkdownIt from 'markdown-it'

function fileURLToPath(fileURL: string) {
  let filePath = fileURL;
  if (process.platform === 'win32') {
    filePath = filePath.replace(/^file:\/\/\//, '');
    filePath = decodeURIComponent(filePath);
    filePath = filePath.replace(/\//g, '\\');
  } else {
    filePath = filePath.replace(/^file:\/\//, '');
    filePath = decodeURIComponent(filePath);
  }
  return filePath;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rchitect Design",
  description: "Architect Design Apps",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config: (md: MarkdownIt) => {
      vitepressDemoPlugin(md, {
        demoDir: path.resolve(
          dirname(fileURLToPath(import.meta.url)),
          '../demos'
        ),
        stackblitz: {
          show: true,
        },
        codesandbox: {
          show: false,
        },
      })
    }
  },
  vite: {
    build: {
      target: 'esnext'
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('swc-')
      }
    }
  }
})
