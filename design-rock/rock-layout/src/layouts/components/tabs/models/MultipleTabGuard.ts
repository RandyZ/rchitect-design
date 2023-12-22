import { diKT } from "@rchitect-rock/ioc";
import { Lib, setRouteChange } from '@rchitect-rock/router';
import type { RouteLocationNormalized } from "@rchitect-rock/router";
import type { NavigationGuard } from "@rchitect-design/types";

export function createTabsGuard():NavigationGuard {
  return async (to:RouteLocationNormalized) => {
    const routesTable = diKT(Lib.types.RouteTable)
    if (routesTable.whiteRouteTable.paths.includes(to.path)) return
    // Notify routing changes
    setRouteChange(to)
  }
}