import { defineStore } from '#/pinia'
import { FooterLinkOptions, DefineSiteOptions } from '@rchitect-design/types'
import { $t } from '@weiming-rock/locale'
// @ts-ignore
// import defaultLogo from '@/assets/images/logo.png'
// @ts-ignore
// import defaultAvatar from '@/assets/images/header.jpg'
import { getAppConfig, getGlobalConfig } from '@vben/utils'

// const { t } = useI18n()

// @ts-ignore
const { title } = getGlobalConfig(import.meta.env)

// github repo url
export const GITHUB_URL = 'https://git.wmqhealth.com/weiming-framework/weiming-design'

// vue-vben-admin-next-doc
export const DOC_URL = 'https://git.wmqhealth.com/weiming-framework/weiming-design'

// site url
export const SITE_URL = 'https://www.tenez.cn/'

const links: FooterLinkOptions[] = [
  {
    label: $t('layout.footer.onlinePreview'),
    url: SITE_URL,
  },
  {
    icon: 'uim:github',
    url: GITHUB_URL,
  },
  {
    label: $t('layout.footer.onlineDocument'),
    url: DOC_URL,
  },
]

export const useSiteGeneral = defineStore({
  id: 'APP_SITE_GENERAL_OPTIONS',
  state: (): DefineSiteOptions => ({
    // TODO 解决Logo的默认读取逻辑
    // logo: defaultLogo,
    logo: '',
    // TODO 解决头像和用户名的异步读取逻辑和默认值逻辑
    // avatar: defaultAvatar,
    avatar: '',
    username: 'Randy',
    title,
    copyright: $t('sys.app.copyright'),
    links: links,
    site: getGlobalConfig(import.meta.env),
    env: getAppConfig(import.meta.env),
  }),
})
