import { toRaw, ref } from 'vue'
import  { type RouteLocationNormalized, useRouter } from '@rchitect-rock/router'
import { diKT } from '@rchitect-rock/ioc'
import Keys from '#/../beankeys'

export function initAffixTabs(): string[] {
  const affixList = ref<RouteLocationNormalized[]>([])
  const tabStore = diKT(Keys.MultipleTabStore)
  const router = useRouter()
  /**
   * @description: Filter all fixed routes
   */
  function filterAffixTabs(routes: RouteLocationNormalized[]) {
    const tabs: RouteLocationNormalized[] = []
    routes &&
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push(toRaw(route))
        }
      })
    return tabs
  }

  /**
   * @description: Set fixed tabs
   */
  async function addAffixTabs(): Promise<void> {
    const affixTabs = filterAffixTabs(
      router.getRoutes() as unknown as RouteLocationNormalized[],
    )
    affixList.value = affixTabs
    for (const tab of affixTabs) {
      await tabStore.checkTab({
        meta: tab.meta,
        name: tab.name,
        path: tab.path,
      } as unknown as RouteLocationNormalized)
    }
  }

  let isAddAffix = false

  if (!isAddAffix) {
    addAffixTabs().catch()
    isAddAffix = true
  }
  return affixList.value
    .map((item) => item.meta?.title)
    .filter(Boolean) 
}

// tab draggable
// export function useTabsDrag(affixTextList: string[]) {
//   const tabStore = useMultipleTabStore();
//   const { multiTabsSetting } = projectSetting;
//   nextTick(() => {
//     if (!multiTabsSetting.canDrag) return;
//     const el = document.querySelectorAll(
//       `.${prefixCls} .ant-tabs-nav-wrap > div`,
//     )?.[0] as HTMLElement;
//     const { initSortable } = useSortable(el, {
//       filter: (e: ChangeEvent) => {
//         const text = e?.target?.innerText;
//         if (!text) return false;
//         return affixTextList.includes(text);
//       },
//       onEnd: (evt) => {
//         const { oldIndex, newIndex } = evt;
//
//         if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
//           return;
//         }
//
//         tabStore.sortTabs(oldIndex, newIndex);
//       },
//     });
//     initSortable();
//   });
// }
