import type { DefaultTheme } from 'vitepress'
const sidebar:DefaultTheme.Sidebar = [
  {
    text: 'Examples',
    items: [
      { text: 'Markdown Examples', link: '/markdown-examples' },
      { text: 'Runtime API Examples', link: '/api-examples' }
    ]
  },
  {
    text: 'Components Demo',
    items: [
      { text: 'Button', link: '/components/button' }
    ]
  }
]

export default sidebar
