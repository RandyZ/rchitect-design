import type { Component, Ref } from "vue-demi";
import type { FormItemRule, FormRules } from './src/form/types'
import type { S2DataConfig, S2Options, ThemeCfg, S2Event, S2RenderOptions } from '#/cubeTable/types'
import type { TreeNodeData } from './src/tree/types'
import type { DataDictionary } from "@rchitect-design/types";
import type { RockComponent } from "./src/RockComponent";

export declare namespace CubeTable {
  export type DataConfig = S2DataConfig;
  export type Options = S2Options;
  export type Theme = ThemeCfg;
  export type Meta = Meta;
  export type Fields = Fields;
  export type Data = Data;
  export const Event = S2Event;
  export type RenderOptions = S2RenderOptions
  export type CubeSheetTable = CubeSheetTable
}

export declare namespace Form {
  // 将types.ts中的类型导出
  export type ItemRule = FormItemRule;
  export type Rules = FormRules;
}

export declare namespace Tree {
  export type NodeData = TreeNodeData
}

declare global {
  /**
   * A type that extends the Vue Component type and adds an optional boolean property `isAutoExport`.
   * `isAutoExport` is used to indicate whether the component should be automatically exported.
   */
  type WmqComponent<T extends Component> = Component & {
    customOptions?: {
      /**
       * 是否是预设组件，预设组件不强需要驱动实现，驱动直接设置null即可，undefined表示不启用
       */
      isPresetComponent?: boolean,
      [key: string]: any
    }
    /**
     * 契约组件中会返回一个驱动组件的引用，预设组件中会返回一个预设组件的引用
     * @see {driverRef}
     */
    DriverRef?: Ref<T>
  };
  /**
   * 自动导出函数
   */
  export type AutoExportFunction = Function | { name: string | RockComponent, isPresetComponent: boolean }
  /**
   * A dictionary that maps string keys to `WmqComponent` values.
   */
  type WmqComponentDictionary = DataDictionary<WmqComponent<any>>;
}

import type { RockForm, RockFormItem, RockFormItemGi } from './src/form'
import type { RockIconify } from "./src/iconify";
import type { RockLocalePicker } from "./src/localePicker";
import type { RockTable } from "./src/table";
import type { RockSpace } from "./src/space";
import type { RockDropDown } from "./src/dropdown";
import type { RockAvatar } from "./src/avatar";
import type { RockThing } from "./src/thing";
import type { RockBadge } from "./src/badge";
import type { RockBreadcrumb, RockBreadcrumbItem } from "./src/breadcrumb";
import type { RockButton, RockButtonGroup } from "./src/button";
import type { RockCard } from "./src/card";
import type { RockCheckbox, RockCheckboxGroup } from "./src/checkbox";
import type { RockCol } from "./src/col";
import type { RockConfig } from "./src/config";
import type { RockDatePicker } from "./src/dataPicker";
import type { RockDivider } from "./src/divider";
import type { RockDrawer, RockDrawerContent } from "./src/drawer";
import type { RockEllipsis } from "./src/ellipsis";
import type { RockGrid, RockGridItem } from "./src/grid";
import type { RockInput, RockDynamicInput, RockInputGroup, RockInputGroupLabel } from "./src/input";
import type { RockInputNumber } from "./src/inputNumber";
import type { RockLayout, RockLayoutContent, RockLayoutHeader, RockLayoutFooter, RockLayoutSider } from "./src/layout";
import type { RockList, RockListItem } from "./src/list";
import type { RockMenu } from "./src/menu";
import type { RockModal } from "./src/modal";
import type { RockPopover } from "./src/popover";
import type { RockNotificationProvider } from "./src/prividerNotification";
import type { RockDialogProvider } from "./src/providerDialog";
import type { RockMessageProvider } from "./src/providerMessage";
import type { RockResult } from "./src/result";
import type { RockRow } from "./src/row";
import type { RockScrollbar } from "./src/scrollbar";
import type { RockSelect, RockPopSelect } from "./src/select";
import type { RockSkeleton } from "./src/skeleton";
import type { RockSpace } from "./src/space";
import type { RockSpinner } from "./src/spinner";
import type { RockSwitch } from "./src/switch";
import type { RockTab, RockTabPane, RockTabs } from "./src/tabs";
import type { RockTag, RockDynamicTags } from "./src/tag";
import type { RockText, RockGradientText } from "./src/text";
import type { RockThing } from "./src/thing";
import type { RockTooltip } from "./src/tooltip";
import type { RockTree } from "./src/tree";
import type { RockTreeSelect } from "./src/treeSelect";
import type { RockH1, RockH2, RockH3, RockH4, RockH5, RockH6 } from "./src/typography";
import type { RockCubeTable } from "./src/cubeTable";
import type { RockProgress } from "./src/progress";
import type { RockPageHeader } from "./src/pageHeader";

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    WmqAvatar: typeof RockAvatar;
    WmqBadge: typeof RockBadge;
    WmqBreadcrumb: typeof RockBreadcrumb;
    WmqBreadcrumbItem: typeof RockBreadcrumbItem;
    WmqButton: typeof RockButton;
    WmqButtonGroup: typeof RockButtonGroup;
    WmqCard: typeof RockCard;
    WmqCheckbox: typeof RockCheckbox;
    WmqCheckboxGroup: typeof RockCheckboxGroup;
    WmqCol: typeof RockCol;
    WmqConfig: typeof RockConfig;
    WmqCubeTable: typeof RockCubeTable;
    WmqDatePicker: typeof RockDatePicker;
    WmqDivider: typeof RockDivider;
    WmqDrawer: typeof RockDrawer;
    WmqDrawerContent: typeof RockDrawerContent;
    WmqDropDown: typeof RockDropDown;
    WmqEllipsis: typeof RockEllipsis;
    WmqForm: typeof RockForm;
    WmqFormItem: typeof RockFormItem;
    WmqFormItemGi: typeof RockFormItemGi;
    WmqGrid: typeof RockGrid;
    WmqGridItem: typeof RockGridItem;
    WmqIconify: typeof RockIconify
    WmqInput: typeof RockInput;
    WmqInputNumber: typeof RockInputNumber;
    WmqDynamicInput: typeof RockDynamicInput;
    WmqInputGroup: typeof RockInputGroup;
    WmqInputGroupLabel: typeof RockInputGroupLabel;
    WmqLayout: typeof RockLayout;
    WmqLayoutContent: typeof RockLayoutContent;
    WmqLayoutHeader: typeof RockLayoutHeader;
    WmqLayoutFooter: typeof RockLayoutFooter;
    WmqLayoutSider: typeof RockLayoutSider;
    WmqList: typeof RockList;
    WmqListItem: typeof RockListItem;
    WmqLocalePicker: typeof RockLocalePicker;
    WmqMenu: typeof RockMenu;
    WmqModal: typeof RockModal;
    WmqPopover: typeof RockPopover;
    WmqNotificationProvider: typeof RockNotificationProvider;
    WmqDialogProvider: typeof RockDialogProvider;
    WmqMessageProvider: typeof RockMessageProvider;
    WmqResult: typeof RockResult;
    WmqRow: typeof RockRow;
    WmqScrollbar: typeof RockScrollbar;
    WmqSelect: typeof RockSelect;
    WmqPopSelect: typeof RockPopSelect;
    WmqSkeleton: typeof RockSkeleton;
    WmqSpace: typeof RockSpace;
    WmqSpinner: typeof RockSpinner;
    WmqSwitch: typeof RockSwitch;
    WmqTable: typeof RockTable;
    WmqTab: typeof RockTab;
    WmqTabPane: typeof RockTabPane;
    WmqTabs: typeof RockTabs;
    WmqTag: typeof RockTag;
    WmqDynamicTags: typeof RockDynamicTags;
    WmqText: typeof RockText;
    WmqGradientText: typeof RockGradientText;
    WmqThing: typeof RockThing;
    WmqTooltip: typeof RockTooltip;
    WmqTree: typeof RockTree;
    WmqTreeSelect: typeof RockTreeSelect;
    WmqProgress: typeof RockProgress;
    WmqPageHeader: typeof RockPageHeader;
    WmqH1: typeof RockH1;
    WmqH2: typeof RockH2;
    WmqH3: typeof RockH3;
    WmqH4: typeof RockH4;
    WmqH5: typeof RockH5;
    WmqH6: typeof RockH6;
  }
}

