import { ContentLayoutEnum, RouterTransitionEnum } from "@rchitect-design/constants"
import { Ref } from "vue-demi"

export interface ContentConfigOptions {
  fullScreen: boolean
  mode: ContentLayoutEnum
}

export interface LogoConfigOptions {
  show: boolean
  visible: boolean
  showTitle: boolean
}

export interface FooterConfigOptions {
  show: boolean
  visible: boolean
  readonly height: number
}

export interface TransitionConfigOptions {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface FooterLinkOptions {
  label?: Ref<string>
  icon?: string
  target?: '_self' | '_blank'
  url: string
}