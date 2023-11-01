import { ThemeEnum } from "@rchitect-design/constants"

export interface HeaderConfigOptions {
  theme: ThemeEnum
  show: boolean
  visible: boolean
  bgColor: string
  fixed: boolean
  showFullScreen: boolean
  showDoc: boolean
  showNotice: boolean
  showSearch: boolean
  showLocalePicker: boolean
  showSetting: boolean
  readonly height: number
  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
}