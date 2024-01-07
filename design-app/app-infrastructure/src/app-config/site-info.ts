import { defineStore } from 'pinia'
import { FooterLinkOptions } from '@rchitect-design/types'
import { $t } from '@rchitect-rock/locale'
import { AppSiteInfo, Beans as settingBeans } from '@rchitect-rock/settings'
// @ts-ignore
// import defaultLogo from '@/assets/images/logo.png'
// @ts-ignore
// import defaultAvatar from '@/assets/images/header.jpg'
import { diKT } from "@rchitect-rock/ioc";
import { readonly, ref, unref } from "vue-demi";
import mergeWith from "lodash-es/mergeWith";
import merge from "lodash-es/merge";

// github repo url
export const GITHUB_URL = 'https://github.com/RandyZ/rchitect-design'

// vue-vben-admin-next-doc
export const DOC_URL = 'https://github.com/RandyZ/rchitect-design'

// site url
export const SITE_URL = 'https://github.com/RandyZ/rchitect-design'

const links:FooterLinkOptions[] = [
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

export const useSiteInfo = defineStore('AppSiteInfo', () => {
  const globalConfig = diKT(settingBeans.GlobConfig)
  const projectSetting = diKT(settingBeans.DefaultProjectSetting)
  const state:AppSiteInfo.State = {
    // TODO 解决Logo的默认读取逻辑
    // logo: defaultLogo,
    logo: ref(''),
    // TODO 解决头像和用户名的异步读取逻辑和默认值逻辑
    // avatar: defaultAvatar,
    avatar: ref(''),
    username: ref('Randy'),
    title: ref(globalConfig.title),
    copyright: $t('sys.app.copyright'),
    links: ref(links),
    site: readonly(globalConfig),
    env: readonly(projectSetting),
  }
  const actions:AppSiteInfo.Actions = {
    setSiteInfoAction(configs:Partial<AppSiteInfo.State>):void {
      mergeWith(state, configs, (objValue, srcValue) => {
        const theVal = unref(objValue)
        return merge(theVal, srcValue)
      })
    },
  }
  return {
    ...state,
    ...actions
  }
})
