import { computed, ref, unref } from 'vue-demi'
import { useElementSize } from '@rchitect-rock/tools'
import { useAppConfig } from '@rchitect-rock/hooks'

export const useComosables = () => {
  const appConfigState = useAppConfig();
  const headerRef = ref<HTMLElement>()
  const tabRef = ref<HTMLElement>()
  const footerRef = ref<HTMLElement>()
  const { height: headerHeight, width: headerWidth } = useElementSize(headerRef)
  const { height: tabHeight, width: tabWidth } = useElementSize(tabRef)
  const { height: footerHeight, width: footerWidth } = useElementSize(footerRef)
  const omitContentHeight = computed(() => {
    return unref(headerHeight) + unref(tabHeight)
  })
  const contentFixedHeight = computed(() => {
    return unref(appConfigState.headerSetting)?.fixed ? `calc(100vh - ${unref(omitContentHeight)}px)` : 'auto'
  })
  const contentStyle = computed(() => {
    return {
      height: unref(contentFixedHeight),
      minHeight: unref(contentFixedHeight)
    }
  })
  const mainStyle = computed(() => {
    return {
      display: 'flex',
      '--wmq-main-height': `calc(100vh - ${unref(omitContentHeight) + unref(footerHeight)}px)`,
      minHeight: 'var(--wmq-main-height)',
    }
  })
  return {
    headerRef,
    tabRef,
    footerRef,
    headerHeight,
    headerWidth,
    tabHeight,
    tabWidth,
    footerHeight,
    footerWidth,
    contentFixedHeight,
    omitContentHeight,
    contentStyle,
    mainStyle
  }
}
