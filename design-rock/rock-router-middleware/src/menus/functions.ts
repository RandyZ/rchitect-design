import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import { isUrl, filterTree, computedAsync, getTreeItemAllChild } from '@rchitect-rock/tools'
import { pathToRegexp } from 'path-to-regexp'
import type { Menu } from '@rchitect-design/types'
import { diKT } from '@rchitect-rock/ioc';
import { Beans } from '#/../beankeys';
import { Beans as stateBeans } from '@rchitect-rock/state';
import { getAllParentPath } from './menu';
import { Ref, computed, ref, unref } from 'vue-demi';
import isEmpty from 'lodash-es/isEmpty';
import startsWith from 'lodash-es/startsWith';

// ===========================
// ==========Helper===========
// ===========================

const useMenuState = () => diKT(Beans.MenuState);
const useRouter = () => diKT(Beans.RouteTable).router;

export const preorderTraversal = (menus: Menu[], currentRoute: RouteLocationNormalized | null, maxLevel: number = 0) => {
  //  最终结果
  const result: Menu[] = [];
  //  暂存栈，重新整理 menus 每一个 以及 当前层级默认为第0级
  const stack: Array<{ menu: Menu, level: number }> = menus.map(menu => ({ menu, level: 0 }));
  //  判断栈的长度是否 大于 0
  while (stack.length) {
    //  从第一个面开始弹出
    const { menu, level } = stack.shift()!;
    //  如果 当前层级和 最大层级相等跳过不进行任何操作
    if (level === maxLevel) {
      continue;
    }
    //  如果 currentRoute 不存在 或 currentRoute.path 以 menu.path 开始开头的
    if (!currentRoute || startsWith(currentRoute.path, menu.path)) {
      //  如果 当前的level 等于 最大长度的上级的 并且children 存在 添加到结果中国呢
      if (level === maxLevel - 1) {
        menu.children && result.push(...menu.children);
      } else {
        //  如果不是最大长度的上一级，需要把数据处理成栈所需要的格式，再次进入循环查找
        menu.children && stack.push(...menu.children.map(child => ({ menu: child, level: level + 1 })));
      }
    }
  }
  return result;
};

/**
 * 按层级获取菜单
 * @param menus
 * @param currentRoute
 * @param maxLevel
 * @returns
 */
export const fetchMenusAtLevel = (menus: Menu[], currentRoute: RouteLocationNormalized | null, maxLevel: number = 0): Menu[] => {
  if (maxLevel <= 0) {
    return menus.filter(menu => !currentRoute || startsWith(currentRoute.path, menu.path))
  } else {
    return preorderTraversal(menus, currentRoute, maxLevel);
  }
}

/**
 * 菜单的钩子函数
 * @param level
 * @param atRoot
 * @returns
 */
export const useMenusAtLevel = (level: number | Ref<number> | undefined = undefined, atRoot = true) => {
  const _level = level || ref(0)
  const _router = useRouter()
  const currentRoute = _router.currentRoute
  const allMenus = computedAsync(async () => await getMenus(), [])
  return {
    menus: computed<Menu[]>(() => {
      const _allMenu = unref(allMenus)
      if (!isEmpty(_allMenu)) {
        return fetchMenusAtLevel(_allMenu, atRoot ? null : unref(currentRoute), unref(_level))
      }
      return []
    }),
    currentRoute
  }
}

async function getAsyncMenus(): Promise<Menu[]> {
  const permissionState = diKT(stateBeans.PermissionState)
  if (useMenuState().isBackMode()) {
    return unref(permissionState.backMenuList).filter(
      (item) => !item.meta?.hideMenu && !item.hideMenu,
    )
  }
  return unref(permissionState.frontMenuList).filter(
    (item) => !item.hideMenu && !item.meta?.hideMenu,
  )
}

/**
 * @description: 获取菜单
 */
export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus()
  if (useMenuState().isRoleMode()) {
    const routes = useRouter().getRoutes()
    return filterTree(menus, basicFilter(routes))
  }
  return menus
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus()
  const shallowMenuList = menus.map((item) => ({
    ...item,
    children: undefined,
  }))
  if (useMenuState().isRoleMode()) {
    const routes = useRouter().getRoutes()
    return shallowMenuList.filter(basicFilter(routes))
  }
  return shallowMenuList
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus()
  const parent = menus.find((item) => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[]
  }
  if (useMenuState().isRoleMode()) {
    const routes = useRouter().getRoutes()
    return filterTree(parent.children, basicFilter(routes))
  }
  return parent.children
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path)
      }
      const isSame = route.path === menu.path
      if (!isSame) return false

      if (route.meta?.ignoreAuth) return true

      return isSame || pathToRegexp(route.path).test(menu.path)
    })

    if (!matchRoute) return false
    menu.icon = (menu.icon || matchRoute.meta.icon) as string
    menu.meta = matchRoute.meta
    return true
  }
};

export const flattenSecondLevel = async () => {
  const menus = await getMenus();
  return menus.map(el => {
    return getTreeItemAllChild(el);
  });
};
