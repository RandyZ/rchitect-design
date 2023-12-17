import { diKT } from "@rchitect-rock/ioc";
import { Lib, setRouteChange } from '@rchitect-rock/router';
import type { RouteLocationNormalized } from "@rchitect-rock/router";

export function createTabsGuard() {
  const routesTable = diKT(Lib.types.RouteTable)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  routesTable.router.beforeEach(async (to:RouteLocationNormalized, from:RouteLocationNormalized) => {
    if (routesTable.whiteRouteTable.paths.includes(to.path)) return
    // Notify routing changes
    setRouteChange(to)
  })
}