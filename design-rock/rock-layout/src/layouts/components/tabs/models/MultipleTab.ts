// import { Store } from '@rchitect-rock/state';
import { RemovableRef } from '@rchitect-rock/tools';
import { RouteLocationNormalized, Router } from '@rchitect-rock/router';
import type { Repository } from "@rchitect-design/types";
import type { ComputedRef, Ref } from "vue-demi";

export namespace MultipleTab {
  export interface State extends Repository.State {
    cacheTabList: Ref<Set<string>>
    tabList: RemovableRef<RouteLocationNormalized[]>
    lastDragEndIndex: Ref<number>
  }

  export interface Getters extends Repository.Getters{
    getTabList: ComputedRef<RouteLocationNormalized[]>;
    getCachedTabList:ComputedRef<string[]>;
    getLastDragEndIndex: ComputedRef<number>;
  };

  export interface Actions extends Repository.Actions {
    /**
     * Update the cache according to the currently opened tabs
     */
    updateCacheTab(): Promise<void>;

    /**
     * Refresh tabs
     */
    refreshPage(router: Router): Promise<void>;
    clearCacheTabs(): void;
    resetState(): void;
    goToPage(router: Router): void;
    checkTab(route: RouteLocationNormalized):Promise<void>;
    addTab(route: RouteLocationNormalized): Promise<void>;
    closeTab(tab: RouteLocationNormalized, router: Router):void;
    // Close according to key
    closeTabByKey(key: string, router: Router): Promise<void>;
    // Sort the tabs
    sortTabs(oldIndex: number, newIndex: number): Promise<void>;

    // Close the tab on the right and jump
    closeLeftTabs(route: RouteLocationNormalized, router: Router): Promise<void>;

    // Close the tab on the left and jump
    closeRightTabs(route: RouteLocationNormalized, router: Router): Promise<void>;
    closeAllTab(router: Router): Promise<void>;

    /**
     * Close other tabs
     */
    closeOtherTabs(route: RouteLocationNormalized, router: Router):Promise<void>;

    /**
     * Close tabs in bulk
     */
    bulkCloseTabs(pathList: string[]): Promise<void>;

    /**
     * Set tab's title
     */
    setTabTitle(title: string, route: RouteLocationNormalized): Promise<void>;
    /**
     * replace tab's path
     **/
    updateTabPath(fullPath: string, route: RouteLocationNormalized): Promise<void>;
  }
  //MultipleTabStore
}


