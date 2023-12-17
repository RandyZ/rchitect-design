import type { MultipleTab } from '#/layouts/types';
import { TabActionEnum } from '@rchitect-design/constants';
import { Autowired, Bean } from '@rchitect-rock/ioc';
import {
  RouteLocationNormalized,
  RoutesTable,
  Lib as routeLib,
  Beans,
} from '@rchitect-rock/router';
import type { RouteOperator } from '@rchitect-rock/router';
import TYPES from '#/../beankeys';
import { Beans as stateBeans } from '@rchitect-rock/state';
import type { AppState } from '@rchitect-rock/state';
import { unref } from 'vue';

@Bean()
export class MultipleTabOperator {
  tabStore:MultipleTab.MultipleTabStore;
  appState:AppState.State;
  routesTable:RoutesTable;
  routeOperator:RouteOperator;

  constructor(
    @Autowired(TYPES.MultipleTabStore) tabStore:MultipleTab.MultipleTabStore,
    @Autowired(Beans.RouteOperator) routeOperator:RouteOperator,
    @Autowired(stateBeans.AppState) appState:AppState.State,
    @Autowired(routeLib.types.RouteTable) routesTable:RoutesTable
  ) {
    this.tabStore = tabStore;
    this.appState = appState;
    this.routesTable = routesTable;
    this.routeOperator = routeOperator;
  }

  /**
   *  Whether to open the tab page
   * @returns
   */
  private canIUseTabs():boolean {
    const show = unref(this.appState.tabBar).show;
    if (!show) {
      throw new Error(
        'The multi-tab page is currently not open, please open it in the settings!'
      );
    }
    return show;
  }

  /**
   *  Get current tab
   * @returns
   */
  private getCurrentTab() {
    const { currentRoute } = this.routesTable.router;
    const route = unref(currentRoute);
    return this.tabStore.getTabList.find(
      (item:any) => item.fullPath === route.fullPath
    )!;
  }

  /**
   *  Update tab title
   * @param title
   * @param tab
   * @returns
   */
  private async updateTabTitle(title:string, tab?:RouteLocationNormalized) {
    const canIUse = this.canIUseTabs();
    if (!canIUse) {
      return;
    }
    const targetTab = tab || this.getCurrentTab();
    await this.tabStore.setTabTitle(title, targetTab);
  }

  private async updateTabPath(path:string, tab?:RouteLocationNormalized) {
    const canIUse = this.canIUseTabs();
    if (!canIUse) {
      return;
    }
    const targetTab = tab || this.getCurrentTab();
    await this.tabStore.updateTabPath(path, targetTab);
  }

  private async handleTabAction(
    action:TabActionEnum,
    tab?:RouteLocationNormalized
  ) {
    const canIUse = this.canIUseTabs();
    if (!canIUse) {
      return;
    }
    const currentTab = this.getCurrentTab();
    switch (action) {
      case TabActionEnum.REFRESH_PAGE:
        await this.tabStore.refreshPage(this.routesTable.router);
        await this.routeOperator.redo();
        break;

      case TabActionEnum.CLOSE_ALL:
        await this.tabStore.closeAllTab(this.routesTable.router);
        break;

      case TabActionEnum.CLOSE_LEFT:
        await this.tabStore.closeLeftTabs(currentTab, this.routesTable.router);
        break;

      case TabActionEnum.CLOSE_RIGHT:
        await this.tabStore.closeRightTabs(currentTab, this.routesTable.router);
        break;

      case TabActionEnum.CLOSE_OTHER:
        await this.tabStore.closeOtherTabs(currentTab, this.routesTable.router);
        break;

      case TabActionEnum.CLOSE_CURRENT:
      case TabActionEnum.CLOSE:
        await this.tabStore.closeTab(
          tab || currentTab,
          this.routesTable.router
        );
        break;
      case TabActionEnum.SET_AFFIX:
        // TODO 设计一下固定标签页的逻辑
        break;
      case TabActionEnum.CANCEL_AFFIX:
        // TODO 设计一下取消固定的逻辑
        break;
    }
  }

  affixTab() {
    return this.handleTabAction(TabActionEnum.SET_AFFIX);
  }

  cancelAffixed() {
    return this.handleTabAction(TabActionEnum.CANCEL_AFFIX);
  }

  refreshPage() {
    return this.handleTabAction(TabActionEnum.REFRESH_PAGE);
  }

  closeAll() {
    return this.handleTabAction(TabActionEnum.CLOSE_ALL);
  }

  closeLeft() {
    return this.handleTabAction(TabActionEnum.CLOSE_LEFT);
  }

  closeRight() {
    return this.handleTabAction(TabActionEnum.CLOSE_RIGHT);
  }

  closeOther() {
    return this.handleTabAction(TabActionEnum.CLOSE_OTHER);
  }

  closeCurrent() {
    return this.handleTabAction(TabActionEnum.CLOSE_CURRENT);
  }

  close(tab?:RouteLocationNormalized) {
    return this.handleTabAction(TabActionEnum.CLOSE, tab);
  }

  setTitle(title:string, tab?:RouteLocationNormalized) {
    return this.updateTabTitle(title, tab);
  }

  updatePath(fullPath:string, tab?:RouteLocationNormalized) {
    return this.updateTabPath(fullPath, tab);
  }
}
