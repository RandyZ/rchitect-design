import { isUrl, findParentPath, mapTree } from '@rchitect-rock/tools';
import cloneDeep from 'lodash-es/cloneDeep';
import type { Menu, MenuModule } from '@rchitect-design/types';

export function getAllParentPath<T = Recordable<any>>(
  treeData: T[],
  path: string
): string[] {
  const menuList = findParentPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}

function joinParentPath(menus: RouteRecordItem[], parentPath = '') {
  for (const element of menus) {
    const menu = element;
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(
        menu.children,
        menu.meta?.hidePathForChildren ? parentPath : menu.path
      );
    }
  }
}

// Parsing the menu module
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule;

  const menuList = [menu];

  joinParentPath(menuList as RouteRecordItem[]);
  return menuList[0];
}

export function transformRouteToMenu(
  routeModList: RouteRecordItem[],
  routerMapping = false
) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: RouteRecordItem[] = [];

  cloneRouteModList.forEach((item) => {
    if (
      routerMapping &&
      item.meta?.hideChildrenInMenu &&
      typeof item.redirect === 'string'
    ) {
      item.path = item.redirect;
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
  // 筛选隐藏子菜单
  routeList.forEach((v) => {
    if (v.meta.hideChildrenInMenu) {
      delete v.children;
    }
  });
  const list = mapTree(routeList, {
    conversion: (node: RouteRecordItem) => {
      const { meta: { hideMenu = false } = {} } = node;

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: node.name,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      };
    },
  });
  joinParentPath(list);
  return cloneDeep(list);
}