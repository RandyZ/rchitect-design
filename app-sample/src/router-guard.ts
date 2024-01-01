import {
  createBasicGuard,
  createParamMenuGuard,
} from '@rchitect-rock/router';
import { createAuthGuard } from '@rchitect-app/account';
import { GUARDS } from '@rchitect-rock/layouts';
import { AppContext } from "@rchitect-rock/base-package";

/**
 * 异步启动路由守卫
 *
 * @param appContext 应用上下文
 * @returns Promise
 */
async function setupRouteGuard(appContext:AppContext) {
  createBasicGuard(appContext);
  createAuthGuard(appContext);
  appContext.registerRouteGuards(GUARDS.createTabsGuard())
  // must after createPermissionGuard (menu has been built.)
  createParamMenuGuard(appContext);
}

export { setupRouteGuard };
