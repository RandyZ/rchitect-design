import { nextTick, Ref, ref, unref } from 'vue-demi';
import { cloneDeep } from 'lodash-es';
import { filterTree, forEachTree, PromisifyFn, useDebounceFn, useScrollTo, } from '@rchitect-rock/tools';
import { useI18n } from '@rchitect-rock/locale';
import { Beans as routerBeans, MenuFunctions, RouteOperator } from '@rchitect-rock/router';
import { I18nGlobalTranslation } from '@rchitect-rock/locale/src/use-i18n';
import { Autowired, Bean } from '@rchitect-rock/ioc';
import { Beans as eventBeans, type DataEventBus } from '@rchitect-rock/events';
import { Menu } from '@rchitect-design/types';

// import { resolveContextOptions } from '#/../bridge';

export interface SearchResult {
  title:string;
  name:string;
  path:string;
  icon?:string;
}

export const SearchBoxEvents = {
  BoxClose: Symbol.for('Search:Close')
}

export interface SearchWindow {
  searchItemDoms:Ref<HTMLElement[]>
  scrollWrap:Ref<ElRef>
}

@Bean()
export class SearchContext {
  static REG_CODE:string[] = [ '$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|', ];
  keyword:Ref<string>;
  searchResult:Ref<SearchResult[]>;
  handleSearch:PromisifyFn<(e:string) => void>;
  activeIndex:Ref<number>;
  private i18n:{
    t:I18nGlobalTranslation;
  };
  private isMenuLoading:boolean;
  private menuList:Array<Menu> = [];
  private routeOperator:RouteOperator;
  private dataEventBus:DataEventBus;

  constructor(
    @Autowired(routerBeans.RouteOperator) routeOperator:RouteOperator,
    @Autowired(eventBeans.DataEventBus) dataEventBus:DataEventBus,
  ) {
    this.keyword = ref('');
    this.searchResult = ref<SearchResult[]>([]);
    this.handleSearch = useDebounceFn(this.search, 200);
    this.activeIndex = ref(-1);
    this.routeOperator = routeOperator;
    this.dataEventBus = dataEventBus;
    this.isMenuLoading = true;
    this.i18n = useI18n();
  }

  /**
   * 加载菜单，每次搜索都需要重新加载当前用户的可搜菜单，方法是异步方法，等待执行完成之后再执行搜索
   */
  async mountMenu() {
    const { t } = useI18n();
    this.isMenuLoading = true;
    const list = await MenuFunctions.getMenus();
    this.menuList = cloneDeep(list);
    forEachTree(this.menuList, (item) => {
      item.name = t(item.name);
      item.title = t(item.title);
    });
    this.isMenuLoading = false;
  }

  /**
   * 实际执行搜索
   *
   * @param e
   * @returns
   */
  private search(key?:string) {
    const keywordRef = this.keyword;
    if (this.isMenuLoading) {
      keywordRef.value = '';
      this.searchResult.value = [];
      return;
    }
    keywordRef.value = key?.trim() || '';
    if (!key) {
      this.searchResult.value = [];
      return;
    }
    const reg = this.createSearchReg(unref(keywordRef));
    const filterMenu = filterTree(this.menuList, (item) => {
      return (reg.test(item.title) || reg.test(item.name)) && !item.hideMenu
    });
    this.searchResult.value = this.handlerSearchResult(filterMenu, reg);
    this.activeIndex.value = 0;
  }

  /**
   * 处理搜索结果
   * @param filterMenu
   * @param reg
   * @param parent
   * @returns
   */
  handlerSearchResult(filterMenu:Menu[], reg:RegExp, parent?:Menu) {
    const ret:SearchResult[] = [];
    filterMenu.forEach((item) => {
      // {
      //   path: 'workbench',
      //   name: 'Workbench',
      //   component: Routes.Workbench,
      //   meta: {
      //     title: 'routes.dashboard.workbench',
      //   },
      // }
      const { name, title, path, icon, children, hideMenu, meta } = item;
      const isLeafRoute = !children?.length || meta?.hideChildrenInMenu;
      if (
        !hideMenu && (reg.test(name) || reg.test(title)) && isLeafRoute
      ) {
        let retName, retTitle;
        if (parent?.name) {
          retName = `${ parent.name } > ${ name }`
          retTitle = `${ parent.title } > ${ title }`
        } else {
          retName = name;
          retTitle = '';
        }
        ret.push({ name: retName, title: retTitle, path, icon });
      }
      if (
        // 路由元数据中没配置了隐藏子菜单，且有子菜单。开始过滤子菜单，递归调用后加入搜索结果
        !meta?.hideChildrenInMenu && Array.isArray(children) && children.length
      ) {
        ret.push(...this.handlerSearchResult(children, reg, item));
      }
    });
    return ret;
  }

  /**
   * close search modal
   */
  handleClose() {
    this.searchResult.value = []
    this.dataEventBus.$emit(SearchBoxEvents.BoxClose, {})
  }

  /**
   * Enter key stroke
   * @param e
   */
  handleMouseenter(e:any) {
    const index = e.target.dataset.index
    this.activeIndex.value = Number(index)
  }

  /**
   * Arrow key up
   * @param domRefs
   * @param scrollWrap
   * @returns
   */
  handleUp(searchWindow?:SearchWindow) {
    if (!this.searchResult.value.length) return
    this.activeIndex.value--
    if (this.activeIndex.value < 0) {
      this.activeIndex.value = this.searchResult.value.length - 1
    }
    if (searchWindow) {
      this.handleScroll(searchWindow)
    }
  }

  /**
   * Arrow key down
   * @param domRefs
   * @param scrollWrap
   * @returns
   */
  handleDown(searchWindow?:SearchWindow) {
    if (!this.searchResult.value.length) return
    this.activeIndex.value++
    if (this.activeIndex.value > this.searchResult.value.length - 1) {
      this.activeIndex.value = 0
    }
    if (searchWindow) {
      this.handleScroll(searchWindow)
    }
  }

  /**
   * When the keyboard up and down keys move to an invisible place the scroll bar needs to scroll automatically
   * @param domRefs
   * @param scrollWrap
   * @returns
   */
  private handleScroll(searchWindow:SearchWindow) {
    const refList = unref(searchWindow.searchItemDoms)
    if (
      !refList ||
      !Array.isArray(refList) ||
      refList.length === 0 ||
      !unref(searchWindow.scrollWrap)
    ) {
      return
    }

    const index = unref(this.activeIndex)
    const currentRef = refList[index]
    if (!currentRef) {
      return
    }
    const wrapEl = unref(searchWindow.scrollWrap)
    if (!wrapEl) {
      return
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.offsetHeight
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight,
    })
    start()
  }

  /**
   * enter keyboard event
   * @returns
   */
  async handleEnter() {
    if (!this.searchResult.value.length) {
      return
    }
    const result = unref(this.searchResult)
    const index = unref(this.activeIndex)
    if (result.length === 0 || index < 0) {
      return
    }
    const to = result[index]
    this.handleClose()
    await nextTick()
    this.routeOperator.go(to.path)
  }

  /**
   * 创建搜索正则
   * @param key
   * @returns
   */
  private createSearchReg(key:string) {
    const keys = [ ...key ].map((item) => this.transform(item));
    const str = [ '', ...keys, '' ].join('.*');
    return new RegExp(str);
  }

  /**
   * 转移正则字符
   * @param c
   * @returns
   */
  private transform(c:string) {
    return SearchContext.REG_CODE.includes(c) ? `\\${ c }` : c;
  }
}
