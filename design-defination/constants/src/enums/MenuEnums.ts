/**
 * 布局类型
 * 
 * @description: menu type
 */
export enum MenuTypeEnum {
  /**
   * 侧边栏布局
   */
  SIDEBAR = 'sidebar',
  /**
   * 混合侧边栏布局
   */
  MIX_SIDEBAR = 'mix-sidebar',
  /**
   * 混合布局
   */
  MIX = 'mix',
  /**
   * 顶部菜单
   */
  TOP_MENU = 'top-menu',
  /**
   * SIDEBAR + 顶部推荐功能
   */
  SIDER_WITH_TOP_RECOMMEND = 'sidebar-with-top-recommend',
}

// 折叠触发器位置
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 菜单中间
  CENTER = 'CENTER',
  // 头部
  HEADER = 'HEADER',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

// menu mode
export enum MenuModeEnum {
  /**
   * 垂直菜单
   */
  VERTICAL = 'vertical',
  /**
   * 水平菜单
   */
  HORIZONTAL = 'horizontal',
  /**
   * 右起布局垂直菜单
   */
  VERTICAL_RIGHT = 'vertical-right',
  /**
   * 内嵌菜单
   */
  INLINE = 'inline',
}

export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT,
}

export enum TopMenuAlignEnum {
  CENTER = 'center',
  START = 'start',
  END = 'end',
}

export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
